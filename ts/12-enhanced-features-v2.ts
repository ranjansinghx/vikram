// ══════════════════════════════════════════════════════════════
//  VIKRAM ENHANCED FEATURES v2
// ══════════════════════════════════════════════════════════════

// ── 1. EVENT COLOR CATEGORIES ──────────────────────────────────
window.selectEvCat = function(btn) {
  const picker = document.getElementById('evColorPicker');
  picker.querySelectorAll('.ev-cat-btn, .ae-cat-pill, .ae-cat-card, .ae-seg-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  moveSegTrack(btn);
};

function moveSegTrack(btn) {
  const track = document.getElementById('aeCatTrack');
  const picker = document.getElementById('evColorPicker');
  if(!track || !picker) return;
  // Use offsetLeft relative to the wrapper — works even when off-screen
  track.style.left = btn.offsetLeft + 'px';
  track.style.width = btn.offsetWidth + 'px';
  const cat = btn.style.getPropertyValue('--cat').trim();
  picker.style.setProperty('--ae-seg-color', cat);
}

function initSegTrack() {
  const active = document.querySelector('#evColorPicker .ae-seg-btn.on');
  if(!active) return;
  const track = document.getElementById('aeCatTrack');
  if(track) track.style.transition = 'none';
  moveSegTrack(active);
  requestAnimationFrame(() => {
    if(track) track.style.transition = '';
  });
}

// Map category names to dot colors on calendar
const EV_CAT_COLORS = {
  personal: '#3B82F6',
  work:     '#10b981',
  cultural: '#f59e0b',
  health:   '#ef4444'
};

// Override event dot rendering to use per-event colors
// Patch renderSelectedDay to show color dots
const _origRenderSelectedDay = window.renderSelectedDay;
window.renderSelectedDay = function() {
  if (typeof _origRenderSelectedDay === 'function') _origRenderSelectedDay();
  // Color the event items in day modal
  const list = document.getElementById('mEvtList');
  if (!list) return;
  list.querySelectorAll('[data-evcolor]').forEach(el => {
    const color = el.getAttribute('data-evcolor');
    const dot = el.querySelector('.mev-dot');
    if (dot && color) dot.style.background = color;
  });
};

// ── 2. OFFLINE INDICATOR ───────────────────────────────────────
(function() {
  function showOffline(online) {
    const toast = document.getElementById('offlineToast');
    const msg   = document.getElementById('offlineToastMsg');
    if (!toast) return;
    toast.className = online ? 'online' : '';
    msg.textContent = online ? "You're back online" : "You're offline";
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), online ? 2500 : 4000);
  }
  window.addEventListener('online',  () => showOffline(true));
  window.addEventListener('offline', () => showOffline(false));
  // Show once immediately if already offline
  if (!navigator.onLine) {
    setTimeout(() => showOffline(false), 1200);
  }
})();

