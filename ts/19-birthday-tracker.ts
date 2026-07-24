// ── Birthday Tracker ────────────────────────────────────────────────────────
const BDT_KEY = 'vikram_birthdays_v1';
let _bdtEditIdx = null;

function bdtLoad(){ try{ return JSON.parse(localStorage.getItem(BDT_KEY)||'[]'); }catch(e){ return []; } }
function bdtSaveAll(arr){ localStorage.setItem(BDT_KEY, JSON.stringify(arr)); }

// BS months
const BDT_MEN = ['Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'];
const BDT_MNE = ['बैशाख','जेठ','असार','श्रावण','भाद्र','आश्विन','कार्तिक','मंसिर','पौष','माघ','फागुन','चैत्र'];

// Populate selectors
function bdtPopulateSelectors(){
  const yEl = document.getElementById('bdtY');
  const mEl = document.getElementById('bdtM');
  if(!yEl || !mEl) return;
  // Year range 1970–2090
  yEl.innerHTML = '';
  for(let y=2090;y>=1970;y--){
    const o=document.createElement('option'); o.value=String(y); o.textContent=String(y); yEl.appendChild(o);
  }
  yEl.value = String(window.BS_YEAR || 2081);
  // Months
  mEl.innerHTML = BDT_MEN.map((m,i)=>`<option value="${i+1}">${m}</option>`).join('');
  mEl.value = 1;
  bdtRefreshDays();
}

function bdtRefreshDays(){
  const yEl = document.getElementById('bdtY');
  const mEl = document.getElementById('bdtM');
  const dEl = document.getElementById('bdtD');
  if(!yEl||!mEl||!dEl) return;
  const y=+yEl.value, m=+mEl.value;
  // Get max days for this BS month/year
  let maxD = 32;
  try{ if(window.BS_DATA && BS_DATA[y]) maxD = BS_DATA[y][m-1] || 32; } catch(e){}
  const prev = +dEl.value || 1;
  dEl.innerHTML = '';
  for(let d=1;d<=maxD;d++){
    const o=document.createElement('option'); o.value=String(d); o.textContent=String(d); dEl.appendChild(o);
  }
  dEl.value = String(Math.min(prev, maxD));
  bdtUpdateAdPreview();
}

function bdtUpdateAdPreview(){
  const y=+document.getElementById('bdtY')?.value;
  const m=+document.getElementById('bdtM')?.value;
  const d=+document.getElementById('bdtD')?.value;
  const el=document.getElementById('bdtAdPreview');
  if(!el) return;
  try{
    const ad = bsToAd(y,m,d);
    if(ad instanceof Date && !isNaN(+ad)){
      const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      el.textContent = `AD: ${months[ad.getMonth()]} ${ad.getDate()}, ${ad.getFullYear()}`;
    } else { el.textContent = ''; }
  }catch(e){ el.textContent=''; }
}

function bdtOpenAdd(){
  haptic('light');
  _bdtEditIdx = null;
  bdtPopulateSelectors();
  document.getElementById('bdtName').value='';
  document.getElementById('bdtNote').value='';
  document.getElementById('bdtSheetTitle').textContent='🎂 Add Birthday';
  document.getElementById('bdtSaveBtn').textContent='Save Birthday';
  document.getElementById('bdtDeleteBtn').style.display='none';
  document.getElementById('bdtAdPreview').textContent='';
  // Preserve settingsView
  const sv=document.getElementById('settingsView');
  const wasActive=sv&&sv.classList.contains('active');
  closeAll();
  if(wasActive) sv.classList.add('active');
  document.getElementById('ov').classList.add('open');
  document.getElementById('bdtSheet').classList.add('open');
  // Prevent settingsView from intercepting touches while sheet is open
  const svEl=document.getElementById('settingsView');
  if(svEl) svEl.style.pointerEvents='none';
  // Scroll to top so Save button is always reachable
  setTimeout(()=>{ const sc=document.querySelector('#bdtSheet .sscroll'); if(sc) sc.scrollTop=0; },80);
}

function bdtOpenEdit(idx){
  haptic('light');
  const list = bdtLoad();
  const item = list[idx];
  if(!item) return;
  _bdtEditIdx = idx;
  bdtPopulateSelectors();
  document.getElementById('bdtName').value = item.name || '';
  document.getElementById('bdtNote').value = item.note || '';
  document.getElementById('bdtY').value = item.y;
  document.getElementById('bdtM').value = item.m;
  bdtRefreshDays();
  document.getElementById('bdtD').value = item.d;
  document.getElementById('bdtSheetTitle').textContent='✏️ Edit Birthday';
  document.getElementById('bdtSaveBtn').textContent='Update Birthday';
  document.getElementById('bdtDeleteBtn').style.display='block';
  bdtUpdateAdPreview();
  const sv=document.getElementById('settingsView');
  const wasActive=sv&&sv.classList.contains('active');
  closeAll();
  if(wasActive) sv.classList.add('active');
  document.getElementById('ov').classList.add('open');
  document.getElementById('bdtSheet').classList.add('open');
  // Prevent settingsView from intercepting touches while sheet is open
  const svEl=document.getElementById('settingsView');
  if(svEl) svEl.style.pointerEvents='none';
}

function bdtCloseSheet(){
  document.getElementById('bdtSheet').classList.remove('open');
  document.getElementById('ov').classList.remove('open');
  const sv=document.getElementById('settingsView');
  if(sv) sv.style.pointerEvents='';
}

