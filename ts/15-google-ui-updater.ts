// Global Google UI updater - safe to call anytime
window.updateGoogleUI = function(user){
  var btn  = document.getElementById('googleSignInBtn');
  var info = document.getElementById('googleUserInfo');
  if(!btn || !info) return;
  if(user && !user.isAnonymous && (user.displayName || user.email)){
    btn.style.display  = 'none';
    info.style.display = 'block';
    var av = document.getElementById('googleAvatar');
    if(av) av.src = user.photoURL || '';
    var dn = document.getElementById('googleDisplayName');
    if(dn) dn.textContent = user.displayName || '';
    var em = document.getElementById('googleEmail');
    if(em) em.textContent = user.email || '';
    var ha = document.getElementById('hdrProfileAvatar');
    if(ha && user.photoURL){
      ha.innerHTML = '';
      ha.style.background = 'none';
      var img = document.createElement('img');
      img.src = user.photoURL;
      img.style.cssText = 'width:16px;height:16px;border-radius:50%;object-fit:cover;';
      ha.appendChild(img);
    }
    // Auto-fill profile name if empty
    var ni = document.getElementById('profileNameInput');
    var nd = document.getElementById('profileNameDisplay');
    if(nd && (nd.textContent === 'Your Name' || !nd.textContent.trim())){
      try{
        var saved = JSON.parse(localStorage.getItem('vikram_profile')||'{}');
        if(!saved.name && user.displayName){
          if(ni) ni.value = user.displayName;
          if(typeof profileSaveName === 'function') profileSaveName();
        }
      }catch(e){}
    }
  } else {
    btn.style.display  = 'flex';
    info.style.display = 'none';
    var ha = document.getElementById('hdrProfileAvatar');
    if(ha){ ha.innerHTML = '?'; ha.style.background = ''; }
  }
  if(typeof renderProfileBackup === 'function') renderProfileBackup();
};