// ── 3. GLOBAL TOAST HELPER ────────────────────────────────────
window.vikramToast = function(msg, duration) {
  const el = document.getElementById('vikramGlobalToast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), duration || 2200);
};

// ── 4. HAPTIC FEEDBACK ────────────────────────────────────────
window.haptic = function(type) {
  if (!navigator.vibrate) return;
  if (type === 'light')    navigator.vibrate(8);
  else if (type === 'medium') navigator.vibrate(18);
  else if (type === 'success') navigator.vibrate([10, 40, 10]);
  else navigator.vibrate(12);
};

// Patch calendar cells — add haptic on open
document.addEventListener('click', function(e) {
  const cell = e.target.closest('.cell:not(.empty):not(.other)');
  if (cell) haptic('light');
  const btn = e.target.closest('.nbtn, .today-pill, .mode-pill');
  if (btn) haptic('light');
  const saveBtn = e.target.closest('.ebtn');
  if (saveBtn) haptic('success');
});

// ── 5. SEARCH & JUMP TO DATE ──────────────────────────────────
window.openSearch = function() {
  haptic('light');
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.add('open');
  // Pre-fill jump year with current BS year
  const jumpY = document.getElementById('jumpY');
  if (jumpY && typeof vY !== 'undefined') jumpY.value = vY;
  const jumpM = document.getElementById('jumpM');
  if (jumpM && typeof vM !== 'undefined') jumpM.value = vM;
  setTimeout(() => {
    const inp = document.getElementById('searchInput');
    if (inp) { inp.value = ''; inp.focus(); searchRun(); }
  }, 200);
};

window.closeSearch = function(e) {
  if (e && e.target !== document.getElementById('searchModal')) return;
  document.getElementById('searchModal')?.classList.remove('open');
};

window.searchRun = function() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const results = document.getElementById('searchResults');
  if (!results) return;

  if (!q) { results.innerHTML = ''; return; }

  const hits = [];

  // Search holidays
  if (typeof HOL !== 'undefined') {
    for (const [key, val] of Object.entries(HOL)) {
      const name = (val.en || '') + ' ' + (val.np || '');
      if (name.toLowerCase().includes(q)) {
        const [ky, km, kd] = key.split('-').map(Number);
        hits.push({ type: 'hol', name: val.en, sub: `${(typeof MEN !== 'undefined' ? MEN[km-1] : '')} ${kd}, ${ky} BS`, ky, km, kd });
        if (hits.length >= 8) break;
      }
    }
  }

  // Search user events
  if (typeof userEvents !== 'undefined') {
    userEvents.forEach(ev => {
      if (ev.title.toLowerCase().includes(q) || (ev.note || '').toLowerCase().includes(q)) {
        hits.push({ type: 'evt', name: ev.title, sub: `${(typeof MEN !== 'undefined' ? MEN[ev.bsM-1] : '')} ${ev.bsD}, ${ev.bsY} BS`, ky: ev.bsY, km: ev.bsM, kd: ev.bsD });
      }
    });
  }

  // Search notes (title + plain-text body + tags)
  try {
    const notes = JSON.parse(localStorage.getItem('vikram_notes_v2') || '[]');
    const tmp = document.createElement('div');
    notes.forEach(n => {
      tmp.innerHTML = n.html || '';
      const plain = (tmp.textContent || '').replace(/\s+/g, ' ').trim();
      const title = (n.title || '').trim() || plain.slice(0, 40) || 'Untitled note';
      if (title.toLowerCase().includes(q) || plain.toLowerCase().includes(q) || (n.tags||[]).some(t=>t.toLowerCase().includes(q))) {
        hits.push({ type: 'note', name: title, sub: plain.slice(0, 60) || 'No content', id: n.id });
      }
    });
  } catch(e) {}

  // Search tasks (title + notes)
  try {
    const tasks = JSON.parse(localStorage.getItem('vikram_tasks_v1') || '[]');
    tasks.forEach(t => {
      const title = (t.title || '').trim() || 'Untitled task';
      if (title.toLowerCase().includes(q) || (t.notes||'').toLowerCase().includes(q)) {
        const sub = t.done ? 'Done' : (t.due ? 'Due ' + t.due : 'No due date');
        hits.push({ type: 'task', name: title, sub, id: t.id });
      }
    });
  } catch(e) {}

  // Search habit tracker
  try {
    const habits = JSON.parse(localStorage.getItem('vikram_daycounters') || '[]');
    habits.forEach(c => {
      if ((c.name||'').toLowerCase().includes(q) || (c.note||'').toLowerCase().includes(q)) {
        hits.push({ type: 'habit', name: c.name, sub: c.note ? c.note.slice(0,60) : (c.type==='build'?'Build habit':c.type==='countdown'?'Countdown':'Quit habit'), id: c.id });
      }
    });
  } catch(e) {}

  // Search Kharcha (expense/income entries — category, note, and amount)
  try {
    const entries = JSON.parse(localStorage.getItem('vikram_kharcha') || '[]');
    entries.forEach(r => {
      const amtStr = String(Math.round(r.amount||0));
      if ((r.category||'').toLowerCase().includes(q) || (r.note||'').toLowerCase().includes(q) || amtStr.includes(q)) {
        const dateStr = (typeof MEN !== 'undefined' && r.bsM) ? `${MEN[r.bsM-1]} ${r.bsD}, ${r.bsY} BS` : '';
        const name = (r.note && r.note.trim()) ? r.note.trim() : r.category;
        hits.push({ type: 'kharcha', name, sub: `${r.type==='income'?'💰':'💸'} Rs ${amtStr} · ${r.category}${dateStr?' · '+dateStr:''}`, id: r.id });
      }
    });
  } catch(e) {}

  // Search Cycle symptom/mood logs (note, symptom names, mood)
  try {
    const cd = JSON.parse(localStorage.getItem('vikram_cycle') || '{}');
    const symLogs = cd.symptomLogs || [];
    symLogs.forEach(s => {
      const symptomNames = (s.symptoms||[]).map(id => (typeof SYMPTOM_META !== 'undefined' && SYMPTOM_META[id]) ? SYMPTOM_META[id].label : id);
      const moodName = (s.mood && typeof MOOD_META !== 'undefined' && MOOD_META[s.mood]) ? MOOD_META[s.mood].label : (s.mood||'');
      const haystack = [(s.note||''), moodName, symptomNames.join(' ')].join(' ').toLowerCase();
      if (haystack.includes(q)) {
        const dateStr = new Date(s.date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
        const bits = [moodName, ...symptomNames].filter(Boolean).join(', ');
        hits.push({ type: 'cycle', name: bits || 'Cycle log', sub: `${dateStr}${s.note ? ' · ' + s.note.slice(0,50) : ''}`, date: s.date });
      }
    });
  } catch(e) {}

  if (hits.length === 0) {
    results.innerHTML = '<div class="search-empty">No results found</div>';
    return;
  }

  const TYPE_LABELS = { hol:'HOLIDAY', evt:'EVENT', note:'NOTE', task:'TASK', habit:'HABIT', kharcha:'KHARCHA', cycle:'CYCLE' };
  results.innerHTML = hits.map(h => {
    let onclick;
    if (h.type === 'hol' || h.type === 'evt') onclick = `searchGoTo(${h.ky},${h.km},${h.kd})`;
    else if (h.type === 'note') onclick = `searchOpenNote('${h.id}')`;
    else if (h.type === 'task') onclick = `searchOpenTask('${h.id}')`;
    else if (h.type === 'habit') onclick = `searchOpenHabit(${h.id})`;
    else if (h.type === 'kharcha') onclick = `searchOpenKharcha('${h.id}')`;
    else if (h.type === 'cycle') onclick = `searchOpenCycleLog(${h.date})`;
    else onclick = '';
    return `
    <div class="search-result-item" onclick="${onclick}">
      <div class="sri-dot ${h.type}"></div>
      <div class="sri-main">
        <div class="sri-name">${esc(h.name)}</div>
        <div class="sri-sub">${esc(h.sub)}</div>
      </div>
      <span class="sri-badge ${h.type}">${TYPE_LABELS[h.type]}</span>
    </div>
  `;}).join('');
};

window.searchGoTo = function(y, m, d) {
  document.getElementById('searchModal')?.classList.remove('open');
  if (typeof vY !== 'undefined') { vY = y; vM = m; }
  if (typeof render === 'function') render();
  if (typeof openDay === 'function') setTimeout(() => openDay(y, m, d), 120);
  haptic('medium');
};

window.searchOpenNote = function(id) {
  document.getElementById('searchModal')?.classList.remove('open');
  if (typeof haptic === 'function') haptic('medium');
  if (typeof window.profileOpenNote === 'function') window.profileOpenNote(id);
};

window.searchOpenTask = function(id) {
  document.getElementById('searchModal')?.classList.remove('open');
  if (typeof haptic === 'function') haptic('medium');
  if (typeof window.profileOpenTask === 'function') window.profileOpenTask(id);
};

window.searchOpenHabit = function(id) {
  document.getElementById('searchModal')?.classList.remove('open');
  if (typeof haptic === 'function') haptic('medium');
  if (typeof switchTab === 'function') switchTab('counter');
  setTimeout(function(){ if (typeof window.dcOpenEdit === 'function') window.dcOpenEdit(id); }, 300);
};

window.searchOpenKharcha = function(id) {
  document.getElementById('searchModal')?.classList.remove('open');
  if (typeof haptic === 'function') haptic('medium');
  if (typeof openSheet === 'function') openSheet('kharcha');
};

window.searchOpenCycleLog = function(dateTs) {
  document.getElementById('searchModal')?.classList.remove('open');
  if (typeof haptic === 'function') haptic('medium');
  if (typeof switchTab === 'function') switchTab('cycle');
  setTimeout(function(){ if (typeof openSymptomLogSheet === 'function') openSymptomLogSheet(dateTs); }, 300);
};

window.jumpToDate = function() {
  const y = parseInt(document.getElementById('jumpY')?.value);
  const m = parseInt(document.getElementById('jumpM')?.value);
  if (!y || !m || y < 2055 || y > 2086) {
    vikramToast('⚠️ Enter a valid BS year (2055–2086)');
    return;
  }
  document.getElementById('searchModal')?.classList.remove('open');
  if (typeof vY !== 'undefined') { vY = y; vM = m; }
  if (typeof render === 'function') render();
  haptic('medium');
  vikramToast(`📅 Jumped to ${(typeof MEN !== 'undefined' ? MEN[m-1] : '')} ${y}`);
};

// Close search on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('searchModal')?.classList.remove('open');
    document.getElementById('shareModal')?.classList.remove('open');
  }
});

// ── 6. SHARE DAY CARD ─────────────────────────────────────────
window.openShareModal = function() {
  haptic('light');
  const modal = document.getElementById('shareModal');
  const content = document.getElementById('shareCardContent');
  if (!modal || !content) return;

  // Gather day info from current selectedDay
  const sd = typeof selectedDay !== 'undefined' ? selectedDay : (typeof TODAYBS !== 'undefined' ? TODAYBS : null);
  if (!sd) return;

  const bsY = sd.y, bsM = sd.m, bsD = sd.d;
  const monthName = typeof MEN !== 'undefined' ? MEN[bsM - 1] : '';
  const adDate = typeof bsToAd === 'function' ? bsToAd(bsY, bsM, bsD) : new Date();
  const adStr = adDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const tithi = typeof getTithi === 'function' ? getTithi(adDate) : '';

  // Collect events and holidays for this day
  const items = [];
  if (typeof HOL !== 'undefined') {
    const hkey = `${bsY}-${bsM}-${bsD}`;
    if (HOL[hkey]) items.push({ icon: '🇳🇵', name: HOL[hkey].en });
  }
  if (typeof OBS !== 'undefined') {
    const okey = `${bsY}-${bsM}-${bsD}`;
    if (OBS[okey]) items.push({ icon: '🎀', name: OBS[okey].en });
  }
  if (typeof userEvents !== 'undefined') {
    userEvents.filter(ev => typeof eventMatchesDate === 'function' && eventMatchesDate(ev, bsY, bsM, bsD))
      .forEach(ev => items.push({ icon: '📌', name: ev.title }));
  }

  content.innerHTML = `
    <div class="share-card-date-big">${bsD}</div>
    <div class="share-card-month">${monthName} ${bsY} · Bikram Sambat</div>
    <div class="share-card-bs">
      ${adStr}
    </div>
    ${tithi ? `<div class="share-card-tithi">🌙 ${tithi}</div>` : ''}
    ${items.length ? `<div class="share-card-events">${items.map(it => `<div class="share-card-event">${it.icon} ${esc(it.name)}</div>`).join('')}</div>` : ''}
    <div class="share-card-footer">
      <span class="share-card-logo">VIKRAM CALENDAR</span>
    </div>
  `;

  modal.classList.add('open');
};