function bdtShowErr(msg){
  const el = document.getElementById('bdtErrMsg');
  if(!el) return;
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

function bdtSave(){
  try {
    bdtShowErr('');
    const nameEl = document.getElementById('bdtName');
    const name = (nameEl ? nameEl.value : '').trim();
    if(!name){
      bdtShowErr('Please enter a name.');
      if(nameEl) nameEl.focus();
      return;
    }
    const yEl = document.getElementById('bdtY');
    const mEl = document.getElementById('bdtM');
    const dEl = document.getElementById('bdtD');
    const y = yEl ? +yEl.value : 0;
    const m = mEl ? +mEl.value : 0;
    const d = dEl ? +dEl.value : 0;
    if(!y || !m || !d){
      bdtShowErr('Please select a valid date.');
      return;
    }
    const noteEl = document.getElementById('bdtNote');
    const note = (noteEl ? noteEl.value : '').trim();
    const list = bdtLoad();
    const entry = { name, y, m, d, note };
    if(_bdtEditIdx !== null && _bdtEditIdx >= 0 && _bdtEditIdx < list.length){
      list[_bdtEditIdx] = entry;
    } else {
      list.push(entry);
    }
    bdtSaveAll(list);
    if(typeof haptic === 'function') haptic('light');
    bdtCloseSheet();
    bdtRender();
    bdtSyncToEvents();
  } catch(err) {
    bdtShowErr('Error: ' + (err && err.message ? err.message : String(err)));
  }
}

// Wire save button via addEventListener (not inline onclick)
(function(){
  function wireBdtSave(){
    const btn = document.getElementById('bdtSaveBtn');
    if(btn){
      // Remove any existing onclick
      btn.onclick = null;
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        bdtSave();
      });
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', wireBdtSave);
  } else {
    wireBdtSave();
  }
})();

function bdtDelete(){
  if(_bdtEditIdx === null) return;
  const list = bdtLoad();
  list.splice(_bdtEditIdx, 1);
  bdtSaveAll(list);
  haptic('light');
  bdtCloseSheet();
  bdtRender();
  bdtSyncToEvents();
}

// Sync all Birthday Tracker entries into userEvents so they appear on the
// month view, schedule view, and day panel — just like the profile birthday.
function bdtSyncToEvents(){
  if(typeof userEvents === 'undefined') return;
  // Remove any previously-synced tracker entries
  for(let i = userEvents.length - 1; i >= 0; i--){
    if(userEvents[i].isBdtBirthday) userEvents.splice(i, 1);
  }
  const list = bdtLoad();
  list.forEach(item => {
    if(!item.y || !item.m || !item.d || !item.name) return;
    try{
      const adDate = bsToAd(item.y, item.m, item.d);
      if(!(adDate instanceof Date) || isNaN(+adDate)) return;
      const mid = new Date(adDate.getFullYear(), adDate.getMonth(), adDate.getDate());
      userEvents.push({
        title: `🎂 ${item.name}'s Birthday`,
        bsY: item.y, bsM: item.m, bsD: item.d,
        endBsY: item.y, endBsM: item.m, endBsD: item.d,
        adMs: mid.getTime(),
        endAdMs: mid.getTime(),
        note: item.note || '',
        startTime: null,
        endTime: null,
        color: 'birthday',
        repeatYearly: true,
        recur: null,
        isBdtBirthday: true,
      });
    }catch(e){}
  });
  userEvents.sort((a, b) => a.adMs - b.adMs);
  if(typeof saveEvents === 'function') saveEvents();
  if(typeof render === 'function') render();
  if(typeof renderUpcoming === 'function') renderUpcoming();
  if(typeof renderSelectedDay === 'function') renderSelectedDay();
  if(typeof renderScheduleView === 'function' && typeof scheduleActive !== 'undefined' && scheduleActive) renderScheduleView();
  if(typeof renderProfileBirthdays === 'function') renderProfileBirthdays();
}

