"use strict";
(function () {
    try {
        const autoOn = localStorage.getItem('vikram_theme_auto') === '1';
        let dark;
        if (autoOn) {
            // Sunrise/sunset auto theme — compute quickly so there's no flash of the wrong theme.
            dark = (function () {
                try {
                    const lat = 27.7172, lon = 85.3240, rad = Math.PI / 180;
                    const now = new Date();
                    const start = new Date(now.getFullYear(), 0, 0);
                    const dayOfYear = Math.floor((+now - +start) / 86400000);
                    const fracYear = 2 * Math.PI / 365 * (dayOfYear - 1);
                    const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(fracYear) - 0.032077 * Math.sin(fracYear) - 0.014615 * Math.cos(2 * fracYear) - 0.040849 * Math.sin(2 * fracYear));
                    const decl = 0.006918 - 0.399912 * Math.cos(fracYear) + 0.070257 * Math.sin(fracYear) - 0.006758 * Math.cos(2 * fracYear) + 0.000907 * Math.sin(2 * fracYear) - 0.002697 * Math.cos(3 * fracYear) + 0.00148 * Math.sin(3 * fracYear);
                    const zenith = 90.833 * rad, latRad = lat * rad;
                    const cosH = Math.max(-1, Math.min(1, (Math.cos(zenith) / (Math.cos(latRad) * Math.cos(decl))) - Math.tan(latRad) * Math.tan(decl)));
                    const haDeg = Math.acos(cosH) / rad;
                    let sunriseMin = 720 - 4 * (lon + haDeg) - eqTime, sunsetMin = 720 - 4 * (lon - haDeg) - eqTime;
                    sunriseMin = ((sunriseMin + 5 * 60 + 45) % 1440 + 1440) % 1440;
                    sunsetMin = ((sunsetMin + 5 * 60 + 45) % 1440 + 1440) % 1440;
                    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kathmandu', hour12: false, hour: '2-digit', minute: '2-digit' }).formatToParts(now);
                    const nowMin = (+p.find(x => x.type === 'hour').value) * 60 + (+p.find(x => x.type === 'minute').value);
                    return !(nowMin >= sunriseMin && nowMin < sunsetMin);
                }
                catch (e) {
                    return true;
                }
            })();
        }
        else {
            const stored = localStorage.getItem('vikram_theme');
            // If user has a stored preference, use it; otherwise check system preference
            if (stored === 'dark' || stored === 'light') {
                dark = stored === 'dark';
            }
            else {
                // Default to dark mode (original default), but respect system preference if possible
                dark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : true;
            }
        }
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta)
            meta.setAttribute('content', dark ? '#0d0f16' : '#ECEEF8');
    }
    catch (e) { }
})();
