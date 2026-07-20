// ── Casual deterrent: block right-click / view-source / devtools shortcuts ──
// Note: this only stops the everyday "right click → View Page Source" or
// Ctrl+U / F12 paths. It cannot stop anyone using browser dev tools proper,
// view-source:, or downloading the file directly — there is no way to truly
// hide client-side HTML/JS from the browser that renders it.
(function () {
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    document.addEventListener('keydown', function (e) {
        const k = e.key;
        const combo = (e.ctrlKey || e.metaKey);
        // Ctrl/Cmd+U (view source), F12, Ctrl+Shift+I/J/C (devtools)
        if ((combo && (k === 'u' || k === 'U')) ||
            k === 'F12' ||
            (combo && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].indexOf(k) !== -1)) {
            e.preventDefault();
        }
    });
})();
