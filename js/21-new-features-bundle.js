"use strict";
// ══════════════════════════════════════════════════════════════════════════════
// NEW FEATURES BUNDLE — Kharcha, Alarms, Daily Insights, Rashifal, Family Share,
// Notes checklist, Recurring event templates, PDF export, search highlighting.
// ══════════════════════════════════════════════════════════════════════════════
(function () {
    'use strict';
    // ── Loading skeletons (shimmer placeholders for slow-network cards) ─────────
    window.skelWeatherHTML = function () {
        return `<div class="skel-wx">
      <div class="skel skel-wx-icon"></div>
      <div class="skel-wx-lines">
        <div class="skel skel-line" style="width:64px;height:20px;"></div>
        <div class="skel skel-line" style="width:104px;"></div>
      </div>
    </div>
    <div class="skel-grid3"><div class="skel"></div><div class="skel"></div><div class="skel"></div></div>`;
    };
    window.skelRowsHTML = function (n, opts) {
        n = n || 3;
        const withHeader = opts && opts.header;
        let html = withHeader ? `<div class="skel skel-line" style="width:40%;height:10px;margin-bottom:12px;"></div>` : '';
        const widths = [46, 58, 38, 52, 44];
        for (let i = 0; i < n; i++) {
            html += `<div class="skel-row"><div class="skel skel-line" style="width:${widths[i % widths.length]}%;"></div><div class="skel skel-line" style="width:56px;"></div></div>`;
        }
        return html;
    };
    window.skelMuhuratHTML = function () {
        return `<div class="skel skel-block"></div><div class="skel skel-block"></div><div class="skel skel-line" style="width:62%;"></div>`;
    };
    window.skelRashifalHTML = function () {
        return `<div class="rf-card">
      <div class="skel skel-line" style="width:120px;height:16px;margin-bottom:4px;"></div>
      <div class="skel skel-line" style="width:100%;margin-top:12px;"></div>
      <div class="skel skel-line" style="width:72%;margin-top:8px;"></div>
      <div class="rf-card-grid">
        <div class="rf-card-item"><div class="skel skel-line" style="width:60%;height:8px;"></div><div class="skel skel-line" style="width:80%;height:13px;margin-top:6px;"></div></div>
        <div class="rf-card-item"><div class="skel skel-line" style="width:60%;height:8px;"></div><div class="skel skel-line" style="width:40%;height:13px;margin-top:6px;"></div></div>
      </div>
    </div>`;
    };
    function LSget(key, def) { try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : def;
    }
    catch (e) {
        return def;
    } }
    function LSset(key, val) { try {
        localStorage.setItem(key, JSON.stringify(val));
    }
    catch (e) { } }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function uid(prefix) { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
    function T(msg, dur) { if (typeof window.vikramToast === 'function')
        window.vikramToast(msg, dur); }
    function H(type) { if (typeof window.haptic === 'function')
        window.haptic(type || 'light'); }
    // ══════════════════════════════════════════════════════════════════════════════
    // 1. KHARCHA — EXPENSE / INCOME TRACKER
    // ══════════════════════════════════════════════════════════════════════════════
    const KH_KEY = 'vikram_kharcha';
    const KH_CATS = {
        expense: [['Food', '🍚'], ['Transport', '🚌'], ['Shopping', '🛍️'], ['Bills', '💡'], ['Health', '💊'], ['Festival', '🎉'], ['Other', '📦']],
        income: [['Salary', '💼'], ['Gift', '🎁'], ['Business', '📈'], ['Other', '📦']]
    };
    window._khState = window._khState || { type: 'expense', category: 'Food' };
    function khLoad() { return LSget(KH_KEY, []); }
    function khSave(arr) { LSset(KH_KEY, arr); }
    function khMonthKey(y, m) { return y + '-' + m; }
    function khComputeMonthTotals(list, y, m) {
        let income = 0, expense = 0;
        list.forEach(r => {
            if (r.bsY === y && r.bsM === m) {
                if (r.type === 'income')
                    income += r.amount;
                else
                    expense += r.amount;
            }
        });
        return { income, expense, balance: income - expense };
    }
    // Walk backwards from current BS month across 6 months (handles year rollover using BS[] month-count table)
    function khLastSixMonths() {
        const out = [];
        let y = TODAYBS.y, m = TODAYBS.m;
        for (let i = 0; i < 6; i++) {
            out.unshift({ y, m });
            m--;
            if (m < 1) {
                m = 12;
                y--;
            }
        }
        return out;
    }
    function khFmtAmt(n) {
        return 'Rs ' + Math.round(n).toLocaleString('en-IN');
    }
    window.renderKharchaSheet = function () {
        const body = document.getElementById('kharchaBody');
        if (!body)
            return;
        const list = khLoad();
        const mt = khComputeMonthTotals(list, TODAYBS.y, TODAYBS.m);
        const st = window._khState;
        const cats = KH_CATS[st.type];
        if (!cats.find(c => c[0] === st.category))
            st.category = cats[0][0];
        const months = khLastSixMonths();
        const monthTotals = months.map(mo => khComputeMonthTotals(list, mo.y, mo.m).expense);
        const maxTotal = Math.max(1, ...monthTotals);
        const monthNamesShort = (typeof MEN !== 'undefined' && MEN) ? MEN : ['Bai', 'Jes', 'Asa', 'Shr', 'Bha', 'Ash', 'Kar', 'Man', 'Pou', 'Mag', 'Fal', 'Cha'];
        const chartHtml = months.map((mo, i) => {
            const h = Math.max(4, Math.round((monthTotals[i] / maxTotal) * 90));
            const label = (monthNamesShort[mo.m - 1] || '').slice(0, 3);
            return `<div class="kh-bar-wrap"><div class="kh-bar" style="height:${h}px" title="${khFmtAmt(monthTotals[i])}"></div><div class="kh-bar-lbl">${esc(label)}</div></div>`;
        }).join('');
        const recent = list.slice().sort((a, b) => b.ts - a.ts).slice(0, 25);
        const rowsHtml = recent.length ? recent.map(r => {
            const catInfo = (KH_CATS[r.type] || []).find(c => c[0] === r.category);
            const icon = catInfo ? catInfo[1] : (r.type === 'income' ? '💰' : '📦');
            return `<div class="kh-row">
      <div class="kh-row-main">
        <div class="kh-row-icon">${icon}</div>
        <div style="min-width:0;">
          <div class="kh-row-cat">${esc(r.category)}</div>
          <div class="kh-row-note">${esc(r.note || '') || (r.bsM + '/' + r.bsD + '/' + r.bsY)}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;">
        <div class="kh-row-amt ${r.type}">${r.type === 'income' ? '+' : '−'}${khFmtAmt(r.amount)}</div>
        <button class="kh-row-del" onclick="kharchaDeleteEntry('${r.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>`;
        }).join('') : `<div class="ins-empty">No transactions yet. Add your first one above! 💸</div>`;
        body.innerHTML = `
    <div class="kh-summary">
      <div class="kh-sum-card"><div class="kh-sum-val" style="color:#2f9e63;">${khFmtAmt(mt.income)}</div><div class="kh-sum-lbl">Income</div></div>
      <div class="kh-sum-card"><div class="kh-sum-val" style="color:#e0473a;">${khFmtAmt(mt.expense)}</div><div class="kh-sum-lbl">Expense</div></div>
      <div class="kh-sum-card"><div class="kh-sum-val">${khFmtAmt(mt.balance)}</div><div class="kh-sum-lbl">Balance</div></div>
    </div>

    <div class="ssect" style="margin-bottom:8px;">Add Transaction</div>
    <div class="kh-type-row">
      <button class="kh-type-btn ${st.type === 'expense' ? 'on' : ''}" onclick="kharchaSetType('expense')">− Expense</button>
      <button class="kh-type-btn ${st.type === 'income' ? 'on' : ''}" onclick="kharchaSetType('income')">+ Income</button>
    </div>
    <div class="kh-cat-row" id="khCatRow">
      ${cats.map(c => `<button class="kh-cat-chip ${st.category === c[0] ? 'on' : ''}" onclick="kharchaSelectCat('${c[0]}')">${c[1]} ${c[0]}</button>`).join('')}
    </div>
    <input type="number" inputmode="decimal" class="einput" id="khAmountInput" placeholder="Amount (Rs)" style="margin-bottom:9px;">
    <input type="text" class="einput" id="khNoteInput" placeholder="Note (optional)">
    <button class="ebtn" style="width:100%;margin:4px 0 18px;" onclick="kharchaAddEntry()">Add ${st.type === 'income' ? 'Income' : 'Expense'}</button>

    <div class="ssect" style="margin-bottom:2px;">Last 6 Months (Expense)</div>
    <div class="kh-chart">${chartHtml}</div>

    <div class="ssect" style="margin:18px 0 2px;">Recent Transactions</div>
    <div>${rowsHtml}</div>
  `;
    };
    window.kharchaSetType = function (type) {
        H('light');
        window._khState.type = type;
        const cats = KH_CATS[type];
        window._khState.category = cats[0][0];
        window.renderKharchaSheet();
    };
    window.kharchaSelectCat = function (cat) {
        H('light');
        window._khState.category = cat;
        window.renderKharchaSheet();
    };
    window.kharchaAddEntry = function () {
        const amtEl = document.getElementById('khAmountInput');
        const noteEl = document.getElementById('khNoteInput');
        const amount = parseFloat(amtEl && amtEl.value);
        if (!amount || amount <= 0) {
            T('⚠️ Enter a valid amount');
            return;
        }
        const list = khLoad();
        list.push({
            id: uid('kh'),
            type: window._khState.type,
            category: window._khState.category,
            amount,
            note: (noteEl && noteEl.value.trim()) || '',
            ts: Date.now(),
            bsY: TODAYBS.y, bsM: TODAYBS.m, bsD: TODAYBS.d
        });
        khSave(list);
        H('success');
        T(window._khState.type === 'income' ? '💰 Income added' : '💸 Expense logged');
        window.renderKharchaSheet();
    };
    window.kharchaDeleteEntry = function (id) {
        const list = khLoad();
        const idx = list.findIndex(r => r.id === id);
        if (idx < 0)
            return;
        const removed = list[idx];
        list.splice(idx, 1);
        khSave(list);
        H('light');
        window.renderKharchaSheet();
        if (typeof window.showUndoSnackbar === 'function') {
            window.showUndoSnackbar('Transaction deleted', function () {
                const cur = khLoad();
                cur.push(removed);
                khSave(cur);
                window.renderKharchaSheet();
            });
        }
    };
    // ══════════════════════════════════════════════════════════════════════════════
    // 2. ALARMS
    // ══════════════════════════════════════════════════════════════════════════════
    const AL_KEY = 'vikram_alarms';
    const AL_DAY_LBL = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    window._alFormOpen = false;
    window._alDraftDays = window._alDraftDays || [];
    function alLoad() { return LSget(AL_KEY, []); }
    function alSave(arr) { LSset(AL_KEY, arr); }
    function alFmtTime(h, m) {
        const hh = ((h + 11) % 12) + 1;
        const ap = h < 12 ? 'AM' : 'PM';
        return hh + ':' + String(m).padStart(2, '0') + ' ' + ap;
    }
    window.renderAlarmsSheet = function () {
        const body = document.getElementById('alarmsBody');
        if (!body)
            return;
        const list = alLoad().slice().sort((a, b) => (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute));
        const rowsHtml = list.length ? list.map(a => {
            const daysHtml = AL_DAY_LBL.map((d, i) => `<div class="al-day-dot ${a.days.includes(i) ? 'on' : ''}">${d[0]}</div>`).join('');
            return `<div class="al-row">
      <div>
        <div class="al-time">${alFmtTime(a.hour, a.minute)}</div>
        <div class="al-lbl">${esc(a.label || 'Alarm')}${a.days.length === 0 ? ' · Once' : ''}</div>
        <div class="al-days">${daysHtml}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button class="tgl ${a.enabled ? 'on' : ''}" onclick="alarmToggleEnabled('${a.id}')"></button>
        <button class="al-del" onclick="alarmDeleteEntry('${a.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>`;
        }).join('') : `<div class="ins-empty">No alarms set yet. Add one below.</div>`;
        const formHtml = window._alFormOpen ? `
    <div style="background:var(--tgbg);border-radius:16px;padding:16px;margin-top:14px;">
      <div class="ssect" style="margin-bottom:8px;">New Alarm</div>
      <input type="time" id="alTimeInput" class="einput" style="margin-bottom:9px;">
      <input type="text" id="alLabelInput" class="einput" placeholder="Label (e.g. Puja time, Wake up)">
      <div class="ssub" style="margin:4px 0 2px;">Repeat on</div>
      <div class="al-wd-row">
        ${AL_DAY_LBL.map((d, i) => `<button class="al-wd-btn ${window._alDraftDays.includes(i) ? 'on' : ''}" onclick="alarmToggleWd(${i})">${d}</button>`).join('')}
      </div>
      <div class="ssub" style="margin-bottom:12px;">Leave all days unselected for a one-time alarm.</div>
      <div style="display:flex;gap:8px;">
        <button class="ebtn" style="flex:1;background:var(--tgbg);border:1.5px solid var(--border);" onclick="alarmCancelNew()">Cancel</button>
        <button class="ebtn" style="flex:1;" onclick="alarmSaveNew()">Save Alarm</button>
      </div>
    </div>
  ` : `<button class="ebtn" style="width:100%;margin-top:14px;" onclick="alarmOpenNew()">+ Add Alarm</button>`;
        body.innerHTML = `<div>${rowsHtml}</div>${formHtml}`;
    };
    window.alarmOpenNew = function () {
        H('light');
        window._alFormOpen = true;
        window._alDraftDays = [];
        window.renderAlarmsSheet();
        setTimeout(() => {
            const t = document.getElementById('alTimeInput');
            if (t) {
                const now = new Date();
                t.value = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
            }
        }, 30);
    };
    window.alarmCancelNew = function () {
        H('light');
        window._alFormOpen = false;
        window.renderAlarmsSheet();
    };
    window.alarmToggleWd = function (d) {
        H('light');
        const idx = window._alDraftDays.indexOf(d);
        if (idx >= 0)
            window._alDraftDays.splice(idx, 1);
        else
            window._alDraftDays.push(d);
        window.renderAlarmsSheet();
    };
    window.alarmSaveNew = async function () {
        const timeEl = document.getElementById('alTimeInput');
        const labelEl = document.getElementById('alLabelInput');
        const val = timeEl && timeEl.value;
        if (!val) {
            T('⚠️ Pick a time');
            return;
        }
        const [hh, mm] = val.split(':').map(Number);
        const list = alLoad();
        list.push({
            id: uid('al'),
            hour: hh, minute: mm,
            label: (labelEl && labelEl.value.trim()) || '',
            days: window._alDraftDays.slice(),
            enabled: true,
            firedFor: ''
        });
        alSave(list);
        if (typeof window.requestNotifPerm === 'function') {
            try {
                await window.requestNotifPerm();
            }
            catch (e) { }
        }
        H('success');
        T('⏰ Alarm saved');
        window._alFormOpen = false;
        window.renderAlarmsSheet();
    };
    window.alarmToggleEnabled = function (id) {
        const list = alLoad();
        const a = list.find(x => x.id === id);
        if (!a)
            return;
        a.enabled = !a.enabled;
        alSave(list);
        H('light');
        window.renderAlarmsSheet();
    };
    window.alarmDeleteEntry = function (id) {
        const list = alLoad();
        const idx = list.findIndex(x => x.id === id);
        if (idx < 0)
            return;
        const removed = list[idx];
        list.splice(idx, 1);
        alSave(list);
        H('light');
        window.renderAlarmsSheet();
        if (typeof window.showUndoSnackbar === 'function') {
            window.showUndoSnackbar('Alarm deleted', function () {
                const cur = alLoad();
                cur.push(removed);
                alSave(cur);
                window.renderAlarmsSheet();
            });
        }
    };
    // Background checker — fires alarms even if the Alarms sheet isn't open
    function alCheckDue() {
        try {
            const list = alLoad();
            if (!list.length)
                return;
            const now = new Date();
            const todayKey = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
            let changed = false;
            list.forEach(a => {
                if (!a.enabled)
                    return;
                if (a.hour !== now.getHours() || a.minute !== now.getMinutes())
                    return;
                if (a.firedFor === todayKey)
                    return;
                if (a.days.length > 0 && !a.days.includes(now.getDay()))
                    return;
                // Fire!
                const title = '⏰ ' + (a.label || 'Alarm');
                const body = alFmtTime(a.hour, a.minute);
                if (typeof window.logNotifHistory === 'function')
                    window.logNotifHistory(title, body, 'alarm');
                try {
                    if (window.Notification && Notification.permission === 'granted') {
                        new Notification(title, { body });
                    }
                }
                catch (e) { }
                T(title);
                H('medium');
                a.firedFor = todayKey;
                if (a.days.length === 0)
                    a.enabled = false; // one-time alarms auto-disable
                changed = true;
            });
            if (changed)
                alSave(list);
        }
        catch (e) { }
    }
    setInterval(alCheckDue, 20000);
    // ══════════════════════════════════════════════════════════════════════════════
    // 3. DAILY INSIGHTS — Weather / Gold & Forex / Muhurat
    // ══════════════════════════════════════════════════════════════════════════════
    window._insTab = window._insTab || 'fx';
    const WMO_MAP = {
        0: ['☀️', 'Clear sky'], 1: ['🌤️', 'Mostly clear'], 2: ['⛅', 'Partly cloudy'], 3: ['☁️', 'Overcast'],
        45: ['🌫️', 'Fog'], 48: ['🌫️', 'Depositing fog'],
        51: ['🌦️', 'Light drizzle'], 53: ['🌦️', 'Drizzle'], 55: ['🌧️', 'Dense drizzle'],
        61: ['🌧️', 'Slight rain'], 63: ['🌧️', 'Rain'], 65: ['🌧️', 'Heavy rain'],
        71: ['🌨️', 'Slight snow'], 73: ['🌨️', 'Snow'], 75: ['❄️', 'Heavy snow'],
        80: ['🌦️', 'Rain showers'], 81: ['🌧️', 'Rain showers'], 82: ['⛈️', 'Violent showers'],
        95: ['⛈️', 'Thunderstorm'], 96: ['⛈️', 'Thunderstorm + hail'], 99: ['⛈️', 'Severe thunderstorm']
    };
    function insightsWeatherIcon(code) { return (WMO_MAP[code] || ['🌡️', 'Weather'])[0]; }
    function insightsWeatherDesc(code) { return (WMO_MAP[code] || ['🌡️', 'Weather'])[1]; }
    window.renderInsightsSheet = function () {
        const body = document.getElementById('insightsBody');
        if (!body)
            return;
        const tab = window._insTab;
        body.innerHTML = `
    <div class="ins-tabs">
      <button class="ins-tab-btn ${tab === 'fx' ? 'on' : ''}" onclick="insightsSwitchTab('fx')">💱 Gold &amp; Forex</button>
      <button class="ins-tab-btn ${tab === 'muhurat' ? 'on' : ''}" onclick="insightsSwitchTab('muhurat')">🕉️ Muhurat</button>
      <button class="ins-tab-btn ${tab === 'rashifal' ? 'on' : ''}" onclick="insightsSwitchTab('rashifal')">🔮 Rashifal</button>
    </div>
    <div id="insightsPane"><div class="ins-empty">Loading…</div></div>
  `;
        if (tab === 'fx')
            insightsLoadGoldFx();
        else if (tab === 'rashifal')
            window.renderRashifalSheet();
        else
            insightsRenderMuhurat();
    };
    window.insightsSwitchTab = function (tab) {
        H('light');
        window._insTab = tab;
        window.renderInsightsSheet();
    };
    // ── Weather (Open-Meteo, free, no key) ──────────────────────────────────────
    function insightsLoadWeather(targetId) {
        targetId = targetId || 'insightsPane';
        const pane = document.getElementById(targetId);
        if (!pane)
            return;
        const cache = LSget('vikram_weather_cache', null);
        const fresh = cache && (Date.now() - cache.ts < 30 * 60 * 1000);
        if (fresh) {
            insightsRenderWeather(cache.data, !!cache.approx, targetId);
            return;
        }
        pane.innerHTML = window.skelWeatherHTML();
        const fetchWeatherFor = async (lat, lon, approx) => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
                const res = await fetch(url);
                if (!res.ok)
                    throw new Error('bad response');
                const data = await res.json();
                LSset('vikram_weather_cache', { ts: Date.now(), lat, lon, approx: !!approx, data });
                insightsRenderWeather(data, approx, targetId);
            }
            catch (e) {
                const el = document.getElementById(targetId);
                if (el) {
                    el.innerHTML = `<div class="ins-empty">Couldn't reach the weather service. Check your connection and try again.<br><br><button class="ebtn" onclick="insightsLoadWeather('${targetId}')">Retry</button></div>`;
                }
            }
        };
        // Fallback: approximate location from IP address, used when GPS permission
        // is unavailable, denied, or blocked (e.g. insecure context, browser policy).
        const fallbackToIPLocation = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok)
                    throw new Error('bad response');
                const info = await res.json();
                if (info && info.latitude != null && info.longitude != null) {
                    await fetchWeatherFor(info.latitude.toFixed(3), info.longitude.toFixed(3), true);
                    return;
                }
                throw new Error('no coords');
            }
            catch (e) {
                const el = document.getElementById(targetId);
                if (el) {
                    el.innerHTML = `<div class="ins-empty">Location access was denied and an approximate location couldn't be found, so weather can't be shown.<br><br><button class="ebtn" onclick="insightsLoadWeather('${targetId}')">Try Again</button></div>`;
                }
            }
        };
        if (!navigator.geolocation) {
            fallbackToIPLocation();
            return;
        }
        if (!window.isSecureContext) {
            // Browsers block the geolocation prompt outright on insecure origins
            // (e.g. plain http:// or some file:// contexts), which shows as "denied".
            fallbackToIPLocation();
            return;
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude.toFixed(3);
            const lon = pos.coords.longitude.toFixed(3);
            fetchWeatherFor(lat, lon, false);
        }, () => { fallbackToIPLocation(); }, { timeout: 10000 });
    }
    function insightsRenderWeather(data, approx, targetId) {
        targetId = targetId || 'insightsPane';
        const pane = document.getElementById(targetId);
        if (!pane)
            return;
        try {
            const cur = data.current || {};
            const daily = data.daily || {};
            const code = cur.weather_code;
            const icon = insightsWeatherIcon(code);
            const desc = insightsWeatherDesc(code);
            const temp = Math.round(cur.temperature_2m);
            const hi = daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[0]) : '–';
            const lo = daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[0]) : '–';
            const sourceNote = approx
                ? 'Powered by Open-Meteo · Approximate location (from IP) · Updated just now'
                : 'Powered by Open-Meteo · Updated just now';
            pane.innerHTML = `
      <div class="ins-weather-card">
        <div class="ins-weather-icon">${icon}</div>
        <div>
          <div class="ins-weather-temp">${temp}°C</div>
          <div class="ins-weather-desc">${esc(desc)}</div>
        </div>
      </div>
      <div class="ins-weather-grid">
        <div class="ins-weather-mini"><div class="ins-weather-mini-val">${hi}° / ${lo}°</div><div class="ins-weather-mini-lbl">High / Low</div></div>
        <div class="ins-weather-mini"><div class="ins-weather-mini-val">${cur.relative_humidity_2m ?? '–'}%</div><div class="ins-weather-mini-lbl">Humidity</div></div>
        <div class="ins-weather-mini"><div class="ins-weather-mini-val">${Math.round(cur.wind_speed_10m ?? 0)} km/h</div><div class="ins-weather-mini-lbl">Wind</div></div>
      </div>
      <div class="ssub" style="text-align:center;margin-top:12px;">${esc(sourceNote)}</div>
    `;
        }
        catch (e) {
            pane.innerHTML = `<div class="ins-empty">Weather data looked unusual. Please try again.</div>`;
        }
    }
    // ── Gold / Silver & Forex ────────────────────────────────────────────────────
    function insightsLoadGoldFx() {
        const pane = document.getElementById('insightsPane');
        if (!pane)
            return;
        const cache = LSget('vikram_goldfx_cache_v3', null);
        const fresh = cache && (Date.now() - cache.ts < 60 * 60 * 1000);
        if (fresh) {
            insightsRenderGoldFx(cache.data);
            return;
        }
        pane.innerHTML = window.skelRowsHTML(4, { header: true });
        insightsFetchGoldFx(cache);
    }
    window.insightsRetryGoldFx = function () {
        const pane = document.getElementById('insightsPane');
        if (pane)
            pane.innerHTML = window.skelRowsHTML(4, { header: true });
        insightsFetchGoldFx(LSget('vikram_goldfx_cache_v3', null));
    };
    // FX_CURRENCIES: [code, label, unit]. `unit` is the block size the source
    // quotes the rate per (e.g. NRB/Hamro Patro list Indian Rupee per 100, not per 1) —
    // used to normalize everything to a per-1-unit rate.
    const FX_CURRENCIES = [
        ['INR', 'Indian Rupee', 100],
        ['USD', 'U.S. dollar', 1],
        ['EUR', 'European euro', 1]
    ];
    // Small helper so a slow/blocked request can't leave the sheet stuck on
    // "Fetching…" forever — times out and lets the caller fall back gracefully.
    function fetchWithTimeout(url, ms) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), ms);
        return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(timer));
    }
    async function insightsFetchGoldFx(staleCache) {
        const result = { gold: null, silver: null, fx: [] };
        // 1. Gold / Silver — Hamro Patro's dedicated gold page (same domain already used elsewhere in the app)
        try {
            const res = await fetchWithTimeout('https://english.hamropatro.com/gold', 9000);
            if (res.ok) {
                const text = (await res.text()).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
                const goldM = text.match(/Gold Hallmark\s*-\s*tola[^0-9]{0,60}Nrs\.?\s*([\d,]+(?:\.\d+)?)/i);
                const silverM = text.match(/Silver\s*-\s*tola[^0-9]{0,60}Nrs\.?\s*([\d,]+(?:\.\d+)?)/i);
                if (goldM && parseFloat(goldM[1].replace(/,/g, '')) > 0)
                    result.gold = goldM[1];
                if (silverM && parseFloat(silverM[1].replace(/,/g, '')) > 0)
                    result.silver = silverM[1];
            }
        }
        catch (e) { /* graceful — gold/silver stay null */ }
        // 2. Forex — Hamro Patro's dedicated forex page (sourced from Nepal Rastra Bank)
        try {
            const res2 = await fetchWithTimeout('https://english.hamropatro.com/forex', 9000);
            if (res2.ok) {
                const text = (await res2.text()).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
                FX_CURRENCIES.forEach(([code, label, unit]) => {
                    const safeLabel = String(label).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    // Capture an optional "(N)" quoting unit (e.g. "Indian Rupee (100)") so
                    // we can detect if the page's unit ever changes from what we expect.
                    const re = new RegExp(safeLabel + '\\s*(?:\\((\\d+)\\))?[^0-9]{0,15}([\\d,]+(?:\\.\\d+)?)[^0-9]{1,12}([\\d,]+(?:\\.\\d+)?|-)', 'i');
                    const m = text.match(re);
                    if (m) {
                        const pageUnit = m[1] ? parseInt(m[1], 10) : 1;
                        const div = (pageUnit || unit || 1);
                        const buyNum = parseFloat(m[2].replace(/,/g, ''));
                        const sellNum = (m[3] && m[3] !== '-') ? parseFloat(m[3].replace(/,/g, '')) : null;
                        if (Number.isFinite(buyNum)) {
                            const buy = (buyNum / div).toFixed(2);
                            const sell = sellNum != null ? (sellNum / div).toFixed(2) : buy;
                            result.fx.push({ code, label, buy, sell });
                        }
                    }
                });
            }
        }
        catch (e) { /* graceful — fx list stays empty */ }
        const hasData = result.gold || result.silver || result.fx.length;
        if (hasData) {
            LSset('vikram_goldfx_cache_v3', { ts: Date.now(), data: result });
            if (window._insTab === 'fx')
                insightsRenderGoldFx(result);
        }
        else if (window._insTab === 'fx') {
            // Nothing came back this time — fall back to the last known-good data
            // (clearly marked as stale) instead of a bare error, if we have any.
            if (staleCache && staleCache.data && (staleCache.data.gold || staleCache.data.silver || (staleCache.data.fx || []).length)) {
                insightsRenderGoldFx(staleCache.data, staleCache.ts);
            }
            else {
                insightsRenderGoldFx(result);
            }
        }
    }
    function insightsRenderGoldFx(data, staleTs) {
        const pane = document.getElementById('insightsPane');
        if (!pane)
            return;
        const hasFx = data.fx && data.fx.length;
        const hasMetal = data.gold || data.silver;
        if (!hasFx && !hasMetal) {
            pane.innerHTML = `<div class="ins-empty">Couldn't reach the rates service. Check your connection and try again.<br><br><button class="ebtn" onclick="insightsRetryGoldFx()">Retry</button></div>`;
            return;
        }
        let html = '';
        if (hasMetal) {
            html += `<div class="ssect" style="margin-bottom:4px;">Gold &amp; Silver (per tola)</div>`;
            if (data.gold)
                html += `<div class="ins-fx-row"><div class="ins-fx-name">🟡 Gold (Hallmark)</div><div class="ins-fx-val">Rs ${esc(data.gold)}</div></div>`;
            if (data.silver)
                html += `<div class="ins-fx-row"><div class="ins-fx-name">⚪ Silver</div><div class="ins-fx-val">Rs ${esc(data.silver)}</div></div>`;
        }
        if (hasFx) {
            html += `<div class="ssect" style="margin:16px 0 4px;">Forex (Rs per unit) · NRB</div>`;
            data.fx.forEach(f => {
                html += `<div class="ins-fx-row"><div class="ins-fx-name">${esc(f.code)}</div><div class="ins-fx-val">Rs ${esc(f.sell)}</div></div>`;
            });
        }
        const sourceNote = staleTs
            ? `Source: Hamro Patro / Nepal Rastra Bank · Showing last saved rates from ${new Date(staleTs).toLocaleString()}`
            : `Source: Hamro Patro / Nepal Rastra Bank`;
        html += `<div class="ssub" style="text-align:center;margin-top:14px;">${esc(sourceNote)}</div>`;
        if (staleTs) {
            html += `<div style="text-align:center;margin-top:8px;"><button class="ebtn" style="padding:8px 16px;font-size:12.5px;" onclick="insightsRetryGoldFx()">Retry for latest</button></div>`;
        }
        pane.innerHTML = html;
    }
    // ── Muhurat / Sahait finder (computed from Panchang data already in the app) ─
    const TITHI_NAMES = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'];
    const TITHI_GOOD = [2, 3, 5, 7, 10, 11, 13]; // traditional "good for new beginnings" 1-indexed within each paksha
    const TITHI_CAUTION = [4, 9, 14, 15]; // rikta tithis + purnima/amavasya — traditionally approached with more care
    function insightsRenderMuhurat() {
        const pane = document.getElementById('insightsPane');
        if (!pane)
            return;
        try {
            const ad = (typeof TODAY !== 'undefined') ? TODAY : new Date();
            const st = _panchangSunTimes(ad);
            // Abhijit Muhurat ≈ solar-noon midpoint ± 24 minutes
            const mid = (st.sunriseMin + st.sunsetMin) / 2;
            const abhijitStart = _panchangMinsToTime(mid - 24);
            const abhijitEnd = _panchangMinsToTime(mid + 24);
            // Rahu Kaal (same segment logic used by getPanchangText)
            const segMap = { 0: 8, 1: 2, 2: 7, 3: 5, 4: 6, 5: 4, 6: 3 };
            const seg = segMap[ad.getDay()];
            const dayLen = (st.sunsetMin - st.sunriseMin) / 8;
            const rkStart = st.sunriseMin + (seg - 1) * dayLen;
            const rkEnd = rkStart + dayLen;
            const tithiIdx = getTithi(ad);
            const paksha = tithiIdx <= 15 ? 'Shukla' : 'Krishna';
            const tithiPos = tithiIdx <= 15 ? tithiIdx : tithiIdx - 15;
            const tithiName = TITHI_NAMES[tithiPos - 1] || '';
            const isGood = TITHI_GOOD.includes(tithiPos);
            const needsCaution = TITHI_CAUTION.includes(tithiPos);
            let adviceHtml;
            if (isGood) {
                adviceHtml = `<div class="ssub">✅ ${paksha} ${esc(tithiName)} is traditionally considered favorable for starting new work, travel, or ceremonies.</div>`;
            }
            else if (needsCaution) {
                adviceHtml = `<div class="ssub">⚠️ ${paksha} ${esc(tithiName)} is traditionally approached with more care for new beginnings — established routines are fine.</div>`;
            }
            else {
                adviceHtml = `<div class="ssub">${paksha} ${esc(tithiName)} — a fairly ordinary day by tradition, suitable for routine activities.</div>`;
            }
            pane.innerHTML = `
      <div class="ins-muhurat-card">
        <div class="ins-muhurat-title">Abhijit Muhurat</div>
        <div class="ins-muhurat-time">${abhijitStart} – ${abhijitEnd}</div>
        <div class="ins-muhurat-sub">Considered the most auspicious window of the day.</div>
      </div>
      <div class="ins-muhurat-card" style="background:linear-gradient(135deg,rgba(239,68,68,.09),rgba(185,28,28,.05));border-color:rgba(239,68,68,.16);">
        <div class="ins-muhurat-title" style="color:#ef4444;">Rahu Kaal (avoid new beginnings)</div>
        <div class="ins-muhurat-time">${_panchangMinsToTime(rkStart)} – ${_panchangMinsToTime(rkEnd)}</div>
      </div>
      <div class="ssect" style="margin:16px 0 4px;">Today's Tithi</div>
      <div style="font-size:15px;font-weight:800;color:var(--dtext);margin-bottom:4px;">${paksha} Paksha, ${esc(tithiName)}</div>
      ${adviceHtml}
      <div class="ssub" style="margin-top:14px;text-align:center;">Based on traditional Panchang guidance — for reference only, not personalized advice.</div>
    `;
        }
        catch (e) {
            pane.innerHTML = `<div class="ins-empty">Couldn't compute today's Muhurat.</div>`;
        }
    }
    // ══════════════════════════════════════════════════════════════════════════════
    // 4. RASHIFAL — DAILY HOROSCOPE (deterministic, generated client-side)
    // ══════════════════════════════════════════════════════════════════════════════
    const ZODIAC = [
        { key: 'aries', name: 'Aries', emoji: '♈', start: [3, 21], end: [4, 19] },
        { key: 'taurus', name: 'Taurus', emoji: '♉', start: [4, 20], end: [5, 20] },
        { key: 'gemini', name: 'Gemini', emoji: '♊', start: [5, 21], end: [6, 20] },
        { key: 'cancer', name: 'Cancer', emoji: '♋', start: [6, 21], end: [7, 22] },
        { key: 'leo', name: 'Leo', emoji: '♌', start: [7, 23], end: [8, 22] },
        { key: 'virgo', name: 'Virgo', emoji: '♍', start: [8, 23], end: [9, 22] },
        { key: 'libra', name: 'Libra', emoji: '♎', start: [9, 23], end: [10, 22] },
        { key: 'scorpio', name: 'Scorpio', emoji: '♏', start: [10, 23], end: [11, 21] },
        { key: 'sagittarius', name: 'Sagittarius', emoji: '♐', start: [11, 22], end: [12, 21] },
        { key: 'capricorn', name: 'Capricorn', emoji: '♑', start: [12, 22], end: [1, 19] },
        { key: 'aquarius', name: 'Aquarius', emoji: '♒', start: [1, 20], end: [2, 18] },
        { key: 'pisces', name: 'Pisces', emoji: '♓', start: [2, 19], end: [3, 20] }
    ];
    const RF_MOOD = ['energetic and ready for challenges', 'calm and reflective', 'a little restless but curious', 'confident and clear-headed', 'warm and sociable', 'focused and productive', 'dreamy and imaginative', 'steady and grounded', 'playful and light-hearted', 'determined and driven'];
    const RF_LOVE = [
        'A heartfelt conversation could bring you closer to someone special.',
        'Single? An unexpected spark may catch your attention today.',
        'Existing relationships benefit from small, thoughtful gestures today.',
        'Take time to really listen to what your partner needs today.',
        'A little patience goes a long way in matters of the heart.',
        'Old friends may reconnect and bring welcome warmth.',
        'Expressing your feelings openly will be well received today.',
        'Family bonds feel especially strong today.',
        'Romance takes a backseat to self-care today, and that\'s okay.',
        'A pleasant surprise awaits in your closest relationship.'
    ];
    const RF_CAREER = [
        'A pending task finally moves forward with less friction than expected.',
        'Your ideas get noticed — speak up in meetings today.',
        'Good day to organize and plan rather than start something new.',
        'Collaboration goes more smoothly than working solo today.',
        'A financial decision deserves a second look before committing.',
        'Your hard work starts paying off — recognition may follow soon.',
        'Avoid rushing decisions; details matter more than usual today.',
        'A new opportunity may appear from an unexpected direction.',
        'Steady, practical effort wins over big gestures today.',
        'Trust your instincts on a tricky work situation.'
    ];
    const RF_HEALTH = [
        'A short walk or stretch will do wonders for your energy.',
        'Stay hydrated — you may feel more tired than usual.',
        'Good day to catch up on sleep you\'ve been missing.',
        'Your energy is high — a good day for exercise.',
        'Mind takes priority over body today; a little rest helps both.',
        'Eating a bit lighter today will keep you feeling sharp.',
        'Stress may build up — a few minutes of quiet breathing helps.',
        'Your body is asking for a slower pace today.',
        'A great day to start a small healthy habit.',
        'Overall vitality is solid — keep doing what\'s working.'
    ];
    const RF_COLORS = ['Emerald Green', 'Royal Blue', 'Sunflower Yellow', 'Coral Pink', 'Deep Maroon', 'Silver', 'Turquoise', 'Lavender', 'Golden Amber', 'Charcoal Grey'];
    function hashStr(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = (h * 31 + s.charCodeAt(i)) | 0;
        }
        return Math.abs(h);
    }
    function rfDateKey(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    function rfDetectSign() {
        try {
            const profile = LSget('vikram_profile', null);
            if (profile && profile.bday && profile.bday.y) {
                const ad = bsToAd(profile.bday.y, profile.bday.m, profile.bday.d);
                const mo = ad.getMonth() + 1, da = ad.getDate();
                for (const z of ZODIAC) {
                    const [sm, sd] = z.start, [em, ed] = z.end;
                    if (sm > em) { // wraps around new year (Capricorn)
                        if ((mo === sm && da >= sd) || (mo === em && da <= ed))
                            return z.key;
                    }
                    else {
                        if ((mo === sm && da >= sd) || (mo === em && da <= ed) || (mo > sm && mo < em))
                            return z.key;
                    }
                }
            }
        }
        catch (e) { }
        return 'aries';
    }
    // A sign the user manually picked always wins over birthday-based detection,
    // and is remembered across app restarts.
    function rfSavedSign() {
        try {
            return localStorage.getItem('vikram_rf_sign_choice') || null;
        }
        catch (e) {
            return null;
        }
    }
    function rfResolveSign() {
        return rfSavedSign() || rfDetectSign();
    }
    window._rfSign = window._rfSign || null;
    window.renderRashifalSheet = function () {
        if (!window._rfSign)
            window._rfSign = rfResolveSign();
        const body = document.getElementById('insightsPane');
        if (!body)
            return;
        const sign = ZODIAC.find(z => z.key === window._rfSign) || ZODIAC[0];
        const today = (typeof TODAY !== 'undefined') ? TODAY : new Date();
        const dateKey = rfDateKey(today);
        const salt = dateKey + '|' + sign.key + '|';
        const mood = RF_MOOD[hashStr(salt + 'mood') % RF_MOOD.length];
        const love = RF_LOVE[hashStr(salt + 'love') % RF_LOVE.length];
        const career = RF_CAREER[hashStr(salt + 'career') % RF_CAREER.length];
        const health = RF_HEALTH[hashStr(salt + 'health') % RF_HEALTH.length];
        const color = RF_COLORS[hashStr(salt + 'color') % RF_COLORS.length];
        const luckyNum = (hashStr(salt + 'number') % 49) + 1;
        const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        const chipsHtml = ZODIAC.map(z => `
    <div class="rf-sign-chip ${z.key === sign.key ? 'on' : ''}" onclick="rashifalSelectSign('${z.key}')">
      <div class="rf-sign-emoji">${z.emoji}</div>
      <div class="rf-sign-name">${z.name}</div>
    </div>
  `).join('');
        body.innerHTML = `
    <div class="ssub" style="padding:0 2px 8px;">Pick your sign — Vikram will remember it.</div>
    <div class="rf-sign-row">${chipsHtml}</div>
    <div class="rf-card">
      <div class="rf-card-sign">${sign.emoji} ${sign.name}</div>
      <div class="rf-card-date">${dateStr}</div>
      <div class="rf-card-text">Today you're feeling <b>${mood}</b>. ${love}</div>
      <div class="rf-card-text" style="margin-top:6px;"><b>Career:</b> ${career}</div>
      <div class="rf-card-text" style="margin-top:6px;"><b>Health:</b> ${health}</div>
      <div class="rf-card-grid">
        <div class="rf-card-item"><div class="rf-card-item-lbl">Lucky Color</div><div class="rf-card-item-val">${color}</div></div>
        <div class="rf-card-item"><div class="rf-card-item-lbl">Lucky Number</div><div class="rf-card-item-val">${luckyNum}</div></div>
      </div>
    </div>
    <div class="ssub" style="text-align:center;margin-top:14px;">For entertainment purposes — a little daily inspiration ✨</div>
  `;
    };
    window.rashifalSelectSign = function (key) {
        H('light');
        window._rfSign = key;
        try {
            localStorage.setItem('vikram_rf_sign_choice', key);
        }
        catch (e) { }
        window.renderRashifalSheet();
        if (typeof window.renderHomeRashifal === 'function')
            window.renderHomeRashifal();
    };
    // ══════════════════════════════════════════════════════════════════════════════
    // 5. FAMILY SHARE — shared shopping list + shared simple event list (Firebase)
    // ══════════════════════════════════════════════════════════════════════════════
    const FAM_KEY = 'vikram_family';
    window._famSeg = window._famSeg || 'shopping';
    window._famData = window._famData || { shopping: [], events: [] };
    window._famListenerRef = null;
    window._famSyncedAt = window._famSyncedAt || 0; // updatedAt of the version we last knew the server had
    window._famConflict = window._famConflict || null;
    window._famPushBusy = false; // avoid overlapping conflict-checks from rapid edits
    function famLocal() { return LSget(FAM_KEY, { code: null, role: null }); }
    function famSaveLocal(d) { LSset(FAM_KEY, d); }
    function famDb() {
        try {
            return (window.firebase && firebase.database) ? firebase.database() : null;
        }
        catch (e) {
            return null;
        }
    }
    function famEnsureAuth(cb) {
        try {
            if (!window.firebase || !firebase.auth) {
                cb(false);
                return;
            }
            const cur = firebase.auth().currentUser;
            if (cur) {
                cb(true);
                return;
            }
            // Don't assume "no current user yet" means "truly signed out" — Firebase
            // restores a persisted Google session asynchronously on page load, so a
            // synchronous currentUser check can read null a split second before that
            // restore completes. Falling back to signInAnonymously() at that instant
            // would overwrite the incoming Google session. Wait for the one-time
            // onAuthStateChanged callback (fires once Firebase has actually checked)
            // before deciding there's really no one signed in.
            const unsubscribe = firebase.auth().onAuthStateChanged(function (u) {
                unsubscribe();
                if (u) {
                    cb(true);
                    return;
                }
                firebase.auth().signInAnonymously().then(() => cb(true)).catch(() => cb(false));
            });
        }
        catch (e) {
            cb(false);
        }
    }
    function famGenCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let s = 'FAM-';
        for (let i = 0; i < 4; i++)
            s += chars[Math.floor(Math.random() * chars.length)];
        return s;
    }
    // Reuses the existing "cycles/" Realtime Database collection (already permitted
    // by this app's Firebase rules for any authenticated user + code), storing a
    // family-share payload instead of cycle data. The distinct "FAM-" code prefix
    // keeps it from ever colliding with real couple-pairing codes.
    function famRef(code) {
        const db = famDb();
        return db ? db.ref('cycles/' + code) : null;
    }
    window.renderFamilySheet = function () {
        const body = document.getElementById('familyBody');
        const sub = document.getElementById('famSubtitle');
        if (!body)
            return;
        const local = famLocal();
        if (!local.code) {
            if (sub)
                sub.textContent = 'Shared events & shopping list';
            body.innerHTML = `
      <div class="fam-pair-card">
        <div style="font-size:34px;">👨‍👩‍👧‍👦</div>
        <div class="ssect" style="margin:8px 0 4px;">Share a list with family</div>
        <div class="ssub" style="margin-bottom:16px;">Create a code and share it with a family member, or join theirs.</div>
        <button class="ebtn" style="width:100%;margin-bottom:10px;" onclick="famCreateCode()">Create a Family Code</button>
        <input type="text" class="einput" id="famJoinInput" placeholder="Enter a code (e.g. FAM-4K9Q)" style="text-transform:uppercase;text-align:center;">
        <button class="ebtn" style="width:100%;background:var(--tgbg);border:1.5px solid var(--border);" onclick="famJoinCode()">Join with Code</button>
      </div>
    `;
            return;
        }
        if (sub)
            sub.textContent = 'Code: ' + local.code;
        const seg = window._famSeg;
        const data = window._famData || { shopping: [], events: [] };
        let contentHtml = '';
        if (seg === 'shopping') {
            const items = (data.shopping || []).slice().sort((a, b) => a.done - b.done || b.ts - a.ts);
            contentHtml = items.length ? items.map(it => `
      <div class="fam-item-row">
        <div class="fam-item-check ${it.done ? 'on' : ''}" onclick="famToggleShoppingItem('${it.id}')">${it.done ? '✓' : ''}</div>
        <div class="fam-item-text ${it.done ? 'done' : ''}">${esc(it.text)}</div>
        <button class="fam-item-del" onclick="famDeleteShoppingItem('${it.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('') : `<div class="ins-empty">Shopping list is empty. Add something below!</div>`;
            contentHtml += `
      <div style="display:flex;gap:8px;margin-top:14px;">
        <input type="text" class="einput" id="famShopInput" placeholder="Add an item…" style="margin-bottom:0;">
        <button class="ebtn" style="flex-shrink:0;" onclick="famAddShoppingItem()">Add</button>
      </div>
    `;
        }
        else {
            const evts = (data.events || []).slice().sort((a, b) => a.ts - b.ts);
            contentHtml = evts.length ? evts.map(ev => `
      <div class="fam-item-row">
        <div style="flex:1;">
          <div class="fam-item-text">${esc(ev.text)}</div>
          <div class="ssub" style="margin-top:1px;">${esc(ev.date || '')}</div>
        </div>
        <button class="fam-item-del" onclick="famDeleteEvent('${ev.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('') : `<div class="ins-empty">No shared events yet. Add one below!</div>`;
            contentHtml += `
      <div style="margin-top:14px;">
        <input type="text" class="einput" id="famEventTextInput" placeholder="What's the plan?">
        <div style="display:flex;gap:8px;">
          <input type="date" class="einput" id="famEventDateInput" style="flex:1;">
          <button class="ebtn" style="flex-shrink:0;" onclick="famAddEvent()">Add</button>
        </div>
      </div>
    `;
        }
        body.innerHTML = `
    <div class="fam-seg">
      <button class="fam-seg-btn ${seg === 'shopping' ? 'on' : ''}" onclick="famSwitchSeg('shopping')">🛒 Shopping</button>
      <button class="fam-seg-btn ${seg === 'events' ? 'on' : ''}" onclick="famSwitchSeg('events')">📅 Shared Plans</button>
    </div>
    <div>${contentHtml}</div>
    <button class="ebtn" style="width:100%;margin-top:22px;background:var(--tgbg);border:1.5px solid var(--border);color:#e0473a;" onclick="famLeaveShare()">Leave Family Share</button>
  `;
    };
    window.famCreateCode = function () {
        famEnsureAuth((ok) => {
            if (!ok) {
                T('⚠️ Could not connect. Check your internet connection.');
                return;
            }
            const code = famGenCode();
            const ref = famRef(code);
            if (!ref) {
                T('⚠️ Sync is unavailable right now.');
                return;
            }
            const payload = { type: 'family', shopping: [], events: [], updatedAt: Date.now() };
            ref.set(payload).then(() => {
                famSaveLocal({ code, role: 'owner' });
                window._famData = { shopping: [], events: [] };
                famAttachListener(code);
                H('success');
                T('👨‍👩‍👧 Code created — share it with family!');
                window.renderFamilySheet();
            }).catch(() => { T('⚠️ Could not create the share. Try again.'); });
        });
    };
    window.famJoinCode = function () {
        const inp = document.getElementById('famJoinInput');
        let code = (inp && inp.value || '').trim().toUpperCase();
        if (!code) {
            T('⚠️ Enter a code first');
            return;
        }
        if (!code.startsWith('FAM')) {
            T('⚠️ That doesn\'t look like a Family Share code');
            return;
        }
        famEnsureAuth((ok) => {
            if (!ok) {
                T('⚠️ Could not connect. Check your internet connection.');
                return;
            }
            const ref = famRef(code);
            if (!ref) {
                T('⚠️ Sync is unavailable right now.');
                return;
            }
            ref.once('value').then(snap => {
                if (!snap.exists()) {
                    T('⚠️ Code not found');
                    return;
                }
                famSaveLocal({ code, role: 'joined' });
                famAttachListener(code);
                H('success');
                T('🎉 Joined family share!');
                window.renderFamilySheet();
            }).catch(() => { T('⚠️ Could not join. Try again.'); });
        });
    };
    function famAttachListener(code) {
        const ref = famRef(code);
        if (!ref)
            return;
        if (window._famListenerRef) {
            try {
                window._famListenerRef.off();
            }
            catch (e) { }
        }
        window._famListenerRef = ref;
        ref.on('value', snap => {
            const val = snap.val() || {};
            // A conflict prompt is already up for this exact version — don't silently
            // clobber it out from under the person while they're deciding.
            if (window._famConflict && window._famConflict.code === code)
                return;
            window._famData = { shopping: val.shopping || [], events: val.events || [] };
            window._famSyncedAt = val.updatedAt || 0;
            if (document.getElementById('familyBody'))
                window.renderFamilySheet();
        });
    }
    function famPush() {
        const local = famLocal();
        if (!local.code)
            return;
        const ref = famRef(local.code);
        if (!ref)
            return;
        if (window._famPushBusy)
            return;
        window._famPushBusy = true;
        const baseVersion = window._famSyncedAt || 0;
        const code = local.code;
        ref.once('value').then(snap => {
            const server = snap.val() || {};
            const serverUpdatedAt = server.updatedAt || 0;
            if (serverUpdatedAt > baseVersion) {
                // Someone else's edit reached the server since we last synced — don't
                // silently overwrite it. Let the person choose which version to keep.
                window._famConflict = {
                    code: code,
                    mine: { shopping: (window._famData.shopping || []).slice(), events: (window._famData.events || []).slice() },
                    theirs: { shopping: server.shopping || [], events: server.events || [], updatedAt: serverUpdatedAt }
                };
                window._famPushBusy = false;
                famShowConflict();
                return;
            }
            const now = Date.now();
            ref.update({ shopping: window._famData.shopping, events: window._famData.events, updatedAt: now })
                .then(() => { window._famSyncedAt = now; window._famPushBusy = false; })
                .catch(() => { window._famPushBusy = false; });
        }).catch(() => {
            // Couldn't reach the server (offline) — write anyway so it queues and
            // flushes once back online; Firebase's own connection state will surface
            // any real conflict the next time a push round-trips successfully.
            const now = Date.now();
            ref.update({ shopping: window._famData.shopping, events: window._famData.events, updatedAt: now }).catch(() => { });
            window._famPushBusy = false;
        });
    }
    window.famShowConflict = function () {
        const ov = document.getElementById('famConflictOverlay');
        if (!ov)
            return;
        ov.classList.add('open');
    };
    window.famConflictClose = function (e) {
        if (e && e.target && e.target.id !== 'famConflictOverlay')
            return;
        // Tapping outside doesn't silently pick a side — keep the prompt up.
    };
    window.famConflictResolve = function (choice) {
        const conflict = window._famConflict;
        if (!conflict)
            return;
        H('light');
        const ref = famRef(conflict.code);
        const ov = document.getElementById('famConflictOverlay');
        if (choice === 'mine') {
            const now = Date.now();
            window._famData = { shopping: conflict.mine.shopping, events: conflict.mine.events };
            if (ref) {
                ref.update({ shopping: conflict.mine.shopping, events: conflict.mine.events, updatedAt: now })
                    .then(() => { window._famSyncedAt = now; })
                    .catch(() => { T('⚠️ Could not save — try again once you\'re back online'); });
            }
            T('✅ Kept your version');
        }
        else {
            window._famData = { shopping: conflict.theirs.shopping, events: conflict.theirs.events };
            window._famSyncedAt = conflict.theirs.updatedAt;
            T('Kept their version');
        }
        window._famConflict = null;
        if (ov)
            ov.classList.remove('open');
        window.renderFamilySheet();
    };
    window.famSwitchSeg = function (seg) {
        H('light');
        window._famSeg = seg;
        window.renderFamilySheet();
    };
    window.famAddShoppingItem = function () {
        const inp = document.getElementById('famShopInput');
        const text = (inp && inp.value.trim());
        if (!text) {
            T('⚠️ Type something to add');
            return;
        }
        window._famData.shopping = window._famData.shopping || [];
        window._famData.shopping.push({ id: uid('fs'), text, done: false, ts: Date.now() });
        famPush();
        H('success');
        window.renderFamilySheet();
    };
    window.famToggleShoppingItem = function (id) {
        const it = (window._famData.shopping || []).find(x => x.id === id);
        if (!it)
            return;
        it.done = !it.done;
        famPush();
        H('light');
        window.renderFamilySheet();
    };
    window.famDeleteShoppingItem = function (id) {
        window._famData.shopping = (window._famData.shopping || []).filter(x => x.id !== id);
        famPush();
        H('light');
        window.renderFamilySheet();
    };
    window.famAddEvent = function () {
        const textInp = document.getElementById('famEventTextInput');
        const dateInp = document.getElementById('famEventDateInput');
        const text = (textInp && textInp.value.trim());
        if (!text) {
            T('⚠️ Describe the plan first');
            return;
        }
        window._famData.events = window._famData.events || [];
        window._famData.events.push({ id: uid('fe'), text, date: (dateInp && dateInp.value) || '', ts: Date.now() });
        famPush();
        H('success');
        window.renderFamilySheet();
    };
    window.famDeleteEvent = function (id) {
        window._famData.events = (window._famData.events || []).filter(x => x.id !== id);
        famPush();
        H('light');
        window.renderFamilySheet();
    };
    window.famLeaveShare = function () {
        if (window._famListenerRef) {
            try {
                window._famListenerRef.off();
            }
            catch (e) { }
            window._famListenerRef = null;
        }
        famSaveLocal({ code: null, role: null });
        window._famData = { shopping: [], events: [] };
        window._famSyncedAt = 0;
        H('light');
        T('Left family share');
        window.renderFamilySheet();
        if (typeof renderProfileBackup === 'function')
            renderProfileBackup();
    };
    // Reconnect to an existing family share on app load
    (function famInit() {
        const local = famLocal();
        if (local.code) {
            famEnsureAuth((ok) => { if (ok)
                famAttachListener(local.code); });
        }
    })();
    // ══════════════════════════════════════════════════════════════════════════════
    // 6. NOTES — CHECKLIST ITEMS
    // ══════════════════════════════════════════════════════════════════════════════
    window.notesInsertChecklist = function () {
        const ed = document.getElementById('notesEditor');
        if (!ed)
            return;
        ed.focus();
        const html = '<div class="note-check" contenteditable="false"><span class="nc-box" onclick="noteToggleCheck(this)"></span><span class="nc-text" contenteditable="true">Checklist item</span></div><div><br></div>';
        try {
            document.execCommand('insertHTML', false, html);
        }
        catch (e) { }
        if (typeof window.notesSave === 'function')
            window.notesSave();
    };
    window.noteToggleCheck = function (boxEl) {
        H('light');
        const checked = boxEl.classList.toggle('checked');
        boxEl.textContent = checked ? '✓' : '';
        const textEl = boxEl.nextElementSibling;
        if (textEl)
            textEl.classList.toggle('nc-done', checked);
        if (typeof window.notesSave === 'function')
            window.notesSave();
    };
    // ══════════════════════════════════════════════════════════════════════════════
    // 7. RECURRING EVENT TEMPLATES (Add Event sheet)
    // ══════════════════════════════════════════════════════════════════════════════
    const TPL_KEY = 'vikram_event_templates';
    function tplLoad() { return LSget(TPL_KEY, []); }
    function tplSave(arr) { LSset(TPL_KEY, arr); }
    window.renderEventTemplates = function () {
        const row = document.getElementById('evTemplatesRow');
        if (!row)
            return;
        const tpls = tplLoad();
        row.innerHTML = tpls.map(t => `
    <div class="tpl-chip" onclick="tplApplyTemplate('${t.id}')">
      ⭐ ${esc(t.name)}
      <span class="tpl-chip-del" onclick="event.stopPropagation();tplDeleteTemplate('${t.id}')">✕</span>
    </div>
  `).join('') + `<div class="tpl-add-chip" onclick="tplSaveCurrentAsTemplate()">+ Save current as template</div>`;
    };
    window.tplApplyTemplate = function (id) {
        const tpl = tplLoad().find(t => t.id === id);
        if (!tpl)
            return;
        H('light');
        if (typeof resetRecurPanel === 'function')
            resetRecurPanel();
        const titleEl = document.getElementById('evT');
        const noteEl = document.getElementById('evN');
        if (titleEl)
            titleEl.value = tpl.title || '';
        if (noteEl)
            noteEl.value = tpl.note || '';
        try {
            const catBtn = document.querySelector('#evColorPicker [data-color="' + tpl.category + '"]');
            if (catBtn && typeof selectEvCat === 'function')
                selectEvCat(catBtn);
        }
        catch (e) { }
        if (tpl.recur && tpl.recur.freq) {
            try {
                if (typeof toggleRecurPanel === 'function')
                    toggleRecurPanel();
                if (typeof setRecurFreq === 'function')
                    setRecurFreq(tpl.recur.freq);
                if (tpl.recur.freq === 'weekly' && Array.isArray(tpl.recur.weekdays)) {
                    tpl.recur.weekdays.forEach(d => { if (typeof toggleRecurWd === 'function')
                        toggleRecurWd(d); });
                }
                const extra = Math.max(0, (tpl.recur.interval || 1) - 1);
                for (let i = 0; i < extra; i++) {
                    if (typeof stepRecurInterval === 'function')
                        stepRecurInterval(1);
                }
            }
            catch (e) { }
        }
        T('⭐ Template applied: ' + tpl.name);
    };
    window.tplSaveCurrentAsTemplate = function () {
        const titleEl = document.getElementById('evT');
        const noteEl = document.getElementById('evN');
        const title = (titleEl && titleEl.value.trim()) || '';
        if (!title) {
            T('⚠️ Add a title before saving a template');
            return;
        }
        let category = 'personal';
        try {
            const onBtn = document.querySelector('#evColorPicker .ae-seg-btn.on, #evColorPicker .ae-cat-card.on, #evColorPicker .ae-cat-pill.on, #evColorPicker .ev-cat-btn.on');
            if (onBtn && onBtn.dataset.color)
                category = onBtn.dataset.color;
        }
        catch (e) { }
        let recur = null;
        try {
            if (window._recurState && window._recurState.enabled) {
                recur = {
                    freq: window._recurState.freq,
                    weekdays: window._recurState.weekdays ? [...window._recurState.weekdays] : [],
                    interval: window._recurState.interval || 1
                };
            }
        }
        catch (e) { }
        const tpls = tplLoad();
        tpls.push({ id: uid('tpl'), name: title, title, note: (noteEl && noteEl.value.trim()) || '', category, recur });
        tplSave(tpls);
        H('success');
        T('⭐ Saved as template');
        window.renderEventTemplates();
    };
    window.tplDeleteTemplate = function (id) {
        const tpls = tplLoad().filter(t => t.id !== id);
        tplSave(tpls);
        H('light');
        window.renderEventTemplates();
    };
    // Insert the templates row into the Add Event sheet, right above the Save button,
    // and hook it into openSheet('add') without touching the original function body.
    (function injectTemplatesRow() {
        function tryInject() {
            const addSheet = document.getElementById('addSheet');
            if (!addSheet)
                return false;
            if (document.getElementById('evTemplatesRow'))
                return true;
            const saveBtn = addSheet.querySelector('.ae-save-btn, #evSaveBtn') || addSheet.querySelector('button[onclick^="saveEv"]');
            const wrap = document.createElement('div');
            wrap.innerHTML = `<div class="ssect" style="margin:4px 0 6px;">Quick Templates</div><div class="tpl-row" id="evTemplatesRow"></div>`;
            if (saveBtn && saveBtn.parentElement) {
                saveBtn.parentElement.insertBefore(wrap, saveBtn);
            }
            else {
                addSheet.appendChild(wrap);
            }
            return true;
        }
        if (!tryInject()) {
            document.addEventListener('DOMContentLoaded', tryInject);
        }
        const _origOpenSheet = window.openSheet;
        if (typeof _origOpenSheet === 'function') {
            window.openSheet = function (t) {
                _origOpenSheet(t);
                if (t === 'add') {
                    tryInject();
                    window.renderEventTemplates();
                }
            };
        }
    })();
    // ══════════════════════════════════════════════════════════════════════════════
    // 8. FULL-TEXT SEARCH — highlight matches (search itself already covers notes/tasks)
    // ══════════════════════════════════════════════════════════════════════════════
    (function highlightSearchResults() {
        const _origSearchRun = window.searchRun;
        if (typeof _origSearchRun !== 'function')
            return;
        window.searchRun = function () {
            _origSearchRun.apply(this, arguments);
            try {
                const input = document.getElementById('searchInput');
                const q = (input && input.value || '').trim();
                if (!q)
                    return;
                const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const re = new RegExp('(' + safe + ')', 'ig');
                document.querySelectorAll('#searchResults .sri-name, #searchResults .sri-sub').forEach(el => {
                    const txt = el.textContent;
                    if (re.test(txt)) {
                        re.lastIndex = 0;
                        el.innerHTML = esc(txt).replace(re, '<mark style="background:rgba(255,214,0,.5);color:inherit;border-radius:3px;padding:0 1px;">$1</mark>');
                    }
                });
            }
            catch (e) { }
        };
    })();
    // ══════════════════════════════════════════════════════════════════════════════
    // 9. PDF EXPORT (jsPDF, loaded on demand from an already-whitelisted CDN)
    // ══════════════════════════════════════════════════════════════════════════════
    function loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (window.jspdf && window.jspdf.jsPDF) {
                resolve(window.jspdf.jsPDF);
                return;
            }
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
            s.onload = () => { (window.jspdf && window.jspdf.jsPDF) ? resolve(window.jspdf.jsPDF) : reject(new Error('jsPDF failed to load')); };
            s.onerror = () => reject(new Error('jsPDF failed to load'));
            document.head.appendChild(s);
        });
    }
    window.exportVikramPDF = async function () {
        T('📄 Preparing your PDF…');
        H('light');
        let JsPDF;
        try {
            JsPDF = await loadJsPDF();
        }
        catch (e) {
            T('⚠️ Could not load the PDF engine. Check your connection.');
            return;
        }
        try {
            const doc = new JsPDF();
            let y = 20;
            const line = (text, size, gap, bold) => {
                doc.setFontSize(size);
                doc.setFont(undefined, bold ? 'bold' : 'normal');
                const lines = doc.splitTextToSize(text, 170);
                lines.forEach(l => {
                    if (y > 280) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.text(l, 20, y);
                    y += gap;
                });
            };
            line('Vikram — My Report', 20, 10, true);
            const profile = LSget('vikram_profile', {});
            if (profile && profile.name)
                line('Name: ' + profile.name, 11, 7, false);
            line('Generated: ' + new Date().toLocaleString(), 10, 10, false);
            // Upcoming events
            line('Upcoming Events', 15, 9, true);
            try {
                const evs = (typeof userEvents !== 'undefined' ? userEvents : []).slice()
                    .filter(e => e.adMs >= Date.now() - 86400000)
                    .sort((a, b) => a.adMs - b.adMs)
                    .slice(0, 15);
                if (evs.length) {
                    evs.forEach(e => {
                        const d = new Date(e.adMs);
                        line('• ' + e.title + '  (' + d.toLocaleDateString() + ')', 11, 6.5, false);
                    });
                }
                else {
                    line('No upcoming events found.', 11, 6.5, false);
                }
            }
            catch (e) {
                line('Could not read events.', 11, 6.5, false);
            }
            // Kharcha summary
            y += 4;
            line('This Month — Kharcha Summary', 15, 9, true);
            try {
                const list = khLoad();
                const mt = khComputeMonthTotals(list, TODAYBS.y, TODAYBS.m);
                line('Income: ' + khFmtAmt(mt.income), 11, 6.5, false);
                line('Expense: ' + khFmtAmt(mt.expense), 11, 6.5, false);
                line('Balance: ' + khFmtAmt(mt.balance), 11, 6.5, false);
            }
            catch (e) {
                line('No expense data yet.', 11, 6.5, false);
            }
            // Tasks & Notes counts
            y += 4;
            line('Tasks & Notes', 15, 9, true);
            try {
                const tasks = LSget('vikram_tasks', []);
                const open = tasks.filter(t => !t.done).length;
                const done = tasks.filter(t => t.done).length;
                line('Tasks: ' + open + ' open, ' + done + ' completed', 11, 6.5, false);
            }
            catch (e) { }
            try {
                const notes = LSget('vikram_notes', []);
                line('Notes: ' + notes.length + ' saved', 11, 6.5, false);
            }
            catch (e) { }
            doc.save('vikram-report.pdf');
            H('success');
            T('✅ PDF downloaded');
        }
        catch (e) {
            T('⚠️ Something went wrong generating the PDF');
        }
    };
    // ══════════════════════════════════════════════════════════════════════════════
    // 11. HOME TAB — Weather widget (just after Schedule/Upcoming)
    // ══════════════════════════════════════════════════════════════════════════════
    (function homeWeatherWidget() {
        function loadIfHome(tab) {
            if (tab !== 'home')
                return;
            if (typeof insightsLoadWeather === 'function')
                insightsLoadWeather('homeWeatherBody');
        }
        const _origSwitchTab = window.switchTab;
        if (typeof _origSwitchTab === 'function') {
            window.switchTab = function (tab) {
                _origSwitchTab.apply(this, arguments);
                loadIfHome(tab);
            };
        }
        // Load once on initial page load if Home is the starting tab
        try {
            let startTab = 'home';
            try {
                startTab = window.localStorage.getItem('vikram_active_tab') || 'home';
            }
            catch (e) { }
            loadIfHome(startTab);
        }
        catch (e) { }
    })();
    // ══════════════════════════════════════════════════════════════════════════════
    // 12. HOME SCREEN WIDGET (LIVE) — feed for Scriptable (iOS) / HTTP Shortcuts or Tasker (Android)
    // ══════════════════════════════════════════════════════════════════════════════
    const WIDGETFEED_KEY = 'vikram_widgetfeed';
    function widgetFeedLocal() { return LSget(WIDGETFEED_KEY, { code: null, enabled: false }); }
    function widgetFeedSaveLocal(d) { LSset(WIDGETFEED_KEY, d); }
    function widgetFeedGenCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let s = 'WID-';
        for (let i = 0; i < 6; i++)
            s += chars[Math.floor(Math.random() * chars.length)];
        return s;
    }
    // Reuses the "cycles/" Realtime Database collection — the same collection + auth
    // flow already proven to work for Partner Sync / Family Share — so the widget
    // feed inherits identical, already-tested security rules. The "WID-" prefix
    // keeps it from ever colliding with real pairing/family codes.
    function widgetFeedRef(code) {
        const db = famDb();
        return db ? db.ref('cycles/' + code) : null;
    }
    function widgetFeedBuildPayload() {
        const MN = ['Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
        const ad = (typeof TODAY !== 'undefined') ? TODAY : new Date();
        const bs = (typeof TODAYBS !== 'undefined') ? TODAYBS : null;
        let tithiText = '';
        try {
            tithiText = (typeof getTithi === 'function') ? getTithi(ad) : '';
        }
        catch (e) { }
        let sunText = '';
        try {
            sunText = (typeof getPanchangText === 'function') ? getPanchangText(ad) : '';
        }
        catch (e) { }
        let nextEventTitle = '', nextEventDate = '';
        try {
            const evs = (typeof userEvents !== 'undefined' ? userEvents : []).slice()
                .filter(e => e.adMs >= Date.now() - 3600000)
                .sort((a, b) => a.adMs - b.adMs);
            if (evs.length) {
                nextEventTitle = evs[0].title;
                nextEventDate = new Date(evs[0].adMs).toDateString();
            }
        }
        catch (e) { }
        let tasksOpen = 0;
        try {
            tasksOpen = (LSget('vikram_tasks', []) || []).filter(t => !t.done).length;
        }
        catch (e) { }
        return {
            type: 'widget',
            bsDate: bs ? (MN[bs.m - 1] + ' ' + bs.d + ', ' + bs.y) : '',
            adDate: ad.toDateString(),
            tithi: tithiText,
            sun: sunText,
            nextEvent: nextEventTitle,
            nextEventDate: nextEventDate,
            tasksOpen: tasksOpen,
            updatedAt: Date.now()
        };
    }
    let _widgetFeedTimer = null;
    function widgetFeedPush() {
        const local = widgetFeedLocal();
        if (!local.enabled || !local.code)
            return;
        famEnsureAuth((ok) => {
            if (!ok)
                return;
            const ref = widgetFeedRef(local.code);
            if (!ref)
                return;
            ref.set(widgetFeedBuildPayload()).catch(() => { });
        });
    }
    window.widgetFeedEnable = function () {
        const local = widgetFeedLocal();
        famEnsureAuth((ok) => {
            if (!ok) {
                T('⚠️ Could not connect. Check your internet connection.');
                return;
            }
            const code = local.code || widgetFeedGenCode();
            widgetFeedSaveLocal({ code, enabled: true });
            widgetFeedPush();
            if (!_widgetFeedTimer)
                _widgetFeedTimer = setInterval(widgetFeedPush, 600000); // re-push every 10 min
            H('success');
            T('📱 Widget feed is live!');
            if (typeof window.renderWidgetLiveSheet === 'function')
                window.renderWidgetLiveSheet();
        });
    };
    window.widgetFeedDisable = function () {
        const local = widgetFeedLocal();
        if (_widgetFeedTimer) {
            clearInterval(_widgetFeedTimer);
            _widgetFeedTimer = null;
        }
        const code = local.code;
        widgetFeedSaveLocal({ code, enabled: false });
        if (code) {
            famEnsureAuth((ok) => {
                if (!ok)
                    return;
                const ref = widgetFeedRef(code);
                if (ref)
                    ref.remove().catch(() => { });
            });
        }
        T('Widget feed turned off');
        if (typeof window.renderWidgetLiveSheet === 'function')
            window.renderWidgetLiveSheet();
    };
    function widgetFeedRestUrl(code) {
        return 'https://vikram-6e99b-default-rtdb.asia-southeast1.firebasedatabase.app/cycles/' + code + '.json';
    }
    function widgetFeedBuildScriptable(code) {
        return [
            '// Vikram — Home Screen Widget (Scriptable)',
            '// 1) Install the free "Scriptable" app from the App Store.',
            '// 2) Open Scriptable, tap + , paste this whole script in, and name it "Vikram Widget".',
            '// 3) Long-press your Home Screen → tap + (top corner) → search "Scriptable" →',
            '//    pick a size → Add Widget → long-press it → Edit Widget → set Script to "Vikram Widget".',
            '// The widget refreshes itself on the schedule iOS gives Scriptable widgets (roughly every 15–30 min).',
            '',
            'const API_KEY = "AIzaSyAFr9Amc7C3YKY27P_RdQ-3Rb-cH1ReFoc";',
            'const CODE = "' + code + '";',
            'const DB = "https://vikram-6e99b-default-rtdb.asia-southeast1.firebasedatabase.app";',
            '',
            'async function signInAnon(){',
            '  const req = new Request("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY);',
            '  req.method = "POST";',
            '  req.headers = {"Content-Type":"application/json"};',
            '  req.body = JSON.stringify({returnSecureToken:true});',
            '  const res = await req.loadJSON();',
            '  return res.idToken;',
            '}',
            '',
            'async function fetchData(){',
            '  const token = await signInAnon();',
            '  const req = new Request(DB + "/cycles/" + CODE + ".json?auth=" + token);',
            '  const data = await req.loadJSON();',
            '  return data || {};',
            '}',
            '',
            'function createWidget(data){',
            '  const w = new ListWidget();',
            '  w.backgroundColor = new Color("#181b24");',
            '  const title = w.addText("🗓️ Vikram");',
            '  title.textColor = new Color("#9297c0");',
            '  title.font = Font.boldSystemFont(12);',
            '  w.addSpacer(6);',
            '  const bs = w.addText(data.bsDate || "—");',
            '  bs.textColor = Color.white();',
            '  bs.font = Font.boldSystemFont(20);',
            '  const ad = w.addText(data.adDate || "");',
            '  ad.textColor = new Color("#9297c0");',
            '  ad.font = Font.systemFont(11);',
            '  w.addSpacer(8);',
            '  if(data.tithi){',
            '    const t = w.addText("🌙 " + data.tithi);',
            '    t.textColor = new Color("#c8cef5");',
            '    t.font = Font.systemFont(11);',
            '  }',
            '  if(data.nextEvent){',
            '    w.addSpacer(6);',
            '    const e = w.addText("📌 " + data.nextEvent);',
            '    e.textColor = new Color("#82c0ff");',
            '    e.font = Font.systemFont(11);',
            '  }',
            '  if(data.tasksOpen){',
            '    w.addSpacer(4);',
            '    const tk = w.addText(data.tasksOpen + " task(s) open");',
            '    tk.textColor = new Color("#f0959c");',
            '    tk.font = Font.systemFont(10);',
            '  }',
            '  return w;',
            '}',
            '',
            'const data = await fetchData();',
            'const widget = createWidget(data);',
            'if(config.runsInWidget){',
            '  Script.setWidget(widget);',
            '} else {',
            '  widget.presentSmall();',
            '}',
            'Script.complete();',
            ''
        ].join('\n');
    }
    window.widgetFeedCopyScriptable = function () {
        const local = widgetFeedLocal();
        if (!local.code) {
            T('⚠️ Turn the widget feed on first');
            return;
        }
        const script = widgetFeedBuildScriptable(local.code);
        try {
            navigator.clipboard.writeText(script)
                .then(() => T('📋 Script copied — paste it into a new Scriptable script'))
                .catch(() => T('⚠️ Could not copy — check clipboard permission'));
        }
        catch (e) {
            T('⚠️ Clipboard not available on this browser');
        }
    };
    window.widgetFeedCopyUrl = function () {
        const local = widgetFeedLocal();
        if (!local.code) {
            T('⚠️ Turn the widget feed on first');
            return;
        }
        const url = widgetFeedRestUrl(local.code);
        try {
            navigator.clipboard.writeText(url)
                .then(() => T('📋 Feed URL copied'))
                .catch(() => T('⚠️ Could not copy'));
        }
        catch (e) {
            T('⚠️ Clipboard not available on this browser');
        }
    };
    window.openWidgetLiveSheet = function () {
        haptic('light');
        const ov = document.getElementById('wlOverlay');
        if (!ov)
            return;
        window.renderWidgetLiveSheet();
        ov.style.display = '';
        requestAnimationFrame(() => ov.classList.add('open'));
    };
    window.closeWidgetLiveSheet = function (e) {
        const ov = document.getElementById('wlOverlay');
        if (!ov)
            return;
        if (e && e.target !== ov)
            return;
        ov.classList.remove('open');
        setTimeout(() => { ov.style.display = 'none'; }, 220);
    };
    window.renderWidgetLiveSheet = function () {
        const body = document.getElementById('wlBody');
        if (!body)
            return;
        const local = widgetFeedLocal();
        const sub = document.getElementById('sWidgetLiveSub');
        if (!local.enabled || !local.code) {
            if (sub)
                sub.textContent = 'Auto-updating widget via Shortcuts/Tasker';
            body.innerHTML = `
      <div style="text-align:center;padding:10px 0 6px;">
        <div style="font-size:34px;">📱</div>
        <div class="ssect" style="margin:8px 0 4px;">Turn on the live feed</div>
        <div class="ssub" style="margin-bottom:16px;">Vikram will push today's date, tithi, sunrise/sunset and your next event so a widget can display it.</div>
        <button class="ebtn" style="width:100%;" onclick="widgetFeedEnable()">Turn On Widget Feed</button>
      </div>
    `;
            return;
        }
        if (sub)
            sub.textContent = 'Feed is live · Code: ' + local.code;
        body.innerHTML = `
    <div style="background:var(--tgbg);border-radius:14px;padding:14px;margin-bottom:14px;">
      <div style="font-size:12px;font-weight:800;color:var(--dsub);letter-spacing:.4px;margin-bottom:6px;">FEED CODE</div>
      <div style="font-size:18px;font-weight:900;color:var(--dtext);letter-spacing:.5px;">${local.code}</div>
      <div class="ssub" style="margin-top:4px;">Refreshes automatically every 10 minutes while Vikram is open.</div>
    </div>

    <div class="ssect" style="margin-bottom:8px;">🍎 iPhone / iPad — Scriptable</div>
    <div class="ssub" style="margin-bottom:10px;">Install the free <b>Scriptable</b> app, then copy this script into a new Scriptable script and add it as a Home Screen widget.</div>
    <button class="ebtn" style="width:100%;margin-bottom:14px;" onclick="widgetFeedCopyScriptable()">Copy Scriptable Script</button>

    <div class="ssect" style="margin-bottom:8px;">🤖 Android — HTTP Shortcuts / Tasker</div>
    <div class="ssub" style="margin-bottom:10px;line-height:1.6;">
      Install <b>HTTP Shortcuts</b> (free, Play Store) or use Tasker:<br>
      1. Add a shortcut that first <b>POST</b>s to
      <span style="word-break:break-all;">identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFr9Amc7C3YKY27P_RdQ-3Rb-cH1ReFoc</span>
      with body <code>{"returnSecureToken":true}</code> to get an <code>idToken</code>.<br>
      2. Then <b>GET</b> the feed URL below with <code>?auth=&lt;idToken&gt;</code> appended.<br>
      3. Format the JSON response (bsDate, adDate, tithi, nextEvent, tasksOpen) and pin the shortcut to your Home Screen — both apps support auto-refresh intervals.
    </div>
    <button class="ebtn" style="width:100%;margin-bottom:14px;background:var(--tgbg);border:1.5px solid var(--border);" onclick="widgetFeedCopyUrl()">Copy Feed URL</button>

    <button class="ebtn" style="width:100%;background:var(--tgbg);border:1.5px solid var(--border);color:#e0473a;" onclick="widgetFeedDisable()">Turn Off Widget Feed</button>
  `;
    };
    // Keep the feed fresh while the app is open, without waiting for the settings sheet to be opened
    setTimeout(widgetFeedPush, 3000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden)
        widgetFeedPush(); });
    (function initWidgetFeedTimer() {
        if (widgetFeedLocal().enabled && !_widgetFeedTimer) {
            _widgetFeedTimer = setInterval(widgetFeedPush, 600000);
        }
    })();
    // ══════════════════════════════════════════════════════════════════════════════
    // 13. BACK GESTURE → HOME (instead of exiting the app)
    // ══════════════════════════════════════════════════════════════════════════════
    (function setupBackGestureToHome() {
        let awayPushed = false;
        function isAwayNow() {
            try {
                if (typeof _currentTab !== 'undefined' && _currentTab && _currentTab !== 'home')
                    return true;
                const ov = document.getElementById('ov');
                if (ov && ov.classList.contains('open'))
                    return true;
                const wl = document.getElementById('wlOverlay');
                if (wl && wl.style.display !== 'none' && wl.classList.contains('open'))
                    return true;
                const fb = document.getElementById('fbOverlay');
                if (fb && fb.style.display !== 'none')
                    return true;
            }
            catch (e) { }
            return false;
        }
        function syncHistory() {
            const away = isAwayNow();
            try {
                if (away && !awayPushed) {
                    history.pushState({ vikramNav: 'away' }, '', location.href);
                    awayPushed = true;
                }
                else if (!away && awayPushed) {
                    history.replaceState({ vikramNav: 'home' }, '', location.href);
                    awayPushed = false;
                }
            }
            catch (e) { }
        }
        function goHomeFromGesture() {
            awayPushed = false;
            const fullscreenSheetIds = ['kharchaSheet', 'familySheet', 'converterSheet', 'pomodoroSheet', 'echoSheet', 'colorMatcherSheet', 'alarmsSheet', 'insightsSheet'];
            const openFullscreenSheet = fullscreenSheetIds.some(function (id) {
                const el = document.getElementById(id);
                return el && el.classList.contains('open');
            });
            const cycleSheetPrevTab = window._cycleSheetPrevTab || null;
            const cycleSheetPrevSettings = window._cycleSheetPrevSettings || false;
            const wasSettings = (typeof _currentTab !== 'undefined' && _currentTab === 'settings');
            const wasNotes = (typeof _currentTab !== 'undefined' && _currentTab === 'notes');
            try {
                if (typeof closeAll === 'function')
                    closeAll();
            }
            catch (e) { }
            const wl = document.getElementById('wlOverlay');
            if (wl) {
                wl.classList.remove('open');
                wl.style.display = 'none';
            }
            const fb = document.getElementById('fbOverlay');
            if (fb)
                fb.style.display = 'none';
            try {
                if (typeof switchTab === 'function') {
                    if (openFullscreenSheet && (cycleSheetPrevTab || cycleSheetPrevSettings)) {
                        window._cycleSheetPrevTab = null;
                        window._cycleSheetPrevSettings = false;
                        if (cycleSheetPrevSettings) {
                            switchTab('settings');
                        }
                        else {
                            switchTab(cycleSheetPrevTab);
                        }
                    }
                    else if (wasSettings) {
                        switchTab((typeof _settingsReturnTab !== 'undefined' && _settingsReturnTab) || 'home');
                    }
                    else if (wasNotes) {
                        switchTab((typeof _notesReturnTab !== 'undefined' && _notesReturnTab) || 'home');
                    }
                    else if (_currentTab !== 'home') {
                        switchTab('home');
                    }
                }
            }
            catch (e) { }
        }
        // Establish a baseline history entry so the very first "away" excursion has
        // something safe to pop back to.
        try {
            history.replaceState({ vikramNav: 'home' }, '', location.href);
        }
        catch (e) { }
        window.addEventListener('popstate', function () {
            if (awayPushed || isAwayNow()) {
                goHomeFromGesture();
            }
            // else: already on Home with nothing open — let the normal back gesture
            // proceed (exits/minimizes the app), which is the expected behavior there.
        });
        // Watch the handful of containers that represent "away from Home" state —
        // covers every tab (Settings/Notes/Converter/Profile/Cycle) and every sheet
        // that uses the shared #ov backdrop, plus the two standalone overlays.
        const watchIds = ['ov', 'dmodal', 'wlOverlay', 'fbOverlay', 'settingsView', 'notesView', 'profileView', 'dayCounterView', 'cycleView'];
        let scheduled = false;
        const mo = new MutationObserver(function () {
            if (scheduled)
                return;
            scheduled = true;
            requestAnimationFrame(function () { scheduled = false; syncHistory(); });
        });
        watchIds.forEach(function (id) {
            const el = document.getElementById(id);
            if (el)
                mo.observe(el, { attributes: true, attributeFilter: ['class', 'style'] });
        });
        // Belt-and-suspenders: sync right after any bottom-nav tap too.
        document.addEventListener('click', function (e) {
            if (e.target.closest && e.target.closest('[id^="bnav"]')) {
                requestAnimationFrame(syncHistory);
            }
        }, true);
    })();
    // ══════════════════════════════════════════════════════════════════════════════
    // 14. HOME TAB — Gold & Forex / Muhurat / Rashifal cards (at the end, like Weather)
    // ══════════════════════════════════════════════════════════════════════════════
    (function homeInsightsCards() {
        // ── Gold & Forex ────────────────────────────────────────────────────────────
        function buildGoldFxCardHTML(data, staleTs) {
            const hasFx = data && data.fx && data.fx.length;
            const hasMetal = data && (data.gold || data.silver);
            if (!hasFx && !hasMetal) {
                return `<div class="ins-empty">Couldn't reach the rates service.<br><br><button class="ebtn" onclick="event.stopPropagation();window.renderHomeGoldFx(true)">Retry</button></div>`;
            }
            let html = '';
            if (hasMetal) {
                if (data.gold)
                    html += `<div class="ins-fx-row"><div class="ins-fx-name">🟡 Gold (Hallmark, per tola)</div><div class="ins-fx-val">Rs ${esc(data.gold)}</div></div>`;
                if (data.silver)
                    html += `<div class="ins-fx-row"><div class="ins-fx-name">⚪ Silver (per tola)</div><div class="ins-fx-val">Rs ${esc(data.silver)}</div></div>`;
            }
            if (hasFx) {
                data.fx.forEach(f => {
                    html += `<div class="ins-fx-row"><div class="ins-fx-name">${esc(f.code)}</div><div class="ins-fx-val">Rs ${esc(f.sell)}</div></div>`;
                });
            }
            const sourceNote = staleTs
                ? `Last saved rates · ${new Date(staleTs).toLocaleDateString()}`
                : `Source: Hamro Patro / Nepal Rastra Bank`;
            html += `<div class="ssub" style="text-align:center;margin-top:10px;">${esc(sourceNote)}</div>`;
            return html;
        }
        window.renderHomeGoldFx = function (forceRefresh) {
            const el = document.getElementById('goldFxHomeBody');
            if (!el)
                return;
            const cache = LSget('vikram_goldfx_cache_v3', null);
            const fresh = !forceRefresh && cache && (Date.now() - cache.ts < 60 * 60 * 1000);
            if (fresh) {
                el.innerHTML = buildGoldFxCardHTML(cache.data);
                return;
            }
            el.innerHTML = window.skelRowsHTML(3, { header: true });
            Promise.resolve(typeof insightsFetchGoldFx === 'function' ? insightsFetchGoldFx(cache) : null).then(() => {
                const updated = LSget('vikram_goldfx_cache_v3', null);
                if (updated && updated.data) {
                    el.innerHTML = buildGoldFxCardHTML(updated.data);
                }
                else if (cache && cache.data) {
                    el.innerHTML = buildGoldFxCardHTML(cache.data, cache.ts);
                }
                else {
                    el.innerHTML = buildGoldFxCardHTML(null);
                }
            }).catch(() => { el.innerHTML = buildGoldFxCardHTML(cache ? cache.data : null, cache ? cache.ts : null); });
        };
        // ── Muhurat ──────────────────────────────────────────────────────────────────
        window.renderHomeMuhurat = function () {
            const el = document.getElementById('muhuratHomeBody');
            if (!el)
                return;
            try {
                const ad = (typeof TODAY !== 'undefined') ? TODAY : new Date();
                const st = _panchangSunTimes(ad);
                const mid = (st.sunriseMin + st.sunsetMin) / 2;
                const abhijitStart = _panchangMinsToTime(mid - 24);
                const abhijitEnd = _panchangMinsToTime(mid + 24);
                const segMap = { 0: 8, 1: 2, 2: 7, 3: 5, 4: 6, 5: 4, 6: 3 };
                const seg = segMap[ad.getDay()];
                const dayLen = (st.sunsetMin - st.sunriseMin) / 8;
                const rkStart = st.sunriseMin + (seg - 1) * dayLen;
                const rkEnd = rkStart + dayLen;
                const tithiIdx = getTithi(ad);
                const paksha = tithiIdx <= 15 ? 'Shukla' : 'Krishna';
                const tithiPos = tithiIdx <= 15 ? tithiIdx : tithiIdx - 15;
                const tithiName = TITHI_NAMES[tithiPos - 1] || '';
                el.innerHTML = `
        <div class="ins-muhurat-card" style="margin-bottom:8px;">
          <div class="ins-muhurat-title">Abhijit Muhurat</div>
          <div class="ins-muhurat-time">${abhijitStart} – ${abhijitEnd}</div>
        </div>
        <div class="ins-muhurat-card" style="margin-bottom:8px;background:linear-gradient(135deg,rgba(239,68,68,.09),rgba(185,28,28,.05));border-color:rgba(239,68,68,.16);">
          <div class="ins-muhurat-title" style="color:#ef4444;">Rahu Kaal</div>
          <div class="ins-muhurat-time">${_panchangMinsToTime(rkStart)} – ${_panchangMinsToTime(rkEnd)}</div>
        </div>
        <div class="ssub">Today's Tithi: <b style="color:var(--dtext);">${paksha} Paksha, ${esc(tithiName)}</b></div>
      `;
            }
            catch (e) {
                el.innerHTML = `<div class="ins-empty">Couldn't compute today's Muhurat.</div>`;
            }
        };
        // ── Rashifal ─────────────────────────────────────────────────────────────────
        window.renderHomeRashifal = function () {
            const el = document.getElementById('rashifalHomeBody');
            if (!el)
                return;
            el.innerHTML = window.skelRashifalHTML();
            try {
                if (!window._rfSign)
                    window._rfSign = rfResolveSign();
                const sign = ZODIAC.find(z => z.key === window._rfSign) || ZODIAC[0];
                const today = (typeof TODAY !== 'undefined') ? TODAY : new Date();
                const dateKey = rfDateKey(today);
                const salt = dateKey + '|' + sign.key + '|';
                const mood = RF_MOOD[hashStr(salt + 'mood') % RF_MOOD.length];
                const love = RF_LOVE[hashStr(salt + 'love') % RF_LOVE.length];
                const color = RF_COLORS[hashStr(salt + 'color') % RF_COLORS.length];
                const luckyNum = (hashStr(salt + 'number') % 49) + 1;
                el.innerHTML = `
        <div class="rf-card">
          <div class="rf-card-sign">${sign.emoji} ${sign.name}</div>
          <div class="rf-card-text">Today you're feeling <b>${mood}</b>. ${love}</div>
          <div class="rf-card-grid">
            <div class="rf-card-item"><div class="rf-card-item-lbl">Lucky Color</div><div class="rf-card-item-val">${color}</div></div>
            <div class="rf-card-item"><div class="rf-card-item-lbl">Lucky Number</div><div class="rf-card-item-val">${luckyNum}</div></div>
          </div>
        </div>
      `;
            }
            catch (e) {
                el.innerHTML = `<div class="ins-empty">Couldn't load today's Rashifal.</div>`;
            }
        };
        function loadIfHome(tab) {
            if (tab !== 'home')
                return;
            window.renderHomeGoldFx();
            window.renderHomeMuhurat();
            window.renderHomeRashifal();
        }
        const _origSwitchTab = window.switchTab;
        if (typeof _origSwitchTab === 'function') {
            window.switchTab = function (tab) {
                _origSwitchTab.apply(this, arguments);
                loadIfHome(tab);
            };
        }
        // Load once on initial page load if Home is the starting tab
        try {
            let startTab = 'home';
            try {
                startTab = window.localStorage.getItem('vikram_active_tab') || 'home';
            }
            catch (e) { }
            loadIfHome(startTab);
        }
        catch (e) { }
    })();
})();
