// ══ VIKRAM CLOUD SYNC ═════════════════════════════════════════════════════════
// Syncs all user data to Firebase RTDB under /users/{uid}/
// On sign-in: pulls cloud → merges with local (cloud wins for newer timestamps)
// On data change: pushes local → cloud (debounced 2s)
// ──────────────────────────────────────────────────────────────────────────────
(function () {
    // Keys to sync and their human-readable labels
    const SYNC_KEYS = [
        { key: 'vikram_events', label: 'Events', ver: true },
        { key: 'vikram_profile', label: 'Profile', ver: true },
        { key: 'vikram_cfg', label: 'Settings', ver: true },
        { key: 'vikram_theme', label: 'Theme', ver: false },
        { key: 'vikram_theme_auto', label: 'Auto Theme', ver: false },
        { key: 'vikram_lang', label: 'Language', ver: false },
        { key: 'vikram_cycle', label: 'Cycle', ver: true },
        { key: 'vikram_notes_v2', label: 'Notes', ver: true },
        { key: 'vikram_tasks_v1', label: 'Tasks', ver: true },
        { key: 'vikram_birthdays_v1', label: 'Birthdays', ver: true },
        { key: 'vikram_pomo', label: 'Pomodoro', ver: false },
        { key: 'vikram_haptic', label: 'Haptic', ver: false },
        { key: 'vikram_daycounters', label: 'Habits', ver: true },
        { key: 'vikram_habit_reminder', label: 'Habit Reminders', ver: false },
        { key: 'vikram_kharcha', label: 'Kharcha', ver: true },
        { key: 'vikram_family', label: 'Family Share', ver: false },
        { key: 'vikram_rf_sign_choice', label: 'Rashifal Sign', ver: false },
        { key: 'vikram_work_hours', label: 'Work Hours', ver: true },
    ];
    var _uid = null;
    var _listener = null;
    var _dbRef = null;
    var _pushTimer = null;
    var _isMerging = false; // prevent push during pull
    function db() { return window.firebase && firebase.database ? firebase.database() : null; }
    function userRef(uid) { return db() ? db().ref('users/' + uid + '/syncData') : null; }
    // ── Serialize all sync keys from localStorage ──────────────────────────────
    function buildLocalPayload() {
        var payload = { _syncedAt: Date.now() };
        SYNC_KEYS.forEach(function (sk) {
            var raw = localStorage.getItem(sk.key);
            if (raw !== null) {
                payload[sk.key] = { data: raw, ts: Date.now() };
            }
        });
        return payload;
    }
    // ── Apply cloud payload → localStorage (merge: cloud wins if newer) ────────
    function applyCloudPayload(cloud) {
        _isMerging = true;
        var changed = false;
        SYNC_KEYS.forEach(function (sk) {
            if (!cloud[sk.key])
                return;
            var cloudEntry = cloud[sk.key];
            var cloudRaw = cloudEntry.data;
            var cloudTs = cloudEntry.ts || 0;
            var localRaw = localStorage.getItem(sk.key);
            // Always apply if local is missing; otherwise apply if cloud is strictly newer
            var localTs = 0;
            try {
                var meta = localStorage.getItem(sk.key + '__syncmeta');
                if (meta)
                    localTs = JSON.parse(meta).ts || 0;
            }
            catch (e) { }
            if (localRaw === null || cloudTs > localTs) {
                try {
                    localStorage.setItem(sk.key, cloudRaw);
                    localStorage.setItem(sk.key + '__syncmeta', JSON.stringify({ ts: cloudTs }));
                    changed = true;
                }
                catch (e) { }
            }
        });
        if (changed) {
            // Reload runtime state from fresh localStorage
            _reloadRuntimeState();
            if (typeof vikramToast === 'function')
                vikramToast('☁️ Data synced from cloud');
        }
        _isMerging = false;
    }
    // ── Reload in-memory state after a cloud pull ──────────────────────────────
    function _reloadRuntimeState() {
        // Events
        try {
            if (typeof userEvents !== 'undefined') {
                var evts = JSON.parse(localStorage.getItem('vikram_events') || '[]');
                userEvents.length = 0;
                evts.forEach(function (e) { userEvents.push(e); });
            }
        }
        catch (e) { }
        // Theme
        try {
            var t = localStorage.getItem('vikram_theme');
            if (t === 'dark' || t === 'light') {
                if (typeof dark !== 'undefined') {
                    dark = (t === 'dark');
                    if (typeof applyTheme === 'function')
                        applyTheme();
                }
            }
        }
        catch (e) { }
        // Language
        try {
            var l = localStorage.getItem('vikram_lang');
            if (l && typeof setLang === 'function')
                setLang(l);
        }
        catch (e) { }
        // Config
        try {
            var c = JSON.parse(localStorage.getItem('vikram_cfg') || '{}');
            if (typeof cfg !== 'undefined')
                Object.assign(cfg, c);
        }
        catch (e) { }
        // Cycle
        try {
            if (typeof cycleData !== 'undefined') {
                var cy = JSON.parse(localStorage.getItem('vikram_cycle') || '{}');
                Object.assign(cycleData, cy);
            }
        }
        catch (e) { }
        // Kharcha (expense tracker) — refresh view if it's currently open
        try {
            if (typeof window.renderKharchaSheet === 'function')
                window.renderKharchaSheet();
        }
        catch (e) { }
        // Family Share — reconnect to the family code that just came in from the cloud
        try {
            if (typeof famLocal === 'function' && typeof famEnsureAuth === 'function' && typeof famAttachListener === 'function') {
                var famNow = famLocal();
                if (famNow && famNow.code && window._famLastSyncedCode !== famNow.code) {
                    window._famLastSyncedCode = famNow.code;
                    famEnsureAuth(function (ok) { if (ok)
                        famAttachListener(famNow.code); });
                }
                if (typeof window.renderFamilySheet === 'function')
                    window.renderFamilySheet();
            }
        }
        catch (e) { }
        // Re-render
        try {
            if (typeof render === 'function')
                render();
            if (typeof renderUpcoming === 'function')
                renderUpcoming();
            if (typeof renderSelectedDay === 'function')
                renderSelectedDay();
            if (typeof bdtRender === 'function')
                bdtRender();
            if (typeof bdtSyncToEvents === 'function')
                bdtSyncToEvents();
            if (typeof window.dcRender === 'function')
                window.dcRender();
            if (typeof window.whRenderCard === 'function')
                window.whRenderCard();
        }
        catch (e) { }
    }
    // ── Push local data to cloud (debounced) ────────────────────────────────────
    function schedulePush() {
        if (!_uid || _isMerging)
            return;
        clearTimeout(_pushTimer);
        _pushTimer = setTimeout(function () { doPush(); }, 2000);
    }
    function doPush() {
        if (!_uid)
            return;
        var ref = userRef(_uid);
        if (!ref)
            return;
        var payload = buildLocalPayload();
        // Stamp per-key timestamps
        SYNC_KEYS.forEach(function (sk) {
            if (payload[sk.key]) {
                // Use existing syncmeta ts if available (preserve pull timestamp)
                var meta = null;
                try {
                    meta = JSON.parse(localStorage.getItem(sk.key + '__syncmeta') || 'null');
                }
                catch (e) { }
                payload[sk.key].ts = meta ? Math.max(meta.ts, Date.now()) : Date.now();
                // Update syncmeta
                try {
                    localStorage.setItem(sk.key + '__syncmeta', JSON.stringify({ ts: payload[sk.key].ts }));
                }
                catch (e) { }
            }
        });
        ref.set(payload).catch(function (e) { console.warn('[VikramSync] push failed:', e); });
    }
    // ── Start listening: pull once on sign-in, then set up push hooks ───────────
    window.vikramCloudSync = {
        startListening: function (uid) {
            _uid = uid;
            var ref = userRef(uid);
            if (!ref) {
                // db() not ready yet (Firebase SDK still loading) — retry in 1s
                setTimeout(function () { if (_uid)
                    window.vikramCloudSync.startListening(_uid); }, 1000);
                return;
            }
            // Show synced UI immediately (don't wait for pull to complete)
            _updateSyncUI(true);
            // Keep ref so stopListening can detach it
            _dbRef = ref;
            // One-time pull on sign-in
            ref.once('value').then(function (snap) {
                var cloud = snap.val();
                if (cloud && typeof cloud === 'object') {
                    applyCloudPayload(cloud);
                }
                else {
                    // No cloud data yet — push current local data up
                    doPush();
                }
            }).catch(function (e) { console.warn('[VikramSync] pull failed:', e); });
            // Real-time listener for changes from other devices
            _listener = ref.on('value', function (snap) {
                var cloud = snap.val();
                if (cloud && typeof cloud === 'object' && cloud._syncedAt) {
                    // Only apply if cloud is newer than our last push
                    var ourTs = 0;
                    try {
                        var m = JSON.parse(localStorage.getItem('vikram_events__syncmeta') || 'null');
                        if (m)
                            ourTs = m.ts || 0;
                    }
                    catch (e) { }
                    // Only react to changes from OTHER devices (cloud.ts > local push ts + 5s buffer)
                    if (cloud._syncedAt > ourTs + 5000) {
                        applyCloudPayload(cloud);
                    }
                }
            }, function (e) { console.warn('[VikramSync] listener error:', e); });
        },
        stopListening: function () {
            if (_listener && _dbRef) {
                try {
                    _dbRef.off('value', _listener);
                }
                catch (e) { }
            }
            _listener = null;
            _uid = null;
            _updateSyncUI(false);
        },
        // Call this after any local data change
        push: function () { schedulePush(); },
        // Expose so other UI (e.g. Profile view) can list what's backed up
        SYNC_KEYS: SYNC_KEYS
    };
    // ── UI: show sync badge in settings ────────────────────────────────────────
    function _updateSyncUI(synced) {
        var el = document.getElementById('cloudSyncStatus');
        if (!el)
            return;
        if (synced) {
            var u = window.firebase && firebase.auth ? firebase.auth().currentUser : null;
            var label = u ? (u.displayName || u.email || 'Google account') : 'Google account';
            el.innerHTML = '<span style="color:#22c55e;font-weight:800;">☁️ Synced</span> · ' + label;
        }
        else {
            el.innerHTML = '<span style="color:var(--dsub);">Not signed in</span>';
        }
        if (typeof renderProfileBackup === 'function')
            renderProfileBackup();
    }
    // ── Hook into all write operations ────────────────────────────────────────
    // Patch saveEvents
    var _origSaveEvents = window.saveEvents;
    window.saveEvents = function () {
        if (typeof _origSaveEvents === 'function')
            _origSaveEvents.apply(this, arguments);
        if (window.vikramCloudSync)
            window.vikramCloudSync.push();
    };
    // Patch saveCycle
    var _origSaveCycle = window.saveCycle;
    window.saveCycle = function () {
        if (typeof _origSaveCycle === 'function')
            _origSaveCycle.apply(this, arguments);
        if (window.vikramCloudSync)
            window.vikramCloudSync.push();
    };
    // Patch localStorage.setItem to catch other writes (theme, lang, cfg, notes, tasks, birthdays)
    var _origSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (key, value) {
        _origSetItem(key, value);
        if (window.vikramCloudSync && SYNC_KEYS.some(function (sk) { return sk.key === key; })) {
            window.vikramCloudSync.push();
        }
    };
})();
