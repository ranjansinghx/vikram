// ── GOOGLE AUTH — now handled inside async Firebase loader above ────────────
(function () {
    // This block intentionally left minimal; auth wiring moved to loadFirebase()
    if (false) { // placeholder to avoid removing the script tag structure
        if (!window.firebase || !firebase.auth)
            return;
        function updateGoogleUI(user) {
            const btn = document.getElementById('googleSignInBtn');
            const info = document.getElementById('googleUserInfo');
            if (!btn || !info)
                return;
            if (user && !user.isAnonymous) {
                btn.style.display = 'none';
                info.style.display = 'block';
                const av = document.getElementById('googleAvatar');
                if (av)
                    av.src = user.photoURL || '';
                const dn = document.getElementById('googleDisplayName');
                if (dn)
                    dn.textContent = user.displayName || '';
                const em = document.getElementById('googleEmail');
                if (em)
                    em.textContent = user.email || '';
                // Auto-fill profile name if empty
                const ni = document.getElementById('profileNameInput');
                const nd = document.getElementById('profileNameDisplay');
                if (nd && (nd.textContent === 'Your Name' || !nd.textContent.trim())) {
                    const saved = JSON.parse(localStorage.getItem('vikram_profile') || '{}');
                    if (!saved.name && user.displayName) {
                        if (ni)
                            ni.value = user.displayName;
                        if (typeof profileSaveName === 'function')
                            profileSaveName();
                    }
                }
                // Update header avatar
                const ha = document.getElementById('hdrProfileAvatar');
                if (ha && user.photoURL) {
                    ha.innerHTML = '';
                    ha.style.background = 'none';
                    const img = document.createElement('img');
                    img.src = user.photoURL;
                    img.style.cssText = 'width:16px;height:16px;border-radius:50%;object-fit:cover;';
                    ha.appendChild(img);
                }
            }
            else {
                btn.style.display = 'flex';
                info.style.display = 'none';
                const ha = document.getElementById('hdrProfileAvatar');
                if (ha) {
                    ha.innerHTML = '?';
                    ha.style.background = '';
                }
            }
        }
        window.signInWithGoogle = function () {
            if (typeof haptic === 'function')
                haptic('medium');
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                updateGoogleUI(result.user);
                if (typeof vikramToast === 'function')
                    vikramToast('✅ Signed in as ' + (result.user.displayName || result.user.email));
            })
                .catch(err => {
                console.error('[Vikram] Google sign-in error:', err);
                if (typeof vikramToast === 'function')
                    vikramToast('❌ Sign-in failed. Try again.');
            });
        };
        window.signOutGoogle = function () {
            if (typeof haptic === 'function')
                haptic('light');
            firebase.auth().signOut().then(() => {
                updateGoogleUI(null);
                if (typeof vikramToast === 'function')
                    vikramToast('👋 Signed out');
            });
        };
    } // end if(false)
})();
