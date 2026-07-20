(function () {
    // Only load Firebase if we're online — it's not needed for core calendar function
    function loadFirebase() {
        var scripts = [
            'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js',
            'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js'
        ];
        var loaded = 0;
        function loadNext() {
            if (loaded >= scripts.length)
                return;
            var s = document.createElement('script');
            s.src = scripts[loaded++];
            s.async = true;
            s.onload = function () {
                if (loaded < scripts.length)
                    loadNext();
                else
                    initFirebaseApp();
            };
            s.onerror = function () { };
            document.head.appendChild(s);
        }
        loadNext();
    }
    function initFirebaseApp() {
        // Inline the Firebase init block here after SDK loads
        try {
            if (!window.firebase || !firebase.apps)
                return;
            // Only call initializeApp if not already initialized
            if (!firebase.apps.length) {
                firebase.initializeApp({
                    apiKey: "AIzaSyAFr9Amc7C3YKY27P_RdQ-3Rb-cH1ReFoc",
                    authDomain: "vikram-6e99b.firebaseapp.com",
                    databaseURL: "https://vikram-6e99b-default-rtdb.asia-southeast1.firebasedatabase.app",
                    projectId: "vikram-6e99b",
                    storageBucket: "vikram-6e99b.firebasestorage.app",
                    messagingSenderId: "198553115649",
                    appId: "1:198553115649:web:081e794d5b68810556f400"
                });
            }
            // Always wire pair sync — runs every time Firebase SDK finishes loading
            if (window._fbPair) {
                var p = window._fbPair;
                // forceSync: push own cycle data + subscribe to partner + messages if already paired
                p.forceSync();
                // Re-render pair section now Firebase is live (clears loading state + shows green dot)
                setTimeout(function () {
                    if (typeof window.renderPairSection === 'function')
                        window.renderPairSection();
                }, 0);
                // Also re-push after a short delay in case RTDB connection takes a moment to establish
                setTimeout(function () {
                    if (window._fbPair)
                        window._fbPair.forceSync();
                }, 2000);
            }
            // Wire up Google Auth after Firebase is ready
            if (firebase.auth) {
                function updateGoogleUI(user) {
                    var btn = document.getElementById('googleSignInBtn');
                    var info = document.getElementById('googleUserInfo');
                    if (!btn || !info)
                        return;
                    if (user && !user.isAnonymous) {
                        btn.style.display = 'none';
                        info.style.display = 'block';
                        var av = document.getElementById('googleAvatar');
                        if (av)
                            av.src = user.photoURL || '';
                        var dn = document.getElementById('googleDisplayName');
                        if (dn)
                            dn.textContent = user.displayName || '';
                        var em = document.getElementById('googleEmail');
                        if (em)
                            em.textContent = user.email || '';
                        var ha = document.getElementById('hdrProfileAvatar');
                        if (ha && user.photoURL) {
                            ha.innerHTML = '';
                            ha.style.background = 'none';
                            var img = document.createElement('img');
                            img.src = user.photoURL;
                            img.style.cssText = 'width:16px;height:16px;border-radius:50%;object-fit:cover;';
                            ha.appendChild(img);
                        }
                    }
                    else {
                        btn.style.display = 'flex';
                        info.style.display = 'none';
                        var ha = document.getElementById('hdrProfileAvatar');
                        if (ha) {
                            ha.innerHTML = '?';
                            ha.style.background = '';
                        }
                    }
                }
                window.updateGoogleUI = updateGoogleUI;
                window.signInWithGoogle = function () {
                    if (typeof haptic === 'function')
                        haptic('medium');
                    var provider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(provider)
                        .then(function (r) {
                        updateGoogleUI(r.user);
                        vikramCloudSync.startListening(r.user.uid);
                        if (typeof vikramToast === 'function')
                            vikramToast('✅ Signed in as ' + (r.user.displayName || r.user.email));
                    })
                        .catch(function (e) {
                        console.warn('signInWithPopup failed:', e.code, e.message);
                        if (typeof vikramToast === 'function')
                            vikramToast('❌ Sign-in failed: ' + e.code);
                    });
                };
                window.signOutGoogle = function () {
                    if (typeof haptic === 'function')
                        haptic('light');
                    firebase.auth().signOut().then(function () { updateGoogleUI(null); if (typeof vikramToast === 'function')
                        vikramToast('👋 Signed out'); });
                };
                // Set persistence to LOCAL so Google session survives refresh
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () { });
                // Single onAuthStateChanged — handles sign-in and refresh
                firebase.auth().onAuthStateChanged(function (user) {
                    updateGoogleUI(user);
                    if (typeof renderGcalCard === 'function')
                        renderGcalCard();
                    if (user && !user.isAnonymous) {
                        vikramCloudSync.startListening(user.uid);
                    }
                    else if (!user) {
                        vikramCloudSync.stopListening();
                    }
                });
            }
            // Signal to early stub that Firebase+Auth is fully wired
            if (typeof window._vikramFirebaseReady === 'function')
                window._vikramFirebaseReady();
        }
        catch (e) {
            console.warn('[Vikram] Firebase init failed:', e);
        }
    }
    // Load Firebase after page is interactive (doesn't block offline calendar)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(loadFirebase, 100);
    }
    else {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(loadFirebase, 100); });
    }
})();