window.closeShareModal = function(e) {
  if (e && e.target !== document.getElementById('shareModal')) return;
  document.getElementById('shareModal')?.classList.remove('open');
};

window.doShare = function() {
  haptic('medium');
  const sd: any = typeof selectedDay !== 'undefined' ? selectedDay : (typeof TODAYBS !== 'undefined' ? TODAYBS : {});
  const bsM = sd.m || 1;
  const monthName = typeof MEN !== 'undefined' ? MEN[bsM - 1] : '';
  const text = `📅 ${sd.d} ${monthName} ${sd.y} BS\n\nShared from Vikram Calendar`;

  if (navigator.share) {
    navigator.share({ title: 'Vikram Calendar', text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => {
      vikramToast('📋 Copied to clipboard!');
    }).catch(() => vikramToast('Share not supported on this device'));
  }
  document.getElementById('shareModal')?.classList.remove('open');
};

// ── 7. NOTES — HIGHLIGHT + HEADING ────────────────────────────
// Extend the existing notesFmt to handle heading blocks
const _origNotesFmt = window.notesFmt;
window.notesFmt = function(cmd, val) {
  if (cmd === 'formatBlock') {
    document.execCommand('formatBlock', false, val || 'P');
    const ed = document.getElementById('notesEditor');
    if (ed) ed.focus();
    if (typeof updateToolbarState === 'function') updateToolbarState();
    return;
  }
  if (typeof _origNotesFmt === 'function') _origNotesFmt(cmd, val);
};

window.notesHighlight = function() {
  // Toggle yellow highlight on selection
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return;
  const range = sel.getRangeAt(0);
  const parent = range.commonAncestorContainer;
  const mark = parent.nodeType === 1 ? parent.closest('mark') : (parent.parentElement ? parent.parentElement.closest('mark') : null);
  if (mark) {
    // Remove highlight
    const frag = document.createDocumentFragment();
    while (mark.firstChild) frag.appendChild(mark.firstChild);
    mark.parentNode.replaceChild(frag, mark);
  } else {
    document.execCommand('hiliteColor', false, '#FDE68A');
  }
  const ed = document.getElementById('notesEditor');
  if (ed) ed.focus();
  if (typeof updateToolbarState === 'function') updateToolbarState();
};

// ── PROFILE ───────────────────────────────────────────────────
(function initProfile(){
  try{
    const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
    if(p.name||p.about) applyProfile(p.name||'',p.about||'');
    showProfileShare(p.name||'',p.about||'');
    // Initialize birthday card if birthday is already set
    if(p.bday && p.bday.y){
      setTimeout(function(){
        if(typeof profileBdayCardUpdate==='function') profileBdayCardUpdate(p.bday);
        const disp=document.getElementById('profileBdayDisplay');
        if(disp) disp.textContent=typeof bdayDisplayText==='function'?bdayDisplayText(p.bday):'';
      }, 300);
    }
    // Render profile sections on load
    setTimeout(function(){
      if(typeof renderProfileBirthdays==='function') renderProfileBirthdays();
      if(typeof renderProfileNotes==='function') renderProfileNotes();
      if(typeof renderProfileTasks==='function') renderProfileTasks();
    }, 400);
  }catch(e){}
})();

function profileInitials(name){
  if(!name||!name.trim()) return '?';
  return name.trim().split(/\s+/).map(w=>w[0]).join('').toUpperCase().slice(0,2);
}

// For a yearly birthday entry, the stored adMs is the *original* birth date
// (possibly years ago). This computes the AD-midnight ms of the next time
// that BS month/day comes around, so "upcoming" lists sort/filter correctly.
function nextOccurrenceAdMs(ev){
  if(!ev || !ev.isBirthday) return ev ? ev.adMs : 0;
  const t=TODAYBS;
  let occY=t.y;
  let maxD=BS[occY]?.[ev.bsM-1]??30;
  let occD=Math.min(ev.bsD,maxD);
  if(ev.bsM<t.m||(ev.bsM===t.m&&occD<t.d)){
    occY++;
    maxD=BS[occY]?.[ev.bsM-1]??30;
    occD=Math.min(ev.bsD,maxD);
  }
  const ad=bsToAd(occY,ev.bsM,occD);
  return new Date(ad.getFullYear(),ad.getMonth(),ad.getDate()).getTime();
}

// ── Shareable events: the user's own upcoming added events ──
function getShareableEvents(){
  if(typeof userEvents==='undefined'||!userEvents.length) return [];
  const todayMid=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate());
  return userEvents
    .filter(ev=>{
      const end = ev.isBirthday ? nextOccurrenceAdMs(ev) : (ev.endAdMs!=null ? ev.endAdMs : ev.adMs);
      const endMid=new Date(new Date(end).setHours(0,0,0,0));
      return endMid>=todayMid;
    })
    .sort((a,b)=>(a.isBirthday?nextOccurrenceAdMs(a):a.adMs)-(b.isBirthday?nextOccurrenceAdMs(b):b.adMs))
    .slice(0,5)
    .map(ev=>({t:(ev.title||'').slice(0,40),y:ev.bsY,m:ev.bsM,d:ev.bsD,c:ev.color||'personal'}));
}

function encodeShareEvents(events){
  if(!events||!events.length) return '';
  try{
    const json=JSON.stringify(events);
    const bytes=new TextEncoder().encode(json);
    let bin='';
    bytes.forEach(b=>{ bin+=String.fromCharCode(b); });
    return btoa(bin);
  }catch(e){ return ''; }
}
function decodeShareEvents(str){
  if(!str) return [];
  try{
    const bin=atob(str);
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    const json=new TextDecoder().decode(bytes);
    const v=JSON.parse(json);
    return Array.isArray(v)?v:[];
  }catch(e){ return []; }
}

// ── Receiving side: show a read-only preview when opening someone else's share link ──
function checkIncomingSharedProfile(){
  try{
    const params=new URLSearchParams(location.search);
    const pn=params.get('pn')||'';
    const pa=params.get('pa')||'';
    const pe=params.get('pe')||'';
    if(!pn && !pa && !pe) return;

    const events=decodeShareEvents(pe);

    const av=document.getElementById('sharedProfileAvatar');
    if(av) av.textContent=profileInitials(pn);
    const nd=document.getElementById('sharedProfileName');
    if(nd) nd.textContent=pn||(lang==='ne'?'कसैले':'Someone');
    const ad=document.getElementById('sharedProfileAbout');
    if(ad) ad.textContent=pa||'';

    const sec=document.getElementById('sharedProfileEventsSec');
    const list=document.getElementById('sharedProfileEvents');
    if(events.length && sec && list){
      sec.style.display='';
      const mArr=lang==='ne'?MNE:MEN;
      const colorMap={'personal':'#3B82F6','work':'#10b981','cultural':'#f59e0b','health':'#ef4444','birthday':'#ec4899'};
      list.innerHTML=events.map(e=>`<div class="pshare-evt">
        <span class="pshare-evt-dot" style="background:${safeCss(colorMap[e.c],'#3B82F6')};"></span>
        <span class="pshare-evt-name">${esc(e.t)}</span>
        <span class="pshare-evt-date">${mArr[(e.m||1)-1]} ${ns(e.d)}</span>
      </div>`).join('');
    } else if(sec){
      sec.style.display='none';
    }

    // Strip share params from the address bar so a refresh/re-share doesn't loop this
    try{ history.replaceState(null,'',location.pathname+location.hash); }catch(e){}

    openSheet('sharedProfile');
  }catch(e){}
}

