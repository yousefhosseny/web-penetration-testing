// ==UserScript==
// @name         GitHub RTL + Custom CSS
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  تحويل GitHub إلى RTL وإضافة تنسيقات مخصصة للألوان والخطوط
// @match        https://github.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const customCSS = `

        /* ✅ جعل النصوص في GitHub RTL */
        .markdown-body {
            direction: rtl !important;
            text-align: right !important;
            font-family: "Tajawal", Arial, sans-serif !important;
            line-height: 1.8 !important;
        }

        /* ✅ ضبط اتجاه الأكواد */
        .markdown-body pre,
        .markdown-body code {
            direction: ltr !important;
            text-align: left !important;
           color: #e70808 !important;
            padding: 5px;
            border-radius: 5px;
            font-weight: bold;
            font-family: monospace;
        }

        /* ✅ جعل النص العادي (Body) باللون الأسود */
        body {
            color: black !important;
        }

        /* ✅ تمييز العناوين */
        h1 { color: red !important; }
        h2 { color: orange !important; }
        h3 { color: rgb(0, 255, 13) !important; }
        h4 { color: rgb(0, 183, 255) !important; }

        /* ✅ تمييز الكلمات الإنجليزية داخل النصوص */
        p:not(:has(code)) span:lang(en),
        p:not(:has(code)) span[lang="en"],
        p:not(:has(code)) span:matches([lang|="en"]) {
            color: #00ff55 !important;
            font-weight: bold;
            animation: highlight-english 0.3s ease-in-out;
        }

        /* ✅ البحث عن الكلمات الإنجليزية داخل النص العربي */
        p:not(:has(code)) {
            unicode-bidi: plaintext;
        }

        /* ✅ تحسين شكل القوائم */
        .markdown-body ul {
            padding-right: 20px !important;
        }

        /* ✅ تحسين لون النص داخل الأقواس */
        p span.brackets {
            color: #00BFFF !important; /* أزرق سماوي */
            font-weight: bold;
        }

        @keyframes highlight-english {
            0% { color: black; }
            100% { color: #FFA500; } /* لون برتقالي */
        }
    `;

    function addCustomCSS() {
        if (!document.querySelector('#github-rtl-css')) {
            let style = document.createElement('style');
            style.id = 'github-rtl-css';
            style.textContent = customCSS;
            document.head.appendChild(style);
        }
    }

    addCustomCSS();

    let observer = new MutationObserver(addCustomCSS);
    observer.observe(document.body, { childList: true, subtree: true });

})();
