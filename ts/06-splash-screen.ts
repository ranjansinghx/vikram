// Dismiss splash once page is fully loaded and first render settles
(function(){
  var splashDone = false;
  function hideSplash(){
    if(splashDone) return;
    splashDone = true;
    var el = document.getElementById('vikramSplash');
    if(!el) return;
    el.classList.add('fade-out');
    setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 600);
    setTimeout(function(){ if(typeof window.vikramMaybeStartOnboarding === 'function') window.vikramMaybeStartOnboarding(); }, 500);
  }
  // Wait for window load, THEN for web fonts to actually finish loading/swapping
  // (this is what prevents the flash-of-unstyled-text + layout jump: we keep the
  // splash up until Nunito/Noto Sans Devanagari have swapped in, not just until
  // the DOM/images are ready).
  function waitForFontsThenHide(extraDelay){
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function(){ setTimeout(hideSplash, extraDelay); }).catch(function(){ setTimeout(hideSplash, extraDelay); });
    } else {
      setTimeout(hideSplash, extraDelay);
    }
  }
  if(document.readyState === 'complete'){
    waitForFontsThenHide(160);
  } else {
    window.addEventListener('load', function(){
      waitForFontsThenHide(160);
    });
  }
  // Safety timeout: dismiss splash after max 1.2s regardless of network/font state,
  // so a slow/failed font load can never hang the splash.
  setTimeout(hideSplash, 1200);
  // Dismiss immediately on DOMContentLoaded ONLY if we're actually offline
  // (fonts won't load anyway, so no point waiting for them).
  document.addEventListener('DOMContentLoaded', function(){
    if (!navigator.onLine) setTimeout(hideSplash, 350);
  });
})();