function buildProfileURL(name,about,events){
  const base=location.origin+location.pathname;
  const params=new URLSearchParams();
  if(name) params.set('pn',name);
  if(about) params.set('pa',about);
  const enc=encodeShareEvents(events);
  if(enc) params.set('pe',enc);
  return base+'?'+params.toString()+'#profile';
}

let _qrInstance=null;
function renderProfileQR(url){
  const el=document.getElementById('profileQR');
  if(!el) return;
  el.innerHTML='';
  _qrInstance=null;
  if(typeof QRCode==='undefined') return;
  try{
    _qrInstance=new QRCode(el,{
      text:url,
      width:132,height:132,
      colorDark:'#111',colorLight:'#ffffff',
      correctLevel:QRCode.CorrectLevel.M
    });
  }catch(e){}
}

function renderProfileShareEvents(events?){
  const wrap=document.getElementById('profileShareEvents');
  const sec=document.getElementById('profileEventsSec');
  const empty=document.getElementById('profileEventsEmpty');
  if(!wrap) return;
  // Work directly from userEvents so we have real indices for edit/delete
  const todayMid=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate());
  const upcoming=(typeof userEvents==='undefined'?[]:userEvents)
    .map((ev,i)=>({ev,i}))
    .filter(({ev})=>{
      if(ev.isBirthday||ev.isBdtBirthday) return false; // birthdays shown separately
      const end=ev.endAdMs!=null?ev.endAdMs:ev.adMs;
      return new Date(new Date(end).setHours(0,0,0,0))>=todayMid;
    })
    .sort((a,b)=>a.ev.adMs-b.ev.adMs);
  if(sec) sec.style.display='';
  if(!upcoming.length){
    wrap.innerHTML='';
    if(empty) empty.style.display='';
    return;
  }
  if(empty) empty.style.display='none';
  const mArr=lang==='ne'?MNE:MEN;
  const colorMap={'personal':'#3B82F6','work':'#10b981','cultural':'#f59e0b','health':'#ef4444','birthday':'#ec4899'};
  const shown=upcoming.slice(0,5);
  wrap.innerHTML=shown.map(({ev,i})=>`<div class="pshare-evt" style="gap:7px;padding:8px 10px;">
    <span class="pshare-evt-dot" style="background:${safeCss(colorMap[ev.color],'#3B82F6')};flex-shrink:0;"></span>
    <span class="pshare-evt-name" style="flex:1;font-size:12px;">${esc(ev.title)}</span>
    <span class="pshare-evt-date" style="font-size:10px;">${mArr[ev.bsM-1]} ${ns(ev.bsD)}</span>
    <button onclick="profileEditEvent(${i})" style="padding:3px 8px;border-radius:6px;border:1.5px solid var(--border);background:transparent;color:var(--dsub);font-size:10px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;flex-shrink:0;line-height:1.4;">Edit</button>
    <button onclick="profileDeleteEvent(${ev.adMs})" style="padding:3px 8px;border-radius:6px;border:1.5px solid rgba(224,62,62,.2);background:transparent;color:var(--wknd);font-size:10px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;flex-shrink:0;line-height:1.4;">Del</button>
  </div>`).join('') + (upcoming.length>5?`<div class="ssub" style="text-align:center;margin-top:4px;">+${upcoming.length-5} more</div>`:'');
}

// ── PROFILE: BIRTHDAYS SUMMARY ──
function renderProfileBirthdays(){
  const wrap=document.getElementById('profileBdtList');
  const sec=document.getElementById('profileBdtSec');
  const empty=document.getElementById('profileBdtEmpty');
  if(!wrap||!sec) return;
  sec.style.display='';
  const list=typeof bdtLoad==='function'?bdtLoad():[];
  // Also include profile birthday
  const allBdays=[];
  try{
    const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
    if(p.bday&&p.bday.y){
      const pName=(p.name||'Me').trim()||'Me';
      allBdays.push({name:pName,y:p.bday.y,m:p.bday.m,d:p.bday.d,note:'',isProfile:true});
    }
  }catch(e){}
  list.forEach(item=>{ if(item.y&&item.m&&item.d&&item.name) allBdays.push({...item,isProfile:false}); });
  if(!allBdays.length){
    wrap.innerHTML='';
    if(empty) empty.style.display='';
    return;
  }
  if(empty) empty.style.display='none';
  // Annotate with days until
  const annotated=allBdays.map((item,idx)=>{
    const days=typeof bdtDaysUntil==='function'?bdtDaysUntil(item.y,item.m,item.d):null;
    return{...item,days,origIdx:list.indexOf(allBdays[idx])};
  }).sort((a,b)=>{
    if(a.days===null&&b.days===null) return 0;
    if(a.days===null) return 1; if(b.days===null) return -1;
    return a.days-b.days;
  });
  const months=MEN;
  const shown=annotated.slice(0,5);
  wrap.innerHTML=shown.map(item=>{
    const dateStr=`${months[item.m-1]} ${item.d}, ${item.y} BS`;
    let badge='';
    if(item.days===0) badge=`<span style="background:linear-gradient(135deg,#ec4899,#f43f5e);color:#fff;font-size:10px;font-weight:800;padding:2px 7px;border-radius:20px;flex-shrink:0;">🎉 Today!</span>`;
    else if(item.days!==null&&item.days<=7) badge=`<span style="background:rgba(236,72,153,.15);color:#ec4899;font-size:10px;font-weight:800;padding:2px 7px;border-radius:20px;flex-shrink:0;">in ${item.days}d</span>`;
    else if(item.days!==null) badge=`<span style="background:var(--tgbg);color:var(--dsub);font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;flex-shrink:0;">${item.days}d</span>`;
    const editBtn=item.isProfile?
      `<button onclick="profileBdayStartEdit()" style="padding:3px 8px;border-radius:6px;border:1.5px solid var(--border);background:transparent;color:var(--dsub);font-size:10px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;flex-shrink:0;line-height:1.4;">Edit</button>`:
      `<button onclick="bdtOpenEdit(${list.findIndex(x=>x.name===item.name&&x.y===item.y&&x.m===item.m&&x.d===item.d)})" style="padding:3px 8px;border-radius:6px;border:1.5px solid var(--border);background:transparent;color:var(--dsub);font-size:10px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;flex-shrink:0;line-height:1.4;">Edit</button>`;
    return `<div class="pshare-evt" style="gap:7px;padding:8px 10px;">
      <span class="pshare-evt-dot" style="background:#ec4899;flex-shrink:0;"></span>
      <span class="pshare-evt-name" style="flex:1;font-size:12px;">🎂 ${esc(item.name)}</span>
      <span class="pshare-evt-date" style="font-size:10px;">${months[item.m-1]} ${item.d}</span>
      ${badge}
      ${editBtn}
    </div>`;
  }).join('')+(annotated.length>5?`<div class="ssub" style="text-align:center;margin-top:4px;">+${annotated.length-5} more</div>`:'');
}


function profEsc(str){
  return String(str||'').replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}

