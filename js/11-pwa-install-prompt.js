(function () {
    const INSTALLED_KEY = 'vikram_installed';
    let deferredPrompt = null;
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    const isInStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    // Only skip if already installed — show every visit otherwise
    function shouldShow() {
        if (isInStandalone)
            return false;
        try {
            if (localStorage.getItem(INSTALLED_KEY) === '1')
                return false;
        }
        catch (e) { }
        return true;
    }
    function openCard() {
        const ov = document.getElementById('pwaInstallOverlay');
        const card = document.getElementById('pwaInstallCard');
        if (!ov || !card)
            return;
        if (isIOS) {
            const hint = document.getElementById('pwaIosHint');
            const btn = document.getElementById('pwaInstallBtn');
            if (hint)
                hint.style.display = 'block';
            if (btn)
                btn.style.display = 'none'; // Native install not available on iOS
        }
        ov.style.display = 'flex';
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    function closeCard(cb) {
        const card = document.getElementById('pwaInstallCard');
        if (!card) {
            if (cb)
                cb();
            return;
        }
        card.style.transform = 'translateY(100%)';
        setTimeout(function () {
            const ov = document.getElementById('pwaInstallOverlay');
            if (ov)
                ov.style.display = 'none';
            if (cb)
                cb();
        }, 400);
    }
    // "Not now" — just closes for this session, no cooldown saved
    window.pwaDismiss = function () {
        closeCard();
    };
    window.pwaInstall = function () {
        if (!deferredPrompt)
            return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (result) {
            deferredPrompt = null;
            if (result.outcome === 'accepted') {
                // Mark as installed so we never show the popup again
                try {
                    localStorage.setItem(INSTALLED_KEY, '1');
                }
                catch (e) { }
                closeCard();
            }
            else {
                // User declined the OS prompt — close card, will show again next visit
                closeCard();
            }
        });
    };
    // Tap overlay background to dismiss (session-only, same as "Not now")
    document.getElementById('pwaInstallOverlay').addEventListener('click', function (e) {
        if (e.target === this)
            window.pwaDismiss();
    });
    // Chrome / Android — capture the install event
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;
        if (shouldShow()) {
            setTimeout(openCard, 1800);
        }
    });
    // iOS Safari — no beforeinstallprompt, show manual instructions
    if (isIOS && shouldShow()) {
        setTimeout(openCard, 1800);
    }
})();