// How many days until next birthday (circular, in AD)
function bdtDaysUntil(bY, bM, bD){
  try{
    const ad = bsToAd(bY, bM, bD);
    if(!(ad instanceof Date) || isNaN(+ad)) return null;
    const today = new Date();
    const thisYear = today.getFullYear();
    let next = new Date(thisYear, ad.getMonth(), ad.getDate());
    if(next < today) next = new Date(thisYear+1, ad.getMonth(), ad.getDate());
    const diffMs = +next - +(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    return Math.round(diffMs / 86400000);
  }catch(e){ return null; }
}

function bdtRender(){
  const el = document.getElementById('bdtList');
  const subEl = document.getElementById('bdtSubText');
  if(!el) return;
  const list = bdtLoad();
  if(subEl) subEl.textContent = list.length === 0 ? 'No birthdays saved yet' : `${list.length} birthday${list.length!==1?'s':''} saved`;
  if(list.length === 0){
    el.innerHTML = '';
    return;
  }
  // Annotate with days until
  const annotated = list.map((item, idx) => {
    const days = bdtDaysUntil(item.y, item.m, item.d);
    return { ...item, idx, days };
  });
  // Sort by days until (soonest first)
  annotated.sort((a,b) => {
    if(a.days===null && b.days===null) return 0;
    if(a.days===null) return 1;
    if(b.days===null) return -1;
    return a.days - b.days;
  });

  const months = ['Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'];

  el.innerHTML = annotated.map(item => {
    const dateStr = `${months[item.m-1]} ${item.d}, ${item.y}`;
    let badge = '';
    if(item.days === 0){
      badge = `<span style="background:linear-gradient(135deg,#ec4899,#f43f5e);color:#fff;font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px;flex-shrink:0;">🎉 Today!</span>`;
    } else if(item.days !== null && item.days <= 7){
      badge = `<span style="background:rgba(236,72,153,.15);color:#ec4899;font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px;flex-shrink:0;">in ${item.days}d</span>`;
    } else if(item.days !== null){
      badge = `<span style="background:var(--tgbg);color:var(--dsub);font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;flex-shrink:0;">${item.days}d</span>`;
    }
    return `
    <div class="sv-row" style="cursor:pointer;border-top:1px solid var(--border);" onclick="bdtOpenEdit(${item.idx})">
      <div class="sv-icon" style="background:rgba(236,72,153,.1);">🎂</div>
      <div class="sv-row-text">
        <div class="sv-lbl">${esc(item.name)}</div>
        <div class="sv-sub">${dateStr}${item.note ? ' · '+esc(item.note) : ''}</div>
      </div>
      ${badge}
    </div>`;
  }).join('');
}

// Init on settings open
(function(){
  const _baseBdt = window.switchTab;
  window.switchTab = function(tab){
    if(typeof _baseBdt === 'function') _baseBdt.apply(this, arguments);
    if(tab === 'settings') setTimeout(bdtRender, 100);
  };
})();

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 1: FOCUS MODE
// ══════════════════════════════════════════════════════════════════════════════
function applyFocusMode(){
  const on = cfg.focusMode;
  // Hide/show event dots and the entire upcoming schedule section
  const upEl = document.querySelector('.upcoming');
  if(upEl) upEl.style.display = on ? 'none' : '';
  // Hide/show cell chips (event dots/labels)
  document.querySelectorAll('.cell-chip,.cell-weeknum,.cell-tithi').forEach(el=>{
    el.style.display = on ? 'none' : '';
  });
  document.getElementById('tgFocusMode')?.classList.toggle('on', on);
  document.getElementById('focusModeSub').textContent = on
    ? 'Focus mode ON · dots & schedule hidden'
    : 'Hide dots & schedule for distraction-free view';
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 1B: SIMPLE CALENDAR MODE — hide everything except the calendar itself
// ══════════════════════════════════════════════════════════════════════════════
function applySimpleMode(){
  const on = !!cfg.simpleMode;
  document.body.classList.toggle('simple-calendar-mode', on);
  document.getElementById('tgSimpleMode')?.classList.toggle('on', on);
  const sub = document.getElementById('simpleModeSub');
  if(sub) sub.textContent = on
    ? 'Simple mode ON · only the calendar is shown'
    : 'Show only the calendar — hide everything else';
  // NOTE: this function re-runs every time the app initializes and every time
  // Settings is opened (see initAllSettingsFeatures). It must stay a pure,
  // idempotent "apply the visual state" function — it must NOT navigate away
  // from whatever tab is currently open, or opening Settings while Simple
  // Mode is on would immediately bounce back to Home and trap the person.
  // Forced navigation only happens once, right when the toggle is flipped —
  // see simpleModeJustEnabled() below, called from the toggle's onclick.
  //
  // The month-expand IS safe to re-run here though (it doesn't navigate),
  // and it needs to be: calExpanded resets to false on every fresh page
  // load, so if Simple Mode was already on from a previous session, nothing
  // would otherwise force the calendar back open on reload.
  if(on) simpleModeExpandMonth();
  // Re-render now that .simple-calendar-mode is (or isn't) on the body —
  // this is what makes render()'s Simple-Mode-forces-Nepali check see the
  // up-to-date class. The toggle's onclick calls togSetting() (which
  // renders) BEFORE this function runs, so without this the calendar would
  // still show whatever language was active a moment ago.
  if(typeof render === 'function') render();
}

// Called from the "Turn off Simple Mode" button that appears under the
// calendar while Simple Mode is on — the only way back, since Simple Mode
// hides the bottom nav (and with it, the Settings tab where the toggle
// normally lives).
function exitSimpleMode(){
  haptic('light');
  cfg.simpleMode = false;
  try{ localStorage.setItem('vikram_cfg',JSON.stringify(cfg)); }catch(e){}
  document.getElementById('tgSimpleMode')?.classList.remove('on');
  applySimpleMode();
  render();
}

// Forces the calendar into full-month view and retries a few times shortly
// after, in case the very first attempt lands mid-transition (cells briefly
// reporting 0 height causes applyCalHeight to silently skip). Safe to call
// anytime — it never navigates, only affects the calendar's own height.
function simpleModeExpandMonth(){
  try{
    calExpanded = true;
    if(typeof render === 'function') render();
    [50, 150, 350, 700].forEach(function(delay){
      setTimeout(function(){
        if(cfg.simpleMode && typeof applyCalHeight === 'function') applyCalHeight(true, 0);
      }, delay);
    });
  }catch(e){}
}

// Called only at the moment the person turns Simple Calendar Mode ON —
// jumps to the plain month calendar so that's what they land on.
function simpleModeJustEnabled(){
  if(!cfg.simpleMode) return;
  try{
    if(typeof dayViewActive!=='undefined' && dayViewActive && typeof toggleDayView==='function') toggleDayView();
    if(typeof weekViewActive!=='undefined' && weekViewActive && typeof toggleWeekView==='function') toggleWeekView();
    if(typeof monthTabActive!=='undefined' && monthTabActive && typeof toggleMonthTab==='function') toggleMonthTab();
    if(typeof scheduleActive!=='undefined' && scheduleActive && typeof toggleScheduleView==='function') toggleScheduleView();
  }catch(e){}
  try{ if(typeof switchTab==='function') switchTab('home'); }catch(e){}
  simpleModeExpandMonth();
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 2: ACCENT COLOR PICKER
// ══════════════════════════════════════════════════════════════════════════════
const ACCENT_MAP = {
  indigo: { hex:'#6366f1', soft:'rgba(99,102,241,.13)',  label:'Indigo'  },
  violet: { hex:'#8b5cf6', soft:'rgba(139,92,246,.13)',  label:'Violet'  },
  rose:   { hex:'#f43f5e', soft:'rgba(244,63,94,.13)',   label:'Rose'    },
  amber:  { hex:'#f59e0b', soft:'rgba(245,158,11,.13)',  label:'Amber'   },
  teal:   { hex:'#14b8a6', soft:'rgba(20,184,166,.13)',  label:'Teal'    },
  sky:    { hex:'#0ea5e9', soft:'rgba(14,165,233,.13)',  label:'Sky'     },
};
function applyAccentColor(name){
  const ac = ACCENT_MAP[name] || ACCENT_MAP.indigo;
  document.documentElement.style.setProperty('--accent', ac.hex);
  document.documentElement.style.setProperty('--accent-soft', ac.soft);
  document.documentElement.style.setProperty('--accent-text', ac.hex);
  // Update swatch ring
  document.querySelectorAll('.acsw-btn').forEach(btn=>{
    const id = btn.id.replace('acSw-','').replace('profAcc-','');
    btn.style.borderColor = id===name ? ac.hex : 'transparent';
    btn.style.transform = id===name ? 'scale(1.18)' : '';
  });
  const sub = document.getElementById('accentColorSub');
  if(sub) sub.textContent = 'Currently ' + ac.label;
  const psub = document.getElementById('profAccentSub');
  if(psub) psub.textContent = ac.label;
}
function setAccent(name){
  haptic('light');
  cfg.accentColor = name;
  try{ localStorage.setItem('vikram_cfg', JSON.stringify(cfg)); }catch(e){}
  applyAccentColor(name);
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 3: YEAR IN REVIEW
// ══════════════════════════════════════════════════════════════════════════════
function openYearInReview(){
  haptic('light');
  const overlay = document.getElementById('yirOverlay');
  if(!overlay) return;
  overlay.style.display = '';
  requestAnimationFrame(()=>overlay.classList.add('open'));
  renderYearInReview(vY);
}
function closeYearInReview(e){
  if(e && e.target !== document.getElementById('yirOverlay')) return;
  const overlay = document.getElementById('yirOverlay');
  overlay.classList.remove('open');
  setTimeout(()=>{ overlay.style.display='none'; }, 220);
}
function renderYearInReview(bsYear){
  const body = document.getElementById('yirBody');
  const sub  = document.getElementById('yirSubTitle');
  if(!body) return;
  sub.textContent = 'BS ' + bsYear;
  document.getElementById('yirYearLabel').textContent = bsYear;

  // Gather all notes for quick lookup
  let notesSet = new Set();
  try{
    const ns = JSON.parse(localStorage.getItem('vikram_notes_v2')||'[]');
    ns.forEach(n=>{
      const d = n.updatedAt ? new Date(n.updatedAt) : null;
      if(d){ const bs=adToBs(d); notesSet.add(`${bs.y}-${bs.m}-${bs.d}`); }
    });
  }catch(e){}

  // Gather birthday keys
  let bdSet = new Set();
  try{
    const bds = JSON.parse(localStorage.getItem('vikram_birthdays_v1')||'[]');
    bds.forEach(b=>{ if(b.y && b.m && b.d) bdSet.add(`${bsYear}-${b.m}-${b.d}`); });
    const p = JSON.parse(localStorage.getItem('vikram_profile')||'{}');
    if(p.bday && p.bday.y && p.bday.m && p.bday.d){
      bdSet.add(`${bsYear}-${p.bday.m}-${p.bday.d}`);
    }
  }catch(e){}

  const months = BS[bsYear];
  if(!months){ body.innerHTML='<p style="color:var(--dsub)">Year data not available</p>'; return; }

  let html = '<div style="display:flex;flex-wrap:wrap;gap:16px;">';
  for(let m=1;m<=12;m++){
    const days = months[m-1];
    if(!days) continue;
    html += `<div style="min-width:100%;">`;
    html += `<div style="font-size:11px;font-weight:800;color:var(--dsub);margin-bottom:5px;letter-spacing:.5px;">${MEN[m-1].toUpperCase()}</div>`;
    html += `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">`;
    // Pad to start of week
    const firstAD = bsToAd(bsYear,m,1);
    const startDow = (firstAD.getDay() - cfg.fd + 7) % 7;
    for(let p=0;p<startDow;p++) html += '<div></div>';
    for(let d=1;d<=days;d++){
      const key = `${bsYear}-${m}-${d}`;
      const hasHol = !!HOL[key];
      const hasEvt = (userEvents||[]).some(e=>{
        const [ey,em,ed] = (e.dateKey||'').split('-').map(Number);
        return ey===bsYear&&em===m&&ed===d;
      });
      const hasBd  = bdSet.has(key);
      const adMid  = new Date(firstAD.getTime()+(d-1)*86400000);
      const isTod  = adMid.toDateString()===TODAY.toDateString();
      let bg = 'var(--tgbg)';
      if(hasHol)       bg = 'rgba(239,143,149,.7)';
      else if(hasBd)   bg = 'rgba(236,72,153,.55)';
      else if(hasEvt)  bg = 'var(--accent)';
      const border = isTod ? '2px solid var(--accent)' : '2px solid transparent';
      html += `<div style="width:100%;aspect-ratio:1;border-radius:4px;background:${bg};border:${border};box-sizing:border-box;" title="${MEN[m-1]} ${d}"></div>`;
    }
    html += '</div></div>';
  }
  html += '</div>';

  // Legend
  html += `<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px;padding-top:12px;border-top:1px solid var(--border);">
    <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dsub);">
      <div style="width:12px;height:12px;border-radius:3px;background:var(--accent);"></div>Events
    </div>
    <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dsub);">
      <div style="width:12px;height:12px;border-radius:3px;background:rgba(239,143,149,.7);"></div>Holidays
    </div>
    <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dsub);">
      <div style="width:12px;height:12px;border-radius:3px;background:rgba(236,72,153,.55);"></div>Birthdays
    </div>
    <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dsub);">
      <div style="width:12px;height:12px;border-radius:3px;background:var(--tgbg);border:2px solid var(--accent);box-sizing:border-box;"></div>Today
    </div>
  </div>`;
  body.innerHTML = html;
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 4: DEFAULT REMINDER TIME
// ══════════════════════════════════════════════════════════════════════════════
function setDefReminder(minutes, btn){
  haptic('light');
  cfg.defReminder = minutes;
  try{ localStorage.setItem('vikram_cfg', JSON.stringify(cfg)); }catch(e){}
  applyDefReminder();
}
function applyDefReminder(){
  const labels = {15:'15 min', 30:'30 min', 60:'1 hour', 1440:'1 day'};
  const sub = document.getElementById('defReminderSub');
  if(sub) sub.textContent = 'Default: ' + (labels[cfg.defReminder] || cfg.defReminder + ' min') + ' before event';
  document.querySelectorAll('#defReminderChips .sv-chip').forEach(btn=>{
    const mins = parseInt(btn.textContent==='1 hr'?'60':btn.textContent==='1 day'?'1440':btn.textContent);
    const map = {'15 min':15,'30 min':30,'1 hr':60,'1 day':1440};
    const v = map[btn.textContent.trim()];
    btn.classList.toggle('on', v === cfg.defReminder);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 5: WEEK START — ensure setFD already applies to all views (it does via render())
// The existing setFD is already functional. Just mark it complete.
// ══════════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 6: PINNED NOTE ON HOME
// ══════════════════════════════════════════════════════════════════════════════
function applyPinnedNote(){
  const card = document.getElementById('pinnedNoteCard');
  if(!card) return;
  document.getElementById('tgPinnedNote')?.classList.toggle('on', cfg.showPinnedNote);
  if(!cfg.showPinnedNote){ card.style.display='none'; return; }
  // Find the first pinned note
  try{
    const notes = JSON.parse(localStorage.getItem('vikram_notes_v2')||'[]');
    const pinned = notes.filter(n=>n.pinned).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0))[0];
    if(!pinned){ card.style.display='none'; return; }
    document.getElementById('pinnedNoteTitle').textContent = pinned.title||'Untitled note';
    // Strip HTML tags for preview
    const tmp = document.createElement('div');
    tmp.innerHTML = pinned.content||'';
    document.getElementById('pinnedNotePreview').textContent = tmp.textContent||tmp.innerText||'';
    card.style.display = 'block';
  }catch(e){ card.style.display='none'; }
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 7: EVENT COUNT BADGE
// ══════════════════════════════════════════════════════════════════════════════
function applyCountBadge(){
  const el = document.getElementById('upCount');
  if(el) el.style.display = cfg.showCountBadge ? '' : 'none';
  document.getElementById('tgCountBadge')?.classList.toggle('on', cfg.showCountBadge);
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 8: FULL BACKUP / RESTORE (with optional password encryption)
// ══════════════════════════════════════════════════════════════════════════════
const FULL_BACKUP_KEYS = [
  'vikram_events','vikram_notes_v2','vikram_notes_html','vikram_tasks_v1',
  'vikram_daycounters','vikram_cycle','vikram_profile','vikram_birthdays_v1',
  'vikram_cfg','vikram_theme','vikram_theme_auto','vikram_lang','vikram_haptic',
  'vikram_kharcha','vikram_family','vikram_rf_sign_choice','vikram_widgetfeed'
];

function openFullBackupSheet(){
  haptic('light');
  const ov = document.getElementById('fbOverlay');
  if(!ov) return;
  const status = document.getElementById('fbStatusMsg');
  if(status) status.textContent = '';
  const encChk = document.getElementById('fbExportEncrypt');
  if(encChk) encChk.checked = false;
  const pwWrap = document.getElementById('fbExportPwWrap');
  if(pwWrap) pwWrap.style.display = 'none';
  const expPw = document.getElementById('fbExportPw');
  if(expPw) expPw.value = '';
  const impPwWrap = document.getElementById('fbImportPwWrap');
  if(impPwWrap) impPwWrap.style.display = 'none';
  const impPw = document.getElementById('fbImportPw');
  if(impPw) impPw.value = '';
  ov.style.display = '';
  requestAnimationFrame(()=>ov.classList.add('open'));
}
function closeFullBackupSheet(e){
  const ov = document.getElementById('fbOverlay');
  if(!ov) return;
  if(e && e.target !== ov) return;
  ov.classList.remove('open');
  setTimeout(()=>{ ov.style.display='none'; }, 220);
}

function _fbCollectData(){
  const data = {};
  FULL_BACKUP_KEYS.forEach(k=>{
    const v = localStorage.getItem(k);
    if(v !== null) data[k] = v;
  });
  return data;
}

function _fbCryptoAvailable(){
  return !!(window.crypto && window.crypto.subtle);
}
async function _fbDeriveKey(password, saltBytes){
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name:'PBKDF2', salt: saltBytes, iterations: 150000, hash:'SHA-256' },
    keyMaterial,
    { name:'AES-GCM', length:256 },
    false,
    ['encrypt','decrypt']
  );
}
function _fbBufToB64(buf){ return btoa(String.fromCharCode(...new Uint8Array(buf))); }
function _fbB64ToBuf(b64){ const bin = atob(b64); const arr = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i); return arr.buffer; }

async function doExportFullBackup(){
  haptic('medium');
  const data = _fbCollectData();
  const encrypt = document.getElementById('fbExportEncrypt').checked;
  const pw = document.getElementById('fbExportPw').value;
  let payload;
  if(encrypt){
    if(!pw || pw.length < 4){
      if(typeof vikramToast==='function') vikramToast('⚠️ Password must be at least 4 characters');
      return;
    }
    if(!_fbCryptoAvailable()){
      if(typeof vikramToast==='function') vikramToast('❌ Encryption not available on this device');
      return;
    }
    try{
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await _fbDeriveKey(pw, salt);
      const enc = new TextEncoder();
      const cipherBuf = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, enc.encode(JSON.stringify(data)));
      payload = {
        version:'vikram-full-1', exportedAt:new Date().toISOString(), encrypted:true,
        salt:_fbBufToB64(salt), iv:_fbBufToB64(iv), ciphertext:_fbBufToB64(cipherBuf)
      };
    }catch(e){
      if(typeof vikramToast==='function') vikramToast('❌ Encryption failed');
      return;
    }
  } else {
    payload = { version:'vikram-full-1', exportedAt:new Date().toISOString(), encrypted:false, data };
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const ymd = new Date().toISOString().slice(0,10);
  a.href = url; a.download = `vikram-backup-${ymd}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
  if(typeof vikramToast==='function') vikramToast('✅ Backup downloaded');
}

async function importFullBackup(input){
  const file = input.files && input.files[0];
  input.value = '';
  if(!file) return;
  let text;
  try{ text = await file.text(); }catch(e){ if(typeof vikramToast==='function') vikramToast('❌ Could not read file'); return; }
  let payload;
  try{ payload = JSON.parse(text); }catch(e){ if(typeof vikramToast==='function') vikramToast('❌ Invalid file format'); return; }
  if(!payload || (payload.version !== 'vikram-full-1')){
    if(typeof vikramToast==='function') vikramToast('❌ Not a Vikram full-backup file');
    return;
  }
  let data;
  if(payload.encrypted){
    const pw = document.getElementById('fbImportPw').value;
    if(!pw){
      document.getElementById('fbImportPwWrap').style.display = 'block';
      if(typeof vikramToast==='function') vikramToast('🔒 Enter the backup password first');
      return;
    }
    try{
      const salt = new Uint8Array(_fbB64ToBuf(payload.salt));
      const iv = new Uint8Array(_fbB64ToBuf(payload.iv));
      const key = await _fbDeriveKey(pw, salt);
      const plainBuf = await crypto.subtle.decrypt({name:'AES-GCM', iv}, key, _fbB64ToBuf(payload.ciphertext));
      data = JSON.parse(new TextDecoder().decode(plainBuf));
    }catch(e){
      if(typeof vikramToast==='function') vikramToast('❌ Wrong password or corrupted file');
      return;
    }
  } else {
    data = payload.data || {};
  }

  svShowConfirm('🗄️','Restore Full Backup',
    `This will overwrite your current events, notes, tasks, habits, and cycle data with the contents of this file (from ${new Date(payload.exportedAt).toLocaleDateString()}). This can't be undone.`,
    'Restore', '#6366f1',
    function(){
      try{
        Object.keys(data).forEach(k=>{
          if(FULL_BACKUP_KEYS.includes(k)) localStorage.setItem(k, data[k]);
        });
      }catch(e){
        if(typeof vikramToast==='function') vikramToast('❌ Restore failed — storage may be full');
        return;
      }
      if(typeof vikramToast==='function') vikramToast('✅ Backup restored — reloading…');
      setTimeout(()=>location.reload(), 900);
    }
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 9: UNDO SNACKBAR (generic — used by event/task/note/habit deletes)
// ══════════════════════════════════════════════════════════════════════════════
let _undoState = null;
let _undoTimer = null;
function showUndoSnackbar(message, restoreFn){
  clearTimeout(_undoTimer);
  const el = document.getElementById('undoSnackbar');
  if(!el){ return; }
  _undoState = { restoreFn };
  const msgEl = document.getElementById('undoSnackbarMsg');
  if(msgEl) msgEl.textContent = message;
  el.style.display = 'flex';
  requestAnimationFrame(()=>el.classList.add('show'));
  _undoTimer = setTimeout(hideUndoSnackbar, 5000);
}
function hideUndoSnackbar(){
  const el = document.getElementById('undoSnackbar');
  if(!el) return;
  el.classList.remove('show');
  setTimeout(()=>{ if(el) el.style.display='none'; }, 250);
  _undoState = null;
}
function undoSnackbarAction(){
  if(typeof haptic==='function') haptic('light');
  if(_undoState && typeof _undoState.restoreFn === 'function'){
    try{ _undoState.restoreFn(); }catch(e){ console.error('[Vikram] undo failed:', e); }
  }
  clearTimeout(_undoTimer);
  hideUndoSnackbar();
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 10: NATURAL-LANGUAGE QUICK ADD (Add Event sheet)
// ══════════════════════════════════════════════════════════════════════════════
function parseQuickAddText(text){
  let title = text.trim();
  let targetDate = null;
  let timeStr = null;

  // Time: "3pm", "3:30pm", "at 15:00", "at 3"
  const timeMatch = title.match(/\b(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
  if(timeMatch && (timeMatch[3] || timeMatch[2])){
    let h = parseInt(timeMatch[1],10);
    const m = timeMatch[2] ? parseInt(timeMatch[2],10) : 0;
    const ap = timeMatch[3] ? timeMatch[3].toLowerCase() : null;
    if(ap === 'pm' && h < 12) h += 12;
    if(ap === 'am' && h === 12) h = 0;
    if(h>=0 && h<24 && m>=0 && m<60){
      timeStr = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
      title = title.replace(timeMatch[0], ' ').trim();
    }
  }

  const today = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
  const lower = title.toLowerCase();
  const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

  if(/\bday after tomorrow\b/i.test(title)){
    targetDate = new Date(today.getTime() + 2*86400000);
    title = title.replace(/\bday after tomorrow\b/i,' ').trim();
  } else if(/\btomorrow\b/i.test(title)){
    targetDate = new Date(today.getTime() + 86400000);
    title = title.replace(/\btomorrow\b/i,' ').trim();
  } else if(/\btoday\b/i.test(title)){
    targetDate = today;
    title = title.replace(/\btoday\b/i,' ').trim();
  } else {
    const wdMatch = lower.match(/\b(next\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/);
    if(wdMatch){
      const wdIdx = weekdays.indexOf(wdMatch[2]);
      let diff = (wdIdx - today.getDay() + 7) % 7;
      if(diff === 0) diff = 7; // same weekday as today means the one next week
      targetDate = new Date(today.getTime() + diff*86400000);
      title = title.replace(wdMatch[0],' ').trim();
    } else {
      const inDaysMatch = lower.match(/\bin\s+(\d+)\s+days?\b/);
      if(inDaysMatch){
        targetDate = new Date(today.getTime() + parseInt(inDaysMatch[1],10)*86400000);
        title = title.replace(inDaysMatch[0],' ').trim();
      }
    }
  }

  title = title.replace(/\s+at\s*$/i,'').replace(/^[\s,\-]+|[\s,\-]+$/g,'').replace(/\s{2,}/g,' ').trim();
  if(!title) title = text.trim();

  return { title, targetDate, timeStr };
}

function quickAddParseAndFill(){
  const input = document.getElementById('qaInput');
  if(!input || !input.value.trim()) return;
  haptic('light');
  const parsed = parseQuickAddText(input.value);
  const titleEl = document.getElementById('evT');
  if(titleEl) titleEl.value = parsed.title;

  if(parsed.targetDate && typeof adToBs === 'function' && typeof setEventRange === 'function'){
    const bs = adToBs(parsed.targetDate);
    setEventRange(bs.y, bs.m, bs.d);
  }
  if(parsed.timeStr){
    const st = document.getElementById('evStartTime');
    if(st){
      st.value = parsed.timeStr;
      if(typeof onEvTimeChange === 'function') onEvTimeChange();
    }
  }
  input.value = '';
  if(typeof vikramToast === 'function') vikramToast('✨ Filled in — check the details below');
  if(titleEl) titleEl.focus();
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 12: PWA APP SHORTCUTS — handle ?action= from manifest shortcuts
// ══════════════════════════════════════════════════════════════════════════════
(function handleShortcutAction(){
  try{
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if(!action) return;
    setTimeout(function(){
      if(action === 'addEvent' && typeof openAddForDay === 'function' && typeof TODAYBS !== 'undefined'){
        openAddForDay(TODAYBS.y, TODAYBS.m, TODAYBS.d);
      } else if(action === 'logPeriod'){
        if(typeof switchTab === 'function') switchTab('cycle');
        setTimeout(function(){ if(typeof cyLogPeriodStart === 'function') cyLogPeriodStart(); }, 350);
      } else if(action === 'pomodoro' && typeof openSheet === 'function'){
        openSheet('pomodoro');
      }
      if(window.history && window.history.replaceState){
        window.history.replaceState({}, '', location.pathname);
      }
    }, 700);
  }catch(e){}
})();

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 13: PROFILE SHEET ENHANCEMENTS
// ══════════════════════════════════════════════════════════════════════════════

// Track first-ever use, for the "member since" stat
(function(){
  try{
    if(!localStorage.getItem('vikram_first_use')){
      localStorage.setItem('vikram_first_use', new Date().toISOString());
    }
  }catch(e){}
})();

function _pdKey(k){
  // Parse a "YYYY-M-D" style date-key (as used by the habit tracker) safely,
  // without relying on native Date string parsing.
  const parts = k.split('-').map(Number);
  return new Date(parts[0], parts[1]-1, parts[2]);
}

function _statsLongestStreak(){
  let habits = [];
  try{ habits = JSON.parse(localStorage.getItem('vikram_daycounters')||'[]'); }catch(e){}
  let longest = 0;
  habits.forEach(function(c){
    const hist = (c.history||[]).slice().sort();
    let run = 0, prevDate = null;
    hist.forEach(function(k){
      const d = _pdKey(k);
      if(prevDate){
        const diff = Math.round((+d - +prevDate)/86400000);
        run = (diff === 1) ? run+1 : 1;
      } else { run = 1; }
      if(run > longest) longest = run;
      prevDate = d;
    });
  });
  return longest;
}

function _statsGather(){
  let notes = [], tasks = [], habits = [];
  try{ notes = JSON.parse(localStorage.getItem('vikram_notes_v2')||'[]'); }catch(e){}
  try{ tasks = JSON.parse(localStorage.getItem('vikram_tasks_v1')||'[]'); }catch(e){}
  try{ habits = JSON.parse(localStorage.getItem('vikram_daycounters')||'[]'); }catch(e){}
  let memberDays = 0;
  try{
    const first = localStorage.getItem('vikram_first_use');
    if(first) memberDays = Math.max(1, Math.floor((Date.now() - new Date(first).getTime())/86400000) + 1);
  }catch(e){}
  return {
    events: (typeof userEvents!=='undefined' ? userEvents.length : 0),
    notes: notes.length,
    tasksDone: tasks.filter(function(t){return t.done;}).length,
    tasksTotal: tasks.length,
    habits: habits.length,
    longestStreak: _statsLongestStreak(),
    memberDays: memberDays
  };
}

function renderProfileStats(){
  const el = document.getElementById('profileStatsGrid');
  if(!el) return;
  const s = _statsGather();
  const boxes = [
    { num: s.events, lbl: 'Events created' },
    { num: s.longestStreak, lbl: 'Longest streak (days)' },
    { num: s.notes, lbl: 'Notes written' },
    { num: s.memberDays, lbl: 'Days using Vikram' }
  ];
  el.innerHTML = boxes.map(function(b){
    return '<div class="pstat-box"><div class="pstat-num">'+b.num+'</div><div class="pstat-lbl">'+b.lbl+'</div></div>';
  }).join('');
}

function renderProfileAchievements(){
  const el = document.getElementById('profileAchievements');
  if(!el) return;
  const s = _statsGather();
  const badges = [
    { emoji:'🔥', label:'7-day streak',  unlocked: s.longestStreak >= 7 },
    { emoji:'💪', label:'30-day streak', unlocked: s.longestStreak >= 30 },
    { emoji:'💯', label:'100 events',    unlocked: s.events >= 100 },
    { emoji:'📝', label:'25 notes',      unlocked: s.notes >= 25 },
    { emoji:'✅', label:'50 tasks done', unlocked: s.tasksDone >= 50 },
    { emoji:'🎉', label:'1-year member', unlocked: s.memberDays >= 365 }
  ];
  el.innerHTML = badges.map(function(b){
    return '<div class="pachv-badge'+(b.unlocked?' unlocked':'')+'"><div class="pachv-emoji">'+b.emoji+'</div><div class="pachv-lbl">'+esc(b.label)+'</div></div>';
  }).join('');
}

function renderProfileSyncChips(){
  const el = document.getElementById('profileSyncChips');
  if(!el) return;
  const gUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
  const gcalOn = !!localStorage.getItem('vikram_gcal_user');
  const notifOn = (typeof notifEnabled !== 'undefined') ? notifEnabled : (localStorage.getItem('vikram_notif_enabled') !== 'false');
  const chips = [
    { on: !!gUser, label: (!!gUser) ? 'Cloud backup on' : 'Cloud backup off' },
    { on: gcalOn,  label: gcalOn ? 'Google Calendar synced' : 'Calendar not synced' },
    { on: notifOn, label: notifOn ? 'Notifications on' : 'Notifications off' }
  ];
  el.innerHTML = chips.map(function(c){
    return '<div class="pchip'+(c.on?' on':'')+'">'+(c.on?'●':'○')+' '+esc(c.label)+'</div>';
  }).join('');
}

function renderProfileDataSummary(){
  const el = document.getElementById('profileDataSummary');
  if(!el) return;
  const s = _statsGather();
  let bytes = 0;
  try{
    FULL_BACKUP_KEYS.forEach(function(k){
      const v = localStorage.getItem(k);
      if(v) bytes += v.length;
    });
  }catch(e){}
  const kb = (bytes/1024).toFixed(1);
  el.textContent = s.events+' events · '+s.notes+' notes · '+s.tasksTotal+' tasks · '+s.habits+' habits · ~'+kb+' KB stored';
}

function renderMemoryLane(){
  const sec = document.getElementById('memoryLaneSec');
  const strip = document.getElementById('memoryLaneStrip');
  if(!sec || !strip) return;
  const items = [];
  try{
    (userEvents||[]).forEach(function(ev){
      if(!ev.adMs || !ev.title) return;
      const d = new Date(ev.adMs);
      if(d.getMonth()===TODAY.getMonth() && d.getDate()===TODAY.getDate() && d.getFullYear() < TODAY.getFullYear()){
        items.push({ title: ev.title, year: d.getFullYear(), yearsAgo: TODAY.getFullYear()-d.getFullYear() });
      }
    });
  }catch(e){}
  if(!items.length){ sec.style.display='none'; return; }
  items.sort(function(a,b){ return a.yearsAgo - b.yearsAgo; });
  sec.style.display='block';
  strip.innerHTML = items.map(function(it){
    return '<div class="mlane-card"><div class="mlane-year">'+it.yearsAgo+' year'+(it.yearsAgo>1?'s':'')+' ago</div><div class="mlane-title">'+esc(it.title)+'</div></div>';
  }).join('');
}

function renderProfileExtras(){
  try{ renderProfileSyncChips(); }catch(e){}
  try{ renderProfileStats(); }catch(e){}
  try{ renderProfileAchievements(); }catch(e){}
  try{ renderMemoryLane(); }catch(e){}
  try{ renderProfileDataSummary(); }catch(e){}
  try{
    let p: any = {};
    try{ p = JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
    if(typeof renderProfileQR === 'function') renderProfileQR('https://vikram-nep.pages.dev/');
    if(typeof cfg !== 'undefined' && cfg.accentColor && typeof applyAccentColor === 'function') applyAccentColor(cfg.accentColor);
  }catch(e){}
}

// ── Shareable digital card (PNG via canvas) ─────────────────────────────────
function shareDigitalCard(){
  haptic('medium');
  try{
    let p: any = {};
    try{ p = JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
    const name = p.name || 'Vikram User';
    const about = p.about || '';
    const W = 600, H = 360;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6366f1';
    const grad = ctx.createLinearGradient(0,0,W,H);
    grad.addColorStop(0, '#14151c');
    grad.addColorStop(1, '#1f2030');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    // Accent corner glow
    const glow = ctx.createRadialGradient(W-40,40,10,W-40,40,220);
    glow.addColorStop(0, accentHex+'55');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0,0,W,H);

    function drawAvatarThen(){
      // Name
      ctx.fillStyle = '#fff';
      ctx.font = '900 30px Nunito, sans-serif';
      ctx.fillText(name, 140, 130);
      // About/status
      if(about){
        ctx.fillStyle = 'rgba(255,255,255,.72)';
        ctx.font = '600 15px Nunito, sans-serif';
        ctx.fillText(about.slice(0,46), 140, 158);
      }
      // App branding
      ctx.fillStyle = accentHex;
      ctx.font = '900 20px Nunito, sans-serif';
      ctx.fillText('📅 Vikram Calendar', 140, 260);
      ctx.fillStyle = 'rgba(255,255,255,.55)';
      ctx.font = '600 13px Nunito, sans-serif';
      ctx.fillText('Nepali Patro · Bikram Sambat', 140, 282);

      canvas.toBlob(function(blob){
        if(!blob){ vikramToast('❌ Could not generate card'); return; }
        const file = new File([blob], 'vikram-card.png', {type:'image/png'});
        if(navigator.canShare && navigator.canShare({files:[file]})){
          navigator.share({ files:[file], title:'My Vikram Calendar card' }).catch(function(){});
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = 'vikram-card.png';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
          vikramToast('✅ Card downloaded');
        }
      }, 'image/png');
    }

    // Avatar circle (photo if present, else initials)
    const size = 88, cx = 68, cy = 96;
    if(p.photo){
      const img = new Image();
      img.onload = function(){
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, size/2, 0, Math.PI*2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, cx-size/2, cy-size/2, size, size);
        ctx.restore();
        drawAvatarThen();
      };
      img.onerror = drawAvatarThen;
      img.src = p.photo;
    } else {
      ctx.beginPath();
      ctx.arc(cx, cy, size/2, 0, Math.PI*2);
      ctx.fillStyle = accentHex;
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '900 32px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((typeof profileInitials==='function'?profileInitials(name):name.slice(0,2).toUpperCase()), cx, cy+2);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      drawAvatarThen();
    }
  }catch(e){
    console.error('[Vikram] shareDigitalCard error:', e);
    vikramToast('❌ Could not generate card');
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS INIT — run all feature inits when settings opens or on page load
// ══════════════════════════════════════════════════════════════════════════════
function initAllSettingsFeatures(){
  applyFocusMode();
  applySimpleMode();
  applyAccentColor(cfg.accentColor||'indigo');
  applyDefReminder();
  applyCountBadge();
  applyPinnedNote();
  _applyCycleTopToggle();
  // Year label
  const yirLabel = document.getElementById('yirYearLabel');
  if(yirLabel) yirLabel.textContent = String(vY);
}
// Run on page load
setTimeout(initAllSettingsFeatures, 200);

// Re-run whenever settings tab is opened
const _origSwitchTab = window.switchTab;
window.switchTab = function(tab){
  if(typeof _origSwitchTab==='function') _origSwitchTab.apply(this,arguments);
  if(tab==='settings'){
    setTimeout(initAllSettingsFeatures,50);
    // Refresh Google profile UI when settings tab opens
    setTimeout(function(){
      if(typeof updateGoogleUI === 'function' && window.firebase && firebase.auth){
        updateGoogleUI(firebase.auth().currentUser);
      }
    }, 100);
  }
  if(tab!=='settings') applyPinnedNote(); // refresh pinned note whenever leaving settings
};


// Sync Birthday Tracker entries into the calendar on startup
setTimeout(bdtSyncToEvents, 600);

// Listen to selectors for AD preview
['bdtY','bdtM','bdtD'].forEach(id=>{
  document.getElementById(id)?.addEventListener('change', bdtUpdateAdPreview);
});