function profNoteSnippet(html){
  const tmp=document.createElement('div');
  tmp.innerHTML=html||'';
  return (tmp.textContent||tmp.innerText||'').replace(/\s+/g,' ').trim();
}

function renderProfileNotes(){
  const wrap=document.getElementById('profileNotesList');
  const sec=document.getElementById('profileNotesSec');
  const empty=document.getElementById('profileNotesEmpty');
  if(!wrap||!sec) return;
  let list=[];
  try{ list=JSON.parse(localStorage.getItem('vikram_notes_v2')||'[]')||[]; }catch(e){ list=[]; }
  sec.style.display='';
  if(!list.length){
    wrap.innerHTML='';
    if(empty) empty.style.display='';
    return;
  }
  if(empty) empty.style.display='none';
  list.sort((a,b)=>{
    if(!!b.pinned!==!!a.pinned) return b.pinned?1:-1;
    return (b.updated||0)-(a.updated||0);
  });
  const shown=list.slice(0,5);
  wrap.innerHTML=shown.map(n=>{
    const plain=profNoteSnippet(n.html);
    const title=(n.title&&n.title.trim())||(plain?plain.slice(0,40):'Untitled note');
    const d=n.updated?new Date(n.updated):null;
    const dateStr=d?(ADMEN[d.getMonth()].slice(0,3)+' '+d.getDate()):'';
    return '<div class="pshare-evt" style="cursor:pointer;" onclick="profileOpenNote(\''+n.id+'\')">'+
      '<span class="pshare-evt-dot" style="background:'+(n.pinned?'#f59e0b':'#888')+';"></span>'+
      '<span class="pshare-evt-name">'+profEsc(title)+'</span>'+
      '<span class="pshare-evt-date">'+profEsc(dateStr)+'</span>'+
    '</div>';
  }).join('') + (list.length>5 ? '<div class="ssub" style="text-align:center;margin-top:4px;">+'+(list.length-5)+' more</div>' : '');
}

function renderProfileTasks(){
  const wrap=document.getElementById('profileTasksList');
  const sec=document.getElementById('profileTasksSec');
  const empty=document.getElementById('profileTasksEmpty');
  if(!wrap||!sec) return;
  let list=[];
  try{ list=JSON.parse(localStorage.getItem('vikram_tasks_v1')||'[]')||[]; }catch(e){ list=[]; }
  sec.style.display='';
  if(!list.length){
    wrap.innerHTML='';
    if(empty) empty.style.display='';
    return;
  }
  if(empty) empty.style.display='none';
  list.sort((a,b)=>{
    if(!!a.done!==!!b.done) return a.done?1:-1;
    if(!a.done){
      if(a.due&&b.due) return a.due<b.due?-1:(a.due>b.due?1:(b.updated||0)-(a.updated||0));
      if(a.due) return -1;
      if(b.due) return 1;
    }
    return (b.updated||0)-(a.updated||0);
  });
  const shown=list.slice(0,5);
  const today=new Date(); today.setHours(0,0,0,0);
  wrap.innerHTML=shown.map(t=>{
    const title=(t.title&&t.title.trim())||'Untitled task';
    let meta='No due date', dotColor='#888';
    if(t.done){ meta='Done'; dotColor='#10b981'; }
    else if(t.due){
      const parts=t.due.split('-').map(Number);
      const d=new Date(parts[0],parts[1]-1,parts[2]);
      const diff=Math.round((+d-+today)/86400000);
      const dStr=ADMEN[d.getMonth()].slice(0,3)+' '+d.getDate();
      if(diff<0){ meta='Overdue · '+dStr; dotColor='#e03e3e'; }
      else if(diff===0){ meta='Due today'; dotColor='#f59e0b'; }
      else meta='Due '+dStr;
    }
    const nameStyle=t.done?' style="text-decoration:line-through;opacity:.6;"':'';
    return '<div class="pshare-evt" style="cursor:pointer;" onclick="profileOpenTask(\''+t.id+'\')">'+
      '<span class="pshare-evt-dot" style="background:'+dotColor+';"></span>'+
      '<span class="pshare-evt-name"'+nameStyle+'>'+profEsc(title)+'</span>'+
      '<span class="pshare-evt-date">'+profEsc(meta)+'</span>'+
    '</div>';
  }).join('') + (list.length>5 ? '<div class="ssub" style="text-align:center;margin-top:4px;">+'+(list.length-5)+' more</div>' : '');
}

// ── Profile: "Backed Up to Google" — shows which local data has a cloud copy ──
function renderProfileBackup(){
  const signedOutEl = document.getElementById('profileBackupSignedOut');
  const signedInEl  = document.getElementById('profileBackupSignedIn');
  const summaryEl   = document.getElementById('profileBackupSummary');
  const listEl      = document.getElementById('profileBackupList');
  if(!signedOutEl || !signedInEl || !listEl) return;

  const user = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;

  if(!user){
    signedOutEl.style.display = '';
    signedInEl.style.display = 'none';
    return;
  }

  signedOutEl.style.display = 'none';
  signedInEl.style.display = '';

  const SYNC_KEYS = (window.vikramCloudSync && window.vikramCloudSync.SYNC_KEYS) || [];
  let newestTs = 0;
  const rows = SYNC_KEYS.map(function(sk){
    const raw = localStorage.getItem(sk.key);
    let hasLocalData = raw !== null && raw !== '[]' && raw !== '{}' && raw !== '';
    // Family Share always stores a {code,role} shaped object, even when the
    // person has never joined (or has since left) — check the actual code
    // instead of comparing the raw string, so it only shows once truly in use.
    if(hasLocalData && sk.key === 'vikram_family'){
      try{
        const parsed = JSON.parse(raw);
        hasLocalData = !!(parsed && parsed.code);
      }catch(e){ hasLocalData = false; }
    }
    let ts = 0;
    try{
      const meta = JSON.parse(localStorage.getItem(sk.key + '__syncmeta') || 'null');
      if(meta) ts = meta.ts || 0;
    }catch(e){}
    const backedUp = hasLocalData && ts > 0;
    if(backedUp && ts > newestTs) newestTs = ts;
    return { label: sk.label, hasLocalData: hasLocalData, backedUp: backedUp };
  }).filter(function(r){ return r.hasLocalData; }); // only show categories that actually have data

  if(summaryEl){
    const label = user.displayName || user.email || 'your Google account';
    if(newestTs){
      const when = new Date(newestTs);
      const now = new Date();
      const sameDay = when.toDateString() === now.toDateString();
      const timeStr = when.toLocaleTimeString([], {hour:'numeric', minute:'2-digit'});
      const whenStr = sameDay ? ('today at ' + timeStr) : (when.toLocaleDateString([], {month:'short', day:'numeric'}) + ' at ' + timeStr);
      summaryEl.innerHTML = 'Last backed up to <b>' + profEsc(label) + '</b> — ' + profEsc(whenStr);
    } else {
      summaryEl.innerHTML = 'Signed in as <b>' + profEsc(label) + '</b> — waiting for first backup…';
    }
  }

  if(!rows.length){
    listEl.innerHTML = '<div class="ssub" style="padding:4px 2px;">Nothing to back up yet.</div>';
    return;
  }

  listEl.innerHTML = rows.map(function(r){
    const icon = r.backedUp
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>';
    const statusText = r.backedUp ? 'Backed up' : 'Pending…';
    const statusColor = r.backedUp ? '#22c55e' : 'var(--dsub)';
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:2px 2px;">'+
      '<div style="display:flex;align-items:center;gap:9px;">' + icon +
        '<span style="font-size:13px;font-weight:700;color:var(--dtext);">' + profEsc(r.label) + '</span>' +
      '</div>' +
      '<span style="font-size:11px;font-weight:800;color:' + statusColor + ';">' + statusText + '</span>' +
    '</div>';
  }).join('');
}
window.renderProfileBackup = renderProfileBackup;

