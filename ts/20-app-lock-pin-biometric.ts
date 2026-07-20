// ══════════════════════════════════════════════════════════════════════════════
// APP / NOTES LOCK — PIN + Biometric
// ══════════════════════════════════════════════════════════════════════════════
(function(){

let lockState = { enabled:false, scope:'app', salt:'', hash:'', bioEnabled:false, credId:'' };
function lockLoadState(){
  try{
    const s = JSON.parse(localStorage.getItem('vikram_lock_v1')||'null');
    if(s && typeof s==='object'){
      if(typeof s.enabled==='boolean') lockState.enabled=s.enabled;
      if(typeof s.scope==='string')    lockState.scope=s.scope;
      if(typeof s.salt==='string')     lockState.salt=s.salt;
      if(typeof s.hash==='string')     lockState.hash=s.hash;
      if(typeof s.bioEnabled==='boolean') lockState.bioEnabled=s.bioEnabled;
      if(typeof s.credId==='string')   lockState.credId=s.credId;
    }
  }catch(e){}
}
function lockSaveState(){
  try{ localStorage.setItem('vikram_lock_v1', JSON.stringify(lockState)); }catch(e){}
}
lockLoadState();

function lockCryptoAvailable(){
  return !!(window.crypto && window.crypto.subtle && window.isSecureContext !== false);
}
function lockRandomSalt(){
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function lockHashPin(pin, salt){
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode('vikram-lock:'+salt+':'+pin));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
function lockBiometricAvailable(){
  return !!(window.PublicKeyCredential && navigator.credentials && window.isSecureContext !== false);
}

// ── Unlock screen (keypad) ──────────────────────────────────────────────────
let _lockEnteredPin = '';
let _lockPendingUnlockCallback = null;
let _lockSessionUnlocked = false;

function lockUpdateDots(pin, dotsId){
  document.querySelectorAll('#'+dotsId+' .lock-dot').forEach((d,i)=> d.classList.toggle('filled', i < pin.length));
}

window.lockKeyPress = function(d){
  if(_lockEnteredPin.length>=4) return;
  if(typeof haptic==='function') haptic('light');
  _lockEnteredPin += d;
  lockUpdateDots(_lockEnteredPin,'lockDots');
  if(_lockEnteredPin.length===4) setTimeout(lockVerifyEntered, 120);
};
window.lockKeyBackspace = function(){
  if(typeof haptic==='function') haptic('light');
  _lockEnteredPin = _lockEnteredPin.slice(0,-1);
  lockUpdateDots(_lockEnteredPin,'lockDots');
  const err=document.getElementById('lockError'); if(err) err.textContent='';
};
async function lockVerifyEntered(){
  const hash = await lockHashPin(_lockEnteredPin, lockState.salt);
  if(hash === lockState.hash){
    lockUnlockSuccess();
  } else {
    if(typeof haptic==='function') haptic('heavy');
    const err=document.getElementById('lockError'); if(err) err.textContent='Incorrect PIN';
    const dots = document.getElementById('lockDots');
    if(dots) dots.classList.add('shake');
    setTimeout(()=>{
      if(dots) dots.classList.remove('shake');
      _lockEnteredPin='';
      lockUpdateDots('','lockDots');
    }, 420);
  }
}
function lockUnlockSuccess(){
  _lockEnteredPin='';
  lockUpdateDots('','lockDots');
  const err=document.getElementById('lockError'); if(err) err.textContent='';
  document.getElementById('appLockScreen')?.classList.remove('on');
  _lockSessionUnlocked = true;
  const cb = _lockPendingUnlockCallback; _lockPendingUnlockCallback=null;
  if(typeof cb==='function') cb();
}
window.lockForgotPin = function(){
  if(confirm("If you can't remember your PIN, the only option is to turn App Lock off and set a new one later. Turn App Lock off now?")){
    lockState.enabled=false; lockState.hash=''; lockState.salt=''; lockState.bioEnabled=false; lockState.credId='';
    lockSaveState();
    document.getElementById('appLockScreen')?.classList.remove('on');
    _lockPendingUnlockCallback=null;
    _lockSessionUnlocked = true;
    lockRefreshSettingsUI();
  }
};
function lockShowAppScreen(cb?){
  const titleEl = document.getElementById('lockScreenTitle');
  const subEl = document.getElementById('lockScreenSub');
  if(titleEl) titleEl.textContent = 'Enter PIN';
  if(subEl) subEl.textContent = lockState.scope==='notes' ? 'Notes are locked' : 'Vikram is locked';
  const bioBtn = document.getElementById('lockBioBtn');
  if(bioBtn) bioBtn.style.display = (lockState.bioEnabled && lockBiometricAvailable()) ? 'flex' : 'none';
  _lockEnteredPin='';
  lockUpdateDots('','lockDots');
  const err=document.getElementById('lockError'); if(err) err.textContent='';
  _lockPendingUnlockCallback = cb || null;
  document.getElementById('appLockScreen')?.classList.add('on');
  if(lockState.bioEnabled && lockBiometricAvailable()){
    setTimeout(lockTryBiometric, 350);
  }
}

// ── Biometric (WebAuthn, local device-only gate) ────────────────────────────
async function lockRegisterBiometric(){
  if(!lockBiometricAvailable()) return false;
  try{
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const userId = crypto.getRandomValues(new Uint8Array(16));
    const cred = await navigator.credentials.create({
      publicKey:{
        challenge,
        rp:{ name:'Vikram' },
        user:{ id:userId, name:'vikram-user', displayName:'Vikram' },
        pubKeyCredParams:[{alg:-7,type:'public-key'},{alg:-257,type:'public-key'}],
        authenticatorSelection:{ authenticatorAttachment:'platform', userVerification:'required' },
        timeout:60000
      }
    });
    if(cred && cred.rawId){
      const bytes = new Uint8Array(cred.rawId);
      let bin=''; bytes.forEach(b=>bin+=String.fromCharCode(b));
      lockState.credId = btoa(bin);
      lockState.bioEnabled = true;
      lockSaveState();
      return true;
    }
  }catch(e){ console.warn('Biometric setup failed', e); }
  return false;
}
window.lockTryBiometric = async function(){
  if(!lockState.bioEnabled || !lockState.credId || !lockBiometricAvailable()) return;
  try{
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const bin = atob(lockState.credId);
    const idBytes = new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) idBytes[i]=bin.charCodeAt(i);
    const assertion = await navigator.credentials.get({
      publicKey:{ challenge, allowCredentials:[{ id:idBytes, type:'public-key' }], userVerification:'required', timeout:60000 }
    });
    if(assertion) lockUnlockSuccess();
  }catch(e){ /* user cancelled or failed — fall back to PIN silently */ }
};

// ── Settings UI wiring ───────────────────────────────────────────────────────
function lockRefreshSettingsUI(){
  document.getElementById('tgLockEnabled')?.classList.toggle('on', lockState.enabled);
  const hasPin = !!lockState.hash;
  const scopeRow = document.getElementById('lockScopeRow');
  const pinRow   = document.getElementById('lockPinRow');
  const bioRow   = document.getElementById('lockBioRow');
  if(scopeRow) scopeRow.style.display = lockState.enabled ? '' : 'none';
  if(pinRow)   pinRow.style.display   = lockState.enabled ? '' : 'none';
  if(bioRow)   bioRow.style.display   = (lockState.enabled && hasPin && lockBiometricAvailable()) ? '' : 'none';
  document.getElementById('lockScopeApp')?.classList.toggle('on', lockState.scope==='app');
  document.getElementById('lockScopeNotes')?.classList.toggle('on', lockState.scope==='notes');
  const pinLbl = document.getElementById('lockPinRowLbl');
  if(pinLbl) pinLbl.textContent = hasPin ? 'Change PIN' : 'Set PIN';
  const sub = document.getElementById('lockEnabledSub');
  if(sub) sub.textContent = lockState.scope==='notes' ? 'Require a PIN to open Notes' : 'Require a PIN to open Vikram';
  document.getElementById('tgLockBio')?.classList.toggle('on', lockState.bioEnabled);
}
window.lockToggleEnabled = function(btn){
  if(typeof haptic==='function') haptic('light');
  if(!lockCryptoAvailable()){ alert('App Lock needs a secure (https) connection and is not available here.'); return; }
  if(!lockState.enabled){
    if(!lockState.hash){
      lockOpenSetupSheet(function(){
        lockState.enabled = true;
        _lockSessionUnlocked = true;
        lockSaveState();
        lockRefreshSettingsUI();
      });
      return;
    }
    lockState.enabled = true;
    _lockSessionUnlocked = true;
  } else {
    lockState.enabled = false;
  }
  lockSaveState();
  lockRefreshSettingsUI();
};
window.lockSetScope = function(scope, btn){
  if(typeof haptic==='function') haptic('light');
  lockState.scope = scope;
  lockSaveState();
  lockRefreshSettingsUI();
};
window.lockToggleBiometric = function(btn){
  if(typeof haptic==='function') haptic('light');
  if(!lockState.bioEnabled){
    lockRegisterBiometric().then(ok=>{
      if(!ok) alert("Couldn't set up biometric unlock on this device.");
      lockRefreshSettingsUI();
    });
  } else {
    lockState.bioEnabled=false;
    lockState.credId='';
    lockSaveState();
    lockRefreshSettingsUI();
  }
};

// ── PIN setup sheet (used for both first-time set & change) ────────────────
let _lockSetupPin='', _lockSetupFirstPin='', _lockSetupStage='new', _lockSetupOnComplete=null;
window.lockOpenSetupSheet = function(onComplete){
  if(!lockCryptoAvailable()){ alert('Setting a PIN needs a secure (https) connection and is not available here.'); return; }
  _lockSetupOnComplete = (typeof onComplete==='function') ? onComplete : null;
  _lockSetupStage='new'; _lockSetupPin=''; _lockSetupFirstPin='';
  const t=document.getElementById('lockSetupTitle'); if(t) t.textContent = lockState.hash ? '🔢 Change PIN' : '🔢 Set a PIN';
  const s=document.getElementById('lockSetupSub'); if(s) s.textContent = 'Enter a new 4-digit PIN';
  const e=document.getElementById('lockSetupError'); if(e) e.textContent='';
  lockUpdateDots('','lockSetupDots');
  const sheet=document.getElementById('lockSetupSheet');
  const ov=document.getElementById('ov');
  sheet?.classList.add('open');
  if(ov){ ov.classList.add('open'); ov.dataset.sheetOrigin='lockSetupSheet'; }
};
window.lockCloseSetupSheet = function(){
  document.getElementById('lockSetupSheet')?.classList.remove('open');
  const ov=document.getElementById('ov');
  if(ov){ ov.classList.remove('open'); delete ov.dataset.sheetOrigin; }
  _lockSetupOnComplete=null;
};
window.lockSetupKeyPress = function(d){
  if(_lockSetupPin.length>=4) return;
  if(typeof haptic==='function') haptic('light');
  _lockSetupPin += d;
  lockUpdateDots(_lockSetupPin,'lockSetupDots');
  if(_lockSetupPin.length===4) setTimeout(lockSetupAdvance,120);
};
window.lockSetupBackspace = function(){
  if(typeof haptic==='function') haptic('light');
  _lockSetupPin = _lockSetupPin.slice(0,-1);
  lockUpdateDots(_lockSetupPin,'lockSetupDots');
  const e=document.getElementById('lockSetupError'); if(e) e.textContent='';
};
async function lockSetupAdvance(){
  if(_lockSetupStage==='new'){
    _lockSetupFirstPin=_lockSetupPin;
    _lockSetupPin='';
    _lockSetupStage='confirm';
    const s=document.getElementById('lockSetupSub'); if(s) s.textContent='Confirm your PIN';
    lockUpdateDots('','lockSetupDots');
  } else {
    if(_lockSetupPin === _lockSetupFirstPin){
      const salt = lockRandomSalt();
      const hash = await lockHashPin(_lockSetupPin, salt);
      lockState.salt=salt; lockState.hash=hash;
      lockSaveState();
      lockCloseSetupSheet();
      lockRefreshSettingsUI();
      const cb=_lockSetupOnComplete; _lockSetupOnComplete=null;
      if(typeof cb==='function') cb();
    } else {
      const e=document.getElementById('lockSetupError'); if(e) e.textContent="PINs didn't match — try again";
      if(typeof haptic==='function') haptic('heavy');
      const dots=document.getElementById('lockSetupDots');
      dots?.classList.add('shake');
      setTimeout(()=>{
        dots?.classList.remove('shake');
        _lockSetupPin=''; _lockSetupFirstPin=''; _lockSetupStage='new';
        lockUpdateDots('','lockSetupDots');
        const s=document.getElementById('lockSetupSub'); if(s) s.textContent='Enter a new 4-digit PIN';
      }, 500);
    }
  }
}

// ── Hook: lock the whole app on load ────────────────────────────────────────
function lockCheckOnLoad(){
  lockRefreshSettingsUI();
  if(lockState.enabled && lockState.scope==='app' && lockState.hash){
    lockShowAppScreen();
  } else {
    _lockSessionUnlocked = true;
  }
}
setTimeout(lockCheckOnLoad, 80);

// ── Hook: gate the Notes tab when scope is 'notes' ──────────────────────────
(function(){
  const _baseForLock = window.switchTab;
  window.switchTab = function(tab){
    if(tab==='notes' && lockState.enabled && lockState.scope==='notes' && lockState.hash && !_lockSessionUnlocked){
      lockShowAppScreen(function(){
        if(typeof _baseForLock==='function') _baseForLock.call(this, tab);
      });
      return;
    }
    if(typeof _baseForLock==='function') _baseForLock.apply(this, arguments);
  };
})();

// ── Re-lock after the app has been backgrounded for a while ─────────────────
let _lockHiddenAt = 0;
const LOCK_GRACE_MS = 15000;
document.addEventListener('visibilitychange', function(){
  if(!lockState.enabled || !lockState.hash) return;
  if(document.hidden){
    _lockHiddenAt = Date.now();
  } else if(_lockHiddenAt && (Date.now()-_lockHiddenAt) > LOCK_GRACE_MS){
    _lockSessionUnlocked = false;
    if(lockState.scope==='app'){
      lockShowAppScreen();
    } else if(lockState.scope==='notes' && typeof _currentTab!=='undefined' && _currentTab==='notes'){
      lockShowAppScreen();
    }
  }
});

})();
