"use strict";
// ── Always open on Home tab on page load ──
(function () {
    try {
        window._vikramRestoring = true;
        switchTab('home');
        window._vikramRestoring = false;
    }
    catch (e) {
        window._vikramRestoring = false;
    }
})();
