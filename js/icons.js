/* Local Lucide SVG subset. Local icons keep the PWA usable offline. */
(function () {
    const paths = {
        "car-front": '<path d="m21 16-3-8H6l-3 8v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1Z"/><path d="M6 18h.01M18 18h.01"/><path d="M8 22v-4M16 22v-4"/><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>',
        phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.62 2.65a2 2 0 0 1-.45 2.11L8.01 9.75a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.86.29 1.75.5 2.65.62A2 2 0 0 1 22 16.92Z"/>',
        "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z"/>',
        "scan-line": '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10"/>',
        "circle-check": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        "battery-charging": '<path d="M10 17h.01M10 7v4l3-3v4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M22 11v2"/>',
        "shopping-bag": '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
        utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2M5 2v20M7 2v20M15 2v20M15 2h2a4 4 0 0 1 0 8h-2"/>',
        gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
        "user-round": '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
        "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5M15 12H3"/>',
        "log-out": '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-4"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
        zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9-11A.5.5 0 0 1 13 1.7l-2 6.3H20a1 1 0 0 1 .78 1.63l-9 11A.5.5 0 0 1 11 20.3l2-6.3Z"/>'
    };

    window.renderIcons = function (root) {
        (root || document).querySelectorAll("[data-icon]").forEach((element) => {
            const icon = paths[element.dataset.icon];
            if (!icon) return;
            element.outerHTML = `<svg class="icon icon-${element.dataset.icon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>`;
        });
    };

    document.addEventListener("DOMContentLoaded", () => window.renderIcons());
}());
