"use strict";
// ══════════════════════════════════════════════════════════════════════════════
// 15. SWIPE BETWEEN BOTTOM-NAV TABS (Home ↔ My Cycle ↔ Tracker ↔ Profile)
// Swipe right = move to the previous tab.
// Swipe left  = move to the next tab (e.g. Home → My Cycle).
// ══════════════════════════════════════════════════════════════════════════════
(function () {
    const TAB_ORDER = ['home', 'cycle', 'counter', 'profile'];
    const DECIDE_PX = 10; // px of movement before we decide horizontal vs vertical
    const MIN_SWIPE_PX = 55; // minimum horizontal travel to count as a swipe
    const MAX_SWIPE_MS = 800;
    let tracking = false, decided = false, horizontal = false;
    let startX = 0, startY = 0, startT = 0;
    function anyOverlayOpen() {
        const ov = document.getElementById('ov');
        if (ov && ov.classList.contains('open'))
            return true;
        const fb = document.getElementById('fbOverlay');
        if (fb && getComputedStyle(fb).display !== 'none')
            return true;
        const wl = document.getElementById('wlOverlay');
        if (wl && getComputedStyle(wl).display !== 'none')
            return true;
        const onb = document.getElementById('onbOverlay');
        if (onb && onb.classList.contains('show'))
            return true;
        return false;
    }
    // Don't hijack the gesture if it starts inside something that already
    // scrolls/swipes horizontally on its own (chip rows, charts, task swipe, etc.)
    function startsInHorizontalScroller(el) {
        let node = el;
        while (node && node !== document.body) {
            if (node.classList && node.classList.contains('task-swipe-wrap'))
                return true;
            if (node.scrollWidth > node.clientWidth + 2) {
                const cs = getComputedStyle(node);
                if (cs.overflowX === 'auto' || cs.overflowX === 'scroll')
                    return true;
            }
            node = node.parentElement;
        }
        return false;
    }
    function swipeableTab() {
        return (typeof _currentTab !== 'undefined' && TAB_ORDER.indexOf(_currentTab) !== -1) ? _currentTab : null;
    }
    function onStart(e) {
        if (e.touches.length > 1 || anyOverlayOpen() || !swipeableTab() || startsInHorizontalScroller(e.target)) {
            tracking = false;
            return;
        }
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
        startT = Date.now();
        tracking = true;
        decided = false;
        horizontal = false;
    }
    function onMove(e) {
        if (!tracking || !e.touches.length)
            return;
        const t = e.touches[0];
        const dx = t.clientX - startX, dy = t.clientY - startY;
        if (!decided) {
            if (Math.abs(dx) < DECIDE_PX && Math.abs(dy) < DECIDE_PX)
                return;
            decided = true;
            horizontal = Math.abs(dx) > Math.abs(dy) * 1.2;
            if (!horizontal) {
                tracking = false;
                return;
            }
        }
        if (horizontal)
            e.preventDefault(); // stop page from scrolling sideways while we handle it
    }
    function onEnd(e) {
        if (!tracking || !decided || !horizontal) {
            tracking = false;
            return;
        }
        tracking = false;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX, dy = t.clientY - startY;
        const dt = Date.now() - startT;
        if (dt > MAX_SWIPE_MS || Math.abs(dx) < MIN_SWIPE_PX || Math.abs(dx) < Math.abs(dy))
            return;
        const tab = swipeableTab();
        if (!tab)
            return;
        const idx = TAB_ORDER.indexOf(tab);
        const nextIdx = dx > 0 ? idx - 1 : idx + 1; // swipe right → previous tab, swipe left → next tab
        if (nextIdx < 0 || nextIdx >= TAB_ORDER.length)
            return;
        if (typeof haptic === 'function')
            haptic('light');
        switchTab(TAB_ORDER[nextIdx]);
    }
    function onCancel() { tracking = false; }
    function attach() {
        const root = document.body;
        if (!root)
            return;
        root.addEventListener('touchstart', onStart, { passive: true });
        root.addEventListener('touchmove', onMove, { passive: false });
        root.addEventListener('touchend', onEnd, { passive: true });
        root.addEventListener('touchcancel', onCancel, { passive: true });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attach);
    }
    else {
        attach();
    }
})();