window.profileOpenNote=function(id){
  haptic('light');
  closeAll();
  switchTab('notes');
  setTimeout(function(){ if(typeof window.notesOpen==='function') window.notesOpen(id); },300);
};

window.profileOpenTask=function(id){
  haptic('light');
  closeAll();
  switchTab('home');
  setUpView('tasks');
  setTimeout(function(){ if(typeof window.taskOpen==='function') window.taskOpen(id); },300);
};

window.profileEditEvent=function(i){
  haptic('light');
  const ev=userEvents[i];
  if(!ev) return;
  // Store index so saveEv knows it's an edit
  window._profileEditIdx=i;
  // Open the add sheet pre-filled
  openSheet('add');
  setTimeout(()=>{
    document.getElementById('evT').value=ev.title||'';
    document.getElementById('evN').value=ev.note||'';
    setEventRange(ev.bsY,ev.bsM,ev.bsD,ev.endBsY||ev.bsY,ev.endBsM||ev.bsM,ev.endBsD||ev.bsD);
    // Pre-fill time fields
    const st=document.getElementById('evStartTime');
    const et=document.getElementById('evEndTime');
    if(st) st.value=ev.startTime||'';
    if(et) et.value=ev.endTime||'';
    onEvTimeChange();
    // Set colour picker
    const picker=document.getElementById('evColorPicker');
    if(picker){
      const target=picker.querySelector(`[data-color="${ev.color||'personal'}"]`);
      if(target && typeof selectEvCat==='function') selectEvCat(target);
    }
    // Update title to show it's an edit
    const titleEl=document.getElementById('addTitle');
    if(titleEl) titleEl.textContent='Edit Event';
  },80);
};

window.profileDeleteEvent=function(adMs){
  haptic('medium');
  const i=userEvents.findIndex(e=>e.adMs===adMs);
  if(i<0){ vikramToast('Event not found'); return; }
  const wasBirthday=!!userEvents[i].isBirthday;
  userEvents.splice(i,1);
  saveEvents();
  if(wasBirthday){
    try{
      const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
      delete p.bday;
      localStorage.setItem('vikram_profile',JSON.stringify(p));
      const disp=document.getElementById('profileBdayDisplay');
      if(disp) disp.textContent=bdayDisplayText(null);
    }catch(e){}
  }
  render();
  renderUpcoming();
  renderSelectedDay();
  renderProfileShareEvents();
  vikramToast('🗑️ Event deleted');
};

function showProfileShare(name,about){
  renderProfileShareEvents();
}


function applyProfile(name,about){
  const initials=profileInitials(name);
  const big=document.getElementById('profileAvatarBig');
  if(big && !big.dataset.hasPhoto) big.textContent=initials;
  const sm=document.getElementById('hdrProfileAvatar');
  if(sm && !sm.dataset.hasPhoto) sm.textContent=initials;
  const nd=document.getElementById('profileNameDisplay');
  if(nd) nd.textContent=name||'Your Name';
  // Keep settings row avatar + name in sync
  const svAv=document.getElementById('svProfileAvatar');
  if(svAv && !svAv.dataset.hasPhoto) svAv.textContent=initials;
  const svNm=document.getElementById('svProfileName');
  if(svNm) svNm.textContent=name||'Your Name';
  const ad=document.getElementById('profileAboutDisplay');
  if(ad) ad.textContent = about && about.trim() ? about : 'Add a status…';
}

// ── BIRTHDAY (Profile) ─────────────────────────────────────────
function bdayDisplayText(b){
  if(!b||!b.y) return '🎂 Add your birthday';
  return `🎂 ${MEN[b.m-1]} ${b.d}, ${b.y} BS`;
}

// ── Birthday info card update ──
function profileBdayCardUpdate(bday){
  const card = document.getElementById('profileBdayCard');
  const dispRow = document.getElementById('profileBdayRow');
  if(!card) return;
  if(!bday || !bday.y){
    card.style.display = 'none';
    if(dispRow) dispRow.style.display = 'flex';
    return;
  }
  // Hide the plain text row, show the card instead
  if(dispRow) dispRow.style.display = 'none';
  card.style.display = 'block';

  // Date string
  const dateEl = document.getElementById('profileBdayCardDate');
  if(dateEl) dateEl.textContent = `${MEN[bday.m-1]} ${bday.d}, ${bday.y} BS`;

  // Age calculation (reuse TODAYBS)
  const ageEl = document.getElementById('profileBdayCardAge');
  if(ageEl && typeof TODAYBS !== 'undefined'){
    try{
      const tY=TODAYBS.y, tM=TODAYBS.m, tD=TODAYBS.d;
      let ageY=tY-bday.y, ageM=tM-bday.m, ageD=tD-bday.d;
      if(ageD<0){
        ageM--;
        const prevM=bday.m===1?12:bday.m-1;
        const prevY=bday.m===1?bday.y-1:bday.y;
        ageD+=(typeof BS!=='undefined'&&BS[prevY]&&BS[prevY][prevM-1])?BS[prevY][prevM-1]:30;
      }
      if(ageM<0){ageY--;ageM+=12;}
      if(ageY>=0){
        const parts=[];
        if(ageY>0) parts.push(ageY+(ageY===1?' year':' years'));
        if(ageM>0) parts.push(ageM+(ageM===1?' month':' months'));
        if(ageD>0||parts.length===0) parts.push(ageD+(ageD===1?' day':' days'));
        ageEl.textContent = parts.join(', ') + ' old';
      } else {
        ageEl.textContent = '';
      }
    }catch(e){ ageEl.textContent=''; }
  }

  // Days until next birthday
  const nextEl = document.getElementById('profileBdayCardNext');
  if(nextEl && typeof TODAYBS !== 'undefined' && typeof bsToAd === 'function'){
    try{
      const tY=TODAYBS.y, tM=TODAYBS.m, tD=TODAYBS.d;
      let nbY=tY, nbM=bday.m, nbD=bday.d;
      const maxNbD=(typeof BS!=='undefined'&&BS[nbY]&&BS[nbY][nbM-1])?BS[nbY][nbM-1]:30;
      nbD=Math.min(bday.d,maxNbD);
      if(nbM<tM||(nbM===tM&&nbD<=tD)) nbY++;
      const maxNbD2=(typeof BS!=='undefined'&&BS[nbY]&&BS[nbY][nbM-1])?BS[nbY][nbM-1]:30;
      nbD=Math.min(bday.d,maxNbD2);
      const todayAD=bsToAd(tY,tM,tD);
      const nextAD=bsToAd(nbY,nbM,nbD);
      const daysUntil=Math.round((+nextAD-+todayAD)/86400000);
      if(daysUntil===0){
        nextEl.textContent='🎉 Happy Birthday today!';
        nextEl.style.color='#ec4899';
      } else {
        nextEl.textContent=`🎂 Next birthday in ${daysUntil} day${daysUntil===1?'':'s'} · ${MEN[nbM-1]} ${nbD}, ${nbY} BS`;
        nextEl.style.color='';
      }
    }catch(e){ nextEl.textContent=''; }
  }
}

