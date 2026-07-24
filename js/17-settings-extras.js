"use strict";
// ══ SETTINGS EXTRAS ══════════════════════════════════════════════════════════
// ── Haptic toggle ─────────────────────────────────────────────────────────────
(function () {
    const stored = localStorage.getItem('vikram_haptic');
    // Default ON; only false if explicitly disabled
    window._hapticEnabled = stored === null ? true : stored === '1';
    const tg = document.getElementById('tgHaptic');
    if (tg)
        tg.classList.toggle('on', window._hapticEnabled);
    // Patch haptic to respect the setting
    const _origHaptic = window.haptic;
    window.haptic = function (type) {
        if (!window._hapticEnabled)
            return;
        if (_origHaptic)
            _origHaptic(type);
    };
})();
window.togHaptic = function (btn) {
    window._hapticEnabled = !window._hapticEnabled;
    btn.classList.toggle('on', window._hapticEnabled);
    try {
        localStorage.setItem('vikram_haptic', window._hapticEnabled ? '1' : '0');
    }
    catch (e) { }
    if (window._hapticEnabled)
        navigator.vibrate && navigator.vibrate(18);
};
// ── Tithi in cells ────────────────────────────────────────────────────────────
(function () {
    // Restore saved tithi & weekNum settings into cfg
    try {
        const stored = JSON.parse(localStorage.getItem('vikram_cfg') || '{}');
        if (typeof stored.tithi === 'boolean')
            cfg.tithi = stored.tithi;
        if (typeof stored.weekNum === 'boolean')
            cfg.weekNum = stored.weekNum;
        if (typeof stored.compact === 'boolean')
            cfg.compact = stored.compact;
        if (typeof stored.hlwknd === 'boolean')
            cfg.hlwknd = stored.hlwknd;
    }
    catch (e) { }
    if (cfg.tithi === undefined)
        cfg.tithi = false;
    if (cfg.weekNum === undefined)
        cfg.weekNum = false;
    if (cfg.compact === undefined)
        cfg.compact = false;
    if (cfg.hlwknd === undefined)
        cfg.hlwknd = true;
    document.getElementById('tgTithi')?.classList.toggle('on', cfg.tithi);
    document.getElementById('tgWeekNum')?.classList.toggle('on', cfg.weekNum);
    document.getElementById('tgCompact')?.classList.toggle('on', cfg.compact);
    document.getElementById('tgHlwknd')?.classList.toggle('on', cfg.hlwknd);
})();
// Tithi and week numbers are now rendered directly in render() above.
const _origRender2 = window.render;
window.render = function () {
    if (typeof _origRender2 === 'function')
        _origRender2.apply(this, arguments);
};
// ── Tithi & weeknum CSS ───────────────────────────────────────────────────────
(function () {
    const style = document.createElement('style');
    style.textContent = `
.cell-weeknum{
  font-size:6px;font-weight:900;
  color:rgba(60,120,220,.55);
  font-family:'Space Mono',monospace;
  pointer-events:none;
  line-height:1;
  letter-spacing:.3px;
  margin-bottom:0px;
}
[data-theme=dark] .cell-weeknum{ color:rgba(120,170,255,.6); }
.cell-tithi{
  font-size:6.5px;font-weight:900;
  color:rgba(100,80,200,.55);
  font-family:'Space Mono',monospace;
  letter-spacing:.1px;
  pointer-events:none;
  line-height:1;
  margin-top:1px;
}
[data-theme=dark] .cell-tithi{ color:rgba(160,140,255,.6); }
.cell.active,.cell.dim{ position:relative; }
`;
    document.head.appendChild(style);
})();
// ── Install App shortcut from Settings ────────────────────────────────────────
window.svInstallApp = function () {
    haptic('light');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
        vikramToast && vikramToast('✅ App is already installed!');
        return;
    }
    // Native install prompt available — trigger it directly, no banner needed
    const prompt = window._vikramDeferredPrompt;
    if (prompt) {
        prompt.prompt();
        prompt.userChoice.then(r => {
            if (r.outcome === 'accepted') {
                localStorage.setItem('vikram_installed', '1');
                const sub = document.getElementById('svInstallSub');
                if (sub)
                    sub.textContent = 'Already installed ✓';
                const row = document.getElementById('svInstallRow');
                if (row)
                    row.style.opacity = '.5';
                vikramToast && vikramToast('✅ App installed!');
            }
            window._vikramDeferredPrompt = null;
        });
        return;
    }
    // No native prompt available — nothing to show
    vikramToast && vikramToast('⚠️ Install not available in this browser. Try Chrome or Safari.');
};
// Update install row based on PWA state
(function () {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    const sub = document.getElementById('svInstallSub');
    const row = document.getElementById('svInstallRow');
    if (isStandalone && sub) {
        sub.textContent = 'Already installed ✓';
        if (row)
            row.style.opacity = '.5';
    }
})();
// ── Confirm dialog ────────────────────────────────────────────────────────────
let _svConfirmCallback = null;
function svShowConfirm(icon, title, msg, okLabel, okColor, cb) {
    document.getElementById('svConfirmIcon').textContent = icon;
    document.getElementById('svConfirmTitle').textContent = title;
    document.getElementById('svConfirmMsg').textContent = msg;
    const okBtn = document.getElementById('svConfirmOkBtn');
    okBtn.textContent = okLabel || 'Confirm';
    okBtn.style.background = okColor || 'linear-gradient(135deg,#e53e3e,#c53030)';
    _svConfirmCallback = cb;
    const modal = document.getElementById('svConfirmModal');
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.style.opacity = '1');
}
window.svConfirmCancel = function () {
    document.getElementById('svConfirmModal').style.display = 'none';
    _svConfirmCallback = null;
};
window.svConfirmOk = function () {
    document.getElementById('svConfirmModal').style.display = 'none';
    if (_svConfirmCallback)
        _svConfirmCallback();
    _svConfirmCallback = null;
};
// ── Export Events ─────────────────────────────────────────────────────────────
window.exportEvents = function () {
    haptic('light');
    try {
        const evts = JSON.parse(localStorage.getItem('vikram_events') || '[]');
        if (!evts.length) {
            vikramToast && vikramToast('ℹ️ No events to export');
            return;
        }
        const payload = JSON.stringify({ version: 'vikram-1', exportedAt: new Date().toISOString(), events: evts }, null, 2);
        const blob = new Blob([payload], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vikram-events-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        vikramToast && vikramToast(`✅ ${evts.length} event${evts.length > 1 ? 's' : ''} exported`);
    }
    catch (e) {
        vikramToast && vikramToast('❌ Export failed');
    }
};
// ── Import Events ─────────────────────────────────────────────────────────────
window.importEvents = function (input) {
    const file = input.files[0];
    if (!file)
        return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            const evts = data.events || (Array.isArray(data) ? data : null);
            if (!evts || !evts.length) {
                vikramToast && vikramToast('⚠️ No events found in file');
                return;
            }
            svShowConfirm('📥', 'Import Events', `Add ${evts.length} event${evts.length > 1 ? 's' : ''} from this file? Existing events are kept.`, 'Import', 'linear-gradient(135deg,#3b82f6,#1d4ed8)', function () {
                const existing = JSON.parse(localStorage.getItem('vikram_events') || '[]');
                // Merge, dedup by id if present
                const ids = new Set(existing.map(ev => ev.id).filter(Boolean));
                const toAdd = evts.filter(ev => !ev.id || !ids.has(ev.id));
                const merged = [...existing, ...toAdd];
                merged.sort((a, b) => (a.adMs || 0) - (b.adMs || 0));
                localStorage.setItem('vikram_events', JSON.stringify(merged));
                if (typeof userEvents !== 'undefined') {
                    userEvents.length = 0;
                    merged.forEach(ev => userEvents.push(ev));
                }
                typeof render === 'function' && render();
                typeof renderUpcoming === 'function' && renderUpcoming();
                vikramToast && vikramToast(`✅ ${toAdd.length} event${toAdd.length !== 1 ? 's' : ''} imported`);
            });
        }
        catch (err) {
            vikramToast && vikramToast('❌ Invalid file format');
        }
        input.value = '';
    };
    reader.readAsText(file);
};
// ── Clear All Events ──────────────────────────────────────────────────────────
window.confirmClearEvents = function () {
    haptic('light');
    const cnt = JSON.parse(localStorage.getItem('vikram_events') || '[]').length;
    if (!cnt) {
        vikramToast && vikramToast('ℹ️ No events to clear');
        return;
    }
    svShowConfirm('🗑️', 'Clear All Events', `This will permanently delete all ${cnt} event${cnt > 1 ? 's' : ''}. This cannot be undone.`, 'Delete All', 'linear-gradient(135deg,#e53e3e,#c53030)', function () {
        localStorage.removeItem('vikram_events');
        if (typeof userEvents !== 'undefined') {
            userEvents.length = 0;
        }
        typeof render === 'function' && render();
        typeof renderUpcoming === 'function' && renderUpcoming();
        typeof renderSelectedDay === 'function' && renderSelectedDay();
        haptic('success');
        vikramToast && vikramToast('✅ All events cleared');
    });
};
// ── Reset All App Data ────────────────────────────────────────────────────────
window.confirmResetApp = function () {
    haptic('light');
    svShowConfirm('⚠️', 'Reset App Data', 'This will erase ALL data: events, notes, tasks, settings, profile, and cycle data. This cannot be undone.', 'Reset Everything', 'linear-gradient(135deg,#7f1d1d,#991b1b)', function () {
        // Keep only the installed flag so install prompt doesn't spam
        const installed = localStorage.getItem('vikram_installed');
        localStorage.clear();
        if (installed)
            localStorage.setItem('vikram_installed', installed);
        haptic('success');
        vikramToast && vikramToast('✅ App reset — reloading…');
        setTimeout(() => location.reload(), 1200);
    });
};
// ── Clear All Notes ───────────────────────────────────────────────────────────
window.confirmClearNotes = function () {
    haptic('light');
    const raw = localStorage.getItem('vikram_notes_v2') || localStorage.getItem('vikram_notes_html') || '[]';
    let cnt = 0;
    try {
        const parsed = JSON.parse(raw);
        cnt = Array.isArray(parsed) ? parsed.length : 0;
    }
    catch (e) {
        cnt = raw.length > 2 ? 1 : 0;
    }
    if (!cnt) {
        vikramToast && vikramToast('ℹ️ No notes to clear');
        return;
    }
    svShowConfirm('📝', 'Clear All Notes', `This will permanently delete all ${cnt} note${cnt > 1 ? 's' : ''}. This cannot be undone.`, 'Delete All', 'linear-gradient(135deg,#e53e3e,#c53030)', function () {
        localStorage.removeItem('vikram_notes_v2');
        localStorage.removeItem('vikram_notes_html');
        haptic('success');
        vikramToast && vikramToast('✅ All notes cleared');
        svRefreshStorage();
    });
};
// ── Clear All Tasks ───────────────────────────────────────────────────────────
window.confirmClearTasks = function () {
    haptic('light');
    let cnt = 0;
    try {
        cnt = JSON.parse(localStorage.getItem('vikram_tasks_v1') || '[]').length;
    }
    catch (e) { }
    if (!cnt) {
        vikramToast && vikramToast('ℹ️ No tasks to clear');
        return;
    }
    svShowConfirm('✅', 'Clear All Tasks', `This will permanently delete all ${cnt} task${cnt > 1 ? 's' : ''}. This cannot be undone.`, 'Delete All', 'linear-gradient(135deg,#e53e3e,#c53030)', function () {
        localStorage.removeItem('vikram_tasks_v1');
        haptic('success');
        vikramToast && vikramToast('✅ All tasks cleared');
        svRefreshStorage();
    });
};
// ── Open Changelog Sheet ──────────────────────────────────────────────────────
window.openChangelog = function () {
    haptic('light');
    const sheet = document.getElementById('changelogSheet');
    if (!sheet)
        return;
    sheet.classList.add('open');
    const ov = document.getElementById('ov');
    if (ov) {
        ov.classList.add('open');
        ov.dataset.sheetOrigin = 'changelogSheet';
    }
};
// ── Open Privacy Policy Sheet ─────────────────────────────────────────────────
window.openPrivacyPolicy = function () {
    haptic('light');
    const sheet = document.getElementById('privacySheet');
    if (!sheet)
        return;
    sheet.classList.add('open');
    const ov = document.getElementById('ov');
    if (ov) {
        ov.classList.add('open');
        ov.dataset.sheetOrigin = 'privacySheet';
    }
};
// ── Storage Usage ─────────────────────────────────────────────────────────────
function svCalcStorage() {
    const QUOTA = 5 * 1024 * 1024; // 5 MB nominal localStorage quota
    let total = 0;
    const breakdown = [];
    const groups = [
        { key: 'vikram_events', label: 'Events', color: '#3b82f6' },
        { key: 'vikram_notes_v2', label: 'Notes', color: '#10b981' },
        { key: 'vikram_notes_html', label: 'Notes', color: '#10b981' },
        { key: 'vikram_tasks_v1', label: 'Tasks', color: '#f59e0b' },
        { key: 'vikram_cfg', label: 'Settings', color: '#8b5cf6' },
        { key: 'vikram_theme', label: 'Settings', color: '#8b5cf6' },
        { key: 'vikram_profile', label: 'Profile', color: '#ec4899' },
        { key: 'vikram_cycle', label: 'Cycle', color: '#ef4444' },
    ];
    const groupTotals = {};
    const groupColors = {};
    let other = 0;
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            const v = localStorage.getItem(k) || '';
            const bytes = (k.length + v.length) * 2; // UTF-16 approx
            total += bytes;
            const grp = groups.find(g => g.key === k);
            if (grp) {
                groupTotals[grp.label] = (groupTotals[grp.label] || 0) + bytes;
                groupColors[grp.label] = grp.color;
            }
            else {
                other += bytes;
            }
        }
    }
    catch (e) { }
    if (other > 0) {
        groupTotals['Other'] = other;
        groupColors['Other'] = '#9ca3af';
    }
    return { total, quota: QUOTA, groupTotals, groupColors };
}
function svRefreshStorage() {
    const { total, quota, groupTotals, groupColors } = svCalcStorage();
    const pct = Math.min(100, Math.round(total / quota * 100));
    const fmt = b => b < 1024 ? b + 'B' : b < 1024 * 1024 ? (b / 1024).toFixed(1) + 'KB' : (b / (1024 * 1024)).toFixed(2) + 'MB';
    const sub = document.getElementById('svStorageSub');
    const pctEl = document.getElementById('svStoragePct');
    const bar = document.getElementById('svStorageBar');
    const bd = document.getElementById('svStorageBreakdown');
    if (sub)
        sub.textContent = `${fmt(total)} used of ~5 MB`;
    if (pctEl)
        pctEl.textContent = pct + '%';
    if (bar) {
        bar.style.width = pct + '%';
        bar.style.background = pct > 80 ? 'linear-gradient(90deg,#ef4444,#dc2626)' : pct > 60 ? 'linear-gradient(90deg,#f59e0b,#d97706)' : 'linear-gradient(90deg,#3b82f6,#6366f1)';
    }
    if (bd) {
        bd.innerHTML = Object.keys(groupTotals).map(label => {
            if (!groupTotals[label])
                return '';
            return `<span class="stor-chip"><span style="background:${groupColors[label]};"></span>${label} ${fmt(groupTotals[label])}</span>`;
        }).join('');
    }
}
// Init storage on first render
(function () { setTimeout(svRefreshStorage, 300); })();
// ── Sync toggle state on settings open ───────────────────────────────────────
(function () {
    const _base = window.switchTab;
    window.switchTab = function (tab) {
        if (typeof _base === 'function')
            _base.apply(this, arguments);
        if (tab === 'settings') {
            // Sync profile row
            try {
                const p = JSON.parse(localStorage.getItem('vikram_profile') || '{}');
                const nameEl = document.getElementById('svProfileName');
                const subEl = document.getElementById('svProfileSub');
                const avEl = document.getElementById('svProfileAvatar');
                if (nameEl)
                    nameEl.textContent = p.name || 'Your Name';
                if (avEl) {
                    const initials = profileInitials(p.name || '');
                    avEl.textContent = initials;
                }
                if (subEl) {
                    if (p.bday && p.bday.y && p.bday.m && p.bday.d) {
                        const MEN_ = typeof MEN !== 'undefined' ? MEN : ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
                        subEl.textContent = '🎂 ' + MEN_[p.bday.m - 1] + ' ' + p.bday.d + ', ' + p.bday.y + ' BS';
                    }
                    else {
                        subEl.textContent = 'Edit profile, birthday & more';
                    }
                }
            }
            catch (e) { }
            // Sync haptic
            document.getElementById('tgHaptic')?.classList.toggle('on', !!window._hapticEnabled);
            // Sync tithi & weeknum
            document.getElementById('tgTithi')?.classList.toggle('on', !!cfg.tithi);
            document.getElementById('tgWeekNum')?.classList.toggle('on', !!cfg.weekNum);
            // Sync compact & hlwknd
            document.getElementById('tgCompact')?.classList.toggle('on', !!cfg.compact);
            document.getElementById('tgHlwknd')?.classList.toggle('on', !!cfg.hlwknd);
            // Sync install row
            const isStandalone2 = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
            const sub2 = document.getElementById('svInstallSub');
            const row2 = document.getElementById('svInstallRow');
            if (isStandalone2 && sub2) {
                sub2.textContent = 'Already installed ✓';
                if (row2)
                    row2.style.opacity = '.5';
            }
            else if (sub2) {
                sub2.textContent = 'Add Vikram to your home screen';
                if (row2)
                    row2.style.opacity = '';
            }
            // Refresh storage
            setTimeout(svRefreshStorage, 80);
        }
    };
})();
