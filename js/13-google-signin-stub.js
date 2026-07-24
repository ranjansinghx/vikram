"use strict";
// Early stub: vikramSignIn waits for Firebase to be ready before signing in.
// This prevents "function not defined" errors if the button is clicked
// before the async Firebase SDK finishes loading.
(function () {
    var _fbReady = false;
    var _pendingSignIn = false;
    // Called by the "Continue with Google" button
    window.vikramSignIn = function () {
        if (typeof haptic === 'function')
            haptic('medium');
        // Must call signInWithPopup directly from user gesture (button click)
        if (window.firebase && firebase.auth) {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(function (r) {
                if (typeof window.updateGoogleUI === 'function')
                    window.updateGoogleUI(r.user);
                if (typeof vikramCloudSync !== 'undefined')
                    vikramCloudSync.startListening(r.user.uid);
                if (typeof vikramToast === 'function')
                    vikramToast('✅ Signed in as ' + (r.user.displayName || r.user.email));
            })
                .catch(function (e) {
                console.warn('signInWithPopup failed:', e.code, e.message);
                if (typeof vikramToast === 'function')
                    vikramToast('❌ Sign-in failed: ' + e.code);
            });
        }
        else {
            // Firebase not ready yet — show spinner and retry
            var btn = document.getElementById('googleSignInBtn');
            var orig = btn ? btn.innerHTML : '';
            if (btn)
                btn.innerHTML = '<span style="font-size:13px;opacity:.7;">Connecting…</span>';
            var attempts = 0;
            var retry = setInterval(function () {
                attempts++;
                if (window.firebase && firebase.auth) {
                    clearInterval(retry);
                    if (btn)
                        btn.innerHTML = orig;
                    // Do NOT auto-call vikramSignIn() here — this runs inside a timer,
                    // not a direct click, so browsers silently block the popup and it
                    // looks like sign-in "does nothing" on the first try. Firebase is
                    // ready now; just restore the button so the user's next real click
                    // opens the popup properly.
                    if (typeof vikramToast === 'function')
                        vikramToast('Ready — tap Continue with Google again');
                }
                else if (attempts > 20) {
                    clearInterval(retry);
                    if (btn)
                        btn.innerHTML = orig;
                    if (typeof vikramToast === 'function')
                        vikramToast('❌ Sign-in service unavailable. Try again.');
                }
            }, 500);
        }
    };
    // Signal that Firebase+Auth is ready; flush pending sign-in if queued
    window._vikramFirebaseReady = function () {
        _fbReady = true;
        // Re-render pair/cycle sync section now that Firebase is live (shows green dot)
        if (typeof window.renderPairSection === 'function') {
            try {
                window.renderPairSection();
            }
            catch (e) { }
        }
        // Push own cycle data now that Firebase is ready
        try {
            if (window._fbPair)
                window._fbPair.forceSync();
        }
        catch (e) { }
        // Flush any pending sign-in triggered before Firebase was ready
        if (_pendingSignIn) {
            _pendingSignIn = false;
            if (typeof window.signInWithGoogle === 'function')
                window.signInWithGoogle();
        }
    };
})();