function bdayYearOpts(sel){
  const minY=2055, maxY=TODAYBS.y;
  let h='';
  for(let y=maxY;y>=minY;y--) h+=`<option value="${y}"${y===sel?' selected':''}>${y}</option>`;
  return h;
}
function bdayMonthOpts(sel){
  return MEN.map((m,i)=>`<option value="${i+1}"${i+1===sel?' selected':''}>${m}</option>`).join('');
}
function bdayDayOpts(y,m,sel){
  const max=BS[y]?.[m-1]??30;
  let h='';
  for(let d=1;d<=max;d++) h+=`<option value="${d}"${d===sel?' selected':''}>${d}</option>`;
  return h;
}
window.refreshBdayDayOpts=function(){
  const yEl=document.getElementById('profileBdayY');
  const mEl=document.getElementById('profileBdayM');
  const dEl=document.getElementById('profileBdayD');
  if(!yEl||!mEl||!dEl) return;
  const y=+yEl.value, m=+mEl.value;
  const cur=+dEl.value||1;
  const max=BS[y]?.[m-1]??30;
  dEl.innerHTML=bdayDayOpts(y,m,Math.min(cur,max));
};

window.profileBdayStartEdit=function(){
  haptic('light');
  let p: any = {};
  try{ p=JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
  const b=p.bday||{};
  const defY=b.y||Math.max(2055,TODAYBS.y-25);
  const defM=b.m||1;
  const defD=b.d||1;
  const yEl=document.getElementById('profileBdayY');
  const mEl=document.getElementById('profileBdayM');
  const dEl=document.getElementById('profileBdayD');
  if(yEl) yEl.innerHTML=bdayYearOpts(defY);
  if(mEl) mEl.innerHTML=bdayMonthOpts(defM);
  if(dEl) dEl.innerHTML=bdayDayOpts(defY,defM,defD);
  const rmBtn=document.getElementById('profileBdayRemoveBtn');
  if(rmBtn) rmBtn.style.display=b.y?'block':'none';
  const dispRow=document.getElementById('profileBdayRow');
  const editRow=document.getElementById('profileBdayEditRow');
  if(dispRow) dispRow.style.display='none';
  if(editRow) editRow.style.display='flex';
};

window.profileCancelBdayEdit=function(){
  haptic('light');
  const editRow=document.getElementById('profileBdayEditRow');
  if(editRow) editRow.style.display='none';
  // Re-show card if birthday is set, otherwise show plain row
  let p: any = {};
  try{ p=JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
  if(p.bday && p.bday.y){
    profileBdayCardUpdate(p.bday);
  } else {
    const dispRow=document.getElementById('profileBdayRow');
    if(dispRow) dispRow.style.display='flex';
  }
};

window.profileSaveBday=function(){
  haptic('medium');
  const y=+((document.getElementById('profileBdayY')||{}) as any).value;
  const m=+((document.getElementById('profileBdayM')||{}) as any).value;
  const d=+((document.getElementById('profileBdayD')||{}) as any).value;
  if(!y||!m||!d) return;
  let p: any = {};
  try{ p=JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
  p.bday={y,m,d};
  try{ localStorage.setItem('vikram_profile',JSON.stringify(p)); }catch(e){}
  const disp=document.getElementById('profileBdayDisplay');
  if(disp) disp.textContent=bdayDisplayText(p.bday);
  const editRow=document.getElementById('profileBdayEditRow');
  if(editRow) editRow.style.display='none';
  profileBdayCardUpdate(p.bday);
  syncBirthdayEvent(p);
  if(typeof renderProfileBirthdays==='function') renderProfileBirthdays();
  vikramToast('🎂 Birthday saved!');
};

window.profileRemoveBday=function(){
  haptic('medium');
  let p: any = {};
  try{ p=JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
  delete p.bday;
  try{ localStorage.setItem('vikram_profile',JSON.stringify(p)); }catch(e){}
  const disp=document.getElementById('profileBdayDisplay');
  if(disp) disp.textContent=bdayDisplayText(null);
  const editRow=document.getElementById('profileBdayEditRow');
  if(editRow) editRow.style.display='none';
  profileBdayCardUpdate(null);
  syncBirthdayEvent(p);
  if(typeof renderProfileBirthdays==='function') renderProfileBirthdays();
  vikramToast('Birthday removed');
};

// Creates/updates a yearly-recurring "Birthday" entry inside userEvents so it
// automatically shows up on the month calendar, day view and Schedule view —
// anywhere userEvents is already rendered.
function syncBirthdayEvent(p){
  if(typeof userEvents==='undefined') return;
  for(let i=userEvents.length-1;i>=0;i--){
    if(userEvents[i].isBirthday) userEvents.splice(i,1);
  }
  if(p && p.bday && p.bday.y && p.bday.m && p.bday.d){
    const {y,m,d}=p.bday;
    const adDate=bsToAd(y,m,d);
    const mid=new Date(adDate.getFullYear(),adDate.getMonth(),adDate.getDate());
    const name=(p.name||'').trim();
    userEvents.push({
      title: name?`🎂 ${name}'s Birthday`:'🎂 My Birthday',
      bsY:y,bsM:m,bsD:d,
      endBsY:y,endBsM:m,endBsD:d,
      adMs:mid.getTime(),
      endAdMs:mid.getTime(),
      note:'',
      startTime:null,
      endTime:null,
      color:'birthday',
      repeatYearly:true,
      recur:null,
      isBirthday:true,
    });
  }
  userEvents.sort((a,b)=>a.adMs-b.adMs);
  if(typeof saveEvents==='function') saveEvents();
  if(typeof render==='function') render();
  if(typeof renderUpcoming==='function') renderUpcoming();
  if(typeof renderSelectedDay==='function') renderSelectedDay();
  if(typeof renderProfileShareEvents==='function') renderProfileShareEvents();
  if(typeof renderScheduleView==='function' && typeof scheduleActive!=='undefined' && scheduleActive) renderScheduleView();
}

// Apply any birthday profile that was loaded before this function was defined
if(window._pendingBdayProfile){
  syncBirthdayEvent(window._pendingBdayProfile);
  delete window._pendingBdayProfile;
}

window.profileStartEditAbout=function(){
  haptic('light');
  const dispRow=document.getElementById('profileAboutRow');
  const editRow=document.getElementById('profileAboutEditRow');
  if(dispRow) dispRow.style.display='none';
  if(editRow) editRow.style.display='flex';
  try{
    const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
    const ai=document.getElementById('profileAboutInput');
    if(ai) ai.value=p.about||'';
  }catch(e){}
  setTimeout(()=>document.getElementById('profileAboutInput')?.focus(),80);
};

window.profileSaveAbout=function(){
  haptic('medium');
  const about=(((document.getElementById('profileAboutInput')||{}) as any).value||'').trim();
  let p: any = {};
  try{ p=JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
  p.about=about;
  try{ localStorage.setItem('vikram_profile',JSON.stringify(p)); }catch(e){}
  applyProfile(p.name||'',about);
  const dispRow=document.getElementById('profileAboutRow');
  const editRow=document.getElementById('profileAboutEditRow');
  if(editRow) editRow.style.display='none';
  if(dispRow) dispRow.style.display='flex';
  vikramToast('✅ Status updated!');
};

// ── Profile photo upload ─────────────────────────────────────────
window.profilePhotoSelected = function(input){
  const file = input.files && input.files[0];
  input.value = '';
  if(!file) return;
  if(!file.type.startsWith('image/')){
    vikramToast('❌ Please choose an image file');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e){
    const img = new Image();
    img.onload = function(){
      const SIZE = 200;
      const canvas = document.createElement('canvas');
      canvas.width = SIZE; canvas.height = SIZE;
      const ctx = canvas.getContext('2d');
      // Cover-crop: scale so the shorter side fills SIZE, center the rest
      const scale = Math.max(SIZE/img.width, SIZE/img.height);
      const w = img.width*scale, h = img.height*scale;
      ctx.drawImage(img, (SIZE-w)/2, (SIZE-h)/2, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      let p: any = {};
      try{ p = JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(err){}
      p.photo = dataUrl;
      try{ localStorage.setItem('vikram_profile', JSON.stringify(p)); }catch(err){
        vikramToast('❌ Could not save photo — storage may be full');
        return;
      }
      applyProfilePhoto(dataUrl);
      haptic('success');
      vikramToast('✅ Profile photo updated!');
    };
    img.onerror = function(){ vikramToast('❌ Could not read image'); };
    img.src = e.target.result as string;
  };
  reader.readAsDataURL(file);
};

function applyProfilePhoto(dataUrl){
  ['profileAvatarBig','hdrProfileAvatar','svProfileAvatar'].forEach(function(id){
    const el = document.getElementById(id);
    if(!el) return;
    if(dataUrl){
      el.style.backgroundImage = 'url(' + dataUrl + ')';
      el.textContent = '';
      el.dataset.hasPhoto = '1';
    } else {
      el.style.backgroundImage = '';
      delete el.dataset.hasPhoto;
    }
  });
  const removeBtn = document.getElementById('profilePhotoRemoveBtn');
  if(removeBtn) removeBtn.style.display = dataUrl ? 'inline-block' : 'none';
}

window.profileRemovePhoto = function(){
  haptic('medium');
  let p: any = {};
  try{ p = JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
  delete p.photo;
  try{ localStorage.setItem('vikram_profile', JSON.stringify(p)); }catch(e){}
  applyProfilePhoto(null);
  // Restore initials
  try{
    const initials = profileInitials(p.name||'');
    const big = document.getElementById('profileAvatarBig');
    if(big) big.textContent = initials;
  }catch(e){}
  vikramToast('🗑️ Photo removed');
};

window.profileStartEdit=function(){
  haptic('light');
  const dispRow=document.getElementById('profileNameRow');
  const editRow=document.getElementById('profileNameEditRow');
  if(dispRow) dispRow.style.display='none';
  if(editRow) editRow.style.display='flex';
  try{
    const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
    const ni=document.getElementById('profileNameInput');
    if(ni) ni.value=p.name||'';
  }catch(e){}
  setTimeout(()=>document.getElementById('profileNameInput')?.focus(),80);
};

window.profileSaveName=function(){
  haptic('medium');
  const name=(((document.getElementById('profileNameInput')||{}) as any).value||'').trim();
  let p: any = {};
  try{ p=JSON.parse(localStorage.getItem('vikram_profile')||'{}'); }catch(e){}
  p.name=name;
  try{ localStorage.setItem('vikram_profile',JSON.stringify(p)); }catch(e){}
  applyProfile(name,p.about||'');
  const dispRow=document.getElementById('profileNameRow');
  const editRow=document.getElementById('profileNameEditRow');
  if(editRow) editRow.style.display='none';
  if(dispRow) dispRow.style.display='flex';
  syncBirthdayEvent(p);
  vikramToast('✅ Name saved!');
};

window.copyProfileLink=function(){
  haptic('light');
  try{
    const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
    const events=getShareableEvents();
    const url=buildProfileURL(p.name||'',p.about||'',events);
    navigator.clipboard?.writeText(url).then(()=>vikramToast('🔗 Link copied!')).catch(()=>vikramToast('Could not copy'));
  }catch(e){ vikramToast('Could not copy'); }
};

window.shareProfile=function(){
  haptic('medium');
  try{
    const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
    const events=getShareableEvents();
    const url=buildProfileURL(p.name||'',p.about||'',events);
    let text='📅 Check out my Vikram Calendar profile!\n';
    if(p.name) text+='👤 '+p.name+'\n';
    if(p.about) text+=p.about+'\n';
    if(events.length){
      text+='\n🗓️ My upcoming events:\n'+events.map(e=>`• ${e.t} — ${MEN[e.m-1]} ${e.d}, ${e.y} BS`).join('\n')+'\n';
    }
    text+='\nVikram Calendar: https://vikram-nep.pages.dev/\n'+url;
    if(navigator.share){
      navigator.share({title:'Vikram — '+(p.name||'Profile'),text,url}).catch(()=>{});
    } else {
      navigator.clipboard?.writeText(url).then(()=>vikramToast('🔗 Link copied!')).catch(()=>{});
    }
  }catch(e){}
};

// Pre-fill inputs + show QR when profile sheet opens
const _origOpenSheet=window.openSheet;
window.openSheet=function(t){
  if(t==='profile'){
    try{
      const p=JSON.parse(localStorage.getItem('vikram_profile')||'{}');
      applyProfile(p.name||'',p.about||'');
      const bdisp=document.getElementById('profileBdayDisplay');
      if(bdisp) bdisp.textContent=bdayDisplayText(p.bday);
      const bDispRow=document.getElementById('profileBdayRow');
      const bEditRow=document.getElementById('profileBdayEditRow');
      if(bEditRow) bEditRow.style.display='none';
      if(bDispRow) bDispRow.style.display='flex';
      // Slight delay so sheet is visible before events render
      setTimeout(()=>showProfileShare(p.name||'',p.about||''),80);
    }catch(e){}
    renderNotifHistory();
    markNotifsSeen();
    renderProfileNotes();
    renderProfileTasks();
  }
  if(typeof _origOpenSheet==='function') _origOpenSheet(t);
};


window.openHelpFeedback = function(e) {
  if (e) e.preventDefault();
  haptic('medium');
  const subject = encodeURIComponent('Vikram Calendar — Help & Feedback');
  const body = encodeURIComponent('Hi Ranjan,\n\n');
  const mailtoUrl = 'mailto:ranzansingh29@gmail.com?subject=' + subject + '&body=' + body;
  const gmailWebUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=ranzansingh29%40gmail.com&su=' + subject + '&body=' + body;

  // If a mail app actually opens, the page loses focus quickly — track that.
  let leftPage = false;
  const onBlur = () => { leftPage = true; };
  window.addEventListener('blur', onBlur, { once: true });

  window.location.href = mailtoUrl;

  // No mail-app handler grabbed it (common on desktop) — fall back to Gmail web compose.
  setTimeout(() => {
    window.removeEventListener('blur', onBlur);
    if (!leftPage && !document.hidden) {
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    }
  }, 600);
};

// ── INVITE FRIENDS ────────────────────────────────────────────
window.inviteFriends = function() {
  haptic('medium');
  const text = '📅 Check out Vikram — a beautiful Nepali (Bikram Sambat) calendar with holidays, events & more!\n\nhttps://vikram-nep.pages.dev/';
  if (navigator.share) {
    navigator.share({ title: 'Vikram Calendar', text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => {
      vikramToast('📋 Invite link copied!');
    }).catch(() => vikramToast('Share not supported on this device'));
  }
};

// ── 8. ACCESSIBILITY — aria-labels on icon buttons ────────────
(function addAriaLabels() {
  const map = [
    ['[onclick="prevMonth()"]', 'Previous month'],
    ['[onclick="nextMonth()"]', 'Next month'],
    ['[onclick="closeAll()"].mcls', 'Close'],
    ['[onclick="toggleDark()"]', 'Toggle dark mode'],
  ];
  document.addEventListener('DOMContentLoaded', function() {
    map.forEach(([sel, label]) => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', label);
      });
    });
  });
})();

