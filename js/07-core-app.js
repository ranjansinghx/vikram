// ══ SAFE LOCALSTORAGE (falls back to in-memory if blocked, e.g. sandboxed previews) ══
// @ts-ignore -- intentionally shadows the DOM lib's ambient `localStorage` with a safe fallback
let localStorage;
try {
    localStorage = window.localStorage;
    const __t = '__vikram_ls_test__';
    localStorage.setItem(__t, '1');
    localStorage.removeItem(__t);
}
catch (e) {
    const __mem = {};
    // @ts-ignore -- fallback in-memory shim only needs getItem/setItem/removeItem, matching original JS
    localStorage = {
        getItem: (k) => (k in __mem ? __mem[k] : null),
        setItem: (k, v) => { __mem[k] = String(v); },
        removeItem: (k) => { delete __mem[k]; },
    };
}
// ══ BS DATA ══
const BS = {
    2055: [31, 31, 32, 31, 32, 31, 30, 29, 30, 29, 30, 30],
    2056: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2058: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 29],
    2059: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2060: [31, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    2061: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2062: [31, 31, 32, 32, 30, 31, 30, 29, 29, 30, 29, 31],
    2063: [31, 31, 32, 31, 31, 30, 30, 29, 29, 30, 29, 31],
    2064: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2065: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2066: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
    2068: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 29, 31],
    2069: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2070: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2071: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2072: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2073: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2074: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2075: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2077: [31, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2078: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2080: [31, 31, 32, 31, 31, 31, 30, 30, 29, 29, 30, 31],
    2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2084: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2085: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2086: [31, 32, 31, 32, 31, 30, 29, 30, 30, 29, 30, 30],
};
// ══ HOLIDAYS (BS key → {np, en}) ══
// Nepal Public Holidays + Hindu & Regional Festivals 2083 BS
// BS[2083] = [31,31,32,31,31,31,30,29,30,29,30,30]
const HOL = {
    // ── Baishakh ────────────────────────────────────────────────────────────
    "2083-1-1": { np: "नया वर्ष", en: "Nepali New Year" },
    "2083-1-18": { np: "बुद्ध जयन्ती", en: "Buddha Jayanti" },
    // ── Jestha ──────────────────────────────────────────────────────────────
    "2083-2-15": { np: "गणतन्त्र दिवस", en: "Republic Day" },
    // ── Bhadra ──────────────────────────────────────────────────────────────
    "2083-5-12": { np: "जनै पूर्णिमा", en: "Janai Purnima" },
    "2083-5-13": { np: "गाईजात्रा", en: "Gaijatra" },
    "2083-5-19": { np: "कृष्ण जन्माष्टमी", en: "Krishna Janmashtami" },
    "2083-5-29": { np: "हरितालिका तीज", en: "Haritalika Teej" },
    // ── Ashwin ──────────────────────────────────────────────────────────────
    "2083-6-3": { np: "संविधान दिवस", en: "Constitution Day" },
    "2083-6-9": { np: "इन्द्र जात्रा", en: "Indra Jatra" },
    "2083-6-25": { np: "घटस्थापना", en: "Ghatasthapana (Dashain)" },
    "2083-6-31": { np: "फूलपाती", en: "Fulpati (Dashain)" },
    // ── Kartik ──────────────────────────────────────────────────────────────
    "2083-7-1": { np: "महाअष्टमी", en: "Maha Ashtami (Dashain)" },
    "2083-7-2": { np: "दशैं छुट्टी", en: "Dashain Holiday" },
    "2083-7-3": { np: "महानवमी", en: "Maha Nawami (Dashain)" },
    "2083-7-4": { np: "विजया दशमी", en: "Bijaya Dashami ✦" },
    "2083-7-6": { np: "दशैं छुट्टी", en: "Dashain Holiday" },
    "2083-7-22": { np: "लक्ष्मी पूजा", en: "Laxmi Puja (Tihar)" },
    "2083-7-23": { np: "तिहार छुट्टी", en: "Tihar Holiday" },
    "2083-7-24": { np: "म्ह पूजा", en: "Mha Puja (Tihar)" },
    "2083-7-25": { np: "भाई टीका", en: "Bhai Tika (Tihar) ✦" },
    "2083-7-29": { np: "छठ पर्व", en: "Chhath Parva" },
    // ── Mangsir ─────────────────────────────────────────────────────────────
    "2083-8-8": { np: "गुरु नानक जयन्ती", en: "Guru Nanak Jayanti" },
    "2083-8-18": { np: "उदौली पर्व", en: "Udhauli Parva" },
    // ── Poush ───────────────────────────────────────────────────────────────
    "2083-9-9": { np: "योमरी पुन्ही", en: "Yomari Punhi" },
    "2083-9-10": { np: "क्रिसमस", en: "Christmas Day" },
    "2083-9-15": { np: "तमु ल्होसार", en: "Tamu Lhosar" },
    "2083-9-27": { np: "पृथ्वी जयन्ती", en: "Prithvi Jayanti" },
    // ── Magh ────────────────────────────────────────────────────────────────
    "2083-10-1": { np: "माघे सक्रान्ति", en: "Maghe Sankranti" },
    "2083-10-16": { np: "शहीद दिवस", en: "Martyrs' Day" },
    "2083-10-24": { np: "सोनाम ल्होसार", en: "Sonam Lhosar" },
    "2083-10-28": { np: "सरस्वती पूजा", en: "Saraswati Puja" },
    // ── Falgun ──────────────────────────────────────────────────────────────
    "2083-11-7": { np: "प्रजातन्त्र दिवस", en: "Democracy Day" },
    "2083-11-22": { np: "महाशिवरात्री", en: "Maha Shivaratri" },
    "2083-11-24": { np: "अन्तर्राष्ट्रिय महिला दिवस", en: "International Women's Day" },
    "2083-11-25": { np: "ग्याल्पो ल्होसार", en: "Gyalpo Lhosar" },
    // ── Chaitra ─────────────────────────────────────────────────────────────
    "2083-12-7": { np: "होली", en: "Holi" },
    "2083-12-8": { np: "होली (तराई)", en: "Holi (Terai)" },
    "2083-12-23": { np: "घोडे जात्रा", en: "Ghode Jatra" },
    // ══ 2084 ══════════════════════════════════════════════════════════════════
    "2084-1-1": { np: "नया वर्ष", en: "Nepali New Year 2084" },
    "2084-1-15": { np: "बुद्ध जयन्ती", en: "Buddha Jayanti" },
    "2084-2-15": { np: "गणतन्त्र दिवस", en: "Republic Day" },
    "2084-5-11": { np: "जनै पूर्णिमा", en: "Janai Purnima" },
    "2084-5-12": { np: "गाईजात्रा", en: "Gaijatra" },
    "2084-5-22": { np: "कृष्ण जन्माष्टमी", en: "Krishna Janmashtami" },
    "2084-5-28": { np: "हरितालिका तीज", en: "Haritalika Teej" },
    "2084-6-3": { np: "संविधान दिवस", en: "Constitution Day" },
    "2084-6-29": { np: "घटस्थापना", en: "Ghatasthapana (Dashain)" },
    "2084-7-5": { np: "फूलपाती", en: "Fulpati (Dashain)" },
    "2084-7-6": { np: "महाअष्टमी", en: "Maha Ashtami (Dashain)" },
    "2084-7-7": { np: "महानवमी", en: "Maha Nawami (Dashain)" },
    "2084-7-8": { np: "विजया दशमी", en: "Bijaya Dashami ✦" },
    "2084-7-10": { np: "दशैं छुट्टी", en: "Dashain Holiday" },
    "2084-7-22": { np: "लक्ष्मी पूजा", en: "Laxmi Puja (Tihar)" },
    "2084-7-23": { np: "तिहार छुट्टी", en: "Tihar Holiday" },
    "2084-7-24": { np: "म्ह पूजा", en: "Mha Puja (Tihar)" },
    "2084-7-25": { np: "भाई टीका", en: "Bhai Tika (Tihar) ✦" },
    "2084-7-29": { np: "छठ पर्व", en: "Chhath Parva" },
    "2084-8-6": { np: "गुरु नानक जयन्ती", en: "Guru Nanak Jayanti" },
    "2084-8-18": { np: "उदौली पर्व", en: "Udhauli Parva" },
    "2084-9-14": { np: "योमरी पुन्ही", en: "Yomari Punhi" },
    "2084-9-10": { np: "क्रिसमस", en: "Christmas Day" },
    "2084-9-15": { np: "तमु ल्होसार", en: "Tamu Lhosar" },
    "2084-9-27": { np: "पृथ्वी जयन्ती", en: "Prithvi Jayanti" },
    "2084-10-1": { np: "माघे सक्रान्ति", en: "Maghe Sankranti" },
    "2084-10-16": { np: "शहीद दिवस", en: "Martyrs' Day" },
    "2084-10-23": { np: "सोनाम ल्होसार", en: "Sonam Lhosar" },
    "2084-10-27": { np: "सरस्वती पूजा", en: "Saraswati Puja" },
    "2084-11-7": { np: "प्रजातन्त्र दिवस", en: "Democracy Day" },
    "2084-11-20": { np: "महाशिवरात्री", en: "Maha Shivaratri" },
    "2084-11-24": { np: "अन्तर्राष्ट्रिय महिला दिवस", en: "International Women's Day" },
    "2084-11-25": { np: "ग्याल्पो ल्होसार", en: "Gyalpo Lhosar" },
    "2084-12-6": { np: "होली", en: "Holi" },
    "2084-12-7": { np: "होली (तराई)", en: "Holi (Terai)" },
    "2084-12-23": { np: "घोडे जात्रा", en: "Ghode Jatra" },
    // ══ 2085 ══════════════════════════════════════════════════════════════════
    "2085-1-1": { np: "नया वर्ष", en: "Nepali New Year 2085" },
    "2085-1-4": { np: "बुद्ध जयन्ती", en: "Buddha Jayanti" },
    "2085-2-15": { np: "गणतन्त्र दिवस", en: "Republic Day" },
    "2085-5-1": { np: "जनै पूर्णिमा", en: "Janai Purnima" },
    "2085-5-2": { np: "गाईजात्रा", en: "Gaijatra" },
    "2085-5-11": { np: "कृष्ण जन्माष्टमी", en: "Krishna Janmashtami" },
    "2085-5-17": { np: "हरितालिका तीज", en: "Haritalika Teej" },
    "2085-6-3": { np: "संविधान दिवस", en: "Constitution Day" },
    "2085-6-18": { np: "घटस्थापना", en: "Ghatasthapana (Dashain)" },
    "2085-6-24": { np: "फूलपाती", en: "Fulpati (Dashain)" },
    "2085-6-25": { np: "महाअष्टमी", en: "Maha Ashtami (Dashain)" },
    "2085-6-26": { np: "महानवमी", en: "Maha Nawami (Dashain)" },
    "2085-6-27": { np: "विजया दशमी", en: "Bijaya Dashami ✦" },
    "2085-6-29": { np: "दशैं छुट्टी", en: "Dashain Holiday" },
    "2085-7-12": { np: "लक्ष्मी पूजा", en: "Laxmi Puja (Tihar)" },
    "2085-7-13": { np: "तिहार छुट्टी", en: "Tihar Holiday" },
    "2085-7-14": { np: "म्ह पूजा", en: "Mha Puja (Tihar)" },
    "2085-7-15": { np: "भाई टीका", en: "Bhai Tika (Tihar) ✦" },
    "2085-7-19": { np: "छठ पर्व", en: "Chhath Parva" },
    "2085-8-6": { np: "गुरु नानक जयन्ती", en: "Guru Nanak Jayanti" },
    "2085-8-18": { np: "उदौली पर्व", en: "Udhauli Parva" },
    "2085-9-1": { np: "योमरी पुन्ही", en: "Yomari Punhi" },
    "2085-9-10": { np: "क्रिसमस", en: "Christmas Day" },
    "2085-9-15": { np: "तमु ल्होसार", en: "Tamu Lhosar" },
    "2085-9-27": { np: "पृथ्वी जयन्ती", en: "Prithvi Jayanti" },
    "2085-10-1": { np: "माघे सक्रान्ति", en: "Maghe Sankranti" },
    "2085-10-16": { np: "शहीद दिवस", en: "Martyrs' Day" },
    "2085-10-13": { np: "सोनाम ल्होसार", en: "Sonam Lhosar" },
    "2085-10-17": { np: "सरस्वती पूजा", en: "Saraswati Puja" },
    "2085-11-7": { np: "प्रजातन्त्र दिवस", en: "Democracy Day" },
    "2085-11-10": { np: "महाशिवरात्री", en: "Maha Shivaratri" },
    "2085-11-24": { np: "अन्तर्राष्ट्रिय महिला दिवस", en: "International Women's Day" },
    "2085-11-14": { np: "ग्याल्पो ल्होसार", en: "Gyalpo Lhosar" },
    "2085-12-24": { np: "होली", en: "Holi" },
    "2085-12-25": { np: "होली (तराई)", en: "Holi (Terai)" },
    "2085-12-12": { np: "घोडे जात्रा", en: "Ghode Jatra" },
    // ══ 2086 ══════════════════════════════════════════════════════════════════
    "2086-1-1": { np: "नया वर्ष", en: "Nepali New Year 2086" },
    "2086-1-22": { np: "बुद्ध जयन्ती", en: "Buddha Jayanti" },
    "2086-2-15": { np: "गणतन्त्र दिवस", en: "Republic Day" },
    "2086-5-19": { np: "जनै पूर्णिमा", en: "Janai Purnima" },
    "2086-5-20": { np: "गाईजात्रा", en: "Gaijatra" },
    "2086-5-29": { np: "कृष्ण जन्माष्टमी", en: "Krishna Janmashtami" },
    "2086-6-5": { np: "हरितालिका तीज", en: "Haritalika Teej" },
    "2086-6-3": { np: "संविधान दिवस", en: "Constitution Day" },
    "2086-7-6": { np: "घटस्थापना", en: "Ghatasthapana (Dashain)" },
    "2086-7-12": { np: "फूलपाती", en: "Fulpati (Dashain)" },
    "2086-7-13": { np: "महाअष्टमी", en: "Maha Ashtami (Dashain)" },
    "2086-7-14": { np: "महानवमी", en: "Maha Nawami (Dashain)" },
    "2086-7-15": { np: "विजया दशमी", en: "Bijaya Dashami ✦" },
    "2086-7-17": { np: "दशैं छुट्टी", en: "Dashain Holiday" },
    "2086-7-30": { np: "लक्ष्मी पूजा", en: "Laxmi Puja (Tihar)" },
    "2086-8-1": { np: "तिहार छुट्टी", en: "Tihar Holiday" },
    "2086-8-2": { np: "म्ह पूजा", en: "Mha Puja (Tihar)" },
    "2086-8-3": { np: "भाई टीका", en: "Bhai Tika (Tihar) ✦" },
    "2086-8-7": { np: "छठ पर्व", en: "Chhath Parva" },
    "2086-8-16": { np: "गुरु नानक जयन्ती", en: "Guru Nanak Jayanti" },
    "2086-8-18": { np: "उदौली पर्व", en: "Udhauli Parva" },
    "2086-9-19": { np: "योमरी पुन्ही", en: "Yomari Punhi" },
    "2086-9-10": { np: "क्रिसमस", en: "Christmas Day" },
    "2086-9-15": { np: "तमु ल्होसार", en: "Tamu Lhosar" },
    "2086-9-27": { np: "पृथ्वी जयन्ती", en: "Prithvi Jayanti" },
    "2086-10-1": { np: "माघे सक्रान्ति", en: "Maghe Sankranti" },
    "2086-10-16": { np: "शहीद दिवस", en: "Martyrs' Day" },
    "2086-10-3": { np: "सोनाम ल्होसार", en: "Sonam Lhosar" },
    "2086-10-6": { np: "सरस्वती पूजा", en: "Saraswati Puja" },
    "2086-11-7": { np: "प्रजातन्त्र दिवस", en: "Democracy Day" },
    "2086-11-28": { np: "महाशिवरात्री", en: "Maha Shivaratri" },
    "2086-11-24": { np: "अन्तर्राष्ट्रिय महिला दिवस", en: "International Women's Day" },
    "2086-11-3": { np: "ग्याल्पो ल्होसार", en: "Gyalpo Lhosar" },
    "2086-12-13": { np: "होली", en: "Holi" },
    "2086-12-14": { np: "होली (तराई)", en: "Holi (Terai)" },
    "2086-12-1": { np: "घोडे जात्रा", en: "Ghode Jatra" },
};
// ══ OBSERVANCES (religious & cultural events — not public holidays) ══
// Shown as blue event chips/dots, no red cell highlight
const OBS = {
    // ── Baishakh ────────────────────────────────────────────────────────────
    "2083-1-4": { np: "मातातीर्थ औंसी", en: "Matatirtha Aunshi (Mother's Day)" },
    "2083-1-6": { np: "परशुराम जयन्ती", en: "Parashu Ram Jayanti" },
    "2083-1-7": { np: "अक्षय तृतीया", en: "Akshaya Tritiya" },
    "2083-1-11": { np: "लोकतन्त्र दिवस", en: "Loktantra Diwas" },
    // ── Jestha ──────────────────────────────────────────────────────────────
    "2083-2-17": { np: "अनला पुन्ही", en: "Anala Punhi" },
    // ── Ashadh ──────────────────────────────────────────────────────────────
    "2083-3-15": { np: "मास्त पूर्णिमा", en: "Masta Purnima / Dahi Chiura Khane Din" },
    "2083-3-32": { np: "जगन्नाथ रथयात्रा", en: "Jagannath Rath Yatra" },
    // ── Shrawan ─────────────────────────────────────────────────────────────
    "2083-4-1": { np: "साउने सक्रान्ति", en: "Saune Sankranti" },
    "2083-4-13": { np: "गुरु पूर्णिमा", en: "Guru Purnima" },
    "2083-4-26": { np: "घण्टाकर्ण चतुर्दशी", en: "Ghantakarna Chaturdashi" },
    // ── 2084 Observances ────────────────────────────────────────────────────
    "2084-1-4": { np: "मातातीर्थ औंसी", en: "Matatirtha Aunshi (Mother's Day)" },
    "2084-1-6": { np: "परशुराम जयन्ती", en: "Parashu Ram Jayanti" },
    "2084-1-7": { np: "अक्षय तृतीया", en: "Akshaya Tritiya" },
    "2084-1-11": { np: "लोकतन्त्र दिवस", en: "Loktantra Diwas" },
    "2084-2-17": { np: "अनला पुन्ही", en: "Anala Punhi" },
    "2084-3-15": { np: "मास्त पूर्णिमा", en: "Masta Purnima / Dahi Chiura Khane Din" },
    "2084-3-31": { np: "जगन्नाथ रथयात्रा", en: "Jagannath Rath Yatra" },
    "2084-4-1": { np: "साउने सक्रान्ति", en: "Saune Sankranti" },
    "2084-4-13": { np: "गुरु पूर्णिमा", en: "Guru Purnima" },
    "2084-4-26": { np: "घण्टाकर्ण चतुर्दशी", en: "Ghantakarna Chaturdashi" },
    // ── 2085 Observances ────────────────────────────────────────────────────
    "2085-1-15": { np: "मातातीर्थ औंसी", en: "Matatirtha Aunshi (Mother's Day)" },
    "2085-1-6": { np: "परशुराम जयन्ती", en: "Parashu Ram Jayanti" },
    "2085-1-8": { np: "अक्षय तृतीया", en: "Akshaya Tritiya" },
    "2085-1-11": { np: "लोकतन्त्र दिवस", en: "Loktantra Diwas" },
    "2085-2-17": { np: "अनला पुन्ही", en: "Anala Punhi" },
    "2085-3-15": { np: "मास्त पूर्णिमा", en: "Masta Purnima / Dahi Chiura Khane Din" },
    "2085-3-31": { np: "जगन्नाथ रथयात्रा", en: "Jagannath Rath Yatra" },
    "2085-4-1": { np: "साउने सक्रान्ति", en: "Saune Sankranti" },
    "2085-4-2": { np: "गुरु पूर्णिमा", en: "Guru Purnima" },
    "2085-4-25": { np: "घण्टाकर्ण चतुर्दशी", en: "Ghantakarna Chaturdashi" },
    // ── 2086 Observances ────────────────────────────────────────────────────
    "2086-1-4": { np: "मातातीर्थ औंसी", en: "Matatirtha Aunshi (Mother's Day)" },
    "2086-1-6": { np: "परशुराम जयन्ती", en: "Parashu Ram Jayanti" },
    "2086-1-27": { np: "अक्षय तृतीया", en: "Akshaya Tritiya" },
    "2086-1-11": { np: "लोकतन्त्र दिवस", en: "Loktantra Diwas" },
    "2086-2-17": { np: "अनला पुन्ही", en: "Anala Punhi" },
    "2086-3-15": { np: "मास्त पूर्णिमा", en: "Masta Purnima / Dahi Chiura Khane Din" },
    "2086-3-20": { np: "जगन्नाथ रथयात्रा", en: "Jagannath Rath Yatra" },
    "2086-4-1": { np: "साउने सक्रान्ति", en: "Saune Sankranti" },
    "2086-4-21": { np: "गुरु पूर्णिमा", en: "Guru Purnima" },
    "2086-4-14": { np: "घण्टाकर्ण चतुर्दशी", en: "Ghantakarna Chaturdashi" },
};
// ══ STRINGS ══
// ── Hamro Patro upcoming feed ──
const HAMRO_UPCOMING_URL = 'https://english.hamropatro.com/';
const HAMRO_MONTHS = {
    baishakh: 1, jestha: 2, aashadha: 3, ashadh: 3, shrawan: 4, shravan: 4,
    bhadra: 5, aswin: 6, ashwin: 6, asoj: 6, ashoj: 6, kartik: 7, mangsir: 8,
    poush: 9, paush: 9, magh: 10, falgun: 11, chaitra: 12
};
let hamroUpcomingCache = null;
let hamroUpcomingLoadPromise = null;
function hamroParseCurrentYear(text) {
    const m = text.match(/\b\d{1,2}\s+[A-Za-z]+\s+(\d{4}),/);
    const y = m ? parseInt(m[1], 10) : NaN;
    return Number.isFinite(y) ? y : (TODAYBS && TODAYBS.y ? TODAYBS.y : 2083);
}
function hamroCleanUpcomingTitle(title) {
    return (title || '')
        .replace(/\s+(today|tomorrow|\d+\s+days?\s+remaning|\d+\s+day\s+remaning)$/i, '')
        .replace(/\s+/g, ' ')
        .trim();
}
function hamroParseUpcomingFeed(text) {
    const lines = (text || '')
        .replace(/\r/g, '\n')
        .split('\n')
        .map(s => s.replace(/\u00a0/g, ' ').trim())
        .filter(Boolean);
    const start = lines.findIndex(l => /upcomming events|upcoming events/i.test(l));
    if (start < 0)
        return [];
    const end = lines.findIndex((l, i) => i > start && /my notes/i.test(l));
    const section = lines.slice(start + 1, end > start ? end : lines.length);
    const year = hamroParseCurrentYear(text);
    const out = [];
    let pendingDay = null;
    for (const line of section) {
        const dayMatch = line.match(/^\*?\s*(\d{1,2})\s+([A-Za-z]+)\s*$/);
        if (dayMatch) {
            const day = parseInt(dayMatch[1], 10);
            const monthKey = (dayMatch[2] || '').toLowerCase();
            const month = HAMRO_MONTHS[monthKey];
            pendingDay = month ? { y: year, m: month, d: day } : null;
            continue;
        }
        if (!pendingDay)
            continue;
        const title = hamroCleanUpcomingTitle(line);
        if (!title)
            continue;
        out.push({ ...pendingDay, title });
        pendingDay = null;
    }
    return out;
}
function hamroLoadUpcomingFeed() {
    if (Array.isArray(hamroUpcomingCache))
        return Promise.resolve(hamroUpcomingCache);
    if (hamroUpcomingLoadPromise)
        return hamroUpcomingLoadPromise;
    hamroUpcomingLoadPromise = (async () => {
        try {
            const res = await fetch(HAMRO_UPCOMING_URL, { cache: 'no-store' });
            if (!res.ok)
                throw new Error(`hamropatro_http_${res.status}`);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const text = (doc.body && doc.body.innerText) ? doc.body.innerText : html;
            const items = hamroParseUpcomingFeed(text);
            hamroUpcomingCache = items;
            return items;
        }
        catch (err) {
            console.warn('[Vikram] Hamro Patro feed unavailable:', err);
            hamroUpcomingCache = [];
            return [];
        }
        finally {
            hamroUpcomingLoadPromise = null;
        }
    })();
    return hamroUpcomingLoadPromise;
}
const MEN = ['Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
const MNE = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'];
const DEN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const DNE = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
const WDEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WDNE = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];
const ADMEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const NED = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const TNAMES = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima', 'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'];
const TPAKSHA = ['Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Shukla', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna', 'Krishna'];
// ══ STATE ══
// UTC noon – safe anchor: .getDate() gives the same calendar day in every timezone (UTC-12 to UTC+14)
const REF = new Date(Date.UTC(2026, 3, 14, 12, 0, 0)); // Baishakh 1, 2083 = Apr 14, 2026
let cfg = { greg: true, hol: true, holn: true, fd: 1, tithi: false, weekNum: false, compact: false, hlwknd: true,
    focusMode: false, simpleMode: false, accentColor: 'indigo', defReminder: 30, showCountBadge: true, showPinnedNote: false,
    cycleTopView: 'hero' };
(function loadCfg() {
    try {
        const stored = JSON.parse(localStorage.getItem('vikram_cfg') || 'null');
        if (stored && typeof stored === 'object') {
            if (typeof stored.greg === 'boolean')
                cfg.greg = stored.greg;
            if (typeof stored.hol === 'boolean')
                cfg.hol = stored.hol;
            if (typeof stored.holn === 'boolean')
                cfg.holn = stored.holn;
            if (typeof stored.fd === 'number')
                cfg.fd = stored.fd;
            if (typeof stored.tithi === 'boolean')
                cfg.tithi = stored.tithi;
            if (typeof stored.weekNum === 'boolean')
                cfg.weekNum = stored.weekNum;
            if (typeof stored.compact === 'boolean')
                cfg.compact = stored.compact;
            if (typeof stored.hlwknd === 'boolean')
                cfg.hlwknd = stored.hlwknd;
            if (typeof stored.focusMode === 'boolean')
                cfg.focusMode = stored.focusMode;
            if (typeof stored.simpleMode === 'boolean')
                cfg.simpleMode = stored.simpleMode;
            if (typeof stored.accentColor === 'string')
                cfg.accentColor = stored.accentColor;
            if (typeof stored.defReminder === 'number')
                cfg.defReminder = stored.defReminder;
            if (typeof stored.showCountBadge === 'boolean')
                cfg.showCountBadge = stored.showCountBadge;
            if (typeof stored.showPinnedNote === 'boolean')
                cfg.showPinnedNote = stored.showPinnedNote;
            if (typeof stored.cycleTopView === 'string')
                cfg.cycleTopView = stored.cycleTopView;
        }
    }
    catch (e) { }
})();
// Sync with the theme already applied by the early inline script
let lang = 'en', dark = (function () {
    try {
        if (localStorage.getItem('vikram_theme_auto') === '1') {
            // Match whatever the early inline <head> script already painted, to avoid
            // a mismatch flash once the rest of the app's JS takes over rendering.
            return document.documentElement.getAttribute('data-theme') === 'dark';
        }
        const stored = localStorage.getItem('vikram_theme');
        if (stored === 'dark')
            return true;
        if (stored === 'light')
            return false;
        // No stored preference — default to dark
        return true;
    }
    catch (e) {
        return true;
    }
})();
let vY = 2083, vM = 1; // will be overwritten with today's BS month below
// Nepal Standard Time = UTC+5:45.
// Use the Intl API to read the *calendar date* in Kathmandu right now,
// then return UTC noon for that date so all msDay() calls are exact integers.
function getKathmanduToday() {
    try {
        const p = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kathmandu',
            year: 'numeric', month: '2-digit', day: '2-digit'
        }).formatToParts(new Date());
        return new Date(Date.UTC(+p.find(x => x.type === 'year').value, +p.find(x => x.type === 'month').value - 1, +p.find(x => x.type === 'day').value, 12, 0, 0 // noon UTC – avoids local-time date rollover in any timezone
        ));
    }
    catch (e) {
        // Fallback: manually offset to NST then snap to UTC noon
        const nst = new Date(Date.now() + 345 * 60000);
        return new Date(Date.UTC(nst.getUTCFullYear(), nst.getUTCMonth(), nst.getUTCDate(), 12, 0, 0));
    }
}
let TODAY = getKathmanduToday();
let TODAYBS = adToBs(TODAY);
// ── Keep TODAY in sync with the real calendar date ──────────────────────────
// TODAY/TODAYBS are computed once at load. If the app/tab is left open across
// midnight (or backgrounded and reopened the next day), they'd otherwise stay
// stuck on the old date — which is why "Upcoming" could keep showing a past
// day as if it were today. This re-checks and refreshes when the date rolls
// over: on an interval, and immediately whenever the tab regains focus.
function checkDateRollover() {
    try {
        const fresh = getKathmanduToday();
        if (fresh.getTime() === TODAY.getTime())
            return;
        const oldTODAYBS = TODAYBS;
        const wasOnToday = selectedDay && selectedDay.y === oldTODAYBS.y && selectedDay.m === oldTODAYBS.m && selectedDay.d === oldTODAYBS.d;
        const wasViewingTodayMonth = vY === oldTODAYBS.y && vM === oldTODAYBS.m;
        TODAY = fresh;
        TODAYBS = adToBs(TODAY);
        if (wasOnToday)
            selectedDay = { y: TODAYBS.y, m: TODAYBS.m, d: TODAYBS.d };
        if (wasViewingTodayMonth) {
            vY = TODAYBS.y;
            vM = TODAYBS.m;
        }
        if (typeof render === 'function')
            render();
        if (typeof renderUpcoming === 'function')
            renderUpcoming();
        if (typeof renderSelectedDay === 'function')
            renderSelectedDay();
        if (typeof bdtRender === 'function')
            bdtRender();
        if (typeof window.dcRender === 'function')
            window.dcRender();
    }
    catch (e) { }
}
setInterval(checkDateRollover, 60000);
document.addEventListener('visibilitychange', function () { if (!document.hidden)
    checkDateRollover(); });
window.addEventListener('focus', checkDateRollover);
window.addEventListener('pageshow', checkDateRollover);
// Initialise view to today's BS month/year (not a hardcoded value)
vY = TODAYBS.y;
vM = TODAYBS.m;
let selectedDay = { y: TODAYBS.y, m: TODAYBS.m, d: TODAYBS.d };
// ══ DATE UTILS ══
function msDay(a, b) { return Math.round((b - a) / 86400000); }
function bsStart(bY, bM) {
    let y = 2083, m = 1, days = 0;
    if (bY > y || (bY === y && bM > m)) {
        while (!(y === bY && m === bM)) {
            days += BS[y][m - 1];
            m++;
            if (m > 12) {
                m = 1;
                y++;
            }
        }
        return new Date(REF.getTime() + days * 86400000);
    }
    else if (bY < y || (bY === y && bM < m)) {
        while (!(y === bY && m === bM)) {
            m--;
            if (m < 1) {
                m = 12;
                y--;
            }
            days += BS[y][m - 1];
        }
        return new Date(REF.getTime() - days * 86400000);
    }
    return new Date(REF.getTime());
}
function adToBs(ad) {
    let diff = msDay(REF, ad), y = 2083, m = 1;
    if (diff >= 0) {
        let r = diff;
        while (BS[y] && r >= BS[y][m - 1]) {
            r -= BS[y][m - 1];
            m++;
            if (m > 12) {
                m = 1;
                y++;
            }
        }
        return { y, m, d: r + 1 };
    }
    else {
        let r = -diff - 1;
        m--;
        if (m < 1) {
            m = 12;
            y--;
        }
        while (BS[y] && r >= BS[y][m - 1]) {
            r -= BS[y][m - 1];
            m--;
            if (m < 1) {
                m = 12;
                y--;
            }
        }
        return { y, m, d: BS[y][m - 1] - r };
    }
}
function bsToAd(bY, bM, bD) {
    return new Date(bsStart(bY, bM).getTime() + (bD - 1) * 86400000);
}
function ns(n) { return (lang === 'ne' || document.body.classList.contains('simple-calendar-mode')) ? String(n).split('').map(c => NED[+c] ?? c).join('') : String(n); }
// ══ TITHI ══
function getTithi(ad) {
    const y = ad.getFullYear(), mo = ad.getMonth() + 1, d = ad.getDate();
    let yr = y, mn = mo;
    if (mn <= 2) {
        yr--;
        mn += 12;
    }
    const A = Math.floor(yr / 100), B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (yr + 4716)) + Math.floor(30.6001 * (mn + 1)) + d + B - 1524.5;
    const T = (JD - 2451545) / 36525;
    let sL = ((280.46646 + 36000.76983 * T) % 360 + 360) % 360;
    const sM = ((357.52911 + 35999.05029 * T) % 360 + 360) % 360, smr = sM * Math.PI / 180;
    const sE = 1.914602 * Math.sin(smr) + 0.019993 * Math.sin(2 * smr) + 0.000289 * Math.sin(3 * smr);
    const sT = sL + sE;
    let mL = ((218.3164477 + 481267.88123421 * T) % 360 + 360) % 360;
    const mM = ((134.9633964 + 477198.8676313 * T) % 360 + 360) % 360;
    const mD = ((297.8501921 + 445267.1114034 * T) % 360 + 360) % 360;
    const mmr = mM * Math.PI / 180, mdr = mD * Math.PI / 180;
    const mT = mL + 6.289 * Math.sin(mmr) - 1.274 * Math.sin(2 * mdr - mmr) + 0.658 * Math.sin(2 * mdr) - 0.214 * Math.sin(2 * mmr);
    const elong = ((mT - sT) % 360 + 360) % 360;
    return Math.min(Math.max(Math.floor(elong / 12) + 1, 1), 30);
}
// ══ HOLIDAY HELPERS ══
function hk(y, m, d) { return `${y}-${m}-${d}`; }
function getH(y, m, d) { return cfg.hol ? HOL[hk(y, m, d)] : null; }
function getObs(y, m, d) { return OBS[hk(y, m, d)] || null; }
// ══ PANCHANG: approximate sunrise/sunset + Rahu Kaal (for Kathmandu, 27.7N 85.3E, NPT UTC+5:45) ══
function _panchangSunTimes(ad) {
    const lat = 27.7172, lon = 85.3240;
    const rad = Math.PI / 180;
    const start = new Date(ad.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((+ad - +start) / 86400000);
    const fracYear = 2 * Math.PI / 365 * (dayOfYear - 1);
    const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(fracYear) - 0.032077 * Math.sin(fracYear)
        - 0.014615 * Math.cos(2 * fracYear) - 0.040849 * Math.sin(2 * fracYear));
    const decl = 0.006918 - 0.399912 * Math.cos(fracYear) + 0.070257 * Math.sin(fracYear)
        - 0.006758 * Math.cos(2 * fracYear) + 0.000907 * Math.sin(2 * fracYear)
        - 0.002697 * Math.cos(3 * fracYear) + 0.00148 * Math.sin(3 * fracYear);
    const zenith = 90.833 * rad;
    const latRad = lat * rad;
    const cosH = Math.max(-1, Math.min(1, (Math.cos(zenith) / (Math.cos(latRad) * Math.cos(decl))) - Math.tan(latRad) * Math.tan(decl)));
    const haDeg = Math.acos(cosH) / rad;
    const sunriseUTCmin = 720 - 4 * (lon + haDeg) - eqTime;
    const sunsetUTCmin = 720 - 4 * (lon - haDeg) - eqTime;
    return { sunriseMin: sunriseUTCmin, sunsetMin: sunsetUTCmin };
}
function _panchangMinsToTime(mins) {
    let t = mins + (5 * 60 + 45); // UTC -> NPT (UTC+5:45)
    t = ((t % 1440) + 1440) % 1440;
    const h = Math.floor(t / 60), m = Math.round(t % 60);
    const hh = ((h + 11) % 12) + 1;
    const ap = h < 12 ? 'AM' : 'PM';
    return hh + ':' + String(m).padStart(2, '0') + ' ' + ap;
}
function getPanchangText(ad) {
    try {
        const st = _panchangSunTimes(ad);
        const segMap = { 0: 8, 1: 2, 2: 7, 3: 5, 4: 6, 5: 4, 6: 3 }; // weekday -> 1/8th segment of daylight
        const seg = segMap[ad.getDay()];
        const dayLen = (st.sunsetMin - st.sunriseMin) / 8;
        const rkStart = st.sunriseMin + (seg - 1) * dayLen;
        const rkEnd = rkStart + dayLen;
        return `${_panchangMinsToTime(st.sunriseMin)} – ${_panchangMinsToTime(st.sunsetMin)} · Rahu Kaal ${_panchangMinsToTime(rkStart)}–${_panchangMinsToTime(rkEnd)}`;
    }
    catch (e) {
        return '';
    }
}
// ══ RENDER ══
function render() {
    const _langEff = document.body.classList.contains('simple-calendar-mode') ? 'ne' : lang;
    const mn = _langEff === 'ne' ? MNE[vM - 1] : MEN[vM - 1], yr = ns(vY);
    const monthStart = bsToAd(vY, vM, 1);
    const monthEnd = bsToAd(vY, vM, BS[vY]?.[vM - 1] ?? 30);
    const monthRange = `${ADMEN[monthStart.getMonth()]} ${monthStart.getFullYear()} – ${ADMEN[monthEnd.getMonth()]} ${monthEnd.getFullYear()}`;
    document.getElementById('navlbl').textContent = `${mn} ${yr}`;
    document.getElementById('navsub').textContent = monthRange;
    // Day headers ordered by firstDay
    const dn = _langEff === 'ne' ? DNE : DEN;
    const ord = [];
    for (let i = 0; i < 7; i++)
        ord.push((cfg.fd + i) % 7);
    document.getElementById('dhdrs').innerHTML = ord.map(i => `<div class="dhdr${i === 0 || i === 6 ? ' wk' : ''}">${dn[i]}</div>`).join('');
    const PAKSHA_SHORT = ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K'];
    const TITHI_NUM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 'A'];
    function getWeekNum(ad) {
        const d = new Date(Date.UTC(ad.getFullYear(), ad.getMonth(), ad.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
    }
    function getTithiLabel(ad) {
        try {
            const ti = getTithi(ad) - 1;
            if (ti >= 0 && ti < 30)
                return PAKSHA_SHORT[ti] + TITHI_NUM[ti];
        }
        catch (e) { }
        return '';
    }
    let html = '';
    let col = 0;
    const sAD = bsStart(vY, vM);
    const sDow = (sAD.getDay() - cfg.fd + 7) % 7;
    const dims = BS[vY]?.[vM - 1] ?? 30;
    const pM = vM === 1 ? 12 : vM - 1, pY = vM === 1 ? vY - 1 : vY, pDims = BS[pY]?.[pM - 1] ?? 30;
    const nM = vM === 12 ? 1 : vM + 1, nY = vM === 12 ? vY + 1 : vY;
    let tot = sDow + dims;
    if (tot % 7 !== 0)
        tot += 7 - tot % 7;
    for (let i = 0; i < tot; i++) {
        const gridCol = (cfg.fd + (i % 7)) % 7, wk = cfg.hlwknd && (gridCol === 0 || gridCol === 6);
        const isRowStart = (i % 7 === 0);
        if (i < sDow) {
            const nd = pDims - sDow + i + 1, ad = new Date(sAD);
            ad.setDate(ad.getDate() - (sDow - i));
            const wnHtml = (cfg.weekNum && isRowStart) ? `<div class="cell-weeknum">W${getWeekNum(ad)}</div>` : '';
            const tiHtml = cfg.tithi ? `<div class="cell-tithi">${getTithiLabel(ad)}</div>` : '';
            html += `<div class="cell dim${wk ? ' wk' : ''}" onclick="openDay(${pY},${pM},${nd})">
        ${wnHtml}<div class="ndate">${ns(nd)}</div>${cfg.greg ? `<div class="gdate">${ad.getDate()}</div>` : ''}${tiHtml}
        <div class="hdot"></div></div>`;
        }
        else if (i >= sDow + dims) {
            const nd = i - sDow - dims + 1, ad = new Date(sAD);
            ad.setDate(ad.getDate() + (i - sDow));
            const wnHtml = (cfg.weekNum && isRowStart) ? `<div class="cell-weeknum">W${getWeekNum(ad)}</div>` : '';
            const tiHtml = cfg.tithi ? `<div class="cell-tithi">${getTithiLabel(ad)}</div>` : '';
            html += `<div class="cell dim${wk ? ' wk' : ''}" onclick="openDay(${nY},${nM},${nd})">
        ${wnHtml}<div class="ndate">${ns(nd)}</div>${cfg.greg ? `<div class="gdate">${ad.getDate()}</div>` : ''}${tiHtml}
        <div class="hdot"></div></div>`;
        }
        else {
            const nd = i - sDow + 1, ad = new Date(sAD);
            ad.setDate(ad.getDate() + nd - 1);
            const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
            const isT = vY === TODAYBS.y && vM === TODAYBS.m && nd === TODAYBS.d;
            const isSel = selectedDay.y === vY && selectedDay.m === vM && selectedDay.d === nd;
            const h = getH(vY, vM, nd), isH = !!h;
            const obs = getObs(vY, vM, nd);
            let cls = 'cell active';
            if (isT)
                cls += ' today';
            else if (isH)
                cls += ' hol';
            else if (wk)
                cls += ' wk';
            // Build inline chips: holiday, observance, events, cycle
            const chipArr = [];
            if (h && cfg.holn) {
                const hn = lang === 'ne' ? h.np : h.en;
                chipArr.push(`<div class="cell-chip cell-chip-hol">${cfg.compact ? '' : hn}</div>`);
            }
            if (obs) {
                const on = lang === 'ne' ? obs.np : obs.en;
                chipArr.push(`<div class="cell-chip cell-chip-evt">${cfg.compact ? '' : on}</div>`);
            }
            userEvents.forEach(ev => {
                if (eventMatchesDate(ev, vY, vM, nd))
                    chipArr.push(`<div class="cell-chip cell-chip-evt" style="color:${safeCss(({ 'personal': '#3B82F6', 'work': '#10b981', 'cultural': '#f59e0b', 'health': '#ef4444', 'birthday': '#ec4899' })[ev.color], '#3B82F6')};">${cfg.compact ? '' : esc(ev.title) || 'Event'}</div>`);
            });
            if (cycleData.lastPeriodStart) {
                const cl2 = cycleData.cycleLength || 28, pl2 = cycleData.periodLength || 5;
                const ovD2 = cl2 - 14, fertD2 = Math.max(1, ovD2 - 5);
                const baseD = new Date(cycleData.lastPeriodStart);
                baseD.setHours(0, 0, 0, 0);
                const dayN = Math.floor((+adMid - +baseD) / 86400000);
                const dayInCyc = ((dayN % cl2) + cl2) % cl2 + 1;
                if (dayInCyc === 1)
                    chipArr.push(`<div class="cell-chip cell-chip-cyc">${cfg.compact ? '' : '🩸 Period'}</div>`);
                else if (dayInCyc === pl2)
                    chipArr.push(`<div class="cell-chip cell-chip-cyc">${cfg.compact ? '' : 'Period end'}</div>`);
                else if (dayInCyc === fertD2)
                    chipArr.push(`<div class="cell-chip cell-chip-cyc">${cfg.compact ? '' : '🌸 Fertile'}</div>`);
                else if (dayInCyc === ovD2)
                    chipArr.push(`<div class="cell-chip cell-chip-cyc">${cfg.compact ? '' : '✨ Ovulation'}</div>`);
            }
            const MAX = cfg.compact ? chipArr.length : 2;
            const visChips = chipArr.slice(0, MAX);
            const extraChips = chipArr.length - MAX;
            let chipsHtml = visChips.join('');
            if (extraChips > 0)
                chipsHtml += `<div class="cell-chip cell-chip-more">+${extraChips}</div>`;
            const wnHtml = (cfg.weekNum && isRowStart) ? `<div class="cell-weeknum">W${getWeekNum(ad)}</div>` : '';
            const tiHtml = cfg.tithi ? `<div class="cell-tithi">${getTithiLabel(ad)}</div>` : '';
            html += `<div class="${cls}" onclick="openDay(${vY},${vM},${nd})">
        ${wnHtml}<div class="ndate ne">${ns(nd)}</div>
        ${cfg.greg ? `<div class="gdate">${ad.getDate()}</div>` : ''}
        ${tiHtml}
        ${chipsHtml ? `<div class="cell-chips">${chipsHtml}</div>` : ''}
      </div>`;
        }
    }
    document.getElementById('cgrid').innerHTML = html;
}
function prevMonth() { haptic('light'); vM--; if (vM < 1) {
    vM = 12;
    vY--;
} render(); }
function nextMonth() { haptic('light'); vM++; if (vM > 12) {
    vM = 1;
    vY++;
} render(); }
function goToday() {
    haptic('medium');
    vY = TODAYBS.y;
    vM = TODAYBS.m;
    selectedDay = { y: TODAYBS.y, m: TODAYBS.m, d: TODAYBS.d };
    if (typeof scheduleActive !== 'undefined' && scheduleActive) {
        if (typeof renderScheduleView === 'function')
            renderScheduleView();
        // renderScheduleView() jumps instantly; follow up with a smooth scroll
        // so a manual "Today" tap feels like a deliberate action.
        requestAnimationFrame(() => {
            schedScrollToEl(document.getElementById('schd-today-anchor'), 'smooth');
        });
        return;
    }
    render();
    renderSelectedDay();
}
// ══ MULTI-MONTH (QUARTERLY) VIEW ══
let mm3Active = false;
function toggle3MView() {
    haptic('light');
    mm3Active = !mm3Active;
    const btn = document.getElementById('tab3M');
    const ccard = document.querySelector('.ccard');
    const mmView = document.getElementById('mmView');
    const upcoming = document.querySelector('.upcoming');
    if (mm3Active) {
        btn.classList.add('on');
        // Hide single-month card, show multi-month
        if (ccard)
            ccard.style.display = 'none';
        if (mmView) {
            mmView.style.display = 'block';
            render3M();
        }
        // Collapse upcoming to save space
        if (upcoming)
            upcoming.style.marginTop = '0';
    }
    else {
        btn.classList.remove('on');
        if (ccard)
            ccard.style.display = '';
        if (mmView)
            mmView.style.display = 'none';
        if (upcoming)
            upcoming.style.marginTop = '';
        render();
    }
}
// ══ SCHEDULE VIEW ══
let scheduleActive = false;
function toggleScheduleView() {
    haptic('light');
    // Close week view if open
    if (typeof weekViewActive !== 'undefined' && weekViewActive) {
        weekViewActive = false;
        const wvBtn = document.getElementById('tabWeek');
        const weekView = document.getElementById('weekView');
        if (wvBtn)
            wvBtn.classList.remove('on');
        if (weekView)
            weekView.style.display = 'none';
        if (typeof wvStopNowLineTimer === 'function')
            wvStopNowLineTimer();
        scheduleActive = false; // force toggle on
    }
    // Close day view if open
    if (typeof dayViewActive !== 'undefined' && dayViewActive) {
        dayViewActive = false;
        const dvBtn = document.getElementById('tabDay');
        const dayView = document.getElementById('dayView');
        if (dvBtn)
            dvBtn.classList.remove('on');
        if (dayView)
            dayView.style.display = 'none';
        if (typeof dvStopNowLineTimer === 'function')
            dvStopNowLineTimer();
        scheduleActive = false; // force toggle on
    }
    // Close month tab if open
    if (typeof monthTabActive !== 'undefined' && monthTabActive) {
        monthTabActive = false;
        const mtBtn = document.getElementById('tabMonth');
        const monthTabView = document.getElementById('monthTabView');
        if (mtBtn)
            mtBtn.classList.remove('on');
        if (monthTabView)
            monthTabView.style.display = 'none';
        scheduleActive = false; // force toggle on
    }
    scheduleActive = !scheduleActive;
    const btn = document.getElementById('tabSchedule');
    const tabAll = document.getElementById('tabAll');
    const ccard = document.querySelector('.ccard');
    const schedView = document.getElementById('scheduleView');
    const upcoming = document.querySelector('.upcoming');
    if (scheduleActive) {
        btn.classList.add('on');
        tabAll.classList.remove('on');
        if (ccard)
            ccard.style.display = 'none';
        if (schedView) {
            schedView.style.display = '';
            renderScheduleView();
        }
        if (upcoming)
            upcoming.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
    else {
        btn.classList.remove('on');
        tabAll.classList.add('on');
        if (ccard)
            ccard.style.display = '';
        if (schedView)
            schedView.style.display = 'none';
        if (upcoming)
            upcoming.style.display = '';
        const fab = document.getElementById('schedTodayFab');
        if (fab)
            fab.style.display = 'none';
        const addFab = document.getElementById('schedAddFab');
        if (addFab)
            addFab.style.display = 'none';
        render();
    }
}
// Scrolls the schedule view so `el` lands just below the sticky month/filter
// strip, instead of directly under the container's top edge (which is where
// the sticky strip visually sits, hiding whatever scrolls to right behind it).
function schedScrollToEl(el, behavior) {
    const wrap = document.getElementById('scheduleView');
    if (!el || !wrap)
        return;
    const jump = () => {
        const sticky = wrap.querySelector('.sv-month-strip');
        const stickyH = sticky ? sticky.offsetHeight : 0;
        const top = el.getBoundingClientRect().top - wrap.getBoundingClientRect().top + wrap.scrollTop - stickyH - 12;
        wrap.scrollTo({ top: Math.max(0, top), behavior: behavior || 'instant' });
    };
    jump();
    // Rows use content-visibility:auto for performance, so far-off-screen rows
    // (which is most of them, across a 120+ year timeline) report an estimated
    // placeholder height until the browser actually lays them out near the
    // viewport. The first jump lands close using those estimates; once the
    // browser has settled on real sizes for the now-nearby content, re-measure
    // and correct any drift so today's row isn't left peeking out from under
    // the sticky strip.
    requestAnimationFrame(() => { requestAnimationFrame(jump); });
}
function schedJumpToday() {
    haptic('light');
    schedScrollToEl(document.getElementById('schd-today-anchor'), 'smooth');
}
function schedApplyFilter(type) {
    haptic('light');
    schedApplyFilterInternal(type);
}
function schedApplyFilterInternal(type) {
    window._schedFilter = type;
    const wrap = document.getElementById('scheduleView');
    if (!wrap)
        return;
    wrap.querySelectorAll('.sv-filter-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.type === type);
    });
    wrap.querySelectorAll('.sv2-row').forEach(row => {
        const pills = row.querySelectorAll('[data-etype]');
        if (pills.length === 0) {
            row.style.display = (type === 'all') ? '' : 'none';
            return;
        }
        let anyVisible = false;
        pills.forEach(p => {
            const show = (type === 'all') || p.dataset.etype === type;
            p.style.display = show ? '' : 'none';
            if (show)
                anyVisible = true;
        });
        row.style.display = anyVisible ? '' : 'none';
    });
}
function svIcon(name) {
    const paths = {
        gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8"/><path d="M16.5 8a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8"/>',
        award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
        user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
        heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
        droplet: '<path d="M12 2.7s-6 6.5-6 10.5a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5z"/>',
        pin: '<path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>',
    };
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.pin}</svg>`;
}
function renderScheduleView() {
    const wrap = document.getElementById('scheduleView');
    if (!wrap)
        return;
    const mArr = lang === 'ne' ? MNE : MEN;
    const wdArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const colorMap2 = { 'personal': '#3B82F6', 'work': '#10b981', 'cultural': '#f59e0b', 'health': '#ef4444', 'birthday': '#ec4899' };
    const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const msDay = 86400000;
    const bsYears = Object.keys(BS).map(Number).sort((a, b) => a - b);
    const firstBsY = bsYears[0], lastBsY = bsYears[bsYears.length - 1];
    const adStart = bsToAd(firstBsY, 1, 1);
    const adStartMid = new Date(adStart.getFullYear(), adStart.getMonth(), adStart.getDate());
    const lastDim = BS[lastBsY][11];
    const adEnd = bsToAd(lastBsY, 12, lastDim);
    const adEndMid = new Date(adEnd.getFullYear(), adEnd.getMonth(), adEnd.getDate());
    const dayMap = {};
    function getDay(adMid) {
        const k = adMid.toISOString().slice(0, 10);
        if (!dayMap[k])
            dayMap[k] = { adMid, items: [] };
        return dayMap[k];
    }
    // — User events —
    userEvents.forEach(ev => {
        const { startMid, endMid } = getEventRangeMid(ev);
        const spanDays = Math.round((+endMid - +startMid) / msDay);
        function pushDay(occStart, occEnd) {
            for (let s = new Date(occStart); s <= occEnd && s <= adEndMid; s = new Date(s.getTime() + msDay)) {
                if (s < adStartMid)
                    continue;
                const bs = adToBs(s);
                getDay(new Date(s)).items.push({ type: 'evt', ev, bs });
            }
        }
        if (!ev.recur && !ev.repeatYearly) {
            pushDay(startMid, endMid);
            return;
        }
        if (ev.repeatYearly && !ev.recur) {
            for (let bsY = firstBsY; bsY <= lastBsY + 1; bsY++) {
                if (!BS[bsY])
                    continue;
                const maxD = BS[bsY][ev.bsM - 1] ?? 30;
                const clampedD = Math.min(ev.bsD, maxD);
                const vStart = bsToAd(bsY, ev.bsM, clampedD);
                const vS = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
                if (vS > adEndMid)
                    break;
                pushDay(vS, new Date(vS.getTime() + spanDays * msDay));
            }
            return;
        }
        const r = ev.recur;
        if (!r || !r.freq) {
            pushDay(startMid, endMid);
            return;
        }
        const interval = r.interval || 1;
        let occ = 0, cur = new Date(startMid);
        const maxIter = 600;
        let iter = 0;
        while (cur <= adEndMid && iter++ < maxIter) {
            if (r.endType === 'count' && occ >= (r.endCount || 1))
                break;
            if (r.endType === 'date' && r.endAdMs) {
                const ed = new Date(r.endAdMs);
                const edM = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
                if (cur > edM)
                    break;
            }
            pushDay(cur, new Date(cur.getTime() + spanDays * msDay));
            occ++;
            if (r.freq === 'daily')
                cur = new Date(cur.getTime() + interval * msDay);
            else if (r.freq === 'weekly') {
                if (r.weekdays && r.weekdays.length) {
                    cur = new Date(cur.getTime() + msDay);
                    while (!r.weekdays.includes(cur.getDay()))
                        cur = new Date(cur.getTime() + msDay);
                }
                else
                    cur = new Date(cur.getTime() + interval * 7 * msDay);
            }
            else if (r.freq === 'monthly') {
                const nm = new Date(cur);
                nm.setMonth(nm.getMonth() + interval);
                cur = nm;
            }
            else if (r.freq === 'yearly') {
                const ny = new Date(cur);
                ny.setFullYear(ny.getFullYear() + interval);
                cur = ny;
            }
            else
                break;
        }
    });
    // — Holidays —
    for (const key of Object.keys(HOL)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (!BS[ky])
            continue;
        const ad = bsToAd(ky, km, kd);
        const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
        if (adMid >= adStartMid && adMid <= adEndMid)
            getDay(adMid).items.push({ type: 'hol', hol: HOL[key], ky, km, kd });
    }
    // — Observances —
    for (const key of Object.keys(OBS)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (!BS[ky])
            continue;
        const ad = bsToAd(ky, km, kd);
        const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
        if (adMid >= adStartMid && adMid <= adEndMid)
            getDay(adMid).items.push({ type: 'obs', obs: OBS[key], ky, km, kd });
    }
    // — Cycle phases —
    if (cycleData && cycleData.lastPeriodStart) {
        const cl = cycleData.cycleLength || 28, pl = cycleData.periodLength || 5;
        // Use the most-recent period_start log as the true anchor (same as buildCycleUpcomingItems)
        // so that manual period log updates are reflected here, not just in Upcoming.
        const _allLogs = cycleData.logs || [];
        const _psl = _allLogs.filter(l => l.type === 'period_start' && l.date).sort((a, b) => b.date - a.date);
        const baseRaw = _psl.length ? new Date(_psl[0].date) : new Date(cycleData.lastPeriodStart);
        const baseMid = new Date(baseRaw.getFullYear(), baseRaw.getMonth(), baseRaw.getDate());
        let cycleStart = new Date(baseMid);
        while (new Date(cycleStart.getTime() + cl * msDay) < adStartMid)
            cycleStart = new Date(cycleStart.getTime() + cl * msDay);
        const phases = [
            { name: 'Menstrual', offset: 0, emoji: '🔴', color: '#FF4757' },
            { name: 'Follicular', offset: pl, emoji: '🌱', color: '#FF6B9D' },
            { name: 'Ovulation', offset: cl - 16, emoji: '✨', color: '#a78bfa' },
            { name: 'Luteal', offset: cl - 12, emoji: '🌙', color: '#3B82F6' },
        ];
        for (let safe = 0; safe < 1000 && cycleStart <= adEndMid; safe++) {
            phases.forEach(ph => {
                const phDay = new Date(cycleStart.getTime() + ph.offset * msDay);
                if (phDay >= adStartMid && phDay <= adEndMid)
                    getDay(phDay).items.push({ type: 'cyc', phase: ph.name, emoji: ph.emoji, color: ph.color });
            });
            cycleStart = new Date(cycleStart.getTime() + cl * msDay);
        }
        // — Inject logged period events (period starts/ends, ovulation, fertile window)
        // via buildCycleUpcomingItems so Schedule tab matches what Upcoming shows —
        try {
            const _cycItems = buildCycleUpcomingItems(todayMid, adEndMid);
            const _emojiMap = { 'Period starts': '🩸', 'Period ends': '✅', 'Fertile window opens': '🌸', 'Ovulation': '✨' };
            const _colorMap = { 'Period starts': '#FF4757', 'Period ends': '#22c55e', 'Fertile window opens': '#FF6B9D', 'Ovulation': '#a855f7' };
            _cycItems.forEach(ci => {
                const phDay = new Date(ci.ad.getFullYear(), ci.ad.getMonth(), ci.ad.getDate());
                if (phDay < adStartMid || phDay > adEndMid)
                    return;
                getDay(phDay).items.push({
                    type: 'cyc',
                    phase: ci.isLogged ? ci.title + ' ✓' : ci.title,
                    emoji: _emojiMap[ci.title] || '🌸',
                    color: _colorMap[ci.title] || '#FF6B9D'
                });
            });
        }
        catch (e) { }
    }
    const eventDayKeys = new Set(Object.keys(dayMap));
    // ── Build month chip strip + body HTML ──
    let chipHtml = '';
    let bodyHtml = '';
    let todayMonthAnchorId = null;
    const filterDefs = [
        { type: 'all', label: 'All', icon: '📋' },
        { type: 'hol', label: 'Holidays', icon: '🎉' },
        { type: 'obs', label: 'Observances', icon: '🎀' },
        { type: 'evt', label: 'Events', icon: '📌' },
        { type: 'bday', label: 'Birthdays', icon: '🎂' },
        { type: 'cyc', label: 'Cycle', icon: '🌸' },
    ];
    const curFilter = window._schedFilter || 'all';
    const filterHtml = filterDefs.map(f => `<button class="sv-filter-chip${curFilter === f.type ? ' active' : ''}" data-type="${f.type}" onclick="schedApplyFilter('${f.type}')">${f.icon} ${f.label}</button>`).join('');
    // Collect months that have events or are current/near-current
    const months = [];
    for (let y = Math.max(firstBsY, 2083); y <= Math.min(lastBsY, 2086); y++) {
        if (!BS[y])
            continue;
        for (let m = 1; m <= 12; m++) {
            const dims = BS[y][m - 1];
            if (!dims)
                continue;
            const isCurrentMonth = (y === TODAYBS.y && m === TODAYBS.m);
            const isPastMonth = (y < TODAYBS.y) || (y === TODAYBS.y && m < TODAYBS.m);
            // Collect event days
            const evtDays = [];
            for (let d = 1; d <= dims; d++) {
                const ad = bsToAd(y, m, d);
                const adMid2 = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
                const k = adMid2.toISOString().slice(0, 10);
                if (eventDayKeys.has(k))
                    evtDays.push({ d, adMid2, k });
            }
            months.push({ y, m, dims, isCurrentMonth, isPastMonth, evtDays });
        }
    }
    months.forEach(({ y, m, dims, isCurrentMonth, isPastMonth, evtDays }) => {
        const bsMonthName = mArr[m - 1] || '';
        const anchorId = `schd-month-${y}-${m}`;
        if (isCurrentMonth)
            todayMonthAnchorId = anchorId;
        const chipOnClass = isCurrentMonth ? ' sv-cur' : '';
        // Month chip
        chipHtml += `<button class="sv-month-chip${chipOnClass}" data-anchor="${anchorId}" onclick="document.getElementById('${anchorId}')?.scrollIntoView({behavior:'smooth',block:'start'})">
      ${isCurrentMonth ? '<span class="sv-month-chip-dot"></span>' : ''}${bsMonthName.substring(0, 3)} ${y}
    </button>`;
        // Section header
        const badgeHtml = isCurrentMonth
            ? `<span class="sv-month-badge current">This month</span>`
            : isPastMonth
                ? `<span class="sv-month-badge past">Past</span>`
                : '';
        const evtCountText = evtDays.length > 0
            ? `<span class="sv-month-evt-count">${evtDays.length} event${evtDays.length !== 1 ? 's' : ''}</span>`
            : '';
        bodyHtml += `<div class="sv-month-section" id="${anchorId}">
      <span class="sv-month-label">${bsMonthName} <span style="font-weight:700;opacity:.6;font-size:.8em;">${y}</span></span>
      ${evtCountText}${badgeHtml}
    </div>`;
        // Build metadata for every day of this BS month (Google-Calendar agenda style:
        // days with content get their own row; empty stretches collapse into a
        // single "MMM d – d" range line, grouped by AD calendar week).
        function accentFor(it) {
            if (it.type === 'hol')
                return '#f5940a';
            if (it.type === 'obs')
                return '#a855f7';
            if (it.type === 'cyc')
                return '#ec4899';
            const ev = it.ev;
            if (ev && ev.color === 'birthday')
                return '#ec4899';
            return (ev && colorMap2[ev.color]) || '#3b82f6';
        }
        function pillFor(it, by, bm, bd) {
            if (it.type === 'hol') {
                const name = lang === 'ne' ? it.hol.np : it.hol.en;
                return `<div class="sv2-evt-pill hol" data-etype="hol" onclick="event.stopPropagation();openDay(${it.ky},${it.km},${it.kd})">
          <span class="sv2-pill-icon">${svIcon('gift')}</span>
          <span class="sv2-pill-text">
            <span class="sv2-pill-title">${esc(name)}</span>
            <span class="sv2-pill-sub">Public Holiday</span>
          </span>
          <span class="sv2-pill-chev">›</span>
        </div>`;
            }
            if (it.type === 'obs') {
                const name = lang === 'ne' ? it.obs.np : it.obs.en;
                return `<div class="sv2-evt-pill obs" data-etype="obs" onclick="event.stopPropagation();openDay(${it.ky},${it.km},${it.kd})">
          <span class="sv2-pill-icon">${svIcon('award')}</span>
          <span class="sv2-pill-text">
            <span class="sv2-pill-title">${esc(name)}</span>
            <span class="sv2-pill-sub">Observance</span>
          </span>
          <span class="sv2-pill-chev">›</span>
        </div>`;
            }
            if (it.type === 'cyc') {
                return `<div class="sv2-evt-pill cyc" data-etype="cyc" onclick="event.stopPropagation();">
          <span class="sv2-pill-icon">${svIcon('droplet')}</span>
          <span class="sv2-pill-text">
            <span class="sv2-pill-title">${esc(it.phase)}</span>
            <span class="sv2-pill-sub">Cycle</span>
          </span>
        </div>`;
            }
            const ev = it.ev;
            if (ev && ev.color === 'birthday') {
                return `<div class="sv2-bday-banner" data-etype="bday" onclick="event.stopPropagation();openDay(${by},${bm},${bd})">
          <div class="sv2-bday-decor"><span>🎂</span><span>🎈</span><span>🎉</span><span>✨</span><span>🎁</span></div>
          <div class="sv2-bday-scrim"></div>
          <div class="sv2-bday-label"><span>🎂</span><span>${esc(ev.title)}</span></div>
        </div>`;
            }
            const catIconName = { 'personal': 'user', 'work': 'briefcase', 'cultural': 'music', 'health': 'heart' }[ev && ev.color] || 'pin';
            const catLabel = (ev && ev.color) ? ev.color.charAt(0).toUpperCase() + ev.color.slice(1) : 'Event';
            const timeLabel = (ev && ev.startTime) ? ` · ${esc(ev.startTime)}${ev.endTime ? '–' + esc(ev.endTime) : ''}` : '';
            const pc = (ev && colorMap2[ev.color]) || '#3b82f6';
            return `<div class="sv2-evt-pill evt" data-etype="evt" style="--pc:${pc};" onclick="event.stopPropagation();openDay(${by},${bm},${bd})">
        <span class="sv2-pill-icon">${svIcon(catIconName)}</span>
        <span class="sv2-pill-text">
          <span class="sv2-pill-title">${esc(ev ? ev.title : '')}</span>
          <span class="sv2-pill-sub">${catLabel}${timeLabel}</span>
        </span>
        <span class="sv2-pill-chev">›</span>
      </div>`;
        }
        const allDaysMeta = [];
        for (let d = 1; d <= dims; d++) {
            const ad = bsToAd(y, m, d);
            const adMid2 = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
            const k = adMid2.toISOString().slice(0, 10);
            const dayEntry = dayMap[k];
            const items = dayEntry ? dayEntry.items : [];
            const isToday = adMid2.getTime() === todayMid.getTime();
            allDaysMeta.push({ d, adMid2, k, items, isToday });
        }
        if (allDaysMeta.length === 0)
            return;
        // Timeline for this month
        bodyHtml += `<div class="sv2-timeline">`;
        let i = 0;
        while (i < allDaysMeta.length) {
            let j = i;
            while (j < allDaysMeta.length && allDaysMeta[j].adMid2.getDay() !== 6)
                j++;
            if (j < allDaysMeta.length)
                j++;
            else
                j = allDaysMeta.length;
            const weekChunk = allDaysMeta.slice(i, j);
            const hasContent = weekChunk.some(x => x.items.length > 0 || x.isToday);
            if (!hasContent) {
                const first = weekChunk[0], last = weekChunk[weekChunk.length - 1];
                const sameDay = first.adMid2.getTime() === last.adMid2.getTime();
                const startLabel = `${ADMEN[first.adMid2.getMonth()].substring(0, 3)} ${first.adMid2.getDate()}`;
                const rangeLabel = sameDay
                    ? startLabel
                    : `${startLabel} – ${(first.adMid2.getMonth() === last.adMid2.getMonth())
                        ? `${last.adMid2.getDate()}`
                        : `${ADMEN[last.adMid2.getMonth()].substring(0, 3)} ${last.adMid2.getDate()}`}`;
                bodyHtml += `<div class="sv2-week-range">${rangeLabel}</div>`;
            }
            else {
                weekChunk.forEach(dayMeta => {
                    if (dayMeta.items.length === 0 && !dayMeta.isToday)
                        return;
                    const wd = wdArr[dayMeta.adMid2.getDay()];
                    const isWknd = dayMeta.adMid2.getDay() === 6;
                    const isTomorrow = dayMeta.adMid2.getTime() === (todayMid.getTime() + 86400000);
                    const todayAnchorAttr = dayMeta.isToday ? ' id="schd-today-anchor"' : '';
                    let contentHtml;
                    if (dayMeta.items.length === 0) {
                        contentHtml = `<div class="sv2-empty-text">Nothing planned. Tap to create.</div>`;
                    }
                    else {
                        contentHtml = dayMeta.items.map(it => pillFor(it, y, m, dayMeta.d)).join('');
                    }
                    const rowAccent = dayMeta.items.length ? accentFor(dayMeta.items[0]) : null;
                    bodyHtml += `<div class="sv2-row${dayMeta.isToday ? ' is-today' : ''}${rowAccent ? ' has-evt' : ''}" style="${rowAccent ? `--rc:${rowAccent};` : ''}" onclick="openDay(${y},${m},${dayMeta.d})"${todayAnchorAttr}>
            <div class="sv2-daycol">
              <div class="sv2-dow${dayMeta.isToday ? ' today' : isWknd ? ' wknd' : ''}">${wd}</div>
              <div class="sv2-dnum${dayMeta.isToday ? ' today' : isWknd ? ' wknd' : ''}">${dayMeta.d}</div>
              ${dayMeta.isToday ? '<div class="sv2-today-tag">Today</div>' : (isTomorrow ? '<div class="sv2-today-tag tmrw">Tomorrow</div>' : '')}
            </div>
            <div class="sv2-content">${contentHtml}</div>
          </div>`;
                });
            }
            i = j;
        }
        bodyHtml += `</div>`; // end sv2-timeline
    });
    if (!bodyHtml) {
        wrap.innerHTML = `<div class="sv-empty-global">
      <div class="sv-empty-global-icon">📅</div>
      <div class="sv-empty-global-text">No events found</div>
    </div>`;
        const fabEmpty = document.getElementById('schedTodayFab');
        if (fabEmpty)
            fabEmpty.style.display = 'none';
        const addFabEmpty = document.getElementById('schedAddFab');
        if (addFabEmpty)
            addFabEmpty.style.display = 'flex';
        return;
    }
    // Assemble: sticky month strip + filter strip + body
    wrap.innerHTML = `
    <div class="sv-month-strip">
      <div class="sv-month-strip-scroll">${chipHtml}</div>
      <div class="sv-filter-strip">${filterHtml}</div>
    </div>
    ${bodyHtml}
  `;
    const fab = document.getElementById('schedTodayFab');
    if (fab)
        fab.style.display = 'flex';
    const addFab = document.getElementById('schedAddFab');
    if (addFab)
        addFab.style.display = 'flex';
    if (window._schedFilter && window._schedFilter !== 'all') {
        schedApplyFilterInternal(window._schedFilter);
    }
    // Scroll-spy: keep the month chip strip in sync with whichever month section is in view
    requestAnimationFrame(() => {
        try {
            if (window._schedMonthObserver)
                window._schedMonthObserver.disconnect();
            if (window._schedSpyTimer)
                clearTimeout(window._schedSpyTimer);
            const sections = wrap.querySelectorAll('.sv-month-section');
            const stripScroll = wrap.querySelector('.sv-month-strip-scroll');
            const setActive = (id) => {
                wrap.querySelectorAll('.sv-month-chip').forEach(c => c.classList.remove('sv-cur'));
                const chip = wrap.querySelector(`.sv-month-chip[data-anchor="${id}"]`);
                if (!chip)
                    return;
                chip.classList.add('sv-cur');
                if (stripScroll) {
                    const chipLeft = chip.offsetLeft;
                    const chipWidth = chip.offsetWidth;
                    const stripWidth = stripScroll.clientWidth;
                    const target = Math.max(0, chipLeft - (stripWidth / 2) + (chipWidth / 2));
                    if (Math.abs(stripScroll.scrollLeft - target) > 4) {
                        stripScroll.scrollTo({ left: target, behavior: 'smooth' });
                    }
                }
            };
            const obs = new IntersectionObserver((entries) => {
                const hit = entries.find(e => e.isIntersecting);
                if (!hit)
                    return;
                const id = hit.target.id;
                clearTimeout(window._schedSpyTimer);
                window._schedSpyTimer = setTimeout(() => setActive(id), 120);
            }, { root: wrap, rootMargin: '-88px 0px -75% 0px', threshold: 0 });
            sections.forEach(s => obs.observe(s));
            window._schedMonthObserver = obs;
        }
        catch (e) { }
    });
    // Scroll so today is visible with a bit of context above it (within the
    // schedule view's own scroll box — never the page — so the header,
    // modebar, and month-strip stay visible, same as Day/Week views), landing
    // below the sticky month/filter strip rather than hidden behind it.
    requestAnimationFrame(() => {
        const todayEl = document.getElementById('schd-today-anchor');
        if (todayEl) {
            schedScrollToEl(todayEl, 'instant');
        }
        else if (todayMonthAnchorId) {
            schedScrollToEl(document.getElementById(todayMonthAnchorId), 'instant');
        }
    });
}
// ── WEEK VIEW ────────────────────────────────────────────────────────────
let weekViewActive = false;
let weekViewOffset = 0; // offset in weeks from "this week"
function toggleWeekView() {
    haptic('light');
    weekViewActive = !weekViewActive;
    const btn = document.getElementById('tabWeek');
    const tabAll = document.getElementById('tabAll');
    const tabSchedule = document.getElementById('tabSchedule');
    const tabDay = document.getElementById('tabDay');
    const ccard = document.querySelector('.ccard');
    const schedView = document.getElementById('scheduleView');
    const weekView = document.getElementById('weekView');
    const dayView = document.getElementById('dayView');
    const upcoming = document.querySelector('.upcoming');
    if (weekViewActive) {
        // Deactivate schedule if active
        if (scheduleActive) {
            scheduleActive = false;
            if (tabSchedule)
                tabSchedule.classList.remove('on');
            if (schedView)
                schedView.style.display = 'none';
            const _sf = document.getElementById('schedTodayFab');
            if (_sf)
                _sf.style.display = 'none';
            const _saf = document.getElementById('schedAddFab');
            if (_saf)
                _saf.style.display = 'none';
        }
        // Deactivate day view if active
        if (typeof dayViewActive !== 'undefined' && dayViewActive) {
            dayViewActive = false;
            if (tabDay)
                tabDay.classList.remove('on');
            if (dayView)
                dayView.style.display = 'none';
            if (typeof dvStopNowLineTimer === 'function')
                dvStopNowLineTimer();
        }
        // Deactivate month tab if active
        if (typeof monthTabActive !== 'undefined' && monthTabActive) {
            monthTabActive = false;
            const tabMonth = document.getElementById('tabMonth');
            const monthTabView = document.getElementById('monthTabView');
            if (tabMonth)
                tabMonth.classList.remove('on');
            if (monthTabView)
                monthTabView.style.display = 'none';
        }
        btn.classList.add('on');
        tabAll.classList.remove('on');
        if (ccard)
            ccard.style.display = 'none';
        weekViewOffset = 0;
        weekView.style.display = 'flex';
        weekView.style.flexDirection = 'column';
        renderWeekView();
        if (upcoming)
            upcoming.style.display = 'none';
    }
    else {
        btn.classList.remove('on');
        tabAll.classList.add('on');
        if (ccard)
            ccard.style.display = '';
        weekView.style.display = 'none';
        if (upcoming)
            upcoming.style.display = '';
        wvStopNowLineTimer();
        render();
    }
}
// ══ MONTH TAB VIEW ══
let monthTabActive = false;
function toggleMonthTab() {
    haptic('light');
    monthTabActive = !monthTabActive;
    const btn = document.getElementById('tabMonth');
    const tabAll = document.getElementById('tabAll');
    const tabSchedule = document.getElementById('tabSchedule');
    const tabWeekBtn = document.getElementById('tabWeek');
    const tabDayBtn = document.getElementById('tabDay');
    const ccard = document.querySelector('.ccard');
    const schedView = document.getElementById('scheduleView');
    const weekView = document.getElementById('weekView');
    const dayView = document.getElementById('dayView');
    const monthTabView = document.getElementById('monthTabView');
    const upcoming = document.querySelector('.upcoming');
    if (monthTabActive) {
        // Deactivate schedule if active
        if (scheduleActive) {
            scheduleActive = false;
            if (tabSchedule)
                tabSchedule.classList.remove('on');
            if (schedView)
                schedView.style.display = 'none';
            const _sf = document.getElementById('schedTodayFab');
            if (_sf)
                _sf.style.display = 'none';
            const _saf = document.getElementById('schedAddFab');
            if (_saf)
                _saf.style.display = 'none';
        }
        // Deactivate day view if active
        if (typeof dayViewActive !== 'undefined' && dayViewActive) {
            dayViewActive = false;
            if (tabDayBtn)
                tabDayBtn.classList.remove('on');
            if (dayView)
                dayView.style.display = 'none';
            if (typeof dvStopNowLineTimer === 'function')
                dvStopNowLineTimer();
        }
        // Deactivate week view if active
        if (weekViewActive) {
            weekViewActive = false;
            if (tabWeekBtn)
                tabWeekBtn.classList.remove('on');
            if (weekView)
                weekView.style.display = 'none';
            if (typeof wvStopNowLineTimer === 'function')
                wvStopNowLineTimer();
        }
        btn.classList.add('on');
        tabAll.classList.remove('on');
        if (ccard)
            ccard.style.display = 'none';
        if (upcoming)
            upcoming.style.display = 'none';
        if (monthTabView) {
            monthTabView.style.display = 'block';
            renderMonthTabView();
        }
    }
    else {
        btn.classList.remove('on');
        tabAll.classList.add('on');
        if (ccard)
            ccard.style.display = '';
        if (monthTabView)
            monthTabView.style.display = 'none';
        if (upcoming)
            upcoming.style.display = '';
        render();
    }
}
function renderMonthTabView() {
    const wrap = document.getElementById('monthTabView');
    if (!wrap)
        return;
    const y = vY, m = vM;
    const dims = BS[y]?.[m - 1] ?? 30;
    const mArr = lang === 'ne' ? MNE : MEN;
    const monthName = mArr[m - 1];
    const todayBS = TODAYBS;
    // Build event map
    const dayMap = {};
    for (let d = 1; d <= dims; d++)
        dayMap[d] = { hols: [], evts: [], cycs: [], obs: [] };
    for (const key of Object.keys(HOL)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (ky === y && km === m && dayMap[kd])
            dayMap[kd].hols.push(HOL[key]);
    }
    for (const key of Object.keys(OBS)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (ky === y && km === m && dayMap[kd])
            dayMap[kd].obs.push(OBS[key]);
    }
    const monthStart = bsToAd(y, m, 1);
    const monthEnd = bsToAd(y, m, dims);
    const mStartMid = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate());
    const mEndMid = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), monthEnd.getDate());
    userEvents.forEach(ev => {
        const msDay2 = 86400000;
        const { startMid, endMid } = getEventRangeMid(ev);
        const spanDays = Math.round((+endMid - +startMid) / msDay2);
        const occurrences = [];
        if (!ev.recur && !ev.repeatYearly) {
            occurrences.push({ oStart: startMid, oEnd: endMid });
        }
        else if (ev.repeatYearly && !ev.recur) {
            [y - 1, y, y + 1].forEach(bsY => {
                if (!BS[bsY])
                    return;
                const maxD2 = BS[bsY][ev.bsM - 1] ?? 30;
                const clampedD = Math.min(ev.bsD, maxD2);
                const vStart = bsToAd(bsY, ev.bsM, clampedD);
                const vSMid = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
                occurrences.push({ oStart: vSMid, oEnd: new Date(vSMid.getTime() + spanDays * msDay2) });
            });
        }
        else {
            const r = ev.recur;
            if (!r || !r.freq) {
                occurrences.push({ oStart: startMid, oEnd: endMid });
            }
            else {
                const interval = r.interval || 1;
                let occ = 0, cur = new Date(startMid), maxIter = 600, iter = 0;
                while (cur <= mEndMid && iter++ < maxIter) {
                    if (r.endType === 'count' && occ >= (r.endCount || 1))
                        break;
                    if (r.endType === 'date' && r.endAdMs) {
                        const ed = new Date(r.endAdMs);
                        const edM = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
                        if (cur > edM)
                            break;
                    }
                    occurrences.push({ oStart: new Date(cur), oEnd: new Date(cur.getTime() + spanDays * msDay2) });
                    occ++;
                    if (r.freq === 'daily')
                        cur = new Date(cur.getTime() + interval * msDay2);
                    else if (r.freq === 'weekly') {
                        if (r.weekdays && r.weekdays.length) {
                            cur = new Date(cur.getTime() + msDay2);
                            while (!r.weekdays.includes(cur.getDay()))
                                cur = new Date(cur.getTime() + msDay2);
                        }
                        else
                            cur = new Date(cur.getTime() + interval * 7 * msDay2);
                    }
                    else if (r.freq === 'monthly') {
                        const nm = new Date(cur);
                        nm.setMonth(nm.getMonth() + interval);
                        cur = nm;
                    }
                    else if (r.freq === 'yearly') {
                        const ny = new Date(cur);
                        ny.setFullYear(ny.getFullYear() + interval);
                        cur = ny;
                    }
                    else
                        break;
                }
            }
        }
        occurrences.forEach(({ oStart, oEnd }) => {
            if (oEnd < mStartMid || oStart > mEndMid)
                return;
            for (let d = 1; d <= dims; d++) {
                const adD = bsToAd(y, m, d);
                const adMid = new Date(adD.getFullYear(), adD.getMonth(), adD.getDate());
                if (adMid >= oStart && adMid <= oEnd && !dayMap[d].evts.includes(ev))
                    dayMap[d].evts.push(ev);
            }
        });
    });
    const cycItems = buildCycleUpcomingItems(mStartMid, mEndMid);
    cycItems.forEach(ci => {
        if (ci.ky === y && ci.km === m && dayMap[ci.kd])
            dayMap[ci.kd].cycs.push(ci);
    });
    const firstAD = bsToAd(y, m, 1);
    const startDow = firstAD.getDay();
    const WDLABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = `<div class="mtv-wrap">
    <div class="mtv-hdr">
      <button class="mtv-nav-btn" onclick="mtvNavMonth(-1)">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="mtv-hdr-center">
        <div class="mtv-title">${monthName} ${ns(y)}</div>
        <div class="mtv-sub">${lang === 'ne' ? 'बि.सं.' : 'Bikram Sambat'}</div>
      </div>
      <button class="mtv-nav-btn" onclick="mtvNavMonth(1)">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="mtv-dhdrs">${WDLABELS.map((w, i) => `<div class="mtv-dhdr${i === 0 ? ' mtv-dhdr-wknd' : i === 6 ? ' mtv-dhdr-wknd' : ''}">${w}</div>`).join('')}</div>
    <div class="mtv-grid">`;
    for (let i = 0; i < startDow; i++)
        html += `<div class="mtv-cell mtv-cell-empty"></div>`;
    const evtColorMap = { 'personal': '#3B82F6', 'work': '#10b981', 'cultural': '#f59e0b', 'health': '#ef4444', 'birthday': '#ec4899' };
    for (let d = 1; d <= dims; d++) {
        const isToday = todayBS.y === y && todayBS.m === m && todayBS.d === d;
        const adD = bsToAd(y, m, d);
        const dow = adD.getDay();
        const isWknd = dow === 0 || dow === 6;
        const dm = dayMap[d];
        const hasHol = dm.hols.length > 0 || dm.obs.length > 0;
        // Build inline chips so events are directly visible in the grid cell
        const chipArr = [];
        dm.hols.forEach(h => {
            const hn = lang === 'ne' ? h.np : h.en;
            chipArr.push(`<div class="mtv-chip mtv-chip-hol">${hn}</div>`);
        });
        dm.obs.forEach(o => {
            const on = lang === 'ne' ? o.np : o.en;
            chipArr.push(`<div class="mtv-chip mtv-chip-evt">${on}</div>`);
        });
        dm.evts.forEach(ev => {
            const c = evtColorMap[ev.color] || '#3B82F6';
            chipArr.push(`<div class="mtv-chip mtv-chip-evt" style="color:${safeCss(c, '#3B82F6')};">${esc(ev.title) || 'Event'}</div>`);
        });
        dm.cycs.forEach(ci => {
            chipArr.push(`<div class="mtv-chip mtv-chip-cyc">${ci.title}</div>`);
        });
        const MAXC = 4;
        const visChips = chipArr.slice(0, MAXC);
        const extraChips = chipArr.length - MAXC;
        let chipsHtml = visChips.join('');
        if (extraChips > 0)
            chipsHtml += `<div class="mtv-chip mtv-chip-more">+${extraChips}</div>`;
        const cls = ['mtv-cell',
            isToday ? 'mtv-today' : '',
            isWknd && !isToday ? 'mtv-wknd' : '',
            hasHol && !isToday ? 'mtv-has-hol' : '',
        ].filter(Boolean).join(' ');
        html += `<div class="${cls}" onclick="openDay(${y},${m},${d})">
      <span class="mtv-dnum">${ns(d)}</span>
      ${chipsHtml ? `<div class="mtv-chips">${chipsHtml}</div>` : ''}
    </div>`;
    }
    html += `</div></div>`;
    wrap.innerHTML = html;
}
function mtvNavMonth(dir) {
    haptic('light');
    vM += dir;
    if (vM < 1) {
        vM = 12;
        vY--;
    }
    if (vM > 12) {
        vM = 1;
        vY++;
    }
    if (!BS[vY]) {
        vM = dir > 0 ? 1 : 12;
        vY -= dir;
    }
    render();
    renderMonthTabView();
}
function renderWeekView() {
    const weekView = document.getElementById('weekView');
    if (!weekView)
        return;
    const msDay = 86400000;
    const mArr = lang === 'ne' ? MNE : MEN;
    const wdShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const colorMap = { 'personal': '#3B82F6', 'work': '#10b981', 'cultural': '#f59e0b', 'health': '#ef4444', 'birthday': '#ec4899' };
    // Find Sunday of the current week + offset
    // Nepal is always UTC+5:45 (no DST) — add 345 minutes to UTC
    const _rawNow = new Date();
    const _nstMs = _rawNow.getTime() + (5 * 60 + 45) * 60 * 1000;
    const _nstDate = new Date(_nstMs);
    const _nstH = _nstDate.getUTCHours();
    const _nstM = _nstDate.getUTCMinutes();
    const now = _nstDate;
    const todayMid = new Date(Date.UTC(_nstDate.getUTCFullYear(), _nstDate.getUTCMonth(), _nstDate.getUTCDate()));
    const dow = todayMid.getUTCDay();
    const weekStart = new Date(todayMid.getTime() - dow * msDay + weekViewOffset * 7 * msDay);
    const weekEnd = new Date(weekStart.getTime() + 6 * msDay);
    const fmtDate = (d) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
    };
    const weekLabel = `${fmtDate(weekStart)} \u2013 ${fmtDate(weekEnd)}, ${weekEnd.getUTCFullYear()}`;
    const bsWS = adToBs(weekStart);
    const bsWE = adToBs(weekEnd);
    const bsLabel = bsWS.m === bsWE.m
        ? `${mArr[bsWS.m - 1]} ${bsWS.y} BS`
        : `${mArr[bsWS.m - 1]} \u2013 ${mArr[bsWE.m - 1]} ${bsWE.y} BS`;
    // Build per-day data
    const days = [];
    for (let i = 0; i < 7; i++) {
        const adMid = new Date(weekStart.getTime() + i * msDay);
        const bs = adToBs(adMid);
        const isToday = adMid.getTime() === todayMid.getTime();
        const isWknd = adMid.getDay() === 0 || adMid.getDay() === 6;
        days.push({ adMid, bs, isToday, isWknd, events: [], hols: [], obs: [] });
    }
    // Holidays & observances
    days.forEach(day => {
        const k = `${day.bs.y}-${day.bs.m}-${day.bs.d}`;
        if (HOL[k])
            day.hols.push(HOL[k]);
        if (OBS[k])
            day.obs.push(OBS[k]);
    });
    // User events
    userEvents.forEach(ev => {
        const { startMid, endMid } = getEventRangeMid(ev);
        const spanDays = Math.round((+endMid - +startMid) / msDay);
        function tryPush(occStart, occEnd) {
            days.forEach(day => {
                if (day.adMid >= occStart && day.adMid <= occEnd)
                    day.events.push(ev);
            });
        }
        if (!ev.recur && !ev.repeatYearly) {
            tryPush(startMid, endMid);
            return;
        }
        if (ev.repeatYearly && !ev.recur) {
            // Derive BS years from the week's AD dates, then also check adjacent BS years
            const bsWS2 = adToBs(weekStart);
            const bsWE2 = adToBs(weekEnd);
            const bsYrs = new Set([bsWS2.y - 1, bsWS2.y, bsWE2.y, bsWE2.y + 1]);
            bsYrs.forEach(bsY => {
                if (!BS[bsY])
                    return;
                const maxD2 = BS[bsY][ev.bsM - 1] ?? 30;
                const clampedD = Math.min(ev.bsD, maxD2);
                const vS = bsToAd(bsY, ev.bsM, clampedD);
                const vSm = new Date(vS.getFullYear(), vS.getMonth(), vS.getDate());
                tryPush(vSm, new Date(vSm.getTime() + spanDays * msDay));
            });
            return;
        }
        const r = ev.recur;
        if (!r || !r.freq) {
            tryPush(startMid, endMid);
            return;
        }
        const interval = r.interval || 1;
        let occ = 0, cur = new Date(startMid);
        const maxIter = 600;
        let iter = 0;
        while (cur <= weekEnd && iter++ < maxIter) {
            if (r.endType === 'count' && occ >= (r.endCount || 1))
                break;
            if (r.endType === 'date' && r.endAdMs) {
                const ed = new Date(r.endAdMs);
                const edM = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
                if (cur > edM)
                    break;
            }
            tryPush(cur, new Date(cur.getTime() + spanDays * msDay));
            occ++;
            if (r.freq === 'daily')
                cur = new Date(cur.getTime() + interval * msDay);
            else if (r.freq === 'weekly') {
                if (r.weekdays && r.weekdays.length) {
                    cur = new Date(cur.getTime() + msDay);
                    while (!r.weekdays.includes(cur.getDay()))
                        cur = new Date(cur.getTime() + msDay);
                }
                else
                    cur = new Date(cur.getTime() + interval * 7 * msDay);
            }
            else if (r.freq === 'monthly') {
                const nm = new Date(cur);
                nm.setMonth(nm.getMonth() + interval);
                cur = nm;
            }
            else if (r.freq === 'yearly') {
                const ny = new Date(cur);
                ny.setFullYear(ny.getFullYear() + interval);
                cur = ny;
            }
            else
                break;
        }
    });
    const CELL_H = 54;
    // Hour-cell h (h=0..23) starts at h*CELL_H — uniform CELL_H-tall rows for
    // every hour, including 12 AM. This is the single source of truth for
    // mapping a clock time to its vertical pixel position in the grid.
    function wvTimeToTop(h, m) {
        const frac = (m || 0) / 60;
        return (h || 0) * CELL_H + frac * CELL_H;
    }
    // Day headers
    let dayHdrHtml = '';
    days.forEach(day => {
        const numCls = day.isToday ? 'wv-day-num today' : day.isWknd ? 'wv-day-num wknd' : 'wv-day-num';
        dayHdrHtml += `<div class="wv-day-col-hdr">
      <div class="wv-day-name${day.isWknd ? ' wknd' : ''}">${wdShort[day.adMid.getDay()]}</div>
      <div class="${numCls}">${ns(day.bs.d)}</div>
    </div>`;
    });
    // Time labels
    let timeColHtml = '';
    for (let h = 0; h < 24; h++) {
        const label = h === 0 ? '12 AM' : h === 12 ? '12 PM' : h < 12 ? `${h} AM` : `${h - 12} PM`;
        timeColHtml += `<div class="wv-time-label">${label}</div>`;
    }
    // Now line — current Nepal Standard Time (UTC+5:45)
    const nstNow = new Date(Date.now() + 345 * 60000);
    const nowMins = nstNow.getUTCHours() * 60 + nstNow.getUTCMinutes();
    const nowTopPx = wvTimeToTop(Math.floor(nowMins / 60), nowMins % 60);
    const showNow = weekViewOffset === 0;
    const todayColIdx = showNow ? todayMid.getDay() : -1;
    let dayCols = '';
    days.forEach((day, di) => {
        const colCls = day.isToday ? 'wv-day-col today-col' : day.isWknd ? 'wv-day-col wknd-col' : 'wv-day-col';
        let col = '';
        // Hour cells — tappable to add event
        for (let h = 0; h < 24; h++) {
            col += `<div class="wv-hour-cell half" onclick="wvCellTap(event,${di},${h},0)" data-day="${di}" data-h="${h}"></div>`;
        }
        let bannerTop = 2;
        day.hols.forEach(hol => {
            const name = lang === 'ne' ? hol.np : hol.en;
            const bsD = day.bs;
            col += `<div class="wv-hol-banner" style="top:${bannerTop}px" onclick="openDay(${bsD.y},${bsD.m},${bsD.d})">🎉 ${esc(name)}</div>`;
            bannerTop += 20;
        });
        day.obs.forEach(ob => {
            const name = lang === 'ne' ? ob.np : ob.en;
            const bsD = day.bs;
            col += `<div class="wv-obs-banner" style="top:${bannerTop}px" onclick="openDay(${bsD.y},${bsD.m},${bsD.d})">🎀 ${esc(name)}</div>`;
            bannerTop += 18;
        });
        day.events.forEach((ev, ei) => {
            const c = colorMap[ev.color] || '#3B82F6';
            let topPx, heightPx;
            if (ev.startTime) {
                const [sh, sm] = ev.startTime.split(':').map(Number);
                topPx = wvTimeToTop(sh, sm);
                if (ev.endTime) {
                    const [eh, em] = ev.endTime.split(':').map(Number);
                    heightPx = Math.max(18, ((eh + em / 60) - (sh + sm / 60)) * CELL_H);
                }
                else
                    heightPx = CELL_H;
            }
            else {
                topPx = bannerTop + ei * 22;
                heightPx = 20;
            }
            const bsD = day.bs;
            col += `<div class="wv-event" style="top:${topPx}px;height:${heightPx}px;background:${safeCss(c, '#3B82F6')};color:#fff;" onclick="openDay(${bsD.y},${bsD.m},${bsD.d})">
        <div class="wv-event-title">${esc(ev.title)}</div>
        ${ev.startTime ? `<div class="wv-event-time">${esc(ev.startTime)}${ev.endTime ? ' \u2013 ' + esc(ev.endTime) : ''}</div>` : ''}
      </div>`;
        });
        if (di === todayColIdx && showNow) {
            col += `<div class="wv-now-line" style="top:${nowTopPx}px;">
        <div class="wv-now-line-dot"></div>
        <div class="wv-now-line-rule"></div>
      </div>`;
        }
        dayCols += `<div class="${colCls}">${col}</div>`;
    });
    weekView.innerHTML = `
    <div class="wv-nav">
      <button class="wv-nav-btn" onclick="weekViewOffset--;renderWeekView()"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
      <div style="text-align:center;">
        <div class="wv-nav-title">${weekLabel}</div>
        <div class="wv-nav-sub">${bsLabel}</div>
      </div>
      <button class="wv-nav-btn" onclick="weekViewOffset++;renderWeekView()"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
    <div class="wv-day-headers">${dayHdrHtml}</div>
    <div class="wv-scroll">
      <div class="wv-grid">
        <div class="wv-time-col">${timeColHtml}</div>
        <div class="wv-days-area">${dayCols}</div>
      </div>
    </div>
  `;
    requestAnimationFrame(() => {
        const scroll = weekView.querySelector('.wv-scroll');
        if (scroll)
            scroll.scrollTop = nowTopPx - 120;
    });
    wvStartNowLineTimer();
}
// Keep the "now" line moving in real time while the week view stays open,
// without forcing a full re-render (which would reset scroll position).
let _wvNowLineIv = null;
function wvStartNowLineTimer() {
    if (_wvNowLineIv)
        clearInterval(_wvNowLineIv);
    _wvNowLineIv = setInterval(wvUpdateNowLine, 30000);
}
function wvStopNowLineTimer() {
    if (_wvNowLineIv) {
        clearInterval(_wvNowLineIv);
        _wvNowLineIv = null;
    }
}
function wvUpdateNowLine() {
    if (!weekViewActive || weekViewOffset !== 0)
        return;
    const CELL_H = 54;
    const nstNow = new Date(Date.now() + 345 * 60000);
    const nowMins = nstNow.getUTCHours() * 60 + nstNow.getUTCMinutes();
    const nowTopPx = nowMins / 60 * CELL_H;
    document.querySelectorAll('#weekView .wv-now-line').forEach(el => { el.style.top = nowTopPx + 'px'; });
}
// ══ DAY VIEW ══
let dayViewActive = false;
let dayViewOffset = 0; // offset in days from today
function toggleDayView() {
    haptic('light');
    dayViewActive = !dayViewActive;
    const btn = document.getElementById('tabDay');
    const tabAll = document.getElementById('tabAll');
    const tabSchedule = document.getElementById('tabSchedule');
    const tabWeekBtn = document.getElementById('tabWeek');
    const ccard = document.querySelector('.ccard');
    const schedView = document.getElementById('scheduleView');
    const weekView = document.getElementById('weekView');
    const dayView = document.getElementById('dayView');
    const upcoming = document.querySelector('.upcoming');
    if (dayViewActive) {
        // Deactivate schedule if active
        if (scheduleActive) {
            scheduleActive = false;
            if (tabSchedule)
                tabSchedule.classList.remove('on');
            if (schedView)
                schedView.style.display = 'none';
            const _sf = document.getElementById('schedTodayFab');
            if (_sf)
                _sf.style.display = 'none';
            const _saf = document.getElementById('schedAddFab');
            if (_saf)
                _saf.style.display = 'none';
        }
        // Deactivate week view if active
        if (weekViewActive) {
            weekViewActive = false;
            if (tabWeekBtn)
                tabWeekBtn.classList.remove('on');
            if (weekView)
                weekView.style.display = 'none';
            if (typeof wvStopNowLineTimer === 'function')
                wvStopNowLineTimer();
        }
        // Deactivate month tab if active
        if (typeof monthTabActive !== 'undefined' && monthTabActive) {
            monthTabActive = false;
            const tabMonth = document.getElementById('tabMonth');
            const monthTabView = document.getElementById('monthTabView');
            if (tabMonth)
                tabMonth.classList.remove('on');
            if (monthTabView)
                monthTabView.style.display = 'none';
        }
        btn.classList.add('on');
        tabAll.classList.remove('on');
        if (ccard)
            ccard.style.display = 'none';
        dayViewOffset = 0;
        dayView.style.display = 'flex';
        dayView.style.flexDirection = 'column';
        renderDayView();
        if (upcoming)
            upcoming.style.display = 'none';
    }
    else {
        btn.classList.remove('on');
        tabAll.classList.add('on');
        if (ccard)
            ccard.style.display = '';
        dayView.style.display = 'none';
        if (upcoming)
            upcoming.style.display = '';
        dvStopNowLineTimer();
        render();
    }
}
function renderDayView() {
    const dayView = document.getElementById('dayView');
    if (!dayView)
        return;
    const CELL_H = 54;
    const msDay = 86400000;
    const colorMap = { 'personal': '#3B82F6', 'work': '#10b981', 'cultural': '#f59e0b', 'health': '#ef4444', 'birthday': '#ec4899' };
    const mArr = lang === 'ne' ? MNE : MEN;
    const ADMEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const wdFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Nepal time
    const nstNow = new Date(Date.now() + 345 * 60000);
    const todayMid = new Date(Date.UTC(nstNow.getUTCFullYear(), nstNow.getUTCMonth(), nstNow.getUTCDate()));
    const targetMid = new Date(todayMid.getTime() + dayViewOffset * msDay);
    const isToday = dayViewOffset === 0;
    const isWknd = targetMid.getDay() === 0 || targetMid.getDay() === 6;
    // AD label
    const adLabel = `${wdFull[targetMid.getDay()]}, ${ADMEN[targetMid.getMonth()]} ${targetMid.getDate()}, ${targetMid.getFullYear()}`;
    // BS info
    const bs = adToBs(targetMid);
    const bsLabel = `${mArr[bs.m - 1]} ${ns(bs.d)}, ${ns(bs.y)} BS`;
    // Holidays & observances
    const hols = [], obsList = [];
    const bsKey = `${bs.y}-${bs.m}-${bs.d}`;
    if (HOL[bsKey])
        hols.push(HOL[bsKey]);
    if (OBS[bsKey])
        obsList.push(OBS[bsKey]);
    // User events for this day
    const dayEvents = [];
    userEvents.forEach(ev => {
        const { startMid, endMid } = getEventRangeMid(ev);
        const spanDays = Math.round((+endMid - +startMid) / msDay);
        function check(occStart, occEnd) {
            if (targetMid >= occStart && targetMid <= occEnd)
                dayEvents.push(ev);
        }
        if (!ev.recur && !ev.repeatYearly) {
            check(startMid, endMid);
            return;
        }
        if (ev.repeatYearly && !ev.recur) {
            // Use the BS year of the target day, plus neighbours, to find the correct occurrence
            const bsTarget = adToBs(targetMid);
            const bsYrs = new Set([bsTarget.y - 1, bsTarget.y, bsTarget.y + 1]);
            bsYrs.forEach(bsY => {
                if (!BS[bsY])
                    return;
                const maxD2 = BS[bsY][ev.bsM - 1] ?? 30;
                const clampedD = Math.min(ev.bsD, maxD2);
                const vS = bsToAd(bsY, ev.bsM, clampedD);
                const vSm = new Date(vS.getFullYear(), vS.getMonth(), vS.getDate());
                check(vSm, new Date(vSm.getTime() + spanDays * msDay));
            });
            return;
        }
        const r = ev.recur;
        if (!r || !r.freq) {
            check(startMid, endMid);
            return;
        }
        const interval = r.interval || 1;
        let occ = 0, cur = new Date(startMid);
        const maxIter = 600;
        let iter = 0;
        while (cur <= targetMid && iter++ < maxIter) {
            if (r.endType === 'count' && occ >= (r.endCount || 1))
                break;
            if (r.endType === 'date' && r.endAdMs) {
                const ed = new Date(r.endAdMs);
                const edM = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
                if (cur > edM)
                    break;
            }
            check(cur, new Date(cur.getTime() + spanDays * msDay));
            occ++;
            if (r.freq === 'daily')
                cur = new Date(cur.getTime() + interval * msDay);
            else if (r.freq === 'weekly') {
                if (r.weekdays && r.weekdays.length) {
                    cur = new Date(cur.getTime() + msDay);
                    while (!r.weekdays.includes(cur.getDay()))
                        cur = new Date(cur.getTime() + msDay);
                }
                else
                    cur = new Date(cur.getTime() + interval * 7 * msDay);
            }
            else if (r.freq === 'monthly') {
                const nm = new Date(cur);
                nm.setMonth(nm.getMonth() + interval);
                cur = nm;
            }
            else if (r.freq === 'yearly') {
                const ny = new Date(cur);
                ny.setFullYear(ny.getFullYear() + interval);
                cur = ny;
            }
            else
                break;
        }
    });
    // Now line
    const nowMins = nstNow.getUTCHours() * 60 + nstNow.getUTCMinutes();
    const nowTopPx = (nowMins / 60) * CELL_H;
    function dvTimeToTop(h, m) { return (h || 0) * CELL_H + ((m || 0) / 60) * CELL_H; }
    // Time labels
    let timeColHtml = '';
    for (let h = 0; h < 24; h++) {
        const label = h === 0 ? '12 AM' : h === 12 ? '12 PM' : h < 12 ? `${h} AM` : `${h - 12} PM`;
        timeColHtml += `<div class="dv-time-label">${label}</div>`;
    }
    // Hour cells + events
    let hoursHtml = '';
    for (let h = 0; h < 24; h++) {
        hoursHtml += `<div class="dv-hour-cell half" onclick="dvCellTap(${h},0)"></div>`;
    }
    // Timed events
    let timedEventsHtml = '';
    let allDayEventsHtml = '';
    let allDayCount = 0;
    dayEvents.forEach(ev => {
        const c = colorMap[ev.color] || '#3B82F6';
        if (ev.startTime) {
            const [sh, sm] = ev.startTime.split(':').map(Number);
            let heightPx = CELL_H;
            if (ev.endTime) {
                const [eh, em] = ev.endTime.split(':').map(Number);
                heightPx = Math.max(22, ((eh + em / 60) - (sh + sm / 60)) * CELL_H);
            }
            const topPx = dvTimeToTop(sh, sm);
            timedEventsHtml += `<div class="dv-event" style="top:${topPx}px;height:${heightPx}px;background:${safeCss(c, '#3B82F6')};color:#fff;" onclick="openDay(${bs.y},${bs.m},${bs.d})">
        <div class="dv-event-title">${esc(ev.title)}</div>
        <div class="dv-event-time">${ev.startTime}${ev.endTime ? ' \u2013 ' + ev.endTime : ''}</div>
      </div>`;
        }
        else {
            allDayEventsHtml += `<div class="dv-allday-pill evt">
        <div class="dv-allday-dot" style="background:${safeCss(c, '#3B82F6')};"></div>
        ${esc(ev.title)}
      </div>`;
            allDayCount++;
        }
    });
    // Holiday banners
    const holBannersHtml = [
        ...hols.map(h => `<span class="dv-hol-pill hol">🎉 ${esc(lang === 'ne' ? h.np : h.en)}</span>`),
        ...obsList.map(o => `<span class="dv-hol-pill obs">🎀 ${esc(lang === 'ne' ? o.np : o.en)}</span>`)
    ].join('');
    const nowLineHtml = isToday ? `<div class="dv-now-line" id="dvNowLine" style="top:${nowTopPx}px;">
    <div class="dv-now-line-dot"></div>
    <div class="dv-now-line-rule"></div>
  </div>` : '';
    const allDaySectionHtml = allDayCount > 0 ? `<div class="dv-allday-area">
    <div class="dv-allday-label">All-day</div>
    ${allDayEventsHtml}
  </div>` : '';
    dayView.innerHTML = `
    <div class="dv-nav">
      <button class="dv-nav-btn" onclick="dayViewOffset--;renderDayView()"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
      <div class="dv-nav-center">
        <div class="dv-nav-title">${isToday ? 'Today' : adLabel.split(',')[0] + ',' + adLabel.split(',').slice(1).join(',')}</div>
        <div class="dv-nav-sub">${bsLabel}</div>
      </div>
      <button class="dv-nav-btn" onclick="dayViewOffset++;renderDayView()"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
    ${holBannersHtml ? `<div class="dv-hol-banner-row">${holBannersHtml}</div>` : ''}
    ${allDaySectionHtml}
    <div class="dv-scroll" id="dvScroll">
      <div class="dv-grid">
        <div class="dv-time-col">${timeColHtml}</div>
        <div class="dv-day-col-area">
          ${hoursHtml}
          ${timedEventsHtml}
          ${nowLineHtml}
        </div>
      </div>
    </div>
  `;
    // Scroll to current time or 8 AM
    requestAnimationFrame(() => {
        const scroll = dayView.querySelector('.dv-scroll');
        if (scroll)
            scroll.scrollTop = isToday ? Math.max(0, nowTopPx - 120) : 8 * CELL_H - 60;
    });
    dvStartNowLineTimer();
}
function dvCellTap(hour, min) {
    // Get current target day
    const msDay = 86400000;
    const nstNow = new Date(Date.now() + 345 * 60000);
    const todayMid = new Date(Date.UTC(nstNow.getUTCFullYear(), nstNow.getUTCMonth(), nstNow.getUTCDate()));
    const targetMid = new Date(todayMid.getTime() + dayViewOffset * msDay);
    const bs = adToBs(targetMid);
    openAddForDayTime(bs.y, bs.m, bs.d, hour, min);
}
let _dvNowLineIv = null;
function dvStartNowLineTimer() {
    if (_dvNowLineIv)
        clearInterval(_dvNowLineIv);
    _dvNowLineIv = setInterval(dvUpdateNowLine, 30000);
}
function dvStopNowLineTimer() {
    if (_dvNowLineIv) {
        clearInterval(_dvNowLineIv);
        _dvNowLineIv = null;
    }
}
function dvUpdateNowLine() {
    if (!dayViewActive || dayViewOffset !== 0)
        return;
    const CELL_H = 54;
    const nstNow = new Date(Date.now() + 345 * 60000);
    const nowMins = nstNow.getUTCHours() * 60 + nstNow.getUTCMinutes();
    const nowTopPx = (nowMins / 60) * CELL_H;
    const el = document.getElementById('dvNowLine');
    if (el)
        el.style.top = nowTopPx + 'px';
}
function wvCellTap(e, dayIdx, hour, min) {
    // Don't trigger if an event/banner was clicked
    if (e.target.closest('.wv-event,.wv-hol-banner,.wv-obs-banner,.wv-nav-btn'))
        return;
    const msDay = 86400000;
    // Use UTC noon anchor (same as renderWeekView) so adToBs always gets the right BS day
    const nstNow = new Date(Date.now() + (5 * 60 + 45) * 60 * 1000);
    const todayMid = new Date(Date.UTC(nstNow.getUTCFullYear(), nstNow.getUTCMonth(), nstNow.getUTCDate()));
    const dow = todayMid.getUTCDay();
    const weekStart = new Date(todayMid.getTime() - dow * msDay + weekViewOffset * 7 * msDay);
    const adMid = new Date(weekStart.getTime() + dayIdx * msDay);
    const bs = adToBs(adMid);
    openAddForDayTime(bs.y, bs.m, bs.d, hour, min);
}
function mmOffsetMonth(y, m, delta) {
    m += delta;
    while (m > 12) {
        m -= 12;
        y++;
    }
    while (m < 1) {
        m += 12;
        y--;
    }
    return { y, m };
}
function render3M() {
    const grid = document.getElementById('mmGrid');
    const label = document.getElementById('mmNavLabel');
    if (!grid)
        return;
    // Centre month is vY/vM; show prev, current, next
    const months = [
        mmOffsetMonth(vY, vM, -1),
        { y: vY, m: vM },
        mmOffsetMonth(vY, vM, +1),
    ];
    // Nav label shows the quarter span
    const first = months[0], last = months[2];
    label.textContent = `${MEN[first.m - 1]} ${first.y} – ${MEN[last.m - 1]} ${last.y}`;
    let html = '';
    months.forEach(({ y, m }, idx) => {
        const isCurrentView = (y === vY && m === vM);
        const isTodayMonth = (y === TODAYBS.y && m === TODAYBS.m);
        const dims = BS[y]?.[m - 1] ?? 30;
        const sAD = bsStart(y, m);
        const sDow = (sAD.getDay() - cfg.fd + 7) % 7;
        const pM = m === 1 ? 12 : m - 1, pY = m === 1 ? y - 1 : y;
        const pDims = BS[pY]?.[pM - 1] ?? 30;
        const nM = m === 12 ? 1 : m + 1, nY = m === 12 ? y + 1 : y;
        let tot = sDow + dims;
        if (tot % 7 !== 0)
            tot += 7 - tot % 7;
        // Day header row
        const dn = lang === 'ne' ? DNE : DEN;
        const ord = [];
        for (let i = 0; i < 7; i++)
            ord.push((cfg.fd + i) % 7);
        const dHdr = ord.map(i => `<div class="mm-dhdr${i === 0 || i === 6 ? ' wk' : ''}">${dn[i][0]}</div>`).join('');
        // Month header
        const mnName = lang === 'ne' ? MNE[m - 1] : MEN[m - 1];
        const adStart = bsToAd(y, m, 1);
        const adEnd = bsToAd(y, m, dims);
        const adLabel = `${ADMEN[adStart.getMonth()]} – ${ADMEN[adEnd.getMonth()]} ${adEnd.getFullYear()}`;
        html += `<div class="mm-block">
      <div class="mm-month-hdr">
        <div>
          <div class="mm-month-title${isTodayMonth ? ' is-today-month' : ''}">${mnName} ${ns(y)}</div>
          <div class="mm-month-sub">${adLabel}</div>
        </div>
        ${isTodayMonth ? '<div style="font-size:10px;font-weight:800;padding:3px 8px;border-radius:8px;background:var(--today-grad);color:#fff;">This Month</div>' : ''}
      </div>
      <div class="mm-dhdrs">${dHdr}</div>
      <div class="mm-grid">`;
        for (let i = 0; i < tot; i++) {
            const col = (cfg.fd + (i % 7)) % 7;
            const isWk = col === 0 || col === 6;
            if (i < sDow) {
                // Prev month overflow
                const nd = pDims - sDow + i + 1;
                html += `<div class="mm-cell dim" onclick="mmJumpTo(${pY},${pM},${nd})"><div class="mm-ndate">${ns(nd)}</div></div>`;
            }
            else if (i >= sDow + dims) {
                // Next month overflow
                const nd = i - sDow - dims + 1;
                html += `<div class="mm-cell dim" onclick="mmJumpTo(${nY},${nM},${nd})"><div class="mm-ndate">${ns(nd)}</div></div>`;
            }
            else {
                const nd = i - sDow + 1;
                const adD = new Date(sAD);
                adD.setDate(adD.getDate() + nd - 1);
                const adMid = new Date(adD.getFullYear(), adD.getMonth(), adD.getDate());
                const isToday = (y === TODAYBS.y && m === TODAYBS.m && nd === TODAYBS.d);
                const isSel = (selectedDay.y === y && selectedDay.m === m && selectedDay.d === nd);
                const h = getH(y, m, nd);
                let cls = 'mm-cell active';
                if (isToday)
                    cls += ' today';
                else if (h)
                    cls += ' hol';
                else if (isWk)
                    cls += ' wk';
                if (isSel && !isToday)
                    cls += ' sel';
                // Dots: holiday, observance, events, cycle
                const dots = [];
                if (h)
                    dots.push('<div class="mm-dot hol"></div>');
                else if (getObs(y, m, nd))
                    dots.push('<div class="mm-dot evt"></div>');
                userEvents.forEach(ev => {
                    if (eventMatchesDate(ev, y, m, nd))
                        dots.push('<div class="mm-dot evt"></div>');
                });
                if (cycleData.lastPeriodStart) {
                    const cl2 = cycleData.cycleLength || 28, pl2 = cycleData.periodLength || 5;
                    const ovD2 = cl2 - 14, fertD2 = Math.max(1, ovD2 - 5);
                    const baseD = new Date(cycleData.lastPeriodStart);
                    baseD.setHours(0, 0, 0, 0);
                    const dayN = Math.floor((+adMid - +baseD) / 86400000);
                    const dayInCyc = ((dayN % cl2) + cl2) % cl2 + 1;
                    if (dayInCyc >= 1 && dayInCyc <= pl2)
                        dots.push('<div class="mm-dot cyc"></div>');
                    else if (dayInCyc >= fertD2 && dayInCyc <= ovD2)
                        dots.push('<div class="mm-dot cyc"></div>');
                }
                const dotsHtml = dots.length ? `<div class="mm-dots">${dots.slice(0, 3).join('')}</div>` : '';
                html += `<div class="${cls}" onclick="mmOpenDay(${y},${m},${nd})">
          <div class="mm-ndate ne">${ns(nd)}</div>
          ${dotsHtml}
        </div>`;
            }
        }
        html += `</div></div>`;
        if (idx < 2)
            html += '<div class="mm-sep"></div>';
    });
    grid.innerHTML = html;
}
function mmPrev() {
    haptic('light');
    vM -= 3;
    while (vM < 1) {
        vM += 12;
        vY--;
    }
    render();
    render3M();
}
function mmNext() {
    haptic('light');
    vM += 3;
    while (vM > 12) {
        vM -= 12;
        vY++;
    }
    render();
    render3M();
}
function mmJumpTo(y, m, d) {
    // Exit 3M view, jump to that month
    toggle3MView();
    vY = y;
    vM = m;
    selectedDay = { y, m, d };
    render();
    renderSelectedDay();
}
function mmOpenDay(y, m, d) {
    haptic('light');
    selectedDay = { y, m, d };
    // Update vY/vM so single-month view stays in sync
    vY = y;
    vM = m;
    render3M(); // refresh sel highlight
    openDay(y, m, d);
}
window.toggle3MView = toggle3MView;
window.mmPrev = mmPrev;
window.mmNext = mmNext;
window.mmJumpTo = mmJumpTo;
window.mmOpenDay = mmOpenDay;
// ══ COLLAPSIBLE CALENDAR ══
let calExpanded = false;
// ── Calendar geometry helpers ──
function getCurrentWeekRow() {
    const sAD = bsStart(vY, vM);
    const sDow = (sAD.getDay() - cfg.fd + 7) % 7;
    const dims = BS[vY]?.[vM - 1] ?? 30;
    let focusD = null;
    if (vY === TODAYBS.y && vM === TODAYBS.m)
        focusD = TODAYBS.d;
    else if (selectedDay.y === vY && selectedDay.m === vM)
        focusD = selectedDay.d;
    if (focusD === null)
        focusD = 1;
    focusD = Math.max(1, Math.min(focusD, dims));
    return Math.floor((sDow + focusD - 1) / 7);
}
function getTotalWeekRows() {
    const sAD = bsStart(vY, vM);
    const sDow = (sAD.getDay() - cfg.fd + 7) % 7;
    const dims = BS[vY]?.[vM - 1] ?? 30;
    let tot = sDow + dims;
    if (tot % 7 !== 0)
        tot += 7 - tot % 7;
    return Math.floor(tot / 7);
}
function getRowHeightPx() {
    // Return height of the CURRENT week row (not just cells[0]) so variable-height rows work
    const grid = document.getElementById('cgrid');
    if (!grid)
        return 58;
    const cells = grid.querySelectorAll('.cell');
    if (!cells.length)
        return 58;
    const style = getComputedStyle(grid);
    const rowGap = parseFloat(style.rowGap) || 9;
    const currentRow = getCurrentWeekRow();
    // The first cell of the current row
    const idx = currentRow * 7;
    const cell = cells[idx] || cells[0];
    return cell.offsetHeight + rowGap;
}
function getCalHeights() {
    const grid = document.getElementById('cgrid');
    const totalRows = getTotalWeekRows();
    const style = grid ? getComputedStyle(grid) : null;
    const rowGap = style ? (parseFloat(style.rowGap) || 9) : 9;
    // Collapsed: height of only the current week row + bottom padding buffer
    const rowH = getRowHeightPx();
    const collapsedH = rowH + 6;
    // Expanded: actual rendered grid height (accounts for variable row heights)
    const expandedH = grid ? grid.scrollHeight + 2 : rowH * totalRows + 4;
    // Collapsed offset: sum of heights of all rows ABOVE current row
    const cells = grid ? grid.querySelectorAll('.cell') : [];
    const currentRow = getCurrentWeekRow();
    let collapsedOffset = 0;
    for (let r = 0; r < currentRow; r++) {
        const cell = cells[r * 7];
        if (cell)
            collapsedOffset += cell.offsetHeight + rowGap;
    }
    collapsedOffset = -collapsedOffset;
    return { rowH, totalRows, collapsedH, expandedH, collapsedOffset };
}
// ── Dot indicators ──
function renderWeekDots(total, active) {
    const wrap = document.getElementById('calWeekDots');
    if (!wrap)
        return;
    if (total <= 1) {
        wrap.innerHTML = '';
        return;
    }
    wrap.innerHTML = Array.from({ length: total }, (_, i) => `<div class="cal-week-dot${i === active ? ' active' : ''}"></div>`).join('');
}
// ── Snap to final state (with spring animation) ──
function applyCalHeight(animate, velocity) {
    const clip = document.getElementById('calClip');
    const grid = document.getElementById('cgrid');
    const ccard = document.querySelector('.ccard');
    const lbl = document.getElementById('calHandleLabel');
    if (!clip || !grid)
        return;
    // If the calendar isn't visible (e.g. settings tab is open), cells report
    // offsetHeight=0 which would corrupt the stored clip height — skip entirely.
    const firstCell = grid.querySelector('.cell');
    if (firstCell && firstCell.offsetHeight === 0)
        return;
    const { collapsedH, expandedH, collapsedOffset, totalRows } = getCalHeights();
    const targetH = calExpanded ? expandedH : collapsedH;
    const targetOffset = calExpanded ? 0 : collapsedOffset;
    // Dynamic spring: faster if flicked, gentle if tapped/dragged slowly
    const spd = Math.abs(velocity || 0);
    const dur = spd > 0.8 ? '.28s' : spd > 0.3 ? '.36s' : '.44s';
    // Expanding = bouncy overshoot; collapsing = snappy ease-in
    const SPRING_EXP = 'cubic-bezier(.34,1.26,.64,1)';
    const SPRING_COL = 'cubic-bezier(.4,0,.25,1)';
    const spring = calExpanded ? SPRING_EXP : SPRING_COL;
    if (animate) {
        clip.style.transition = `height ${dur} ${spring}`;
        grid.style.transition = `transform ${dur} ${spring}`;
    }
    else {
        clip.style.transition = 'none';
        grid.style.transition = 'none';
    }
    clip.style.height = targetH + 'px';
    grid.style.transform = `translateY(${targetOffset}px)`;
    if (ccard) {
        ccard.classList.toggle('cal-expanded', calExpanded);
        ccard.classList.remove('swiping');
    }
    if (lbl)
        lbl.textContent = calExpanded ? 'Show week' : 'Show month';
    renderWeekDots(totalRows, calExpanded ? -1 : getCurrentWeekRow());
    if (animate) {
        requestAnimationFrame(() => {
            const cells = grid.querySelectorAll('.cell');
            const currentRow = getCurrentWeekRow();
            if (calExpanded) {
                // Expanding: make all cells visible again then animate them in
                cells.forEach((c, i) => {
                    const row = Math.floor(i / 7);
                    c.style.visibility = '';
                    if (row === currentRow)
                        return;
                    c.classList.remove('cal-cell-anim-out', 'cal-cell-anim-out-up');
                    c.style.animation = 'none';
                    requestAnimationFrame(() => {
                        c.style.animation = '';
                        c.classList.add('cal-cell-anim');
                        const dist = Math.abs(row - currentRow);
                        c.style.animationDelay = `${dist * 38}ms`;
                        c.addEventListener('animationend', () => {
                            c.classList.remove('cal-cell-anim');
                            c.style.animationDelay = '';
                        }, { once: true });
                    });
                });
            }
            else {
                // Collapsing: immediately hide non-current-row cells so their
                // backgrounds never bleed into the visible row during the clip animation
                cells.forEach((c, i) => {
                    const row = Math.floor(i / 7);
                    if (row === currentRow)
                        return;
                    c.classList.remove('cal-cell-anim', 'cal-cell-anim-out', 'cal-cell-anim-out-up');
                    c.style.visibility = 'hidden';
                });
            }
        });
    }
    else {
        // No animation — sync visibility to match collapsed/expanded state
        requestAnimationFrame(() => {
            const cells = grid.querySelectorAll('.cell');
            const currentRow = getCurrentWeekRow();
            cells.forEach((c, i) => {
                const row = Math.floor(i / 7);
                c.style.visibility = (!calExpanded && row !== currentRow) ? 'hidden' : '';
            });
        });
    }
}
// ── Toggle (tap handle) ──
function toggleCalExpand() {
    haptic('light');
    calExpanded = !calExpanded;
    applyCalHeight(true, 0);
    // ripple from handle centre
    const handle = document.getElementById('calExpandHandle');
    if (handle)
        spawnRipple(handle.getBoundingClientRect());
}
// ── Ripple helper ──
function spawnRipple(rect) {
    const ccard = document.querySelector('.ccard');
    if (!ccard)
        return;
    const cardRect = ccard.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - cardRect.left;
    const y = rect.top + rect.height / 2 - cardRect.top;
    const r = Math.max(cardRect.width, cardRect.height) * 1.1;
    const el = document.createElement('div');
    el.style.cssText = `
    position:absolute;border-radius:50%;pointer-events:none;z-index:0;
    left:${x}px;top:${y}px;
    width:${r * 2}px;height:${r * 2}px;
    transform:translate(-50%,-50%) scale(0);
    background:radial-gradient(circle,rgba(167,99,255,.22) 0%,rgba(109,44,232,.10) 45%,transparent 70%);
    transition:transform .55s cubic-bezier(.22,.85,.25,1),opacity .55s;
    opacity:1;
  `;
    ccard.appendChild(el);
    requestAnimationFrame(() => {
        el.style.transform = 'translate(-50%,-50%) scale(1)';
        el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 600);
}
// ── Patch render ──
const _origRender = window.render;
window.render = function () {
    _origRender();
    // Double rAF: first frame lets _origRender2 post-process the DOM (tithi/weekNum),
    // second frame ensures the browser has reflowed those changes before we measure heights
    requestAnimationFrame(() => { requestAnimationFrame(() => { applyCalHeight(false); }); });
};
// ── Live-drag swipe system ──
(function () {
    let startY = 0, startX = 0, isDragging = false, isVertical = false;
    let liveH = 0, liveOffset = 0;
    let startH = 0, startOffset = 0, startFraction = 0;
    // Velocity tracking
    let lastY = 0, lastT = 0, velocity = 0;
    const DECIDE_PX = 8; // pixels before we decide horizontal vs vertical
    const COMMIT_FRAC = 0.28; // fraction of travel to commit
    const FLICK_VEL = 0.55; // px/ms — flick threshold
    function getCard() { return document.querySelector('.ccard'); }
    function getClip() { return document.getElementById('calClip'); }
    function getGrid() { return document.getElementById('cgrid'); }
    function getProgress() { return document.getElementById('calSwipeProgress'); }
    // Live dim non-active rows proportionally to collapse progress
    function updateLiveRowDim(frac) {
        const grid = getGrid();
        if (!grid)
            return;
        const currentRow = getCurrentWeekRow();
        const cells = grid.querySelectorAll('.cell');
        const collapseFrac = 1 - Math.max(0, Math.min(1, frac)); // 0=expanded, 1=collapsed
        cells.forEach((c, i) => {
            const row = Math.floor(i / 7);
            if (row === currentRow) {
                c.style.opacity = '';
                c.style.filter = '';
                return;
            }
            const dist = Math.abs(row - currentRow);
            // Rows farthest from active row fade faster
            const dimAmt = Math.min(1, collapseFrac * (1 + dist * 0.25));
            c.style.opacity = 1 - dimAmt * 0.72;
            c.style.filter = `blur(${dimAmt * 1.6}px)`;
            c.style.transform = `scale(${1 - dimAmt * 0.04})`;
        });
    }
    function clearLiveRowDim() {
        const grid = getGrid();
        if (!grid)
            return;
        grid.querySelectorAll('.cell').forEach(c => {
            c.style.opacity = '';
            c.style.filter = '';
            c.style.transform = '';
        });
    }
    function onTouchStart(e) {
        if (e.target.closest('.nbtn'))
            return;
        if (document.body.classList.contains('simple-calendar-mode'))
            return; // always full month in Simple mode
        if (e.touches.length > 1)
            return;
        const t = e.touches[0];
        startY = t.clientY;
        startX = t.clientX;
        lastY = startY;
        lastT = Date.now();
        velocity = 0;
        isDragging = false;
        isVertical = false;
        const { collapsedH, expandedH, collapsedOffset } = getCalHeights();
        startH = calExpanded ? expandedH : collapsedH;
        startOffset = calExpanded ? 0 : collapsedOffset;
        liveH = startH;
        liveOffset = startOffset;
        // Range of travel
        startFraction = calExpanded ? 1 : 0;
        // kill transitions while dragging
        const clip = getClip();
        const grid = getGrid();
        if (clip) {
            clip.style.transition = 'none';
        }
        if (grid) {
            grid.style.transition = 'none';
        }
    }
    function onTouchMove(e) {
        if (!e.touches.length)
            return;
        const t = e.touches[0];
        const dy = t.clientY - startY;
        const dx = t.clientX - startX;
        // Velocity tracking
        const now = Date.now();
        const dt = now - lastT;
        if (dt > 0)
            velocity = (t.clientY - lastY) / dt;
        lastY = t.clientY;
        lastT = now;
        // Determine axis on first decisive move
        if (!isDragging) {
            if (Math.abs(dy) < DECIDE_PX && Math.abs(dx) < DECIDE_PX)
                return;
            if (Math.abs(dx) > Math.abs(dy)) {
                isVertical = false;
                isDragging = true;
                return;
            }
            isVertical = true;
            isDragging = true;
        }
        if (!isVertical)
            return;
        e.preventDefault(); // prevent scroll while we handle this
        const { collapsedH, expandedH, collapsedOffset } = getCalHeights();
        const travel = expandedH - collapsedH;
        if (travel <= 0)
            return;
        // Fraction 0=collapsed 1=expanded
        let frac = startFraction + dy / travel;
        // Rubber-band beyond limits
        if (frac < 0)
            frac = frac / (1 - frac * 3);
        if (frac > 1)
            frac = 1 + (frac - 1) / (1 + (frac - 1) * 3);
        frac = Math.max(-0.15, Math.min(1.15, frac));
        liveH = collapsedH + (expandedH - collapsedH) * Math.max(0, Math.min(1, frac));
        liveOffset = collapsedOffset * (1 - Math.max(0, Math.min(1, frac)));
        const clip = getClip();
        const grid = getGrid();
        const card = getCard();
        if (clip)
            clip.style.height = liveH + 'px';
        if (grid)
            grid.style.transform = `translateY(${liveOffset}px)`;
        // Hide non-current-row cells as soon as we start collapsing so their
        // backgrounds never bleed into the visible row
        if (grid) {
            const currentRow = getCurrentWeekRow();
            const collapsing = frac < startFraction;
            grid.querySelectorAll('.cell').forEach((c, i) => {
                const row = Math.floor(i / 7);
                if (row === currentRow) {
                    c.style.visibility = '';
                    return;
                }
                c.style.visibility = collapsing ? 'hidden' : '';
            });
        }
        if (card) {
            card.classList.add('swiping');
        }
        // Live progress bar — shows how far through the swipe gesture you are
        const prog = getProgress();
        if (prog) {
            const progressFrac = Math.max(0, Math.min(1, Math.abs(frac - startFraction) / 0.7));
            prog.style.transform = `scaleX(${progressFrac})`;
        }
        // Live dim non-active rows
        updateLiveRowDim(frac);
        // update label dynamically
        const lbl = document.getElementById('calHandleLabel');
        if (lbl)
            lbl.textContent = frac > 0.5 ? 'Show week' : 'Show month';
        // live dot update
        renderWeekDots(getTotalWeekRows(), frac > 0.5 ? -1 : getCurrentWeekRow());
    }
    function onTouchEnd(e) {
        if (!isDragging || !isVertical) {
            isDragging = false;
            isVertical = false;
            return;
        }
        isDragging = false;
        isVertical = false;
        const dy = e.changedTouches[0].clientY - startY;
        const { collapsedH, expandedH } = getCalHeights();
        const travel = expandedH - collapsedH;
        const frac = startFraction + (travel > 0 ? dy / travel : 0);
        // Flick detection — commit even with small travel if velocity is high enough
        const isFlickDown = velocity > FLICK_VEL;
        const isFlickUp = velocity < -FLICK_VEL;
        // Decide to commit or revert
        const prevExpanded = calExpanded;
        if (!calExpanded) {
            if (frac > COMMIT_FRAC || isFlickDown)
                calExpanded = true;
        }
        else {
            if (frac < 1 - COMMIT_FRAC || isFlickUp)
                calExpanded = false;
        }
        if (calExpanded !== prevExpanded)
            haptic('light');
        // Reset progress bar
        const prog = getProgress();
        if (prog)
            prog.style.transform = 'scaleX(0)';
        clearLiveRowDim();
        if (!calExpanded && dy > 0)
            spawnRipple(getCard()?.getBoundingClientRect() ?? { left: 0, top: 0, width: 300, height: 200 });
        applyCalHeight(true, Math.abs(velocity));
        getCard()?.classList.remove('swiping');
    }
    function attachListeners() {
        const c = getCard();
        if (!c)
            return;
        c.addEventListener('touchstart', onTouchStart, { passive: true });
        c.addEventListener('touchmove', onTouchMove, { passive: false });
        c.addEventListener('touchend', onTouchEnd, { passive: true });
        c.addEventListener('touchcancel', onTouchEnd, { passive: true });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachListeners);
    }
    else {
        attachListeners();
    }
})();
// ══ DAY MODAL ══
function openDay(bY, bM, bD) {
    haptic('light');
    selectedDay = { y: bY, m: bM, d: bD };
    renderSelectedDay();
    render();
    closeAll();
    const ad = bsToAd(bY, bM, bD);
    const wd = ad.getDay();
    const ti = getTithi(ad) - 1;
    const paksha = TPAKSHA[ti], tname = TNAMES[ti];
    const wdStr = lang === 'ne' ? WDNE[wd] : WDEN[wd];
    const adStr = `${wdStr}, ${ADMEN[ad.getMonth()]} ${ad.getDate()}, ${ad.getFullYear()}`;
    document.getElementById('mnum').textContent = ns(bD);
    document.getElementById('mmon').textContent = `${lang === 'ne' ? MNE[bM - 1] : MEN[bM - 1]} ${ns(bY)}`;
    document.getElementById('mad').textContent = adStr;
    document.getElementById('mtithi').textContent = `${paksha} ${tname}`;
    const panchEl = document.getElementById('mpanchang');
    if (panchEl && typeof getPanchangText === 'function')
        panchEl.textContent = getPanchangText(ad);
    // Day diff badge
    const tm = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const sm = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
    const df = msDay(tm, sm);
    let badges = '';
    if (df === 0) {
        badges += `<span class="bdg bdg-t">🌟 Today</span>`;
    }
    else if (df > 0) {
        badges += `<span class="bdg bdg-f">⏳ ${df} day${df > 1 ? 's' : ''} remaining</span>`;
    }
    else {
        const ago = -df;
        badges += `<span class="bdg bdg-p">📆 ${ago} day${ago > 1 ? 's' : ''} ago</span>`;
    }
    // Holiday badge
    const h = HOL[hk(bY, bM, bD)];
    if (h && cfg.holn) {
        const hn = lang === 'ne' ? h.np : h.en;
        badges += `<span class="bdg bdg-h">🇳🇵 Public Holiday · ${hn}</span>`;
    }
    // Observance badge
    const obs = OBS[hk(bY, bM, bD)];
    if (obs) {
        const on = lang === 'ne' ? obs.np : obs.en;
        badges += `<span class="bdg" style="background:var(--chip-evt-bg);color:var(--chip-evt-text);">🎀 ${on}</span>`;
    }
    document.getElementById('mbadges').innerHTML = badges;
    // User events for this day
    const dayEvts = userEvents.filter(ev => eventMatchesDate(ev, bY, bM, bD));
    const evtRow = document.getElementById('mEvtRow');
    const evtList = document.getElementById('mEvtList');
    if (dayEvts.length > 0) {
        evtRow.style.display = 'flex';
        evtList.innerHTML = dayEvts.map(ev => {
            return `
      <div style="padding:10px 11px;background:var(--card);border-radius:14px;border:1px solid var(--panel-border);border-left:3px solid var(--tgon);">
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-size:13px;font-weight:800;color:var(--panel-text);">${esc(ev.title)}</span>
          ${ev.startTime ? `<span style="font-size:11px;font-weight:700;color:var(--panel-muted);margin-left:auto;">⏰ ${esc(ev.startTime)}${ev.endTime ? ' – ' + esc(ev.endTime) : ''}</span>` : ''}
          <button title="Add to Calendar" onclick="event.stopPropagation();addEventToCalendar(${ev.adMs})" style="background:none;border:none;padding:2px;cursor:pointer;color:var(--panel-muted);flex-shrink:0;${ev.startTime ? '' : 'margin-left:auto;'}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg></button>
        </div>
        <div style="font-size:11px;color:var(--panel-muted);margin-top:4px;">${formatEventRange(ev)}</div>
        ${ev.note ? `<div style="font-size:11px;color:var(--panel-muted);margin-top:3px;">${esc(ev.note)}</div>` : ''}
        ${ev.repeatYearly ? `<div style="margin-top:4px;"><span style="font-size:10px;background:rgba(99,102,241,.15);color:#6366f1;border-radius:6px;padding:1px 5px;font-weight:800;">🔁 Yearly</span></div>` : ''}
      </div>`;
        }).join('');
    }
    else {
        evtRow.style.display = 'none';
    }
    document.getElementById('ov').classList.add('open');
    document.getElementById('dmodal').classList.add('open');
}
// ── Close a cycle-fullscreen sheet and restore the previous tab/view ──
function closeCycleSheet() {
    haptic('light');
    // Remove cycle-dim from phone
    document.querySelector('.phone')?.classList.remove('cycle-dim');
    // Close all sheets/overlay
    document.getElementById('ov').classList.remove('open');
    ['langSheet', 'addSheet', 'dmodal', 'mpSheet', 'echoSheet', 'colorMatcherSheet', 'pomodoroSheet', 'converterSheet', 'sharedProfileSheet', 'changelogSheet', 'privacySheet', 'bdtSheet', 'kharchaSheet', 'alarmsSheet', 'insightsSheet', 'familySheet'].forEach(id => document.getElementById(id)?.classList.remove('open'));
    if (window.cmState && window.cmState.running)
        window.cmStopGame && window.cmStopGame();
    if (window.pomoState && window.pomoState.running) {
        window.pomoToggle && window.pomoToggle();
    }
    if (window.tasksFlushSave)
        window.tasksFlushSave();
    // Restore whatever tab was active before this sheet opened
    const prev = window._cycleSheetPrevTab || null;
    const prevSettings = window._cycleSheetPrevSettings || false;
    window._cycleSheetPrevTab = null;
    window._cycleSheetPrevSettings = false;
    if (prevSettings) {
        document.getElementById('settingsView')?.classList.add('active');
    }
    else if (prev && typeof switchTab === 'function') {
        switchTab(prev);
    }
}
// ══ SHEETS ══
function closeAll() {
    haptic('light');
    document.getElementById('ov').classList.remove('open');
    ['langSheet', 'addSheet', 'dmodal', 'mpSheet', 'echoSheet', 'colorMatcherSheet', 'pomodoroSheet', 'converterSheet', 'sharedProfileSheet', 'changelogSheet', 'privacySheet', 'bdtSheet', 'kharchaSheet', 'alarmsSheet', 'insightsSheet', 'familySheet'].forEach(id => document.getElementById(id)?.classList.remove('open'));
    // Also deactivate settings tab view if open
    document.getElementById('settingsView')?.classList.remove('active');
    // Stop color matcher game if running
    if (window.cmState && window.cmState.running)
        window.cmStopGame && window.cmStopGame();
    // Pause pomodoro timer if running (don't stop — just pause so state persists)
    if (window.pomoState && window.pomoState.running) {
        window.pomoToggle && window.pomoToggle();
    }
    // Flush any pending task edits
    if (window.tasksFlushSave)
        window.tasksFlushSave();
    document.querySelector('.phone')?.classList.remove('cycle-dim');
}
// ══ DARK MODE ══
function toggleDark() {
    haptic('light');
    // A manual toggle is an explicit override — turn off Auto Theme so it sticks.
    if (autoTheme) {
        autoTheme = false;
        localStorage.setItem('vikram_theme_auto', '0');
        const tgA = document.getElementById('tgAutoTheme');
        if (tgA)
            tgA.classList.remove('on');
        if (_autoThemeTimer) {
            clearInterval(_autoThemeTimer);
            _autoThemeTimer = null;
        }
    }
    dark = !dark;
    applyTheme();
    localStorage.setItem('vikram_theme', dark ? 'dark' : 'light');
}
function applyTheme() {
    const root = document.documentElement;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.style.colorScheme = dark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta)
        meta.setAttribute('content', dark ? '#0d0f16' : '#ECEEF8');
    // Settings toggle
    const tg = document.getElementById('tgDark');
    if (tg)
        tg.classList.toggle('on', dark);
    const lbl = document.getElementById('sAppearLbl');
    const sub = document.getElementById('sAppearSub');
    const icon = document.getElementById('sAppearIcon');
    if (lbl)
        lbl.textContent = dark ? 'Dark Mode' : 'Light Mode';
    if (sub)
        sub.textContent = dark ? 'Currently using dark theme' : 'Currently using light theme';
    if (icon) {
        icon.textContent = dark ? '🌙' : '☀️';
        icon.style.background = dark ? 'rgba(80,90,180,.15)' : 'rgba(240,180,40,.15)';
    }
    // Header dark-mode button icon (in settings sheet)
    const hdrBtn = document.getElementById('darkModeBtnIcon');
    if (hdrBtn) {
        hdrBtn.innerHTML = dark
            ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
            : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    }
    render();
    renderUpcoming();
    renderSelectedDay();
    renderCycleSheet();
    renderGcalCard();
    updateNotifCard();
}
// ══ AUTO THEME (SUNRISE / SUNSET) ══
let autoTheme = (function () {
    try {
        return localStorage.getItem('vikram_theme_auto') === '1';
    }
    catch (e) {
        return false;
    }
})();
let _autoThemeTimer = null;
// Returns {sunrise,sunset} as minutes-of-day in Nepal Standard Time, reusing the
// same approximate solar calculation already used for Panchang / Rahu Kaal.
function _autoThemeSunTimesNPT() {
    const st = _panchangSunTimes(new Date());
    let sunrise = ((st.sunriseMin + 5 * 60 + 45) % 1440 + 1440) % 1440;
    let sunset = ((st.sunsetMin + 5 * 60 + 45) % 1440 + 1440) % 1440;
    return { sunrise, sunset };
}
function _autoThemeNowMinNPT() {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kathmandu', hour12: false, hour: '2-digit', minute: '2-digit' }).formatToParts(new Date());
    return (+p.find(x => x.type === 'hour').value) * 60 + (+p.find(x => x.type === 'minute').value);
}
function computeAutoDark() {
    try {
        const { sunrise, sunset } = _autoThemeSunTimesNPT();
        const now = _autoThemeNowMinNPT();
        return !(now >= sunrise && now < sunset);
    }
    catch (e) {
        return dark;
    }
}
// Applies the sunrise/sunset-derived theme without touching the manual
// 'vikram_theme' preference, so turning Auto Theme off restores it exactly.
function applyAutoThemeNow() {
    if (!autoTheme)
        return;
    const shouldBeDark = computeAutoDark();
    if (shouldBeDark !== dark) {
        dark = shouldBeDark;
        applyTheme();
    }
}
function toggleAutoTheme() {
    haptic('light');
    autoTheme = !autoTheme;
    localStorage.setItem('vikram_theme_auto', autoTheme ? '1' : '0');
    const tg = document.getElementById('tgAutoTheme');
    if (tg)
        tg.classList.toggle('on', autoTheme);
    if (autoTheme) {
        applyAutoThemeNow();
        if (!_autoThemeTimer)
            _autoThemeTimer = setInterval(applyAutoThemeNow, 300000); // re-check every 5 min
    }
    else {
        if (_autoThemeTimer) {
            clearInterval(_autoThemeTimer);
            _autoThemeTimer = null;
        }
        // Restore whatever theme the person last picked manually
        const stored = localStorage.getItem('vikram_theme');
        dark = stored === 'dark' ? true : stored === 'light' ? false : dark;
        applyTheme();
    }
}
// ══ LANGUAGE ══
function toggleLang() {
    setLang(lang === 'en' ? 'ne' : 'en');
}
function setLang(l) {
    haptic('light');
    lang = l;
    document.documentElement.setAttribute('data-lang', l);
    // Settings language chips
    const cEN = document.getElementById('chipEN');
    const cNE = document.getElementById('chipNE');
    if (cEN)
        cEN.classList.toggle('on', l === 'en');
    if (cNE)
        cNE.classList.toggle('on', l === 'ne');
    const sub = document.getElementById('sLangSub');
    if (sub)
        sub.textContent = l === 'ne' ? 'Currently Nepali (नेपाली)' : 'Currently English';
    // Keep lang sheet checkmarks in sync
    document.getElementById('chkEN').classList.toggle('on', l === 'en');
    document.getElementById('chkNE').classList.toggle('on', l === 'ne');
    localStorage.setItem('vikram_lang', l);
    // Only close the lang sheet (not the whole settings view)
    document.getElementById('langSheet')?.classList.remove('open');
    document.getElementById('ov')?.classList.remove('open');
    render();
    renderUpcoming();
    renderSelectedDay();
}
// ══ SETTINGS ══
function togSetting(k, btn) {
    haptic('light');
    cfg[k] = !cfg[k];
    btn.classList.toggle('on', cfg[k]);
    try {
        localStorage.setItem('vikram_cfg', JSON.stringify(cfg));
    }
    catch (e) { }
    render();
}
function setFD(v, btn) {
    haptic('light');
    cfg.fd = v;
    btn.parentElement.querySelectorAll('.sv-chip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
    try {
        localStorage.setItem('vikram_cfg', JSON.stringify(cfg));
    }
    catch (e) { }
    render();
}
// ══ CONVERTER ══
let cvMode = 'ad';
function swConv(m) {
    cvMode = m;
    document.getElementById('tabAD').classList.toggle('on', m === 'ad');
    document.getElementById('tabBS').classList.toggle('on', m === 'bs');
    document.getElementById('panAD').style.display = m === 'ad' ? 'block' : 'none';
    document.getElementById('panBS').style.display = m === 'bs' ? 'block' : 'none';
    ['cvADout', 'cvBSout'].forEach(id => document.getElementById(id).classList.remove('show'));
}
function doConvAD() {
    const val = document.getElementById('cvADin').value;
    if (!val) {
        alert('Please select a date.');
        return;
    }
    const [y, mo, d] = val.split('-').map(Number);
    const bs = adToBs(new Date(y, mo - 1, d));
    const out = document.getElementById('cvADout');
    out.innerHTML = `🇳🇵 <strong>${bs.d} ${MEN[bs.m - 1]} ${bs.y} BS</strong><br><span style="font-size:12px;opacity:.7;">${MNE[bs.m - 1]} ${bs.d}, ${bs.y}</span>`;
    out.classList.add('show');
}
function doConvBS() {
    const y = +document.getElementById('cvBSy').value;
    const m = +document.getElementById('cvBSm').value;
    const d = +document.getElementById('cvBSd').value;
    if (!y || !m || !d) {
        alert('Please fill all fields.');
        return;
    }
    if (!BS[y]) {
        alert('Year out of supported range (2080–2086).');
        return;
    }
    const maxD = BS[y][m - 1];
    if (d < 1 || d > maxD) {
        alert(`Day must be between 1 and ${maxD} for this month.`);
        return;
    }
    const ad = bsToAd(y, m, d);
    const wd = WDEN[ad.getDay()];
    const out = document.getElementById('cvBSout');
    out.innerHTML = `📅 <strong>${wd}, ${ADMEN[ad.getMonth()]} ${ad.getDate()}, ${ad.getFullYear()} AD</strong>`;
    out.classList.add('show');
}
// ══ ADD EVENT ══
// ── SECURITY: HTML-escape helper ──────────────────────────────────────────
function esc(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
// ── SECURITY: CSS-value sanitiser (allows safe colour values only) ──────────
function safeCss(val, fallback) {
    // Allow hex colours, rgb/rgba, named colours that are strictly alphabetic
    if (typeof val !== 'string')
        return fallback || '';
    if (/^(#[0-9a-fA-F]{3,8}|rgba?\([^)]{0,60}\)|[a-zA-Z]{1,30})$/.test(val.trim()))
        return val.trim();
    return fallback || '';
}
let userEvents = (function () { try {
    return JSON.parse(localStorage.getItem('vikram_events') || '[]');
}
catch (e) {
    return [];
} })();
let upTab = 'hol';
// Sync birthday from profile into userEvents on startup —
// so it appears in Upcoming and Schedule without needing to open Profile.
(function initBirthdayFromProfile() {
    try {
        const p = JSON.parse(localStorage.getItem('vikram_profile') || '{}');
        if (p && p.bday && p.bday.y && p.bday.m && p.bday.d) {
            // Remove any stale birthday event already saved in vikram_events
            for (let i = userEvents.length - 1; i >= 0; i--) {
                if (userEvents[i].isBirthday)
                    userEvents.splice(i, 1);
            }
            // syncBirthdayEvent will be called after it's defined; store profile for it
            window._pendingBdayProfile = p;
        }
    }
    catch (e) { }
})();
function saveEvents() {
    try {
        localStorage.setItem('vikram_events', JSON.stringify(userEvents));
    }
    catch (e) {
        if (e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014)) {
            // Storage full — try to free space by pruning dispensable keys, then retry
            _lsPrune();
            try {
                localStorage.setItem('vikram_events', JSON.stringify(userEvents));
            }
            catch (e2) { }
        }
    }
}
// ── LocalStorage quota helper ──────────────────────────────────────────────
// Called whenever a setItem fails with QuotaExceededError.
// Removes low-priority cached keys first (SW blob, pomo stats, then oldest events).
function _lsPrune() {
    const disposable = ['vikram_sw_blob', 'vikram_pomo_stats', 'vikram_pomo_todos'];
    disposable.forEach(k => { try {
        localStorage.removeItem(k);
    }
    catch (e) { } });
    // If still not enough, drop past events (keep most recent 50)
    try {
        const evts = JSON.parse(localStorage.getItem('vikram_events') || '[]');
        if (evts.length > 50) {
            evts.sort((a, b) => (b.adMs || 0) - (a.adMs || 0));
            localStorage.setItem('vikram_events', JSON.stringify(evts.slice(0, 50)));
        }
    }
    catch (e) { }
}
// Safe localStorage wrapper used for all non-critical writes
function _lsSet(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch (e) {
        if (e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014)) {
            _lsPrune();
            try {
                localStorage.setItem(key, value);
            }
            catch (e2) { }
        }
    }
}
// Populate the day dropdown based on selected year+month
function updateDayOpts(prefix = 'evBs') {
    const y = +document.getElementById(`${prefix}Y`).value;
    const m = +document.getElementById(`${prefix}M`).value;
    const max = BS[y]?.[m - 1] ?? 30;
    const sel = document.getElementById(`${prefix}D`);
    const cur = +sel.value || 1;
    sel.innerHTML = Array.from({ length: max }, (_, i) => `<option value="${i + 1}"${i + 1 === cur ? ' selected' : ''}>${i + 1}</option>`).join('');
}
function setEventRange(startY, startM, startD, endY = startY, endM = startM, endD = startD) {
    document.getElementById('evBsY').value = startY;
    document.getElementById('evBsM').value = startM;
    updateDayOpts('evBs');
    document.getElementById('evBsD').value = startD;
    document.getElementById('evEndBsY').value = endY;
    document.getElementById('evEndBsM').value = endM;
    updateDayOpts('evEndBs');
    document.getElementById('evEndBsD').value = endD;
}
function getEventRangeMid(ev) {
    const start = new Date(ev.adMs);
    const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endBase = new Date(ev.endAdMs ?? ev.adMs);
    const endMid = new Date(endBase.getFullYear(), endBase.getMonth(), endBase.getDate());
    return endMid >= startMid ? { startMid, endMid } : { startMid: endMid, endMid: startMid };
}
function eventMatchesDate(ev, y, m, d) {
    const day = bsToAd(y, m, d);
    const dayMid = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const { startMid, endMid } = getEventRangeMid(ev);
    const spanDays = Math.round((+endMid - +startMid) / 86400000);
    // No recurrence — simple range check
    if (!ev.recur && !ev.repeatYearly) {
        return dayMid >= startMid && dayMid <= endMid;
    }
    // Legacy yearly toggle (backward compat)
    if (ev.repeatYearly && !ev.recur) {
        if (y < ev.bsY)
            return false;
        if (spanDays <= 0)
            return m === ev.bsM && d === ev.bsD;
        const vStart = bsToAd(y, ev.bsM, ev.bsD);
        const vSMid = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        const vEMid = new Date(vSMid.getTime() + spanDays * 86400000);
        return dayMid >= vSMid && dayMid <= vEMid;
    }
    // Full recurrence engine
    const r = ev.recur;
    if (!r || !r.freq)
        return dayMid >= startMid && dayMid <= endMid;
    if (dayMid < startMid)
        return false;
    // Check end condition
    if (r.endType === 'date' && r.endAdMs) {
        const endD = new Date(r.endAdMs);
        const endDMid = new Date(endD.getFullYear(), endD.getMonth(), endD.getDate());
        if (dayMid > endDMid)
            return false;
    }
    const msDay = 86400000;
    const interval = r.interval || 1;
    const diffDays = Math.round((+dayMid - +startMid) / msDay);
    function occurrenceContains(occStartMid) {
        return dayMid >= occStartMid && dayMid <= new Date(occStartMid.getTime() + spanDays * msDay);
    }
    if (r.freq === 'daily') {
        if (diffDays < 0 || diffDays % interval !== 0)
            return false;
        const occN = Math.floor(diffDays / interval);
        if (r.endType === 'count' && occN >= (r.endCount || 1))
            return false;
        const occStart = new Date(startMid.getTime() + occN * interval * msDay);
        return occurrenceContains(occStart);
    }
    if (r.freq === 'weekly') {
        const weekdays = r.weekdays && r.weekdays.length ? r.weekdays : [startMid.getDay()];
        const dayOfWeek = dayMid.getDay();
        if (!weekdays.includes(dayOfWeek))
            return false;
        const weeksDiff = Math.floor(diffDays / 7);
        if (weeksDiff < 0 || weeksDiff % interval !== 0)
            return false;
        if (r.endType === 'count') {
            // Count individual occurrences up to and including dayMid
            let count = 0;
            const msD = 86400000;
            for (let w = 0; w * interval * 7 * msD <= +dayMid - +startMid; w++) {
                const wkStart = new Date(startMid.getTime() + w * interval * 7 * msD);
                weekdays.forEach(wd => {
                    const dayDiff2 = ((wd - wkStart.getDay()) + 7) % 7;
                    const occD = new Date(wkStart.getTime() + dayDiff2 * msD);
                    if (occD >= startMid && occD <= dayMid)
                        count++;
                });
            }
            if (count > (r.endCount || 1))
                return false;
        }
        return true;
    }
    if (r.freq === 'monthly') {
        // Match if dayMid falls in any occurrence month (same day-of-month as event start)
        const startDOM = startMid.getDate();
        // Clamp startDOM to actual days in target month to handle e.g. event on day 31 in a 30-day month
        const daysInDayMonth = new Date(dayMid.getFullYear(), dayMid.getMonth() + 1, 0).getDate();
        const effectiveDOM = Math.min(startDOM, daysInDayMonth);
        if (dayMid.getDate() < effectiveDOM || dayMid.getDate() > effectiveDOM + spanDays)
            return false;
        // months elapsed
        const monthsElapsed = (dayMid.getFullYear() - startMid.getFullYear()) * 12
            + (dayMid.getMonth() - startMid.getMonth());
        if (monthsElapsed < 0 || monthsElapsed % interval !== 0)
            return false;
        if (r.endType === 'count') {
            const occN = Math.floor(monthsElapsed / interval);
            if (occN >= (r.endCount || 1))
                return false;
        }
        const tgtYear2 = startMid.getFullYear();
        const tgtMonth2 = startMid.getMonth() + monthsElapsed;
        const daysInMonth2 = new Date(tgtYear2, tgtMonth2 + 1, 0).getDate();
        const clampedDay2 = Math.min(startMid.getDate(), daysInMonth2);
        const occStart = new Date(tgtYear2, tgtMonth2, clampedDay2);
        return occurrenceContains(occStart);
    }
    if (r.freq === 'yearly') {
        if (y < ev.bsY)
            return false;
        const yearsElapsed = y - ev.bsY;
        if (yearsElapsed % interval !== 0)
            return false;
        if (r.endType === 'count') {
            const occN = Math.floor(yearsElapsed / interval);
            if (occN >= (r.endCount || 1))
                return false;
        }
        if (spanDays <= 0)
            return m === ev.bsM && d === ev.bsD;
        const vStart = bsToAd(y, ev.bsM, ev.bsD);
        const vSMid = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
        return occurrenceContains(vSMid);
    }
    return dayMid >= startMid && dayMid <= endMid;
}
function formatEventRange(ev) {
    const { startMid, endMid } = getEventRangeMid(ev);
    const startStr = `${ADMEN[startMid.getMonth()]} ${startMid.getDate()}, ${startMid.getFullYear()}`;
    const endStr = `${ADMEN[endMid.getMonth()]} ${endMid.getDate()}, ${endMid.getFullYear()}`;
    if (startMid.getTime() === endMid.getTime())
        return startStr;
    const days = Math.round((+endMid - +startMid) / 86400000) + 1;
    return `${startStr} to ${endStr} · ${days} days`;
}
// ── Safe sheet renderer: wraps each render call so a JS error shows a
//    retry button instead of leaving the body permanently blank. ──────────────
function _safeRenderSheet(bodyId, renderFn, sheetName) {
    const body = document.getElementById(bodyId);
    if (!body)
        return;
    try {
        renderFn();
    }
    catch (err) {
        console.error('[Vikram] ' + sheetName + ' render error:', err);
        body.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:40px 24px;text-align:center;height:100%;">
      <div style="font-size:36px;">⚠️</div>
      <div style="font-size:15px;font-weight:800;color:var(--dtext);">${sheetName} failed to load</div>
      <div style="font-size:12px;color:var(--dsub);line-height:1.6;">Something went wrong rendering this screen.<br>Tap Retry to try again.</div>
      <button onclick="(function(){document.getElementById('${bodyId}').innerHTML='';_safeRenderSheet('${bodyId}',window['_vikramRender_${bodyId}'],'${sheetName}');})()" style="padding:11px 28px;border-radius:12px;border:none;background:var(--tgon,#1a1a1a);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">Retry</button>
    </div>`;
    }
}
function openSheet(t) {
    haptic('light');
    if (t === 'notes') {
        switchTab('notes');
        return;
    }
    if (t === 'settings') {
        switchTab('settings');
        return;
    }
    if (t === 'profile') {
        switchTab('profile');
        return;
    }
    const settingsWasActive = document.getElementById('settingsView')?.classList.contains('active');
    closeAll();
    if (settingsWasActive)
        document.getElementById('settingsView')?.classList.add('active');
    const ids = { lang: 'langSheet', add: 'addSheet', echo: 'echoSheet', colorMatcher: 'colorMatcherSheet', pomodoro: 'pomodoroSheet', converter: 'converterSheet', sharedProfile: 'sharedProfileSheet', kharcha: 'kharchaSheet', alarms: 'alarmsSheet', insights: 'insightsSheet', family: 'familySheet' };
    const sheet = document.getElementById(ids[t]);
    // cycle-fullscreen sheets cover the entire screen themselves — no overlay needed
    const isFullscreen = sheet && sheet.classList.contains('cycle-fullscreen');
    if (isFullscreen) {
        // Save state so closeCycleSheet() can restore it
        window._cycleSheetPrevSettings = settingsWasActive;
        window._cycleSheetPrevTab = typeof _currentTab !== 'undefined' ? _currentTab : 'home';
    }
    if (!isFullscreen)
        document.getElementById('ov').classList.add('open');
    sheet?.classList.add('open');
    if (t === 'echo') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderEchoSheet === 'function') {
            window._vikramRender_echoBody = window.renderEchoSheet;
            _safeRenderSheet('echoBody', window.renderEchoSheet, 'Echo');
        }
    }
    if (t === 'colorMatcher') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderColorMatcherSheet === 'function') {
            window._vikramRender_cmBody = window.renderColorMatcherSheet;
            _safeRenderSheet('cmBody', window.renderColorMatcherSheet, 'Color Matcher');
        }
    }
    if (t === 'pomodoro') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderPomodoroSheet === 'function') {
            window._vikramRender_pomodoroBody = window.renderPomodoroSheet;
            _safeRenderSheet('pomodoroBody', window.renderPomodoroSheet, 'Focus Timer');
        }
    }
    if (t === 'converter') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderConverterSheet === 'function') {
            window._vikramRender_converterBody = window.renderConverterSheet;
            _safeRenderSheet('converterBody', window.renderConverterSheet, 'Date Converter');
        }
    }
    if (t === 'tasks') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (window.tasksShowList)
            window.tasksShowList();
    }
    if (t === 'kharcha') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderKharchaSheet === 'function') {
            window._vikramRender_kharchaBody = window.renderKharchaSheet;
            _safeRenderSheet('kharchaBody', window.renderKharchaSheet, 'Kharcha');
        }
    }
    if (t === 'alarms') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderAlarmsSheet === 'function') {
            window._vikramRender_alarmsBody = window.renderAlarmsSheet;
            _safeRenderSheet('alarmsBody', window.renderAlarmsSheet, 'Alarms');
        }
    }
    if (t === 'insights') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderInsightsSheet === 'function') {
            window._vikramRender_insightsBody = window.renderInsightsSheet;
            _safeRenderSheet('insightsBody', window.renderInsightsSheet, "Today's Update");
        }
    }
    if (t === 'family') {
        document.querySelector('.phone')?.classList.add('cycle-dim');
        if (typeof window.renderFamilySheet === 'function') {
            window._vikramRender_familyBody = window.renderFamilySheet;
            _safeRenderSheet('familyBody', window.renderFamilySheet, 'Family Share');
        }
    }
    if (t === 'settings') { /* handled by switchTab('settings') */ }
    if (t === 'profile') { /* handled by switchTab('profile') */ }
    if (t === 'add') {
        // Default date = today BS
        setEventRange(TODAYBS.y, TODAYBS.m, TODAYBS.d);
        resetRecurPanel();
        // Reset category picker to Personal; profileEditEvent() re-selects the
        // correct category right after this if it's actually an edit.
        const catPicker = document.getElementById('evColorPicker');
        if (catPicker) {
            const defaultBtn = catPicker.querySelector('[data-color="personal"]');
            if (defaultBtn && typeof selectEvCat === 'function')
                selectEvCat(defaultBtn);
        }
        setTimeout(() => { initSegTrack(); document.getElementById('evT').focus(); }, 360);
    }
}
// Called from day modal to pre-fill date
function openAddForDay(bsY, bsM, bsD) {
    haptic('light');
    window._profileEditIdx = null;
    const titleEl = document.getElementById('addTitle');
    if (titleEl)
        titleEl.textContent = 'New Event';
    selectedDay = { y: bsY, m: bsM, d: bsD };
    renderSelectedDay();
    clearEvTime();
    openSheet('add');
    setTimeout(() => {
        setEventRange(bsY, bsM, bsD);
    }, 50);
}
// Open add sheet with a pre-filled time (called from week view tap)
function openAddForDayTime(bsY, bsM, bsD, startH, startMin) {
    haptic('light');
    window._profileEditIdx = null;
    const titleEl = document.getElementById('addTitle');
    if (titleEl)
        titleEl.textContent = 'New Event';
    selectedDay = { y: bsY, m: bsM, d: bsD };
    renderSelectedDay();
    openSheet('add');
    setTimeout(() => {
        setEventRange(bsY, bsM, bsD);
        const pad = n => String(n).padStart(2, '0');
        const endH = (startH + 1) % 24;
        const st = document.getElementById('evStartTime');
        const et = document.getElementById('evEndTime');
        if (st)
            st.value = `${pad(startH)}:${pad(startMin)}`;
        if (et)
            et.value = `${pad(endH)}:${pad(startMin)}`;
        onEvTimeChange();
    }, 50);
}
// Time field helpers
function onEvTimeChange() {
    const st = document.getElementById('evStartTime');
    const et = document.getElementById('evEndTime');
    const lbl = document.getElementById('evTimeAllDayLabel');
    const clearBtn = document.getElementById('evTimeClearBtn');
    const hasTime = st && st.value;
    if (lbl)
        lbl.style.display = hasTime ? 'none' : '';
    if (clearBtn)
        clearBtn.style.display = hasTime ? '' : 'none';
    // Auto set end time to start+1h if end is empty
    if (st && st.value && et && !et.value) {
        const [h, m] = st.value.split(':').map(Number);
        const endH = (h + 1) % 24;
        et.value = `${String(endH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
}
function clearEvTime() {
    const st = document.getElementById('evStartTime');
    const et = document.getElementById('evEndTime');
    const lbl = document.getElementById('evTimeAllDayLabel');
    const clearBtn = document.getElementById('evTimeClearBtn');
    if (st)
        st.value = '';
    if (et)
        et.value = '';
    if (lbl) {
        lbl.style.display = '';
    }
    if (clearBtn)
        clearBtn.style.display = 'none';
}
// ══ NOTIFICATIONS ══
let notifEnabled = localStorage.getItem('vikram_notif_enabled') !== 'false';
// ── Notification history (what the user actually received, shown in Profile) ──
const NOTIF_HIST_KEY = 'vikram_notif_history';
const NOTIF_HIST_MAX = 50;
function loadNotifHistory() {
    try {
        return JSON.parse(localStorage.getItem(NOTIF_HIST_KEY) || '[]');
    }
    catch (e) {
        return [];
    }
}
function saveNotifHistory(list) {
    try {
        localStorage.setItem(NOTIF_HIST_KEY, JSON.stringify(list));
    }
    catch (e) { }
}
function logNotifHistory(title, body, tag) {
    const list = loadNotifHistory();
    list.unshift({ id: Date.now() + '_' + Math.random().toString(36).slice(2, 7), title, body: body || '', tag: tag || '', ts: Date.now() });
    if (list.length > NOTIF_HIST_MAX)
        list.length = NOTIF_HIST_MAX;
    saveNotifHistory(list);
    updateNotifBadges();
    renderNotifHistory();
}
function getNotifUnreadCount() {
    const lastSeen = Number(localStorage.getItem('vikram_notif_lastseen') || 0);
    return loadNotifHistory().filter(n => n.ts > lastSeen).length;
}
function markNotifsSeen() {
    localStorage.setItem('vikram_notif_lastseen', String(Date.now()));
    updateNotifBadges();
}
function updateNotifBadges() {
    const count = getNotifUnreadCount();
    document.querySelectorAll('.notif-dot').forEach(el => {
        el.style.display = count > 0 ? 'flex' : 'none';
        el.textContent = count > 9 ? '9+' : String(count);
    });
    document.querySelectorAll('.notif-dot-mini').forEach(el => {
        el.style.display = count > 0 ? 'block' : 'none';
    });
}
function relTimeShort(ts) {
    const diff = Math.max(0, Date.now() - ts);
    const min = Math.floor(diff / 60000);
    if (min < 1)
        return lang === 'ne' ? 'अहिले' : 'Just now';
    if (min < 60)
        return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24)
        return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7)
        return `${day}d ago`;
    const d = new Date(ts);
    return `${ADMEN[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}
function renderNotifHistory() {
    const wrap = document.getElementById('profileNotifList');
    if (!wrap)
        return;
    const list = loadNotifHistory();
    if (list.length === 0) {
        wrap.innerHTML = `<div class="notif-hist-empty">🔕 No notifications yet<br>Event reminders and alerts will show up here</div>`;
        return;
    }
    wrap.innerHTML = list.map(n => {
        const icoMatch = (String(n.title || '')).match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u);
        const ico = icoMatch ? icoMatch[0] : '🔔';
        const titleText = String(n.title || '').replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u, '');
        return `<div class="notif-hist-item">
      <div class="notif-hist-ico">${ico}</div>
      <div class="notif-hist-body">
        <div class="notif-hist-title">${esc(titleText)}</div>
        ${n.body ? `<div class="notif-hist-sub">${esc(n.body)}</div>` : ''}
        <div class="notif-hist-time">${relTimeShort(n.ts)}</div>
      </div>
    </div>`;
    }).join('');
}
function clearNotifHistory() {
    haptic('medium');
    saveNotifHistory([]);
    renderNotifHistory();
    updateNotifBadges();
    vikramToast('🗑️ Notifications cleared');
}
async function requestNotifPerm() {
    if (!('Notification' in window))
        return 'unsupported';
    if (Notification.permission === 'granted')
        return 'granted';
    if (Notification.permission === 'denied')
        return 'denied';
    return await Notification.requestPermission();
}
async function showNotif(title, body, tag = 'vikram') {
    if (!('Notification' in window) || Notification.permission !== 'granted')
        return;
    logNotifHistory(title, body, tag);
    const opts = { body, tag, icon: './icons/icon-192.png', badge: './icons/favicon-32.png',
        vibrate: [200, 100, 200], requireInteraction: false };
    if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'NOTIFY', title, ...opts });
    }
    else {
        try {
            new Notification(title, opts);
        }
        catch (e) { }
    }
}
function updateNotifCard() {
    const card = document.getElementById('notifCard');
    const lbl = document.getElementById('notifLbl');
    const sub = document.getElementById('notifSub');
    const tgl = document.getElementById('notifTgl');
    if (!card)
        return;
    if (!('Notification' in window)) {
        card.style.display = 'none';
        return;
    }
    card.style.display = '';
    const perm = Notification.permission;
    const active = perm === 'granted' && notifEnabled;
    if (tgl) {
        tgl.classList.toggle('on', active);
        tgl.disabled = perm === 'denied';
        tgl.style.opacity = perm === 'denied' ? '.4' : '1';
    }
    if (perm === 'denied') {
        lbl.textContent = 'Notifications Blocked';
        sub.textContent = 'Enable in browser Settings → Site Settings';
    }
    else {
        lbl.textContent = 'Event Reminders';
        sub.textContent = active
            ? '30 min · 2 hr · 1 day before events'
            : perm === 'granted'
                ? 'Reminders paused — tap to turn on'
                : 'Tap to allow · 30 min · 2 hr · 1 day before';
    }
}
async function handleNotifToggle() {
    if (!('Notification' in window))
        return;
    if (Notification.permission === 'denied')
        return;
    if (Notification.permission !== 'granted') {
        const p = await requestNotifPerm();
        if (p !== 'granted') {
            updateNotifCard();
            return;
        }
        notifEnabled = true;
    }
    else {
        notifEnabled = !notifEnabled;
    }
    localStorage.setItem('vikram_notif_enabled', notifEnabled ? 'true' : 'false');
    updateNotifCard();
}
// Fire reminders: 30 min before, 2 hr before, and 1 day before events
async function checkEventReminders() {
    if (!notifEnabled)
        return;
    if (!('Notification' in window) || Notification.permission !== 'granted')
        return;
    // Current Nepal Standard Time (UTC+5:45)
    const nowMs = Date.now() + 345 * 60000;
    const WINDOW_MS = 2 * 60 * 1000; // 2-minute fire window to avoid missing triggers
    for (const ev of userEvents) {
        // Event anchor = noon NST of the event date = 06:15 UTC on that day
        const evDate = new Date(ev.adMs);
        const evNoon = Date.UTC(evDate.getUTCFullYear(), evDate.getUTCMonth(), evDate.getUTCDate(), 6, 15);
        const mName = MEN[ev.bsM - 1];
        const dateStr = `${ev.bsD} ${mName} ${ev.bsY} BS${ev.note ? ' · ' + ev.note : ''}`;
        // 1 day before
        const minus1day = evNoon - 24 * 60 * 60 * 1000;
        const key1day = `vn_1d_${ev.adMs}`;
        if (!localStorage.getItem(key1day) && nowMs >= minus1day && nowMs < minus1day + WINDOW_MS) {
            localStorage.setItem(key1day, '1');
            await showNotif(`📅 Tomorrow: ${ev.title}`, `Event tomorrow · ${dateStr}`, `1day-${ev.adMs}`);
        }
        // 2 hours before
        const minus2hr = evNoon - 2 * 60 * 60 * 1000;
        const key2hr = `vn_2h_${ev.adMs}`;
        if (!localStorage.getItem(key2hr) && nowMs >= minus2hr && nowMs < minus2hr + WINDOW_MS) {
            localStorage.setItem(key2hr, '1');
            await showNotif(`⏰ In 2 hours: ${ev.title}`, `Starting in 2 hours · ${dateStr}`, `2hr-${ev.adMs}`);
        }
        // 30 minutes before
        const minus30min = evNoon - 30 * 60 * 1000;
        const key30min = `vn_30m_${ev.adMs}`;
        if (!localStorage.getItem(key30min) && nowMs >= minus30min && nowMs < minus30min + WINDOW_MS) {
            localStorage.setItem(key30min, '1');
            await showNotif(`🔔 In 30 min: ${ev.title}`, `Starting in 30 minutes · ${dateStr}`, `30min-${ev.adMs}`);
        }
    }
}
// ── Today glance card (Home tab): events, tasks, habits, cycle phase ───────
function renderTodayCard() {
    const rowsEl = document.getElementById('todayCardRows');
    const dateEl = document.getElementById('todayCardDate');
    if (!rowsEl)
        return;
    try {
        if (dateEl) {
            const mArr = (typeof lang !== 'undefined' && lang === 'ne' && typeof MNE !== 'undefined') ? MNE : MEN;
            dateEl.textContent = `${TODAYBS.d} ${mArr[TODAYBS.m - 1]} ${TODAYBS.y} BS`;
        }
        // Events + holidays happening today (reuses renderUpcoming's already-expanded cache)
        const todayItems = (window._todayItemsCache || []).filter(it => it.type === 'evt' || it.type === 'hol' || it.type === 'obs');
        const evtCount = todayItems.length;
        const evtNames = todayItems.slice(0, 2).map(it => it.type === 'evt' ? it.ev.title : (it.hol ? it.hol.en : (it.obs ? it.obs.en : ''))).filter(Boolean);
        const evtSub = evtCount === 0 ? 'Nothing scheduled' : (evtNames.join(', ') + (evtCount > evtNames.length ? ` +${evtCount - evtNames.length} more` : ''));
        // Tasks due today / overdue
        let tasks = [];
        try {
            tasks = JSON.parse(localStorage.getItem('vikram_tasks_v1') || '[]');
        }
        catch (e) { }
        const todayStr = `${TODAY.getFullYear()}-${String(TODAY.getMonth() + 1).padStart(2, '0')}-${String(TODAY.getDate()).padStart(2, '0')}`;
        const dueToday = tasks.filter(t => !t.done && t.due === todayStr);
        const overdue = tasks.filter(t => !t.done && t.due && t.due < todayStr);
        const taskCount = dueToday.length + overdue.length;
        const taskSub = tasks.length === 0 ? 'No tasks yet' : (taskCount === 0 ? 'All caught up 🎉' : (overdue.length ? `${overdue.length} overdue, ${dueToday.length} due today` : `${dueToday.length} due today`));
        // Habits not yet checked in today
        let habits = [];
        try {
            habits = JSON.parse(localStorage.getItem('vikram_daycounters') || '[]');
        }
        catch (e) { }
        const hToday = `${TODAY.getFullYear()}-${TODAY.getMonth() + 1}-${TODAY.getDate()}`; // matches habit tracker's todayKey() format
        const uncheckedHabits = habits.filter(c => c.lastCheckin !== hToday);
        const habitCount = uncheckedHabits.length;
        const habitSub = habits.length === 0 ? 'No habits yet' : (habitCount === 0 ? 'All checked in 🎉' : uncheckedHabits.slice(0, 2).map(c => c.name).join(', ') + (habitCount > 2 ? ` +${habitCount - 2} more` : ''));
        // Cycle phase (or pregnancy week)
        let cycSub = 'Not set up yet';
        try {
            if (typeof getCycleMode === 'function' && getCycleMode() === 'pregnant' && cycleData.pregnancy && cycleData.pregnancy.lmpDate) {
                const lmp = new Date(cycleData.pregnancy.lmpDate);
                const weeks = Math.floor((+TODAY - +lmp) / (7 * 86400000));
                cycSub = `Week ${weeks} of pregnancy`;
            }
            else if (typeof getPhase === 'function') {
                const ph = getPhase();
                if (ph)
                    cycSub = `${ph.name} \u00b7 Day ${ph.dayIn} of ${ph.of}`;
            }
        }
        catch (e) { }
        const rows = [
            { icon: '📅', cls: 'evt', title: 'Events', sub: evtSub, count: evtCount || null, onclick: 'goToday()' },
            { icon: '✅', cls: 'task', title: 'Tasks', sub: taskSub, count: taskCount || (tasks.length ? 0 : null), attn: overdue.length > 0, onclick: 'todayGoToTasks()' },
            { icon: '🔥', cls: 'habit', title: 'Habits', sub: habitSub, count: habits.length ? ((habits.length - habitCount) + '/' + habits.length) : null, onclick: "switchTab('counter')" },
            { icon: '🌸', cls: 'cyc', title: 'Cycle', sub: cycSub, count: null, onclick: "switchTab('cycle')" },
        ];
        rowsEl.innerHTML = rows.map(r => `
      <div class="today-row" onclick="${r.onclick}">
        <div class="today-row-icon ${r.cls}">${r.icon}</div>
        <div class="today-row-body">
          <div class="today-row-title">${r.title}</div>
          <div class="today-row-sub">${esc(r.sub)}</div>
        </div>
        ${r.count !== null ? `<span class="today-row-count${r.attn ? ' attn' : ''}">${esc(String(r.count))}</span>` : ''}
        <span class="today-row-chevron"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
      </div>
    `).join('');
    }
    catch (err) {
        console.error('[Vikram] renderTodayCard error:', err);
    }
    if (typeof renderFestivalBanner === 'function')
        renderFestivalBanner();
    if (typeof renderOnThisDay === 'function')
        renderOnThisDay();
}
// ── Festival countdown banner (Home tab) ────────────────────────────────────
function getNextFestival() {
    try {
        const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
        let best = null;
        for (const key in HOL) {
            const parts = key.split('-').map(Number);
            const ky = parts[0], km = parts[1], kd = parts[2];
            if (!BS[ky])
                continue;
            const ad = bsToAd(ky, km, kd);
            const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
            const diff = Math.round((+adMid - +todayMid) / 86400000);
            if (diff <= 0)
                continue;
            if (!best || diff < best.diff)
                best = { key, ky, km, kd, diff, hol: HOL[key] };
        }
        return best;
    }
    catch (e) {
        return null;
    }
}
function renderFestivalBanner() {
    const el = document.getElementById('festivalBanner');
    if (!el)
        return;
    const nxt = getNextFestival();
    if (!nxt) {
        el.style.display = 'none';
        return;
    }
    const isNe = (typeof lang !== 'undefined' && lang === 'ne');
    const name = isNe ? (nxt.hol.np || nxt.hol.en) : nxt.hol.en;
    const dayWord = nxt.diff === 1 ? (isNe ? 'भोलि' : 'tomorrow') : (isNe ? `${nxt.diff} दिनमा` : `in ${nxt.diff} days`);
    el.style.display = 'flex';
    el.onclick = function () { if (typeof openDay === 'function')
        openDay(nxt.ky, nxt.km, nxt.kd); };
    el.innerHTML = `<span class="fest-emoji">🎉</span><span class="fest-text"><b>${esc(name)}</b> ${esc(dayWord)}</span><span class="fest-arrow">›</span>`;
}
// ── "On this day" memories (Home tab) ───────────────────────────────────────
function renderOnThisDay() {
    const el = document.getElementById('onThisDayCard');
    if (!el)
        return;
    const items = [];
    try {
        (userEvents || []).forEach(function (ev) {
            if (!ev.adMs || !ev.title)
                return;
            const d = new Date(ev.adMs);
            if (d.getMonth() === TODAY.getMonth() && d.getDate() === TODAY.getDate() && d.getFullYear() < TODAY.getFullYear()) {
                const yearsAgo = TODAY.getFullYear() - d.getFullYear();
                items.push({ title: ev.title, yearsAgo: yearsAgo });
            }
        });
    }
    catch (e) { }
    if (!items.length) {
        el.style.display = 'none';
        return;
    }
    items.sort(function (a, b) { return a.yearsAgo - b.yearsAgo; });
    el.style.display = 'block';
    el.innerHTML = '<div class="otd-hdr">📷 On this day</div>' + items.slice(0, 3).map(function (it) {
        return `<div class="otd-row"><span>${esc(it.title)}</span><span class="otd-sub">${it.yearsAgo} year${it.yearsAgo > 1 ? 's' : ''} ago</span></div>`;
    }).join('');
}
window.todayGoToTasks = function () {
    if (typeof haptic === 'function')
        haptic('light');
    if (typeof setUpView === 'function')
        setUpView('tasks');
};
// ── Task reminders: due-today + overdue nudge (once per day, 9am local) ────
async function checkTaskReminders() {
    if (!notifEnabled)
        return;
    if (!('Notification' in window) || Notification.permission !== 'granted')
        return;
    let tasks;
    try {
        tasks = JSON.parse(localStorage.getItem('vikram_tasks_v1') || '[]');
    }
    catch (e) {
        tasks = [];
    }
    if (!tasks.length)
        return;
    const now = new Date();
    const nowHM = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const REMIND_TIME = '09:00';
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    const key = 'vn_tasks_' + todayMid;
    if (localStorage.getItem(key))
        return;
    if (nowHM < REMIND_TIME || nowHM >= _addMinutesHM(REMIND_TIME, 2))
        return;
    const dueToday = tasks.filter(function (t) { return !t.done && t.due === todayStr; });
    const overdue = tasks.filter(function (t) { return !t.done && t.due && t.due < todayStr; });
    if (!dueToday.length && !overdue.length)
        return;
    localStorage.setItem(key, '1');
    const nameOf = function (t) { return t.title || 'Untitled task'; };
    let title, body;
    if (dueToday.length && overdue.length) {
        title = `📋 ${dueToday.length} due today, ${overdue.length} overdue`;
        body = dueToday.concat(overdue).slice(0, 3).map(nameOf).join(', ');
    }
    else if (dueToday.length) {
        title = `📋 ${dueToday.length} task${dueToday.length === 1 ? '' : 's'} due today`;
        body = dueToday.slice(0, 3).map(nameOf).join(', ');
    }
    else {
        title = `⚠️ ${overdue.length} overdue task${overdue.length === 1 ? '' : 's'}`;
        body = overdue.slice(0, 3).map(nameOf).join(', ');
    }
    await showNotif(title, body, 'tasks-' + todayMid);
}
// ── Cycle reminders: predicted period start + BBT morning nudge ────────────
async function checkCycleReminders() {
    if (!notifEnabled)
        return;
    if (!('Notification' in window) || Notification.permission !== 'granted')
        return;
    const pr = (cycleData && cycleData.periodReminders) || null;
    const contraOn = cycleData && cycleData.contraception && cycleData.contraception.reminderOn;
    const phaseRemindersOn = (cycleData && (cycleData.phaseReminders || []).length > 0);
    const periodRemindersOn = pr && (pr.periodStart || pr.bbtMorning) && cycleData.lastPeriodStart;
    if (!periodRemindersOn && !contraOn && !phaseRemindersOn)
        return;
    const now = new Date();
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const nowHM = hh + ':' + mm;
    // Predicted period start — fire once on the morning (08:00 local) of the predicted day
    if (periodRemindersOn && pr.periodStart) {
        const cl = cycleData.cycleLength || 28;
        const pl = cycleData.periodLength || 5;
        const preds = (typeof buildPredictions === 'function') ? buildPredictions(cycleData.lastPeriodStart, cl, pl) : [];
        const next = preds.find(p => p.daysAway === 0);
        const key = 'vn_period_' + todayMid;
        if (next && nowHM >= '08:00' && nowHM < '08:02' && !localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            await showNotif('🌸 Period predicted today', 'Your period is predicted to start today — log it when it begins.', 'period-' + todayMid);
        }
    }
    // BBT morning reminder — fire once at the configured time if not already logged today
    if (periodRemindersOn && pr.bbtMorning) {
        const reminderTime = pr.bbtTime || '07:00';
        const key = 'vn_bbt_' + todayMid;
        const alreadyLogged = (cycleData.bbtLogs || []).some(l => {
            const sd = new Date(l.date);
            const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
            return sm === todayMid;
        });
        if (!alreadyLogged && nowHM >= reminderTime && nowHM < _addMinutesHM(reminderTime, 2) && !localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            await showNotif('🌡️ Log your BBT', "Don't forget to take your temperature this morning.", 'bbt-' + todayMid);
        }
    }
    // Birth control daily reminder — fire once at the configured time if not yet marked taken today
    const c = cycleData.contraception;
    if (c && c.reminderOn) {
        const reminderTime = c.reminderTime || '08:00';
        const key = 'vn_contra_' + todayMid;
        if (!contraTakenToday() && nowHM >= reminderTime && nowHM < _addMinutesHM(reminderTime, 2) && !localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            const tm = CONTRA_TYPES[c.type] || CONTRA_TYPES.pill;
            await showNotif(`${tm.emoji} Time for your ${tm.label.toLowerCase()}`, "Don't forget today's dose.", 'contra-' + todayMid);
        }
    }
    // Phase-aware custom reminders
    for (const r of (cycleData.phaseReminders || [])) {
        const key = 'vn_pr_' + r.id + '_' + todayMid;
        if (nowHM >= (r.time || '08:00') && nowHM < _addMinutesHM(r.time || '08:00', 2) && !localStorage.getItem(key)) {
            if (_phaseReminderShouldFireToday(r)) {
                localStorage.setItem(key, '1');
                await showNotif('🔔 ' + r.label, _phaseReminderSubtitle(r), 'pr-' + r.id + '-' + todayMid);
            }
        }
    }
}
function _phaseReminderSubtitle(r) {
    if (r.triggerType === 'phase_start')
        return `Start of your ${r.triggerPhase} phase`;
    if (r.triggerType === 'phase_day')
        return `Day ${r.triggerDayIn} of your ${r.triggerPhase} phase`;
    if (r.triggerType === 'cycle_day')
        return `Cycle day ${r.triggerCycleDay}`;
    if (r.triggerType === 'days_before_period')
        return `${r.triggerDaysBefore} days before your next period`;
    return '';
}
function _addMinutesHM(hm, mins) {
    const [h, m] = hm.split(':').map(Number);
    const d = new Date(2000, 0, 1, h, m + mins);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
// ══ PHASE-AWARE CUSTOM REMINDERS ══════════════════════════════════════════
// cycleData.phaseReminders: [{ id, label, time, triggerType, triggerPhase, triggerDayIn, triggerCycleDay, triggerDaysBefore }]
// triggerType: 'phase_start' | 'phase_day' | 'cycle_day' | 'days_before_period'
const PHASE_REMINDER_PHASES = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
let _prEditId = null;
function openPhaseReminderSheet(editId) {
    if (typeof haptic === 'function')
        haptic('light');
    _prEditId = editId || null;
    renderPhaseReminderSheet();
    const sheet = document.getElementById('phaseReminderSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closePhaseReminderSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('phaseReminderSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderPhaseReminderSheet() {
    const body = document.getElementById('phaseReminderSheetBody');
    if (!body)
        return;
    const existing = _prEditId ? (cycleData.phaseReminders || []).find(r => r.id === _prEditId) : null;
    const r = existing || { label: '', time: '08:00', triggerType: 'phase_start', triggerPhase: 'Menstrual', triggerDayIn: 1, triggerCycleDay: 1, triggerDaysBefore: 2 };
    body.innerHTML = `
  <div class="ssec" style="padding-top:4px;">
    <div class="ssect">Reminder name</div>
    <input id="prLabelInput" type="text" placeholder="e.g. Take ibuprofen, Prenatal vitamin…" maxlength="80"
      value="${esc(r.label)}"
      style="width:100%;box-sizing:border-box;padding:11px 13px;border-radius:12px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:13px;font-family:'Nunito',sans-serif;font-weight:700;"/>
  </div>
  <div class="ssec" style="padding-top:0;">
    <div class="ssect">When to remind</div>
    <div class="srow">
      <div class="slbl">Trigger type</div>
      <select id="prTriggerType" onchange="renderPhaseReminderTriggerDetail()"
        style="padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:12.5px;font-family:'Nunito',sans-serif;font-weight:700;">
        <option value="phase_start"         ${r.triggerType === 'phase_start' ? 'selected' : ''}>Start of phase</option>
        <option value="phase_day"           ${r.triggerType === 'phase_day' ? 'selected' : ''}>Day N of a phase</option>
        <option value="cycle_day"           ${r.triggerType === 'cycle_day' ? 'selected' : ''}>Specific cycle day</option>
        <option value="days_before_period"  ${r.triggerType === 'days_before_period' ? 'selected' : ''}>Days before next period</option>
      </select>
    </div>
    <div id="prTriggerDetail"></div>
  </div>
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="border-bottom:none;">
      <div class="slbl">Reminder time</div>
      <input id="prTimeInput" type="time" value="${r.time || '08:00'}"
        style="padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:13px;font-family:'Nunito',sans-serif;font-weight:700;"/>
    </div>
  </div>
  <div class="ssec" style="padding-top:0;">
    <button onclick="savePhaseReminder()" style="width:100%;padding:13px;border-radius:14px;border:none;background:var(--tgon,#1a1a1a);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">${_prEditId ? 'Update reminder' : 'Add reminder'}</button>
  </div>`;
    window._prInitPhase = r.triggerPhase || 'Menstrual';
    window._prInitDayIn = r.triggerDayIn || 1;
    window._prInitCycleDay = r.triggerCycleDay || 1;
    window._prInitDaysBefore = r.triggerDaysBefore || 2;
    renderPhaseReminderTriggerDetail();
}
function renderPhaseReminderTriggerDetail() {
    const detail = document.getElementById('prTriggerDetail');
    if (!detail)
        return;
    const type = document.getElementById('prTriggerType')?.value || 'phase_start';
    if (type === 'phase_start' || type === 'phase_day') {
        detail.innerHTML = `
    <div class="srow" ${type === 'phase_start' ? 'style="border-bottom:none;"' : ''}>
      <div class="slbl">Phase</div>
      <select id="prPhaseSelect"
        style="padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:13px;font-family:'Nunito',sans-serif;font-weight:700;">
        ${PHASE_REMINDER_PHASES.map(p => `<option value="${p}" ${(window._prInitPhase || 'Menstrual') === p ? 'selected' : ''}>${p}</option>`).join('')}
      </select>
    </div>
    ${type === 'phase_day' ? `
    <div class="srow" style="border-bottom:none;">
      <div class="slbl">Day within phase</div>
      <input id="prDayInInput" type="number" min="1" max="20" value="${window._prInitDayIn || 1}"
        style="width:60px;text-align:right;padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:14px;font-family:'Nunito',sans-serif;font-weight:800;"/>
    </div>` : ''}`;
    }
    else if (type === 'cycle_day') {
        detail.innerHTML = `<div class="srow" style="border-bottom:none;">
      <div class="slbl">Cycle day</div>
      <input id="prCycleDayInput" type="number" min="1" max="60" value="${window._prInitCycleDay || 1}"
        style="width:60px;text-align:right;padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:14px;font-family:'Nunito',sans-serif;font-weight:800;"/>
    </div>`;
    }
    else {
        detail.innerHTML = `<div class="srow" style="border-bottom:none;">
      <div class="slbl">Days before next period</div>
      <input id="prDaysBeforeInput" type="number" min="1" max="14" value="${window._prInitDaysBefore || 2}"
        style="width:60px;text-align:right;padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:14px;font-family:'Nunito',sans-serif;font-weight:800;"/>
    </div>`;
    }
}
function savePhaseReminder() {
    const label = (document.getElementById('prLabelInput')?.value || '').trim().slice(0, 80);
    if (!label) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Add a name for this reminder');
        return;
    }
    const time = document.getElementById('prTimeInput')?.value || '08:00';
    const triggerType = document.getElementById('prTriggerType')?.value || 'phase_start';
    const triggerPhase = document.getElementById('prPhaseSelect')?.value || 'Menstrual';
    const triggerDayIn = parseInt(document.getElementById('prDayInInput')?.value, 10) || 1;
    const triggerCycleDay = parseInt(document.getElementById('prCycleDayInput')?.value, 10) || 1;
    const triggerDaysBefore = parseInt(document.getElementById('prDaysBeforeInput')?.value, 10) || 2;
    if (typeof haptic === 'function')
        haptic('light');
    const entry = {
        id: _prEditId || ('pr' + Date.now() + Math.random().toString(36).slice(2, 6)),
        label, time, triggerType, triggerPhase, triggerDayIn, triggerCycleDay, triggerDaysBefore
    };
    cycleData.phaseReminders = cycleData.phaseReminders || [];
    const idx = cycleData.phaseReminders.findIndex(r => r.id === entry.id);
    if (idx >= 0)
        cycleData.phaseReminders[idx] = entry;
    else
        cycleData.phaseReminders.push(entry);
    saveCycle();
    closePhaseReminderSheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Reminder saved');
}
function deletePhaseReminder(id) {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.phaseReminders = (cycleData.phaseReminders || []).filter(r => r.id !== id);
    saveCycle();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('🗑 Reminder removed');
}
function _phaseReminderShouldFireToday(r) {
    if (!cycleData.lastPeriodStart)
        return false;
    const cl = cycleData.cycleLength || 28;
    const pl = cycleData.periodLength || 5;
    const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    const anchor = new Date(cycleData.lastPeriodStart);
    const anchorMid = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate()).getTime();
    const diffDays = Math.round((todayMid - anchorMid) / 86400000);
    const day = ((diffDays % cl) + cl) % cl + 1;
    if (r.triggerType === 'cycle_day')
        return day === (r.triggerCycleDay || 1);
    if (r.triggerType === 'days_before_period')
        return (cl - day + 1) === (r.triggerDaysBefore || 2);
    const ovDay = cl - 14;
    const follEnd = ovDay - 3;
    const ovEnd = ovDay + 2;
    let phase, dayInPhase;
    if (day <= pl) {
        phase = 'Menstrual';
        dayInPhase = day;
    }
    else if (day <= follEnd) {
        phase = 'Follicular';
        dayInPhase = day - pl;
    }
    else if (day <= ovEnd) {
        phase = 'Ovulation';
        dayInPhase = day - (ovDay - 2) + 1;
    }
    else {
        phase = 'Luteal';
        dayInPhase = day - ovEnd;
    }
    if (r.triggerType === 'phase_start')
        return phase === r.triggerPhase && dayInPhase === 1;
    if (r.triggerType === 'phase_day')
        return phase === r.triggerPhase && dayInPhase === (r.triggerDayIn || 1);
    return false;
}
window._recurState = {
    enabled: false,
    freq: 'daily',
    interval: 1,
    weekdays: [],
    endType: 'never',
    endCount: 5,
    endAdMs: null,
};
// recurrence functions are plain function declarations — globally accessible by inline onclick
function recurLabel(ev) {
    if (ev.recur && ev.recur.freq) {
        const r = ev.recur;
        const n = r.interval || 1;
        const u = { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' }[r.freq] || r.freq;
        return n === 1 ? u + 'ly' : `every ${n} ${u}s`;
    }
    if (ev.repeatYearly)
        return 'yearly';
    return '';
}
function recurSummaryText() {
    const r = window._recurState;
    if (!r.enabled)
        return 'No repeat';
    const n = r.interval || 1;
    const freqMap = { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' };
    const u = freqMap[r.freq] || r.freq;
    let s = n === 1 ? `Every ${u}` : `Every ${n} ${u}s`;
    if (r.freq === 'weekly' && r.weekdays && r.weekdays.length) {
        const WDN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        s += ' on ' + r.weekdays.slice().sort((a, b) => a - b).map(w => WDN[w]).join(', ');
    }
    if (r.endType === 'count')
        s += ` · ${r.endCount || 5} times`;
    else if (r.endType === 'date' && r.endAdMs) {
        const ed = new Date(r.endAdMs);
        s += ` · until ${ADMEN[ed.getMonth()]} ${ed.getDate()}, ${ed.getFullYear()}`;
    }
    return s;
}
function updateRecurSummary() {
    const el = document.getElementById('recurSummary');
    const sub = document.getElementById('recurToggleSub');
    if (el)
        el.textContent = recurSummaryText();
    if (sub)
        sub.textContent = window._recurState.enabled ? recurSummaryText() : 'Never';
}
function updateRecurIntervalUnit() {
    const unit = document.getElementById('recurIntervalUnit');
    const n = window._recurState.interval || 1;
    const map = { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' };
    const base = map[window._recurState.freq] || 'day';
    if (unit)
        unit.textContent = n === 1 ? base + '(s)' : base + 's';
}
function toggleRecurPanel() {
    const tgl = document.getElementById('evRepeatYearly');
    const panel = document.getElementById('recurPanel');
    if (!tgl || !panel)
        return;
    tgl.classList.toggle('on');
    window._recurState.enabled = tgl.classList.contains('on');
    panel.style.display = window._recurState.enabled ? 'block' : 'none';
    // Default freq to daily when first opened
    if (window._recurState.enabled)
        setRecurFreq(window._recurState.freq || 'daily');
    updateRecurSummary();
}
function setRecurFreq(freq) {
    window._recurState.freq = freq;
    document.querySelectorAll('.recur-freq-btn').forEach(b => b.classList.toggle('on', b.dataset.freq === freq));
    const wdSec = document.getElementById('recurWeekdaySection');
    if (wdSec)
        wdSec.style.display = freq === 'weekly' ? 'block' : 'none';
    if (freq === 'weekly' && window._recurState.weekdays.length === 0) {
        // Pre-select today's weekday
        const today = new Date();
        window._recurState.weekdays = [today.getDay()];
        document.querySelectorAll('.recur-wd-btn').forEach(b => {
            b.classList.toggle('on', b.dataset.wd == today.getDay());
        });
    }
    updateRecurIntervalUnit();
    updateRecurSummary();
}
function stepRecurInterval(delta) {
    const state = window._recurState;
    state.interval = Math.max(1, Math.min(99, (state.interval || 1) + delta));
    const el = document.getElementById('recurIntervalVal');
    if (el)
        el.textContent = state.interval;
    updateRecurIntervalUnit();
    updateRecurSummary();
}
function toggleRecurWd(wd) {
    const state = window._recurState;
    if (!state.weekdays)
        state.weekdays = [];
    const idx = state.weekdays.indexOf(wd);
    if (idx === -1)
        state.weekdays.push(wd);
    else if (state.weekdays.length > 1)
        state.weekdays.splice(idx, 1); // keep at least 1
    document.querySelectorAll('.recur-wd-btn').forEach(b => {
        b.classList.toggle('on', state.weekdays.includes(+b.dataset.wd));
    });
    updateRecurSummary();
}
function setRecurEnd(type) {
    window._recurState.endType = type;
    document.querySelectorAll('.recur-end-btn').forEach(b => b.classList.toggle('on', b.dataset.end === type));
    const countSec = document.getElementById('recurEndCountSection');
    const dateSec = document.getElementById('recurEndDateSection');
    if (countSec)
        countSec.style.display = type === 'count' ? 'flex' : 'none';
    if (dateSec)
        dateSec.style.display = type === 'date' ? 'block' : 'none';
    if (type === 'date')
        updateRecurEndDay();
    updateRecurSummary();
}
function stepRecurCount(delta) {
    window._recurState.endCount = Math.max(1, Math.min(999, (window._recurState.endCount || 5) + delta));
    const el = document.getElementById('recurEndCountVal');
    if (el)
        el.textContent = window._recurState.endCount;
    updateRecurSummary();
}
function updateRecurEndDay() {
    const y = +document.getElementById('recurEndBsY')?.value || TODAYBS.y;
    const m = +document.getElementById('recurEndBsM')?.value || TODAYBS.m;
    const max = BS[y]?.[m - 1] ?? 30;
    const sel = document.getElementById('recurEndBsD');
    if (!sel)
        return;
    const cur = +sel.value || 1;
    sel.innerHTML = Array.from({ length: max }, (_, i) => `<option value="${i + 1}"${i + 1 === cur ? ' selected' : ''}>${i + 1}</option>`).join('');
    // Store as AD ms
    const ad = bsToAd(y, m, +sel.value || 1);
    window._recurState.endAdMs = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate()).getTime();
    updateRecurSummary();
}
// Reset recurrence panel when opening add sheet
function resetRecurPanel() {
    window._recurState = { enabled: false, freq: 'daily', interval: 1, weekdays: [], endType: 'never', endCount: 5, endAdMs: null };
    const tgl = document.getElementById('evRepeatYearly');
    if (tgl)
        tgl.classList.remove('on');
    const panel = document.getElementById('recurPanel');
    if (panel)
        panel.style.display = 'none';
    updateRecurSummary();
    // Reset UI elements
    document.querySelectorAll('.recur-freq-btn').forEach(b => b.classList.toggle('on', b.dataset.freq === 'daily'));
    document.querySelectorAll('.recur-end-btn').forEach(b => b.classList.toggle('on', b.dataset.end === 'never'));
    document.querySelectorAll('.recur-wd-btn').forEach(b => b.classList.remove('on'));
    const ivEl = document.getElementById('recurIntervalVal');
    if (ivEl)
        ivEl.textContent = '1';
    const ctEl = document.getElementById('recurEndCountVal');
    if (ctEl)
        ctEl.textContent = '5';
    const cSec = document.getElementById('recurEndCountSection');
    if (cSec)
        cSec.style.display = 'none';
    const dSec = document.getElementById('recurEndDateSection');
    if (dSec)
        dSec.style.display = 'none';
    const wdSec = document.getElementById('recurWeekdaySection');
    if (wdSec)
        wdSec.style.display = 'none';
}
async function saveEv() {
    const t = document.getElementById('evT').value.trim();
    if (!t) {
        alert('Please enter an event title.');
        return;
    }
    haptic('success');
    const bsY = +document.getElementById('evBsY').value;
    const bsM = +document.getElementById('evBsM').value;
    const bsD = +document.getElementById('evBsD').value;
    const endBsY = +document.getElementById('evEndBsY').value;
    const endBsM = +document.getElementById('evEndBsM').value;
    const endBsD = +document.getElementById('evEndBsD').value;
    if (!bsY || !bsM || !bsD || !endBsY || !endBsM || !endBsD) {
        alert('Please select a valid date.');
        return;
    }
    const note = document.getElementById('evN').value.trim();
    const adDate = bsToAd(bsY, bsM, bsD);
    const endAdDate = bsToAd(endBsY, endBsM, endBsD);
    const startMid = new Date(adDate.getFullYear(), adDate.getMonth(), adDate.getDate());
    const endMid = new Date(endAdDate.getFullYear(), endAdDate.getMonth(), endAdDate.getDate());
    if (endMid < startMid) {
        alert('End date must be the same as or after the start date.');
        return;
    }
    const evData = {
        title: t,
        bsY, bsM, bsD,
        endBsY, endBsM, endBsD,
        adMs: startMid.getTime(),
        endAdMs: endMid.getTime(),
        note,
        startTime: document.getElementById('evStartTime')?.value || null,
        endTime: document.getElementById('evEndTime')?.value || null,
        color: (document.querySelector('#evColorPicker .ae-seg-btn.on, #evColorPicker .ae-cat-card.on, #evColorPicker .ae-cat-pill.on, #evColorPicker .ev-cat-btn.on') || {}).dataset?.color || 'personal',
        repeatYearly: window._recurState && window._recurState.enabled && window._recurState.freq === 'yearly' && (window._recurState.interval || 1) === 1,
        recur: (window._recurState && window._recurState.enabled) ? {
            freq: window._recurState.freq,
            interval: window._recurState.interval || 1,
            weekdays: window._recurState.weekdays ? [...window._recurState.weekdays] : [],
            endType: window._recurState.endType || 'never',
            endCount: window._recurState.endCount || 5,
            endAdMs: window._recurState.endAdMs || null,
        } : null,
    };
    // Edit mode — update in place
    if (window._profileEditIdx != null && window._profileEditIdx >= 0 && window._profileEditIdx < userEvents.length) {
        userEvents[window._profileEditIdx] = evData;
        window._profileEditIdx = null;
    }
    else {
        userEvents.push(evData);
    }
    userEvents.sort((a, b) => a.adMs - b.adMs);
    saveEvents();
    document.getElementById('evT').value = '';
    document.getElementById('evN').value = '';
    clearEvTime();
    // Reset sheet title
    const titleEl = document.getElementById('addTitle');
    if (titleEl)
        titleEl.textContent = 'New Event';
    closeAll();
    renderUpcoming();
    renderSelectedDay();
    render();
    renderProfileShareEvents();
    // Confirmation notification
    if (Notification.permission === 'granted') {
        const adStr = `${ADMEN[adDate.getMonth()]} ${adDate.getDate()}, ${adDate.getFullYear()}`;
        await showNotif(`✅ Event Saved — ${t}`, `${MEN[bsM - 1]} ${bsD}, ${bsY} BS · ${adStr}${note ? ' · ' + note : ''}`, `saved-${Date.now()}`);
    }
    else {
        // Ask permission on first save
        const perm = await requestNotifPerm();
        updateNotifCard();
        if (perm === 'granted') {
            const adStr = `${ADMEN[adDate.getMonth()]} ${adDate.getDate()}, ${adDate.getFullYear()}`;
            await showNotif(`✅ Event Saved — ${t}`, `${MEN[bsM - 1]} ${bsD}, ${bsY} BS · ${adStr}${note ? ' · ' + note : ''}`, `saved-${Date.now()}`);
        }
    }
}
// ══ UPCOMING — 7-DAY COMBINED LIST ══
const WINDOW = 13;
function switchUpTab(t) { }
function buildCycleUpcomingItems(todayMid, windowEnd) {
    if (!cycleData.lastPeriodStart)
        return [];
    const cl = cycleData.cycleLength || 28;
    const pl = cycleData.periodLength || 5;
    const msDay = 86400000;
    // ── Use the most-recent period_start log as the true cycle anchor ──
    const allLogs = cycleData.logs || [];
    const periodStartLogs = allLogs
        .filter(l => l.type === 'period_start' && l.date)
        .sort((a, b) => b.date - a.date);
    const anchorRaw = periodStartLogs.length
        ? new Date(periodStartLogs[0].date)
        : new Date(cycleData.lastPeriodStart);
    if (isNaN(+anchorRaw))
        return [];
    let cycleStart = new Date(anchorRaw.getFullYear(), anchorRaw.getMonth(), anchorRaw.getDate());
    // Advance to the cycle that contains or follows todayMid
    while (new Date(cycleStart.getTime() + cl * msDay) <= todayMid) {
        cycleStart = new Date(cycleStart.getTime() + cl * msDay);
    }
    // Step back one if we overshot
    while (cycleStart > todayMid) {
        cycleStart = new Date(cycleStart.getTime() - cl * msDay);
    }
    if (cycleStart > windowEnd)
        return [];
    // ── Log-aware flags for the CURRENT cycle ──
    // Use the actual anchor timestamp (lastPeriodStart) for log filtering,
    // NOT cycleStart (which may have been advanced forward past the log date)
    const anchorTs = anchorRaw.getTime
        ? new Date(anchorRaw.getFullYear(), anchorRaw.getMonth(), anchorRaw.getDate()).getTime()
        : cycleStart.getTime();
    // Most recent period_end log in this cycle
    const periodEndLog = allLogs
        .filter(l => l.type === 'period_end' && l.date >= anchorTs)
        .sort((a, b) => b.date - a.date)[0] || null;
    // Most recent ovulation log in this cycle
    const ovulLog = allLogs
        .filter(l => l.type === 'ovulation' && l.date >= anchorTs)
        .sort((a, b) => b.date - a.date)[0] || null;
    const ovDay = cl - 14;
    const fertileStartDay = Math.max(1, ovDay - 5);
    const items = [];
    const pushItem = (date, title, sub, isLogged) => {
        const ad = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const diff = Math.round((+ad - +todayMid) / msDay);
        // Only show items happening today or later — once a date is in the past
        // (whether predicted or logged) it should disappear from Upcoming.
        if (diff < 0)
            return;
        if (diff > WINDOW)
            return;
        items.push({
            type: 'cyc',
            ky: ad.getFullYear(),
            km: ad.getMonth() + 1,
            kd: ad.getDate(),
            ad,
            adMid: ad,
            diff,
            title,
            sub,
            isLogged: !!isLogged,
        });
    };
    for (let start = new Date(cycleStart); start <= windowEnd; start = new Date(start.getTime() + cl * msDay)) {
        const isCurrentCycle = start.getTime() === cycleStart.getTime();
        // Period starts — check if already logged for this cycle
        const periodStartLogged = isCurrentCycle && periodStartLogs.some(l => {
            const ld = new Date(l.date);
            const lMid = new Date(ld.getFullYear(), ld.getMonth(), ld.getDate());
            return lMid.getTime() === start.getTime();
        });
        if (!periodStartLogged) {
            pushItem(start, 'Period starts', 'Cycle Day 1', false);
        }
        else {
            pushItem(start, 'Period starts', 'Cycle Day 1', true);
        }
        // Period ends — check if logged
        const periodEndLogged = isCurrentCycle && !!periodEndLog;
        if (!periodEndLogged) {
            const periodEndDate = new Date(start.getTime() + (pl - 1) * msDay);
            pushItem(periodEndDate, 'Period ends', 'Cycle Day ' + pl, false);
        }
        else {
            const periodEndDate = new Date(periodEndLog.date);
            const periodEndMid = new Date(periodEndDate.getFullYear(), periodEndDate.getMonth(), periodEndDate.getDate());
            pushItem(periodEndMid, 'Period ends', 'Cycle Day ' + pl, true);
        }
        // Fertile window — check if ovulation already logged
        const ovulLogged = isCurrentCycle && !!ovulLog;
        if (!ovulLogged) {
            const fertileDate = new Date(start.getTime() + (fertileStartDay - 1) * msDay);
            pushItem(fertileDate, 'Fertile window opens', 'Cycle Day ' + fertileStartDay, false);
        }
        // Ovulation — logged or predicted
        if (!ovulLogged) {
            const ovulDate = new Date(start.getTime() + (ovDay - 1) * msDay);
            pushItem(ovulDate, 'Ovulation', 'Cycle Day ' + ovDay, false);
        }
        else {
            const ovulDate = new Date(ovulLog.date);
            const ovulMid = new Date(ovulDate.getFullYear(), ovulDate.getMonth(), ovulDate.getDate());
            pushItem(ovulMid, 'Ovulation', 'Cycle Day ' + ovDay, true);
        }
    }
    return items;
}
function relLabel(diff) {
    if (diff === 0)
        return { text: 'Today', cls: 'today' };
    if (diff === 1)
        return { text: 'Tomorrow', cls: 'soon' };
    if (diff <= 6)
        return { text: `In ${diff} days`, cls: 'soon' };
    if (diff <= 13)
        return { text: 'Next week', cls: 'soon' };
    const wk = Math.round(diff / 7);
    if (wk <= 4)
        return { text: `In ${wk} week${wk > 1 ? 's' : ''}`, cls: 'soon' };
    return { text: `In ~1 month`, cls: 'red' };
}
// Icon & tag config per event type
function upItemMeta(type, subtype) {
    if (type === 'hol')
        return { icon: '🇳🇵', iconCls: 'hol', tagLabel: 'HOLIDAY', tagCls: 'hol' };
    if (type === 'evt')
        return { icon: '📌', iconCls: 'evt', tagLabel: 'EVENT', tagCls: 'evt' };
    // cycle subtypes
    const cm = {
        'Period starts': { icon: '🩸', tagLabel: 'PERIOD START', tagCls: 'cyc' },
        'Period ends': { icon: '✅', tagLabel: 'PERIOD END', tagCls: 'cyc' },
        'Fertile window opens': { icon: '🌸', tagLabel: 'FERTILE WINDOW', tagCls: 'cyc' },
        'Ovulation': { icon: '✨', tagLabel: 'OVULATION', tagCls: 'cyc' },
    };
    const m = cm[subtype] || { icon: '🌸', tagLabel: 'CYCLE', tagCls: 'cyc' };
    return { ...m, iconCls: 'cyc' };
}
/* ── Month View state ── */
let upView = 'upcoming'; // 'upcoming' | 'month'
let mvSelectedDay = null; // {y,m,d} BS — highlighted cell in month view
function setUpView(v) {
    haptic('light');
    upView = v;
    const btnL = document.getElementById('upVtUpcoming');
    const btnM = document.getElementById('upVtMonth');
    const btnT = document.getElementById('upVtTasks');
    if (btnL)
        btnL.classList.toggle('on', v === 'upcoming');
    if (btnM)
        btnM.classList.toggle('on', v === 'month');
    if (btnT)
        btnT.classList.toggle('on', v === 'tasks');
    const tasksView = document.getElementById('upTasksView');
    if (tasksView)
        tasksView.style.display = v === 'tasks' ? '' : 'none';
    if (v === 'tasks') {
        const upList = document.getElementById('upList');
        const upMonthView = document.getElementById('upMonthView');
        if (upList)
            upList.style.display = 'none';
        if (upMonthView)
            upMonthView.style.display = 'none';
        if (typeof window.tasksShowList === 'function')
            window.tasksShowList();
        // Show tasks count in badge
        try {
            const raw = localStorage.getItem('vikram_tasks_v1');
            const list = raw ? JSON.parse(raw) : [];
            const incomplete = list.filter(t => !t.done).length;
            const countEl = document.getElementById('upCount');
            if (countEl) {
                countEl.textContent = String(incomplete);
                countEl.title = incomplete + ' tasks left';
                countEl.classList.add('tasks-mode');
            }
        }
        catch (e) { }
    }
    else {
        renderUpcoming();
    }
}
function mvNavMonth(dir) {
    haptic('light');
    mvSelectedDay = null;
    vM += dir;
    if (vM < 1) {
        vM = 12;
        vY--;
    }
    if (vM > 12) {
        vM = 1;
        vY++;
    }
    // Clamp to available BS data
    if (!BS[vY]) {
        vM = dir > 0 ? 1 : 12;
        vY -= dir;
    }
    render(); // update main calendar + month bar
    renderUpcoming(); // re-render month view
}
function renderMonthView() {
    const wrap = document.getElementById('upMonthView');
    const list = document.getElementById('upList');
    if (!wrap)
        return;
    list.style.display = 'none';
    wrap.style.display = 'block';
    const y = vY, m = vM;
    const dims = BS[y]?.[m - 1] ?? 30;
    const mArr = lang === 'ne' ? MNE : MEN;
    const monthName = mArr[m - 1];
    const todayBS = TODAYBS;
    // Build event map: day → {hols:[], evts:[], cycs:[], obs:[]}
    const dayMap = {};
    for (let d = 1; d <= dims; d++)
        dayMap[d] = { hols: [], evts: [], cycs: [], obs: [] };
    for (const key of Object.keys(HOL)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (ky === y && km === m && dayMap[kd])
            dayMap[kd].hols.push(HOL[key]);
    }
    for (const key of Object.keys(OBS)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (ky === y && km === m && dayMap[kd])
            dayMap[kd].obs.push(OBS[key]);
    }
    const monthStart = bsToAd(y, m, 1);
    const monthEnd = bsToAd(y, m, dims);
    const mStartMid = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate());
    const mEndMid = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), monthEnd.getDate());
    userEvents.forEach(ev => {
        const msDay2 = 86400000;
        const { startMid, endMid } = getEventRangeMid(ev);
        const spanDays = Math.round((+endMid - +startMid) / msDay2);
        const occurrences = [];
        if (!ev.recur && !ev.repeatYearly) {
            occurrences.push({ oStart: startMid, oEnd: endMid });
        }
        else if (ev.repeatYearly && !ev.recur) {
            [y - 1, y, y + 1].forEach(bsY => {
                if (!BS[bsY])
                    return;
                const maxD2 = BS[bsY][ev.bsM - 1] ?? 30;
                const clampedD = Math.min(ev.bsD, maxD2);
                const vStart = bsToAd(bsY, ev.bsM, clampedD);
                const vSMid = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
                occurrences.push({ oStart: vSMid, oEnd: new Date(vSMid.getTime() + spanDays * msDay2) });
            });
        }
        else {
            const r = ev.recur;
            if (!r || !r.freq) {
                occurrences.push({ oStart: startMid, oEnd: endMid });
            }
            else {
                const interval = r.interval || 1;
                let occ = 0, cur = new Date(startMid), maxIter = 600, iter = 0;
                while (cur <= mEndMid && iter++ < maxIter) {
                    if (r.endType === 'count' && occ >= (r.endCount || 1))
                        break;
                    if (r.endType === 'date' && r.endAdMs) {
                        const ed = new Date(r.endAdMs);
                        const edM = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
                        if (cur > edM)
                            break;
                    }
                    occurrences.push({ oStart: new Date(cur), oEnd: new Date(cur.getTime() + spanDays * msDay2) });
                    occ++;
                    if (r.freq === 'daily')
                        cur = new Date(cur.getTime() + interval * msDay2);
                    else if (r.freq === 'weekly') {
                        if (r.weekdays && r.weekdays.length) {
                            cur = new Date(cur.getTime() + msDay2);
                            while (!r.weekdays.includes(cur.getDay()))
                                cur = new Date(cur.getTime() + msDay2);
                        }
                        else
                            cur = new Date(cur.getTime() + interval * 7 * msDay2);
                    }
                    else if (r.freq === 'monthly') {
                        const nm = new Date(cur);
                        nm.setMonth(nm.getMonth() + interval);
                        cur = nm;
                    }
                    else if (r.freq === 'yearly') {
                        const ny = new Date(cur);
                        ny.setFullYear(ny.getFullYear() + interval);
                        cur = ny;
                    }
                    else
                        break;
                }
            }
        }
        occurrences.forEach(({ oStart, oEnd }) => {
            if (oEnd < mStartMid || oStart > mEndMid)
                return;
            for (let d = 1; d <= dims; d++) {
                const adD = bsToAd(y, m, d);
                const adMid = new Date(adD.getFullYear(), adD.getMonth(), adD.getDate());
                if (adMid >= oStart && adMid <= oEnd && !dayMap[d].evts.includes(ev))
                    dayMap[d].evts.push(ev);
            }
        });
    });
    const cycItems = buildCycleUpcomingItems(mStartMid, mEndMid);
    cycItems.forEach(ci => {
        if (ci.ky === y && ci.km === m && dayMap[ci.kd])
            dayMap[ci.kd].cycs.push(ci);
    });
    // First weekday of month
    const firstAD = bsToAd(y, m, 1);
    const startDow = firstAD.getDay();
    // ── Mini calendar grid with inline chips ──
    const WDLABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let cal = `<div class="mv-cal">
    <div class="mv-cal-hdr">
      <button class="mv-nav-btn" onclick="mvNavMonth(-1)" aria-label="Previous month">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style="text-align:center;flex:1;">
        <div class="mv-cal-title">${monthName} ${ns(y)}</div>
        <div class="mv-cal-sub">${lang === 'ne' ? 'बि.सं.' : ''}</div>
      </div>
      <button class="mv-nav-btn" onclick="mvNavMonth(1)" aria-label="Next month">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="mv-dhdrs">${WDLABELS.map(w => `<div class="mv-dhdr">${w}</div>`).join('')}</div>
    <div class="mv-grid">`;
    // Empty leading cells
    for (let i = 0; i < startDow; i++)
        cal += `<div class="mv-cell dim"><span class="mv-dnum"></span></div>`;
    for (let d = 1; d <= dims; d++) {
        const isToday = todayBS.y === y && todayBS.m === m && todayBS.d === d;
        const isSel = mvSelectedDay && mvSelectedDay.y === y && mvSelectedDay.m === m && mvSelectedDay.d === d;
        const dm = dayMap[d];
        const hasEvents = dm.hols.length || dm.obs.length || dm.evts.length || dm.cycs.length;
        const cls = ['mv-cell', isToday ? 'today-cell' : '', isSel && !isToday ? 'selected-cell' : ''].filter(Boolean).join(' ');
        // Build inline chips (max 2 visible to avoid overflow)
        let chips = '';
        const allChips = [
            ...dm.hols.map(h => ({ type: 'hol', label: lang === 'ne' ? h.np : h.en })),
            ...dm.obs.map(o => ({ type: 'evt', label: lang === 'ne' ? o.np : o.en })),
            ...dm.evts.map(e => ({ type: 'evt', label: e.title })),
            ...dm.cycs.map(c => ({ type: 'cyc', label: c.title })),
        ];
        const MAX_CHIPS = 2;
        const visible = allChips.slice(0, MAX_CHIPS);
        const extra = allChips.length - MAX_CHIPS;
        visible.forEach(ch => {
            const truncated = ch.label.length > 9 ? ch.label.slice(0, 8) + '…' : ch.label;
            chips += `<div class="mv-chip mv-chip-${ch.type}">${esc(truncated)}</div>`;
        });
        if (extra > 0)
            chips += `<div class="mv-chip mv-chip-more">+${extra}</div>`;
        cal += `<div class="${cls}" onclick="mvSelectDay(${y},${m},${d})">
      <span class="mv-dnum">${ns(d)}</span>
      ${chips ? `<div class="mv-chips">${chips}</div>` : ''}
    </div>`;
    }
    cal += `</div></div>`;
    // ── Event list below ──
    let listHtml = '';
    if (mvSelectedDay && mvSelectedDay.y === y && mvSelectedDay.m === m) {
        const sd = mvSelectedDay.d;
        const dm = dayMap[sd];
        const adD = bsToAd(y, m, sd);
        const WDEN_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayLabel = `${WDEN_FULL[adD.getDay()]}, ${mArr[m - 1]} ${ns(sd)}`;
        const allItems = [
            ...dm.hols.map(h => ({ type: 'hol', h, d: sd })),
            ...dm.obs.map(o => ({ type: 'obs', o, d: sd })),
            ...dm.evts.map(e => ({ type: 'evt', e, d: sd })),
            ...dm.cycs.map(c => ({ type: 'cyc', c, d: sd })),
        ];
        listHtml += `<div class="mv-list-hdr">${dayLabel}</div>`;
        if (allItems.length === 0) {
            listHtml += `<div class="mv-empty">No events on this day</div>`;
        }
        else {
            allItems.forEach(it => { listHtml += mvItemHtml(it, y, m); });
        }
    }
    else {
        let hasAny = false;
        for (let d = 1; d <= dims; d++) {
            const dm = dayMap[d];
            if (!dm.hols.length && !dm.evts.length && !dm.cycs.length)
                continue;
            hasAny = true;
            const adD = bsToAd(y, m, d);
            const WDEN_S = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const isToday = todayBS.y === y && todayBS.m === m && todayBS.d === d;
            listHtml += `<div class="mv-day-group">
        <div class="mv-day-label">${WDEN_S[adD.getDay()]} · ${ns(d)}${isToday ? ' <span style="color:#3b82f6">· Today</span>' : ''}</div>`;
            [
                ...dm.hols.map(h => ({ type: 'hol', h, d })),
                ...dm.obs.map(o => ({ type: 'obs', o, d })),
                ...dm.evts.map(e => ({ type: 'evt', e, d })),
                ...dm.cycs.map(c => ({ type: 'cyc', c, d })),
            ].forEach(it => { listHtml += mvItemHtml(it, y, m); });
            listHtml += `</div>`;
        }
        if (!hasAny)
            listHtml = `<div class="mv-empty">No events this month</div>`;
    }
    wrap.innerHTML = `<div class="mv-wrap">${cal}${listHtml}</div>`;
}
function mvItemHtml(it, y, m) {
    if (it.type === 'hol') {
        const name = lang === 'ne' ? it.h.np : it.h.en;
        return `<div class="up-item" onclick="openDay(${y},${m},${it.d})">
      <div class="up-item-accent hol"></div>
      <div class="up-item-inner">
        <div class="up-icon hol">🎉</div>
        <div class="up-info">
          <div class="up-name ne">${name}</div>
          <div class="up-tag-row"><span class="up-tag hol">Holiday</span></div>
        </div>
        <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
      </div></div>`;
    }
    if (it.type === 'obs') {
        const name = lang === 'ne' ? it.o.np : it.o.en;
        return `<div class="up-item" onclick="openDay(${y},${m},${it.d})">
      <div class="up-item-accent evt"></div>
      <div class="up-item-inner">
        <div class="up-icon evt">🎀</div>
        <div class="up-info">
          <div class="up-name ne">${name}</div>
          <div class="up-tag-row"><span class="up-tag evt">Observance</span></div>
        </div>
        <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
      </div></div>`;
    }
    if (it.type === 'evt') {
        const ev = it.e;
        const { startMid, endMid } = getEventRangeMid(ev);
        const rangeStr = startMid.getTime() === endMid.getTime()
            ? `${ADMEN[startMid.getMonth()]} ${startMid.getDate()}, ${startMid.getFullYear()}`
            : `${ADMEN[startMid.getMonth()]} ${startMid.getDate()} – ${ADMEN[endMid.getMonth()]} ${endMid.getDate()}`;
        const realIdx = userEvents.indexOf(ev);
        const c = ({ 'personal': '#3B82F6', 'work': '#10b981', 'cultural': '#f59e0b', 'health': '#ef4444', 'birthday': '#ec4899' })[ev.color] || '#3B82F6';
        return `<div class="up-item" onclick="openDay(${y},${m},${it.d})">
      <div class="up-item-accent evt" style="background:${c};"></div>
      <div class="up-item-inner">
        <div class="up-icon evt" style="color:${c};">📌</div>
        <div class="up-info">
          <div class="up-name">${esc(ev.title)}</div>
          <div class="up-tag-row"><span class="up-sub-pill">${rangeStr}</span>${ev.startTime ? `<span class="up-sub-pill">⏰ ${esc(ev.startTime)}${ev.endTime ? ' – ' + esc(ev.endTime) : ''}</span>` : ''}</div>
          ${ev.note ? `<div style="font-size:11px;color:var(--sheet-muted);font-weight:600;margin-top:3px;">${esc(ev.note)}</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;">
          <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
          <span class="up-remove" data-remove-idx="${realIdx}" data-remove-adms="${ev.adMs}" data-remove-title="${esc(ev.title)}" onclick="(function(e){e.stopPropagation();upRemoveEv(e.currentTarget);})(event)">✕</span>
        </div>
      </div></div>`;
    }
    if (it.type === 'cyc') {
        const ci = it.c;
        return `<div class="up-item" onclick="openDay(${y},${m},${it.d})">
      <div class="up-item-accent cyc"></div>
      <div class="up-item-inner">
        <div class="up-icon cyc">🌸</div>
        <div class="up-info">
          <div class="up-name">${esc(ci.title)}</div>
          <div class="up-tag-row"><span class="up-tag cyc">Cycle</span>${ci.sub ? `<span class="up-sub-pill">${esc(ci.sub)}</span>` : ''}</div>
        </div>
        <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
      </div></div>`;
    }
    return '';
}
function mvSelectDay(y, m, d) {
    if (mvSelectedDay && mvSelectedDay.y === y && mvSelectedDay.m === m && mvSelectedDay.d === d) {
        mvSelectedDay = null; // deselect on second tap
    }
    else {
        mvSelectedDay = { y, m, d };
    }
    renderMonthView();
}
function renderUpcoming() {
    // Route to month view if toggled
    const mvWrap = document.getElementById('upMonthView');
    const listEl = document.getElementById('upList');
    const tasksView = document.getElementById('upTasksView');
    if (upView === 'tasks') {
        if (listEl)
            listEl.style.display = 'none';
        if (mvWrap)
            mvWrap.style.display = 'none';
        if (tasksView)
            tasksView.style.display = '';
        return;
    }
    if (tasksView)
        tasksView.style.display = 'none';
    if (upView === 'month') {
        if (listEl)
            listEl.style.display = 'none';
        if (mvWrap)
            mvWrap.style.display = 'block';
        document.getElementById('upTitle').textContent = lang === 'ne' ? 'मासिक दृश्य' : 'Month View';
        const countEl = document.getElementById('upCount');
        if (countEl)
            countEl.textContent = '';
        renderMonthView();
        return;
    }
    // Upcoming list mode — ensure containers correct
    if (listEl)
        listEl.style.display = '';
    if (mvWrap)
        mvWrap.style.display = 'none';
    const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const windowEnd = new Date(todayMid.getTime() + WINDOW * 86400000);
    const mArr = lang === 'ne' ? MNE : MEN;
    document.getElementById('upTitle').textContent = lang === 'ne' ? 'आगामी' : 'Upcoming';
    if (!hamroUpcomingLoadPromise && !Array.isArray(hamroUpcomingCache))
        hamroLoadUpcomingFeed().then(() => { if (typeof renderUpcoming === 'function')
            renderUpcoming(); });
    const items = [];
    const hamroFeed = Array.isArray(hamroUpcomingCache) && hamroUpcomingCache.length ? hamroUpcomingCache : null;
    if (hamroFeed) {
        hamroFeed.forEach(src => {
            const key = `${src.y}-${src.m}-${src.d}`;
            if (!BS[src.y] || !BS[src.y][src.m - 1])
                return;
            const ad = bsToAd(src.y, src.m, src.d);
            const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
            const diff = Math.round((+adMid - +todayMid) / 86400000);
            if (diff < 0 || diff > WINDOW)
                return;
            const localHol = HOL[key];
            const localObs = OBS[key];
            if (localHol) {
                items.push({ type: 'hol', ky: src.y, km: src.m, kd: src.d, ad, adMid, diff, hol: { np: localHol.np, en: src.title || localHol.en } });
            }
            else if (localObs) {
                items.push({ type: 'obs', ky: src.y, km: src.m, kd: src.d, ad, adMid, diff, obs: { np: localObs.np, en: src.title || localObs.en } });
            }
            else {
                items.push({ type: 'obs', ky: src.y, km: src.m, kd: src.d, ad, adMid, diff, obs: { np: src.title, en: src.title } });
            }
        });
    }
    else {
        // — Holidays within window —
        for (const key of Object.keys(HOL)) {
            const [ky, km, kd] = key.split('-').map(Number);
            if (!BS[ky])
                continue;
            const ad = bsToAd(ky, km, kd);
            const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
            const diff = Math.round((+adMid - +todayMid) / 86400000);
            if (diff >= 0 && diff <= WINDOW)
                items.push({ type: 'hol', ky, km, kd, ad, adMid, diff, hol: HOL[key] });
        }
        // — Observances within window (regional/cultural — not public holidays) —
        for (const key of Object.keys(OBS)) {
            const [ky, km, kd] = key.split('-').map(Number);
            if (!BS[ky])
                continue;
            const ad = bsToAd(ky, km, kd);
            const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
            const diff = Math.round((+adMid - +todayMid) / 86400000);
            if (diff >= 0 && diff <= WINDOW)
                items.push({ type: 'obs', ky, km, kd, ad, adMid, diff, obs: OBS[key] });
        }
    }
    // — User events within window —
    userEvents.forEach(ev => {
        const msDay = 86400000;
        const { startMid, endMid } = getEventRangeMid(ev);
        const spanDays = Math.round((+endMid - +startMid) / msDay);
        // Helper: push one occurrence into items
        function pushOcc(occStartMid, occEndMid, rangeLabel) {
            if (occEndMid < todayMid || occStartMid > windowEnd)
                return;
            const displayMid = occStartMid > todayMid ? occStartMid : todayMid;
            const diff = Math.round((+displayMid - +todayMid) / msDay);
            const bs = adToBs(displayMid);
            const startStr = `${ADMEN[occStartMid.getMonth()]} ${occStartMid.getDate()}, ${occStartMid.getFullYear()}`;
            const endStr = `${ADMEN[occEndMid.getMonth()]} ${occEndMid.getDate()}, ${occEndMid.getFullYear()}`;
            const rangeText = rangeLabel || (spanDays === 0 ? startStr : `${startStr} to ${endStr}`);
            items.push({ type: 'evt', ky: bs.y, km: bs.m, kd: bs.d, ad: new Date(occStartMid), adMid: displayMid, diff, ev, rangeText, range: { startMid: occStartMid, endMid: occEndMid }, bsDisp: bs });
        }
        // No recurrence
        if (!ev.recur && !ev.repeatYearly) {
            pushOcc(startMid, endMid);
            return;
        }
        // Legacy yearly (including isBirthday from profile)
        if (ev.repeatYearly && !ev.recur) {
            // Use BS years directly to avoid the Jan-1 AD→BS mapping bug.
            // Check the current BS year and the next two BS years to cover the full window.
            const bsYearsToCheck = new Set([TODAYBS.y, TODAYBS.y + 1, TODAYBS.y + 2]);
            bsYearsToCheck.forEach(bsY => {
                if (!BS[bsY])
                    return;
                const maxD = BS[bsY][ev.bsM - 1] ?? 30;
                const clampedD = Math.min(ev.bsD, maxD);
                const vStart = bsToAd(bsY, ev.bsM, clampedD);
                const vSMid = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
                const vEMid = new Date(vSMid.getTime() + spanDays * msDay);
                pushOcc(vSMid, vEMid);
            });
            return;
        }
        // Full recurrence engine
        const r = ev.recur;
        if (!r || !r.freq) {
            pushOcc(startMid, endMid);
            return;
        }
        const interval = r.interval || 1;
        let occCount = 0;
        const maxOcc = 400; // safety cap
        function withinEndCond(occN, occStartMid) {
            if (r.endType === 'count' && occN >= (r.endCount || 1))
                return false;
            if (r.endType === 'date' && r.endAdMs) {
                const ed = new Date(r.endAdMs);
                const edMid = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
                if (occStartMid > edMid)
                    return false;
            }
            return true;
        }
        if (r.freq === 'daily') {
            for (let occN = 0; occN < maxOcc; occN++) {
                const oStart = new Date(startMid.getTime() + occN * interval * msDay);
                if (oStart > windowEnd)
                    break;
                if (!withinEndCond(occN, oStart))
                    break;
                const oEnd = new Date(oStart.getTime() + spanDays * msDay);
                pushOcc(oStart, oEnd);
            }
            return;
        }
        if (r.freq === 'weekly') {
            const weekdays = r.weekdays && r.weekdays.length ? r.weekdays : [startMid.getDay()];
            // iterate week blocks
            for (let wk = 0; wk < maxOcc; wk++) {
                const weekStart = new Date(startMid.getTime() + wk * interval * 7 * msDay);
                if (weekStart > windowEnd)
                    break;
                weekdays.forEach(wd => {
                    const dayDiff = ((wd - weekStart.getDay()) + 7) % 7;
                    const oStart = new Date(weekStart.getTime() + dayDiff * msDay);
                    if (oStart < startMid || oStart > windowEnd)
                        return;
                    if (!withinEndCond(occCount, oStart))
                        return;
                    const oEnd = new Date(oStart.getTime() + spanDays * msDay);
                    pushOcc(oStart, oEnd);
                    occCount++;
                });
            }
            return;
        }
        if (r.freq === 'monthly') {
            for (let mo = 0; mo < maxOcc; mo++) {
                const tgtYear = startMid.getFullYear();
                const tgtMonth = startMid.getMonth() + mo * interval;
                // Clamp day to last day of the target month to avoid Date overflow
                const daysInTgtMonth = new Date(tgtYear, tgtMonth + 1, 0).getDate();
                const clampedDay = Math.min(startMid.getDate(), daysInTgtMonth);
                const oStart = new Date(tgtYear, tgtMonth, clampedDay);
                if (oStart > windowEnd)
                    break;
                if (!withinEndCond(mo, oStart))
                    break;
                const oEnd = new Date(oStart.getTime() + spanDays * msDay);
                pushOcc(oStart, oEnd);
            }
            return;
        }
        if (r.freq === 'yearly') {
            for (let yr = 0; yr < maxOcc; yr++) {
                const targetBsY = ev.bsY + yr * interval;
                if (!BS[targetBsY])
                    break;
                const vStart = bsToAd(targetBsY, ev.bsM, ev.bsD);
                const vSMid = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate());
                if (vSMid > windowEnd)
                    break;
                if (!withinEndCond(yr, vSMid))
                    break;
                const vEMid = new Date(vSMid.getTime() + spanDays * msDay);
                pushOcc(vSMid, vEMid);
            }
            return;
        }
        // fallback
        pushOcc(startMid, endMid);
    });
    // — Cycle tracker projections within window —
    items.push(...buildCycleUpcomingItems(todayMid, windowEnd));
    // — Sort by date, then hol, cyc, evt —
    const prio = t => t === 'hol' ? 0 : t === 'cyc' ? 1 : 2;
    items.sort((a, b) => a.diff - b.diff || prio(a.type) - prio(b.type));
    // Cache today's items (diff===0) for the Today glance card — reuses this
    // function's already-expanded recurrence/holiday/cycle logic rather than
    // duplicating it.
    window._todayItemsCache = items.filter(it => it.diff === 0);
    if (typeof renderTodayCard === 'function')
        renderTodayCard();
    const list = document.getElementById('upList');
    const countEl = document.getElementById('upCount');
    if (countEl) {
        countEl.textContent = String(items.length);
        countEl.classList.remove('tasks-mode');
        countEl.title = '';
        countEl.style.display = cfg.showCountBadge ? '' : 'none';
    }
    if (items.length === 0) {
        list.innerHTML = `<div class="up-empty">
      <span class="up-empty-ico">🌤️</span>
      <div class="up-empty-txt">No upcoming holidays, events, or cycle updates in the next ${WINDOW + 1} days</div>
    </div>`;
        return;
    }
    // Group items by day
    const groups = new Map(); // dateKey → {diff, adMid, bsY, bsM, bsD, items[]}
    items.forEach(it => {
        const d = it.adMid;
        const dk = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        if (!groups.has(dk)) {
            // get BS for display — use UTC noon so adToBs diff matches REF (also UTC noon)
            const bs = adToBs(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0)));
            groups.set(dk, { diff: it.diff, adMid: d, bs, items: [] });
        }
        groups.get(dk).items.push(it);
    });
    const WDEN_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = '';
    const groupArr = [...groups.values()];
    groups.forEach((g, dk, map) => {
        const keys = [...map.keys()];
        const isLast = keys[keys.length - 1] === dk;
        const { diff, adMid, bs } = g;
        const dow = WDEN_SHORT[adMid.getDay()];
        const monthStr = ADMEN[adMid.getMonth()];
        const bsLabel = `${ns(bs.d)} ${lang === 'ne' ? MNE[bs.m - 1] : MEN[bs.m - 1]}`;
        const isToday = diff === 0;
        const isTomorrow = diff === 1;
        const isPast = diff < 0;
        const badgeHtml = isToday
            ? `<span class="up-day-badge today">Today</span>`
            : isTomorrow
                ? `<span class="up-day-badge tomorrow">Tomorrow</span>`
                : isPast
                    ? `<span class="up-day-badge" style="background:rgba(34,197,94,.15);color:#16a34a;">Logged</span>`
                    : '';
        html += `<div class="up-day-group">
      <div class="up-timeline-left">
        <div class="up-day-bubble${isToday ? ' today-bubble' : ''}">
          <span class="up-day-bubble-num">${adMid.getDate()}</span>
          <span class="up-day-bubble-dow">${dow}</span>
        </div>
        ${isLast ? '' : '<div class="up-timeline-line"></div>'}
      </div>
      <div class="up-timeline-right">
        <div class="up-day-meta-row">
          <div>
            <div class="up-day-name">${monthStr} ${adMid.getFullYear()}</div>
            <div class="up-day-bs ne">${bsLabel} BS</div>
          </div>
          ${badgeHtml}
        </div>`;
        g.items.forEach(it => {
            if (it.type === 'hol') {
                const holName = lang === 'ne' ? it.hol.np : it.hol.en;
                const meta = upItemMeta('hol');
                html += `<div class="up-item" onclick="openDay(${it.ky},${it.km},${it.kd})">
          <div class="up-icon hol">${meta.icon}</div>
          <div class="up-info">
            <div class="up-name ne">${esc(holName)}</div>
            <div class="up-tag-row"><span class="up-tag hol">${meta.tagLabel}</span></div>
          </div>
          <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
        </div>`;
            }
            else if (it.type === 'obs') {
                const obsName = lang === 'ne' ? it.obs.np : it.obs.en;
                html += `<div class="up-item" onclick="openDay(${it.ky},${it.km},${it.kd})">
          <div class="up-icon evt">🎀</div>
          <div class="up-info">
            <div class="up-name ne">${esc(obsName)}</div>
            <div class="up-tag-row"><span class="up-tag evt">Observance</span></div>
          </div>
          <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
        </div>`;
            }
            else if (it.type === 'cyc') {
                const meta = upItemMeta('cyc', it.title);
                const loggedBadge = it.isLogged
                    ? `<span style="font-size:9px;font-weight:800;padding:1px 6px;border-radius:5px;background:rgba(34,197,94,.14);color:#16a34a;letter-spacing:.2px;">✓ Logged</span>`
                    : `<span style="font-size:9px;font-weight:800;padding:1px 6px;border-radius:5px;background:rgba(99,102,241,.12);color:#6366f1;letter-spacing:.2px;">~ Predicted</span>`;
                html += `<div class="up-item" onclick="openDay(${it.ky},${it.km},${it.kd})">
          <div class="up-icon cyc">${meta.icon}</div>
          <div class="up-info">
            <div class="up-name">${esc(it.title)}</div>
            <div class="up-tag-row"><span class="up-tag cyc">${meta.tagLabel}</span>${it.sub ? `<span class="up-sub-pill">${esc(it.sub)}</span>` : ''} ${loggedBadge}</div>
          </div>
          <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
        </div>`;
            }
            else {
                const ev = it.ev;
                const realIdx = userEvents.indexOf(ev);
                html += `<div class="up-item">
          <div class="up-item-body" onclick="openDay(${it.ky},${it.km},${it.kd})">
            <div class="up-icon evt">📌</div>
            <div class="up-info">
              <div class="up-name">${esc(ev.title)}</div>
              <div class="up-tag-row">
                <span class="up-sub-pill">${it.rangeText || ''}</span>
                ${(ev.recur || ev.repeatYearly) ? `<span style="font-size:9px;background:rgba(99,102,241,.13);color:#6366f1;border-radius:5px;padding:1px 5px;font-weight:800;">🔁 ${recurLabel(ev)}</span>` : ''}
              </div>
              ${ev.note ? `<div style="font-size:11px;color:var(--dsub);margin-top:2px;">${esc(ev.note)}</div>` : ''}
            </div>
            <div class="up-chev"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
          </div>
          <button class="up-remove-btn" data-remove-idx="${realIdx}" data-remove-adms="${ev.adMs}" data-remove-title="${esc(ev.title)}" onclick="upRemoveEv(this)">✕</button>
        </div>`;
            }
        });
        html += `</div></div>`;
    });
    list.innerHTML = html;
}
// ══ SCHEDULE VIEW ══
const SCHED_DAYS = 90; // show 90 days ahead
function renderSchedule() {
    const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const windowEnd = new Date(todayMid.getTime() + SCHED_DAYS * 86400000);
    const body = document.getElementById('scheduleBody');
    if (!body)
        return;
    // Build flat event map: dateKey (YYYY-MM-DD) → [{type,title,sub,color,tag,action}]
    const dayMap = new Map();
    function addToDay(dateKey, item) {
        if (!dayMap.has(dateKey))
            dayMap.set(dateKey, []);
        dayMap.get(dateKey).push(item);
    }
    // Holidays
    for (const key of Object.keys(HOL)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (!BS[ky])
            continue;
        const ad = bsToAd(ky, km, kd);
        const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
        if (adMid < todayMid || adMid > windowEnd)
            continue;
        const dk = `${ad.getFullYear()}-${String(ad.getMonth() + 1).padStart(2, '0')}-${String(ad.getDate()).padStart(2, '0')}`;
        addToDay(dk, {
            type: 'hol', color: '#FF4757',
            title: lang === 'ne' ? HOL[key].np : HOL[key].en,
            sub: `🇳🇵 Public Holiday · ${MEN[km - 1]} ${kd}, ${ky} BS`,
            tag: 'Holiday', tagCls: 'hol',
            action: () => { closeAll(); setTimeout(() => openDay(ky, km, kd), 60); }
        });
    }
    // Observances (regional/cultural — not public holidays)
    for (const key of Object.keys(OBS)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (!BS[ky])
            continue;
        const ad = bsToAd(ky, km, kd);
        const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
        if (adMid < todayMid || adMid > windowEnd)
            continue;
        const dk = `${ad.getFullYear()}-${String(ad.getMonth() + 1).padStart(2, '0')}-${String(ad.getDate()).padStart(2, '0')}`;
        addToDay(dk, {
            type: 'obs', color: '#7ab7ff',
            title: lang === 'ne' ? OBS[key].np : OBS[key].en,
            sub: `🎀 Observance · ${MEN[km - 1]} ${kd}, ${ky} BS`,
            tag: 'Observance', tagCls: 'evt',
            action: () => { closeAll(); setTimeout(() => openDay(ky, km, kd), 60); }
        });
    }
    // User events (multi-day: add to each day in range)
    userEvents.forEach(ev => {
        const { startMid, endMid } = getEventRangeMid(ev);
        let cur = new Date(Math.max(startMid.getTime(), todayMid.getTime()));
        const stop = new Date(Math.min(endMid.getTime(), windowEnd.getTime()));
        while (cur <= stop) {
            const dk = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
            const bs = adToBs(cur);
            const rangeStr = startMid.getTime() === endMid.getTime()
                ? `${ADMEN[startMid.getMonth()]} ${startMid.getDate()}, ${startMid.getFullYear()}`
                : `${ADMEN[startMid.getMonth()]} ${startMid.getDate()} – ${ADMEN[endMid.getMonth()]} ${endMid.getDate()}, ${endMid.getFullYear()}`;
            addToDay(dk, {
                type: 'evt', color: '#7ab7ff',
                title: ev.title,
                sub: `📌 ${rangeStr}${ev.note ? ' · ' + ev.note : ''}`,
                tag: 'Event', tagCls: 'evt',
                action: () => { closeAll(); setTimeout(() => openDay(bs.y, bs.m, bs.d), 60); }
            });
            cur = new Date(cur.getTime() + 86400000);
        }
    });
    // Cycle projections (including past logged items from this cycle)
    const cycleAnchorMid = (() => {
        try {
            const allLogs = (cycleData && cycleData.logs) || [];
            const psl = allLogs.filter(l => l.type === 'period_start' && l.date).sort((a, b) => b.date - a.date);
            const raw = psl.length ? new Date(psl[0].date) : (cycleData && cycleData.lastPeriodStart ? new Date(cycleData.lastPeriodStart) : null);
            if (!raw || isNaN(+raw))
                return todayMid;
            return new Date(raw.getFullYear(), raw.getMonth(), raw.getDate());
        }
        catch (e) {
            return todayMid;
        }
    })();
    // Use cycle anchor as lookback start so logged past items are included
    const schedLookbackStart = cycleAnchorMid < todayMid ? cycleAnchorMid : todayMid;
    const cycItems = buildCycleUpcomingItems(todayMid, windowEnd);
    cycItems.forEach(ci => {
        const dk = `${ci.ad.getFullYear()}-${String(ci.ad.getMonth() + 1).padStart(2, '0')}-${String(ci.ad.getDate()).padStart(2, '0')}`;
        const statusLabel = ci.isLogged ? '✓ Logged' : '~ Predicted';
        addToDay(dk, {
            type: 'cyc', color: '#FF6B9D',
            title: '🌸 ' + ci.title,
            sub: `My Cycle · ${ci.sub || ''} · ${statusLabel}`,
            tag: ci.isLogged ? 'Logged' : 'Predicted',
            tagCls: 'cyc',
            action: () => { switchTab('cycle'); }
        });
    });
    // Build sorted list of days — extend back to cycle anchor for logged items
    const allDays = [];
    for (let d = new Date(schedLookbackStart); d <= windowEnd; d = new Date(d.getTime() + 86400000)) {
        allDays.push(new Date(d));
    }
    // Render
    let html = '';
    let lastMonth = -1;
    let todayFound = false;
    allDays.forEach(day => {
        const dk = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
        const items = dayMap.get(dk) || [];
        const isToday = day.getTime() === todayMid.getTime();
        // Month divider
        if (day.getMonth() !== lastMonth) {
            lastMonth = day.getMonth();
            const mo = ADMEN[day.getMonth()];
            html += `<div class="sched-month-divider">${mo} ${day.getFullYear()}</div>`;
        }
        // Day row (skip empty non-today days)
        if (!isToday && items.length === 0)
            return;
        const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.getDay()];
        const bs = adToBs(day);
        const bsStr = `${MEN[bs.m - 1]} ${bs.d}, ${bs.y} BS`;
        if (isToday)
            todayFound = true;
        html += `<div class="sched-day-group" id="sched-${dk}">
      <div class="sched-day-header${isToday ? ' today-row' : ''}">
        <div class="sched-date-num">
          <div class="sdn">${day.getDate()}</div>
          <div class="sdm">${dow}</div>
        </div>
        <div class="sched-date-meta">
          <div class="sched-date-full">${dow}, ${ADMEN[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}</div>
          <div class="sched-date-bs">${bsStr}</div>
        </div>
        ${isToday ? '<span class="sched-today-badge">Today</span>' : ''}
      </div>
      <div class="sched-items">`;
        if (items.length === 0) {
            html += `<div class="sched-empty-day">No events</div>`;
        }
        else {
            items.forEach(it => {
                const evIdx = it.type === 'evt' ? JSON.stringify(it) : null;
                html += `<div class="sched-item" onclick="_schedItemClick('${dk}',${items.indexOf(it)})">
          <div class="sched-item-color" style="background:${it.color};"></div>
          <div class="sched-item-body">
            <div class="sched-item-title">${esc(it.title)}</div>
            <div class="sched-item-sub">${esc(it.sub)}</div>
          </div>
          <span class="sched-item-tag ${it.tagCls}">${esc(it.tag)}</span>
        </div>`;
            });
        }
        html += `</div></div>`;
    });
    body.innerHTML = html;
    // Store item actions for click handler
    window._schedActions = {};
    allDays.forEach(day => {
        const dk = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
        const items = dayMap.get(dk) || [];
        items.forEach((it, i) => { window._schedActions[dk + '_' + i] = it.action; });
    });
    // Subtitle
    const totalItems = [...dayMap.values()].reduce((a, b) => a + b.length, 0);
    const sub = document.getElementById('schedSubtitle');
    if (sub)
        sub.textContent = `${totalItems} event${totalItems !== 1 ? 's' : ''} in next ${SCHED_DAYS} days`;
    // Scroll to today
    setTimeout(schedScrollToday, 80);
}
window._schedItemClick = function (dk, idx) {
    const fn = window._schedActions && window._schedActions[dk + '_' + idx];
    if (fn)
        fn();
};
function schedScrollToday() {
    const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const dk = `${todayMid.getFullYear()}-${String(todayMid.getMonth() + 1).padStart(2, '0')}-${String(todayMid.getDate()).padStart(2, '0')}`;
    const el = document.getElementById('sched-' + dk);
    const body = document.getElementById('scheduleBody');
    if (el && body) {
        body.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' });
    }
}
function renderSelectedDay() {
    const y = selectedDay.y, m = selectedDay.m, d = selectedDay.d;
    const list = document.getElementById('selectedList');
    if (!list)
        return;
    const title = document.getElementById('selectedTitle');
    if (title)
        title.textContent = lang === 'ne' ? 'चयनित दिन' : 'Selected Day';
    if (!BS[y] || !BS[y][m - 1]) {
        list.innerHTML = `<div class="sel-empty">Selected day is not available.</div>`;
        return;
    }
    const ad = bsToAd(y, m, d);
    const wd = ad.getDay();
    const ti = getTithi(ad) - 1;
    const paksha = TPAKSHA[ti], tname = TNAMES[ti];
    const wdStr = lang === 'ne' ? WDNE[wd] : WDEN[wd];
    const adStr = `${wdStr}, ${ADMEN[ad.getMonth()]} ${ad.getDate()}, ${ad.getFullYear()}`;
    const h = HOL[hk(y, m, d)];
    const obs = OBS[hk(y, m, d)];
    const dayEvts = userEvents.filter(ev => eventMatchesDate(ev, y, m, d));
    const tm = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const sm = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
    const df = msDay(tm, sm);
    const dateBadge = df === 0
        ? `<span class="sel-badge today">${lang === 'ne' ? 'आज' : 'Today'}</span>`
        : df > 0
            ? `<span class="sel-badge">${df} day${df > 1 ? 's' : ''} remaining</span>`
            : `<span class="sel-badge">${-df} day${-df > 1 ? 's' : ''} ago</span>`;
    const holBadge = h && cfg.holn
        ? `<span class="sel-badge hol">${lang === 'ne' ? h.np : h.en}</span>`
        : '';
    const obsBadge = obs
        ? `<span class="sel-badge" style="background:var(--chip-evt-bg);color:var(--chip-evt-text);">${lang === 'ne' ? obs.np : obs.en}</span>`
        : '';
    const evtBadge = dayEvts.length
        ? `<span class="sel-badge">${dayEvts.length} event${dayEvts.length > 1 ? 's' : ''}</span>`
        : '';
    const kindLabel = isNaN(ti) ? '' : `${paksha} ${tname}`;
    list.innerHTML = `<div class="sel-card" onclick="openDay(${y},${m},${d})">
    <div class="sel-head">
      <div class="sel-date">
        <div class="sel-day ne">${ns(d)} ${lang === 'ne' ? MNE[m - 1] : MEN[m - 1]} ${ns(y)}</div>
        <div class="sel-sub">${adStr}${kindLabel ? ` · ${kindLabel}` : ''}</div>
      </div>
      ${dateBadge}
    </div>
    <div class="sel-badges">
      ${holBadge}
      ${obsBadge}
      ${evtBadge}
    </div>
    <div class="sel-actions">
      <button class="sel-btn" onclick="event.stopPropagation();openAddForDay(${y},${m},${d})">Add Event</button>
      <button class="sel-btn ghost" onclick="event.stopPropagation();openDay(${y},${m},${d})">Details</button>
    </div>
    <div class="sel-list">
      ${!h && !obs && !dayEvts.length ? `<div class="sel-empty">No holidays or events on this day</div>` : ''}
      ${h && cfg.holn ? `<div class="sel-row"><span class="sel-dot" style="background:var(--hol);"></span><span>${lang === 'ne' ? 'सार्वजनिक बिदा' : 'Public holiday'} · ${lang === 'ne' ? h.np : h.en}</span></div>` : ''}
      ${obs ? `<div class="sel-row"><span class="sel-dot" style="background:var(--dot-evt);"></span><span>${lang === 'ne' ? 'पर्व / अनुष्ठान' : 'Observance'} · ${lang === 'ne' ? obs.np : obs.en}</span></div>` : ''}
      ${dayEvts.map(ev => { const c = ({ 'personal': '#3B82F6', 'work': '#10b981', 'cultural': '#f59e0b', 'health': '#ef4444', 'birthday': '#ec4899' })[ev.color] || '#3B82F6'; return `<div class="sel-row"><span class="sel-dot" style="background:${safeCss(c, '#3B82F6')};"></span><span>${esc(ev.title)}${ev.note ? ' · ' + esc(ev.note) : ''}${ev.repeatYearly ? ' <span style="font-size:10px;background:rgba(99,102,241,.15);color:#6366f1;border-radius:6px;padding:1px 5px;font-weight:800;">🔁 Yearly</span>' : ''}<span style="display:block;font-size:11px;color:var(--sel-muted);font-weight:700;margin-top:2px;">${formatEventRange(ev)}</span></span></div>`; }).join('')}
    </div>
  </div>`;
}
function upRemoveEv(el) {
    let i = parseInt(el.getAttribute('data-remove-idx'), 10);
    if (isNaN(i) || i < 0 || i >= userEvents.length) {
        const adMs = parseInt(el.getAttribute('data-remove-adms'), 10);
        // Attribute stores HTML-encoded title (via esc()); decode before comparing to raw ev.title
        const rawAttr = el.getAttribute('data-remove-title') || '';
        const decodedTitle = rawAttr
            .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        i = userEvents.findIndex(e => e.adMs === adMs && e.title === decodedTitle);
        // Fallback: match by adMs alone if title comparison still fails
        if (i < 0)
            i = userEvents.findIndex(e => e.adMs === adMs);
    }
    if (i < 0 || i >= userEvents.length)
        return;
    removeEv(i);
}
function removeEv(i) {
    if (i < 0 || i >= userEvents.length)
        return;
    const removed = userEvents[i];
    const removedIdx = i;
    userEvents.splice(i, 1);
    saveEvents();
    render();
    renderUpcoming();
    renderSelectedDay();
    renderProfileShareEvents();
    if (typeof showUndoSnackbar === 'function') {
        showUndoSnackbar('Event deleted', function () {
            userEvents.splice(Math.min(removedIdx, userEvents.length), 0, removed);
            saveEvents();
            render();
            renderUpcoming();
            renderSelectedDay();
            renderProfileShareEvents();
        });
    }
}
// ══ PREVIOUS 29 DAYS ══
function renderPrevious() {
    const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const windowStart = new Date(todayMid.getTime() - 29 * 86400000);
    const mArr = lang === 'ne' ? MNE : MEN;
    document.getElementById('prevTitle').textContent =
        lang === 'ne' ? `विगत २९ दिन` : `Previous 29 Days`;
    const items = [];
    // Past holidays
    for (const key of Object.keys(HOL)) {
        const [ky, km, kd] = key.split('-').map(Number);
        if (!BS[ky])
            continue;
        const ad = bsToAd(ky, km, kd);
        const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
        const diff = Math.round((+adMid - +todayMid) / 86400000); // negative = past
        if (diff >= -29 && diff < 0)
            items.push({ type: 'hol', ky, km, kd, ad, adMid, diff, hol: HOL[key] });
    }
    // Past user events
    userEvents.forEach(ev => {
        const ad = new Date(ev.adMs);
        const adMid = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate());
        const diff = Math.round((+adMid - +todayMid) / 86400000);
        if (diff >= -29 && diff < 0)
            items.push({ type: 'evt', ky: ev.bsY, km: ev.bsM, kd: ev.bsD, ad, adMid, diff, ev });
    });
    // Most recent first
    items.sort((a, b) => b.diff - a.diff || (a.type === 'hol' ? -1 : 1));
    const list = document.getElementById('prevList');
    if (items.length === 0) {
        list.innerHTML = `<div class="up-empty">
      <span class="up-empty-ico" style="font-size:26px;">📭</span>
      <div class="up-empty-txt">No holidays or events in the past 29 days</div>
    </div>`;
        return;
    }
    list.innerHTML = items.map(it => {
        const ago = -it.diff;
        const agoLabel = ago === 1 ? 'Yesterday' : `${ago} days ago`;
        const nd = ns(it.kd);
        const mName = mArr[it.km - 1];
        const adStr = `${ADMEN[it.ad.getMonth()]} ${it.ad.getDate()}, ${it.ad.getFullYear()}`;
        if (it.type === 'hol') {
            const holName = lang === 'ne' ? it.hol.np : it.hol.en;
            return `<div class="up-item hol" style="opacity:.68;" onclick="openDay(${it.ky},${it.km},${it.kd})">
        <div class="up-chip hol">
          <div class="up-day ne">${nd}</div>
          <div class="up-mon">${mName.slice(0, 3).toUpperCase()}</div>
        </div>
        <div class="up-info">
          <div class="up-name ne">${esc(holName)}</div>
          <div class="up-sub">🇳🇵 Holiday · ${adStr}</div>
        </div>
        <span class="up-badge bdg-p" style="background:var(--tgbg);color:var(--dsub);">${agoLabel}</span>
      </div>`;
        }
        else {
            const ev = it.ev;
            const realIdx = userEvents.indexOf(ev);
            return `<div class="up-item evt" style="opacity:.68;" onclick="openDay(${it.ky},${it.km},${it.kd})">
        <div class="up-chip evt">
          <div class="up-day ne">${nd}</div>
          <div class="up-mon">${mName.slice(0, 3).toUpperCase()}</div>
        </div>
        <div class="up-info">
          <div class="up-name">${esc(ev.title)}</div>
          <div class="up-sub">📌 Event · ${adStr}${ev.note ? ' · ' + esc(ev.note) : ''}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0;">
          <span class="up-badge" style="background:var(--tgbg);color:var(--dsub);">${agoLabel}</span>
          <span style="font-size:10px;color:var(--dsub);cursor:pointer;font-weight:700;" data-remove-idx="${realIdx}" data-remove-adms="${ev.adMs}" data-remove-title="${esc(ev.title)}" onclick="(function(e){e.stopPropagation();upRemoveEv(e.currentTarget);})(event)">✕ Remove</span>
        </div>
      </div>`;
        }
    }).join('');
}
// ══ MONTH PICKER ══
let mpYear = vY;
function openMonthPicker() {
    haptic('light');
    mpYear = vY;
    closeAll();
    document.getElementById('ov').classList.add('open');
    document.getElementById('mpSheet').classList.add('open');
    renderMpGrid();
}
function renderMpGrid() {
    const mArr = lang === 'ne' ? MNE : MEN;
    document.getElementById('mpTitle').textContent = lang === 'ne' ? 'महिना छान्नुहोस्' : 'Select Month';
    document.getElementById('mpYrLbl').textContent = ns(mpYear);
    const cells = mArr.map((name, i) => {
        const m = i + 1;
        const isView = mpYear === vY && m === vM;
        const isToday = mpYear === TODAYBS.y && m === TODAYBS.m;
        let cls = 'mp-cell';
        if (isView)
            cls += ' is-view';
        if (isToday)
            cls += ' is-today';
        return `<button class="${cls}" onclick="pickMonth(${m})">${name}</button>`;
    }).join('');
    document.getElementById('mpGrid').innerHTML = cells;
}
function mpPrevYear() {
    haptic('light');
    const minY = Object.keys(BS).map(Number).sort((a, b) => a - b)[0];
    if (mpYear > minY) {
        mpYear--;
        renderMpGrid();
    }
}
function mpNextYear() {
    haptic('light');
    const maxY = Object.keys(BS).map(Number).sort((a, b) => b - a)[0];
    if (mpYear < maxY) {
        mpYear++;
        renderMpGrid();
    }
}
function pickMonth(m) {
    haptic('medium');
    vY = mpYear;
    vM = m;
    mvSelectedDay = null; // reset month-view day selection
    closeAll();
    render();
    renderUpcoming();
    renderSelectedDay();
}
// ══ GOOGLE CALENDAR SYNC ══════════════════════════════════════════════════
let gcalToken = null;
let gcalTokenExp = 0;
let gcalUser = localStorage.getItem('vikram_gcal_user') || null;
let gcalClientId = localStorage.getItem('vikram_gcal_cid') || '';
let gcalLastSync = (function () { const v = +localStorage.getItem('vikram_gcal_last_sync'); return v || 0; })();
let gcalSyncing = false;
// ── Firebase-based Google Calendar token (no Client ID needed) ──────────────
async function gcalGetTokenViaFirebase() {
    if (!window.firebase || !firebase.auth) {
        throw new Error('firebase_unavailable');
    }
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            reject(new Error('not_signed_in'));
            return;
        }
        // Re-authenticate with Google to get a fresh OAuth token with calendar scope
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar.events');
        firebase.auth().signInWithPopup(provider)
            .then(result => {
            const credential = result.credential;
            const token = credential.accessToken;
            if (!token) {
                reject(new Error('no_token'));
                return;
            }
            gcalToken = token;
            gcalTokenExp = Date.now() + 3600 * 1000;
            gcalUser = result.user.email || result.user.displayName || 'Connected';
            try {
                localStorage.setItem('vikram_gcal_user', gcalUser);
            }
            catch (e) { }
            resolve(token);
        })
            .catch(reject);
    });
}
// ── ICS export ──────────────────────────────────────────────────────────────
function padZ(n) { return String(n).padStart(2, '0'); }
function icsEscape(str) {
    // RFC 5545 §3.3.11: escape \, ;, , and newlines in text values
    return String(str || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n').replace(/\r/g, '');
}
function adToIcsDate(adMs) {
    const d = new Date(adMs);
    return `${d.getFullYear()}${padZ(d.getMonth() + 1)}${padZ(d.getDate())}`;
}
function adToIcsStamp() {
    const d = new Date();
    return `${d.getUTCFullYear()}${padZ(d.getUTCMonth() + 1)}${padZ(d.getUTCDate())}T${padZ(d.getUTCHours())}${padZ(d.getUTCMinutes())}${padZ(d.getUTCSeconds())}Z`;
}
function generateICS(scope) {
    scope = scope || 'all'; // 'all' | 'events' | 'holidays'
    const stamp = adToIcsStamp();
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Vikram Nepali Calendar//EN',
        'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
    // Add public holidays
    if (scope === 'all' || scope === 'holidays') {
        Object.entries(HOL).forEach(([key, h]) => {
            const [ky, km, kd] = key.split('-').map(Number);
            if (!BS[ky])
                return;
            const adMs = bsToAd(ky, km, kd).getTime();
            const ds = adToIcsDate(adMs);
            const de = adToIcsDate(adMs + 86400000);
            lines.push('BEGIN:VEVENT', `UID:vikram-hol-${key}@vikram.app`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${ds}`, `DTEND;VALUE=DATE:${de}`, `SUMMARY:🇳🇵 ${icsEscape(h.en)}`, `DESCRIPTION:${icsEscape(h.np)}`, 'CATEGORIES:HOLIDAY', 'END:VEVENT');
        });
    }
    // Add user events
    if (scope === 'all' || scope === 'events') {
        userEvents.forEach((ev, i) => {
            const { startMid, endMid } = getEventRangeMid(ev);
            const ds = adToIcsDate(startMid.getTime());
            const de = adToIcsDate(endMid.getTime() + 86400000);
            const desc = [ev.note, startMid.getTime() === endMid.getTime() ? '' : formatEventRange(ev)].filter(Boolean).join('\\n');
            lines.push('BEGIN:VEVENT', `UID:vikram-evt-${ev.adMs}-${i}@vikram.app`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${ds}`, `DTEND;VALUE=DATE:${de}`, `SUMMARY:📌 ${icsEscape(ev.title)}`, desc ? `DESCRIPTION:${icsEscape(desc)}` : '', 'END:VEVENT');
        });
    }
    lines.push('END:VCALENDAR');
    return lines.filter(Boolean).join('\r\n');
}
// Single-event .ics, for a quick "Add to Calendar" action on one event.
function generateSingleEventICS(ev) {
    const stamp = adToIcsStamp();
    const { startMid, endMid } = getEventRangeMid(ev);
    const ds = adToIcsDate(startMid.getTime());
    const de = adToIcsDate(endMid.getTime() + 86400000);
    const desc = [ev.note, startMid.getTime() === endMid.getTime() ? '' : formatEventRange(ev)].filter(Boolean).join('\\n');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Vikram Nepali Calendar//EN',
        'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
        `UID:vikram-evt-${ev.adMs}@vikram.app`, `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${ds}`, `DTEND;VALUE=DATE:${de}`,
        `SUMMARY:📌 ${icsEscape(ev.title)}`,
        desc ? `DESCRIPTION:${icsEscape(desc)}` : '',
        'END:VEVENT', 'END:VCALENDAR'];
    return lines.filter(Boolean).join('\r\n');
}
window.addEventToCalendar = function (adMs) {
    const ev = userEvents.find(e => e.adMs === adMs);
    if (!ev) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Event not found');
        return;
    }
    const content = generateSingleEventICS(ev);
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = String(ev.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40) || 'event';
    a.href = url;
    a.download = `${safeName}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    if (typeof vikramToast === 'function')
        vikramToast('📅 Event saved — open the file to add it to your calendar');
};
function exportICS(scope) {
    scope = scope || 'all';
    const content = generateICS(scope);
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const nameBit = scope === 'events' ? 'events' : scope === 'holidays' ? 'holidays' : 'calendar';
    a.href = url;
    a.download = `vikram-${nameBit}-${vY}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    renderGcalCard();
}
// Copies the raw .ics text so it can be pasted into a host that serves it back
// over plain HTTPS (e.g. a GitHub Gist or Dropbox public link) — that hosted URL
// is what a calendar app can then genuinely "subscribe" to for live updates.
// (Vikram itself has no server, so it can't host a live webcal:// feed on its own —
// see the note in the Integrations screen.)
window.copyICSToClipboard = function (scope) {
    const content = generateICS(scope || 'all');
    try {
        navigator.clipboard.writeText(content)
            .then(() => { if (typeof vikramToast === 'function')
            vikramToast('📋 .ics content copied'); })
            .catch(() => { if (typeof vikramToast === 'function')
            vikramToast('⚠️ Could not copy'); });
    }
    catch (e) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Clipboard not available');
    }
};
// ── Google Calendar token helpers ───────────────────────────────────────────
function gcalIsExpired() { return Date.now() > gcalTokenExp - 60000; }
async function gcalConnect() {
    if (!window.firebase || !firebase.auth) {
        if (typeof vikramToast === 'function')
            vikramToast('Google sign-in is unavailable in this build.');
        return;
    }
    // If already signed in via Firebase, just re-auth for calendar scope
    const fbUser = firebase.auth().currentUser;
    if (!fbUser) {
        // Not signed in at all — trigger profile Google sign-in first
        if (typeof vikramToast === 'function')
            vikramToast('Please sign in with Google first.');
        try {
            await new Promise((res, rej) => {
                const provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/calendar.events');
                firebase.auth().signInWithPopup(provider).then(r => {
                    const tok = r.credential?.accessToken;
                    if (tok) {
                        gcalToken = tok;
                        gcalTokenExp = Date.now() + 3600000;
                        gcalUser = r.user.email || r.user.displayName || 'Connected';
                        try {
                            localStorage.setItem('vikram_gcal_user', gcalUser);
                        }
                        catch (e) { }
                        // update profile UI too
                        if (typeof updateGoogleUI === 'function')
                            updateGoogleUI(r.user);
                    }
                    res();
                }).catch(rej);
            });
        }
        catch (e) {
            console.error('[Vikram] gcalConnect error:', e);
            if (typeof vikramToast === 'function')
                vikramToast('❌ Sign-in cancelled.');
            return;
        }
    }
    else {
        // Already signed in — re-auth to get calendar scope token
        try {
            await gcalGetTokenViaFirebase();
        }
        catch (e) {
            console.error('[Vikram] gcalConnect re-auth error:', e);
            if (typeof vikramToast === 'function')
                vikramToast('❌ Could not get calendar access. Try again.');
            return;
        }
    }
    renderGcalCard();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Connected to Google Calendar!');
}
function gcalDisconnect() {
    gcalToken = null;
    gcalTokenExp = 0;
    gcalUser = null;
    localStorage.removeItem('vikram_gcal_user');
    renderGcalCard();
    if (typeof vikramToast === 'function')
        vikramToast('Disconnected from Google Calendar.');
}
// ── Push local-only events to Google Calendar API ──────────────────────────
// Only pushes events that haven't been synced yet (no gcalId on them).
// Events pulled FROM Google, or already pushed, are skipped to avoid loops/dupes.
async function gcalPushEvents(prog) {
    const toPush = userEvents.filter(ev => !ev.gcalId);
    const total = toPush.length;
    let done = 0, failed = 0;
    for (let i = 0; i < toPush.length; i++) {
        const ev = toPush[i];
        const { startMid, endMid } = getEventRangeMid(ev);
        const ds = `${startMid.getFullYear()}-${padZ(startMid.getMonth() + 1)}-${padZ(startMid.getDate())}`;
        const de = new Date(endMid.getTime() + 86400000);
        const des = `${de.getFullYear()}-${padZ(de.getMonth() + 1)}-${padZ(de.getDate())}`;
        const body = {
            summary: `📌 ${ev.title}`,
            description: [
                ev.note || '',
                startMid.getTime() === endMid.getTime()
                    ? `[Added via Vikram · ${MEN[ev.bsM - 1]} ${ev.bsD}, ${ev.bsY} BS]`
                    : `[Added via Vikram · ${formatEventRange(ev)}]`
            ].filter(Boolean).join('\n\n'),
            start: { date: ds }, end: { date: des },
            source: { title: 'Vikram', url: location.href },
            // Mark this event as ours so the pull step doesn't re-import it
            extendedProperties: { private: { vikramApp: 'true' } }
        };
        if (prog)
            prog.textContent = `Pushing ${i + 1}/${total}…`;
        try {
            const r = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + gcalToken, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (r.ok) {
                const created = await r.json();
                ev.gcalId = created.id; // remember so we never re-push or re-import this one
                done++;
            }
            else
                failed++;
        }
        catch (e) {
            failed++;
        }
    }
    if (done > 0)
        saveEvents();
    return { done, failed, total };
}
// ── Pull events FROM Google Calendar into Vikram (the other half of two-way sync)
async function gcalPullEvents(prog) {
    const timeMin = new Date(Date.now() - 365 * 86400000).toISOString();
    const timeMax = new Date(Date.now() + 730 * 86400000).toISOString();
    const existingGcalIds = new Set(userEvents.filter(e => e.gcalId).map(e => e.gcalId));
    let imported = 0, pageToken = '';
    try {
        do {
            const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?' +
                `timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}` +
                '&singleEvents=true&maxResults=250&showDeleted=false' +
                '&privateExtendedProperty=vikramApp%21%3Dtrue' + // exclude events Vikram itself pushed
                (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '');
            if (prog)
                prog.textContent = 'Pulling events from Google…';
            const r = await fetch(url, { headers: { Authorization: 'Bearer ' + gcalToken } });
            if (!r.ok)
                break;
            const data = await r.json();
            for (const item of (data.items || [])) {
                if (!item.id || item.status === 'cancelled')
                    continue;
                if (existingGcalIds.has(item.id))
                    continue;
                const startStr = item.start && (item.start.date || (item.start.dateTime ? item.start.dateTime.slice(0, 10) : null));
                if (!startStr)
                    continue;
                const endStrRaw = item.end && (item.end.date || (item.end.dateTime ? item.end.dateTime.slice(0, 10) : null));
                const [sy, sm, sd] = startStr.split('-').map(Number);
                const startAd = new Date(sy, sm - 1, sd);
                let endAd = startAd;
                if (endStrRaw) {
                    const [ey, em, ed] = endStrRaw.split('-').map(Number);
                    let endCandidate = new Date(ey, em - 1, ed);
                    // Google's all-day "end.date" is exclusive — step back a day
                    if (item.end.date)
                        endCandidate = new Date(endCandidate.getTime() - 86400000);
                    if (endCandidate.getTime() >= startAd.getTime())
                        endAd = endCandidate;
                }
                const bs = adToBs(startAd), endBs = adToBs(endAd);
                const title = (item.summary || 'Untitled event').replace(/^📌\s*/, '');
                userEvents.push({
                    title,
                    bsY: bs.y, bsM: bs.m, bsD: bs.d,
                    endBsY: endBs.y, endBsM: endBs.m, endBsD: endBs.d,
                    adMs: startAd.getTime(),
                    endAdMs: endAd.getTime(),
                    note: item.description || '',
                    startTime: item.start && item.start.dateTime ? item.start.dateTime.slice(11, 16) : null,
                    endTime: item.end && item.end.dateTime ? item.end.dateTime.slice(11, 16) : null,
                    color: 'personal',
                    repeatYearly: false,
                    recur: null,
                    gcalId: item.id,
                    source: 'google',
                });
                existingGcalIds.add(item.id);
                imported++;
            }
            pageToken = data.nextPageToken || '';
        } while (pageToken);
        if (imported > 0) {
            userEvents.sort((a, b) => a.adMs - b.adMs);
            saveEvents();
        }
    }
    catch (e) {
        console.error('[Vikram] gcalPullEvents error:', e);
    }
    return { imported };
}
// ── Full two-way sync: push local-only events up, then pull new Google events down
async function gcalSyncNow() {
    if (gcalSyncing)
        return;
    if (!gcalToken || gcalIsExpired()) {
        await gcalConnect();
        if (!gcalToken)
            return; // connect was cancelled
    }
    gcalSyncing = true;
    const prog = document.getElementById('gcalProgress');
    if (prog)
        prog.style.display = 'block';
    let pushRes = { done: 0, failed: 0, total: 0 }, pullRes = { imported: 0 };
    try {
        pushRes = await gcalPushEvents(prog);
        pullRes = await gcalPullEvents(prog);
    }
    catch (e) {
        console.error('[Vikram] gcalSyncNow error:', e);
    }
    gcalSyncing = false;
    if (prog)
        prog.style.display = 'none';
    gcalLastSync = Date.now();
    try {
        localStorage.setItem('vikram_gcal_last_sync', String(gcalLastSync));
    }
    catch (e) { }
    const parts = [];
    if (pushRes.total > 0)
        parts.push(`${pushRes.done} sent` + (pushRes.failed ? `, ${pushRes.failed} failed` : ''));
    if (pullRes.imported > 0)
        parts.push(`${pullRes.imported} imported`);
    const msg = parts.length
        ? `✅ Two-way sync complete — ${parts.join(' · ')}.`
        : `✅ Already up to date — nothing new to sync.`;
    if (pushRes.failed > 0 && pushRes.done === 0 && pushRes.total > 0) {
        alert(`⚠️ ${pushRes.failed} event(s) failed to sync. Token may have expired — try reconnecting.`);
    }
    else {
        if (typeof vikramToast === 'function')
            vikramToast(msg);
        else
            alert(msg);
    }
    // Refresh any views that show events
    if (typeof renderUpcoming === 'function')
        renderUpcoming();
    if (typeof renderSelectedDay === 'function')
        renderSelectedDay();
    if (typeof render === 'function')
        render();
    if (typeof renderProfileShareEvents === 'function')
        renderProfileShareEvents();
    renderGcalCard();
}
// ── Render the Google Calendar card ────────────────────────────────────────
function renderGcalCard() {
    const wrap = document.getElementById('gcalWrap');
    if (!wrap)
        return;
    const evCount = userEvents.length;
    const holCount = Object.keys(HOL).length;
    const isConn = gcalToken && !gcalIsExpired();
    // Check if user is signed in via Firebase
    const fbUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
    wrap.innerHTML = `
  <!-- Block 1: Export ICS -->
  <div class="gcal-block">
    <div class="gcal-block-title">📥 Export as .ics File</div>
    <div class="gcal-block-sub">Download all ${evCount} event${evCount !== 1 ? 's' : ''} + ${holCount} holidays as a standard .ics file. Import directly into Google Calendar, Apple Calendar, or Outlook.</div>
    <button class="gcal-btn primary" onclick="exportICS('all')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Download vikram-calendar-${vY}.ics
    </button>
    <div class="gcal-row" style="margin-top:8px;">
      <button class="gcal-btn" style="background:var(--tgbg);color:var(--dtext);border:1.5px solid var(--border);" onclick="exportICS('events')">📌 Events Only</button>
      <button class="gcal-btn" style="background:var(--tgbg);color:var(--dtext);border:1.5px solid var(--border);" onclick="exportICS('holidays')">🇳🇵 Holidays Only</button>
    </div>

    <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border);">
      <div class="gcal-block-title" style="font-size:13px;">🔗 Subscribe (Live Sync)</div>
      <div class="gcal-block-sub">
        Vikram is a static app with no server of its own, so it can't host a live <code>webcal://</code> link that auto-updates by itself. The reliable workaround: copy the .ics text below and paste it into a free host that gives you a plain HTTPS link — a <b>GitHub Gist</b> ("Create secret gist" → raw URL) or a <b>Dropbox public link</b> both work. Paste that link into Google Calendar's "From URL", Apple Calendar's "New Calendar Subscription", or Outlook's "Subscribe from web" — it'll then refresh on that app's own schedule.
      </div>
      <button class="gcal-btn" style="margin-top:6px;background:var(--tgbg);color:var(--dtext);border:1.5px solid var(--border);" onclick="copyICSToClipboard('all')">📋 Copy .ics Text to Clipboard</button>
      <div class="gcal-block-sub" style="margin-top:8px;">
        Want true two-way live sync with no extra hosting step? Use <b>Direct Google Calendar Sync</b> below instead — that one really does sync automatically.
      </div>
    </div>
  </div>

  <!-- Block 2: Direct Google Sync -->
  <div class="gcal-block">
    <div class="gcal-block-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/></svg>
      Direct Google Calendar Sync
    </div>
    ${isConn
        ? `<div class="gcal-status ok"><div class="gcal-dot green"></div>Connected as <b>${gcalUser}</b></div>
         <div class="gcal-block-sub" style="margin:6px 0 10px;">🔄 Two-way sync: your Vikram events are sent to Google Calendar, and events you add in Google Calendar are pulled back into Vikram.${gcalLastSync ? `<br>Last synced: ${new Date(gcalLastSync).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}` : ''}</div>
         <div id="gcalProgress" class="gcal-progress"></div>
         <div class="gcal-row">
           <button class="gcal-btn primary" onclick="gcalSyncNow()" ${gcalSyncing ? 'disabled' : ''}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15a9 9 0 1 1-2.18-9.16L23 10"/></svg>
             ${gcalSyncing ? 'Syncing…' : 'Sync Now (both ways)'}
           </button>
           <button class="gcal-btn danger" onclick="gcalDisconnect()">Disconnect</button>
         </div>`
        : `<div class="gcal-status"><div class="gcal-dot grey"></div>Not connected</div>
         <div style="height:8px;"></div>
         <div class="gcal-block-sub">${fbUser
            ? `Signed in as <b>${fbUser.email || fbUser.displayName}</b>. Grant calendar access to enable two-way sync with Google Calendar.`
            : `Sign in with your Google account to sync events both ways with Google Calendar — no setup needed.`}</div>
         <button class="gcal-btn google" onclick="gcalConnect()">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
           ${fbUser ? 'Grant Calendar Access' : 'Sign in with Google'}
         </button>`}
  </div>`;
}
// ══ CYCLE TRACKER ════════════════════════════════════════════════════════════
const PHASE_INFO = {
    Menstrual: { emoji: '🔴', color: '#FF4757', cls: 'menstrual', desc: 'Period phase' },
    Follicular: { emoji: '🌱', color: '#FF6B9D', cls: 'follicular', desc: 'Building phase' },
    Ovulation: { emoji: '✨', color: '#5a5a68', cls: 'ovulation', desc: 'Fertile window' },
    Luteal: { emoji: '🌙', color: '#3B82F6', cls: 'luteal', desc: 'Premenstrual' },
};
let cycleData = (() => {
    try {
        return JSON.parse(localStorage.getItem('vikram_cycle') || '{}');
    }
    catch (e) {
        return {};
    }
})();
function saveCycle() {
    try {
        localStorage.setItem('vikram_cycle', JSON.stringify(cycleData));
    }
    catch (e) {
        if (e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014)) {
            _lsPrune();
            try {
                localStorage.setItem('vikram_cycle', JSON.stringify(cycleData));
            }
            catch (e2) { }
        }
    }
    if (typeof window._pairOnCycleSave === 'function')
        window._pairOnCycleSave();
}
function cycleDefaults() {
    return {
        cycleLength: cycleData.cycleLength || 28,
        periodLength: cycleData.periodLength || 5,
        lastPeriodStart: cycleData.lastPeriodStart || null,
        logs: cycleData.logs || [],
        symptomLogs: cycleData.symptomLogs || [],
        privacy: cycleData.privacy || { phase: true, fertility: true, periodDay: true },
        mode: cycleData.mode || 'cycle',
        pregnancy: cycleData.pregnancy || null,
        intercourseLogs: cycleData.intercourseLogs || [],
        opkLogs: cycleData.opkLogs || [],
        bbtLogs: cycleData.bbtLogs || [],
        bbtUnit: cycleData.bbtUnit || 'C',
        medLogs: cycleData.medLogs || [],
        medList: cycleData.medList || [],
        vitalsLogs: cycleData.vitalsLogs || [],
        weightUnit: cycleData.weightUnit || 'kg',
        periodReminders: cycleData.periodReminders || { periodStart: false, bbtMorning: false, bbtTime: '07:00' },
        mucusLogs: cycleData.mucusLogs || [],
        contraception: cycleData.contraception || null,
        contraceptionLogs: cycleData.contraceptionLogs || [],
        phaseReminders: cycleData.phaseReminders || [],
    };
}
function getDayOfCycle() {
    if (!cycleData.lastPeriodStart)
        return null;
    const today = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const start = new Date(cycleData.lastPeriodStart);
    const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    return Math.floor((+today - +startMid) / 86400000) + 1;
}
function getPhase() {
    const d = cycleData, day = getDayOfCycle();
    if (!day || day < 1)
        return null;
    const cl = d.cycleLength || 28, pl = d.periodLength || 5;
    const ovDay = cl - 14;
    const logs = cycleData.logs || [];
    const cycleStartTs = cycleData.lastPeriodStart;
    // Check if period_end has been logged for this cycle
    const periodEndLog = logs.filter(l => l.type === 'period_end' && l.date >= cycleStartTs)
        .sort((a, b) => b.date - a.date)[0] || null;
    // Check if ovulation has been logged for this cycle
    const ovulationLog = logs.filter(l => l.type === 'ovulation' && l.date >= cycleStartTs)
        .sort((a, b) => b.date - a.date)[0] || null;
    const follEnd = ovDay - 3;
    const ovEnd = ovDay + 2;
    // If ovulation confirmed: day-of-ovulation log determines phase
    if (ovulationLog) {
        const today0 = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        const daysSinceOvul = Math.round((today0 - ovulationLog.date) / 86400000);
        if (daysSinceOvul <= 1)
            return { name: 'Ovulation', dayIn: daysSinceOvul + 1, of: 2, next: 1 - daysSinceOvul };
        // After ovulation confirmed → Luteal
        const lutealDay = daysSinceOvul - 1;
        const lutealLen = cl - ovEnd;
        return { name: 'Luteal', dayIn: lutealDay, of: lutealLen, next: Math.max(0, cl - day + 1) };
    }
    // If period ended early → skip to Follicular
    if (periodEndLog && day <= pl) {
        const today0 = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        const daysSinceEnd = Math.round((today0 - periodEndLog.date) / 86400000);
        const follDay = daysSinceEnd + 1;
        const follLen = follEnd - pl;
        return { name: 'Follicular', dayIn: follDay, of: follLen, next: Math.max(0, follEnd - day + 1) };
    }
    // Default date-math phases
    if (day <= pl)
        return { name: 'Menstrual', dayIn: day, of: pl, next: pl - day + 1 };
    if (day <= follEnd)
        return { name: 'Follicular', dayIn: day - pl, of: follEnd - pl, next: follEnd - day + 1 };
    if (day <= ovEnd)
        return { name: 'Ovulation', dayIn: day - (ovDay - 2) + 1, of: 5, next: ovEnd - day + 1 };
    return { name: 'Luteal', dayIn: day - ovEnd, of: cl - ovEnd, next: cl - day + 1 };
}
// ── Generalized phase lookup for an arbitrary date (used by symptom/mood logging) ──
// Mirrors getPhase()'s date-math logic but works for any timestamp, not just "today".
// Falls back to simple date math (ignores mid-cycle period_end/ovulation logs) since
// those are most meaningful for the *current* cycle, whereas this is used for any date.
function getPhaseForDate(ts) {
    if (!cycleData.lastPeriodStart || ts == null)
        return null;
    const cl = cycleData.cycleLength || 28, pl = cycleData.periodLength || 5;
    const ovDay = cl - 14;
    const follEnd = ovDay - 3;
    const ovEnd = ovDay + 2;
    const target = new Date(ts);
    const targetMid = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
    const anchor = new Date(cycleData.lastPeriodStart);
    const anchorMid = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate()).getTime();
    // Find which cycle this date falls in relative to the anchor (can be before or after)
    const diffDays = Math.round((targetMid - anchorMid) / 86400000);
    if (diffDays < -3650 || diffDays > 3650)
        return null; // sanity guard
    let day = ((diffDays % cl) + cl) % cl + 1; // 1-indexed day within a cl-length cycle
    if (day <= pl)
        return { name: 'Menstrual', dayIn: day };
    if (day <= follEnd)
        return { name: 'Follicular', dayIn: day - pl };
    if (day <= ovEnd)
        return { name: 'Ovulation', dayIn: day - (ovDay - 2) + 1 };
    return { name: 'Luteal', dayIn: day - ovEnd };
}
// ══ MOOD & SYMPTOM LOGGING — tied to cycle phase ═════════════════════════════
// Each entry: { date: ts, mood: 'great'|'good'|'okay'|'low'|'rough', symptoms: [..], note: '' }
// Every entry is tagged with its cycle phase (computed from `date` via getPhaseForDate)
// at render/read time — not stored statically — so it always reflects the current
// cycle-length/period-length settings.
const MOOD_OPTIONS = [
    { id: 'great', emoji: '😄', label: 'Great' },
    { id: 'good', emoji: '🙂', label: 'Good' },
    { id: 'okay', emoji: '😐', label: 'Okay' },
    { id: 'low', emoji: '😔', label: 'Low' },
    { id: 'rough', emoji: '😣', label: 'Rough' },
];
const MOOD_META = Object.fromEntries(MOOD_OPTIONS.map(m => [m.id, m]));
const SYMPTOM_OPTIONS = [
    { id: 'cramps', emoji: '🤕', label: 'Cramps' },
    { id: 'headache', emoji: '🤯', label: 'Headache' },
    { id: 'bloating', emoji: '🎈', label: 'Bloating' },
    { id: 'fatigue', emoji: '😴', label: 'Fatigue' },
    { id: 'acne', emoji: '😬', label: 'Acne' },
    { id: 'tender', emoji: '💢', label: 'Tender breasts' },
    { id: 'backache', emoji: '🦴', label: 'Backache' },
    { id: 'nausea', emoji: '🤢', label: 'Nausea' },
    { id: 'cravings', emoji: '🍫', label: 'Cravings' },
    { id: 'insomnia', emoji: '🌙', label: 'Insomnia' },
    { id: 'cm', emoji: '💧', label: 'Discharge' },
    { id: 'libido', emoji: '🔥', label: 'High libido' },
];
const SYMPTOM_META = Object.fromEntries(SYMPTOM_OPTIONS.map(s => [s.id, s]));
const PHASE_ORDER = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
const PHASE_DOT_COLOR = { Menstrual: '#e63946', Follicular: '#c44569', Ovulation: '#9333ea', Luteal: '#2563eb' };
// Selection state while the log form is open
let _symLogSelectedMood = null;
let _symLogSelectedSymptoms = new Set();
let _symLogDate = null; // ts (midnight local) being logged — defaults to today
function phaseTagHTML(phaseName) {
    if (!phaseName)
        return '';
    return `<span class="phase-tag tag-${phaseName}">${phaseName}</span>`;
}
// ── Open the log form (defaults to today; can be reused for backdating later) ──
function openSymptomLogSheet(dateTs) {
    if (typeof haptic === 'function')
        haptic('light');
    _symLogDate = dateTs || new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    // Pre-fill if an entry already exists for this date
    const existing = (cycleData.symptomLogs || []).find(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _symLogDate;
    });
    _symLogSelectedMood = existing ? existing.mood : null;
    _symLogSelectedSymptoms = new Set(existing ? (existing.symptoms || []) : []);
    const noteEl = document.getElementById('symLogNoteInput');
    if (noteEl)
        noteEl.value = existing ? (existing.note || '') : '';
    renderSymptomLogSheet();
    const sheet = document.getElementById('symptomLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeSymptomLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('symptomLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderSymptomLogSheet() {
    const titleEl = document.getElementById('symLogDateLabel');
    if (titleEl) {
        const d = new Date(_symLogDate);
        const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        titleEl.textContent = (_symLogDate === todayMid) ? 'Today' : d.toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const phaseEl = document.getElementById('symLogPhaseTag');
    if (phaseEl) {
        const ph = getPhaseForDate(_symLogDate);
        phaseEl.innerHTML = ph ? phaseTagHTML(ph.name) + `<span style="font-size:11px;font-weight:700;color:var(--dsub);margin-left:6px;">Day ${ph.dayIn}</span>` : `<span style="font-size:11px;font-weight:700;color:var(--dsub);">Log a period start date to see phase</span>`;
    }
    const moodWrap = document.getElementById('symLogMoodScale');
    if (moodWrap) {
        moodWrap.innerHTML = MOOD_OPTIONS.map(m => `
      <div class="mood-opt${_symLogSelectedMood === m.id ? ' selected' : ''}" data-mood="${m.id}" onclick="symLogSelectMood('${m.id}')">
        <div class="mood-opt-emoji">${m.emoji}</div>
        <div class="mood-opt-lbl">${m.label}</div>
      </div>`).join('');
    }
    const symWrap = document.getElementById('symLogSymptomGrid');
    if (symWrap) {
        symWrap.innerHTML = SYMPTOM_OPTIONS.map(s => `
      <div class="symptom-chip${_symLogSelectedSymptoms.has(s.id) ? ' on' : ''}" data-symptom="${s.id}" onclick="symLogToggleSymptom('${s.id}')">
        <span>${s.emoji}</span><span>${s.label}</span>
      </div>`).join('');
    }
}
function symLogSelectMood(id) {
    if (typeof haptic === 'function')
        haptic('light');
    _symLogSelectedMood = (_symLogSelectedMood === id) ? null : id;
    renderSymptomLogSheet();
}
function symLogToggleSymptom(id) {
    if (typeof haptic === 'function')
        haptic('light');
    if (_symLogSelectedSymptoms.has(id))
        _symLogSelectedSymptoms.delete(id);
    else
        _symLogSelectedSymptoms.add(id);
    renderSymptomLogSheet();
}
function saveSymptomLog() {
    if (!_symLogSelectedMood && _symLogSelectedSymptoms.size === 0) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Pick a mood or at least one symptom');
        return;
    }
    if (typeof haptic === 'function')
        haptic('light');
    const note = (document.getElementById('symLogNoteInput')?.value || '').trim().slice(0, 200);
    const entry = {
        date: _symLogDate,
        mood: _symLogSelectedMood,
        symptoms: Array.from(_symLogSelectedSymptoms),
        note,
    };
    cycleData.symptomLogs = cycleData.symptomLogs || [];
    // Replace existing entry for the same date, if any
    const idx = cycleData.symptomLogs.findIndex(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _symLogDate;
    });
    if (idx >= 0)
        cycleData.symptomLogs[idx] = entry;
    else
        cycleData.symptomLogs.push(entry);
    cycleData.symptomLogs.sort((a, b) => a.date - b.date);
    saveCycle();
    closeSymptomLogSheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Logged — thanks for checking in 💭');
}
// ── Symptom History sheet (list + by-phase insights tabs) ──
let _symHistTab = 'list'; // 'list' | 'phase'
function openSymptomHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    _symHistTab = 'list';
    renderSymptomHistorySheet();
    const sheet = document.getElementById('symptomHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeSymptomHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('symptomHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function setSymHistTab(tab) {
    if (typeof haptic === 'function')
        haptic('light');
    _symHistTab = tab;
    renderSymptomHistorySheet();
}
function renderSymptomHistorySheet() {
    const tabBar = document.getElementById('symHistTabBar');
    if (tabBar) {
        tabBar.querySelectorAll('.up-vtbtn').forEach(b => {
            b.classList.toggle('on', b.getAttribute('data-tab') === _symHistTab);
        });
    }
    const body = document.getElementById('symptomHistorySheetBody');
    if (!body)
        return;
    const logs = cycleData.symptomLogs || [];
    if (_symHistTab === 'phase') {
        body.innerHTML = renderPhaseInsightsHTML(logs);
        return;
    }
    if (!logs.length) {
        body.innerHTML = `<div style="padding:40px 24px;text-align:center;font-size:13px;font-weight:700;color:var(--dsub);">No mood or symptom entries yet — log how you're feeling above 💭</div>`;
        return;
    }
    body.innerHTML = `
  <div class="ssec" style="padding-top:4px;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>All entries</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    ${[...logs].reverse().map((l, revIdx) => {
        const realIdx = logs.length - 1 - revIdx;
        const ph = getPhaseForDate(l.date);
        const mood = l.mood ? MOOD_META[l.mood] : null;
        const dateStr = new Date(l.date).toLocaleDateString('en-NP', { month: 'short', day: 'numeric', year: 'numeric' });
        return `<div class="symlog-row">
        <div class="symlog-top">
          <div class="symlog-date-mood">
            ${mood ? `<span class="symlog-mood-emoji">${mood.emoji}</span>` : ''}
            <span class="symlog-date">${dateStr}</span>
            ${ph ? phaseTagHTML(ph.name) : ''}
          </div>
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
            <button class="cyc-log-del" title="Edit" onclick="closeSymptomHistorySheet();openSymptomLogSheet(${l.date})">✏️</button>
            <button class="cyc-log-del" title="Delete" onclick="symDeleteLog(${realIdx})">🗑</button>
          </div>
        </div>
        ${(l.symptoms && l.symptoms.length) ? `<div class="symlog-symptoms">${l.symptoms.map(sid => {
            const sm = SYMPTOM_META[sid];
            return sm ? `<span class="symlog-symptom-pill">${sm.emoji} ${sm.label}</span>` : '';
        }).join('')}</div>` : ''}
        ${l.note ? `<div class="symlog-note">“${esc(l.note)}”</div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
    const sub = document.getElementById('symptomHistoryEntrySub');
    if (sub)
        sub.textContent = logs.length + ' ' + (logs.length === 1 ? 'entry' : 'entries') + ' · tracked by phase';
}
// ── By-Phase insights: aggregate mood + symptom frequency per phase ──
function renderPhaseInsightsHTML(logs) {
    if (!logs.length) {
        return `<div style="padding:40px 24px;text-align:center;font-size:13px;font-weight:700;color:var(--dsub);">Log a few entries to see patterns by phase 📊</div>`;
    }
    // Bucket entries by phase
    const buckets = { Menstrual: [], Follicular: [], Ovulation: [], Luteal: [] };
    logs.forEach(l => {
        const ph = getPhaseForDate(l.date);
        if (ph && buckets[ph.name])
            buckets[ph.name].push(l);
    });
    const barColors = { cramps: '#e63946', headache: '#f59e0b', bloating: '#3b82f6', fatigue: '#6366f1',
        acne: '#ec4899', tender: '#f97316', backache: '#84cc16', nausea: '#14b8a6', cravings: '#a855f7',
        insomnia: '#64748b', cm: '#06b6d4', libido: '#ef4444' };
    const cards = PHASE_ORDER.map(phaseName => {
        const entries = buckets[phaseName];
        const dotColor = PHASE_DOT_COLOR[phaseName];
        if (!entries.length) {
            return `<div class="phase-insight-card">
        <div class="phase-insight-head">
          <div style="display:flex;align-items:center;gap:7px;flex:1;">
            <div style="width:9px;height:9px;border-radius:50%;background:${dotColor};flex-shrink:0;"></div>
            <div class="phase-insight-title">${phaseName}</div>
          </div>
          <div class="phase-insight-count">0 entries</div>
        </div>
        <div class="phase-insight-empty">No entries logged in this phase yet.</div>
      </div>`;
        }
        // Most common mood
        const moodCounts = {};
        entries.forEach(e => { if (e.mood)
            moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1; });
        const topMoodId = Object.keys(moodCounts).sort((a, b) => moodCounts[b] - moodCounts[a])[0];
        const topMood = topMoodId ? MOOD_META[topMoodId] : null;
        // Symptom frequency
        const symCounts = {};
        entries.forEach(e => (e.symptoms || []).forEach(sid => { symCounts[sid] = (symCounts[sid] || 0) + 1; }));
        const topSymptoms = Object.keys(symCounts).sort((a, b) => symCounts[b] - symCounts[a]).slice(0, 5);
        const maxCount = topSymptoms.length ? symCounts[topSymptoms[0]] : 1;
        return `<div class="phase-insight-card">
      <div class="phase-insight-head">
        <div style="display:flex;align-items:center;gap:7px;flex:1;">
          <div style="width:9px;height:9px;border-radius:50%;background:${dotColor};flex-shrink:0;"></div>
          <div class="phase-insight-title">${phaseName}</div>
        </div>
        <div class="phase-insight-count">${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}</div>
      </div>
      ${topMood ? `<div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;font-size:12px;font-weight:700;color:var(--dtext);"><span style="font-size:16px;">${topMood.emoji}</span>Most common mood: ${topMood.label}</div>` : ''}
      ${topSymptoms.length ? `<div class="phase-insight-bars">
        ${topSymptoms.map(sid => {
            const sm = SYMPTOM_META[sid];
            const pct = Math.round(symCounts[sid] / maxCount * 100);
            return `<div class="phase-insight-bar-row">
            <div class="phase-insight-bar-lbl">${sm.emoji} ${sm.label}</div>
            <div class="phase-insight-bar-wrap"><div class="phase-insight-bar-fill" style="width:${pct}%;background:${barColors[sid] || dotColor};"></div></div>
            <div class="phase-insight-bar-val">${symCounts[sid]}</div>
          </div>`;
        }).join('')}
      </div>` : `<div class="phase-insight-empty">No symptoms logged in this phase yet.</div>`}
    </div>`;
    }).join('');
    return `<div class="ssec" style="padding-top:4px;">
    <div class="ssect">Patterns by phase</div>
    ${cards}
  </div>`;
}
// ── Delete a symptom/mood log ──
var _symDeleteIdx = -1;
function symDeleteLog(idx) {
    if (typeof haptic === 'function')
        haptic('light');
    const logs = cycleData.symptomLogs || [];
    if (idx < 0 || idx >= logs.length)
        return;
    _symDeleteIdx = idx;
    const l = logs[idx];
    const dateStr = new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    const desc = document.getElementById('symDeleteLogDesc');
    if (desc)
        desc.textContent = 'Mood & symptom entry · ' + dateStr;
    document.getElementById('symDeleteLogOverlay').classList.add('open');
}
function symDeleteLogClose(e) {
    if (e && e.target !== document.getElementById('symDeleteLogOverlay'))
        return;
    if (typeof haptic === 'function')
        haptic('light');
    document.getElementById('symDeleteLogOverlay').classList.remove('open');
    _symDeleteIdx = -1;
}
function symDeleteLogConfirm() {
    const logs = cycleData.symptomLogs || [];
    if (_symDeleteIdx < 0 || _symDeleteIdx >= logs.length) {
        document.getElementById('symDeleteLogOverlay').classList.remove('open');
        return;
    }
    logs.splice(_symDeleteIdx, 1);
    cycleData.symptomLogs = logs;
    saveCycle();
    document.getElementById('symDeleteLogOverlay').classList.remove('open');
    _symDeleteIdx = -1;
    renderSymptomHistorySheet();
    renderCycleSheet();
    if (typeof haptic === 'function')
        haptic('light');
    if (typeof vikramToast === 'function')
        vikramToast('🗑 Entry deleted');
}
// ══════════════════════════════════════════════════════════════════════════════
// TTC SUITE — Intercourse Log / Ovulation Test (OPK) / BBT Temperature Log
// ══════════════════════════════════════════════════════════════════════════════
// ── Intercourse log ──
let _bdLogDate = null;
let _bdLogProtected = null; // null = not selected, true/false
function openIntercourseLogSheet(dateTs) {
    if (typeof haptic === 'function')
        haptic('light');
    _bdLogDate = dateTs || new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    const existing = (cycleData.intercourseLogs || []).find(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _bdLogDate;
    });
    _bdLogProtected = existing ? !!existing.protected : false;
    const noteEl = document.getElementById('bdLogNoteInput');
    if (noteEl)
        noteEl.value = existing ? (existing.note || '') : '';
    renderIntercourseLogSheet();
    const sheet = document.getElementById('intercourseLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeIntercourseLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('intercourseLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderIntercourseLogSheet() {
    const titleEl = document.getElementById('bdLogDateLabel');
    if (titleEl) {
        const d = new Date(_bdLogDate);
        const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        titleEl.textContent = (_bdLogDate === todayMid) ? 'Today' : d.toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const phaseEl = document.getElementById('bdLogPhaseTag');
    if (phaseEl) {
        const ph = (typeof getPhaseForDate === 'function') ? getPhaseForDate(_bdLogDate) : null;
        phaseEl.innerHTML = ph ? phaseTagHTML(ph.name) + `<span style="font-size:11px;font-weight:700;color:var(--dsub);margin-left:6px;">Day ${ph.dayIn}</span>` : `<span style="font-size:11px;font-weight:700;color:var(--dsub);">Log a period start date to see phase</span>`;
    }
    document.querySelectorAll('#bdLogProtectedRow .ttc-result-chip').forEach(c => {
        const v = c.getAttribute('data-protected') === '1';
        c.classList.toggle('selected', v === _bdLogProtected);
    });
}
function bdLogSelectProtected(val) {
    if (typeof haptic === 'function')
        haptic('light');
    _bdLogProtected = val;
    renderIntercourseLogSheet();
}
function saveIntercourseLog() {
    if (typeof haptic === 'function')
        haptic('light');
    const note = (document.getElementById('bdLogNoteInput')?.value || '').trim().slice(0, 200);
    const entry = { date: _bdLogDate, protected: !!_bdLogProtected, note };
    cycleData.intercourseLogs = cycleData.intercourseLogs || [];
    const idx = cycleData.intercourseLogs.findIndex(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _bdLogDate;
    });
    if (idx >= 0)
        cycleData.intercourseLogs[idx] = entry;
    else
        cycleData.intercourseLogs.push(entry);
    cycleData.intercourseLogs.sort((a, b) => a.date - b.date);
    saveCycle();
    closeIntercourseLogSheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Intercourse logged 💕');
}
// ── Ovulation test (OPK) log ──
let _opkLogDate = null;
let _opkLogResult = null; // 'neg' | 'faint' | 'pos'
function openOpkLogSheet(dateTs) {
    if (typeof haptic === 'function')
        haptic('light');
    _opkLogDate = dateTs || new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    const existing = (cycleData.opkLogs || []).find(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _opkLogDate;
    });
    _opkLogResult = existing ? existing.result : null;
    const noteEl = document.getElementById('opkLogNoteInput');
    if (noteEl)
        noteEl.value = existing ? (existing.note || '') : '';
    renderOpkLogSheet();
    const sheet = document.getElementById('opkLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeOpkLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('opkLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderOpkLogSheet() {
    const titleEl = document.getElementById('opkLogDateLabel');
    if (titleEl) {
        const d = new Date(_opkLogDate);
        const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        titleEl.textContent = (_opkLogDate === todayMid) ? 'Today' : d.toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const phaseEl = document.getElementById('opkLogPhaseTag');
    if (phaseEl) {
        const ph = (typeof getPhaseForDate === 'function') ? getPhaseForDate(_opkLogDate) : null;
        phaseEl.innerHTML = ph ? phaseTagHTML(ph.name) + `<span style="font-size:11px;font-weight:700;color:var(--dsub);margin-left:6px;">Day ${ph.dayIn}</span>` : `<span style="font-size:11px;font-weight:700;color:var(--dsub);">Log a period start date to see phase</span>`;
    }
    document.querySelectorAll('#opkResultRow .ttc-result-chip').forEach(c => {
        const v = c.getAttribute('data-result');
        c.classList.toggle('selected', v === _opkLogResult);
        c.classList.toggle('neg', v === 'neg' && v === _opkLogResult);
        c.classList.toggle('faint', v === 'faint' && v === _opkLogResult);
        c.classList.toggle('pos', v === 'pos' && v === _opkLogResult);
    });
}
function opkLogSelectResult(val) {
    if (typeof haptic === 'function')
        haptic('light');
    _opkLogResult = (_opkLogResult === val) ? null : val;
    renderOpkLogSheet();
}
function saveOpkLog() {
    if (!_opkLogResult) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Pick a test result');
        return;
    }
    if (typeof haptic === 'function')
        haptic('light');
    const note = (document.getElementById('opkLogNoteInput')?.value || '').trim().slice(0, 200);
    const entry = { date: _opkLogDate, result: _opkLogResult, note };
    cycleData.opkLogs = cycleData.opkLogs || [];
    const idx = cycleData.opkLogs.findIndex(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _opkLogDate;
    });
    if (idx >= 0)
        cycleData.opkLogs[idx] = entry;
    else
        cycleData.opkLogs.push(entry);
    cycleData.opkLogs.sort((a, b) => a.date - b.date);
    // Positive OPK result is a strong ovulation signal — auto-log ovulation if not already logged today
    if (_opkLogResult === 'pos') {
        const hasOvulToday = (cycleData.logs || []).some(l => {
            if (l.type !== 'ovulation')
                return false;
            const ld = new Date(l.date);
            const lm = new Date(ld.getFullYear(), ld.getMonth(), ld.getDate()).getTime();
            return lm === _opkLogDate;
        });
        if (!hasOvulToday) {
            cycleData.logs = [...(cycleData.logs || []), { type: 'ovulation', date: _opkLogDate }];
        }
    }
    saveCycle();
    closeOpkLogSheet();
    renderCycleSheet();
    const msgs = { neg: '✅ Negative OPK logged', faint: '✅ Faint line logged', pos: '✅ Positive OPK logged — ovulation marked!' };
    if (typeof vikramToast === 'function')
        vikramToast(msgs[_opkLogResult] || '✅ Logged');
}
// ── Cervical mucus log ──────────────────────────────────────────────────────
const MUCUS_TYPES = {
    dry: { emoji: '⚪', label: 'Dry', fertility: 'Low' },
    sticky: { emoji: '🟤', label: 'Sticky', fertility: 'Low' },
    creamy: { emoji: '🟡', label: 'Creamy', fertility: 'Medium' },
    watery: { emoji: '💧', label: 'Watery', fertility: 'High' },
    eggwhite: { emoji: '🥚', label: 'Egg white', fertility: 'Peak' },
};
let _mucusLogDate = null;
let _mucusLogType = null;
function openMucusLogSheet(dateTs) {
    if (typeof haptic === 'function')
        haptic('light');
    _mucusLogDate = dateTs || new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    const existing = (cycleData.mucusLogs || []).find(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _mucusLogDate;
    });
    _mucusLogType = existing ? existing.type : null;
    const noteEl = document.getElementById('mucusLogNoteInput');
    if (noteEl)
        noteEl.value = existing ? (existing.note || '') : '';
    renderMucusLogSheet();
    const sheet = document.getElementById('mucusLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeMucusLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('mucusLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderMucusLogSheet() {
    const titleEl = document.getElementById('mucusLogDateLabel');
    if (titleEl) {
        const d = new Date(_mucusLogDate);
        const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        titleEl.textContent = (_mucusLogDate === todayMid) ? 'Today' : d.toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const phaseEl = document.getElementById('mucusLogPhaseTag');
    if (phaseEl) {
        const ph = (typeof getPhaseForDate === 'function') ? getPhaseForDate(_mucusLogDate) : null;
        phaseEl.innerHTML = ph ? phaseTagHTML(ph.name) + `<span style="font-size:11px;font-weight:700;color:var(--dsub);margin-left:6px;">Day ${ph.dayIn}</span>` : `<span style="font-size:11px;font-weight:700;color:var(--dsub);">Log a period start date to see phase</span>`;
    }
    document.querySelectorAll('#mucusTypeRow .ttc-result-chip').forEach(c => {
        const v = c.getAttribute('data-mucus');
        c.classList.toggle('selected', v === _mucusLogType);
    });
}
function mucusLogSelectType(val) {
    if (typeof haptic === 'function')
        haptic('light');
    _mucusLogType = (_mucusLogType === val) ? null : val;
    renderMucusLogSheet();
}
function saveMucusLog() {
    if (!_mucusLogType) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Pick a mucus type');
        return;
    }
    if (typeof haptic === 'function')
        haptic('light');
    const note = (document.getElementById('mucusLogNoteInput')?.value || '').trim().slice(0, 200);
    const entry = { date: _mucusLogDate, type: _mucusLogType, note };
    cycleData.mucusLogs = cycleData.mucusLogs || [];
    const idx = cycleData.mucusLogs.findIndex(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _mucusLogDate;
    });
    if (idx >= 0)
        cycleData.mucusLogs[idx] = entry;
    else
        cycleData.mucusLogs.push(entry);
    cycleData.mucusLogs.sort((a, b) => a.date - b.date);
    saveCycle();
    closeMucusLogSheet();
    renderCycleSheet();
    const mm = MUCUS_TYPES[_mucusLogType];
    if (typeof vikramToast === 'function')
        vikramToast(`✅ ${mm.label} mucus logged`);
}
function mucusDeleteLog(idx) {
    if (typeof haptic === 'function')
        haptic('light');
    const logs = cycleData.mucusLogs || [];
    if (idx < 0 || idx >= logs.length)
        return;
    logs.splice(idx, 1);
    cycleData.mucusLogs = logs;
    saveCycle();
    renderTtcHistorySheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('🗑 Entry deleted');
}
// ══ BIRTH CONTROL / CONTRACEPTION TRACKING ════════════════════════════════
// cycleData.contraception: { type:'pill'|'patch'|'ring'|'other', packLength:21|28, placeboLength:7, startDate, reminderTime, reminderOn }
// cycleData.contraceptionLogs: [{ date, taken:bool }] — one entry per day
const CONTRA_TYPES = {
    pill: { emoji: '💊', label: 'Birth control pill' },
    patch: { emoji: '🩹', label: 'Patch' },
    ring: { emoji: '⭕', label: 'Ring' },
    other: { emoji: '💉', label: 'Other' },
};
function _contraTodayMid() {
    return new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
}
function contraPackDayInfo() {
    const c = cycleData.contraception;
    if (!c || !c.startDate)
        return null;
    const start = new Date(c.startDate);
    const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const todayMid = _contraTodayMid();
    const totalLen = (c.packLength || 21) + (c.placeboLength || 0);
    const daysSince = Math.floor((todayMid - startMid) / 86400000);
    const dayInPack = ((daysSince % totalLen) + totalLen) % totalLen + 1; // 1-indexed
    const isPlacebo = c.placeboLength > 0 && dayInPack > (c.packLength || 21);
    return { dayInPack, totalLen, isPlacebo, activeLen: c.packLength || 21 };
}
function contraTakenToday() {
    const today = _contraTodayMid();
    return (cycleData.contraceptionLogs || []).some(l => {
        const ld = new Date(l.date);
        return new Date(ld.getFullYear(), ld.getMonth(), ld.getDate()).getTime() === today && l.taken;
    });
}
function openContraSetupSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const c = cycleData.contraception || { type: 'pill', packLength: 21, placeboLength: 7, startDate: null, reminderTime: '08:00', reminderOn: false };
    const typeEl = document.getElementById('contraTypeSelect');
    if (typeEl)
        typeEl.value = c.type || 'pill';
    const plEl = document.getElementById('contraPackLenInput');
    if (plEl)
        plEl.value = c.packLength || 21;
    const phEl = document.getElementById('contraPlaceboLenInput');
    if (phEl)
        phEl.value = c.placeboLength != null ? c.placeboLength : 7;
    const sdEl = document.getElementById('contraStartDateInput');
    if (sdEl)
        sdEl.value = c.startDate ? new Date(c.startDate).toISOString().slice(0, 10) : '';
    const rtEl = document.getElementById('contraReminderTimeInput');
    if (rtEl)
        rtEl.value = c.reminderTime || '08:00';
    const sheet = document.getElementById('contraSetupSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeContraSetupSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('contraSetupSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function saveContraSetup() {
    const type = document.getElementById('contraTypeSelect')?.value || 'pill';
    const packLength = Math.max(1, parseInt(document.getElementById('contraPackLenInput')?.value, 10) || 21);
    const placeboLength = Math.max(0, parseInt(document.getElementById('contraPlaceboLenInput')?.value, 10) || 0);
    const startRaw = document.getElementById('contraStartDateInput')?.value;
    if (!startRaw) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Pick a pack start date');
        return;
    }
    const startDate = new Date(startRaw + 'T00:00:00').getTime();
    const reminderTime = document.getElementById('contraReminderTimeInput')?.value || '08:00';
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.contraception = {
        type, packLength, placeboLength, startDate, reminderTime,
        reminderOn: (cycleData.contraception && cycleData.contraception.reminderOn) || false
    };
    saveCycle();
    closeContraSetupSheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Birth control tracking set up');
}
function contraToggleReminder() {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.contraception = cycleData.contraception || {};
    cycleData.contraception.reminderOn = !cycleData.contraception.reminderOn;
    if (cycleData.contraception.reminderOn && typeof requestNotifPerm === 'function' && 'Notification' in window && Notification.permission !== 'granted') {
        requestNotifPerm().then(() => { saveCycle(); renderCycleSheet(); });
        return;
    }
    saveCycle();
    renderCycleSheet();
}
function contraMarkTaken() {
    if (typeof haptic === 'function')
        haptic('light');
    const today = _contraTodayMid();
    cycleData.contraceptionLogs = cycleData.contraceptionLogs || [];
    const idx = cycleData.contraceptionLogs.findIndex(l => {
        const ld = new Date(l.date);
        return new Date(ld.getFullYear(), ld.getMonth(), ld.getDate()).getTime() === today;
    });
    if (idx >= 0)
        cycleData.contraceptionLogs[idx].taken = !cycleData.contraceptionLogs[idx].taken;
    else
        cycleData.contraceptionLogs.push({ date: Date.now(), taken: true });
    saveCycle();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast(contraTakenToday() ? '✅ Marked taken' : '↩️ Unmarked');
}
function contraRemove() {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.contraception = null;
    saveCycle();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('🗑 Birth control tracking removed');
}
function openContraHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderContraHistorySheet();
    const sheet = document.getElementById('contraHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeContraHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('contraHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderContraHistorySheet() {
    const body = document.getElementById('contraHistorySheetBody');
    if (!body)
        return;
    const logs = (cycleData.contraceptionLogs || []).filter(l => l.taken).sort((a, b) => b.date - a.date);
    if (!logs.length) {
        body.innerHTML = `<div style="padding:40px 24px;text-align:center;font-size:13px;font-weight:700;color:var(--dsub);">No doses logged yet 💊</div>`;
        return;
    }
    body.innerHTML = `<div class="ssec" style="padding-top:4px;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>Taken doses</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length}</span>
    </div>
    ${logs.map(l => `<div class="srow" style="border-bottom:none;">
      <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
        <div style="width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;"></div>
        <div class="slbl">${new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </div>
    </div>`).join('')}
  </div>`;
}
// ── BBT (basal body temperature) log ──
let _bbtLogDate = null;
function openBbtLogSheet(dateTs) {
    if (typeof haptic === 'function')
        haptic('light');
    _bbtLogDate = dateTs || new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    const existing = (cycleData.bbtLogs || []).find(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _bbtLogDate;
    });
    const unit = cycleData.bbtUnit || 'C';
    document.querySelectorAll('#bbtUnitToggle .ttc-unit-btn').forEach(b => {
        b.classList.toggle('on', b.getAttribute('data-unit') === unit);
    });
    const tempEl = document.getElementById('bbtTempInput');
    if (tempEl)
        tempEl.value = existing ? existing.temp : '';
    const timeEl = document.getElementById('bbtTimeInput');
    if (timeEl)
        timeEl.value = existing && existing.time ? existing.time : '07:00';
    const noteEl = document.getElementById('bbtLogNoteInput');
    if (noteEl)
        noteEl.value = existing ? (existing.note || '') : '';
    const titleEl = document.getElementById('bbtLogDateLabel');
    if (titleEl) {
        const d = new Date(_bbtLogDate);
        const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        titleEl.textContent = (_bbtLogDate === todayMid) ? 'Today' : d.toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const phaseEl = document.getElementById('bbtLogPhaseTag');
    if (phaseEl) {
        const ph = (typeof getPhaseForDate === 'function') ? getPhaseForDate(_bbtLogDate) : null;
        phaseEl.innerHTML = ph ? phaseTagHTML(ph.name) + `<span style="font-size:11px;font-weight:700;color:var(--dsub);margin-left:6px;">Day ${ph.dayIn}</span>` : `<span style="font-size:11px;font-weight:700;color:var(--dsub);">Log a period start date to see phase</span>`;
    }
    const sheet = document.getElementById('bbtLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeBbtLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('bbtLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function bbtSelectUnit(unit) {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.bbtUnit = unit;
    saveCycle();
    document.querySelectorAll('#bbtUnitToggle .ttc-unit-btn').forEach(b => {
        b.classList.toggle('on', b.getAttribute('data-unit') === unit);
    });
}
function saveBbtLog() {
    const tempEl = document.getElementById('bbtTempInput');
    const raw = tempEl ? tempEl.value.trim() : '';
    const temp = parseFloat(raw);
    if (!raw || isNaN(temp)) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Enter a temperature');
        if (tempEl)
            tempEl.focus();
        return;
    }
    const unit = cycleData.bbtUnit || 'C';
    // Sanity range check (generous, covers C and F)
    const min = unit === 'C' ? 33 : 91, max = unit === 'C' ? 41 : 106;
    if (temp < min || temp > max) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ That temperature looks out of range');
        return;
    }
    if (typeof haptic === 'function')
        haptic('light');
    const time = document.getElementById('bbtTimeInput')?.value || '';
    const note = (document.getElementById('bbtLogNoteInput')?.value || '').trim().slice(0, 200);
    const entry = { date: _bbtLogDate, temp, unit, time, note };
    cycleData.bbtLogs = cycleData.bbtLogs || [];
    const idx = cycleData.bbtLogs.findIndex(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _bbtLogDate;
    });
    if (idx >= 0)
        cycleData.bbtLogs[idx] = entry;
    else
        cycleData.bbtLogs.push(entry);
    cycleData.bbtLogs.sort((a, b) => a.date - b.date);
    saveCycle();
    closeBbtLogSheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Temperature logged 🌡️');
}
// ── Convert a BBT entry's stored temp to the currently-displayed unit ──
function _bbtToUnit(entry, displayUnit) {
    if (entry.unit === displayUnit)
        return entry.temp;
    if (entry.unit === 'C' && displayUnit === 'F')
        return entry.temp * 9 / 5 + 32;
    if (entry.unit === 'F' && displayUnit === 'C')
        return (entry.temp - 32) * 5 / 9;
    return entry.temp;
}
// ── TTC History Sheet (tabs: Intercourse / OPK / BBT) ──
let _ttcHistTab = 'bd'; // 'bd' | 'opk' | 'bbt'
function openTtcHistorySheet(tab) {
    if (typeof haptic === 'function')
        haptic('light');
    _ttcHistTab = tab || 'bd';
    renderTtcHistorySheet();
    const sheet = document.getElementById('ttcHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeTtcHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('ttcHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function setTtcHistTab(tab) {
    if (typeof haptic === 'function')
        haptic('light');
    _ttcHistTab = tab;
    renderTtcHistorySheet();
}
function _ttcDateStr(ts) {
    return new Date(ts).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
}
function renderTtcBbtChart(logs) {
    if (logs.length < 2)
        return '';
    const unit = cycleData.bbtUnit || 'C';
    const W = Math.max(320, logs.length * 34), H = 168, padL = 34, padR = 12, padT = 14, padB = 46;
    const vals = logs.map(l => _bbtToUnit(l, unit));
    let lo = Math.min(...vals), hi = Math.max(...vals);
    if (hi - lo < 0.4) {
        const mid = (hi + lo) / 2;
        lo = mid - 0.4;
        hi = mid + 0.4;
    }
    lo -= 0.15;
    hi += 0.15;
    const xStep = (W - padL - padR) / Math.max(1, logs.length - 1);
    const yFor = v => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB - 22);
    const xFor = i => padL + i * xStep;
    const pathD = logs.map((l, i) => `${i === 0 ? 'M' : 'L'}${xFor(i).toFixed(1)},${yFor(vals[i]).toFixed(1)}`).join(' ');
    const ovulSet = new Set((cycleData.logs || []).filter(l => l.type === 'ovulation').map(l => {
        const d = new Date(l.date);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }));
    const dots = logs.map((l, i) => {
        const x = xFor(i), y = yFor(vals[i]);
        const dMid = (() => { const d = new Date(l.date); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); })();
        const isOvul = ovulSet.has(dMid);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isOvul ? 4.5 : 3}" fill="${isOvul ? '#a855f7' : '#FF6B9D'}" stroke="${isOvul ? '#fff' : 'none'}" stroke-width="${isOvul ? 1.5 : 0}"/>`;
    }).join('');
    const xLabels = logs.map((l, i) => {
        if (logs.length > 10 && i % Math.ceil(logs.length / 8) !== 0 && i !== logs.length - 1)
            return '';
        const d = new Date(l.date);
        return `<text x="${xFor(i).toFixed(1)}" y="${H - 30}" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--dsub)">${d.getDate()}/${d.getMonth() + 1}</text>`;
    }).join('');
    const yTicks = [lo + (hi - lo) * 0.15, lo + (hi - lo) * 0.5, lo + (hi - lo) * 0.85];
    const yLabels = yTicks.map(v => {
        const y = yFor(v);
        return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="var(--sbdr)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="${padL - 5}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="8.5" font-weight="700" fill="var(--dsub)">${v.toFixed(1)}</text>`;
    }).join('');
    // Cervical mucus row underneath the temperature line — same day-by-day x positions
    const mucusColors = { dry: '#d4d4d8', sticky: '#a78bfa', creamy: '#fbbf24', watery: '#38bdf8', eggwhite: '#22c55e' };
    const mucusRowY = H - 16;
    const mucusRow = logs.map((l, i) => {
        const dMid = (() => { const d = new Date(l.date); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); })();
        const ml = (cycleData.mucusLogs || []).find(m => {
            const md = new Date(m.date);
            return new Date(md.getFullYear(), md.getMonth(), md.getDate()).getTime() === dMid;
        });
        if (!ml)
            return '';
        const x = xFor(i);
        const color = mucusColors[ml.type] || '#d4d4d8';
        return `<circle cx="${x.toFixed(1)}" cy="${mucusRowY}" r="3.5" fill="${color}"/>`;
    }).join('');
    const hasMucusRow = (cycleData.mucusLogs || []).length > 0;
    return `<div class="ttc-bbt-chart-wrap"><svg class="ttc-bbt-chart-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${yLabels}
    <path d="${pathD}" fill="none" stroke="#FF6B9D" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
    ${xLabels}
    ${hasMucusRow ? `<text x="${padL - 5}" y="${mucusRowY + 3}" text-anchor="end" font-size="8" font-weight="700" fill="var(--dsub)">🥚</text>${mucusRow}` : ''}
  </svg></div>
  <div style="display:flex;gap:14px;padding:0 0 4px;font-size:10px;font-weight:700;color:var(--dsub);flex-wrap:wrap;">
    <span style="display:flex;align-items:center;gap:4px;"><span style="width:7px;height:7px;border-radius:50%;background:#FF6B9D;display:inline-block;"></span>Temp (°${unit})</span>
    <span style="display:flex;align-items:center;gap:4px;"><span style="width:7px;height:7px;border-radius:50%;background:#a855f7;display:inline-block;"></span>Ovulation logged</span>
    ${hasMucusRow ? `<span style="display:flex;align-items:center;gap:4px;"><span style="width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;"></span>Mucus (egg-white = peak)</span>` : ''}
  </div>`;
}
function renderTtcHistorySheet() {
    const tabBar = document.getElementById('ttcHistTabBar');
    if (tabBar) {
        tabBar.querySelectorAll('.up-vtbtn').forEach(b => {
            b.classList.toggle('on', b.getAttribute('data-tab') === _ttcHistTab);
        });
    }
    const body = document.getElementById('ttcHistorySheetBody');
    if (!body)
        return;
    if (_ttcHistTab === 'bd') {
        const logs = cycleData.intercourseLogs || [];
        if (!logs.length) {
            body.innerHTML = `<div class="ttc-mode-empty">No intercourse entries yet — log above 💕</div>`;
            return;
        }
        body.innerHTML = `<div class="ssec" style="padding-top:4px;">
      <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
        <span>All entries</span>
        <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      ${[...logs].reverse().map((l, revIdx) => {
            const realIdx = logs.length - 1 - revIdx;
            return `<div class="ttc-log-row">
          <div class="ttc-log-top">
            <div class="ttc-log-left">
              <div class="ttc-log-icon">💕</div>
              <div>
                <div class="ttc-log-date">${_ttcDateStr(l.date)}</div>
                <div class="ttc-log-detail">${l.protected ? 'Protected' : 'Unprotected'}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
              <button class="cyc-log-del" title="Edit" onclick="closeTtcHistorySheet();openIntercourseLogSheet(${l.date})">✏️</button>
              <button class="cyc-log-del" title="Delete" onclick="ttcDeleteLog('bd',${realIdx})">🗑</button>
            </div>
          </div>
          ${l.note ? `<div class="ttc-log-note">"${esc(l.note)}"</div>` : ''}
        </div>`;
        }).join('')}
    </div>`;
        return;
    }
    if (_ttcHistTab === 'opk') {
        const logs = cycleData.opkLogs || [];
        if (!logs.length) {
            body.innerHTML = `<div class="ttc-mode-empty">No ovulation test entries yet — log above 🧪</div>`;
            return;
        }
        const resultMeta = { neg: { emoji: '⚪', label: 'Negative', cls: 'neg' }, faint: { emoji: '🟡', label: 'Faint line', cls: 'faint' }, pos: { emoji: '🟢', label: 'Positive', cls: 'pos' } };
        body.innerHTML = `<div class="ssec" style="padding-top:4px;">
      <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
        <span>All entries</span>
        <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      ${[...logs].reverse().map((l, revIdx) => {
            const realIdx = logs.length - 1 - revIdx;
            const rm = resultMeta[l.result] || resultMeta.neg;
            return `<div class="ttc-log-row">
          <div class="ttc-log-top">
            <div class="ttc-log-left">
              <div class="ttc-log-icon">🧪</div>
              <div>
                <div class="ttc-log-date">${_ttcDateStr(l.date)}</div>
                <div class="ttc-log-detail"><span class="ttc-pill ${rm.cls}">${rm.emoji} ${rm.label}</span></div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
              <button class="cyc-log-del" title="Edit" onclick="closeTtcHistorySheet();openOpkLogSheet(${l.date})">✏️</button>
              <button class="cyc-log-del" title="Delete" onclick="ttcDeleteLog('opk',${realIdx})">🗑</button>
            </div>
          </div>
          ${l.note ? `<div class="ttc-log-note">"${esc(l.note)}"</div>` : ''}
        </div>`;
        }).join('')}
    </div>`;
        return;
    }
    if (_ttcHistTab === 'mucus') {
        const logs = cycleData.mucusLogs || [];
        if (!logs.length) {
            body.innerHTML = `<div class="ttc-mode-empty">No cervical mucus entries yet — log above 🥚</div>`;
            return;
        }
        body.innerHTML = `<div class="ssec" style="padding-top:4px;">
      <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
        <span>All entries</span>
        <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      ${[...logs].reverse().map((l, revIdx) => {
            const realIdx = logs.length - 1 - revIdx;
            const mm = MUCUS_TYPES[l.type] || MUCUS_TYPES.dry;
            return `<div class="ttc-log-row">
          <div class="ttc-log-top">
            <div class="ttc-log-left">
              <div class="ttc-log-icon">${mm.emoji}</div>
              <div>
                <div class="ttc-log-date">${_ttcDateStr(l.date)}</div>
                <div class="ttc-log-detail">${mm.label} · ${mm.fertility} fertility</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
              <button class="cyc-log-del" title="Edit" onclick="closeTtcHistorySheet();openMucusLogSheet(${l.date})">✏️</button>
              <button class="cyc-log-del" title="Delete" onclick="mucusDeleteLog(${realIdx})">🗑</button>
            </div>
          </div>
          ${l.note ? `<div class="ttc-log-note">"${esc(l.note)}"</div>` : ''}
        </div>`;
        }).join('')}
    </div>`;
        return;
    }
    // BBT tab
    const logs = cycleData.bbtLogs || [];
    if (!logs.length) {
        body.innerHTML = `<div class="ttc-mode-empty">No temperature entries yet — log your BBT each morning 🌡️</div>`;
        return;
    }
    const unit = cycleData.bbtUnit || 'C';
    body.innerHTML = `<div class="ssec" style="padding-top:4px;">
    <div class="ssect">Chart</div>
    ${renderTtcBbtChart(logs)}
  </div>
  <div class="ssec" style="padding-top:0;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>All entries</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    ${[...logs].reverse().map((l, revIdx) => {
        const realIdx = logs.length - 1 - revIdx;
        const dispTemp = _bbtToUnit(l, unit);
        return `<div class="ttc-log-row">
        <div class="ttc-log-top">
          <div class="ttc-log-left">
            <div class="ttc-log-icon">🌡️</div>
            <div>
              <div class="ttc-log-date">${_ttcDateStr(l.date)}</div>
              <div class="ttc-log-detail">${dispTemp.toFixed(2)}°${unit}${l.time ? ' · ' + l.time : ''}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
            <button class="cyc-log-del" title="Edit" onclick="closeTtcHistorySheet();openBbtLogSheet(${l.date})">✏️</button>
            <button class="cyc-log-del" title="Delete" onclick="ttcDeleteLog('bbt',${realIdx})">🗑</button>
          </div>
        </div>
        ${l.note ? `<div class="ttc-log-note">"${esc(l.note)}"</div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}
function ttcDeleteLog(kind, idx) {
    if (typeof haptic === 'function')
        haptic('light');
    const key = kind === 'bd' ? 'intercourseLogs' : kind === 'opk' ? 'opkLogs' : kind === 'mucus' ? 'mucusLogs' : 'bbtLogs';
    const logs = cycleData[key] || [];
    if (idx < 0 || idx >= logs.length)
        return;
    logs.splice(idx, 1);
    cycleData[key] = logs;
    saveCycle();
    renderTtcHistorySheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('🗑 Entry deleted');
}
// ══ MEDICATION / SUPPLEMENT LOG ═══════════════════════════════════════════════
// cycleData.medList: [{ id, name, dose }]  — the user's tracked items
// cycleData.medLogs: [{ id, medId, date, taken }] — daily taken/skipped entries
let _medAddName = '';
let _medAddDose = '';
function openMedLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderMedLogSheet();
    const sheet = document.getElementById('medLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeMedLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('medLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function _medTodayMid() {
    return new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
}
function _medTakenToday(medId) {
    const today = _medTodayMid();
    return (cycleData.medLogs || []).find(l => l.medId === medId && new Date(l.date).setHours(0, 0, 0, 0) === today);
}
function renderMedLogSheet() {
    const body = document.getElementById('medLogSheetBody');
    if (!body)
        return;
    const list = cycleData.medList || [];
    body.innerHTML = `
  <div class="ssec" style="padding-top:4px;">
    <div class="ssect">Add medication or supplement</div>
    <div style="display:flex;gap:8px;padding:0 0 4px;">
      <input id="medAddNameInput" type="text" placeholder="Name (e.g. Prenatal vitamin)" maxlength="60"
        value="${esc(_medAddName)}" oninput="_medAddName=this.value"
        style="flex:2;min-width:0;padding:11px 12px;border-radius:12px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:13px;font-family:'Nunito',sans-serif;font-weight:700;"/>
      <input id="medAddDoseInput" type="text" placeholder="Dose" maxlength="30"
        value="${esc(_medAddDose)}" oninput="_medAddDose=this.value"
        style="flex:1;min-width:0;padding:11px 12px;border-radius:12px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:13px;font-family:'Nunito',sans-serif;font-weight:700;"/>
    </div>
    <button onclick="medAddItem()" style="width:100%;margin-top:8px;padding:11px;border-radius:12px;border:none;background:var(--tgon,#1a1a1a);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">+ Add to list</button>
  </div>
  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Today</div>
    ${!list.length ? `<div style="padding:24px;text-align:center;font-size:12.5px;font-weight:700;color:var(--dsub);">No medications added yet — add one above 💊</div>` :
        list.map(m => {
            const taken = _medTakenToday(m.id);
            return `<div class="srow">
          <div style="min-width:0;flex:1;">
            <div class="slbl">${esc(m.name)}</div>
            ${m.dose ? `<div class="ssub">${esc(m.dose)}</div>` : ''}
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
            <button onclick="medToggleTaken('${m.id}')" style="padding:7px 14px;border-radius:10px;border:1.5px solid ${taken ? '#22c55e' : 'var(--sbdr)'};background:${taken ? 'rgba(34,197,94,.14)' : 'var(--sbg)'};color:${taken ? '#22c55e' : 'var(--dsub)'};font-size:11.5px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">${taken ? '✓ Taken' : 'Mark taken'}</button>
            <button class="cyc-log-del" title="Remove" onclick="medRemoveItem('${m.id}')">🗑</button>
          </div>
        </div>`;
        }).join('')}
  </div>
  ${(cycleData.medLogs || []).length ? `
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;border-bottom:none;" onclick="openMedHistorySheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(99,102,241,.15),rgba(99,102,241,.07));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">📋</div>
        <div style="min-width:0;">
          <div class="slbl">Medication history</div>
          <div class="ssub">${(cycleData.medLogs || []).length} ${(cycleData.medLogs || []).length === 1 ? 'entry' : 'entries'}</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </div>` : ''}`;
}
function medAddItem() {
    const name = (_medAddName || '').trim().slice(0, 60);
    if (!name) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Enter a name');
        return;
    }
    if (typeof haptic === 'function')
        haptic('light');
    const dose = (_medAddDose || '').trim().slice(0, 30);
    cycleData.medList = cycleData.medList || [];
    cycleData.medList.push({ id: 'm' + Date.now() + Math.random().toString(36).slice(2, 7), name, dose });
    _medAddName = '';
    _medAddDose = '';
    saveCycle();
    renderMedLogSheet();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Added to your list');
}
function medRemoveItem(id) {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.medList = (cycleData.medList || []).filter(m => m.id !== id);
    saveCycle();
    renderMedLogSheet();
}
function medToggleTaken(medId) {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.medLogs = cycleData.medLogs || [];
    const today = _medTodayMid();
    const idx = cycleData.medLogs.findIndex(l => l.medId === medId && new Date(l.date).setHours(0, 0, 0, 0) === today);
    if (idx >= 0) {
        cycleData.medLogs.splice(idx, 1);
    }
    else {
        cycleData.medLogs.push({ id: 'l' + Date.now() + Math.random().toString(36).slice(2, 7), medId, date: Date.now(), taken: true });
    }
    saveCycle();
    renderMedLogSheet();
    renderCycleSheet();
}
function openMedHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderMedHistorySheet();
    const sheet = document.getElementById('medHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeMedHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('medHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderMedHistorySheet() {
    const body = document.getElementById('medHistorySheetBody');
    if (!body)
        return;
    const logs = cycleData.medLogs || [];
    const list = cycleData.medList || [];
    const nameFor = id => { const m = list.find(x => x.id === id); return m ? m.name : 'Removed item'; };
    if (!logs.length) {
        body.innerHTML = `<div style="padding:40px 24px;text-align:center;font-size:13px;font-weight:700;color:var(--dsub);">No medication entries yet 💊</div>`;
        return;
    }
    body.innerHTML = `<div class="ssec" style="padding-top:4px;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>All entries</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    ${[...logs].reverse().map((l) => {
        const realIdx = logs.length - 1 - logs.slice().reverse().indexOf(l);
        return `<div class="srow">
        <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
          <div style="width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;"></div>
          <div style="min-width:0;">
            <div class="slbl">${esc(nameFor(l.medId))}</div>
            <div class="ssub">${new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
        <button class="cyc-log-del" onclick="medDeleteLog(${realIdx})" title="Delete">🗑</button>
      </div>`;
    }).join('')}
  </div>`;
}
function medDeleteLog(idx) {
    if (typeof haptic === 'function')
        haptic('light');
    const logs = cycleData.medLogs || [];
    if (idx < 0 || idx >= logs.length)
        return;
    logs.splice(idx, 1);
    cycleData.medLogs = logs;
    saveCycle();
    renderMedHistorySheet();
    renderMedLogSheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('🗑 Entry deleted');
}
// ══ WEIGHT & WATER INTAKE LOG ══════════════════════════════════════════════
// cycleData.vitalsLogs: [{ date, weight, weightUnit, water }] — one entry per day, latest wins
let _vitalsLogDate = null;
function openVitalsLogSheet(dateTs) {
    if (typeof haptic === 'function')
        haptic('light');
    _vitalsLogDate = dateTs || _medTodayMid();
    const existing = (cycleData.vitalsLogs || []).find(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _vitalsLogDate;
    });
    const unit = cycleData.weightUnit || 'kg';
    document.querySelectorAll('#vitalsUnitToggle .ttc-unit-btn').forEach(b => {
        b.classList.toggle('on', b.getAttribute('data-unit') === unit);
    });
    const wEl = document.getElementById('vitalsWeightInput');
    if (wEl)
        wEl.value = existing && existing.weight != null ? existing.weight : '';
    const watEl = document.getElementById('vitalsWaterInput');
    if (watEl)
        watEl.value = existing && existing.water != null ? existing.water : '';
    const titleEl = document.getElementById('vitalsLogDateLabel');
    if (titleEl) {
        const d = new Date(_vitalsLogDate);
        const todayMid = _medTodayMid();
        titleEl.textContent = (_vitalsLogDate === todayMid) ? 'Today' : d.toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const sheet = document.getElementById('vitalsLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeVitalsLogSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('vitalsLogSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function vitalsSelectUnit(unit) {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.weightUnit = unit;
    saveCycle();
    document.querySelectorAll('#vitalsUnitToggle .ttc-unit-btn').forEach(b => {
        b.classList.toggle('on', b.getAttribute('data-unit') === unit);
    });
}
function saveVitalsLog() {
    const wEl = document.getElementById('vitalsWeightInput');
    const watEl = document.getElementById('vitalsWaterInput');
    const weightRaw = wEl ? wEl.value.trim() : '';
    const waterRaw = watEl ? watEl.value.trim() : '';
    const weight = weightRaw ? parseFloat(weightRaw) : null;
    const water = waterRaw ? parseFloat(waterRaw) : null;
    if (weight == null && water == null) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Enter weight or water intake');
        return;
    }
    if (weight != null && isNaN(weight)) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ That weight looks invalid');
        return;
    }
    if (typeof haptic === 'function')
        haptic('light');
    const entry = { date: _vitalsLogDate, weight, weightUnit: cycleData.weightUnit || 'kg', water };
    cycleData.vitalsLogs = cycleData.vitalsLogs || [];
    const idx = cycleData.vitalsLogs.findIndex(s => {
        const sd = new Date(s.date);
        const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
        return sm === _vitalsLogDate;
    });
    if (idx >= 0)
        cycleData.vitalsLogs[idx] = entry;
    else
        cycleData.vitalsLogs.push(entry);
    cycleData.vitalsLogs.sort((a, b) => a.date - b.date);
    saveCycle();
    closeVitalsLogSheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('✅ Logged 📋');
}
function openVitalsHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderVitalsHistorySheet();
    const sheet = document.getElementById('vitalsHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeVitalsHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('vitalsHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderVitalsHistorySheet() {
    const body = document.getElementById('vitalsHistorySheetBody');
    if (!body)
        return;
    const logs = cycleData.vitalsLogs || [];
    if (!logs.length) {
        body.innerHTML = `<div style="padding:40px 24px;text-align:center;font-size:13px;font-weight:700;color:var(--dsub);">No weight or water entries yet 📋</div>`;
        return;
    }
    body.innerHTML = `<div class="ssec" style="padding-top:4px;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>All entries</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    ${[...logs].reverse().map((l, revIdx) => {
        const realIdx = logs.length - 1 - revIdx;
        const parts = [];
        if (l.weight != null)
            parts.push(`${l.weight}${l.weightUnit || 'kg'}`);
        if (l.water != null)
            parts.push(`${l.water}L water`);
        return `<div class="srow">
        <div style="min-width:0;">
          <div class="slbl">${parts.join(' · ') || '—'}</div>
          <div class="ssub">${new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
          <button class="cyc-log-del" title="Edit" onclick="closeVitalsHistorySheet();openVitalsLogSheet(${l.date})">✏️</button>
          <button class="cyc-log-del" title="Delete" onclick="vitalsDeleteLog(${realIdx})">🗑</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}
function vitalsDeleteLog(idx) {
    if (typeof haptic === 'function')
        haptic('light');
    const logs = cycleData.vitalsLogs || [];
    if (idx < 0 || idx >= logs.length)
        return;
    logs.splice(idx, 1);
    cycleData.vitalsLogs = logs;
    saveCycle();
    renderVitalsHistorySheet();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('🗑 Entry deleted');
}
function getDaysUntilNextPeriod() {
    const day = getDayOfCycle();
    if (!day)
        return null;
    const cl = cycleData.cycleLength || 28;
    return day > cl ? 0 : cl - day + 1;
}
function getDaysUntilOvulation() {
    const day = getDayOfCycle();
    if (!day)
        return null;
    const ovDay = (cycleData.cycleLength || 28) - 14;
    const remaining = ovDay - day;
    return remaining < 0 ? null : remaining;
}
// ── Hero ring SVG (compact donut for hero card) ─────────────────────────────
// ── Month Review card HTML (calendar grid with phase-colored days) ──────────
// dataSrc: optional {lastPeriodStart, logs} — defaults to the user's own cycleData
function buildMonthReviewCard(notSet, cl, pl, dataSrc) {
    try {
        const src = dataSrc || cycleData;
        const curY = TODAYBS.y, curM = TODAYBS.m;
        const monthDays = BS[curY] ? BS[curY][curM - 1] : 0;
        if (!monthDays)
            return '';
        const firstAD = bsToAd(curY, curM, 1);
        const startDow = (firstAD.getDay() - cfg.fd + 7) % 7;
        const dowLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const orderedDow = [];
        for (let i = 0; i < 7; i++)
            orderedDow.push(dowLabels[(cfg.fd + i) % 7]);
        let cells = '';
        for (let p = 0; p < startDow; p++)
            cells += `<div></div>`;
        for (let d = 1; d <= monthDays; d++) {
            const adDate = new Date(firstAD.getTime() + (d - 1) * 86400000);
            const isToday = adDate.toDateString() === TODAY.toDateString();
            let phaseBg = 'var(--tgbg)', phaseLabel = '', textColor = 'var(--cell-text)';
            if (!notSet && src.lastPeriodStart) {
                const baseTs = new Date(src.lastPeriodStart);
                baseTs.setHours(0, 0, 0, 0);
                const adDateMid = new Date(adDate.getFullYear(), adDate.getMonth(), adDate.getDate());
                const dayNum = Math.round((adDateMid.getTime() - baseTs.getTime()) / 86400000) + 1;
                const dayLogs = (src.logs || []).filter(l => { const ld = new Date(l.date); ld.setHours(0, 0, 0, 0); return ld.getTime() === adDateMid.getTime(); });
                const hasOvulLog = dayLogs.some(l => l.type === 'ovulation');
                // Find period_end log for this cycle
                const cycleStartTs_ = baseTs.getTime();
                const periodEndLog_ = (src.logs || []).filter(l => l.type === 'period_end' && l.date >= cycleStartTs_).sort((a, b) => a.date - b.date)[0];
                // A day is still "period" only if it's within pl AND before/on the period_end log date (if logged)
                const periodEndDayNum_ = periodEndLog_ ? Math.round((periodEndLog_.date - cycleStartTs_) / 86400000) + 1 : pl;
                const effectivePl_ = periodEndLog_ ? Math.min(pl, periodEndDayNum_) : pl;
                if (dayNum >= 1 && dayNum <= cl) {
                    const ovDay2_ = cl - 14, fertileStart_ = ovDay2_ - 4;
                    if (dayNum >= 1 && dayNum <= effectivePl_) {
                        phaseBg = 'rgba(255,71,87,.75)';
                        phaseLabel = '🩸';
                        textColor = '#fff';
                    }
                    else if (hasOvulLog) {
                        phaseBg = 'rgba(168,85,247,.75)';
                        phaseLabel = '✨';
                        textColor = '#fff';
                    }
                    else if (dayNum >= fertileStart_ && dayNum <= ovDay2_) {
                        phaseBg = 'rgba(99,102,241,.65)';
                        textColor = '#fff';
                    }
                    else if (dayNum > ovDay2_) {
                        phaseBg = 'rgba(33,150,243,.55)';
                        textColor = 'rgba(255,255,255,.9)';
                    }
                    else {
                        phaseBg = 'rgba(255,107,157,.45)';
                    }
                }
            }
            const todayRing = isToday ? 'box-shadow:0 0 0 2px var(--accent);' : '';
            cells += `<div style="aspect-ratio:1;border-radius:6px;background:${phaseBg};${todayRing}display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:${textColor};line-height:1.1;">${phaseLabel ? `<span style="font-size:9px;line-height:1;">${phaseLabel}</span>` : ''}<span>${d}</span></div>`;
        }
        const legend = [
            { bg: 'rgba(255,71,87,.75)', label: 'Period' },
            { bg: 'rgba(255,107,157,.45)', label: 'Follicular' },
            { bg: 'rgba(99,102,241,.65)', label: 'Fertile' },
            { bg: 'rgba(168,85,247,.75)', label: 'Ovulation' },
            { bg: 'rgba(33,150,243,.55)', label: 'Luteal' },
        ];
        return `<div style="margin:0 16px 4px;">
      <div style="background:var(--card);border-radius:18px;padding:16px;box-shadow:0 2px 12px rgba(0,0,0,.06);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <span style="font-size:13px;font-weight:900;color:var(--htext);">Month Review</span>
          <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${MEN[curM - 1]} ${curY}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:10px;">
          ${orderedDow.map(d => `<div style="text-align:center;font-size:9px;font-weight:800;color:var(--dsub);padding-bottom:2px;">${d}</div>`).join('')}
          ${cells}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;padding-top:8px;border-top:1px solid var(--border);">
          ${legend.map(l => `<div style="display:flex;align-items:center;gap:4px;font-size:10px;font-weight:700;color:var(--dsub);"><div style="width:10px;height:10px;border-radius:3px;background:${l.bg};flex-shrink:0;"></div>${l.label}</div>`).join('')}
        </div>
      </div>
    </div>`;
    }
    catch (e) {
        return '';
    }
}
function buildHeroRing(dayOfCycle, color) {
    const R = 33, SW = 5.5, CX = 40, CY = 40;
    const C = 2 * Math.PI * R;
    const cl = cycleData.cycleLength || 28;
    const pct = Math.min(1, (dayOfCycle || 1) / cl);
    const filled = (pct * C).toFixed(2);
    return `<svg viewBox="0 0 80 80" width="80" height="80">
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="${SW}"/>
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="${SW}"
      stroke-dasharray="${filled} ${C.toFixed(2)}"
      stroke-dashoffset="${C * 0.25}"
      stroke-linecap="round"
      style="transition:stroke-dasharray .5s ease;"/>
  </svg>`;
}
// ── Phase timeline HTML ──────────────────────────────────────────────────────
function buildPhaseTimeline(dayOfCycle) {
    const cl = cycleData.cycleLength || 28;
    const pl = cycleData.periodLength || 5;
    const ovDay = cl - 14;
    const segments = [
        { start: 0, end: pl, color: '#FF4757', label: 'Period' },
        { start: pl, end: ovDay - 2, color: '#FF6B9D', label: 'Follicular' },
        { start: ovDay - 2, end: ovDay + 2, color: 'rgba(255,255,255,.6)', label: 'Ovulation' },
        { start: ovDay + 2, end: cl, color: '#7dd3fc', label: 'Luteal' },
    ];
    const phase = getPhase();
    const curPhaseName = phase ? phase.name : '';
    return segments.map(s => {
        const width = ((s.end - s.start) / cl * 100).toFixed(1);
        const active = s.label === curPhaseName;
        return `<div class="cyc-timeline-seg ${active ? 'active' : ''}"
      style="width:${width}%;background:${s.color};"
      title="${s.label}"></div>`;
    }).join('');
}
// ── Legacy stubs (kept for any external callers) ─────────────────────────────
function buildPhaseRing(dayOfCycle) { return buildHeroRing(dayOfCycle, '#FF6B9D'); }
function cycRing(pct, emoji) { return ''; }
function cycCard(cls, pct, emoji, val, sub) { return ''; }
// ══ CYCLE MODE — Cycle Tracking / Trying to Conceive / Pregnant ══════════════
// Persisted on cycleData.mode: 'cycle' | 'ttc' | 'avoid' | 'pregnant'
// Pregnancy dates persisted on cycleData.pregnancy: { lmpDate, dueDate, setAt }
function getCycleMode() {
    return cycleData.mode || 'cycle';
}
function _cycleModeMeta(mode) {
    return {
        cycle: { icon: '🌸', label: 'Mode', title: '🌸 My Cycle' },
        ttc: { icon: '🌱', label: 'TTC', title: '🌱 Trying to Conceive' },
        avoid: { icon: '🛡️', label: 'Avoiding', title: '🛡️ Avoiding Pregnancy' },
        pregnant: { icon: '🤰', label: 'Pregnant', title: '🤰 Pregnancy' },
    }[mode] || { icon: '🌸', label: 'Mode', title: '🌸 My Cycle' };
}
// Update header button + title to reflect current mode
function _applyCycleModeUI() {
    const mode = getCycleMode();
    const meta = _cycleModeMeta(mode);
    const btn = document.getElementById('cycleModeBtn');
    const icon = document.getElementById('cycleModeBtnIcon');
    const lbl = document.getElementById('cycleModeBtnLabel');
    const title = document.getElementById('cycleTitleLabel');
    if (btn) {
        btn.classList.remove('mode-ttc', 'mode-pregnant', 'mode-avoid');
        if (mode === 'ttc')
            btn.classList.add('mode-ttc');
        if (mode === 'pregnant')
            btn.classList.add('mode-pregnant');
        if (mode === 'avoid')
            btn.classList.add('mode-avoid');
    }
    if (icon)
        icon.textContent = meta.icon;
    if (lbl)
        lbl.textContent = meta.label;
    // Only set the title if Partner Mode isn't currently overriding it
    if (title && !(typeof _partnerModeActive !== 'undefined' && _partnerModeActive))
        title.textContent = meta.title;
}
// ── Mode picker modal ──
function openCycleModePicker() {
    if (typeof haptic === 'function')
        haptic('light');
    const mode = getCycleMode();
    document.querySelectorAll('#cycleModeOptions .cm-opt').forEach(opt => {
        opt.classList.toggle('selected', opt.getAttribute('data-mode') === mode);
    });
    _applyPartnerModeUI();
    const ov = document.getElementById('cycleModePickerOverlay');
    if (ov)
        ov.classList.add('open');
}
function closeCycleModePicker(e) {
    if (e && e.target !== e.currentTarget)
        return;
    if (typeof haptic === 'function')
        haptic('light');
    const ov = document.getElementById('cycleModePickerOverlay');
    if (ov)
        ov.classList.remove('open');
}
function selectCycleMode(mode) {
    if (typeof haptic === 'function')
        haptic('light');
    if (mode === 'pregnant' && getCycleMode() !== 'pregnant') {
        // Need setup info first
        closeCycleModePicker();
        openPregSetup();
        return;
    }
    if (getCycleMode() === 'pregnant' && mode !== 'pregnant') {
        // Leaving pregnancy mode — confirm first
        closeCycleModePicker();
        openPregEndConfirm(mode);
        return;
    }
    cycleData.mode = mode;
    saveCycle();
    closeCycleModePicker();
    _applyCycleModeUI();
    renderCycleSheet();
}
// ── Pregnancy setup modal ──
function openPregSetup() {
    if (typeof haptic === 'function')
        haptic('light');
    const t = TODAY;
    const pad = n => String(n).padStart(2, '0');
    const todayStr = t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());
    const lmpInput = document.getElementById('pregSetupLmpInput');
    const dueInput = document.getElementById('pregSetupDueInput');
    if (lmpInput) {
        lmpInput.max = todayStr;
        lmpInput.value = (cycleData.pregnancy && cycleData.pregnancy.lmpDate)
            ? _pregTsToDateStr(cycleData.pregnancy.lmpDate)
            : (cycleData.lastPeriodStart ? _pregTsToDateStr(cycleData.lastPeriodStart) : '');
    }
    if (dueInput) {
        dueInput.value = (cycleData.pregnancy && cycleData.pregnancy.dueDate)
            ? _pregTsToDateStr(cycleData.pregnancy.dueDate) : '';
    }
    // Reset to "LMP" tab by default
    document.querySelectorAll('#pregSetupTypeRow .dc-type-opt').forEach(o => o.classList.remove('selected'));
    document.querySelector('#pregSetupTypeRow .dc-type-opt[data-pregtype="lmp"]')?.classList.add('selected');
    document.getElementById('pregSetupLmpField').style.display = '';
    document.getElementById('pregSetupDueField').style.display = 'none';
    const ov = document.getElementById('pregSetupOverlay');
    if (ov)
        ov.classList.add('open');
}
function closePregSetup(e) {
    if (e && e.target !== e.currentTarget)
        return;
    if (typeof haptic === 'function')
        haptic('light');
    const ov = document.getElementById('pregSetupOverlay');
    if (ov)
        ov.classList.remove('open');
}
function pregSetupTypeSelect(el) {
    if (typeof haptic === 'function')
        haptic('light');
    document.querySelectorAll('#pregSetupTypeRow .dc-type-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    const type = el.getAttribute('data-pregtype');
    document.getElementById('pregSetupLmpField').style.display = type === 'lmp' ? '' : 'none';
    document.getElementById('pregSetupDueField').style.display = type === 'due' ? '' : 'none';
}
function _pregTsToDateStr(ts) {
    const d = new Date(ts);
    const pad = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}
function _pregFlashInvalid(inputId) {
    if (typeof haptic === 'function')
        haptic('medium');
    const el = document.getElementById(inputId);
    if (!el)
        return;
    el.style.borderColor = '#f43f5e';
    el.focus();
    setTimeout(() => { el.style.borderColor = ''; }, 1200);
}
function savePregSetup() {
    const type = document.querySelector('#pregSetupTypeRow .dc-type-opt.selected')?.getAttribute('data-pregtype') || 'lmp';
    let lmpTs = null, dueTs = null;
    if (type === 'lmp') {
        const val = document.getElementById('pregSetupLmpInput')?.value;
        if (!val) {
            _pregFlashInvalid('pregSetupLmpInput');
            return;
        }
        const [y, m, dd] = val.split('-').map(Number);
        const lmp = new Date(y, m - 1, dd);
        lmpTs = lmp.getTime();
        dueTs = new Date(lmp.getTime() + 280 * 86400000).getTime(); // 280 days = 40 weeks from LMP
    }
    else {
        const val = document.getElementById('pregSetupDueInput')?.value;
        if (!val) {
            _pregFlashInvalid('pregSetupDueInput');
            return;
        }
        const [y, m, dd] = val.split('-').map(Number);
        const due = new Date(y, m - 1, dd);
        dueTs = due.getTime();
        lmpTs = new Date(due.getTime() - 280 * 86400000).getTime();
    }
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.pregnancy = { lmpDate: lmpTs, dueDate: dueTs, setAt: Date.now() };
    cycleData.mode = 'pregnant';
    saveCycle();
    closePregSetup();
    _applyCycleModeUI();
    renderCycleSheet();
}
// ── Ending pregnancy mode ──
let _pregEndTargetMode = 'cycle';
function openPregEndConfirm(targetMode) {
    _pregEndTargetMode = targetMode || 'cycle';
    const ov = document.getElementById('pregEndOverlay');
    if (ov)
        ov.classList.add('open');
}
function closePregEndConfirm(e) {
    if (e && e.target !== e.currentTarget)
        return;
    if (typeof haptic === 'function')
        haptic('light');
    const ov = document.getElementById('pregEndOverlay');
    if (ov)
        ov.classList.remove('open');
}
function confirmEndPregnancy() {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.mode = _pregEndTargetMode || 'cycle';
    saveCycle();
    closePregEndConfirm();
    _applyCycleModeUI();
    renderCycleSheet();
}
// ── Pregnancy math ──
function getPregnancyInfo() {
    const p = cycleData.pregnancy;
    if (!p || !p.lmpDate)
        return null;
    const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    const lmpD = new Date(p.lmpDate);
    const lmpMid = new Date(lmpD.getFullYear(), lmpD.getMonth(), lmpD.getDate()).getTime();
    const daysPregnant = Math.floor((todayMid - lmpMid) / 86400000);
    const week = Math.floor(daysPregnant / 7);
    const dayInWeek = daysPregnant % 7;
    const dueD = new Date(p.dueDate);
    const dueMid = new Date(dueD.getFullYear(), dueD.getMonth(), dueD.getDate()).getTime();
    const daysToGo = Math.round((dueMid - todayMid) / 86400000);
    const trimester = week < 13 ? 1 : week < 27 ? 2 : 3;
    const pct = Math.max(0, Math.min(1, daysPregnant / 280));
    return { daysPregnant, week, dayInWeek, daysToGo, trimester, pct, dueMid, lmpMid };
}
const TRIMESTER_INFO = {
    1: { label: 'First Trimester', desc: 'Early development — the foundation is being built.' },
    2: { label: 'Second Trimester', desc: 'Often called the most comfortable stretch — energy tends to return.' },
    3: { label: 'Third Trimester', desc: 'The home stretch — baby is growing fast and getting ready.' },
};
function renderPregnancyDashboard(body) {
    const info = getPregnancyInfo();
    if (!info) {
        body.innerHTML = `<div style="padding:48px 24px;text-align:center;">
      <div style="font-size:36px;margin-bottom:14px;">🤰</div>
      <div style="font-size:15px;font-weight:800;color:var(--dtext);margin-bottom:6px;">No pregnancy dates set</div>
      <div style="font-size:12.5px;color:var(--dsub);margin-bottom:18px;">Add your last period date or due date to start tracking.</div>
      <button onclick="openPregSetup()" style="padding:11px 28px;border-radius:12px;border:none;background:linear-gradient(135deg,#7c5cff,#b18cff);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">Set up pregnancy</button>
    </div>`;
        return;
    }
    const { week, dayInWeek, daysToGo, trimester, pct, daysPregnant } = info;
    const ti = TRIMESTER_INFO[trimester];
    const dueDate = new Date(cycleData.pregnancy.dueDate);
    const dueStr = dueDate.toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    const overdue = daysToGo < 0;
    const weeksToGo = Math.max(0, Math.ceil(daysToGo / 7));
    body.innerHTML = `
  <div class="preg-hero">
    <div class="preg-hero-inner">
      <div class="preg-week-lbl">You're currently</div>
      <div class="preg-week-val">Week ${week}<span style="font-size:18px;font-weight:800;opacity:.8;"> + ${dayInWeek}d</span></div>
      <div class="preg-week-sub">${ti.label} · ${daysPregnant} days pregnant</div>
      <div class="preg-progress-wrap"><div class="preg-progress-bar" style="width:${(pct * 100).toFixed(1)}%;"></div></div>
      <div class="preg-trimester-row"><span>T1</span><span>T2</span><span>T3</span><span>Due</span></div>
      <div class="preg-stats-row">
        <div class="preg-stat">
          <div class="preg-stat-val">${overdue ? 'Overdue' : weeksToGo}</div>
          <div class="preg-stat-lbl">${overdue ? ('by ' + Math.abs(daysToGo) + 'd') : 'weeks to go'}</div>
        </div>
        <div class="preg-stat">
          <div class="preg-stat-val">${overdue ? Math.abs(daysToGo) : daysToGo}</div>
          <div class="preg-stat-lbl">${overdue ? 'days overdue' : 'days to go'}</div>
        </div>
        <div class="preg-stat">
          <div class="preg-stat-val">${trimester}<span style="font-size:11px;">${trimester === 1 ? 'st' : trimester === 2 ? 'nd' : 'rd'}</span></div>
          <div class="preg-stat-lbl">trimester</div>
        </div>
      </div>
    </div>
  </div>

  <div class="preg-card">
    <div class="preg-card-title">📅 Due date</div>
    <div class="preg-card-text">${dueStr}${overdue ? ' — your estimated due date has passed. Babies often arrive anywhere from 1–2 weeks before or after this date.' : ''}</div>
  </div>

  <div class="preg-card">
    <div class="preg-card-title">${ti.label}</div>
    <div class="preg-card-text">${ti.desc}</div>
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="openPregSetup()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(124,92,255,.18),rgba(124,92,255,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">✏️</div>
        <div style="min-width:0;">
          <div class="slbl">Edit pregnancy dates</div>
          <div class="ssub">Update last period or due date</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
    <div class="srow" style="cursor:pointer;border-bottom:none;" onclick="openPregEndConfirm('cycle')">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(244,63,94,.15),rgba(244,63,94,.07));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">↩️</div>
        <div style="min-width:0;">
          <div class="slbl" style="color:#f43f5e;">End pregnancy mode</div>
          <div class="ssub">Switch back to cycle tracking</div>
        </div>
      </div>
    </div>
  </div>
  <div style="height:20px;"></div>`;
}
// ── Main render ─────────────────────────────────────────────────────────────
function renderCycleSheet() {
    // ── Partner Mode dispatch ──
    _applyPartnerModeUI();
    _applyCycleModeUI();
    if (_partnerModeActive) {
        const body = document.getElementById('cycleBody');
        if (body) {
            try {
                renderPartnerModeCycleSheet(body);
            }
            catch (e) {
                console.error('[Vikram] renderPartnerModeCycleSheet error:', e);
                body.innerHTML = '<div style="padding:32px 18px;text-align:center;color:var(--dsub);font-size:13px;font-weight:700;">⚠️ Failed to load partner view</div>';
            }
        }
        return;
    }
    // ── Pregnancy Mode dispatch ──
    if (getCycleMode() === 'pregnant') {
        const body = document.getElementById('cycleBody');
        if (body) {
            try {
                renderPregnancyDashboard(body);
            }
            catch (e) {
                console.error('[Vikram] renderPregnancyDashboard error:', e);
                body.innerHTML = '<div style="padding:32px 18px;text-align:center;color:var(--dsub);font-size:13px;font-weight:700;">⚠️ Failed to load pregnancy view</div>';
            }
        }
        return;
    }
    // ── Own cycle render ──
    const body = document.getElementById('cycleBody');
    if (!body)
        return;
    try {
        const d = cycleDefaults();
        cycleData = { ...d, ...cycleData };
        const day = getDayOfCycle();
        const phase = getPhase();
        const pi = phase ? PHASE_INFO[phase.name] : null;
        const dNext = getDaysUntilNextPeriod();
        const dOvul = getDaysUntilOvulation();
        const cl = d.cycleLength, pl = d.periodLength;
        const notSet = !cycleData.lastPeriodStart;
        // Ring progress for each stat card (0–1)
        const ovDay = cl - 14;
        const periodPct = notSet ? 0 : (day <= pl ? day / pl : 1);
        const fertilePct = notSet ? 0 : (dOvul === null ? 1 : Math.min(1, day / ovDay));
        const nextPct = notSet ? 0 : Math.max(0, Math.min(1, (cl - dNext) / cl));
        const cyclePct = notSet ? 0 : Math.min(1, day / cl);
        // Log colours & labels (used in template)
        const logColors = { period_start: '#FF4757', period_end: '#22c55e', ovulation: '#a855f7' };
        const logLabels = { period_start: 'Period started', period_end: 'Period ended', ovulation: 'Ovulation logged' };
        // ── Derive hero gradient & ovulation info ──
        const heroGradients = {
            Menstrual: 'linear-gradient(145deg,#c0392b,#e74c3c,#ff6b6b)',
            Follicular: 'linear-gradient(145deg,#c44569,#FF6B9D,#ffb3cc)',
            Ovulation: 'linear-gradient(145deg,#6c5ce7,#a29bfe,#c9b8ff)',
            Luteal: 'linear-gradient(145deg,#1565c0,#2196F3,#64b5f6)',
        };
        const heroBg = notSet
            ? 'linear-gradient(145deg,#6c5ce7,#a29bfe)'
            : (pi ? heroGradients[phase.name] || heroGradients.Follicular : heroGradients.Follicular);
        // ── Log-aware derived stats ──
        const today0ts = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
        const cycleStartTs = cycleData.lastPeriodStart;
        const allLogs = cycleData.logs || [];
        // Period-end log for current cycle
        const periodEndLog = notSet ? null :
            (allLogs.filter(l => l.type === 'period_end' && l.date >= cycleStartTs)
                .sort((a, b) => b.date - a.date)[0] || null);
        // Ovulation log for current cycle
        const ovulLog = notSet ? null :
            (allLogs.filter(l => l.type === 'ovulation' && l.date >= cycleStartTs)
                .sort((a, b) => b.date - a.date)[0] || null);
        const ovDay2 = cl - 14;
        const fertileStart = ovDay2 - 4;
        const ovulDaysAgo = ovulLog ? Math.round((today0ts - ovulLog.date) / 86400000) : null;
        const periodEndDaysAgo = periodEndLog ? Math.round((today0ts - periodEndLog.date) / 86400000) : null;
        // ── Period card ──
        const periodEndedLabel = periodEndLog
            ? (periodEndDaysAgo === 0 ? 'Today' : periodEndDaysAgo === 1 ? 'Yesterday' : periodEndDaysAgo + 'd ago')
            : null;
        const periodLabel = notSet ? '—'
            : periodEndLog ? 'Done'
                : day <= pl ? 'Day ' + day + '/' + pl
                    : day > (cl - 3) ? 'Soon' : 'Done';
        // ── Fertile card ──
        // Ovulation logged → fertile window is confirmed passed
        const inFertile = !notSet && !ovulLog && day >= fertileStart && day <= ovDay2;
        const dFertileStart = notSet ? null : fertileStart - day;
        const dFertileEnd = notSet ? null : ovDay2 - day;
        const fertileLabel = notSet ? '—'
            : ovulLog ? 'Passed'
                : inFertile ? (dFertileEnd <= 0 ? 'Last day' : dFertileEnd + 'd left')
                    : dFertileStart > 0 ? 'In ' + dFertileStart + 'd'
                        : 'Passed';
        // ── Ovulation card ──
        const ovulLabel = notSet ? '—'
            : ovulLog ? 'Logged'
                : dOvul === null ? 'Passed' : dOvul === 0 ? 'Today!' : 'In ' + dOvul + 'd';
        const ovulSubLabel = ovulLog
            ? (ovulDaysAgo === 0 ? 'Today' : ovulDaysAgo === 1 ? 'Yesterday' : ovulDaysAgo + 'd ago')
            : null;
        // ── Next period card ──
        // Ovulation confirmed → luteal phase is ~14d, so next period = ovulation + 14d
        const nextLabel = (() => {
            if (notSet)
                return '—';
            if (ovulLog) {
                const dFromOvul = 14 - ovulDaysAgo;
                if (dFromOvul <= 0)
                    return 'Today';
                return dFromOvul + 'd';
            }
            return dNext === 0 ? 'Today' : dNext + 'd';
        })();
        const dCycleLeft = notSet ? null : Math.max(0, cl - day);
        const cyclePctStr = notSet ? '—' : Math.round(day / cl * 100) + '%';
        const conceptionChance = notSet ? '—'
            : (ovulLog && ovulDaysAgo <= 1) ? 'Peak'
                : ovulLog ? 'Low'
                    : inFertile ? 'High'
                        : (dFertileStart !== null && dFertileStart > 0 && dFertileStart <= 3) ? 'Rising'
                            : 'Low';
        body.innerHTML = `
  <!-- ── REGULARITY ALERT (3+ cycles with high variance) ── -->
  ${(() => {
            const alert = (typeof getCycleRegularityAlert === 'function') ? getCycleRegularityAlert() : null;
            if (!alert)
                return '';
            return `<div style="margin:0 16px 10px;padding:11px 13px;border-radius:14px;background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.22);display:flex;align-items:center;gap:10px;cursor:pointer;" onclick="openSymptomHistorySheet();setTimeout(function(){setSymHistTab('phase');},0);">
      <div style="font-size:18px;flex-shrink:0;">⚠️</div>
      <div style="min-width:0;flex:1;">
        <div style="font-size:12.5px;font-weight:800;color:#f43f5e;">Your cycles look irregular</div>
        <div style="font-size:11px;font-weight:700;color:var(--dsub);margin-top:1px;">${alert.detail} — consider mentioning this at your next checkup.</div>
      </div>
    </div>`;
        })()}

  <!-- ── TOP VIEW (Hero or Month Review) ── -->
  ${(() => {
            if ((cfg.cycleTopView || 'hero') === 'month') {
                return buildMonthReviewCard(notSet, cl, pl);
            }
            // ── HERO CARD (default) ──
            return `
  <div class="cyc-hero${notSet ? '' : ' tappable'}"${notSet ? '' : ' onclick="openCycleDetailSheet()"'}>
    <div class="cyc-hero-bg" style="background:${heroBg};">
      <div class="cyc-hero-top">
        <div class="cyc-hero-phase">
          <div class="cyc-hero-phase-label">Current Phase</div>
          <div class="cyc-hero-phase-name">${notSet ? 'Not started' : (phase ? phase.name : '—')}</div>
          <div class="cyc-hero-phase-desc">${notSet ? 'Log your first period below' : (pi ? pi.desc : '')}</div>
          ${periodEndedLabel ? `<div style="display:inline-flex;align-items:center;gap:5px;margin-top:6px;padding:3px 9px;border-radius:20px;background:rgba(34,197,94,.18);border:1px solid rgba(34,197,94,.35);width:fit-content;"><span style="font-size:11px;">🌿</span><span style="font-size:11px;font-weight:800;color:rgba(255,255,255,.9);letter-spacing:.2px;">Period ended · ${periodEndedLabel}</span></div>` : ''}
        </div>
        <div class="cyc-hero-ring-wrap">
          ${notSet
                ? `<svg viewBox="0 0 76 76" width="76" height="76"><circle cx="38" cy="38" r="31" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="5"/></svg>`
                : buildHeroRing(day, pi ? pi.color : '#fff')}
          <div class="cyc-hero-ring-center">
            <div class="cyc-hero-ring-day">${notSet ? '–' : day}</div>
            <div class="cyc-hero-ring-of">${notSet ? '' : 'of ' + cl}</div>
          </div>
        </div>
      </div>
      ${notSet ? '' : `<div class="cyc-timeline">${buildPhaseTimeline(day)}</div>`}
      <div class="cyc-hero-stats">
        <div class="cyc-hero-stat">
          <div class="cyc-hero-stat-icon">📅</div>
          <div class="cyc-hero-stat-val">${nextLabel}</div>
          <div class="cyc-hero-stat-lbl">Next period</div>
          ${!notSet ? `<div style="font-size:7.5px;font-weight:800;letter-spacing:.3px;margin-top:2px;opacity:.85;color:${ovulLog ? 'rgba(167,243,208,1)' : 'rgba(196,181,253,1)'};">${ovulLog ? '✓ LOGGED' : '~ PREDICTED'}</div>` : ''}
        </div>
        <div class="cyc-hero-stat">
          <div class="cyc-hero-stat-icon">🩸</div>
          <div class="cyc-hero-stat-val">${periodLabel}</div>
          <div class="cyc-hero-stat-lbl">Period</div>
          ${!notSet ? `<div style="font-size:7.5px;font-weight:800;letter-spacing:.3px;margin-top:2px;opacity:.85;color:${periodEndLog ? 'rgba(167,243,208,1)' : 'rgba(196,181,253,1)'};">${periodEndLog ? '✓ LOGGED' : '~ PREDICTED'}</div>` : ''}
        </div>
        <div class="cyc-hero-stat">
          <div class="cyc-hero-stat-icon">🌸</div>
          <div class="cyc-hero-stat-val">${fertileLabel}</div>
          <div class="cyc-hero-stat-lbl">Fertile</div>
          ${!notSet ? `<div style="font-size:7.5px;font-weight:800;letter-spacing:.3px;margin-top:2px;opacity:.85;color:${ovulLog ? 'rgba(167,243,208,1)' : 'rgba(196,181,253,1)'};">${ovulLog ? '✓ LOGGED' : '~ PREDICTED'}</div>` : ''}
        </div>
        <div class="cyc-hero-stat">
          <div class="cyc-hero-stat-icon">✨</div>
          <div class="cyc-hero-stat-val">${ovulLabel}</div>
          <div class="cyc-hero-stat-lbl">${ovulSubLabel ? ovulSubLabel : 'Ovulation'}</div>
          ${!notSet ? `<div style="font-size:7.5px;font-weight:800;letter-spacing:.3px;margin-top:2px;opacity:.85;color:${ovulLog ? 'rgba(167,243,208,1)' : 'rgba(196,181,253,1)'};">${ovulLog ? '✓ LOGGED' : '~ PREDICTED'}</div>` : ''}
        </div>
      </div>
      </div>
    </div>
  </div>`;
        })()}

  <!-- ── TTC MODE BANNER ── -->
  ${getCycleMode() === 'ttc' && !notSet ? `
  <div class="ttc-banner">
    <div class="ttc-banner-icon">🌱</div>
    <div class="ttc-banner-body">
      <div class="ttc-banner-title">Conception chance: ${conceptionChance}</div>
      <div class="ttc-banner-sub">${inFertile ? 'You\'re in your fertile window — a great time to try.'
            : ovulLog ? 'Ovulation logged this cycle. Fertile window has passed.'
                : (dFertileStart !== null && dFertileStart > 0) ? `Fertile window opens in ${dFertileStart}d.`
                    : 'Track ovulation to pinpoint your next fertile window.'}</div>
    </div>
  </div>` : ''}
  ${getCycleMode() === 'ttc' && notSet ? `
  <div class="ttc-banner">
    <div class="ttc-banner-icon">🌱</div>
    <div class="ttc-banner-body">
      <div class="ttc-banner-title">Trying to Conceive mode</div>
      <div class="ttc-banner-sub">Log your last period below so we can predict your fertile window.</div>
    </div>
  </div>` : ''}

  <!-- ── AVOIDING PREGNANCY MODE BANNER ── -->
  ${getCycleMode() === 'avoid' && !notSet ? `
  <div class="ttc-banner" style="background:linear-gradient(155deg,rgba(56,189,248,.12),rgba(14,165,233,.06));border-color:rgba(14,165,233,.22);">
    <div class="ttc-banner-icon">🛡️</div>
    <div class="ttc-banner-body">
      <div class="ttc-banner-title">Pregnancy risk today: ${conceptionChance === 'Peak' ? 'High' : conceptionChance === 'High' ? 'Elevated' : conceptionChance === 'Rising' ? 'Rising' : 'Low'}</div>
      <div class="ttc-banner-sub">${inFertile ? 'You\'re in your fertile window — use protection or abstain if avoiding pregnancy.'
            : ovulLog ? 'Ovulation logged this cycle. Fertile window has passed — risk is low.'
                : (dFertileStart !== null && dFertileStart > 0) ? `Fertile window opens in ${dFertileStart}d — plan ahead.`
                    : 'Track ovulation to know exactly when your risk window opens.'}</div>
    </div>
  </div>` : ''}
  ${getCycleMode() === 'avoid' && notSet ? `
  <div class="ttc-banner" style="background:linear-gradient(155deg,rgba(56,189,248,.12),rgba(14,165,233,.06));border-color:rgba(14,165,233,.22);">
    <div class="ttc-banner-icon">🛡️</div>
    <div class="ttc-banner-body">
      <div class="ttc-banner-title">Avoiding Pregnancy mode</div>
      <div class="ttc-banner-sub">Log your last period below so we can flag your higher-risk fertile days.</div>
    </div>
  </div>` : ''}

  <!-- ── LOG TODAY ── -->
  <div class="ssec" style="padding-bottom:6px;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>Log</span>
      <div id="cycleTopToggle" class="up-view-toggle">
        <button id="cycTopHeroBtn" class="up-vtbtn${(cfg.cycleTopView || 'hero') === 'hero' ? ' on' : ''}" onclick="setCycleTopView('hero')">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18"/></svg>
          Card
        </button>
        <button id="cycTopMonthBtn" class="up-vtbtn${(cfg.cycleTopView || 'hero') === 'month' ? ' on' : ''}" onclick="setCycleTopView('month')">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Month
        </button>
      </div>
    </div>
    <div class="cyc-log-btn-row">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:#FF4757;"></div>
        <div>
          <div class="cyc-log-btn-label">Period started</div>
          <div class="ssub">${(() => {
            const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
            const todayLog = (cycleData.logs || []).slice().reverse().find(l => l.type === 'period_start' && new Date(l.date).setHours(0, 0, 0, 0) === todayMid);
            if (todayLog && todayLog.flow)
                return 'Logged today · ' + todayLog.flow.charAt(0).toUpperCase() + todayLog.flow.slice(1) + ' flow ✓';
            if (todayLog)
                return 'Logged today ✓';
            return 'First day of bleeding';
        })()}</div>
        </div>
      </div>
      <button class="cyc-log-btn-action period" onclick="cyLogPeriodStart()">Today</button>
    </div>
    <div class="cyc-log-btn-row">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:#22c55e;"></div>
        <div>
          <div class="cyc-log-btn-label">Period ended</div>
          <div class="ssub">${(() => {
            const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
            const todayLog = (cycleData.logs || []).slice().reverse().find(l => l.type === 'period_end' && new Date(l.date).setHours(0, 0, 0, 0) === todayMid);
            if (todayLog && todayLog.flow)
                return 'Logged today · ' + todayLog.flow.charAt(0).toUpperCase() + todayLog.flow.slice(1) + ' flow ✓';
            if (todayLog)
                return 'Logged today ✓';
            return 'Last day of bleeding';
        })()}</div>
        </div>
      </div>
      <button class="cyc-log-btn-action end" onclick="cyLogPeriodEnd()">Today</button>
    </div>
    <div class="cyc-log-btn-row">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:#a855f7;"></div>
        <div>
          <div class="cyc-log-btn-label">Ovulation</div>
          <div class="ssub">Fertile window detected</div>
        </div>
      </div>
      <button class="cyc-log-btn-action ovul" onclick="cyLogOvulation()">Today</button>
    </div>
    ${(getCycleMode() === 'ttc' || getCycleMode() === 'avoid') ? `
    <div class="cyc-log-btn-row">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:#ec4899;"></div>
        <div>
          <div class="cyc-log-btn-label">Intercourse</div>
          <div class="ssub">${(() => {
            const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
            const loggedToday = (cycleData.intercourseLogs || []).some(s => {
                const sd = new Date(s.date);
                return new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime() === todayMid;
            });
            return loggedToday ? 'Logged for today ✓' : 'Track timing during fertile days';
        })()}</div>
        </div>
      </div>
      <button class="cyc-log-btn-action" style="background:rgba(236,72,153,.14);color:#db2777;" onclick="openIntercourseLogSheet()">Log</button>
    </div>
    <div class="cyc-log-btn-row">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:#22c55e;"></div>
        <div>
          <div class="cyc-log-btn-label">Ovulation test</div>
          <div class="ssub">${(() => {
            const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
            const t = (cycleData.opkLogs || []).find(s => {
                const sd = new Date(s.date);
                return new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime() === todayMid;
            });
            const labels = { neg: 'Negative today', faint: 'Faint line today', pos: 'Positive today ✓' };
            return t ? labels[t.result] : 'Log LH strip result';
        })()}</div>
        </div>
      </div>
      <button class="cyc-log-btn-action" style="background:rgba(34,197,94,.14);color:#16a34a;" onclick="openOpkLogSheet()">Log</button>
    </div>
    <div class="cyc-log-btn-row">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:#FF6B9D;"></div>
        <div>
          <div class="cyc-log-btn-label">BBT temperature</div>
          <div class="ssub">${(() => {
            const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
            const t = (cycleData.bbtLogs || []).find(s => {
                const sd = new Date(s.date);
                return new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime() === todayMid;
            });
            return t ? (_bbtToUnit(t, cycleData.bbtUnit || 'C').toFixed(2) + '°' + (cycleData.bbtUnit || 'C') + ' logged ✓') : 'Log your morning reading';
        })()}</div>
        </div>
      </div>
      <button class="cyc-log-btn-action" style="background:rgba(255,107,157,.16);color:#c2255c;" onclick="openBbtLogSheet()">Log</button>
    </div>` : ''}
    <div class="cyc-log-btn-row">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:#f59e0b;"></div>
        <div>
          <div class="cyc-log-btn-label">Mood &amp; symptoms</div>
          <div class="ssub">${(() => {
            const todayMid = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
            const loggedToday = (cycleData.symptomLogs || []).some(s => {
                const sd = new Date(s.date);
                const sm = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()).getTime();
                return sm === todayMid;
            });
            return loggedToday ? 'Logged for today ✓' : 'How are you feeling today?';
        })()}</div>
        </div>
      </div>
      <button class="cyc-log-btn-action" style="background:rgba(245,158,11,.14);color:#b45309;" onclick="openSymptomLogSheet()">Log</button>
    </div>
    <div class="cyc-log-btn-row" style="border-bottom:none;">
      <div class="cyc-log-btn-left">
        <div class="cyc-log-btn-dot" style="background:var(--dsub);"></div>
        <div>
          <div class="cyc-log-btn-label">Log by date</div>
          <div class="ssub">Pick any past or future date</div>
        </div>
      </div>
      <button class="cyc-log-btn-action" style="background:var(--tgbg);color:var(--dtext);" onclick="cyLogByDateOpen()">Pick date</button>
    </div>
  </div>

  <!-- ── TTC HISTORY ENTRIES (Intercourse / OPK / BBT) ── -->
  ${(getCycleMode() === 'ttc' || getCycleMode() === 'avoid') ? `
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="openTtcHistorySheet('bd')">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(236,72,153,.18),rgba(236,72,153,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💕</div>
        <div style="min-width:0;">
          <div class="slbl">Intercourse log</div>
          <div class="ssub">${(cycleData.intercourseLogs || []).length} ${(cycleData.intercourseLogs || []).length === 1 ? 'entry' : 'entries'}</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
    <div class="srow" style="cursor:pointer;" onclick="openTtcHistorySheet('opk')">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(34,197,94,.18),rgba(34,197,94,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🧪</div>
        <div style="min-width:0;">
          <div class="slbl">Ovulation test results</div>
          <div class="ssub">${(cycleData.opkLogs || []).length} ${(cycleData.opkLogs || []).length === 1 ? 'entry' : 'entries'}</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
    <div class="srow" style="cursor:pointer;" onclick="openTtcHistorySheet('mucus')">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(34,197,94,.18),rgba(34,197,94,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🥚</div>
        <div style="min-width:0;">
          <div class="slbl">Cervical mucus</div>
          <div class="ssub">${(cycleData.mucusLogs || []).length} ${(cycleData.mucusLogs || []).length === 1 ? 'entry' : 'entries'}</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
    <div class="srow" style="cursor:pointer;border-bottom:none;" onclick="openTtcHistorySheet('bbt')">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(255,107,157,.2),rgba(255,107,157,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🌡️</div>
        <div style="min-width:0;">
          <div class="slbl">BBT chart &amp; log</div>
          <div class="ssub">${(cycleData.bbtLogs || []).length} ${(cycleData.bbtLogs || []).length === 1 ? 'entry' : 'entries'}</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </div>` : ''}

  <!-- ── MOOD & SYMPTOM HISTORY ── -->
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="openSymptomHistorySheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(245,158,11,.18),rgba(245,158,11,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💭</div>
        <div style="min-width:0;">
          <div class="slbl">Mood &amp; symptom history</div>
          <div class="ssub" id="symptomHistoryEntrySub">${(cycleData.symptomLogs || []).length} ${(cycleData.symptomLogs || []).length === 1 ? 'entry' : 'entries'} · tracked by phase</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </div>

  <!-- ── MEDICATION / SUPPLEMENT LOG ── -->
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;border-bottom:none;" onclick="openMedLogSheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(99,102,241,.18),rgba(99,102,241,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💊</div>
        <div style="min-width:0;">
          <div class="slbl">Medication &amp; supplements</div>
          <div class="ssub">${(cycleData.medList || []).length} tracked · ${(cycleData.medLogs || []).length} ${(cycleData.medLogs || []).length === 1 ? 'log' : 'logs'}</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </div>

  <!-- ── BIRTH CONTROL / CONTRACEPTION ── -->
  <div class="ssec" style="padding-top:0;">
    ${(() => {
            const c = cycleData.contraception;
            if (!c) {
                return `<div class="srow" style="cursor:pointer;border-bottom:none;" onclick="openContraSetupSheet()">
          <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
            <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(236,72,153,.18),rgba(236,72,153,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💊</div>
            <div style="min-width:0;">
              <div class="slbl">Birth control</div>
              <div class="ssub">Set up pill, patch, or ring tracking</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`;
            }
            const info = contraPackDayInfo();
            const taken = contraTakenToday();
            const tm = CONTRA_TYPES[c.type] || CONTRA_TYPES.pill;
            return `<div class="srow">
        <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
          <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(236,72,153,.18),rgba(236,72,153,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${tm.emoji}</div>
          <div style="min-width:0;">
            <div class="slbl">${tm.label}${info ? ` · Day ${info.dayInPack}/${info.totalLen}` : ''}</div>
            <div class="ssub">${info && info.isPlacebo ? 'Placebo / reminder week' : info ? 'Active dose week' : 'Set a start date'}</div>
          </div>
        </div>
        <button onclick="contraMarkTaken()" style="padding:7px 14px;border-radius:10px;border:1.5px solid ${taken ? '#22c55e' : 'var(--sbdr)'};background:${taken ? 'rgba(34,197,94,.14)' : 'var(--sbg)'};color:${taken ? '#22c55e' : 'var(--dsub)'};font-size:11.5px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;flex-shrink:0;">${taken ? '✓ Taken' : 'Mark taken'}</button>
      </div>
      <div class="srow" style="cursor:pointer;" onclick="contraToggleReminder()">
        <div class="slbl">Daily reminder</div>
        <div class="cm-opt-switch${c.reminderOn ? ' on' : ''}"><div class="cm-opt-switch-knob"></div></div>
      </div>
      <div class="srow" style="border-bottom:none;">
        <span style="font-size:12px;font-weight:800;color:var(--dsub);cursor:pointer;" onclick="openContraHistorySheet()">View history</span>
        <div style="display:flex;gap:10px;">
          <span style="font-size:12px;font-weight:800;color:var(--dsub);cursor:pointer;" onclick="openContraSetupSheet()">Edit</span>
          <span style="font-size:12px;font-weight:800;color:#f43f5e;cursor:pointer;" onclick="contraRemove()">Remove</span>
        </div>
      </div>`;
        })()}
  </div>

  <!-- ── WEIGHT & WATER LOG ── -->
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="openVitalsLogSheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(14,165,233,.18),rgba(14,165,233,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">⚖️</div>
        <div style="min-width:0;">
          <div class="slbl">Weight &amp; water log</div>
          <div class="ssub">Log today's weight or water intake</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
    ${(cycleData.vitalsLogs || []).length ? `
    <div class="srow" style="cursor:pointer;border-bottom:none;" onclick="openVitalsHistorySheet()">
      <div style="min-width:0;">
        <div class="slbl">History</div>
        <div class="ssub">${(cycleData.vitalsLogs || []).length} ${(cycleData.vitalsLogs || []).length === 1 ? 'entry' : 'entries'}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>` : ''}
  </div>

  <!-- ── ALL LOGS ── -->
  ${(cycleData.logs || []).length ? `
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="openLogHistorySheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(255,71,87,.15),rgba(255,71,87,.07));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">📋</div>
        <div style="min-width:0;">
          <div class="slbl">Log history</div>
          <div class="ssub" id="logHistoryEntrySub">${(cycleData.logs || []).length} ${(cycleData.logs || []).length === 1 ? 'entry' : 'entries'}</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </div>` : ''}

  <!-- ── CYCLE INSIGHTS & TRENDS ── -->
  ${!notSet ? renderCycleInsights() : ''}

  <!-- ── CYCLE HISTORY ── -->
  ${renderCycleHistory()}

  <!-- ── PARTNER SYNC ── -->
  <div id="pairSyncSection"></div>
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" id="pairSyncEntryRow" onclick="openPartnerSyncSheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(255,107,157,.18),rgba(236,72,153,.10));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💞</div>
        <div style="min-width:0;">
          <div class="slbl">Pair &amp; Sync with Partner</div>
          <div class="ssub" id="pairSyncEntrySub">Connect with your partner's cycle</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:7px;flex-shrink:0;">
        <div id="pairSyncEntryDot" class="pair-status-dot offline" style="flex-shrink:0;"></div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>
  </div>

  <!-- ── PHASE-AWARE CUSTOM REMINDERS ── -->
  <div class="ssec" style="padding-top:0;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>Cycle reminders</span>
      <button onclick="openPhaseReminderSheet()" style="font-size:11px;font-weight:800;color:var(--tf,#1a1a1a);background:var(--tgbg);border:none;border-radius:8px;padding:4px 10px;cursor:pointer;font-family:'Nunito',sans-serif;">+ Add</button>
    </div>
    ${(() => {
            const prs = cycleData.phaseReminders || [];
            if (!prs.length)
                return `<div style="padding:12px 4px;font-size:12px;font-weight:700;color:var(--dsub);">No cycle reminders yet — add one to get notified at the right phase 🔔</div>`;
            return prs.map(r => {
                const sub = _phaseReminderSubtitle(r);
                const fires = _phaseReminderShouldFireToday(r);
                return `<div class="srow" style="border-bottom:none;">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
            <div style="width:8px;height:8px;border-radius:50%;background:${fires ? '#22c55e' : 'var(--dsub)'};flex-shrink:0;"></div>
            <div style="min-width:0;">
              <div class="slbl">${esc(r.label)}</div>
              <div class="ssub">${sub} · ${r.time || '08:00'}${fires ? ' · <span style="color:#22c55e;font-weight:800;">fires today</span>' : ''}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
            <button class="cyc-log-del" title="Edit" onclick="openPhaseReminderSheet('${r.id}')">✏️</button>
            <button class="cyc-log-del" title="Delete" onclick="deletePhaseReminder('${r.id}')">🗑</button>
          </div>
        </div>`;
            }).join('');
        })()}
  </div>

  <!-- ── CLINIC VISIT SUMMARY & EXPORT ── -->
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="openClinicSummarySheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(34,197,94,.18),rgba(34,197,94,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🩺</div>
        <div style="min-width:0;">
          <div class="slbl">Clinic visit summary</div>
          <div class="ssub">A doctor-ready overview of your recent cycles</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
    <div class="srow" style="cursor:pointer;border-bottom:none;" onclick="exportCycleData()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(20,184,166,.18),rgba(20,184,166,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">📤</div>
        <div style="min-width:0;">
          <div class="slbl">Export cycle data</div>
          <div class="ssub">Download a backup as a CSV file</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </div>

  <!-- ── SETTINGS ── -->
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="openCycleSettingsSheet()">
      <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
        <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(99,102,241,.15),rgba(99,102,241,.07));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">⚙️</div>
        <div style="min-width:0;">
          <div class="slbl">Cycle Settings</div>
          <div class="ssub" id="cycleSettingsEntrySub">Cycle ${cl}d · Period ${pl}d</div>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  </div>
  <div style="height:20px;"></div>
  `;
        // Update the entry row status dot + subtitle after body HTML is set
        setTimeout(function () {
            // renderPairSection now writes to partnerSyncSheetBody (only visible when sheet opens)
            // but we still call it here so the entry row status dot + subtitle update
            renderPairSection();
        }, 0);
    }
    catch (e) {
        console.error('[Vikram] renderCycleSheet error:', e);
        body.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:48px 24px;text-align:center;">
      <div style="font-size:36px;">⚠️</div>
      <div style="font-size:15px;font-weight:800;color:var(--dtext);">Cycle tracker failed to load</div>
      <div style="font-size:12px;color:var(--dsub);line-height:1.6;">Tap Retry to reload, or clear cycle data in Settings if the issue persists.</div>
      <button onclick="cycleData={};renderCycleSheet();" style="padding:11px 28px;border-radius:12px;border:none;background:var(--tgon,#1a1a1a);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">Retry</button>
    </div>`;
    }
}
// ══ PARTNER MODE ═══════════════════════════════════════════════════════════
// State: persisted in localStorage under 'vikram_partner_mode'
var _partnerModeActive = false;
try {
    _partnerModeActive = localStorage.getItem('vikram_partner_mode') === '1';
}
catch (e) { }
function _pmPairLoad() {
    try {
        return JSON.parse(localStorage.getItem('vikram_pair_v1') || '{}');
    }
    catch (e) {
        return {};
    }
}
function _pmEscHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Toggle partner mode on/off
function togglePartnerMode() {
    if (typeof haptic === 'function')
        haptic('light');
    _partnerModeActive = !_partnerModeActive;
    try {
        localStorage.setItem('vikram_partner_mode', _partnerModeActive ? '1' : '0');
    }
    catch (e) { }
    _applyPartnerModeUI();
    closeCycleModePicker();
    renderCycleSheet();
}
// Update row/switch visuals inside the mode picker to reflect current state
function _applyPartnerModeUI() {
    const row = document.getElementById('partnerModeBtn');
    const sw = document.getElementById('partnerModeSwitch');
    const sub = document.getElementById('partnerModeBtnSub');
    const title = document.getElementById('cycleTitleLabel');
    if (row)
        row.classList.toggle('on', _partnerModeActive);
    if (sw)
        sw.classList.toggle('on', _partnerModeActive);
    if (sub)
        sub.textContent = _partnerModeActive ? 'Showing your partner\'s synced cycle' : 'View your partner\'s synced cycle';
    if (title)
        title.textContent = _partnerModeActive ? '💑 Partner View' : '🌸 My Cycle';
}
// Build the partner-mode ring using same buildPhaseRing logic but partner's phase color
function _buildPartnerPhaseRingHTML(day, phaseColor, phaseName) {
    // Simple colored ring SVG for partner
    const R = 80, strokeW = 9;
    const circ = 2 * Math.PI * R;
    const total = 28; // use a 28-day base for visual proportion
    const pct = Math.min(1, day / total);
    const filled = pct * circ;
    return `<svg viewBox="0 0 186 186" width="186" height="186" style="display:block;">
    <circle cx="93" cy="93" r="${R}" fill="none" stroke="var(--tgbg)" stroke-width="${strokeW}"/>
    <circle cx="93" cy="93" r="${R}" fill="none" stroke="${phaseColor}" stroke-width="${strokeW}"
      stroke-dasharray="${filled} ${circ}" stroke-dashoffset="${circ / 4}"
      stroke-linecap="round" style="transition:stroke-dasharray .4s ease;"/>
    <text x="93" y="88" text-anchor="middle" dominant-baseline="middle"
      style="font-size:36px;font-family:'Nunito',sans-serif;">💑</text>
    <text x="93" y="116" text-anchor="middle" dominant-baseline="middle"
      style="font-size:13px;font-weight:900;fill:${phaseColor};font-family:'Nunito',sans-serif;">${phaseName}</text>
  </svg>`;
}
// Render the Partner Mode body content into cycleBody
function renderPartnerModeCycleSheet(body) {
    const d = _pmPairLoad();
    const paired = !!(d.partnerCode && d.partnerName);
    const partnerName = _pmEscHtml(d.partnerName || 'your partner');
    if (!paired) {
        body.innerHTML = `
    <div class="pm-no-partner">
      <div class="pm-no-partner-emoji">💞</div>
      <div class="pm-no-partner-title">No partner connected</div>
      <div class="pm-no-partner-sub">Connect with your partner using your pair code to see their cycle data and exchange moments in real time.</div>
    </div>`;
        return;
    }
    // ── Compute partner stats (mirrors own-view logic, log-aware) ──────────────
    const p = d.partnerCycleData || {};
    const cl = p.cycleLength || 28;
    const pl = p.periodLength || 5;
    const ovDay = cl - 14;
    const today0 = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const today0ts = today0.getTime();
    const notSet = !p.lastPeriodStart;
    let day = null, dNext = null, dOvul = null;
    if (!notSet) {
        const start = new Date(p.lastPeriodStart);
        const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        day = Math.floor((+today0 - +startMid) / 86400000) + 1;
        dNext = day > cl ? 0 : cl - day + 1;
        const rawOvul = ovDay - day;
        dOvul = rawOvul < 0 ? null : rawOvul;
    }
    // ── Log-aware: read partner's synced logs ──────────────────────────────────
    const allLogs = p.logs || [];
    window._pmAllLogs = allLogs; // stash for openPartnerLogHistorySheet (avoid unsafe inline JSON in onclick)
    const cycleStartTs = p.lastPeriodStart || 0;
    const periodEndLog = notSet ? null :
        (allLogs.filter(l => l.type === 'period_end' && l.date >= cycleStartTs)
            .sort((a, b) => b.date - a.date)[0] || null);
    const ovulLog = notSet ? null :
        (allLogs.filter(l => l.type === 'ovulation' && l.date >= cycleStartTs)
            .sort((a, b) => b.date - a.date)[0] || null);
    const ovulDaysAgo = ovulLog ? Math.round((today0ts - ovulLog.date) / 86400000) : null;
    const periodEndDaysAgo = periodEndLog ? Math.round((today0ts - periodEndLog.date) / 86400000) : null;
    // ── Phase name (log-aware) ─────────────────────────────────────────────────
    const heroGradients = {
        Menstrual: 'linear-gradient(145deg,#c0392b,#e74c3c,#ff6b6b)',
        Follicular: 'linear-gradient(145deg,#c44569,#FF6B9D,#ffb3cc)',
        Ovulation: 'linear-gradient(145deg,#6c5ce7,#a29bfe,#c9b8ff)',
        Luteal: 'linear-gradient(145deg,#1565c0,#2196F3,#64b5f6)',
    };
    const PHASE_DESC = {
        Menstrual: 'Period phase', Follicular: 'Building phase',
        Ovulation: 'Fertile window', Luteal: 'Premenstrual'
    };
    let phaseName = 'Unknown', phaseColor = '#aaa', phaseDesc = '';
    if (!notSet) {
        if (ovulLog) {
            if (ovulDaysAgo <= 1) {
                phaseName = 'Ovulation';
                phaseColor = '#5a5a68';
            }
            else {
                phaseName = 'Luteal';
                phaseColor = '#3B82F6';
            }
        }
        else if (periodEndLog && day <= pl) {
            phaseName = 'Follicular';
            phaseColor = '#FF6B9D';
        }
        else if (day <= pl) {
            phaseName = 'Menstrual';
            phaseColor = '#FF4757';
        }
        else if (day < ovDay - 2) {
            phaseName = 'Follicular';
            phaseColor = '#FF6B9D';
        }
        else if (day <= ovDay + 2) {
            phaseName = 'Ovulation';
            phaseColor = '#5a5a68';
        }
        else {
            phaseName = 'Luteal';
            phaseColor = '#3B82F6';
        }
        phaseDesc = PHASE_DESC[phaseName] || '';
    }
    const heroBg = notSet
        ? 'linear-gradient(145deg,#6c5ce7,#a29bfe)'
        : (heroGradients[phaseName] || heroGradients.Follicular);
    // ── Stat labels (mirrors own-view) ─────────────────────────────────────────
    const ovDay2 = cl - 14;
    const fertileStart = ovDay2 - 4;
    const inFertile = !notSet && !ovulLog && day >= fertileStart && day <= ovDay2;
    const dFertileStart = notSet ? null : fertileStart - day;
    const dFertileEnd = notSet ? null : ovDay2 - day;
    // Period card
    const periodEndedLabel = periodEndLog
        ? (periodEndDaysAgo === 0 ? 'Today' : periodEndDaysAgo === 1 ? 'Yesterday' : periodEndDaysAgo + 'd ago')
        : null;
    const periodLabel = notSet ? '—'
        : periodEndLog ? 'Done'
            : day <= pl ? 'Day ' + day + '/' + pl
                : day > (cl - 3) ? 'Soon' : 'Done';
    // Latest flow intensity logged this cycle (so partner can see it at a glance)
    const flowIconsHero = { spotting: '🩹', light: '🩸', medium: '🌊', heavy: '💧' };
    const latestFlowLog = notSet ? null :
        (allLogs.filter(l => l.flow && l.date >= cycleStartTs).sort((a, b) => b.date - a.date)[0] || null);
    const latestFlowLabel = latestFlowLog
        ? latestFlowLog.flow.charAt(0).toUpperCase() + latestFlowLog.flow.slice(1)
        : null;
    // Fertile card
    const fertileLabel = notSet ? '—'
        : ovulLog ? 'Passed'
            : inFertile ? (dFertileEnd <= 0 ? 'Last day' : dFertileEnd + 'd left')
                : dFertileStart > 0 ? 'In ' + dFertileStart + 'd'
                    : 'Passed';
    // Ovulation card
    const ovulLabel = notSet ? '—'
        : ovulLog ? 'Logged'
            : dOvul === null ? 'Passed' : dOvul === 0 ? 'Today!' : 'In ' + dOvul + 'd';
    const ovulSubLabel = ovulLog
        ? (ovulDaysAgo === 0 ? 'Today' : ovulDaysAgo === 1 ? 'Yesterday' : ovulDaysAgo + 'd ago')
        : null;
    // Next period card
    const nextLabel = (() => {
        if (notSet)
            return '—';
        if (ovulLog) {
            const df = 14 - ovulDaysAgo;
            return df <= 0 ? 'Today' : df + 'd';
        }
        return dNext === 0 ? 'Today' : dNext + 'd';
    })();
    // ── Misc ───────────────────────────────────────────────────────────────────
    const lastSync = d.partnerCycleUpdatedAt
        ? new Date(d.partnerCycleUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : null;
    const fbOk = !!(window.firebase && typeof firebase.database === 'function');
    // ── Ring SVG (reuse own-view builder with partner's day) ───────────────────
    const ringHTML = notSet
        ? `<svg viewBox="0 0 80 80" width="76" height="76"><circle cx="40" cy="40" r="33" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="5.5"/></svg>`
        : (() => {
            const R = 33, SW = 5.5, CX = 40, CY = 40, C = 2 * Math.PI * R;
            const pct = Math.min(1, day / cl);
            const filled = (pct * C).toFixed(2);
            return `<svg viewBox="0 0 80 80" width="80" height="80">
          <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="${SW}"/>
          <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="${SW}"
            stroke-dasharray="${filled} ${C.toFixed(2)}" stroke-dashoffset="${C * 0.25}"
            stroke-linecap="round" style="transition:stroke-dasharray .5s ease;"/>
        </svg>`;
        })();
    // ── Stash computed values for the detail sheet ──────────────────────────────
    const conceptionChance = notSet ? '—'
        : (ovulLog && ovulDaysAgo <= 1) ? 'Peak'
            : ovulLog ? 'Low'
                : inFertile ? 'High'
                    : (dFertileStart !== null && dFertileStart > 0 && dFertileStart <= 3) ? 'Rising'
                        : 'Low';
    const nextDate = notSet ? null : (() => {
        const dd = ovulLog ? Math.max(0, 14 - ovulDaysAgo) : dNext;
        const target = new Date(today0ts + dd * 86400000);
        return `${ADMEN[target.getMonth()]} ${target.getDate()}`;
    })();
    window._pmHeroDetail = {
        notSet, partnerName, day, cl, pl, phaseName, phaseDesc, heroBg,
        periodEndedLabel, periodLabel, fertileLabel, ovulLabel, ovulSubLabel, nextLabel, nextDate,
        ovDay2, fertileStart, ovulLog, periodEndLog, conceptionChance,
        cyclePct: notSet ? 0 : Math.min(1, day / cl),
        dCycleLeft: notSet ? 0 : Math.max(0, cl - day),
        rawData: { lastPeriodStart: p.lastPeriodStart, logs: allLogs },
    };
    body.innerHTML = `
  <div class="partner-cycle-view">

    <!-- Card / Month toggle -->
    ${notSet ? '' : `
    <div class="ssec" style="padding:0 16px 8px;display:flex;justify-content:flex-end;">
      <div id="pmCycleTopToggle" class="up-view-toggle">
        <button id="pmCycTopHeroBtn" class="up-vtbtn${(cfg.partnerCycleTopView || 'hero') === 'hero' ? ' on' : ''}" onclick="setPartnerCycleTopView('hero')">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18"/></svg>
          Card
        </button>
        <button id="pmCycTopMonthBtn" class="up-vtbtn${(cfg.partnerCycleTopView || 'hero') === 'month' ? ' on' : ''}" onclick="setPartnerCycleTopView('month')">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Month
        </button>
      </div>
    </div>`}

    ${(!notSet && (cfg.partnerCycleTopView || 'hero') === 'month') ? buildMonthReviewCard(false, cl, pl, { lastPeriodStart: p.lastPeriodStart, logs: allLogs }) : `
    <!-- Hero card — same layout as own view -->
    <div class="cyc-hero${notSet ? '' : ' tappable'}"${notSet ? '' : ' onclick="openPartnerCycleDetailSheet()"'}>
      <div class="cyc-hero-bg" style="background:${heroBg};">
        <div class="cyc-hero-top">
          <div class="cyc-hero-phase">
            <div class="cyc-hero-phase-label">Current Phase</div>
            <div class="cyc-hero-phase-name">${notSet ? 'Not started' : phaseName}</div>
            <div class="cyc-hero-phase-desc">${notSet ? 'Waiting for ' + partnerName + ' to log their cycle' : phaseDesc}</div>
            ${periodEndedLabel ? `<div style="display:inline-flex;align-items:center;gap:5px;margin-top:6px;padding:3px 9px;border-radius:20px;background:rgba(34,197,94,.18);border:1px solid rgba(34,197,94,.35);width:fit-content;"><span style="font-size:11px;">🌿</span><span style="font-size:11px;font-weight:800;color:rgba(255,255,255,.9);letter-spacing:.2px;">Period ended · ${periodEndedLabel}</span></div>` : ''}
          </div>
          <div class="cyc-hero-ring-wrap">
            ${ringHTML}
            <div class="cyc-hero-ring-center">
              <div class="cyc-hero-ring-day">${notSet ? '–' : day}</div>
              <div class="cyc-hero-ring-of">${notSet ? '' : 'of ' + cl}</div>
            </div>
          </div>
        </div>
        ${notSet ? '' : (() => {
        const segments = [
            { start: 0, end: pl, color: '#FF4757' },
            { start: pl, end: ovDay2 - 2, color: '#FF6B9D' },
            { start: ovDay2 - 2, end: ovDay2 + 2, color: 'rgba(255,255,255,.6)' },
            { start: ovDay2 + 2, end: cl, color: '#7dd3fc' },
        ];
        const segs = segments.map(s => {
            const w = ((s.end - s.start) / cl * 100).toFixed(1);
            return '<div class="cyc-timeline-seg" style="width:' + w + '%;background:' + s.color + ';"></div>';
        }).join('');
        return '<div class="cyc-timeline">' + segs + '</div>';
    })()}
        <div class="cyc-hero-stats">
          <div class="cyc-hero-stat">
            <div class="cyc-hero-stat-icon">📅</div>
            <div class="cyc-hero-stat-val">${nextLabel}</div>
            <div class="cyc-hero-stat-lbl">Next period</div>
          </div>
          <div class="cyc-hero-stat">
            <div class="cyc-hero-stat-icon">🩸</div>
            <div class="cyc-hero-stat-val">${periodLabel}</div>
            <div class="cyc-hero-stat-lbl">${latestFlowLabel ? flowIconsHero[latestFlowLog.flow] + ' ' + latestFlowLabel : 'Period'}</div>
          </div>
          <div class="cyc-hero-stat">
            <div class="cyc-hero-stat-icon">🌸</div>
            <div class="cyc-hero-stat-val">${fertileLabel}</div>
            <div class="cyc-hero-stat-lbl">Fertile</div>
          </div>
          <div class="cyc-hero-stat">
            <div class="cyc-hero-stat-icon">✨</div>
            <div class="cyc-hero-stat-val">${ovulLabel}</div>
            <div class="cyc-hero-stat-lbl">${ovulSubLabel ? ovulSubLabel : 'Ovulation'}</div>
          </div>
        </div>
      </div>
    </div>`}

    <!-- Re-sync button if needed -->
    ${notSet && fbOk ? `
    <div style="margin:0 18px 14px;display:flex;justify-content:center;">
      <button onclick="if(window._fbPair){window._fbPair.forceSync();if(typeof vikramToast==='function')vikramToast('🔄 Syncing…');}"
        style="padding:9px 20px;border-radius:13px;border:none;background:var(--pr-rose-grad,linear-gradient(155deg,#ff9bb1,#e8617f));color:#fff;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">
        🔄 Re-sync partner data
      </button>
    </div>` : ''}

    <!-- Log history -->
    ${allLogs.length ? `
    <div class="ssec" style="padding-top:0;">
      <div class="srow" style="cursor:pointer;" onclick="openPartnerLogHistorySheet()">
        <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
          <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-rose-dim2,rgba(232,97,127,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">📋</div>
          <div style="min-width:0;">
            <div class="slbl">Log history</div>
            <div class="ssub">${allLogs.length} ${allLogs.length === 1 ? 'entry' : 'entries'}</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>` : ''}

    <!-- Cycle history -->
    ${(() => {
        const starts = allLogs.filter(l => l.type === 'period_start').sort((a, b) => a.date - b.date);
        if (starts.length < 2)
            return '';
        const cycles = [];
        for (let i = 1; i < starts.length; i++) {
            const len = Math.round((starts[i].date - starts[i - 1].date) / 86400000);
            if (len > 0 && len < 60) {
                const dt = new Date(starts[i - 1].date);
                cycles.push({ len, dateStr: dt.toLocaleDateString('en-NP', { month: 'short', day: 'numeric' }) });
            }
        }
        if (!cycles.length)
            return '';
        const avg = Math.round(cycles.reduce((a, c) => a + c.len, 0) / cycles.length);
        window._pmCycles = cycles; // stash for openPartnerCycleHistorySheet (avoid unsafe inline JSON in onclick)
        window._pmCyclesAvg = avg;
        return `<div class="ssec" style="padding-top:0;">
        <div class="srow" style="cursor:pointer;" onclick="openPartnerCycleHistorySheet()">
          <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
            <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-gold-dim,rgba(224,164,88,.16));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">📊</div>
            <div style="min-width:0;">
              <div class="slbl">Cycle history</div>
              <div class="ssub">Avg ${avg}d · ${cycles.length} cycle${cycles.length === 1 ? '' : 's'}</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>`;
    })()}

    <!-- Pregnancy status (if partner has pregnancy dates set) -->
    ${(() => {
        const preg = p.pregnancy;
        if (!preg || !preg.lmpDate)
            return '';
        const todayMid2 = today0ts;
        const lmpD = new Date(preg.lmpDate);
        const lmpMid = new Date(lmpD.getFullYear(), lmpD.getMonth(), lmpD.getDate()).getTime();
        const daysPregnant = Math.floor((todayMid2 - lmpMid) / 86400000);
        const pWeek = Math.floor(daysPregnant / 7);
        const pDayIn = daysPregnant % 7;
        const dueD = new Date(preg.dueDate);
        const dueMid = new Date(dueD.getFullYear(), dueD.getMonth(), dueD.getDate()).getTime();
        const daysToGo = Math.round((dueMid - todayMid2) / 86400000);
        const trimester = pWeek < 13 ? 1 : pWeek < 27 ? 2 : 3;
        const overdue = daysToGo < 0;
        return `<div class="ssec" style="padding-top:0;">
        <div class="srow" style="border-bottom:none;">
          <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
            <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,rgba(124,92,255,.18),rgba(124,92,255,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🤰</div>
            <div style="min-width:0;">
              <div class="slbl">Pregnancy · Week ${pWeek}<span style="font-weight:700;">+${pDayIn}d</span></div>
              <div class="ssub">Trimester ${trimester} · ${overdue ? Math.abs(daysToGo) + 'd overdue' : daysToGo + 'd to go'}</div>
            </div>
          </div>
        </div>
      </div>`;
    })()}

    <!-- Mood & Symptoms history -->
    ${(() => {
        const sLogs = p.symptomLogs || [];
        if (!sLogs.length)
            return '';
        return `<div class="ssec" style="padding-top:0;">
        <div class="srow" style="cursor:pointer;" onclick="openPartnerSymptomHistorySheet()">
          <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
            <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-rose-dim2,rgba(232,97,127,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💭</div>
            <div style="min-width:0;">
              <div class="slbl">Mood &amp; symptoms</div>
              <div class="ssub">${sLogs.length} ${sLogs.length === 1 ? 'entry' : 'entries'}</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>`;
    })()}

    <!-- Intercourse log -->
    ${(() => {
        const iLogs = p.intercourseLogs || [];
        if (!iLogs.length)
            return '';
        return `<div class="ssec" style="padding-top:0;">
        <div class="srow" style="cursor:pointer;" onclick="openPartnerTtcHistorySheet('bd')">
          <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
            <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-rose-dim2,rgba(232,97,127,.08));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💕</div>
            <div style="min-width:0;">
              <div class="slbl">Intercourse log</div>
              <div class="ssub">${iLogs.length} ${iLogs.length === 1 ? 'entry' : 'entries'}</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>`;
    })()}

    <!-- Ovulation test (OPK) results -->
    ${(() => {
        const oLogs = p.opkLogs || [];
        if (!oLogs.length)
            return '';
        return `<div class="ssec" style="padding-top:0;">
        <div class="srow" style="cursor:pointer;" onclick="openPartnerTtcHistorySheet('opk')">
          <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
            <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-gold-dim,rgba(224,164,88,.16));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🧪</div>
            <div style="min-width:0;">
              <div class="slbl">Ovulation test results</div>
              <div class="ssub">${oLogs.length} ${oLogs.length === 1 ? 'entry' : 'entries'}</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>`;
    })()}

    <!-- BBT chart & log -->
    ${(() => {
        const bLogs = p.bbtLogs || [];
        if (!bLogs.length)
            return '';
        return `<div class="ssec" style="padding-top:0;">
        <div class="srow" style="cursor:pointer;" onclick="openPartnerTtcHistorySheet('bbt')">
          <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
            <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-gold-dim,rgba(224,164,88,.16));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🌡️</div>
            <div style="min-width:0;">
              <div class="slbl">BBT chart &amp; log</div>
              <div class="ssub">${bLogs.length} ${bLogs.length === 1 ? 'entry' : 'entries'}</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>`;
    })()}

    <!-- Moments — tappable entry row -->
    <div class="ssec" style="padding-top:0;">
      <div class="srow" style="cursor:pointer;" onclick="openPartnerMomentsSheet()">
        <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
          <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-rose-grad,linear-gradient(155deg,#ff9bb1,#e8617f));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💌</div>
          <div style="min-width:0;">
            <div class="slbl">Moments</div>
            <div class="ssub" id="pmMomentsEntrySub">Just between you two</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>

    <!-- Scratch card — fun surprise link for partner -->
    <div class="ssec" style="padding-top:0;">
      <div class="srow" style="cursor:pointer;" onclick="window.open('https://scratch-card-blue.vercel.app/','_blank','noopener,noreferrer')">
        <div style="display:flex;align-items:center;gap:11px;flex:1;min-width:0;">
          <div style="width:36px;height:36px;border-radius:12px;background:var(--pr-gold-dim,rgba(224,164,88,.16));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🎟️</div>
          <div style="min-width:0;">
            <div class="slbl">Scratch Card</div>
            <div class="ssub">A little surprise for ${partnerName}</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dsub)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>

    <div style="text-align:center;font-size:10.5px;font-weight:700;color:var(--dsub);padding:14px 0 4px;">
      ${partnerName}'s cycle updated ${lastSync ? lastSync : '—'}
    </div>

  </div>`;
    setTimeout(function () {
        if (typeof window.renderPairMoments === 'function')
            window.renderPairMoments();
    }, 0);
}
// Unpair action from within Partner Mode.
// We handle our own confirm here, then perform the same teardown as pairDisconnect
// without triggering its own confirm dialog again.
function pmUnpair() {
    if (typeof haptic === 'function')
        haptic('medium');
    const partnerName = _pmPairLoad().partnerName || 'partner';
    if (!confirm('Unpair from ' + partnerName + '? This only affects your device.'))
        return;
    // Replicate pairDisconnect teardown (fbDetach + clear pair data) via available APIs.
    // fbDetach is inside the IIFE closure, but we can force-clear the FB listeners by
    // removing the refs from _fbPair (the SDK GCs unused listeners) and overwriting local state.
    try {
        // Clear partner data from localStorage (mirrors pairDisconnect internals)
        const pd = _pmPairLoad();
        delete pd.partnerCode;
        delete pd.partnerName;
        delete pd.partnerCycleData;
        delete pd.sharedAt;
        delete pd.partnerCycleUpdatedAt;
        localStorage.setItem('vikram_pair_v1', JSON.stringify(pd));
        // Clear moments cache
        localStorage.removeItem('vikram_pair_moments');
    }
    catch (e) { }
    // Exit partner mode
    _partnerModeActive = false;
    try {
        localStorage.setItem('vikram_partner_mode', '0');
    }
    catch (e) { }
    _applyPartnerModeUI();
    // Refresh the pair section (now shows unpaired state) and re-render cycle
    if (typeof renderPairSection === 'function')
        renderPairSection();
    renderCycleSheet();
    if (typeof vikramToast === 'function')
        vikramToast('💔 Unpaired from ' + partnerName);
}
// Apply UI state on initial load
setTimeout(_applyPartnerModeUI, 0);
// ── Log actions ─────────────────────────────────────────────────────────────
function setCycleTopView(v) {
    if (typeof haptic === 'function')
        haptic('light');
    cfg.cycleTopView = v;
    try {
        localStorage.setItem('vikram_cfg', JSON.stringify(cfg));
    }
    catch (e) { }
    _applyCycleTopToggle();
    renderCycleSheet();
}
function _applyCycleTopToggle() {
    const v = cfg.cycleTopView || 'hero';
    const heroBtn = document.getElementById('cycTopHeroBtn');
    const monthBtn = document.getElementById('cycTopMonthBtn');
    if (!heroBtn || !monthBtn)
        return;
    heroBtn.classList.toggle('on', v === 'hero');
    monthBtn.classList.toggle('on', v === 'month');
}
function setPartnerCycleTopView(v) {
    if (typeof haptic === 'function')
        haptic('light');
    cfg.partnerCycleTopView = v;
    try {
        localStorage.setItem('vikram_cfg', JSON.stringify(cfg));
    }
    catch (e) { }
    renderCycleSheet();
}
// ── Flow Intensity Picker ─────────────────────────────────────────────────────
var _flowPickerType = 'period_start'; // 'period_start' or 'period_end'
var _flowPickerSelected = null; // 'spotting'|'light'|'medium'|'heavy'|null
function cyLogPeriodStart() {
    if (typeof haptic === 'function')
        haptic('light');
    if (typeof checkDateRollover === 'function')
        checkDateRollover();
    _flowPickerType = 'period_start';
    _flowPickerSelected = null;
    document.getElementById('flowPickerTitle').textContent = '🩸 Period started';
    document.getElementById('flowPickerSub').textContent = 'How heavy is your flow today?';
    document.getElementById('flowPickerSaveBtn').textContent = 'Log without flow';
    document.querySelectorAll('.flow-opt').forEach(b => b.classList.remove('on'));
    document.getElementById('flowPickerOverlay').classList.add('open');
}
function cyLogPeriodEnd() {
    if (typeof haptic === 'function')
        haptic('light');
    if (typeof checkDateRollover === 'function')
        checkDateRollover();
    _flowPickerType = 'period_end';
    _flowPickerSelected = null;
    document.getElementById('flowPickerTitle').textContent = '🌿 Period ended';
    document.getElementById('flowPickerSub').textContent = 'How was the flow on the last day?';
    document.getElementById('flowPickerSaveBtn').textContent = 'Log without flow';
    document.querySelectorAll('.flow-opt').forEach(b => b.classList.remove('on'));
    document.getElementById('flowPickerOverlay').classList.add('open');
}
function flowPickerSelect(level) {
    if (typeof haptic === 'function')
        haptic('light');
    _flowPickerSelected = level;
    document.querySelectorAll('.flow-opt').forEach(b => b.classList.remove('on'));
    const map = { spotting: 'flowOptSpotting', light: 'flowOptLight', medium: 'flowOptMedium', heavy: 'flowOptHeavy' };
    const el = document.getElementById(map[level]);
    if (el)
        el.classList.add('on');
    const saveBtn = document.getElementById('flowPickerSaveBtn');
    if (saveBtn)
        saveBtn.textContent = 'Log as ' + level.charAt(0).toUpperCase() + level.slice(1);
}
function flowPickerClose(e) {
    if (e && e.target !== document.getElementById('flowPickerOverlay'))
        return;
    _flowPickerSelected = null;
    document.getElementById('flowPickerOverlay').classList.remove('open');
}
function flowPickerSave() {
    if (typeof haptic === 'function')
        haptic('medium');
    if (typeof checkDateRollover === 'function')
        checkDateRollover(); // guard against a stale cached "today"
    const nowToday = getKathmanduToday();
    const today = new Date(nowToday.getFullYear(), nowToday.getMonth(), nowToday.getDate()).getTime();
    const entry = { type: _flowPickerType, date: today };
    if (_flowPickerSelected)
        entry.flow = _flowPickerSelected;
    if (_flowPickerType === 'period_start') {
        cycleData.lastPeriodStart = today;
    }
    cycleData.logs = [...(cycleData.logs || []), entry];
    saveCycle();
    document.getElementById('flowPickerOverlay').classList.remove('open');
    renderCycleSheet();
    const flowLabel = _flowPickerSelected ? ' · ' + _flowPickerSelected.charAt(0).toUpperCase() + _flowPickerSelected.slice(1) + ' flow' : '';
    const typeLabel = _flowPickerType === 'period_start' ? 'Period started' : 'Period ended';
    if (typeof vikramToast === 'function')
        vikramToast('✅ ' + typeLabel + flowLabel);
    _flowPickerSelected = null;
}
function cyLogOvulation() {
    if (typeof checkDateRollover === 'function')
        checkDateRollover();
    const nowToday = getKathmanduToday();
    const today = new Date(nowToday.getFullYear(), nowToday.getMonth(), nowToday.getDate()).getTime();
    cycleData.logs = [...(cycleData.logs || []), { type: 'ovulation', date: today }];
    saveCycle();
    renderCycleSheet();
}
function cyReset() {
    document.getElementById('cyResetConfirmOverlay').classList.add('open');
}
// ── Log by date ──────────────────────────────────────────────────────────────
var _cyEditIdx = -1; // index into cycleData.logs currently being edited, or -1 for "add new"
// Open the same "Log by date" sheet, but pre-filled to edit an existing entry
function cyEditLogOpen(idx) {
    if (typeof haptic === 'function')
        haptic('light');
    const logs = cycleData.logs || [];
    if (idx < 0 || idx >= logs.length)
        return;
    const l = logs[idx];
    _cyEditIdx = idx;
    const titleEl = document.getElementById('cyLogByDateTitle');
    if (titleEl)
        titleEl.textContent = 'Edit log';
    const saveBtn = document.getElementById('cyLogByDateSaveBtn');
    if (saveBtn)
        saveBtn.textContent = 'Save changes';
    const pad = n => String(n).padStart(2, '0');
    const d = new Date(l.date);
    const dateStr = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    const inp = document.getElementById('cyLogByDateInput');
    const todayStr = (function () { const t = getKathmanduToday(); return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate()); })();
    if (inp) {
        inp.value = dateStr;
        inp.max = todayStr;
    }
    document.querySelectorAll('.cy-type-chip').forEach(c => c.classList.remove('on'));
    const chip = document.querySelector('.cy-type-chip[data-type="' + l.type + '"]');
    if (chip)
        chip.classList.add('on');
    document.getElementById('cyLogByDateOverlay').classList.add('open');
}
function cyLogByDateOpen() {
    if (typeof haptic === 'function')
        haptic('light');
    if (typeof checkDateRollover === 'function')
        checkDateRollover();
    _cyEditIdx = -1; // ensure we're in "add new" mode, not leftover edit mode
    const titleEl = document.getElementById('cyLogByDateTitle');
    if (titleEl)
        titleEl.textContent = 'Log by date';
    const saveBtn = document.getElementById('cyLogByDateSaveBtn');
    if (saveBtn)
        saveBtn.textContent = 'Save log';
    // Default date input to today in YYYY-MM-DD
    const t = getKathmanduToday();
    const pad = n => String(n).padStart(2, '0');
    const todayStr = t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());
    const inp = document.getElementById('cyLogByDateInput');
    if (inp) {
        inp.value = todayStr;
        inp.max = todayStr;
    }
    // Reset chip selection to period_start
    document.querySelectorAll('.cy-type-chip').forEach(c => c.classList.remove('on'));
    const first = document.querySelector('.cy-type-chip[data-type="period_start"]');
    if (first)
        first.classList.add('on');
    document.getElementById('cyLogByDateOverlay').classList.add('open');
}
function cyLogByDateClose(e) {
    if (e && e.target !== document.getElementById('cyLogByDateOverlay'))
        return;
    document.getElementById('cyLogByDateOverlay').classList.remove('open');
    _cyEditIdx = -1;
    const titleEl = document.getElementById('cyLogByDateTitle');
    if (titleEl)
        titleEl.textContent = 'Log by date';
    const saveBtn = document.getElementById('cyLogByDateSaveBtn');
    if (saveBtn)
        saveBtn.textContent = 'Save log';
}
function cyLogTypeSelect(btn) {
    document.querySelectorAll('.cy-type-chip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
}
function cyLogByDateSave() {
    const inp = document.getElementById('cyLogByDateInput');
    if (!inp || !inp.value) {
        vikramToast && vikramToast('⚠️ Please pick a date');
        return;
    }
    const activeChip = document.querySelector('.cy-type-chip.on');
    const type = activeChip ? activeChip.dataset.type : 'period_start';
    // Parse date as midnight local
    const parts = inp.value.split('-').map(Number);
    const ts = new Date(parts[0], parts[1] - 1, parts[2]).getTime();
    if (isNaN(ts)) {
        vikramToast && vikramToast('⚠️ Invalid date');
        return;
    }
    const isEdit = _cyEditIdx >= 0 && _cyEditIdx < (cycleData.logs || []).length;
    if (isEdit) {
        // Update the existing entry in place (preserve any extra fields like flow)
        cycleData.logs[_cyEditIdx] = Object.assign({}, cycleData.logs[_cyEditIdx], { type, date: ts });
    }
    else {
        cycleData.logs = [...(cycleData.logs || []), { type, date: ts }];
    }
    // Sort logs by date ascending
    cycleData.logs.sort((a, b) => a.date - b.date);
    // If period_start, also update lastPeriodStart to the most recent one
    if (type === 'period_start' || isEdit) {
        const starts = cycleData.logs.filter(l => l.type === 'period_start');
        cycleData.lastPeriodStart = starts.length ? starts[starts.length - 1].date : null;
    }
    saveCycle();
    document.getElementById('cyLogByDateOverlay').classList.remove('open');
    renderCycleSheet();
    // If the log history sheet is open, re-render it in place
    if (document.getElementById('logHistorySheet')?.classList.contains('open')) {
        renderLogHistorySheet();
    }
    if (typeof renderUpcoming === 'function')
        renderUpcoming();
    const labels = { period_start: 'Period start', period_end: 'Period end', ovulation: 'Ovulation' };
    const dateStr = new Date(ts).toLocaleDateString('en-NP', { month: 'short', day: 'numeric' });
    if (typeof vikramToast === 'function')
        vikramToast(isEdit ? ('✅ Updated to ' + dateStr) : ('✅ ' + (labels[type] || type) + ' logged for ' + dateStr));
    _cyEditIdx = -1;
    const titleEl = document.getElementById('cyLogByDateTitle');
    if (titleEl)
        titleEl.textContent = 'Log by date';
    const saveBtn = document.getElementById('cyLogByDateSaveBtn');
    if (saveBtn)
        saveBtn.textContent = 'Save log';
}
// ── Delete log ───────────────────────────────────────────────────────────────
var _cyDeleteIdx = -1;
function cyDeleteLog(idx) {
    if (typeof haptic === 'function')
        haptic('light');
    const logs = cycleData.logs || [];
    if (idx < 0 || idx >= logs.length)
        return;
    _cyDeleteIdx = idx;
    const l = logs[idx];
    const labels = { period_start: 'Period started', period_end: 'Period ended', ovulation: 'Ovulation logged' };
    const dateStr = new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    const desc = document.getElementById('cyDeleteLogDesc');
    if (desc)
        desc.textContent = (labels[l.type] || l.type) + ' · ' + dateStr;
    document.getElementById('cyDeleteLogOverlay').classList.add('open');
}
function cyDeleteLogClose(e) {
    if (e && e.target !== document.getElementById('cyDeleteLogOverlay'))
        return;
    document.getElementById('cyDeleteLogOverlay').classList.remove('open');
    _cyDeleteIdx = -1;
}
function cyDeleteLogConfirm() {
    const logs = cycleData.logs || [];
    if (_cyDeleteIdx < 0 || _cyDeleteIdx >= logs.length) {
        document.getElementById('cyDeleteLogOverlay').classList.remove('open');
        return;
    }
    const removed = logs.splice(_cyDeleteIdx, 1)[0];
    cycleData.logs = logs;
    // Recalculate lastPeriodStart from remaining logs
    const starts = logs.filter(l => l.type === 'period_start');
    cycleData.lastPeriodStart = starts.length ? starts[starts.length - 1].date : null;
    saveCycle();
    document.getElementById('cyDeleteLogOverlay').classList.remove('open');
    _cyDeleteIdx = -1;
    renderCycleSheet();
    // If the log history sheet is open, re-render it in place
    if (document.getElementById('logHistorySheet')?.classList.contains('open')) {
        renderLogHistorySheet();
        if (!(cycleData.logs || []).length)
            closeLogHistorySheet();
    }
    const labels = { period_start: 'Period start', period_end: 'Period end', ovulation: 'Ovulation' };
    if (typeof vikramToast === 'function')
        vikramToast('🗑 ' + (labels[removed.type] || removed.type) + ' deleted');
}
function cyResetConfirmClose(e) {
    if (e && e.target !== document.getElementById('cyResetConfirmOverlay'))
        return;
    document.getElementById('cyResetConfirmOverlay').classList.remove('open');
}
function cyResetConfirmYes() {
    document.getElementById('cyResetConfirmOverlay').classList.remove('open');
    // Close the settings sheet if open
    try {
        closeCycleSettingsSheet();
    }
    catch (e) { }
    cycleData = {};
    localStorage.removeItem('vikram_cycle');
    // Push cleared state to cloud immediately so it does not restore from backup
    try {
        if (window.vikramCloudSync && typeof window.vikramCloudSync.push === 'function') {
            window.vikramCloudSync.push();
        }
    }
    catch (e) { }
    // Also update pair sync so partner sees cleared state
    try {
        if (window._fbPair && typeof window._fbPair.pushMyCycle === 'function') {
            window._fbPair.pushMyCycle();
        }
    }
    catch (e) { }
    renderCycleSheet();
}
// ══ PAIR & SYNC WITH PARTNER — Firebase Realtime Database ════════════════════
(function () {
    const PAIR_KEY = 'vikram_pair_v1';
    // ── Firebase refs ─────────────────────────────────────────────────────────
    let _cycleRef = null; // /cycles/<myCode>
    let _msgsRef = null; // /moments/<roomKey>
    let _msgsListener = null;
    let _partnerCycleListener = null;
    function db() {
        try {
            return (window.firebase && firebase.database) ? firebase.database() : null;
        }
        catch (e) {
            return null;
        }
    }
    function fbReady() {
        try {
            return !!(window.firebase && firebase.apps && firebase.apps.length && firebase.database);
        }
        catch (e) {
            return false;
        }
    }
    // Canonical room key for two codes (order-independent)
    function roomKey(a, b) {
        return [a.replace('-', ''), b.replace('-', '')].sort().join('_');
    }
    // ── local helpers ──────────────────────────────────────────────────────────
    function pairLoad() { try {
        return JSON.parse(localStorage.getItem(PAIR_KEY) || '{}');
    }
    catch (e) {
        return {};
    } }
    function pairSave(d) { try {
        localStorage.setItem(PAIR_KEY, JSON.stringify(d));
    }
    catch (e) { } }
    function escapeHtml(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    // ── Ensure user is signed into Firebase (anonymously if needed) ────────────
    // REQUIRED: Firebase RTDB rules need "auth != null" — anon sign-in satisfies this
    var _googleSignInInProgress = false;
    function ensureAuth() {
        return new Promise((resolve, reject) => {
            if (!fbReady() || !firebase.auth)
                return reject(new Error('firebase_not_ready'));
            const user = firebase.auth().currentUser;
            if (user) {
                resolve(user);
                return;
            }
            // Don't create anonymous session if Google sign-in is in progress
            if (_googleSignInInProgress) {
                reject(new Error('google_signin_in_progress'));
                return;
            }
            // Wait for Firebase to restore persisted session before falling back to anonymous.
            // Using onAuthStateChanged (fires exactly once on init) avoids the race condition
            // where a setTimeout fires before the Google session is restored, causing an
            // anonymous sign-in that overwrites the Google session in the UI.
            var unsubscribe = firebase.auth().onAuthStateChanged(function (u) {
                unsubscribe();
                if (u) {
                    resolve(u);
                }
                else {
                    // Truly no persisted user — sign in anonymously so pair sync can write to RTDB
                    firebase.auth().signInAnonymously()
                        .then(r => resolve(r.user))
                        .catch(e => { console.warn('[Vikram] anon auth failed:', e); reject(e); });
                }
            });
        });
    }
    // ── Firebase: push MY cycle data to /cycles/<myCode> ──────────────────────
    function fbPushMyCycle() {
        if (!fbReady())
            return;
        const d = pairLoad();
        if (!d.myCode)
            return;
        const cd = (typeof cycleData !== 'undefined') ? cycleData : {};
        const payload = {
            lastPeriodStart: cd.lastPeriodStart || null,
            cycleLength: cd.cycleLength || 28,
            periodLength: cd.periodLength || 5,
            logs: (cd.logs || []).filter(l => l.date >= (cd.lastPeriodStart || 0)),
            symptomLogs: cd.symptomLogs || [],
            intercourseLogs: cd.intercourseLogs || [],
            opkLogs: cd.opkLogs || [],
            bbtLogs: cd.bbtLogs || [],
            bbtUnit: cd.bbtUnit || 'C',
            pregnancy: cd.pregnancy || null,
            updatedAt: Date.now()
        };
        const database = db();
        if (!database)
            return;
        ensureAuth().then(() => {
            database.ref('cycles/' + d.myCode).set(payload)
                .then(() => { _pairSyncError = null; })
                .catch(e => {
                _pairSyncError = e.code || e.message || 'write_failed';
                console.warn('[Vikram] cycle push FAILED:', e.code, e.message);
                if (typeof vikramToast === 'function')
                    vikramToast('❌ Sync failed: ' + (e.code || 'check Firebase rules'));
                if (typeof renderPairSection === 'function')
                    renderPairSection();
            });
        }).catch(e => { _pairSyncError = 'auth_failed'; console.warn('[Vikram] auth failed for push:', e); });
    }
    // ── Firebase: subscribe to partner's cycle ─────────────────────────────────
    function fbSubscribePartnerCycle(partnerCode) {
        if (!fbReady() || !partnerCode)
            return;
        const database = db();
        if (!database)
            return;
        ensureAuth().then(() => {
            if (_partnerCycleListener && _cycleRef) {
                try {
                    _cycleRef.off('value', _partnerCycleListener);
                }
                catch (e) { }
            }
            _cycleRef = database.ref('cycles/' + partnerCode);
            _partnerCycleListener = _cycleRef.on('value', snap => {
                _pairSyncError = null;
                const val = snap.val();
                if (!val)
                    return;
                const d = pairLoad();
                d.partnerCycleData = {
                    lastPeriodStart: val.lastPeriodStart || null,
                    cycleLength: val.cycleLength || 28,
                    periodLength: val.periodLength || 5,
                    logs: val.logs || [],
                    symptomLogs: val.symptomLogs || [],
                    intercourseLogs: val.intercourseLogs || [],
                    opkLogs: val.opkLogs || [],
                    bbtLogs: val.bbtLogs || [],
                    bbtUnit: val.bbtUnit || 'C',
                    pregnancy: val.pregnancy || null,
                };
                d.partnerCycleUpdatedAt = val.updatedAt || Date.now();
                pairSave(d);
                if (typeof renderPairSection === 'function')
                    renderPairSection();
                if (typeof render === 'function')
                    render();
            }, e => {
                _pairSyncError = e.code || e.message || 'read_failed';
                console.warn('[Vikram] partner cycle listen FAILED:', e.code, e.message);
                if (typeof vikramToast === 'function')
                    vikramToast('❌ Sync failed: ' + (e.code || 'check Firebase rules'));
                if (typeof renderPairSection === 'function')
                    renderPairSection();
            });
        }).catch(e => { _pairSyncError = 'auth_failed'; console.warn('[Vikram] auth failed for subscribe:', e); });
    }
    // ── Firebase: subscribe to messages ───────────────────────────────────────
    function fbSubscribeMsgs(myCode, partnerCode) {
        if (!fbReady())
            return;
        const database = db();
        if (!database)
            return;
        ensureAuth().then(() => {
            if (_msgsListener && _msgsRef) {
                try {
                    _msgsRef.off('value', _msgsListener);
                }
                catch (e) { }
            }
            _msgsRef = database.ref('moments/' + roomKey(myCode, partnerCode));
            _msgsListener = _msgsRef.on('value', snap => {
                const val = snap.val() || {};
                const msgs = Object.values(val).sort((a, b) => a.ts - b.ts);
                try {
                    localStorage.setItem('vikram_pair_moments', JSON.stringify(msgs));
                }
                catch (e) { }
                renderMoments();
            }, e => {
                console.warn('[Vikram] moments listen FAILED:', e.code, e.message);
            });
        }).catch(e => console.warn('[Vikram] auth failed for msgs:', e));
    }
    // ── Firebase: send a message ───────────────────────────────────────────────
    function fbSendMsg(myCode, partnerCode, text) {
        if (!fbReady())
            return Promise.resolve(false);
        const database = db();
        if (!database)
            return Promise.resolve(false);
        return ensureAuth().then(() => {
            return database.ref('moments/' + roomKey(myCode, partnerCode)).push({
                from: myCode.replace(/-/g, ''),
                text,
                ts: Date.now()
            }).then(() => true);
        }).catch(e => {
            console.warn('[Vikram] send msg FAILED:', e.code, e.message);
            if (typeof vikramToast === 'function')
                vikramToast('❌ Message failed: ' + (e.code || 'check Firebase rules'));
            return false;
        });
    }
    // ── Firebase: detach all listeners ────────────────────────────────────────
    function fbDetach() {
        try {
            if (_msgsListener && _msgsRef)
                _msgsRef.off('value', _msgsListener);
            if (_partnerCycleListener && _cycleRef)
                _cycleRef.off('value', _partnerCycleListener);
        }
        catch (e) { }
        _msgsListener = null;
        _partnerCycleListener = null;
        _msgsRef = null;
        _cycleRef = null;
    }
    function genCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let s = '';
        for (let i = 0; i < 6; i++)
            s += chars[Math.floor(Math.random() * chars.length)];
        return s.slice(0, 3) + '-' + s.slice(3);
    }
    function myCode() {
        let d = pairLoad();
        if (!d.myCode) {
            d.myCode = genCode();
            pairSave(d);
        }
        return d.myCode;
    }
    // Force a full re-sync: push own data + re-subscribe (safe to call anytime after Firebase ready)
    function forceSync() {
        if (!fbReady())
            return;
        const d = pairLoad();
        if (!d.myCode)
            return;
        fbPushMyCycle();
        if (d.partnerCode) {
            fbSubscribePartnerCycle(d.partnerCode);
            fbSubscribeMsgs(d.myCode, d.partnerCode);
        }
    }
    // Track last sync error for UI
    let _pairSyncError = null;
    // Expose Firebase helpers so the bottom-of-body init (after SDK loads) can call them
    window._fbPair = {
        pushMyCycle: fbPushMyCycle,
        subscribePartnerCycle: fbSubscribePartnerCycle,
        subscribeMsgs: fbSubscribeMsgs,
        forceSync: forceSync,
        pairLoad: pairLoad,
        getError: () => _pairSyncError,
        setError: (e) => { _pairSyncError = e; }
    };
    // initOnLoad intentionally skipped here — Firebase SDK is not loaded yet.
    // The bottom-of-body <script> calls window._fbPair after firebase.initializeApp().
    // Derive "partner cycle" info from stored partner data
    function partnerPhaseInfo(p) {
        if (!p)
            return null;
        const cl = p.cycleLength || 28, pl = p.periodLength || 5;
        const ovDay = cl - 14;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // If no period logged yet, show defaults with day=1
        if (!p.lastPeriodStart) {
            return { day: null, dNext: null, phase: 'Unknown', phaseColor: '#aaa', cl, pl, noData: true };
        }
        const last = new Date(p.lastPeriodStart);
        last.setHours(0, 0, 0, 0);
        const totalDays = Math.floor((+today - +last) / 86400000) + 1;
        // Compute day within current cycle (handles multi-cycle elapsed time)
        const day = totalDays > cl ? ((totalDays - 1) % cl) + 1 : totalDays;
        const dNext = cl - day;
        let phase, phaseColor;
        if (day <= pl) {
            phase = 'Period';
            phaseColor = '#FF4757';
        }
        else if (day < ovDay - 2) {
            phase = 'Follicular';
            phaseColor = '#FF6B9D';
        }
        else if (day <= ovDay + 2) {
            phase = 'Ovulation';
            phaseColor = '#5a5a68';
        }
        else {
            phase = 'Luteal';
            phaseColor = '#3B82F6';
        }
        return { day, dNext: Math.max(0, dNext), phase, phaseColor, cl, pl, noData: false };
    }
    // ── render ─────────────────────────────────────────────────────────────────
    window.renderPairSection = function () {
        const wrap = document.getElementById('pairSyncSection');
        if (!wrap)
            return;
        const d = pairLoad();
        const paired = !!(d.partnerCode && d.partnerName);
        const fbOk = fbReady();
        const syncErr = window._fbPair ? window._fbPair.getError && window._fbPair.getError() : null;
        const permDenied = syncErr && (syncErr.includes('PERMISSION_DENIED') || syncErr === 'read_failed' || syncErr === 'write_failed');
        const errBanner = permDenied ? `
      <div style="margin:0;padding:10px 14px;background:#fff3cd;border-left:3px solid #f59e0b;font-size:11px;font-weight:700;color:#92400e;line-height:1.5;">
        ⚠️ <strong>Firebase rules blocking sync.</strong> In Firebase Console → Realtime Database → Rules, set rules scoped per-code (never a blanket rule on "cycles" / "moments" — that lets any signed-in visitor, including anonymous ones, list every couple's data in one request). See SECURITY.md in this project for the full rule set to paste in, e.g.:<br>
        <code style="background:#fef9c3;padding:2px 5px;border-radius:3px;font-size:10px;">"cycles": {"$code": {".read":"auth!=null",".write":"auth!=null"}}, "moments": {"$room": {".read":"auth!=null",".write":"auth!=null"}}</code>
      </div>` : '';
        // Render into the sheet body
        const sheetBody = document.getElementById('partnerSyncSheetBody');
        if (sheetBody) {
            const isOnline = paired && fbOk && !permDenied;
            sheetBody.innerHTML = `
      <div style="padding:0 16px;">
        ${errBanner ? `<div style="margin:12px 0;">${errBanner}</div>` : ''}
      </div>
      <div style="padding:0 16px 8px;">
        ${paired ? renderPaired(d, fbOk) : renderUnpaired(d, fbOk)}
      </div>`;
        }
        // Also keep the hidden legacy wrap empty (some external callers reference it)
        if (wrap)
            wrap.innerHTML = '';
        // Update the entry row button in cycle tab
        const entrySub = document.getElementById('pairSyncEntrySub');
        const entryDot = document.getElementById('pairSyncEntryDot');
        const isOnline = paired && fbOk && !permDenied;
        if (entrySub) {
            if (paired)
                entrySub.textContent = 'Connected · live cycle sync';
            else if (fbOk)
                entrySub.textContent = 'Real-time sync ready';
            else
                entrySub.textContent = 'Connect with your partner\'s cycle';
        }
        if (entryDot) {
            entryDot.classList.toggle('offline', !isOnline);
        }
        if (paired && typeof window.renderPairMoments === 'function') {
            const sheetOpen = document.getElementById('partnerSyncSheet')?.classList.contains('open');
            if (sheetOpen)
                setTimeout(window.renderPairMoments, 0);
        }
    };
    function renderUnpaired(d, fbOk) {
        const code = myCode();
        const fbNote = fbOk ? '' : `<div style="font-size:11px;font-weight:700;color:var(--dsub);text-align:center;margin-bottom:16px;padding:9px 13px;background:var(--tgbg);border-radius:11px;border:1px solid var(--border);">⏳ Connecting to sync service…</div>`;
        return `
    <div class="pair-unpaired">
      <div class="pair-unpaired-emoji">💞</div>
      <div class="pair-unpaired-title">Sync Cycles Together</div>
      <div class="pair-unpaired-sub">Share your code or enter your partner’s to see their phase, fertile window &amp; next period in real time.</div>
      ${fbNote}
      <div class="pair-code-block">
        <div class="pair-code-lbl-row">
          <svg viewBox="0 0 24 24" style="width:11px;height:11px;stroke:var(--hsub);stroke-width:2.3;fill:none;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Your pair code
        </div>
        <div class="pair-code-display">
          <span class="pair-code-val" id="pairMyCode">${code}</span>
          <button class="pair-copy-btn" onclick="pairCopyCode('${esc(code)}')" title="Copy code">
            <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
      </div>
      <div class="pair-or-divider">
        <div class="pair-or-line"></div>
        <span class="pair-or-lbl">Enter partner’s code</span>
        <div class="pair-or-line"></div>
      </div>
      <div class="pair-enter-row">
        <input class="pair-enter-input" id="pairCodeInput" placeholder="ABC-123" maxlength="7"
          oninput="
            let v=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'');
            if(v.length>3) v=v.slice(0,3)+'-'+v.slice(3,6);
            this.value=v;
          ">
        <button class="pair-connect-btn" onclick="pairConnect()">Connect 💞</button>
      </div>
      <div id="pairNameRow" style="display:none;margin-top:8px;">
        <div class="pair-enter-row">
          <input class="pair-enter-input" id="pairNameInput" placeholder="Partner’s name or nickname…"
            style="letter-spacing:0;text-transform:none;font-family:'Nunito',sans-serif;font-size:13px;"
            maxlength="30"
            onkeydown="if(event.key==='Enter'){event.preventDefault();pairConnectConfirm();}">
          <button class="pair-connect-btn" onclick="pairConnectConfirm()">Save 💗</button>
        </div>
      </div>
    </div>`;
    }
    function renderPaired(d, fbOk) {
        const pi = partnerPhaseInfo(d.partnerCycleData);
        const sharedTs = d.sharedAt ? new Date(d.sharedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';
        const lastSync = d.partnerCycleUpdatedAt ? new Date(d.partnerCycleUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
        const noPartnerData = !pi || pi.noData;
        const statusLine = (fbOk ? '🟢' : '⚠️') + (sharedTs ? ' Since ' + sharedTs : '') + (lastSync ? ' · ' + lastSync : '');
        return `
    <div class="pair-paired">

      <!-- Waiting / no data row -->
      ${noPartnerData ? `
      <div class="pair-waiting-row">
        <div class="pair-waiting-text">${fbOk ? '⏳ Waiting for ' + escapeHtml(d.partnerName || 'partner') + ' to log their cycle' : '⚠️ Offline — connect to sync'}</div>
        ${fbOk ? '<button class="pair-resync-btn" onclick="if(window._fbPair){window._fbPair.forceSync();if(typeof vikramToast===\'function\')vikramToast(\'\U0001f504 Syncing…\');}">Re-sync</button>' : ''}
      </div>` : ''}

      <!-- Cycle card: ring + phase + meta -->
      <div class="pair-cycle-card">
        <div class="pair-ring-wrap">
          <svg viewBox="0 0 100 100">
            <circle class="pair-ring-bg" cx="50" cy="50" r="42"></circle>
            <circle class="pair-ring-fg" cx="50" cy="50" r="42"
              stroke-dasharray="${(2 * Math.PI * 42).toFixed(1)}"
              stroke-dashoffset="${pi && !pi.noData ? (2 * Math.PI * 42 - Math.min(pi.day / pi.cl, 1) * 2 * Math.PI * 42).toFixed(1) : (2 * Math.PI * 42).toFixed(1)}"
            ></circle>
          </svg>
          <div class="pair-ring-center">
            <div class="pair-ring-day-num">${pi && !pi.noData ? pi.day : '—'}</div>
            <div class="pair-ring-day-lbl">of ${pi ? pi.cl : 28}</div>
          </div>
        </div>
        <div class="pair-cycle-info">
          ${pi && !pi.noData ? `<div class="pair-phase-row"><span class="pair-partner-phase-badge" style="background:${pi.phaseColor}">🌸 ${pi.phase}</span></div>` : `<div class="pair-phase-row"><span class="pair-partner-phase-badge" style="background:var(--dim);color:var(--htext);">Logging…</span></div>`}
          <div class="pair-cycle-meta-row">
            <div class="pair-cycle-meta-item">
              <span class="pair-cycle-meta-val">${pi && !pi.noData ? pi.dNext + ' days' : '—'}</span>
              <span class="pair-cycle-meta-lbl">until next period</span>
            </div>
            <div class="pair-cycle-meta-item">
              <span class="pair-cycle-meta-val">${escapeHtml(d.partnerName || 'Partner')}</span>
              <span class="pair-cycle-meta-lbl">'s cycle</span>
            </div>
          </div>
          <div class="pair-card-sync-row">
            <span class="pair-card-sync-status">${statusLine}</span>
            <button class="pair-card-disconnect-btn" onclick="pairDisconnect()">Disconnect</button>
          </div>
        </div>
      </div>

      <!-- Heartbeat -->
      <div class="pair-heartbeat">
        <div class="pair-hb-line"></div>
        <div class="pair-hb-icon">💗</div>
        <div class="pair-hb-line"></div>
      </div>

      <!-- Moments redesign -->
      <div class="pair-moment-wrap">
        <div class="pair-moment-head">
          <div class="pair-moment-head-left">
            <div class="pair-moment-head-icon">💌</div>
            <div>
              <div class="pair-moment-head-title">Moments</div>
              <div class="pair-moment-head-sub">Just between you two</div>
            </div>
          </div>
          <span class="pair-moment-head-count" id="pairMomentCount"></span>
        </div>
        <div class="pair-quick-emojis" id="pairQuickEmojis">
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('💗')" title="Love">💗</button>
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('🌸')" title="Flower">🌸</button>
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('🤗')" title="Hug">🤗</button>
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('☀️')" title="Sunshine">☀️</button>
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('💆')" title="Relax">💆</button>
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('🍵')" title="Tea">🍵</button>
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('🌙')" title="Moon">🌙</button>
          <button class="pair-quick-emoji" onclick="pairSendQuickEmoji('💪')" title="Strong">💪</button>
        </div>
        <div class="pair-moment-msgs" id="pairMomentMsgs"></div>
        <div class="pair-moment-compose">
          <div class="pair-compose-field">
            <textarea class="pair-moment-input" id="pairMomentInput"
              placeholder="Say something to ${escapeHtml(d.partnerName || 'your partner')}…"
              rows="1"
              onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();pairSendMoment();}"
              oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,90)+'px';"
            ></textarea>
          </div>
          <button class="pair-moment-send" id="pairMomentSendBtn" onclick="pairSendMoment()" title="Send">
            <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>`;
    }
    // ── actions ────────────────────────────────────────────────────────────────
    window.pairCopyCode = function (code) {
        try {
            navigator.clipboard.writeText(code).then(() => {
                const el = document.getElementById('pairMyCode');
                if (el) {
                    const orig = el.textContent;
                    el.textContent = 'Copied!';
                    el.style.color = '#22c55e';
                    setTimeout(() => { el.textContent = orig; el.style.color = ''; }, 1500);
                }
            });
        }
        catch (e) { }
    };
    // Step 1: validate code format, then ask for name
    window.pairConnect = function () {
        if (typeof haptic === 'function')
            haptic('light');
        const inp = document.getElementById('pairCodeInput');
        if (!inp)
            return;
        const raw = inp.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (raw.length < 6) {
            inp.style.borderColor = '#f43f5e';
            setTimeout(() => inp.style.borderColor = '', 1200);
            return;
        }
        const me = myCode().replace('-', '');
        if (raw === me) {
            inp.style.borderColor = '#f43f5e';
            if (typeof vikramToast === 'function')
                vikramToast('⚠️ That\'s your own code!');
            setTimeout(() => inp.style.borderColor = '', 1200);
            return;
        }
        inp.style.borderColor = '#22c55e';
        const nameRow = document.getElementById('pairNameRow');
        if (nameRow) {
            nameRow.style.display = 'block';
            setTimeout(() => document.getElementById('pairNameInput')?.focus(), 60);
        }
    };
    // Step 2: confirm — push MY cycle to Firebase, subscribe to partner
    window.pairConnectConfirm = function () {
        if (typeof haptic === 'function')
            haptic('medium');
        const inp = document.getElementById('pairCodeInput');
        const nameInp = document.getElementById('pairNameInput');
        if (!inp || !nameInp)
            return;
        const raw = inp.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (raw.length < 6)
            return;
        const code = raw.slice(0, 3) + '-' + raw.slice(3, 6);
        const name = (nameInp.value || '').trim() || 'Partner';
        const d = pairLoad();
        d.partnerCode = code;
        d.partnerName = name;
        d.sharedAt = Date.now();
        d.partnerCycleData = { lastPeriodStart: null, cycleLength: 28, periodLength: 5 };
        delete d.partnerCycleUpdatedAt;
        pairSave(d);
        // Firebase: push MY cycle data so partner can read it, then subscribe
        if (fbReady()) {
            fbPushMyCycle();
            fbSubscribePartnerCycle(code);
            fbSubscribeMsgs(d.myCode || myCode(), code);
            if (typeof vikramToast === 'function')
                vikramToast('💞 Connected — syncing live!');
        }
        else {
            // Firebase still loading — retry once it is ready
            if (typeof vikramToast === 'function')
                vikramToast('💞 Connected — will sync when ready');
            var _retryCode = code;
            var _retryMyCode = d.myCode || myCode();
            var _retryCount = 0;
            var _retryInterval = setInterval(function () {
                _retryCount++;
                if (fbReady()) {
                    clearInterval(_retryInterval);
                    fbPushMyCycle();
                    fbSubscribePartnerCycle(_retryCode);
                    fbSubscribeMsgs(_retryMyCode, _retryCode);
                    if (typeof renderPairSection === 'function')
                        renderPairSection();
                    if (typeof vikramToast === 'function')
                        vikramToast('💞 Connected — syncing live!');
                }
                else if (_retryCount > 60) {
                    clearInterval(_retryInterval); // give up after 30s
                    if (typeof vikramToast === 'function')
                        vikramToast('⚠️ Sync service unavailable — saved locally');
                }
            }, 500);
        }
        renderPairSection();
    };
    window.pairDisconnect = function () {
        if (!confirm('Disconnect from your partner? This only affects your device.'))
            return;
        if (typeof haptic === 'function')
            haptic('medium');
        fbDetach();
        const d = pairLoad();
        delete d.partnerCode;
        delete d.partnerName;
        delete d.partnerCycleData;
        delete d.sharedAt;
        delete d.partnerCycleUpdatedAt;
        pairSave(d);
        // Clear local message cache
        try {
            localStorage.removeItem('vikram_pair_moments');
        }
        catch (e) { }
        renderPairSection();
    };
    const MSG_KEY = 'vikram_pair_moments';
    // Local cache helpers (Firebase listener keeps this fresh)
    function msgsLoad() { try {
        return JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
    }
    catch (e) {
        return [];
    } }
    // Helpers for renderMoments
    function isEmojiOnly(str) {
        // Returns true if string is purely emoji characters (no Latin text)
        return /^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\s)+$/u.test(str) && str.trim().length > 0;
    }
    function formatMsgDate(ts) {
        const d = new Date(ts);
        const now = new Date();
        const isToday = d.toDateString() === now.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = d.toDateString() === yesterday.toDateString();
        if (isToday)
            return 'Today';
        if (isYesterday)
            return 'Yesterday';
        return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    function renderMoments() {
        const msgs = msgsLoad();
        const d = pairLoad();
        const meRaw = (d.myCode || '').replace('-', '');
        const theirName = escapeHtml(d.partnerName || 'Partner');
        const countEl = document.getElementById('pairMomentCount');
        countEl && (countEl.textContent = msgs.length ? msgs.length + (msgs.length === 1 ? ' msg' : ' msgs') : '');
        const pmSub = document.getElementById('pmMomentsEntrySub');
        if (pmSub)
            pmSub.textContent = msgs.length ? msgs.length + (msgs.length === 1 ? ' message' : ' messages') : 'Just between you two';
        let html = '';
        if (msgs.length) {
            let lastDateStr = '';
            msgs.forEach(m => {
                const mine = m.from === meRaw;
                const dateStr = formatMsgDate(m.ts);
                const time = new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const emojiOnly = isEmojiOnly(m.text);
                if (dateStr !== lastDateStr) {
                    html += `<div class="pair-date-divider"><span>${dateStr}</span></div>`;
                    lastDateStr = dateStr;
                }
                html += `<div class="pair-msg-bubble ${mine ? 'mine' : 'theirs'}${emojiOnly ? ' emoji-only' : ''}">
          <div class="pair-msg-text">${escapeHtml(m.text)}</div>
          <div class="pair-msg-meta">
            ${mine ? 'You' : theirName} · ${time}
            ${mine ? '<span class="pair-msg-tick">✓✓</span>' : ''}
          </div>
        </div>`;
            });
        }
        // Render into BOTH possible containers (My Cycle sheet + Partner Mode sheet)
        ['pairMomentMsgs', 'pmPairMomentMsgs'].forEach(id => {
            const container = document.getElementById(id);
            if (!container)
                return;
            container.innerHTML = html;
            container.scrollTop = container.scrollHeight;
        });
    }
    // Expose so renderPairSection can call it after DOM is set
    window.renderPairMoments = renderMoments;
    function doSendMoment(text) {
        if (!text)
            return;
        if (typeof haptic === 'function')
            haptic('medium');
        const d = pairLoad();
        if (!d.partnerCode) {
            if (typeof vikramToast === 'function')
                vikramToast('Connect with a partner first 💞');
            return;
        }
        const meRaw = (d.myCode || myCode()).replace(/-/g, '');
        const optimisticMsg = { from: meRaw, text, ts: Date.now() };
        const msgs = msgsLoad();
        msgs.push(optimisticMsg);
        try {
            localStorage.setItem(MSG_KEY, JSON.stringify(msgs));
        }
        catch (e) { }
        renderMoments();
        // Send animation on whichever send button is visible
        ['pairMomentSendBtn', 'pmPairMomentSendBtn'].forEach(id => {
            const sendBtn = document.getElementById(id);
            if (sendBtn) {
                sendBtn.classList.add('sent-anim');
                setTimeout(() => sendBtn.classList.remove('sent-anim'), 500);
            }
        });
        fbSendMsg(d.myCode || myCode(), d.partnerCode, text).then(sent => {
            if (!sent)
                if (typeof vikramToast === 'function')
                    vikramToast('⚠️ Saved locally — sync when back online');
        });
    }
    window.pairSendMoment = function (fromPartnerMode) {
        const inpId = fromPartnerMode ? 'pmPairMomentInput' : 'pairMomentInput';
        const inp = document.getElementById(inpId);
        if (!inp)
            return;
        const text = inp.value.trim();
        if (!text)
            return;
        inp.value = '';
        inp.style.height = 'auto';
        doSendMoment(text);
    };
    window.pairSendQuickEmoji = function (emoji) {
        doSendMoment(emoji);
    };
    // Hook into cycle saves: whenever cycleData changes, push to Firebase + update local preview.
    window._pairOnCycleSave = function () {
        try {
            const d = pairLoad();
            if (!d.myCode)
                return;
            const cd = (typeof cycleData !== 'undefined') ? cycleData : {};
            // Push to Firebase so partner gets live update
            fbPushMyCycle();
            // Also keep local preview current (used when offline)
            if (d.partnerCode) {
                // Don't overwrite partnerCycleData from own data — leave it for Firebase listener
            }
            pairSave(d);
        }
        catch (e) { }
    };
})();
// ── Partner Moments Sheet ──────────────────────────────────────────────────
function openPartnerMomentsSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const inp = document.getElementById('pmPairMomentInput');
    if (inp) {
        let pname = 'your partner';
        try {
            const d = JSON.parse(localStorage.getItem('vikram_pair_v1') || '{}');
            if (d.partnerName)
                pname = d.partnerName;
        }
        catch (e) { }
        inp.placeholder = 'Say something to ' + pname + '…';
    }
    const sheet = document.getElementById('partnerMomentsSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
    setTimeout(function () {
        if (typeof window.renderPairMoments === 'function')
            window.renderPairMoments();
    }, 30);
}
function closePartnerMomentsSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('partnerMomentsSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
// ── Partner Log History Sheet ─────────────────────────────────────────────
function openPartnerLogHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const logs = window._pmAllLogs || [];
    const body = document.getElementById('partnerLogHistorySheetBody');
    if (body) {
        const logColors = { period_start: '#FF4757', period_end: '#22c55e', ovulation: '#a855f7' };
        const logLabels = { period_start: 'Period started', period_end: 'Period ended', ovulation: 'Ovulation logged' };
        const flowIcons = { spotting: '🩹', light: '🩸', medium: '🌊', heavy: '💧' };
        const sorted = [...logs].sort((a, b) => b.date - a.date);
        body.innerHTML = `
    <div class="ssec" style="padding-top:4px;">
      <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
        <span>All entries</span>
        <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${sorted.length} ${sorted.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      ${sorted.map(l => {
            const flowBadge = l.flow ? `<span class="flow-badge ${l.flow}">${flowIcons[l.flow] || ''} ${l.flow.charAt(0).toUpperCase() + l.flow.slice(1)}</span>` : '';
            return `
      <div class="srow" style="gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
          <div style="width:8px;height:8px;border-radius:50%;background:${logColors[l.type] || '#aaa'};flex-shrink:0;"></div>
          <div style="min-width:0;">
            <div class="slbl" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">${logLabels[l.type] || l.type}${flowBadge}</div>
            <div class="ssub">${new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
      </div>`;
        }).join('')}
    </div>`;
    }
    const sheet = document.getElementById('partnerLogHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closePartnerLogHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('partnerLogHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
// ── Partner Cycle History Sheet ───────────────────────────────────────────
function openPartnerCycleHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const cycles = window._pmCycles || [];
    const avg = window._pmCyclesAvg || 0;
    const body = document.getElementById('partnerCycleHistorySheetBody');
    if (body) {
        const maxLen = Math.max(...cycles.map(c => c.len), 35);
        body.innerHTML = `
    <div class="ssec" style="padding-top:4px;">
      <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
        <span>All cycles</span>
        <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">avg ${avg}d</span>
      </div>
      ${[...cycles].reverse().map(c => `
      <div class="cyc-hist-row">
        <div class="cyc-hist-date">${c.dateStr}</div>
        <div class="cyc-hist-bar-wrap"><div class="cyc-hist-bar" style="width:${Math.round(c.len / maxLen * 100)}%"></div></div>
        <div class="cyc-hist-len">${c.len}d</div>
      </div>`).join('')}
    </div>`;
    }
    const sheet = document.getElementById('partnerCycleHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closePartnerCycleHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('partnerCycleHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
// ── Partner Mood & Symptom History Sheet ────────────────────────────────────
function openPartnerSymptomHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderPartnerSymptomHistorySheet();
    const sheet = document.getElementById('partnerSymptomHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closePartnerSymptomHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('partnerSymptomHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderPartnerSymptomHistorySheet() {
    const body = document.getElementById('partnerSymptomHistorySheetBody');
    if (!body)
        return;
    const d = (typeof _pmPairLoad === 'function') ? _pmPairLoad() : {};
    const p = d.partnerCycleData || {};
    const logs = p.symptomLogs || [];
    if (!logs.length) {
        body.innerHTML = `<div style="padding:40px 24px;text-align:center;font-size:13px;font-weight:700;color:var(--dsub);">No mood or symptom entries logged yet 💭</div>`;
        return;
    }
    body.innerHTML = `
  <div class="ssec" style="padding-top:4px;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>All entries</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    ${[...logs].reverse().map(l => {
        const mood = l.mood ? MOOD_META[l.mood] : null;
        const dateStr = new Date(l.date).toLocaleDateString('en-NP', { month: 'short', day: 'numeric', year: 'numeric' });
        return `<div class="symlog-row">
        <div class="symlog-top">
          <div class="symlog-date-mood">
            ${mood ? `<span class="symlog-mood-emoji">${mood.emoji}</span>` : ''}
            <span class="symlog-date">${dateStr}</span>
          </div>
        </div>
        ${(l.symptoms && l.symptoms.length) ? `<div class="symlog-symptoms">${l.symptoms.map(sid => {
            const sm = SYMPTOM_META[sid];
            return sm ? `<span class="symlog-symptom-pill">${sm.emoji} ${sm.label}</span>` : '';
        }).join('')}</div>` : ''}
        ${l.note ? `<div class="symlog-note">"${_pmEscHtml(l.note)}"</div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}
// ── Partner TTC History Sheet (Intercourse / OPK / BBT, read-only) ─────────
let _pmTtcHistTab = 'bd'; // 'bd' | 'opk' | 'bbt'
function openPartnerTtcHistorySheet(tab) {
    if (typeof haptic === 'function')
        haptic('light');
    _pmTtcHistTab = tab || 'bd';
    renderPartnerTtcHistorySheet();
    const sheet = document.getElementById('partnerTtcHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closePartnerTtcHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('partnerTtcHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function setPartnerTtcHistTab(tab) {
    if (typeof haptic === 'function')
        haptic('light');
    _pmTtcHistTab = tab;
    renderPartnerTtcHistorySheet();
}
function renderPartnerTtcHistorySheet() {
    const tabBar = document.getElementById('partnerTtcHistTabBar');
    if (tabBar) {
        tabBar.querySelectorAll('.up-vtbtn').forEach(b => {
            b.classList.toggle('on', b.getAttribute('data-tab') === _pmTtcHistTab);
        });
    }
    const body = document.getElementById('partnerTtcHistorySheetBody');
    if (!body)
        return;
    const d = (typeof _pmPairLoad === 'function') ? _pmPairLoad() : {};
    const p = d.partnerCycleData || {};
    if (_pmTtcHistTab === 'bd') {
        const logs = p.intercourseLogs || [];
        if (!logs.length) {
            body.innerHTML = `<div class="ttc-mode-empty">No intercourse entries logged yet 💕</div>`;
            return;
        }
        body.innerHTML = `<div class="ssec" style="padding-top:4px;">
      <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
        <span>All entries</span>
        <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      ${[...logs].reverse().map(l => `<div class="ttc-log-row">
        <div class="ttc-log-top">
          <div class="ttc-log-left">
            <div class="ttc-log-icon">💕</div>
            <div>
              <div class="ttc-log-date">${_ttcDateStr(l.date)}</div>
              <div class="ttc-log-detail">${l.protected ? 'Protected' : 'Unprotected'}</div>
            </div>
          </div>
        </div>
        ${l.note ? `<div class="ttc-log-note">"${_pmEscHtml(l.note)}"</div>` : ''}
      </div>`).join('')}
    </div>`;
        return;
    }
    if (_pmTtcHistTab === 'opk') {
        const logs = p.opkLogs || [];
        if (!logs.length) {
            body.innerHTML = `<div class="ttc-mode-empty">No ovulation test entries logged yet 🧪</div>`;
            return;
        }
        const resultMeta = { neg: { emoji: '⚪', label: 'Negative', cls: 'neg' }, faint: { emoji: '🟡', label: 'Faint line', cls: 'faint' }, pos: { emoji: '🟢', label: 'Positive', cls: 'pos' } };
        body.innerHTML = `<div class="ssec" style="padding-top:4px;">
      <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
        <span>All entries</span>
        <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      ${[...logs].reverse().map(l => {
            const rm = resultMeta[l.result] || resultMeta.neg;
            return `<div class="ttc-log-row">
          <div class="ttc-log-top">
            <div class="ttc-log-left">
              <div class="ttc-log-icon">🧪</div>
              <div>
                <div class="ttc-log-date">${_ttcDateStr(l.date)}</div>
                <div class="ttc-log-detail"><span class="ttc-pill ${rm.cls}">${rm.emoji} ${rm.label}</span></div>
              </div>
            </div>
          </div>
          ${l.note ? `<div class="ttc-log-note">"${_pmEscHtml(l.note)}"</div>` : ''}
        </div>`;
        }).join('')}
    </div>`;
        return;
    }
    // BBT tab
    const logs = p.bbtLogs || [];
    if (!logs.length) {
        body.innerHTML = `<div class="ttc-mode-empty">No temperature entries logged yet 🌡️</div>`;
        return;
    }
    const unit = p.bbtUnit || 'C';
    body.innerHTML = `<div class="ssec" style="padding-top:4px;">
    <div class="ssect">Chart</div>
    ${renderPartnerTtcBbtChart(logs, p)}
  </div>
  <div class="ssec" style="padding-top:0;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>All entries</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    ${[...logs].reverse().map(l => {
        const dispTemp = _bbtToUnit(l, unit);
        return `<div class="ttc-log-row">
        <div class="ttc-log-top">
          <div class="ttc-log-left">
            <div class="ttc-log-icon">🌡️</div>
            <div>
              <div class="ttc-log-date">${_ttcDateStr(l.date)}</div>
              <div class="ttc-log-detail">${dispTemp.toFixed(2)}°${unit}${l.time ? ' · ' + l.time : ''}</div>
            </div>
          </div>
        </div>
        ${l.note ? `<div class="ttc-log-note">"${_pmEscHtml(l.note)}"</div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}
// Partner-aware BBT chart — same visual as own-view chart but reads ovulation
// markers from the partner's synced logs instead of cycleData.logs
function renderPartnerTtcBbtChart(logs, p) {
    if (logs.length < 2)
        return '';
    const unit = (p && p.bbtUnit) || 'C';
    const W = Math.max(320, logs.length * 34), H = 140, padL = 34, padR = 12, padT = 14, padB = 22;
    const vals = logs.map(l => _bbtToUnit(l, unit));
    let lo = Math.min(...vals), hi = Math.max(...vals);
    if (hi - lo < 0.4) {
        const mid = (hi + lo) / 2;
        lo = mid - 0.4;
        hi = mid + 0.4;
    }
    lo -= 0.15;
    hi += 0.15;
    const xStep = (W - padL - padR) / Math.max(1, logs.length - 1);
    const yFor = v => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
    const xFor = i => padL + i * xStep;
    const pathD = logs.map((l, i) => `${i === 0 ? 'M' : 'L'}${xFor(i).toFixed(1)},${yFor(vals[i]).toFixed(1)}`).join(' ');
    const ovulSet = new Set(((p && p.logs) || []).filter(l => l.type === 'ovulation').map(l => {
        const d = new Date(l.date);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }));
    const dots = logs.map((l, i) => {
        const x = xFor(i), y = yFor(vals[i]);
        const dMid = (() => { const d = new Date(l.date); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); })();
        const isOvul = ovulSet.has(dMid);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isOvul ? 4.5 : 3}" fill="${isOvul ? '#a855f7' : '#FF6B9D'}" stroke="${isOvul ? '#fff' : 'none'}" stroke-width="${isOvul ? 1.5 : 0}"/>`;
    }).join('');
    const xLabels = logs.map((l, i) => {
        if (logs.length > 10 && i % Math.ceil(logs.length / 8) !== 0 && i !== logs.length - 1)
            return '';
        const d = new Date(l.date);
        return `<text x="${xFor(i).toFixed(1)}" y="${H - 6}" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--dsub)">${d.getDate()}/${d.getMonth() + 1}</text>`;
    }).join('');
    const yTicks = [lo + (hi - lo) * 0.15, lo + (hi - lo) * 0.5, lo + (hi - lo) * 0.85];
    const yLabels = yTicks.map(v => {
        const y = yFor(v);
        return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="var(--sbdr)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="${padL - 5}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="8.5" font-weight="700" fill="var(--dsub)">${v.toFixed(1)}</text>`;
    }).join('');
    return `<div class="ttc-bbt-chart-wrap"><svg class="ttc-bbt-chart-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${yLabels}
    <path d="${pathD}" fill="none" stroke="#FF6B9D" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
    ${xLabels}
  </svg></div>
  <div style="display:flex;gap:14px;padding:0 0 4px;font-size:10px;font-weight:700;color:var(--dsub);">
    <span style="display:flex;align-items:center;gap:4px;"><span style="width:7px;height:7px;border-radius:50%;background:#FF6B9D;display:inline-block;"></span>Temp (°${unit})</span>
    <span style="display:flex;align-items:center;gap:4px;"><span style="width:7px;height:7px;border-radius:50%;background:#a855f7;display:inline-block;"></span>Ovulation logged</span>
  </div>`;
}
// ── Log History Sheet open / close / render ───────────────────────────────
function renderLogHistorySheet() {
    const body = document.getElementById('logHistorySheetBody');
    if (!body)
        return;
    const logs = cycleData.logs || [];
    const logColors = { period_start: '#FF4757', period_end: '#22c55e', ovulation: '#a855f7' };
    const logLabels = { period_start: 'Period started', period_end: 'Period ended', ovulation: 'Ovulation logged' };
    const flowIcons = { spotting: '🩹', light: '🩸', medium: '🌊', heavy: '💧' };
    if (!logs.length) {
        body.innerHTML = `<div style="padding:40px 24px;text-align:center;font-size:13px;font-weight:700;color:var(--dsub);">No logs yet — start tracking above 🌸</div>`;
        return;
    }
    body.innerHTML = `
  <div class="ssec" style="padding-top:4px;">
    <div class="ssect" style="display:flex;align-items:center;justify-content:space-between;">
      <span>All entries</span>
      <span style="font-size:10px;font-weight:700;color:var(--dsub);background:var(--tgbg);padding:2px 8px;border-radius:8px;">${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    ${[...logs].reverse().map((l, revIdx) => {
        const realIdx = logs.length - 1 - revIdx;
        const flowBadge = l.flow ? `<span class="flow-badge ${l.flow}">${flowIcons[l.flow] || ''} ${l.flow.charAt(0).toUpperCase() + l.flow.slice(1)}</span>` : '';
        return `<div class="srow" style="gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
          <div style="width:8px;height:8px;border-radius:50%;background:${logColors[l.type] || '#aaa'};flex-shrink:0;"></div>
          <div style="min-width:0;">
            <div class="slbl" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">${logLabels[l.type] || l.type}${flowBadge}</div>
            <div class="ssub">${new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
          <button class="cyc-log-del" onclick="cyEditLogOpen(${realIdx})" title="Edit this log">✏️</button>
          <button class="cyc-log-del" onclick="cyDeleteLogFromSheet(${realIdx})" title="Delete this log">🗑</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
    // Keep entry row subtitle in sync
    const sub = document.getElementById('logHistoryEntrySub');
    if (sub)
        sub.textContent = logs.length + ' ' + (logs.length === 1 ? 'entry' : 'entries');
}
function openLogHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderLogHistorySheet();
    const sheet = document.getElementById('logHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeLogHistorySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('logHistorySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
// Delete from inside the sheet — re-renders sheet in place, also refreshes main tab
function cyDeleteLogFromSheet(idx) {
    if (typeof haptic === 'function')
        haptic('light');
    _cyDeleteIdx = idx;
    const logs = cycleData.logs || [];
    if (idx < 0 || idx >= logs.length)
        return;
    const l = logs[idx];
    const logLabels = { period_start: 'Period started', period_end: 'Period ended', ovulation: 'Ovulation logged' };
    const dateStr = new Date(l.date).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    const desc = document.getElementById('cyDeleteLogDesc');
    if (desc)
        desc.textContent = (logLabels[l.type] || l.type) + ' · ' + dateStr;
    document.getElementById('cyDeleteLogOverlay').classList.add('open');
}
// ── Cycle Settings Sheet open / close / render ────────────────────────────
function renderCycleSettingsSheet() {
    const body = document.getElementById('cycleSettingsSheetBody');
    if (!body)
        return;
    const cl = cycleData.cycleLength || 28;
    const pl = cycleData.periodLength || 5;
    const pr = cycleData.periodReminders || { periodStart: false, bbtMorning: false, bbtTime: '07:00' };
    body.innerHTML = `
  <div class="ssec" style="padding-top:4px;">
    <div class="srow">
      <div>
        <div class="slbl">Cycle length</div>
        <div class="ssub">Average days between periods</div>
      </div>
      <div class="cyc-stepper">
        <button class="cyc-stepper-btn" onclick="cycleData.cycleLength=Math.max(21,(cycleData.cycleLength||28)-1);saveCycle();renderCycleSettingsSheet();renderCycleSheet();">−</button>
        <div class="cyc-stepper-val" id="cssClVal">${cl}</div>
        <button class="cyc-stepper-btn" onclick="cycleData.cycleLength=Math.min(45,(cycleData.cycleLength||28)+1);saveCycle();renderCycleSettingsSheet();renderCycleSheet();">+</button>
      </div>
    </div>
    <div class="srow" style="border-bottom:none;">
      <div>
        <div class="slbl">Period length</div>
        <div class="ssub">Average days of bleeding</div>
      </div>
      <div class="cyc-stepper">
        <button class="cyc-stepper-btn" onclick="cycleData.periodLength=Math.max(2,(cycleData.periodLength||5)-1);saveCycle();renderCycleSettingsSheet();renderCycleSheet();">−</button>
        <div class="cyc-stepper-val" id="cssPlVal">${pl}</div>
        <button class="cyc-stepper-btn" onclick="cycleData.periodLength=Math.min(10,(cycleData.periodLength||5)+1);saveCycle();renderCycleSettingsSheet();renderCycleSheet();">+</button>
      </div>
    </div>
  </div>
  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Reminders</div>
    <div class="srow" style="cursor:pointer;" onclick="cyToggleReminder('periodStart')">
      <div style="min-width:0;flex:1;">
        <div class="slbl">Predicted period start</div>
        <div class="ssub">Notify the morning your period is predicted</div>
      </div>
      <div class="cm-opt-switch${pr.periodStart ? ' on' : ''}"><div class="cm-opt-switch-knob"></div></div>
    </div>
    <div class="srow" style="cursor:pointer;${pr.bbtMorning ? '' : 'border-bottom:none;'}" onclick="cyToggleReminder('bbtMorning')">
      <div style="min-width:0;flex:1;">
        <div class="slbl">BBT morning reminder</div>
        <div class="ssub">Daily nudge to log your temperature</div>
      </div>
      <div class="cm-opt-switch${pr.bbtMorning ? ' on' : ''}"><div class="cm-opt-switch-knob"></div></div>
    </div>
    ${pr.bbtMorning ? `
    <div class="srow" style="border-bottom:none;">
      <div class="slbl">Reminder time</div>
      <input type="time" value="${pr.bbtTime || '07:00'}" onchange="cySetBbtReminderTime(this.value)"
        style="padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:13px;font-family:'Nunito',sans-serif;font-weight:700;"/>
    </div>` : ''}
  </div>
  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="border-bottom:none;cursor:pointer;" onclick="cyReset()">
      <div class="slbl" style="color:#f43f5e;">🗑 Clear all cycle data</div>
    </div>
  </div>`;
    // Keep entry row subtitle in sync
    const sub = document.getElementById('cycleSettingsEntrySub');
    if (sub)
        sub.textContent = 'Cycle ' + cl + 'd · Period ' + pl + 'd';
}
function cyToggleReminder(key) {
    if (typeof haptic === 'function')
        haptic('light');
    cycleData.periodReminders = cycleData.periodReminders || { periodStart: false, bbtMorning: false, bbtTime: '07:00' };
    cycleData.periodReminders[key] = !cycleData.periodReminders[key];
    // Request notification permission if turning a reminder on and not yet granted
    if (cycleData.periodReminders[key] && typeof requestNotifPerm === 'function' && 'Notification' in window && Notification.permission !== 'granted') {
        requestNotifPerm().then(() => { saveCycle(); renderCycleSettingsSheet(); });
        return;
    }
    saveCycle();
    renderCycleSettingsSheet();
}
function cySetBbtReminderTime(val) {
    cycleData.periodReminders = cycleData.periodReminders || { periodStart: false, bbtMorning: false, bbtTime: '07:00' };
    cycleData.periodReminders.bbtTime = val || '07:00';
    saveCycle();
}
function openCycleSettingsSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderCycleSettingsSheet();
    const sheet = document.getElementById('cycleSettingsSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
// ── Cycle Detail Sheet — expanded view opened by tapping the hero card ──────
function renderCycleDetailSheet() {
    const body = document.getElementById('cycleDetailSheetBody');
    if (!body)
        return;
    const d = cycleDefaults();
    cycleData = { ...d, ...cycleData };
    const day = getDayOfCycle();
    const phase = getPhase();
    const pi = phase ? PHASE_INFO[phase.name] : null;
    const dNext = getDaysUntilNextPeriod();
    const dOvul = getDaysUntilOvulation();
    const cl = d.cycleLength, pl = d.periodLength;
    const notSet = !cycleData.lastPeriodStart;
    if (notSet) {
        body.innerHTML = `<div style="padding:32px 18px;text-align:center;color:var(--dsub);font-size:13px;font-weight:700;">Log your first period to see cycle detail here.</div>`;
        return;
    }
    const today0ts = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
    const cycleStartTs = cycleData.lastPeriodStart;
    const allLogs = cycleData.logs || [];
    const periodEndLog = (allLogs.filter(l => l.type === 'period_end' && l.date >= cycleStartTs)
        .sort((a, b) => b.date - a.date)[0] || null);
    const ovulLog = (allLogs.filter(l => l.type === 'ovulation' && l.date >= cycleStartTs)
        .sort((a, b) => b.date - a.date)[0] || null);
    const ovDay2 = cl - 14;
    const fertileStart = ovDay2 - 4;
    const ovulDaysAgo = ovulLog ? Math.round((today0ts - ovulLog.date) / 86400000) : null;
    const periodEndDaysAgo = periodEndLog ? Math.round((today0ts - periodEndLog.date) / 86400000) : null;
    const periodEndedLabel = periodEndLog
        ? (periodEndDaysAgo === 0 ? 'Today' : periodEndDaysAgo === 1 ? 'Yesterday' : periodEndDaysAgo + 'd ago')
        : null;
    const periodLabel = periodEndLog ? 'Done'
        : day <= pl ? 'Day ' + day + '/' + pl
            : day > (cl - 3) ? 'Soon' : 'Done';
    const inFertile = !ovulLog && day >= fertileStart && day <= ovDay2;
    const dFertileStart = fertileStart - day;
    const dFertileEnd = ovDay2 - day;
    const fertileLabel = ovulLog ? 'Passed'
        : inFertile ? (dFertileEnd <= 0 ? 'Last day' : dFertileEnd + 'd left')
            : dFertileStart > 0 ? 'In ' + dFertileStart + 'd'
                : 'Passed';
    const ovulLabel = ovulLog ? 'Logged'
        : dOvul === null ? 'Passed' : dOvul === 0 ? 'Today!' : 'In ' + dOvul + 'd';
    const ovulSubLabel = ovulLog
        ? (ovulDaysAgo === 0 ? 'Today' : ovulDaysAgo === 1 ? 'Yesterday' : ovulDaysAgo + 'd ago')
        : null;
    const nextLabel = (() => {
        if (ovulLog) {
            const dFromOvul = 14 - ovulDaysAgo;
            return dFromOvul <= 0 ? 'Today' : dFromOvul + 'd';
        }
        return dNext === 0 ? 'Today' : dNext + 'd';
    })();
    const nextDate = (() => {
        const dd = ovulLog ? Math.max(0, 14 - ovulDaysAgo) : dNext;
        const target = new Date(today0ts + dd * 86400000);
        return `${ADMEN[target.getMonth()]} ${target.getDate()}`;
    })();
    const cyclePct = Math.min(1, day / cl);
    const cyclePctStr = Math.round(cyclePct * 100) + '%';
    const dCycleLeft = Math.max(0, cl - day);
    const conceptionChance = (ovulLog && ovulDaysAgo <= 1) ? 'Peak'
        : ovulLog ? 'Low'
            : inFertile ? 'High'
                : (dFertileStart !== null && dFertileStart > 0 && dFertileStart <= 3) ? 'Rising'
                    : 'Low';
    const conceptionColor = { Peak: '#a855f7', High: '#22c55e', Rising: '#f59e0b', Low: 'var(--dsub)' }[conceptionChance];
    const phaseRows = [
        { name: 'Menstrual', range: `Day 1–${pl}` },
        { name: 'Follicular', range: `Day ${pl + 1}–${ovDay2 - 3}` },
        { name: 'Ovulation', range: `Day ${ovDay2 - 2}–${ovDay2 + 2}` },
        { name: 'Luteal', range: `Day ${ovDay2 + 3}–${cl}` },
    ];
    body.innerHTML = `
  <div class="cyc-hero" style="margin:0 16px 14px;">
    <div class="cyc-hero-bg" style="background:${heroBgFromPhase(phase ? phase.name : null)};">
      <div class="cyc-hero-top">
        <div class="cyc-hero-phase">
          <div class="cyc-hero-phase-label">Current Phase</div>
          <div class="cyc-hero-phase-name">${phase ? phase.name : '—'}</div>
          <div class="cyc-hero-phase-desc">${pi ? pi.desc : ''} · Day ${phase ? phase.dayIn : day} of ${phase ? phase.of : cl}</div>
          ${periodEndedLabel ? `<div style="display:inline-flex;align-items:center;gap:5px;margin-top:6px;padding:3px 9px;border-radius:20px;background:rgba(34,197,94,.18);border:1px solid rgba(34,197,94,.35);width:fit-content;"><span style="font-size:11px;">🌿</span><span style="font-size:11px;font-weight:800;color:rgba(255,255,255,.9);letter-spacing:.2px;">Period ended · ${periodEndedLabel}</span></div>` : ''}
        </div>
        <div class="cyc-hero-ring-wrap">
          ${buildHeroRing(day, pi ? pi.color : '#fff')}
          <div class="cyc-hero-ring-center">
            <div class="cyc-hero-ring-day">${day}</div>
            <div class="cyc-hero-ring-of">of ${cl}</div>
          </div>
        </div>
      </div>
      <div class="cyc-timeline">${buildPhaseTimeline(day)}</div>
    </div>
  </div>

  ${buildMonthReviewCard(notSet, cl, pl)}

  <div class="ssec" style="padding-top:4px;">
    <div class="ssect">Key dates</div>
    <div class="srow">
      <div><div class="slbl">📅 Next period</div><div class="ssub">${nextDate}</div></div>
      <div style="text-align:right;">
        <div class="slbl">${nextLabel}</div>
        <div class="ssub" style="color:${ovulLog ? '#22c55e' : 'var(--dsub)'};">${ovulLog ? '✓ Logged' : '~ Predicted'}</div>
      </div>
    </div>
    <div class="srow">
      <div><div class="slbl">🩸 Period</div><div class="ssub">${pl} day${pl === 1 ? '' : 's'} average</div></div>
      <div style="text-align:right;">
        <div class="slbl">${periodLabel}</div>
        <div class="ssub" style="color:${periodEndLog ? '#22c55e' : 'var(--dsub)'};">${periodEndLog ? '✓ Logged' : '~ Predicted'}</div>
      </div>
    </div>
    <div class="srow">
      <div><div class="slbl">🌸 Fertile window</div><div class="ssub">Day ${fertileStart}–${ovDay2}</div></div>
      <div style="text-align:right;">
        <div class="slbl">${fertileLabel}</div>
        <div class="ssub" style="color:${ovulLog ? '#22c55e' : 'var(--dsub)'};">${ovulLog ? '✓ Logged' : '~ Predicted'}</div>
      </div>
    </div>
    <div class="srow" style="border-bottom:none;">
      <div><div class="slbl">✨ Ovulation</div><div class="ssub">Day ${ovDay2}</div></div>
      <div style="text-align:right;">
        <div class="slbl">${ovulLabel}</div>
        <div class="ssub" style="color:${ovulLog ? '#22c55e' : 'var(--dsub)'};">${ovulSubLabel ? ovulSubLabel : (ovulLog ? '✓ Logged' : '~ Predicted')}</div>
      </div>
    </div>
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Cycle stats</div>
    <div class="srow">
      <div class="slbl">Cycle progress</div>
      <div class="slbl">${cyclePctStr} · ${dCycleLeft}d left</div>
    </div>
    <div class="srow">
      <div class="slbl">Cycle length</div>
      <div class="slbl">${cl} days</div>
    </div>
    <div class="srow">
      <div class="slbl">Conception chance today</div>
      <div class="slbl" style="color:${conceptionColor};">${conceptionChance}</div>
    </div>
    <div class="srow" style="border-bottom:none;">
      <div class="slbl">Cycle day</div>
      <div class="slbl">${day} of ${cl}</div>
    </div>
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Phases</div>
    ${phaseRows.map(p => {
        const info = PHASE_INFO[p.name];
        const active = phase && phase.name === p.name;
        return `<div class="srow" style="${active ? 'background:' + info.color + '14;border-radius:10px;padding:9px 8px;margin:0 -8px;border-bottom:none;' : ''}">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:15px;">${info.emoji}</span>
          <div>
            <div class="slbl">${p.name}${active ? ' · Now' : ''}</div>
            <div class="ssub">${info.desc}</div>
          </div>
        </div>
        <div class="ssub">${p.range}</div>
      </div>`;
    }).join('')}
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="srow" style="cursor:pointer;" onclick="closeCycleDetailSheet();openCycleSettingsSheet();">
      <div class="slbl">⚙️ Cycle settings</div>
    </div>
  </div>`;
}
function heroBgFromPhase(phaseName) {
    const heroGradients = {
        Menstrual: 'linear-gradient(145deg,#c0392b,#e74c3c,#ff6b6b)',
        Follicular: 'linear-gradient(145deg,#c44569,#FF6B9D,#ffb3cc)',
        Ovulation: 'linear-gradient(145deg,#6c5ce7,#a29bfe,#c9b8ff)',
        Luteal: 'linear-gradient(145deg,#1565c0,#2196F3,#64b5f6)',
    };
    return heroGradients[phaseName] || heroGradients.Follicular;
}
function openCycleDetailSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderCycleDetailSheet();
    const sheet = document.getElementById('cycleDetailSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeCycleDetailSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('cycleDetailSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
// ── Partner Cycle Detail Sheet — expanded view opened by tapping the partner hero card ──
function renderPartnerCycleDetailSheet() {
    const body = document.getElementById('partnerCycleDetailSheetBody');
    if (!body)
        return;
    const s = window._pmHeroDetail;
    if (!s || s.notSet) {
        body.innerHTML = `<div style="padding:32px 18px;text-align:center;color:var(--dsub);font-size:13px;font-weight:700;">Waiting for ${s ? s.partnerName : 'your partner'} to log their cycle.</div>`;
        return;
    }
    const conceptionColor = { Peak: '#a855f7', High: '#22c55e', Rising: '#f59e0b', Low: 'var(--dsub)' }[s.conceptionChance];
    const PHASE_INFO_PM = {
        Menstrual: { emoji: '🔴', color: '#FF4757', desc: 'Period phase' },
        Follicular: { emoji: '🌱', color: '#FF6B9D', desc: 'Building phase' },
        Ovulation: { emoji: '✨', color: '#5a5a68', desc: 'Fertile window' },
        Luteal: { emoji: '🌙', color: '#3B82F6', desc: 'Premenstrual' },
    };
    const phaseRows = [
        { name: 'Menstrual', range: `Day 1–${s.pl}` },
        { name: 'Follicular', range: `Day ${s.pl + 1}–${s.ovDay2 - 3}` },
        { name: 'Ovulation', range: `Day ${s.ovDay2 - 2}–${s.ovDay2 + 2}` },
        { name: 'Luteal', range: `Day ${s.ovDay2 + 3}–${s.cl}` },
    ];
    const ringHTML = (() => {
        const R = 33, SW = 5.5, CX = 40, CY = 40, C = 2 * Math.PI * R;
        const filled = (s.cyclePct * C).toFixed(2);
        return `<svg viewBox="0 0 80 80" width="80" height="80">
      <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="${SW}"/>
      <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="${SW}"
        stroke-dasharray="${filled} ${C.toFixed(2)}" stroke-dashoffset="${C * 0.25}"
        stroke-linecap="round" style="transition:stroke-dasharray .5s ease;"/>
    </svg>`;
    })();
    const timelineHTML = (() => {
        const segments = [
            { start: 0, end: s.pl, color: '#FF4757' },
            { start: s.pl, end: s.ovDay2 - 2, color: '#FF6B9D' },
            { start: s.ovDay2 - 2, end: s.ovDay2 + 2, color: 'rgba(255,255,255,.6)' },
            { start: s.ovDay2 + 2, end: s.cl, color: '#7dd3fc' },
        ];
        return segments.map(seg => {
            const w = ((seg.end - seg.start) / s.cl * 100).toFixed(1);
            return `<div class="cyc-timeline-seg active" style="width:${w}%;background:${seg.color};"></div>`;
        }).join('');
    })();
    body.innerHTML = `
  <div class="cyc-hero" style="margin:0 16px 14px;">
    <div class="cyc-hero-bg" style="background:${s.heroBg};">
      <div class="cyc-hero-top">
        <div class="cyc-hero-phase">
          <div class="cyc-hero-phase-label">Current Phase</div>
          <div class="cyc-hero-phase-name">${s.phaseName}</div>
          <div class="cyc-hero-phase-desc">${s.phaseDesc} · Day ${s.day} of ${s.cl}</div>
          ${s.periodEndedLabel ? `<div style="display:inline-flex;align-items:center;gap:5px;margin-top:6px;padding:3px 9px;border-radius:20px;background:rgba(34,197,94,.18);border:1px solid rgba(34,197,94,.35);width:fit-content;"><span style="font-size:11px;">🌿</span><span style="font-size:11px;font-weight:800;color:rgba(255,255,255,.9);letter-spacing:.2px;">Period ended · ${s.periodEndedLabel}</span></div>` : ''}
        </div>
        <div class="cyc-hero-ring-wrap">
          ${ringHTML}
          <div class="cyc-hero-ring-center">
            <div class="cyc-hero-ring-day">${s.day}</div>
            <div class="cyc-hero-ring-of">of ${s.cl}</div>
          </div>
        </div>
      </div>
      <div class="cyc-timeline">${timelineHTML}</div>
    </div>
  </div>

  ${buildMonthReviewCard(false, s.cl, s.pl, s.rawData)}

  <div class="ssec" style="padding-top:4px;">
    <div class="ssect">Key dates</div>
    <div class="srow">
      <div><div class="slbl">📅 Next period</div><div class="ssub">${s.nextDate}</div></div>
      <div style="text-align:right;">
        <div class="slbl">${s.nextLabel}</div>
        <div class="ssub" style="color:${s.ovulLog ? '#22c55e' : 'var(--dsub)'};">${s.ovulLog ? '✓ Logged' : '~ Predicted'}</div>
      </div>
    </div>
    <div class="srow">
      <div><div class="slbl">🩸 Period</div><div class="ssub">${s.pl} day${s.pl === 1 ? '' : 's'} average</div></div>
      <div style="text-align:right;">
        <div class="slbl">${s.periodLabel}</div>
        <div class="ssub" style="color:${s.periodEndLog ? '#22c55e' : 'var(--dsub)'};">${s.periodEndLog ? '✓ Logged' : '~ Predicted'}</div>
      </div>
    </div>
    <div class="srow">
      <div><div class="slbl">🌸 Fertile window</div><div class="ssub">Day ${s.fertileStart}–${s.ovDay2}</div></div>
      <div style="text-align:right;">
        <div class="slbl">${s.fertileLabel}</div>
        <div class="ssub" style="color:${s.ovulLog ? '#22c55e' : 'var(--dsub)'};">${s.ovulLog ? '✓ Logged' : '~ Predicted'}</div>
      </div>
    </div>
    <div class="srow" style="border-bottom:none;">
      <div><div class="slbl">✨ Ovulation</div><div class="ssub">Day ${s.ovDay2}</div></div>
      <div style="text-align:right;">
        <div class="slbl">${s.ovulLabel}</div>
        <div class="ssub" style="color:${s.ovulLog ? '#22c55e' : 'var(--dsub)'};">${s.ovulSubLabel ? s.ovulSubLabel : (s.ovulLog ? '✓ Logged' : '~ Predicted')}</div>
      </div>
    </div>
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Cycle stats</div>
    <div class="srow">
      <div class="slbl">Cycle progress</div>
      <div class="slbl">${Math.round(s.cyclePct * 100)}% · ${s.dCycleLeft}d left</div>
    </div>
    <div class="srow">
      <div class="slbl">Cycle length</div>
      <div class="slbl">${s.cl} days</div>
    </div>
    <div class="srow" style="border-bottom:none;">
      <div class="slbl">Conception chance today</div>
      <div class="slbl" style="color:${conceptionColor};">${s.conceptionChance}</div>
    </div>
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Phases</div>
    ${phaseRows.map(p => {
        const info = PHASE_INFO_PM[p.name];
        const active = s.phaseName === p.name;
        return `<div class="srow" style="${active ? 'background:' + info.color + '14;border-radius:10px;padding:9px 8px;margin:0 -8px;border-bottom:none;' : ''}">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:15px;">${info.emoji}</span>
          <div>
            <div class="slbl">${p.name}${active ? ' · Now' : ''}</div>
            <div class="ssub">${info.desc}</div>
          </div>
        </div>
        <div class="ssub">${p.range}</div>
      </div>`;
    }).join('')}
  </div>`;
}
function openPartnerCycleDetailSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderPartnerCycleDetailSheet();
    const sheet = document.getElementById('partnerCycleDetailSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closePartnerCycleDetailSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('partnerCycleDetailSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function closeCycleSettingsSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('cycleSettingsSheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
// ── Partner Sync Dashboard Sheet open / close ─────────────────────────────
function openPartnerSyncSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    // Render the pair content into the sheet first
    if (typeof renderPairSection === 'function')
        renderPairSection();
    const sheet = document.getElementById('partnerSyncSheet');
    const ov = document.getElementById('ov');
    if (sheet) {
        sheet.classList.add('open');
    }
    if (ov) {
        ov.classList.add('open');
    }
    // Render moments now that the DOM elements are visible
    setTimeout(function () {
        if (typeof window.renderPairMoments === 'function')
            window.renderPairMoments();
    }, 60);
}
function closePartnerSyncSheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('partnerSyncSheet');
    const ov = document.getElementById('ov');
    if (sheet) {
        sheet.classList.remove('open');
    }
    if (ov) {
        ov.classList.remove('open');
    }
}
// Allow the overlay tap to close the partner sync sheet too
(function () {
    const origOvHandler = document.getElementById('ov');
    if (origOvHandler) {
        const existing = origOvHandler.getAttribute('onclick') || '';
        origOvHandler.setAttribute('onclick', existing.replace(')(this)', `)(this); if(document.getElementById('partnerSyncSheet')?.classList.contains('open')){closePartnerSyncSheet();} if(document.getElementById('cycleSettingsSheet')?.classList.contains('open')){closeCycleSettingsSheet();} if(document.getElementById('cycleDetailSheet')?.classList.contains('open')){closeCycleDetailSheet();} if(document.getElementById('partnerCycleDetailSheet')?.classList.contains('open')){closePartnerCycleDetailSheet();} if(document.getElementById('logHistorySheet')?.classList.contains('open')){closeLogHistorySheet();} if(document.getElementById('symptomLogSheet')?.classList.contains('open')){closeSymptomLogSheet();} if(document.getElementById('symptomHistorySheet')?.classList.contains('open')){closeSymptomHistorySheet();} if(document.getElementById('intercourseLogSheet')?.classList.contains('open')){closeIntercourseLogSheet();} if(document.getElementById('opkLogSheet')?.classList.contains('open')){closeOpkLogSheet();} if(document.getElementById('bbtLogSheet')?.classList.contains('open')){closeBbtLogSheet();} if(document.getElementById('ttcHistorySheet')?.classList.contains('open')){closeTtcHistorySheet();} if(document.getElementById('partnerSymptomHistorySheet')?.classList.contains('open')){closePartnerSymptomHistorySheet();} if(document.getElementById('partnerTtcHistorySheet')?.classList.contains('open')){closePartnerTtcHistorySheet();} if(document.getElementById('medLogSheet')?.classList.contains('open')){closeMedLogSheet();} if(document.getElementById('medHistorySheet')?.classList.contains('open')){closeMedHistorySheet();} if(document.getElementById('vitalsLogSheet')?.classList.contains('open')){closeVitalsLogSheet();} if(document.getElementById('vitalsHistorySheet')?.classList.contains('open')){closeVitalsHistorySheet();} if(document.getElementById('clinicSummarySheet')?.classList.contains('open')){closeClinicSummarySheet();} if(document.getElementById('mucusLogSheet')?.classList.contains('open')){closeMucusLogSheet();} if(document.getElementById('contraSetupSheet')?.classList.contains('open')){closeContraSetupSheet();} if(document.getElementById('contraHistorySheet')?.classList.contains('open')){closeContraHistorySheet();} if(document.getElementById('phaseReminderSheet')?.classList.contains('open')){closePhaseReminderSheet();}`));
    }
})();
function cyPrivToggle(key, btn) {
    cycleData.privacy = cycleData.privacy || {};
    cycleData.privacy[key] = !(cycleData.privacy[key] !== false);
    btn.classList.toggle('on', cycleData.privacy[key] !== false);
    saveCycle();
}
function todayDateKey() {
    const t = TODAY;
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}
// ── Predictions ──────────────────────────────────────────────────────────────
function buildPredictions(lastStart, cl, pl) {
    const base = new Date(lastStart);
    base.setHours(0, 0, 0, 0);
    const today = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const results = [];
    // Walk forward cycle by cycle until we have 3 future (or recent) predictions
    for (let cycle = 0; results.length < 3 && cycle < 24; cycle++) {
        const start = new Date(base.getTime() + cycle * cl * 86400000);
        const daysAway = Math.round((+start - +today) / 86400000);
        // Skip cycles that ended more than a week ago
        if (daysAway < -(pl + 7))
            continue;
        const end = new Date(start.getTime() + (pl - 1) * 86400000);
        const ovStart = new Date(start.getTime() + (cl - 16) * 86400000);
        const ovEnd = new Date(start.getTime() + (cl - 12) * 86400000);
        results.push({
            dateStr: start.toLocaleDateString('en-NP', { month: 'short', day: 'numeric' }) +
                ' – ' + end.toLocaleDateString('en-NP', { month: 'short', day: 'numeric' }),
            fertileStr: ovStart.toLocaleDateString('en-NP', { month: 'short', day: 'numeric' }) +
                ' – ' + ovEnd.toLocaleDateString('en-NP', { month: 'short', day: 'numeric' }),
            daysAway,
        });
    }
    return results;
}
// ── Cycle regularity alert (proactive banner; needs 3+ cycles of data) ─────
function getCycleRegularityAlert() {
    const logs = (cycleData.logs || []).filter(l => l.type === 'period_start').sort((a, b) => a.date - b.date);
    if (logs.length < 4)
        return null; // need at least 4 starts → 3 cycle lengths
    const allCycles = [];
    for (let i = 1; i < logs.length; i++) {
        const len = Math.round((logs[i].date - logs[i - 1].date) / 86400000);
        if (len > 0 && len < 60)
            allCycles.push(len);
    }
    if (allCycles.length < 3)
        return null;
    const recent = allCycles.slice(-6);
    const n = recent.length;
    const avg = recent.reduce((a, b) => a + b, 0) / n;
    const variance = recent.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const range = Math.max(...recent) - Math.min(...recent);
    if (stdDev > 5 || range > 9) {
        return { detail: `±${stdDev.toFixed(1)}d variance over your last ${n} cycles` };
    }
    return null;
}
// ── Cycle Insights & Trends (avg length, variance, sparkline) ────────────────
function renderCycleInsights() {
    const logs = (cycleData.logs || []).filter(l => l.type === 'period_start').sort((a, b) => a.date - b.date);
    if (logs.length < 2) {
        return `<div class="cyc-insights-card">
      <div class="cyc-insights-title">📈 Cycle insights</div>
      <div class="cyc-insights-empty">Log at least 2 period start dates to see your average length, variance, and trend.</div>
    </div>`;
    }
    // Build all cycle lengths (consecutive period_start gaps), sane range filter
    const allCycles = [];
    for (let i = 1; i < logs.length; i++) {
        const len = Math.round((logs[i].date - logs[i - 1].date) / 86400000);
        if (len > 0 && len < 60) {
            allCycles.push({ len, startDate: logs[i - 1].date, endDate: logs[i].date });
        }
    }
    if (!allCycles.length) {
        return `<div class="cyc-insights-card">
      <div class="cyc-insights-title">📈 Cycle insights</div>
      <div class="cyc-insights-empty">Not enough valid cycle data yet — keep logging period start dates.</div>
    </div>`;
    }
    // Window: cycles whose start falls within the last 6 months, capped to a max of 6 cycles
    const sixMonthsAgoTs = new Date(TODAY.getFullYear(), TODAY.getMonth() - 6, TODAY.getDate()).getTime();
    let windowCycles = allCycles.filter(c => c.endDate >= sixMonthsAgoTs);
    if (!windowCycles.length)
        windowCycles = allCycles.slice(-3); // fallback if all data is older
    windowCycles = windowCycles.slice(-6);
    const monthsSpan = Math.max(1, Math.round((TODAY.getTime() - windowCycles[0].startDate) / (30.44 * 86400000)));
    const n = windowCycles.length;
    const lens = windowCycles.map(c => c.len);
    const avg = lens.reduce((a, b) => a + b, 0) / n;
    const variance = n > 1 ? lens.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / n : 0;
    const stdDev = Math.sqrt(variance);
    const range = n > 1 ? Math.max(...lens) - Math.min(...lens) : 0;
    // Trend: compare most recent cycle to the average of the rest
    let trendCls = 'flat', trendArrow = '→', trendLabel = 'Stable';
    if (n >= 2) {
        const latest = lens[lens.length - 1];
        const priorAvg = lens.slice(0, -1).reduce((a, b) => a + b, 0) / (n - 1);
        const diff = latest - priorAvg;
        if (diff >= 1.5) {
            trendCls = 'up';
            trendArrow = '↗';
            trendLabel = `+${Math.round(diff)}d vs prior avg`;
        }
        else if (diff <= -1.5) {
            trendCls = 'down';
            trendArrow = '↘';
            trendLabel = `${Math.round(diff)}d vs prior avg`;
        }
        else {
            trendCls = 'flat';
            trendArrow = '→';
            trendLabel = 'In line with average';
        }
    }
    // Regularity label based on std dev (clinically: <=7-9d variation across cycles is typical/regular)
    let regCls = 'reg', regLabel = 'Regular';
    if (stdDev > 5 || range > 9) {
        regCls = 'irreg';
        regLabel = 'Irregular';
    }
    else if (stdDev > 2.5 || range > 5) {
        regCls = 'mod';
        regLabel = 'Somewhat variable';
    }
    // ── Sparkline SVG ──
    const sparkW = 132, sparkH = 40, padX = 4, padY = 6;
    const minL = Math.min(...lens), maxL = Math.max(...lens);
    const spanL = (maxL - minL) || 1;
    const stepX = n > 1 ? (sparkW - padX * 2) / (n - 1) : 0;
    const yFor = v => padY + (1 - (v - minL) / spanL) * (sparkH - padY * 2);
    const pts = lens.map((v, i) => ({ x: padX + i * stepX, y: yFor(v) }));
    const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const avgY = yFor(avg);
    const dots = pts.map((p, i) => {
        const isLast = i === pts.length - 1;
        return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${isLast ? 3.5 : 2.3}" fill="${isLast ? '#C44569' : '#FF6B9D'}" ${isLast ? 'stroke="#fff" stroke-width="1.3"' : ''}/>`;
    }).join('');
    const sparkSvg = `<svg class="cyc-spark-svg" width="${sparkW}" height="${sparkH}" viewBox="0 0 ${sparkW} ${sparkH}">
    <line x1="${padX}" y1="${avgY.toFixed(1)}" x2="${sparkW - padX}" y2="${avgY.toFixed(1)}" stroke="var(--sbdr)" stroke-width="1" stroke-dasharray="2,3"/>
    <path d="${pathD}" fill="none" stroke="#FF6B9D" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
  </svg>`;
    return `<div class="cyc-insights-card">
    <div class="cyc-insights-title">📈 Cycle insights</div>
    <div class="cyc-insights-sub">Based on your last ${n} cycle${n === 1 ? '' : 's'} · ~${monthsSpan} month${monthsSpan === 1 ? '' : 's'}</div>
    <div class="cyc-insights-stats">
      <div class="cyc-insights-stat">
        <div class="cyc-insights-stat-val">${avg.toFixed(1)}d</div>
        <div class="cyc-insights-stat-lbl">Avg length</div>
      </div>
      <div class="cyc-insights-stat">
        <div class="cyc-insights-stat-val">±${stdDev.toFixed(1)}d</div>
        <div class="cyc-insights-stat-lbl">Variance</div>
      </div>
      <div class="cyc-insights-stat">
        <div class="cyc-insights-stat-val" style="font-size:14px;">${trendArrow} ${lens[lens.length - 1]}d</div>
        <div class="cyc-insights-stat-lbl">Latest</div>
        <div class="cyc-insights-stat-trend ${trendCls}">${trendLabel}</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
      <div class="cyc-spark-wrap">${sparkSvg}</div>
      <div style="text-align:right;flex-shrink:0;">
        <div class="cyc-insights-regularity ${regCls}">${regLabel}</div>
        <div style="font-size:9.5px;font-weight:700;color:var(--dsub);margin-top:4px;">Range: ${minL}–${maxL}d</div>
      </div>
    </div>
  </div>`;
}
// ── Cycle History ─────────────────────────────────────────────────────────────
function renderCycleHistory() {
    const logs = (cycleData.logs || []).filter(l => l.type === 'period_start');
    if (logs.length < 2)
        return '';
    const cycles = [];
    for (let i = 1; i < logs.length; i++) {
        const len = Math.round((logs[i].date - logs[i - 1].date) / 86400000);
        if (len > 0 && len < 60) {
            const d = new Date(logs[i - 1].date);
            cycles.push({ len, dateStr: d.toLocaleDateString('en-NP', { month: 'short', day: 'numeric' }) });
        }
    }
    if (!cycles.length)
        return '';
    const avg = Math.round(cycles.reduce((a, c) => a + c.len, 0) / cycles.length);
    const maxLen = Math.max(...cycles.map(c => c.len), 35);
    return `
  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Cycle history · avg ${avg}d</div>
    ${cycles.slice(-6).reverse().map(c => `
    <div class="cyc-hist-row">
      <div class="cyc-hist-date">${c.dateStr}</div>
      <div class="cyc-hist-bar-wrap"><div class="cyc-hist-bar" style="width:${Math.round(c.len / maxLen * 100)}%"></div></div>
      <div class="cyc-hist-len">${c.len}d</div>
    </div>`).join('')}
  </div>`;
}
// ══ EXPORT CYCLE DATA (CSV BACKUP) ═════════════════════════════════════════
function _csvEsc(v) {
    if (v === null || v === undefined)
        return '';
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
}
function exportCycleData() {
    if (typeof haptic === 'function')
        haptic('light');
    const rows = [['Section', 'Date', 'Type', 'Detail 1', 'Detail 2', 'Note']];
    (cycleData.logs || []).forEach(l => {
        rows.push(['Cycle log', new Date(l.date).toLocaleDateString('en-NP'), l.type, l.flow || '', '', '']);
    });
    (cycleData.symptomLogs || []).forEach(l => {
        rows.push(['Mood & symptoms', new Date(l.date).toLocaleDateString('en-NP'), l.mood || '', (l.symptoms || []).join('; '), '', l.note || '']);
    });
    (cycleData.intercourseLogs || []).forEach(l => {
        rows.push(['Intercourse', new Date(l.date).toLocaleDateString('en-NP'), l.protected ? 'Protected' : 'Unprotected', '', '', l.note || '']);
    });
    (cycleData.opkLogs || []).forEach(l => {
        rows.push(['Ovulation test', new Date(l.date).toLocaleDateString('en-NP'), l.result || '', '', '', l.note || '']);
    });
    (cycleData.mucusLogs || []).forEach(l => {
        rows.push(['Cervical mucus', new Date(l.date).toLocaleDateString('en-NP'), l.type || '', '', '', l.note || '']);
    });
    (cycleData.bbtLogs || []).forEach(l => {
        const unit = cycleData.bbtUnit || 'C';
        const t = (typeof _bbtToUnit === 'function') ? _bbtToUnit(l, unit) : l.temp;
        rows.push(['BBT', new Date(l.date).toLocaleDateString('en-NP'), t != null ? t.toFixed(2) + '°' + unit : '', l.time || '', '', l.note || '']);
    });
    (cycleData.medLogs || []).forEach(l => {
        const med = (cycleData.medList || []).find(m => m.id === l.medId);
        rows.push(['Medication', new Date(l.date).toLocaleDateString('en-NP'), med ? med.name : 'Removed item', med ? med.dose || '' : '', '', '']);
    });
    (cycleData.vitalsLogs || []).forEach(l => {
        rows.push(['Weight & water', new Date(l.date).toLocaleDateString('en-NP'), l.weight != null ? l.weight + (l.weightUnit || 'kg') : '', l.water != null ? l.water + 'L' : '', '', '']);
    });
    rows.push([]);
    rows.push(['Cycle length (avg days)', cycleData.cycleLength || 28]);
    rows.push(['Period length (avg days)', cycleData.periodLength || 5]);
    if (cycleData.lastPeriodStart)
        rows.push(['Last period start', new Date(cycleData.lastPeriodStart).toLocaleDateString('en-NP')]);
    const csv = rows.map(r => r.map(_csvEsc).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `vikram-cycle-data-${dateStamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (typeof vikramToast === 'function')
        vikramToast('📤 Cycle data exported');
}
// ══ CLINIC VISIT SUMMARY (in-app, read-only overview for a doctor's visit) ═══
function openClinicSummarySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    renderClinicSummarySheet();
    const sheet = document.getElementById('clinicSummarySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.add('open');
    if (ov)
        ov.classList.add('open');
}
function closeClinicSummarySheet() {
    if (typeof haptic === 'function')
        haptic('light');
    const sheet = document.getElementById('clinicSummarySheet');
    const ov = document.getElementById('ov');
    if (sheet)
        sheet.classList.remove('open');
    if (ov)
        ov.classList.remove('open');
}
function renderClinicSummarySheet() {
    const body = document.getElementById('clinicSummarySheetBody');
    if (!body)
        return;
    const logs = (cycleData.logs || []).filter(l => l.type === 'period_start').sort((a, b) => a.date - b.date);
    const cycles = [];
    for (let i = 1; i < logs.length; i++) {
        const len = Math.round((logs[i].date - logs[i - 1].date) / 86400000);
        if (len > 0 && len < 60)
            cycles.push({ len, startDate: logs[i - 1].date });
    }
    const recentCycles = cycles.slice(-6);
    const avgLen = recentCycles.length ? (recentCycles.reduce((a, c) => a + c.len, 0) / recentCycles.length) : null;
    const stdDev = recentCycles.length > 1 ? Math.sqrt(recentCycles.reduce((a, c) => a + Math.pow(c.len - avgLen, 2), 0) / recentCycles.length) : null;
    const sixMoAgo = new Date(TODAY.getFullYear(), TODAY.getMonth() - 6, TODAY.getDate()).getTime();
    const recentSymptoms = (cycleData.symptomLogs || []).filter(l => l.date >= sixMoAgo);
    const symptomCounts = {};
    recentSymptoms.forEach(l => (l.symptoms || []).forEach(sid => { symptomCounts[sid] = (symptomCounts[sid] || 0) + 1; }));
    const topSymptoms = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1]).slice(0, 6)
        .map(([sid, count]) => { const sm = (typeof SYMPTOM_META !== 'undefined') ? SYMPTOM_META[sid] : null; return { label: sm ? sm.label : sid, emoji: sm ? sm.emoji : '•', count }; });
    const recentBbt = (cycleData.bbtLogs || []).filter(l => l.date >= sixMoAgo);
    const recentOpk = (cycleData.opkLogs || []).filter(l => l.date >= sixMoAgo);
    const recentBd = (cycleData.intercourseLogs || []).filter(l => l.date >= sixMoAgo);
    const recentMucus = (cycleData.mucusLogs || []).filter(l => l.date >= sixMoAgo);
    const lastStart = cycleData.lastPeriodStart ? new Date(cycleData.lastPeriodStart).toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';
    body.innerHTML = `
  <div class="ssec" style="padding-top:4px;">
    <div style="font-size:11px;font-weight:700;color:var(--dsub);line-height:1.6;padding:0 0 4px;">Generated ${new Date().toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' })} · last 6 months of data</div>
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Cycle overview</div>
    <div class="srow"><div class="slbl">Tracking goal</div><div class="ssub" style="text-align:right;">${_cycleModeMeta(getCycleMode()).title.replace(/^[^\s]+\s/, '')}</div></div>
    <div class="srow"><div class="slbl">Last period start</div><div class="ssub" style="text-align:right;">${lastStart}</div></div>
    <div class="srow"><div class="slbl">Typical cycle length</div><div class="ssub" style="text-align:right;">${cycleData.cycleLength || 28} days</div></div>
    <div class="srow"><div class="slbl">Typical period length</div><div class="ssub" style="text-align:right;">${cycleData.periodLength || 5} days</div></div>
    <div class="srow" style="border-bottom:none;"><div class="slbl">Avg length (recent ${recentCycles.length || 0} cycles)</div><div class="ssub" style="text-align:right;">${avgLen != null ? avgLen.toFixed(1) + 'd ±' + stdDev.toFixed(1) + 'd' : 'Not enough data'}</div></div>
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Most common symptoms</div>
    ${topSymptoms.length ? topSymptoms.map(s => `
    <div class="srow"><div class="slbl">${s.emoji} ${esc(s.label)}</div><div class="ssub">${s.count}×</div></div>`).join('')
        : `<div style="padding:14px 4px;font-size:12px;font-weight:700;color:var(--dsub);">No symptoms logged in this period</div>`}
  </div>

  <div class="ssec" style="padding-top:0;">
    <div class="ssect">TTC activity (6 months)</div>
    <div class="srow"><div class="slbl">Intercourse entries</div><div class="ssub">${recentBd.length}</div></div>
    <div class="srow"><div class="slbl">Ovulation tests</div><div class="ssub">${recentOpk.length} · ${recentOpk.filter(l => l.result === 'pos').length} positive</div></div>
    <div class="srow"><div class="slbl">Cervical mucus entries</div><div class="ssub">${recentMucus.length}</div></div>
    <div class="srow" style="border-bottom:none;"><div class="slbl">BBT readings</div><div class="ssub">${recentBbt.length}</div></div>
  </div>

  ${cycleData.medList && cycleData.medList.length ? `
  <div class="ssec" style="padding-top:0;">
    <div class="ssect">Current medications &amp; supplements</div>
    ${cycleData.medList.map(m => `<div class="srow" style="border-bottom:none;"><div class="slbl">${esc(m.name)}</div>${m.dose ? `<div class="ssub">${esc(m.dose)}</div>` : ''}</div>`).join('')}
  </div>` : ''}

  <div style="padding:14px 16px 4px;font-size:10.5px;font-weight:700;color:var(--dsub);line-height:1.6;">This is a summary generated from your self-reported logs — it isn't a medical diagnosis. Bring this screen to your appointment, or use Export to download the full data as a CSV.</div>
  `;
    // Stash the data this render used so the PDF export can reuse it without recomputation
    window._clinicSummaryData = { lastStart, avgLen, stdDev, recentCycles, topSymptoms, recentBd, recentOpk, recentMucus, recentBbt };
}
function exportClinicSummaryPDF() {
    if (typeof haptic === 'function')
        haptic('light');
    const d = window._clinicSummaryData;
    if (!d) {
        if (typeof vikramToast === 'function')
            vikramToast('⚠️ Open the summary first');
        return;
    }
    const goalTitle = _cycleModeMeta(getCycleMode()).title.replace(/^[^\s]+\s/, '');
    const genDate = new Date().toLocaleDateString('en-NP', { month: 'long', day: 'numeric', year: 'numeric' });
    const area = document.getElementById('clinicPrintArea');
    if (!area)
        return;
    area.innerHTML = `
    <div class="cpa-h1">🩺 Clinic Visit Summary</div>
    <div class="cpa-meta">Generated ${genDate} · last 6 months of data</div>

    <div class="cpa-sect">Cycle overview</div>
    <div class="cpa-row"><span>Tracking goal</span><span>${esc(goalTitle)}</span></div>
    <div class="cpa-row"><span>Last period start</span><span>${esc(d.lastStart)}</span></div>
    <div class="cpa-row"><span>Typical cycle length</span><span>${cycleData.cycleLength || 28} days</span></div>
    <div class="cpa-row"><span>Typical period length</span><span>${cycleData.periodLength || 5} days</span></div>
    <div class="cpa-row"><span>Avg length (recent ${d.recentCycles.length || 0} cycles)</span><span>${d.avgLen != null ? d.avgLen.toFixed(1) + 'd ±' + d.stdDev.toFixed(1) + 'd' : 'Not enough data'}</span></div>

    <div class="cpa-sect">Most common symptoms</div>
    ${d.topSymptoms.length ? d.topSymptoms.map(s => `<div class="cpa-row"><span>${esc(s.emoji)} ${esc(s.label)}</span><span>${s.count}×</span></div>`).join('') : `<div class="cpa-row"><span>No symptoms logged in this period</span><span></span></div>`}

    <div class="cpa-sect">TTC / fertility activity (6 months)</div>
    <div class="cpa-row"><span>Intercourse entries</span><span>${d.recentBd.length}</span></div>
    <div class="cpa-row"><span>Ovulation tests</span><span>${d.recentOpk.length} · ${d.recentOpk.filter(l => l.result === 'pos').length} positive</span></div>
    <div class="cpa-row"><span>Cervical mucus entries</span><span>${d.recentMucus.length}</span></div>
    <div class="cpa-row"><span>BBT readings</span><span>${d.recentBbt.length}</span></div>

    ${cycleData.medList && cycleData.medList.length ? `
    <div class="cpa-sect">Current medications &amp; supplements</div>
    ${cycleData.medList.map(m => `<div class="cpa-row"><span>${esc(m.name)}</span><span>${m.dose ? esc(m.dose) : ''}</span></div>`).join('')}` : ''}

    ${cycleData.contraception ? `
    <div class="cpa-sect">Contraception</div>
    <div class="cpa-row"><span>Method</span><span>${esc((CONTRA_TYPES[cycleData.contraception.type] || CONTRA_TYPES.pill).label)}</span></div>` : ''}

    <div class="cpa-foot">This is a summary generated from self-reported logs in the Vikram app — it is not a medical diagnosis.</div>
  `;
    setTimeout(() => window.print(), 80);
}
let widgetTab = 'ios';
function switchWidgetTab(t) {
    widgetTab = t;
    document.getElementById('wTabiOS').classList.toggle('on', t === 'ios');
    document.getElementById('wTabDroid').classList.toggle('on', t === 'android');
    renderWidgetSteps();
}
const IOS_STEPS = [
    'Tap <b>Download Widget Image</b> — save it to your Photos.',
    'On your home screen, long-press any empty space and tap <b>+ Add Widget</b>.',
    'Search for <b>Photos</b>, choose the square widget size, tap <b>Add Widget</b>.',
    'Long-press the new widget → <b>Edit Widget</b> → select the Vikram calendar image.',
    'Tap anywhere to save. Your calendar widget is live! 🎉',
];
const AND_STEPS = [
    'Tap <b>Download Widget Image</b> — the image saves to your gallery.',
    'Long-press your home screen and tap <b>Widgets</b>.',
    'Search for <b>Photo Widget</b> (built-in on most launchers) or install <b>KWGT</b> from Play Store.',
    'Add the widget, tap it to edit, and select the Vikram calendar image from gallery.',
    'Resize the widget to fill the desired space. Done! 🎉',
];
function renderWidgetSteps() {
    const el = document.getElementById('widgetSteps');
    if (!el)
        return;
    const steps = widgetTab === 'ios' ? IOS_STEPS : AND_STEPS;
    el.innerHTML = steps.map((s, i) => `
    <div class="widget-step">
      <div class="ws-num">${i + 1}</div>
      <div>${s}</div>
    </div>`).join('');
}
// ── Canvas rendering ────────────────────────────────────────────────────────
function _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}
function _renderCalendarToCanvas(canvas, PX) {
    const LW = 360, LH = 400; // logical pixels
    canvas.width = LW * PX;
    canvas.height = LH * PX;
    const ctx = canvas.getContext('2d');
    ctx.scale(PX, PX);
    const isDark = dark;
    const BG = isDark ? '#1a1a2e' : '#ECEEF8';
    const CARD = isDark ? '#1e1e38' : '#ffffff';
    const TEXT = isDark ? '#d0d2ee' : '#2d2d44';
    const SUB = isDark ? '#4a4c6a' : '#adb0be';
    const DIM = isDark ? '#3a3c58' : '#c8c9d4';
    const WKND = isDark ? '#ff7070' : '#e03e3e';
    const HOLC = isDark ? '#ff7070' : '#e03e3e';
    const EVTC = '#3B82F6';
    // Outer background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, LW, LH);
    // White card
    ctx.fillStyle = CARD;
    _roundRect(ctx, 10, 10, LW - 20, LH - 20, 20);
    ctx.fill();
    // Header gradient
    const hGrad = ctx.createLinearGradient(10, 10, LW - 10, 66);
    hGrad.addColorStop(0, '#1a1a1a');
    hGrad.addColorStop(1, '#000000');
    ctx.fillStyle = hGrad;
    _roundRect(ctx, 10, 10, LW - 20, 56, 18);
    ctx.fill();
    // Round bottom corners of header separately (flat bottom)
    ctx.fillRect(10, 40, LW - 20, 26);
    // Month + year in header
    const mName = lang === 'ne' ? MNE[vM - 1] : MEN[vM - 1];
    ctx.fillStyle = '#fff';
    ctx.font = `900 17px Nunito,Arial,sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${mName}  ${vY}`, LW / 2, 38);
    // Day-of-week headers
    const dayLabels = lang === 'ne' ? DNE.map(d => d.slice(0, 2)) : DEN.map(d => d[0]);
    const colW = (LW - 24) / 7;
    const startX = 12;
    ctx.font = `700 10px Arial,sans-serif`;
    ctx.fillStyle = SUB;
    dayLabels.forEach((d, i) => {
        const isWkEnd = i === 0 || i === 6;
        ctx.fillStyle = isWkEnd ? WKND : SUB;
        ctx.fillText(d, startX + colW * i + colW / 2, 82);
    });
    // Grid
    const sAD = bsStart(vY, vM);
    const sDow = (sAD.getDay() - cfg.fd + 7) % 7;
    const dims = BS[vY]?.[vM - 1] ?? 30;
    const pM = vM === 1 ? 12 : vM - 1, pY = vM === 1 ? vY - 1 : vY;
    const pDims = BS[pY]?.[pM - 1] ?? 30;
    const nM = vM === 12 ? 1 : vM + 1, nY = vM === 12 ? vY + 1 : vY;
    let tot = sDow + dims;
    if (tot % 7 !== 0)
        tot += 7 - tot % 7;
    const rowH = (LH - 100) / Math.min(6, Math.ceil(tot / 7));
    const gridTop = 94;
    const ROWS = Math.min(6, Math.ceil(tot / 7));
    for (let i = 0; i < Math.min(tot, ROWS * 7); i++) {
        const col = (cfg.fd + (i % 7)) % 7;
        const row = Math.floor(i / 7);
        const wk = col === 0 || col === 6;
        const cx = startX + ((i % 7) + 0.5) * colW;
        const cy = gridTop + row * rowH + rowH / 2;
        if (i < sDow) {
            const nd = pDims - sDow + i + 1;
            ctx.fillStyle = DIM;
            ctx.font = `600 13px Arial,sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(ns(nd), cx, cy - 3);
        }
        else if (i >= sDow + dims) {
            const nd = i - sDow - dims + 1;
            ctx.fillStyle = DIM;
            ctx.font = `600 13px Arial,sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(ns(nd), cx, cy - 3);
        }
        else {
            const nd = i - sDow + 1;
            const adD = new Date(sAD);
            adD.setDate(adD.getDate() + nd - 1);
            const isT = vY === TODAYBS.y && vM === TODAYBS.m && nd === TODAYBS.d;
            const isH = cfg.hol && !!HOL[`${vY}-${vM}-${nd}`];
            const evtCount = userEvents.filter(ev => eventMatchesDate(ev, vY, vM, nd)).length;
            if (isT) {
                // Purple pill for today
                ctx.fillStyle = '#000000';
                _roundRect(ctx, cx - colW * 0.36, cy - rowH * 0.38, colW * 0.72, rowH * 0.76, 10);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = `900 14px Arial,sans-serif`;
            }
            else {
                ctx.fillStyle = isH ? HOLC : wk ? WKND : TEXT;
                ctx.font = `700 13px Arial,sans-serif`;
            }
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(ns(nd), cx, cy - 3);
            // Sub (AD date)
            if (cfg.greg && !isT) {
                ctx.fillStyle = SUB;
                ctx.font = `500 8px Arial,sans-serif`;
                ctx.fillText(adD.getDate(), cx, cy + 8);
            }
            // Dots
            const dotY = cy + rowH * 0.35;
            if (isH) {
                ctx.fillStyle = isT ? 'rgba(255,255,255,.88)' : HOLC;
                ctx.beginPath();
                ctx.arc(cx - (evtCount ? Math.max((evtCount - 1) * 2, 3) : 0), dotY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            if (evtCount) {
                const gap = 5;
                const startX = cx - ((evtCount - 1) * gap) / 2;
                for (let j = 0; j < evtCount; j++) {
                    ctx.fillStyle = isT ? 'rgba(255,255,255,.88)' : EVTC;
                    ctx.beginPath();
                    ctx.arc(startX + j * gap, dotY, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
    // Footer
    ctx.fillStyle = SUB;
    ctx.font = `600 9px Arial,sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Vikram', LW / 2, LH - 14);
}
function renderWidgetThumb() {
    const c = document.getElementById('widgetThumb');
    if (!c)
        return;
    _renderCalendarToCanvas(c, 1);
}
function downloadWidget() {
    const c = document.createElement('canvas');
    _renderCalendarToCanvas(c, 3); // 3× = ~1080px, crisp on all phones
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `vikram-widget-${MEN[vM - 1]}-${vY}.png`;
    a.click();
}
// ══ INIT ══
// Restore persisted theme (Auto Theme, when on, already set `dark` correctly above)
if (!autoTheme) {
    const savedTheme = localStorage.getItem('vikram_theme');
    if (savedTheme === 'dark')
        dark = true;
    else if (savedTheme === 'light')
        dark = false;
}
applyTheme();
// Auto Theme: sync the settings toggle and start the periodic sunrise/sunset recheck
(function initAutoTheme() {
    const tg = document.getElementById('tgAutoTheme');
    if (tg)
        tg.classList.toggle('on', autoTheme);
    if (autoTheme && !_autoThemeTimer) {
        applyAutoThemeNow();
        _autoThemeTimer = setInterval(applyAutoThemeNow, 300000);
    }
})();
// Restore persisted language
const savedLang = localStorage.getItem('vikram_lang');
if (savedLang === 'ne')
    setLang('ne');
// Sync settings toggle buttons to loaded cfg state
(function syncCfgButtons() {
    const map = { greg: 'tgG', hol: 'tgH', holn: 'tgHN', compact: 'tgCompact', hlwknd: 'tgHlwknd' };
    Object.entries(map).forEach(([k, id]) => {
        const el = document.getElementById(id);
        if (el)
            el.classList.toggle('on', !!cfg[k]);
    });
    // Sync first-day-of-week chip buttons
    document.querySelectorAll('.sv-fdow .sv-chip').forEach(btn => {
        const v = parseInt(btn.getAttribute('onclick').match(/setFD\((\d+)/)?.[1] ?? '-1', 10);
        btn.classList.toggle('on', v === cfg.fd);
    });
})();
render();
updateDayOpts();
const _ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
_ric(() => {
    renderUpcoming();
    renderSelectedDay();
    updateNotifCard();
    updateNotifBadges();
    checkIncomingSharedProfile();
});
setTimeout(checkEventReminders, 2500);
setTimeout(checkCycleReminders, 2700);
// Re-check every 60 seconds so 30-min and 2-hr triggers are caught within the 2-min window
setInterval(checkEventReminders, 60000);
setInterval(checkCycleReminders, 60000);
setInterval(checkTaskReminders, 60000);
setInterval(function () { if (typeof checkHabitReminders === 'function')
    checkHabitReminders(); }, 60000);
// ══ PWA — INSTALL BANNER ══
(function () {
    if (location.protocol === 'file:')
        return;
    // 1. Inject manifest as blob so Chrome recognises this page as installable
    const icons = [];
    [192, 512].forEach(sz => {
        const c = document.createElement('canvas');
        c.width = c.height = sz;
        const ctx = c.getContext('2d');
        // Solid black rounded background
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.roundRect(0, 0, sz, sz, sz * 0.22);
        ctx.fill();
        // White bold "29" centered
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `900 ${sz * 0.42}px Arial Black,Arial,sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('29', sz / 2, sz / 2);
        icons.push({ src: c.toDataURL('image/png'), sizes: `${sz}x${sz}`, type: 'image/png' });
    });
    const manifest = {
        name: 'Vikram',
        short_name: 'Vikram',
        description: 'Beautiful Nepali Patro BS 2083–2084',
        version: '2.4.0',
        start_url: location.href,
        display: 'standalone',
        orientation: 'portrait',
        background_color: dark ? '#0d0f16' : '#ECEEF8',
        theme_color: dark ? '#0d0f16' : '#ECEEF8',
        icons,
        shortcuts: [
            { name: 'Add Event', short_name: 'Add Event', description: 'Quickly add a new event for today',
                url: location.pathname + '?action=addEvent' },
            { name: 'Log Period', short_name: 'Log Period', description: 'Log today in your cycle tracker',
                url: location.pathname + '?action=logPeriod' },
            { name: 'Start Focus Timer', short_name: 'Focus Timer', description: 'Start a Pomodoro focus session',
                url: location.pathname + '?action=pomodoro' }
        ]
    };
    const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    document.getElementById('pwaManifest').href = URL.createObjectURL(blob);
    // 2. Service worker was already registered as early as possible at the top
    // of <body> (window.vikramRegisterSW). Calling it again here is a cheap,
    // safe no-op if it already succeeded, and a useful retry if the very first
    // attempt happened to run before the connection was ready.
    if (location.protocol !== 'file:' && 'serviceWorker' in navigator && typeof window.vikramRegisterSW === 'function') {
        window.vikramRegisterSW();
    }
    // 3. Detect environment
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
    window._vikramDeferredPrompt = null;
    let deferredPrompt = null;
    // Capture Chrome's native install prompt for svInstallApp to use
    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        deferredPrompt = e;
        window._vikramDeferredPrompt = e;
    });
    // Stub helpers so any remaining references don't throw
    window.dismissBanner = function () { };
    window.setBannerContent = function () { };
    window.triggerInstall = function () {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(r => {
                if (r.outcome === 'accepted')
                    try {
                        localStorage.setItem('vikram_installed', '1');
                    }
                    catch (e) { }
                deferredPrompt = null;
                window._vikramDeferredPrompt = null;
            });
        }
    };
})();
// ── Service Worker self-heal ───────────────────────────────────────────────
// If the blob-URL SW was lost (page closed + reopened, or evicted by the
// browser), re-register it immediately rather than waiting to find out.
(function () {
    if (location.protocol === 'file:' || !('serviceWorker' in navigator))
        return;
    navigator.serviceWorker.getRegistration('./').then(function (reg) {
        if (!reg && typeof window.vikramRegisterSW === 'function') {
            window.vikramRegisterSW();
        }
    }).catch(function () { });
})();
// ── localStorage health check ──────────────────────────────────────────────
// Run once at startup: if storage is >90% full, proactively prune disposables
(function () {
    try {
        let used = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            used += (localStorage.getItem(k) || '').length + k.length;
        }
        // ~5 MB typical limit; warn at 4.5 MB
        if (used > 4500000) {
            const disposable = ['vikram_sw_blob', 'vikram_pomo_stats', 'vikram_pomo_todos'];
            disposable.forEach(k => { try {
                localStorage.removeItem(k);
            }
            catch (e) { } });
        }
    }
    catch (e) { }
})();
(function () {
    const CM_COLORS = [
        { name: 'Red', hex: '#E63946' }, { name: 'Coral', hex: '#FF6B6B' }, { name: 'Orange', hex: '#FF8C42' },
        { name: 'Amber', hex: '#FFB703' }, { name: 'Yellow', hex: '#FFD60A' }, { name: 'Lime', hex: '#70E000' },
        { name: 'Green', hex: '#2DC653' }, { name: 'Teal', hex: '#00B4D8' }, { name: 'Sky', hex: '#48CAE4' },
        { name: 'Blue', hex: '#3A86FF' }, { name: 'Indigo', hex: '#4361EE' }, { name: 'Violet', hex: '#7209B7' },
        { name: 'Purple', hex: '#9D4EDD' }, { name: 'Pink', hex: '#F72585' }, { name: 'Rose', hex: '#FF4D6D' },
        { name: 'Crimson', hex: '#C1121F' }, { name: 'Mint', hex: '#06D6A0' }, { name: 'Lavender', hex: '#B388FF' },
        { name: 'Peach', hex: '#FFAD69' }, { name: 'Cyan', hex: '#00F5FF' },
    ];
    function cmIsLight(hex) {
        const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.58;
    }
    window.cmState = { score: 0, timeLeft: 60, streak: 0, bestStreak: 0, totalCorrect: 0, target: null, options: [], locked: false, running: false, timerInterval: null, lastAnswerTime: 0, optionCount: 6 };
    window.cmStopGame = function () {
        clearInterval(window.cmState.timerInterval);
        window.cmState.running = false;
    };
    window.renderColorMatcherSheet = function () {
        const body = document.getElementById('cmBody');
        if (!body)
            return;
        // Build fonts link if not present
        if (!document.getElementById('cmFonts')) {
            const lk = document.createElement('link');
            lk.id = 'cmFonts';
            lk.rel = 'stylesheet';
            lk.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap';
            document.head.appendChild(lk);
        }
        body.innerHTML = `
    <div class="cm-wrap">
      <div class="cm-combo" id="cm-combo">🔥 COMBO!</div>
      <!-- HUD -->
      <div class="cm-hud">
        <div class="cm-hud-item"><span class="cm-hud-label">Score</span><span class="cm-hud-value" id="cm-score">0</span></div>
        <div class="cm-hud-div"></div>
        <div class="cm-hud-item"><span class="cm-hud-label">Time</span><span class="cm-hud-value" id="cm-timer">60</span></div>
        <div class="cm-hud-div"></div>
        <div class="cm-hud-item"><span class="cm-hud-label">Streak</span><span class="cm-hud-value" id="cm-streak">0</span></div>
      </div>
      <!-- Target -->
      <div class="cm-target-wrap">
        <div class="cm-target-ring" id="cm-ring">
          <div class="cm-target-circle" id="cm-circle">
            <span class="cm-target-name" id="cm-tname">?</span>
            <span class="cm-target-sub">MATCH THIS</span>
          </div>
        </div>
        <div class="cm-target-prompt" id="cm-prompt">— tap start to play —</div>
      </div>
      <!-- Swatches -->
      <div class="cm-grid" id="cm-grid"></div>
      <!-- Overlay -->
      <div class="cm-overlay" id="cm-overlay">
        <div class="cm-overlay-card">
          <div class="cm-overlay-title" id="cm-ov-title">COLOR<br>MATCH</div>
          <div class="cm-overlay-sub" id="cm-ov-sub">React · Match · Score</div>
          <div class="cm-start-tags" id="cm-ov-tags">
            <span class="cm-tag">60 seconds</span><span class="cm-tag">streak bonus</span>
            <span class="cm-tag">quick tap +5</span><span class="cm-tag">combo ×2</span>
          </div>
          <div class="cm-stats" id="cm-ov-stats" style="display:none">
            <div class="cm-stat"><div class="cm-stat-val" id="cm-final-score">0</div><div class="cm-stat-lbl">Score</div></div>
            <div class="cm-stat"><div class="cm-stat-val" id="cm-final-correct">0</div><div class="cm-stat-lbl">Correct</div></div>
            <div class="cm-stat"><div class="cm-stat-val" id="cm-final-streak">0</div><div class="cm-stat-lbl">Best Streak</div></div>
          </div>
          <button class="cm-btn" id="cm-start-btn">START GAME</button>
        </div>
      </div>
    </div>`;
        // Re-init state
        const s = window.cmState;
        clearInterval(s.timerInterval);
        s.running = false;
        s.score = 0;
        s.timeLeft = 60;
        s.streak = 0;
        s.bestStreak = 0;
        s.totalCorrect = 0;
        s.locked = false;
        s.optionCount = 6;
        document.getElementById('cm-start-btn').addEventListener('click', cmStartGame);
    };
    function cmGet(id) { return document.getElementById(id); }
    function cmStartGame() {
        const s = window.cmState;
        s.score = 0;
        s.timeLeft = 60;
        s.streak = 0;
        s.bestStreak = 0;
        s.totalCorrect = 0;
        s.locked = false;
        s.running = true;
        s.optionCount = 6;
        cmUpdateHUD();
        const ov = cmGet('cm-overlay');
        if (ov)
            ov.classList.add('hidden');
        const ring = cmGet('cm-ring');
        if (ring)
            ring.classList.add('active');
        const prompt = cmGet('cm-prompt');
        if (prompt)
            prompt.textContent = '— pick the matching color —';
        // reset overlay tags/stats for fresh start
        const tags = cmGet('cm-ov-tags');
        if (tags)
            tags.style.display = 'flex';
        const stats = cmGet('cm-ov-stats');
        if (stats)
            stats.style.display = 'none';
        cmNextRound();
        clearInterval(s.timerInterval);
        s.timerInterval = setInterval(() => {
            s.timeLeft--;
            const t = cmGet('cm-timer');
            if (t) {
                t.textContent = s.timeLeft;
                t.classList.toggle('warning', s.timeLeft <= 10);
            }
            if (s.timeLeft <= 0)
                cmEndGame();
        }, 1000);
    }
    function cmNextRound() {
        const s = window.cmState;
        if (!s.running)
            return;
        const shuffled = [...CM_COLORS].sort(() => Math.random() - .5);
        s.target = shuffled[0];
        s.options = [s.target, ...shuffled.slice(1, s.optionCount)].sort(() => Math.random() - .5);
        cmRenderTarget();
        cmRenderSwatches();
        s.lastAnswerTime = Date.now();
    }
    function cmRenderTarget() {
        const s = window.cmState;
        const circle = cmGet('cm-circle');
        const name = cmGet('cm-tname');
        if (!circle || !name)
            return;
        circle.style.background = s.target.hex;
        name.textContent = s.target.name.toUpperCase();
        circle.classList.toggle('light-bg', cmIsLight(s.target.hex));
        circle.style.boxShadow = `0 0 36px 6px ${s.target.hex}44,inset 0 -8px 24px rgba(0,0,0,.35),inset 0 4px 12px rgba(255,255,255,.12)`;
    }
    function cmRenderSwatches() {
        const s = window.cmState;
        const grid = cmGet('cm-grid');
        if (!grid)
            return;
        grid.innerHTML = '';
        s.options.forEach(color => {
            const btn = document.createElement('button');
            btn.className = 'cm-swatch';
            btn.style.background = color.hex;
            const sp = document.createElement('span');
            sp.className = 'cm-swatch-name' + (cmIsLight(color.hex) ? ' dark' : '');
            sp.textContent = color.name.toUpperCase();
            btn.appendChild(sp);
            btn.addEventListener('click', () => cmHandleClick(color, btn));
            grid.appendChild(btn);
        });
    }
    function cmHandleClick(color, btn) {
        const s = window.cmState;
        if (s.locked || !s.running)
            return;
        const timeTaken = (Date.now() - s.lastAnswerTime) / 1000;
        const quick = timeTaken < 1.0;
        if (color.name === s.target.name) {
            let earned = 10;
            if (quick)
                earned += 5;
            s.streak++;
            s.totalCorrect++;
            if (s.streak > s.bestStreak)
                s.bestStreak = s.streak;
            if (s.streak % 5 === 0) {
                earned += 25;
                cmShowCombo(`🔥 ${s.streak}× STREAK +25`);
            }
            s.score = Math.max(0, s.score + earned);
            cmUpdateHUD();
            cmScorePop(btn, `+${earned}`, true);
            btn.classList.add('cm-flash-ok');
            const circle = cmGet('cm-circle');
            if (circle) {
                circle.classList.add('cm-correct');
                setTimeout(() => { circle.classList.remove('cm-correct'); }, 400);
            }
            setTimeout(() => btn.classList.remove('cm-flash-ok'), 400);
            const scoreEl = cmGet('cm-score');
            if (scoreEl) {
                scoreEl.style.transform = 'scale(1.35)';
                setTimeout(() => scoreEl.style.transform = '', 250);
            }
            if (s.score >= 200 && s.optionCount > 4)
                s.optionCount = 4;
            else if (s.score >= 100 && s.optionCount > 5)
                s.optionCount = 5;
            setTimeout(cmNextRound, 80);
        }
        else {
            s.locked = true;
            s.streak = 0;
            s.score = Math.max(0, s.score - 5);
            cmUpdateHUD();
            cmScorePop(btn, '-5', false);
            btn.classList.add('cm-flash-no');
            const circle = cmGet('cm-circle');
            if (circle) {
                circle.classList.add('cm-wrong');
                setTimeout(() => { circle.classList.remove('cm-wrong'); }, 450);
            }
            setTimeout(() => { btn.classList.remove('cm-flash-no'); s.locked = false; }, 450);
        }
    }
    function cmUpdateHUD() {
        const s = window.cmState;
        const sc = cmGet('cm-score');
        if (sc)
            sc.textContent = s.score;
        const st = cmGet('cm-streak');
        if (st)
            st.textContent = s.streak;
    }
    function cmScorePop(btn, text, pos) {
        const rect = btn.getBoundingClientRect();
        const pop = document.createElement('div');
        pop.className = 'cm-score-pop ' + (pos ? 'pos' : 'neg');
        pop.textContent = text;
        pop.style.left = (rect.left + rect.width / 2 - 16) + 'px';
        pop.style.top = (rect.top - 8) + 'px';
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 950);
    }
    let cmComboTimer;
    function cmShowCombo(msg) {
        const el = cmGet('cm-combo');
        if (!el)
            return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(cmComboTimer);
        cmComboTimer = setTimeout(() => el.classList.remove('show'), 2000);
    }
    function cmEndGame() {
        const s = window.cmState;
        s.running = false;
        clearInterval(s.timerInterval);
        const timer = cmGet('cm-timer');
        if (timer)
            timer.classList.remove('warning');
        const ring = cmGet('cm-ring');
        if (ring)
            ring.classList.remove('active');
        cmGet('cm-grid')?.querySelectorAll('button').forEach(b => b.disabled = true);
        if (s.score > 0)
            cmConfetti();
        setTimeout(() => {
            const title = cmGet('cm-ov-title');
            const sub = cmGet('cm-ov-sub');
            const tags = cmGet('cm-ov-tags');
            const stats = cmGet('cm-ov-stats');
            const btn = cmGet('cm-start-btn');
            const ov = cmGet('cm-overlay');
            if (title)
                title.textContent = s.score >= 150 ? 'LEGENDARY' : s.score >= 80 ? 'GREAT JOB' : 'GAME OVER';
            if (sub)
                sub.textContent = s.score >= 150 ? 'You are a color master!' : s.score >= 80 ? 'Solid performance!' : 'Better luck next time';
            if (tags)
                tags.style.display = 'none';
            if (stats) {
                stats.style.display = 'flex';
                const fs = cmGet('cm-final-score');
                const fc = cmGet('cm-final-correct');
                const fst = cmGet('cm-final-streak');
                if (fs)
                    fs.textContent = s.score;
                if (fc)
                    fc.textContent = s.totalCorrect;
                if (fst)
                    fst.textContent = s.bestStreak;
            }
            if (btn)
                btn.textContent = 'PLAY AGAIN';
            if (ov)
                ov.classList.remove('hidden');
        }, 400);
    }
    function cmConfetti() {
        const colors = ['#FFD60A', '#3A86FF', '#F72585', '#06D6A0', '#FF8C42', '#B388FF'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const p = document.createElement('div');
                const x = Math.random() * window.innerWidth;
                const dx = (Math.random() - .5) * 180;
                const dur = 1.5 + Math.random() * 1.8;
                const sz = 6 + Math.random() * 7;
                p.style.cssText = `position:fixed;left:${x}px;top:-10px;width:${sz}px;height:${sz}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > .5 ? '50%' : '2px'};pointer-events:none;z-index:9999;animation:cm-confetti ${dur}s ease-in forwards;--dx:${dx}px;`;
                document.body.appendChild(p);
                setTimeout(() => p.remove(), dur * 1000 + 100);
            }, i * 36);
        }
    }
    // Inject confetti keyframe if not already added
    if (!document.getElementById('cm-confetti-kf')) {
        const st = document.createElement('style');
        st.id = 'cm-confetti-kf';
        st.textContent = '@keyframes cm-confetti{0%{transform:translateY(0) rotate(0) translateX(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg) translateX(var(--dx));opacity:0}}';
        document.head.appendChild(st);
    }
})();
(function () {
    const ECHO_STORAGE_KEY = 'vikram_echo_sealed';
    window.renderEchoSheet = function (targetEl) {
        const body = targetEl || document.getElementById('echoBody');
        if (!body)
            return;
        // Load Cormorant Garamond font if not already injected
        if (!document.getElementById('echoFonts')) {
            const lk = document.createElement('link');
            lk.id = 'echoFonts';
            lk.rel = 'stylesheet';
            lk.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap';
            document.head.appendChild(lk);
        }
        body.innerHTML = '';
        let sealed = null;
        try {
            sealed = JSON.parse(localStorage.getItem(ECHO_STORAGE_KEY));
        }
        catch { }
        const wrap = document.createElement('div');
        wrap.className = 'echo-wrap';
        const inner = document.createElement('div');
        inner.className = 'echo-inner';
        wrap.appendChild(inner);
        body.appendChild(wrap);
        if (sealed) {
            renderEchoSealed(inner, sealed);
        }
        else {
            renderEchoIntro(inner);
        }
    };
    function echoMirrorSVG(size, glow) {
        return `<div class="echo-icon${glow ? ' glow' : ''}" style="margin-bottom:1.4rem;">
    <svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="22" rx="12" ry="16" stroke="#c8923a" stroke-width="1.5" fill="none" opacity="0.9"/>
      <line x1="24" y1="38" x2="24" y2="44" stroke="#c8923a" stroke-width="1.5" opacity="0.7"/>
      <line x1="18" y1="44" x2="30" y2="44" stroke="#c8923a" stroke-width="1.5" opacity="0.7"/>
      <ellipse cx="24" cy="22" rx="8" ry="11" stroke="#c8923a" stroke-width="0.5" fill="none" opacity="0.3"/>
    </svg></div>`;
    }
    function renderEchoIntro(container) {
        container.innerHTML = `
    <div class="echo-phase">
      ${echoMirrorSVG(54, true)}
      <h1 class="echo-h1">ECHO</h1>
      <p class="echo-sub">Speak once. Listen later.</p>
      <p class="echo-desc">This app works exactly once.<br>One question. One answer. One moment.<br>Then it seals — forever.</p>
      <button class="echo-btn" id="echoBeginBtn">I understand</button>
      <p class="echo-btn-note">There is no going back</p>
    </div>`;
        setTimeout(() => {
            document.getElementById('echoBeginBtn')?.addEventListener('click', () => renderEchoQuestion(container));
        }, 0);
    }
    function renderEchoQuestion(container) {
        const question = "What do you want to remind your future self about right now?";
        container.innerHTML = `
    <div class="echo-phase" style="align-items:flex-start;text-align:left;width:100%;">
      <p class="echo-qlabel">The question</p>
      <h2 class="echo-question" id="echoQText" style="width:100%;"></h2>
      <div id="echoInputWrap" style="display:none;flex-direction:column;width:100%;">
        <textarea class="echo-textarea" id="echoTextarea" placeholder="Write honestly. No one will read this except you — years from now." maxlength="280"></textarea>
        <span class="echo-count" id="echoCount">0 / 280</span>
        <button class="echo-btn" id="echoNextBtn" style="display:none;margin-top:1.1rem;">This is my answer →</button>
      </div>
    </div>`;
        let i = 0;
        const qEl = document.getElementById('echoQText');
        const ta = document.getElementById('echoTextarea');
        const cnt = document.getElementById('echoCount');
        const btn = document.getElementById('echoNextBtn');
        ta?.addEventListener('input', () => {
            const l = ta.value.length;
            if (cnt) {
                cnt.textContent = `${l} / 280`;
                cnt.className = 'echo-count' + (l > 238 ? ' warn' : '');
            }
            if (btn)
                btn.style.display = l > 20 ? 'block' : 'none';
        });
        btn?.addEventListener('click', () => { const a = ta?.value?.trim(); if (a)
            renderEchoTrigger(container, a); });
        const iv = setInterval(() => {
            i++;
            if (qEl)
                qEl.textContent = question.slice(0, i);
            if (i >= question.length) {
                clearInterval(iv);
                const w = document.getElementById('echoInputWrap');
                if (w) {
                    w.style.display = 'flex';
                    w.style.flexDirection = 'column';
                }
                setTimeout(() => ta?.focus(), 320);
            }
        }, 32);
    }
    function renderEchoTrigger(container, answer) {
        container.innerHTML = `
    <div class="echo-phase" style="align-items:flex-start;text-align:left;width:100%;">
      <p class="echo-qlabel">Step 2 of 2</p>
      <h2 class="echo-question" style="margin-bottom:1.4rem;">When should your echo return to you?</h2>
      <div style="display:flex;flex-direction:column;gap:.45rem;width:100%;">
        <button class="echo-trigger-btn" data-type="date"><span class="echo-trigger-icon">◈</span><span><span class="echo-trigger-label">On a date</span><span class="echo-trigger-desc">A specific day in the future</span></span></button>
      </div>
      <div id="echoTriggerInput" style="width:100%;margin-top:.9rem;"></div>
      <div id="echoSealPreview" style="width:100%;margin-top:.9rem;display:none;">
        <div class="echo-preview-box"><p class="echo-preview-lbl">Your echo will return</p><p class="echo-preview-val" id="echoPreviewVal"></p></div>
        <button class="echo-btn" id="echoSealBtn">Seal &amp; send to the future →</button>
      </div>
    </div>`;
        let triggerType = null, dateVal = '';
        function updatePreview() {
            const pr = document.getElementById('echoSealPreview');
            const pv = document.getElementById('echoPreviewVal');
            let can = false, desc = '';
            if (triggerType === 'date' && dateVal) {
                can = true;
                desc = `on ${new Date(dateVal + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
            }
            if (pr)
                pr.style.display = can ? 'block' : 'none';
            if (pv)
                pv.textContent = desc;
        }
        function renderTriggerInput() {
            const box = document.getElementById('echoTriggerInput');
            if (!box)
                return;
            if (triggerType === 'date') {
                const min = new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0];
                box.innerHTML = `<input type="date" class="echo-date-input" id="echoDateIn" min="${min}" value="${dateVal}">`;
                document.getElementById('echoDateIn')?.addEventListener('change', e => { dateVal = e.target.value; updatePreview(); });
            }
            else {
                box.innerHTML = '';
            }
            updatePreview();
        }
        container.querySelectorAll('.echo-trigger-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                triggerType = btn.dataset.type;
                container.querySelectorAll('.echo-trigger-btn').forEach(b => b.classList.toggle('on', b === btn));
                renderTriggerInput();
            });
        });
        // Attach seal button (it may not exist yet; use event delegation via container)
        container.addEventListener('click', function onSeal(e) {
            if (e.target.id === 'echoSealBtn') {
                container.removeEventListener('click', onSeal);
                const data = { answer, triggerType, trigger: { date: dateVal }, sealedAt: new Date().toISOString() };
                try {
                    localStorage.setItem(ECHO_STORAGE_KEY, JSON.stringify(data));
                }
                catch { }
                renderEchoSealing(container, data);
            }
        });
    }
    function renderEchoSealing(container, data) {
        const steps = ["Encrypting your words…", "Locking the seal…", "Hiding the key…", "Setting the watch…", "Done."];
        container.innerHTML = `
    <div class="echo-phase" style="gap:1.4rem;">
      ${echoMirrorSVG(46, true)}
      <div style="display:flex;flex-direction:column;gap:.35rem;">
        ${steps.map((s, i) => `<p class="echo-sealing-step">${s}</p>`).join('')}
      </div>
    </div>`;
        const els = container.querySelectorAll('.echo-sealing-step');
        let i = 0;
        if (els[0])
            els[0].className = 'echo-sealing-step active';
        const iv = setInterval(() => {
            if (els[i])
                els[i].className = 'echo-sealing-step done';
            i++;
            if (i < els.length) {
                if (els[i])
                    els[i].className = 'echo-sealing-step active';
            }
            if (i >= steps.length) {
                clearInterval(iv);
                setTimeout(() => renderEchoSealed(container, data), 1050);
            }
        }, 680);
    }
    function renderEchoSealed(container, data) {
        function getTriggerText() {
            if (data.triggerType === 'date')
                return `on ${new Date(data.trigger.date + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
            if (data.triggerType === 'age')
                return `when you turn ${data.trigger.age}`;
            if (data.triggerType === 'event')
                return esc(data.trigger.event.toLowerCase());
            return 'at the moment you set';
        }
        const safeAnswer = esc(data.answer || '');
        container.innerHTML = `
    <div class="echo-phase">
      ${echoMirrorSVG(44, false)}
      <h2 class="echo-sealed-h">Sealed.</h2>
      <p class="echo-sealed-sub">Your echo is resting.<br>It will find you ${getTriggerText()}.</p>
      <div class="echo-sealed-box">
        <p class="echo-sealed-lbl">What you wrote</p>
        <p class="echo-sealed-text">${safeAnswer}</p>
        <p class="echo-sealed-note">Hidden until delivery</p>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:.3rem;margin-top:1.4rem;">
        <p class="echo-closed-lbl">This echo is sealed.</p>
      </div>
    </div>`;
    }
})();
// ══ POMODORO FOCUS TIMER ══════════════════════════════════════════════════
(function () {
    const POMO_KEY = 'vikram_pomo';
    const POMO_TODOS_KEY = 'vikram_pomo_todos';
    const POMO_STATS_KEY = 'vikram_pomo_stats';
    // ── State ──────────────────────────────────────────────────────────────────
    window.pomoState = {
        running: false,
        phase: 'focus', // 'focus' | 'break' | 'longbreak'
        secondsLeft: 25 * 60,
        sessionsDone: 0, // sessions completed this run
        interval: null,
        workMins: 25,
        breakMins: 5,
        longBreakMins: 15,
        longBreakEvery: 4,
        totalFocusToday: 0,
        totalBreaksToday: 0,
        totalMinutesToday: 0,
    };
    // ── Persistence helpers ────────────────────────────────────────────────────
    function pomoLoadStats() {
        try {
            const d = JSON.parse(localStorage.getItem(POMO_STATS_KEY) || '{}');
            const today = new Date().toDateString();
            if (d.date !== today) {
                return { date: today, sessions: 0, breakCount: 0, minutes: 0, dotLog: [] };
            }
            return d;
        }
        catch (e) {
            return { date: new Date().toDateString(), sessions: 0, breakCount: 0, minutes: 0, dotLog: [] };
        }
    }
    function pomoSaveStats(stats) { try {
        localStorage.setItem(POMO_STATS_KEY, JSON.stringify(stats));
    }
    catch (e) { } }
    function pomoLoadSettings() {
        try {
            const d = JSON.parse(localStorage.getItem(POMO_KEY) || '{}');
            if (d.workMins)
                window.pomoState.workMins = d.workMins;
            if (d.breakMins)
                window.pomoState.breakMins = d.breakMins;
            if (d.longBreakMins)
                window.pomoState.longBreakMins = d.longBreakMins;
        }
        catch (e) { }
    }
    function pomoSaveSettings() {
        try {
            localStorage.setItem(POMO_KEY, JSON.stringify({
                workMins: window.pomoState.workMins,
                breakMins: window.pomoState.breakMins,
                longBreakMins: window.pomoState.longBreakMins,
            }));
        }
        catch (e) { }
    }
    // ── Todos ──────────────────────────────────────────────────────────────────
    let pomoTodos = [];
    function pomoLoadTodos() { try {
        pomoTodos = JSON.parse(localStorage.getItem(POMO_TODOS_KEY) || '[]');
    }
    catch (e) {
        pomoTodos = [];
    } }
    function pomoSaveTodos() { try {
        localStorage.setItem(POMO_TODOS_KEY, JSON.stringify(pomoTodos));
    }
    catch (e) { } }
    // ── Timer core ─────────────────────────────────────────────────────────────
    function pomoTick() {
        const s = window.pomoState;
        if (!s.running)
            return;
        s.secondsLeft--;
        pomoUpdateRing();
        if (s.secondsLeft <= 0) {
            pomoPhaseComplete();
        }
    }
    function pomoPhaseComplete() {
        const s = window.pomoState;
        clearInterval(s.interval);
        s.running = false;
        haptic('success');
        const stats = pomoLoadStats();
        if (s.phase === 'focus') {
            s.sessionsDone++;
            stats.sessions++;
            stats.minutes += s.workMins;
            stats.dotLog.push('focus');
            pomoSaveStats(stats);
            pomoShowToast(`✅ Focus done! Session #${stats.sessions} today · Take a break 🌿`);
            // Decide break type
            const isLong = (s.sessionsDone % s.longBreakEvery === 0);
            s.phase = isLong ? 'longbreak' : 'break';
            s.secondsLeft = (isLong ? s.longBreakMins : s.breakMins) * 60;
        }
        else {
            stats.breakCount++;
            stats.dotLog.push('break');
            pomoSaveStats(stats);
            pomoShowToast(`🍅 Break over! Ready for another focus session?`);
            s.phase = 'focus';
            s.secondsLeft = s.workMins * 60;
        }
        pomoUpdateRing();
        pomoUpdateDash();
        // Auto-ring notification
        if ('Notification' in window && Notification.permission === 'granted') {
            const msg = s.phase === 'focus' ? 'Break is over — time to focus!' : 'Focus session complete! Take a well-earned break.';
            showNotif('🍅 Vikram Focus Timer', msg, 'pomodoro');
        }
    }
    // ── Toggle start/pause ─────────────────────────────────────────────────────
    window.pomoToggle = function () {
        haptic('medium');
        const s = window.pomoState;
        if (s.running) {
            clearInterval(s.interval);
            s.running = false;
        }
        else {
            s.running = true;
            s.interval = setInterval(pomoTick, 1000);
        }
        pomoUpdateRing();
        pomoUpdateControls();
    };
    function pomoReset() {
        const s = window.pomoState;
        clearInterval(s.interval);
        s.running = false;
        s.phase = 'focus';
        s.secondsLeft = s.workMins * 60;
        pomoUpdateRing();
        pomoUpdateControls();
    }
    function pomoSkip() {
        const s = window.pomoState;
        clearInterval(s.interval);
        s.running = false;
        // Force the current phase to complete
        s.secondsLeft = 0;
        pomoPhaseComplete();
        pomoUpdateRing();
        pomoUpdateControls();
    }
    // ── DOM helpers ────────────────────────────────────────────────────────────
    function pomoFmt(sec) { const m = Math.floor(sec / 60), s = sec % 60; return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; }
    const RING_R = 90, RING_CIRC = 2 * Math.PI * RING_R;
    function pomoPhaseColor() {
        const phase = window.pomoState.phase;
        if (phase === 'focus')
            return '#16a34a';
        if (phase === 'break')
            return '#3b82f6';
        return '#5a5a68';
    }
    function pomoPhaseLabel() {
        const phase = window.pomoState.phase;
        if (phase === 'focus')
            return 'FOCUS';
        if (phase === 'break')
            return 'BREAK';
        return 'LONG BREAK';
    }
    function pomoTotalSec() {
        const s = window.pomoState;
        if (s.phase === 'focus')
            return s.workMins * 60;
        if (s.phase === 'break')
            return s.breakMins * 60;
        return s.longBreakMins * 60;
    }
    function pomoUpdateRing() {
        const s = window.pomoState;
        const progress = document.getElementById('pomoRingProgress');
        const timeEl = document.getElementById('pomoTimeDisplay');
        const phaseEl = document.getElementById('pomoPhaseLabel');
        const sessEl = document.getElementById('pomoSessionCount');
        if (!progress || !timeEl)
            return;
        const frac = s.secondsLeft / pomoTotalSec();
        const offset = RING_CIRC * (1 - frac);
        progress.style.strokeDashoffset = String(offset);
        progress.style.stroke = pomoPhaseColor();
        progress.style.strokeDasharray = String(RING_CIRC);
        timeEl.textContent = pomoFmt(s.secondsLeft);
        if (phaseEl)
            phaseEl.textContent = pomoPhaseLabel();
        const stats = pomoLoadStats();
        if (sessEl)
            sessEl.textContent = `${stats.sessions} session${stats.sessions !== 1 ? 's' : ''} today`;
    }
    function pomoUpdateControls() {
        const s = window.pomoState;
        const btn = document.getElementById('pomoPlayPauseBtn');
        if (!btn)
            return;
        btn.innerHTML = s.running
            ? `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause`
            : `<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg> ${s.secondsLeft === pomoTotalSec() ? 'Start' : 'Resume'}`;
    }
    function pomoUpdateDash() {
        const stats = pomoLoadStats();
        const focusEl = document.getElementById('pomoDashFocus');
        const minsEl = document.getElementById('pomoDashMins');
        const breakEl = document.getElementById('pomoDashBreak');
        const dotsEl = document.getElementById('pomoDashDots');
        if (focusEl)
            focusEl.textContent = stats.sessions;
        if (minsEl)
            minsEl.textContent = stats.minutes;
        if (breakEl)
            breakEl.textContent = stats.breakCount;
        if (dotsEl) {
            const maxDots = 12;
            const dots = stats.dotLog.slice(-maxDots);
            dotsEl.innerHTML = Array.from({ length: maxDots }, (_, i) => {
                const d = dots[i];
                if (!d)
                    return `<div class="pomo-dot"></div>`;
                if (d === 'focus')
                    return `<div class="pomo-dot done" title="Focus session"></div>`;
                return `<div class="pomo-dot break" title="Break"></div>`;
            }).join('');
        }
    }
    // ── Toast ──────────────────────────────────────────────────────────────────
    let _toastTimer;
    function pomoShowToast(msg) {
        let t = document.getElementById('pomoToast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'pomoToast';
            t.className = 'pomo-toast';
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(() => t.classList.remove('show'), 3800);
    }
    // ── Settings adjusters ─────────────────────────────────────────────────────
    function pomoAdjust(key, delta) {
        const s = window.pomoState;
        const min = key === 'workMins' ? 5 : 1, max = key === 'longBreakMins' ? 60 : 30;
        s[key] = Math.max(min, Math.min(max, s[key] + delta));
        pomoSaveSettings();
        // Update displayed value
        const map = { workMins: 'pomoWorkVal', breakMins: 'pomoBreakVal', longBreakMins: 'pomoLBVal' };
        const el = document.getElementById(map[key]);
        if (el)
            el.textContent = s[key];
        // If timer is in this phase and not running, reset secondsLeft
        if (!s.running) {
            if (key === 'workMins' && s.phase === 'focus')
                s.secondsLeft = s.workMins * 60;
            if (key === 'breakMins' && s.phase === 'break')
                s.secondsLeft = s.breakMins * 60;
            if (key === 'longBreakMins' && s.phase === 'longbreak')
                s.secondsLeft = s.longBreakMins * 60;
            pomoUpdateRing();
        }
        const sub = document.getElementById('pomoSubtitle');
        if (sub)
            sub.textContent = `${s.workMins} min focus · ${s.breakMins} min rest`;
    }
    window.pomoAdjust = pomoAdjust;
    // ── To-do helpers ──────────────────────────────────────────────────────────
    function pomoAddTodo() {
        const input = document.getElementById('pomoTodoInput');
        if (!input)
            return;
        const text = input.value.trim();
        if (!text)
            return;
        pomoTodos.unshift({ id: Date.now(), text, done: false });
        pomoSaveTodos();
        input.value = '';
        renderPomodoroTodos();
    }
    window.pomoAddTodo = pomoAddTodo;
    function pomoToggleTodo(id) {
        const t = pomoTodos.find(t => t.id === id);
        if (t) {
            t.done = !t.done;
            pomoSaveTodos();
            renderPomodoroTodos();
        }
    }
    window.pomoToggleTodo = pomoToggleTodo;
    function pomoDeleteTodo(id) {
        pomoTodos = pomoTodos.filter(t => t.id !== id);
        pomoSaveTodos();
        renderPomodoroTodos();
    }
    window.pomoDeleteTodo = pomoDeleteTodo;
    function pomoClearDone() {
        pomoTodos = pomoTodos.filter(t => !t.done);
        pomoSaveTodos();
        renderPomodoroTodos();
    }
    window.pomoClearDone = pomoClearDone;
    function renderPomodoroTodos() {
        const list = document.getElementById('pomoTodoList');
        if (!list)
            return;
        if (!pomoTodos.length) {
            list.innerHTML = `<div style="font-size:12px;color:var(--sheet-muted);font-weight:600;text-align:center;padding:16px 0;">No tasks yet — add one above 📝</div>`;
            return;
        }
        list.innerHTML = pomoTodos.map(t => `
    <div class="pomo-todo-item${t.done ? ' done-task' : ''}" onclick="pomoToggleTodo(${t.id})">
      <div class="pomo-todo-check">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="pomo-todo-text">${esc(t.text)}</span>
      <button class="pomo-todo-del" onclick="event.stopPropagation();pomoDeleteTodo(${t.id})" title="Remove">×</button>
    </div>`).join('');
    }
    // ── Main render ────────────────────────────────────────────────────────────
    window.renderPomodoroSheet = function () {
        const body = document.getElementById('pomodoroBody');
        if (!body)
            return;
        pomoLoadSettings();
        pomoLoadTodos();
        const s = window.pomoState;
        // If not running and at default, reset secondsLeft based on current settings
        if (!s.running && s.secondsLeft === 25 * 60 && s.workMins !== 25) {
            s.secondsLeft = s.workMins * 60;
        }
        const stats = pomoLoadStats();
        const progressFrac = s.secondsLeft / pomoTotalSec();
        const offset = RING_CIRC * (1 - progressFrac);
        body.innerHTML = `
  <div class="pomo-wrap">

    <!-- Timer Ring -->
    <div class="pomo-ring-wrap">
      <svg class="pomo-ring-svg" viewBox="0 0 220 220">
        <circle class="pomo-ring-bg" cx="110" cy="110" r="${RING_R}" stroke-dasharray="${RING_CIRC}" stroke-dashoffset="0"/>
        <circle id="pomoRingProgress" class="pomo-ring-progress" cx="110" cy="110" r="${RING_R}"
          stroke-dasharray="${RING_CIRC}" stroke-dashoffset="${offset}"
          stroke="${pomoPhaseColor()}" transform="rotate(-90 110 110)"/>
      </svg>
      <div class="pomo-ring-center">
        <div class="pomo-time" id="pomoTimeDisplay">${pomoFmt(s.secondsLeft)}</div>
        <div class="pomo-phase-lbl" id="pomoPhaseLabel">${pomoPhaseLabel()}</div>
        <div class="pomo-session-count" id="pomoSessionCount">${stats.sessions} session${stats.sessions !== 1 ? 's' : ''} today</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="pomo-controls">
      <button class="pomo-ctrl-btn secondary" onclick="pomoReset()" title="Reset">
        <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
      </button>
      <button class="pomo-ctrl-btn primary" id="pomoPlayPauseBtn" onclick="pomoToggle()">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        ${s.running ? 'Pause' : (s.secondsLeft === pomoTotalSec() ? 'Start' : 'Resume')}
      </button>
      <button class="pomo-ctrl-btn secondary" onclick="pomoSkip()" title="Skip">
        <svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
      </button>
    </div>

    <!-- Settings -->
    <div class="pomo-settings-row">
      <div class="pomo-set-card">
        <div class="pomo-set-label">Focus</div>
        <div class="pomo-set-val">
          <button class="pomo-adj-btn" onclick="pomoAdjust('workMins',-5)">−</button>
          <div class="pomo-set-num" id="pomoWorkVal">${s.workMins}</div>
          <button class="pomo-adj-btn" onclick="pomoAdjust('workMins',5)">+</button>
        </div>
      </div>
      <div class="pomo-set-card">
        <div class="pomo-set-label">Break</div>
        <div class="pomo-set-val">
          <button class="pomo-adj-btn" onclick="pomoAdjust('breakMins',-1)">−</button>
          <div class="pomo-set-num" id="pomoBreakVal">${s.breakMins}</div>
          <button class="pomo-adj-btn" onclick="pomoAdjust('breakMins',1)">+</button>
        </div>
      </div>
      <div class="pomo-set-card">
        <div class="pomo-set-label">Long Break</div>
        <div class="pomo-set-val">
          <button class="pomo-adj-btn" onclick="pomoAdjust('longBreakMins',-5)">−</button>
          <div class="pomo-set-num" id="pomoLBVal">${s.longBreakMins}</div>
          <button class="pomo-adj-btn" onclick="pomoAdjust('longBreakMins',5)">+</button>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div class="pomo-dash">
      <div class="pomo-dash-title">📊 Today's Dashboard</div>
      <div class="pomo-dash-grid">
        <div class="pomo-dash-item">
          <div class="pomo-dash-val" id="pomoDashFocus">${stats.sessions}</div>
          <div class="pomo-dash-sub">Focus<br>Sessions</div>
        </div>
        <div class="pomo-dash-item">
          <div class="pomo-dash-val" id="pomoDashMins">${stats.minutes}</div>
          <div class="pomo-dash-sub">Minutes<br>Focused</div>
        </div>
        <div class="pomo-dash-item">
          <div class="pomo-dash-val" id="pomoDashBreak">${stats.breakCount}</div>
          <div class="pomo-dash-sub">Breaks<br>Taken</div>
        </div>
        <div class="pomo-dash-item">
          <div class="pomo-dash-val" style="font-size:16px;">${stats.sessions >= 8 ? '🏆' : stats.sessions >= 4 ? '🔥' : stats.sessions >= 1 ? '⚡' : '😴'}</div>
          <div class="pomo-dash-sub">${stats.sessions >= 8 ? 'Champion' : stats.sessions >= 4 ? 'On Fire' : stats.sessions >= 1 ? 'Building' : 'Not started'}</div>
        </div>
      </div>
      <div class="pomo-session-dots" id="pomoDashDots">
        ${Array.from({ length: 12 }, (_, i) => {
            const d = stats.dotLog[stats.dotLog.length - 12 + i];
            if (i < 12 - Math.min(12, stats.dotLog.length))
                return `<div class="pomo-dot"></div>`;
            if (d === 'focus')
                return `<div class="pomo-dot done" title="Focus"></div>`;
            return `<div class="pomo-dot break" title="Break"></div>`;
        }).join('')}
      </div>
    </div>

    <!-- To-do List -->
    <div class="pomo-todo">
      <div class="pomo-todo-head">
        <div class="pomo-todo-title">📝 Focus Tasks</div>
        <button class="pomo-todo-clear" onclick="pomoClearDone()">Clear done</button>
      </div>
      <div class="pomo-todo-input-row">
        <input class="pomo-todo-input" id="pomoTodoInput" placeholder="Add a task to focus on…" type="text"
          onkeydown="if(event.key==='Enter')pomoAddTodo()">
        <button class="pomo-todo-add-btn" onclick="pomoAddTodo()">+</button>
      </div>
      <div class="pomo-todo-list" id="pomoTodoList"></div>
    </div>

  </div>`;
        renderPomodoroTodos();
        // Update subtitle
        const sub = document.getElementById('pomoSubtitle');
        if (sub)
            sub.textContent = `${s.workMins} min focus · ${s.breakMins} min rest`;
        // Restore controls state if timer was running
        if (s.running) {
            pomoUpdateControls();
        }
    };
    // Expose reset/skip/toggle so onclick attrs work from inside innerHTML
    window.pomoReset = pomoReset;
    window.pomoSkip = pomoSkip;
})();
// ══ DATE CONVERTER ══
(function () {
    const MONTHS_EN = ['Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
    const MONTHS_NE = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'];
    const ADMON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Build year options 2055–2086
    function bsYearOpts(sel) { let s = ''; for (let y = 2055; y <= 2086; y++)
        s += `<option value="${y}"${y === sel ? ' selected' : ''}>${y}</option>`; return s; }
    function bsMonthOpts(sel) { let s = ''; MONTHS_EN.forEach((m, i) => s += `<option value="${i + 1}"${i + 1 === sel ? ' selected' : ''}>${m} (${MONTHS_NE[i]})</option>`); return s; }
    function bsDayOpts(y, m, sel) { const max = BS[y]?.[m - 1] ?? 30; let s = ''; for (let d = 1; d <= max; d++)
        s += `<option value="${d}"${d === sel ? ' selected' : ''}>${d}</option>`; return s; }
    function adYearOpts(sel) { let s = ''; for (let y = 1998; y <= 2030; y++)
        s += `<option value="${y}"${y === sel ? ' selected' : ''}>${y}</option>`; return s; }
    function adMonthOpts(sel) { let s = ''; ADMON.forEach((m, i) => s += `<option value="${i + 1}"${i + 1 === sel ? ' selected' : ''}>${m}</option>`); return s; }
    function adDayOpts(y, m, sel) { const max = new Date(y, m, 0).getDate(); let s = ''; for (let d = 1; d <= max; d++)
        s += `<option value="${d}"${d === sel ? ' selected' : ''}>${d}</option>`; return s; }
    function pad2(n) { return String(n).padStart(2, '0'); }
    function doConvertBsToAd() {
        const y = +document.getElementById('cvBsY').value;
        const m = +document.getElementById('cvBsM').value;
        const d = +document.getElementById('cvBsD').value;
        if (!BS[y]) {
            document.getElementById('cvBsResult').innerHTML = '<span style="color:var(--wknd)">Year out of range</span>';
            return;
        }
        const max = BS[y][m - 1];
        if (d < 1 || d > max) {
            document.getElementById('cvBsResult').innerHTML = `<span style="color:var(--wknd)">Day must be 1–${max}</span>`;
            return;
        }
        const ad = bsToAd(y, m, d);
        const wd = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][ad.getDay()];
        const res = `${wd}, ${ADMON[ad.getMonth()]} ${ad.getDate()}, ${ad.getFullYear()}`;
        document.getElementById('cvBsResult').innerHTML = `<div class="cv-result-box"><div class="cv-result-label">AD Date</div><div class="cv-result-val">${res}</div><div class="cv-result-iso">${ad.getFullYear()}-${pad2(ad.getMonth() + 1)}-${pad2(ad.getDate())}</div></div>`;
    }
    function doConvertAdToBs() {
        const y = +document.getElementById('cvAdY').value;
        const m = +document.getElementById('cvAdM').value;
        const d = +document.getElementById('cvAdD').value;
        const ad = new Date(y, m - 1, d);
        let bs;
        try {
            bs = adToBs(ad);
        }
        catch (e) {
            document.getElementById('cvAdResult').innerHTML = '<span style="color:var(--wknd)">Out of range</span>';
            return;
        }
        if (!BS[bs.y] || bs.y < 2055 || bs.y > 2086) {
            document.getElementById('cvAdResult').innerHTML = '<span style="color:var(--wknd)">Corresponding BS date out of range (2055–2086)</span>';
            return;
        }
        const mEn = MONTHS_EN[bs.m - 1], mNe = MONTHS_NE[bs.m - 1];
        const wd = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'][ad.getDay()];
        document.getElementById('cvAdResult').innerHTML = `<div class="cv-result-box"><div class="cv-result-label">BS Date</div><div class="cv-result-val">${mEn} ${bs.d}, ${bs.y} BS</div><div class="cv-result-ne">${mNe} ${bs.d}, ${bs.y}</div><div class="cv-result-wd">${wd}</div></div>`;
    }
    function updateBsDayOpts() {
        const y = +document.getElementById('cvBsY').value;
        const m = +document.getElementById('cvBsM').value;
        const cur = +document.getElementById('cvBsD').value;
        const max = BS[y]?.[m - 1] ?? 30;
        document.getElementById('cvBsD').innerHTML = bsDayOpts(y, m, Math.min(cur, max));
    }
    function updateAdDayOpts() {
        const y = +document.getElementById('cvAdY').value;
        const m = +document.getElementById('cvAdM').value;
        const cur = +document.getElementById('cvAdD').value;
        const max = new Date(y, m, 0).getDate();
        document.getElementById('cvAdD').innerHTML = adDayOpts(y, m, Math.min(cur, max));
    }
    window.renderConverterSheet = function () {
        const today = TODAYBS;
        const ad = bsToAd(today.y, today.m, today.d);
        const body = document.getElementById('converterBody');
        if (!body)
            return;
        body.innerHTML = `
<style>
.cv-section{background:var(--card);border-radius:18px;padding:18px;margin-bottom:16px;box-shadow:0 2px 12px rgba(60,60,70,.07);}
.cv-section-title{font-size:13px;font-weight:800;color:var(--tf-text);letter-spacing:.5px;text-transform:uppercase;margin-bottom:14px;}
.cv-row{display:flex;gap:8px;margin-bottom:12px;}
.cv-sel{flex:1;appearance:none;-webkit-appearance:none;background:var(--tgbg);color:var(--dtext);border:1.5px solid var(--border);border-radius:10px;padding:9px 10px;font-size:14px;font-weight:700;font-family:inherit;outline:none;cursor:pointer;}
.cv-sel:focus{border-color:var(--tf);}
.cv-btn{width:100%;padding:12px;background:linear-gradient(135deg,var(--tf),var(--tt));color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:800;font-family:inherit;cursor:pointer;letter-spacing:.2px;transition:opacity .15s,transform .1s;}
.cv-btn:active{transform:scale(.97);opacity:.9;}
.cv-result-box{background:linear-gradient(135deg,rgba(26,26,26,.10),rgba(60,60,70,.07));border:1.5px solid rgba(26,26,26,.18);border-radius:14px;padding:14px 16px;margin-top:12px;}
.cv-result-label{font-size:11px;font-weight:800;color:var(--tf-text);letter-spacing:.6px;text-transform:uppercase;margin-bottom:4px;}
.cv-result-val{font-size:18px;font-weight:900;color:var(--dtext);line-height:1.2;}
.cv-result-ne{font-size:15px;font-weight:700;color:var(--tf-text);margin-top:3px;}
.cv-result-iso{font-size:12px;font-weight:700;color:var(--dsub);margin-top:3px;font-variant-numeric:tabular-nums;}
.cv-result-wd{font-size:12px;font-weight:700;color:var(--dsub);margin-top:3px;}
.cv-divider{border:none;border-top:1.5px solid var(--border);margin:4px 0 14px;}
.cv-quick-title{font-size:12px;font-weight:800;color:var(--dsub);letter-spacing:.4px;text-transform:uppercase;margin-bottom:10px;}
.cv-today-chip{display:inline-flex;align-items:center;gap:6px;background:var(--chip-bg);color:var(--chip-text);border-radius:10px;padding:6px 12px;font-size:13px;font-weight:700;margin-bottom:6px;}

/* ── CLINIC SUMMARY PRINT / PDF EXPORT ── */
#clinicPrintArea{display:none;}
@media print{
  body *{visibility:hidden;}
  #clinicPrintArea, #clinicPrintArea *{visibility:visible;}
  #clinicPrintArea{display:block;position:absolute;top:0;left:0;width:100%;padding:24px;background:#fff;color:#1a1a1a;}
  .cpa-h1{font-size:20px;font-weight:900;margin:0 0 2px;color:#1a1a1a;}
  .cpa-meta{font-size:11px;font-weight:600;color:#666;margin:0 0 18px;}
  .cpa-sect{font-size:13px;font-weight:800;color:#1a1a1a;margin:18px 0 8px;padding-bottom:4px;border-bottom:1.5px solid #ddd;}
  .cpa-row{display:flex;justify-content:space-between;font-size:12.5px;padding:5px 0;border-bottom:1px solid #eee;}
  .cpa-row span:first-child{font-weight:700;color:#1a1a1a;}
  .cpa-row span:last-child{color:#444;}
  .cpa-foot{font-size:10px;color:#888;margin-top:24px;line-height:1.5;}
  @page{margin:14mm;}
}
</style>

<div id="clinicPrintArea"></div>

<div class="cv-today-chip">✦ Today: ${MONTHS_EN[today.m - 1]} ${today.d}, ${today.y} BS &nbsp;·&nbsp; ${ADMON[ad.getMonth()]} ${ad.getDate()}, ${ad.getFullYear()} AD</div>

<div class="cv-section">
  <div class="cv-section-title">BS → AD</div>
  <div class="cv-row">
    <select class="cv-sel" id="cvBsY" onchange="updateBsDayOpts()">${bsYearOpts(today.y)}</select>
    <select class="cv-sel" id="cvBsM" style="flex:1.4" onchange="updateBsDayOpts()">${bsMonthOpts(today.m)}</select>
    <select class="cv-sel" id="cvBsD">${bsDayOpts(today.y, today.m, today.d)}</select>
  </div>
  <button class="cv-btn" onclick="doConvertBsToAd()">Convert to AD</button>
  <div id="cvBsResult"></div>
</div>

<div class="cv-section">
  <div class="cv-section-title">AD → BS</div>
  <div class="cv-row">
    <select class="cv-sel" id="cvAdY" onchange="updateAdDayOpts()">${adYearOpts(ad.getFullYear())}</select>
    <select class="cv-sel" id="cvAdM" style="flex:1.4" onchange="updateAdDayOpts()">${adMonthOpts(ad.getMonth() + 1)}</select>
    <select class="cv-sel" id="cvAdD">${adDayOpts(ad.getFullYear(), ad.getMonth() + 1, ad.getDate())}</select>
  </div>
  <button class="cv-btn" onclick="doConvertAdToBs()">Convert to BS</button>
  <div id="cvAdResult"></div>
</div>

<div class="cv-section">
  <div class="cv-section-title">🎂 Age Calculator</div>
  <div style="font-size:12.5px;font-weight:600;color:var(--dsub);margin-bottom:12px;">Enter your BS birthdate to see your age</div>
  <div class="cv-row">
    <select class="cv-sel" id="ageBirthY" style="flex:1.4" onchange="calcBsAge()"></select>
    <select class="cv-sel" id="ageBirthM" style="flex:1.6" onchange="calcBsAge()"></select>
    <select class="cv-sel" id="ageBirthD" onchange="calcBsAge()"></select>
  </div>
  <button class="cv-btn" onclick="calcBsAge()">Calculate Age</button>
  <div id="ageResult" style="display:none;border-radius:14px;background:rgba(130,80,200,.09);border:1px solid rgba(130,80,200,.18);padding:12px 14px;margin-top:12px;">
    <div id="ageMainLine" style="font-size:22px;font-weight:900;color:var(--htext);letter-spacing:-.3px;line-height:1.2;"></div>
    <div id="ageSubLine" style="font-size:12px;font-weight:600;color:var(--dsub);margin-top:3px;"></div>
    <div id="ageNextBday" style="font-size:12px;font-weight:700;color:rgba(130,80,200,.9);margin-top:5px;"></div>
  </div>
</div>`;
        // Expose helpers globally so inline onclick works
        window.doConvertBsToAd = doConvertBsToAd;
        window.doConvertAdToBs = doConvertAdToBs;
        window.updateBsDayOpts = updateBsDayOpts;
        window.updateAdDayOpts = updateAdDayOpts;
        if (window.initAgeCalc)
            window.initAgeCalc();
    };
})();
// ══ BS AGE CALCULATOR ══
(function () {
    function initAgeCalc() {
        const yEl = document.getElementById('ageBirthY');
        const mEl = document.getElementById('ageBirthM');
        const dEl = document.getElementById('ageBirthD');
        if (!yEl || !mEl || !dEl)
            return;
        // Populate years: full BS range
        const minY = 1990, maxY = TODAYBS.y;
        yEl.innerHTML = '';
        for (let y = maxY; y >= minY; y--) {
            const o = document.createElement('option');
            o.value = String(y);
            o.textContent = y + ' BS';
            yEl.appendChild(o);
        }
        // Default to a typical birth year (~25 years ago)
        const defaultY = Math.max(minY, TODAYBS.y - 25);
        yEl.value = defaultY;
        // Populate months
        mEl.innerHTML = MEN.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('');
        mEl.value = 1;
        // Populate days
        function refreshDays() {
            const y = parseInt(yEl.value), m = parseInt(mEl.value);
            const max = (typeof BS !== 'undefined' && BS[y] && BS[y][m - 1]) ? BS[y][m - 1] : 30;
            const cur = parseInt(dEl.value) || 1;
            dEl.innerHTML = '';
            for (let d = 1; d <= max; d++) {
                const o = document.createElement('option');
                o.value = String(d);
                o.textContent = String(d);
                dEl.appendChild(o);
            }
            dEl.value = Math.min(cur, max);
        }
        refreshDays();
        yEl.addEventListener('change', () => { refreshDays(); calcBsAge(); });
        mEl.addEventListener('change', () => { refreshDays(); calcBsAge(); });
    }
    window.calcBsAge = function () {
        const yEl = document.getElementById('ageBirthY');
        const mEl = document.getElementById('ageBirthM');
        const dEl = document.getElementById('ageBirthD');
        const res = document.getElementById('ageResult');
        const mainLine = document.getElementById('ageMainLine');
        const subLine = document.getElementById('ageSubLine');
        const nextBday = document.getElementById('ageNextBday');
        if (!yEl || !res)
            return;
        const bY = parseInt(yEl.value), bM = parseInt(mEl.value), bD = parseInt(dEl.value);
        if (!bY || !bM || !bD)
            return;
        const tY = TODAYBS.y, tM = TODAYBS.m, tD = TODAYBS.d;
        // Age in BS years/months/days
        let ageY = tY - bY;
        let ageM = tM - bM;
        let ageD = tD - bD;
        if (ageD < 0) {
            ageM--;
            // Days in prev BS month relative to today
            let prevM = tM - 1, prevY = tY;
            if (prevM < 1) {
                prevM = 12;
                prevY--;
            }
            const daysInPrev = (typeof BS !== 'undefined' && BS[prevY] && BS[prevY][prevM - 1]) ? BS[prevY][prevM - 1] : 30;
            ageD += daysInPrev;
        }
        if (ageM < 0) {
            ageY--;
            ageM += 12;
        }
        // Future date
        if (ageY < 0 || (ageY === 0 && ageM === 0 && ageD <= 0)) {
            res.style.display = 'block';
            mainLine.textContent = '🤔 Date is in the future';
            subLine.textContent = 'Please enter a past birthdate.';
            nextBday.textContent = '';
            return;
        }
        // Next birthday in BS
        let nbY = tY, nbM = bM, nbD = bD;
        // Clamp day to valid range in that month/year
        const maxNbD = (typeof BS !== 'undefined' && BS[nbY] && BS[nbY][nbM - 1]) ? BS[nbY][nbM - 1] : 30;
        nbD = Math.min(bD, maxNbD);
        if (nbM < tM || (nbM === tM && nbD <= tD))
            nbY++;
        const maxNbD2 = (typeof BS !== 'undefined' && BS[nbY] && BS[nbY][nbM - 1]) ? BS[nbY][nbM - 1] : 30;
        nbD = Math.min(bD, maxNbD2);
        // Days until next birthday
        const todayAD = bsToAd(tY, tM, tD);
        const nextBdAD = bsToAd(nbY, nbM, nbD);
        const daysUntil = Math.round((+nextBdAD - +todayAD) / 86400000);
        const mName = MEN[bM - 1];
        const parts = [];
        if (ageY > 0)
            parts.push(ageY + (ageY === 1 ? ' year' : ' years'));
        if (ageM > 0)
            parts.push(ageM + (ageM === 1 ? ' month' : ' months'));
        if (ageD > 0 || parts.length === 0)
            parts.push(ageD + (ageD === 1 ? ' day' : ' days'));
        res.style.display = 'block';
        mainLine.textContent = parts.join(', ');
        subLine.textContent = `Born ${mName} ${bD}, ${bY} BS`;
        if (daysUntil === 0) {
            nextBday.textContent = '🎉 Happy Birthday today!';
        }
        else {
            nextBday.textContent = `🎂 Next birthday in ${daysUntil} day${daysUntil === 1 ? '' : 's'} · ${MEN[nbM - 1]} ${nbD}, ${nbY} BS`;
        }
    };
    // Exposed so it can be re-run each time the Date Converter sheet renders
    window.initAgeCalc = initAgeCalc;
})();
// ══ BOTTOM NAV TAB SWITCHING ══
let _homeNavLastTap = 0;
window.handleHomeNavTap = function () {
    const now = Date.now();
    if (now - _homeNavLastTap < 400) {
        _homeNavLastTap = 0;
        haptic('medium');
        vikramToast('🔄 Refreshing…');
        setTimeout(() => location.reload(), 150);
        return;
    }
    _homeNavLastTap = now;
    switchTab('home');
};
// Double-tap guard for cycle tab — prevents re-render flicker / scroll-to-settings on double-tap
let _cycleNavLastTap = 0;
window.handleCycleNavTap = function () {
    const now = Date.now();
    if (now - _cycleNavLastTap < 400) {
        _cycleNavLastTap = 0;
        return; // ignore double-tap
    }
    _cycleNavLastTap = now;
    switchTab('cycle');
};
// Double-tap guard for schedule tab
let _scheduleNavLastTap = 0;
window.handleScheduleNavTap = function () {
    const now = Date.now();
    if (now - _scheduleNavLastTap < 400) {
        _scheduleNavLastTap = 0;
        return;
    }
    _scheduleNavLastTap = now;
    switchTab('schedule');
};
// Double-tap guard for counter tab
let _counterNavLastTap = 0;
window.handleCounterNavTap = function () {
    const now = Date.now();
    if (now - _counterNavLastTap < 400) {
        _counterNavLastTap = 0;
        return;
    }
    _counterNavLastTap = now;
    switchTab('counter');
};
// Double-tap guard for profile nav button — opens the Profile sheet
let _profileNavLastTap = 0;
window.handleProfileNavTap = function () {
    const now = Date.now();
    if (now - _profileNavLastTap < 400) {
        _profileNavLastTap = 0;
        return;
    }
    _profileNavLastTap = now;
    switchTab('profile');
};
function resetHomeSubViews() {
    const tabWeek = document.getElementById('tabWeek');
    const tabDay = document.getElementById('tabDay');
    const tabMonth = document.getElementById('tabMonth');
    const tabSchedule = document.getElementById('tabSchedule');
    const mmView = document.getElementById('mmView');
    const weekView = document.getElementById('weekView');
    const dayView = document.getElementById('dayView');
    const monthTabView = document.getElementById('monthTabView');
    const schedView = document.getElementById('scheduleView');
    if (typeof weekViewActive !== 'undefined' && weekViewActive) {
        weekViewActive = false;
        if (tabWeek)
            tabWeek.classList.remove('on');
        if (typeof wvStopNowLineTimer === 'function')
            wvStopNowLineTimer();
    }
    if (typeof dayViewActive !== 'undefined' && dayViewActive) {
        dayViewActive = false;
        if (tabDay)
            tabDay.classList.remove('on');
        if (typeof dvStopNowLineTimer === 'function')
            dvStopNowLineTimer();
    }
    if (typeof monthTabActive !== 'undefined' && monthTabActive) {
        monthTabActive = false;
        if (tabMonth)
            tabMonth.classList.remove('on');
    }
    if (typeof scheduleActive !== 'undefined' && scheduleActive) {
        scheduleActive = false;
        if (tabSchedule)
            tabSchedule.classList.remove('on');
    }
    if (weekView)
        weekView.style.display = 'none';
    if (dayView)
        dayView.style.display = 'none';
    if (monthTabView)
        monthTabView.style.display = 'none';
    if (mmView)
        mmView.style.display = 'none';
    if (schedView)
        schedView.style.display = 'none';
}
let _currentTab = 'home';
let _settingsReturnTab = 'home'; // tab to return to when Settings is closed (e.g. Profile)
let _notesReturnTab = 'home'; // tab to return to when Notes is closed (e.g. Profile)
function switchTab(tab) {
    if (!window._vikramRestoring)
        haptic('light');
    try {
        window.localStorage.setItem('vikram_active_tab', tab);
    }
    catch (e) { }
    if (tab !== 'notes' && typeof window.notesFlushSave === 'function')
        window.notesFlushSave();
    if (tab !== 'notes' && typeof window.tasksFlushSave === 'function')
        window.tasksFlushSave();
    resetHomeSubViews();
    ['home', 'schedule', 'cycle', 'counter', 'notes', 'settings', 'profile'].forEach(t => {
        const id = 'bnav' + t.charAt(0).toUpperCase() + t.slice(1);
        const btn = document.getElementById(id);
        if (btn)
            btn.classList.toggle('active', t === tab);
    });
    const mainContent = document.querySelector('.ccard');
    const upcoming = document.querySelector('.upcoming');
    const modebar = document.getElementById('modebar');
    const hdr = document.querySelector('.hdr');
    const dcView = document.getElementById('dayCounterView');
    const cycleView = document.getElementById('cycleView');
    const dcFab = document.getElementById('dcFab');
    const notesView = document.getElementById('notesView');
    const schedView = document.getElementById('scheduleView');
    const settingsView = document.getElementById('settingsView');
    const profileView = document.getElementById('profileView');
    const tabAll = document.getElementById('tabAll');
    const todayCard = document.getElementById('todayCard');
    if (todayCard)
        todayCard.style.display = 'none';
    const schedFab = document.getElementById('schedTodayFab');
    if (schedFab)
        schedFab.style.display = (tab === 'schedule') ? '' : 'none';
    const schedAddFab = document.getElementById('schedAddFab');
    if (schedAddFab)
        schedAddFab.style.display = (tab === 'schedule') ? '' : 'none';
    if (tab === 'home') {
        // In home, show ccard unless 3M view is active
        if (tabAll)
            tabAll.classList.add('on');
        if (mm3Active) {
            if (mainContent)
                mainContent.style.display = 'none';
            const mmView = document.getElementById('mmView');
            if (mmView)
                mmView.style.display = 'block';
        }
        else {
            if (mainContent)
                mainContent.style.display = '';
        }
        if (upcoming)
            upcoming.style.display = '';
        if (modebar)
            modebar.style.display = '';
        if (hdr)
            hdr.style.display = '';
        if (dcView)
            dcView.classList.remove('active');
        if (cycleView)
            cycleView.classList.remove('active');
        if (notesView)
            notesView.classList.remove('active');
        if (schedView)
            schedView.style.display = 'none';
        if (settingsView)
            settingsView.classList.remove('active');
        if (profileView)
            profileView.classList.remove('active');
        scheduleActive = false;
        if (dcFab)
            dcFab.style.display = 'none';
        const mainFab = document.querySelector('.fab');
        if (mainFab)
            mainFab.style.display = '';
        closeAll();
        _currentTab = 'home';
        // Refresh notes list so saved notes appear after page load or tab switch
        if (typeof window.notesLoad === 'function')
            window.notesLoad();
        // Re-measure and restore calendar height now that cells are visible again
        requestAnimationFrame(() => { requestAnimationFrame(() => { applyCalHeight(false); }); });
    }
    else if (tab === 'schedule') {
        if (mainContent)
            mainContent.style.display = 'none';
        const mmView0 = document.getElementById('mmView');
        if (mmView0)
            mmView0.style.display = 'none';
        if (upcoming)
            upcoming.style.display = 'none';
        if (modebar)
            modebar.style.display = 'none';
        if (hdr)
            hdr.style.display = '';
        if (dcView)
            dcView.classList.remove('active');
        if (cycleView)
            cycleView.classList.remove('active');
        if (notesView)
            notesView.classList.remove('active');
        if (settingsView)
            settingsView.classList.remove('active');
        if (profileView)
            profileView.classList.remove('active');
        if (dcFab)
            dcFab.style.display = 'none';
        const mainFab = document.querySelector('.fab');
        if (mainFab)
            mainFab.style.display = 'none';
        closeAll();
        scheduleActive = true;
        _currentTab = 'schedule';
        if (schedView) {
            schedView.style.display = '';
            renderScheduleView();
        }
    }
    else if (tab === 'cycle') {
        if (mainContent)
            mainContent.style.display = 'none';
        const mmView2 = document.getElementById('mmView');
        if (mmView2)
            mmView2.style.display = 'none';
        if (upcoming)
            upcoming.style.display = 'none';
        if (modebar)
            modebar.style.display = 'none';
        if (hdr)
            hdr.style.display = '';
        if (dcView)
            dcView.classList.remove('active');
        if (cycleView)
            cycleView.classList.add('active');
        if (notesView)
            notesView.classList.remove('active');
        if (schedView)
            schedView.style.display = 'none';
        if (settingsView)
            settingsView.classList.remove('active');
        if (profileView)
            profileView.classList.remove('active');
        scheduleActive = false;
        if (dcFab)
            dcFab.style.display = 'none';
        const mainFab = document.querySelector('.fab');
        if (mainFab)
            mainFab.style.display = 'none';
        closeAll();
        // Only re-render if we weren't already on cycle tab — prevents scroll jump on double-tap
        if (_currentTab !== 'cycle') {
            try {
                renderCycleSheet();
            }
            catch (e) {
                console.error('[Vikram] renderCycleSheet error:', e);
            }
            _applyCycleTopToggle();
            // Push own cycle data to Firebase so partner sees fresh data
            try {
                if (window._fbPair)
                    window._fbPair.forceSync();
            }
            catch (e) { }
        }
        _currentTab = 'cycle';
    }
    else if (tab === 'counter') {
        if (mainContent)
            mainContent.style.display = 'none';
        const mmView3 = document.getElementById('mmView');
        if (mmView3)
            mmView3.style.display = 'none';
        if (upcoming)
            upcoming.style.display = 'none';
        if (modebar)
            modebar.style.display = 'none';
        if (hdr)
            hdr.style.display = '';
        if (cycleView)
            cycleView.classList.remove('active');
        if (dcView)
            dcView.classList.add('active');
        if (notesView)
            notesView.classList.remove('active');
        if (schedView)
            schedView.style.display = 'none';
        if (settingsView)
            settingsView.classList.remove('active');
        if (profileView)
            profileView.classList.remove('active');
        scheduleActive = false;
        if (dcFab)
            dcFab.style.display = 'flex';
        const mainFab = document.querySelector('.fab');
        if (mainFab)
            mainFab.style.display = 'none';
        closeAll();
        _currentTab = 'counter';
        try {
            if (typeof window.dcRender === 'function')
                window.dcRender();
        }
        catch (e) {
            console.error('[Vikram] dcRender error:', e);
        }
    }
    else if (tab === 'notes') {
        if (_currentTab !== 'notes')
            _notesReturnTab = _currentTab || 'home';
        if (mainContent)
            mainContent.style.display = 'none';
        const mmView4 = document.getElementById('mmView');
        if (mmView4)
            mmView4.style.display = 'none';
        if (upcoming)
            upcoming.style.display = 'none';
        if (modebar)
            modebar.style.display = 'none';
        if (hdr)
            hdr.style.display = '';
        if (dcView)
            dcView.classList.remove('active');
        if (cycleView)
            cycleView.classList.remove('active');
        if (schedView)
            schedView.style.display = 'none';
        if (settingsView)
            settingsView.classList.remove('active');
        if (profileView)
            profileView.classList.remove('active');
        scheduleActive = false;
        if (dcFab)
            dcFab.style.display = 'none';
        const mainFab = document.querySelector('.fab');
        if (mainFab)
            mainFab.style.display = 'none';
        closeAll();
        _currentTab = 'notes';
        if (notesView)
            notesView.classList.add('active');
        // Restore whichever segment was active; default to notes
        ntSwitchSeg(window._ntActiveSeg || 'notes', true);
    }
    else if (tab === 'settings') {
        if (_currentTab !== 'settings')
            _settingsReturnTab = _currentTab || 'home';
        if (mainContent)
            mainContent.style.display = 'none';
        const mmView5 = document.getElementById('mmView');
        if (mmView5)
            mmView5.style.display = 'none';
        if (upcoming)
            upcoming.style.display = 'none';
        if (modebar)
            modebar.style.display = 'none';
        if (hdr)
            hdr.style.display = 'none';
        if (dcView)
            dcView.classList.remove('active');
        if (cycleView)
            cycleView.classList.remove('active');
        if (notesView)
            notesView.classList.remove('active');
        if (schedView)
            schedView.style.display = 'none';
        if (profileView)
            profileView.classList.remove('active');
        scheduleActive = false;
        if (dcFab)
            dcFab.style.display = 'none';
        const mainFab2 = document.querySelector('.fab');
        if (mainFab2)
            mainFab2.style.display = 'none';
        // close any open sheets/overlay before showing settings view
        document.getElementById('ov').classList.remove('open');
        ['langSheet', 'addSheet', 'dmodal', 'mpSheet', 'echoSheet', 'colorMatcherSheet', 'pomodoroSheet', 'converterSheet', 'sharedProfileSheet', 'changelogSheet', 'privacySheet', 'bdtSheet', 'kharchaSheet', 'alarmsSheet', 'insightsSheet', 'familySheet'].forEach(id => document.getElementById(id)?.classList.remove('open'));
        _currentTab = 'settings';
        if (settingsView)
            settingsView.classList.add('active');
        // render dynamic settings content
        if (typeof renderGcalCard === 'function')
            renderGcalCard();
        if (typeof renderWidgetThumb === 'function')
            renderWidgetThumb();
        if (typeof renderWidgetSteps === 'function')
            renderWidgetSteps();
        if (typeof updateNotifCard === 'function')
            updateNotifCard();
    }
    else if (tab === 'profile') {
        if (mainContent)
            mainContent.style.display = 'none';
        const mmView6 = document.getElementById('mmView');
        if (mmView6)
            mmView6.style.display = 'none';
        if (upcoming)
            upcoming.style.display = 'none';
        if (modebar)
            modebar.style.display = 'none';
        if (hdr)
            hdr.style.display = '';
        if (dcView)
            dcView.classList.remove('active');
        if (cycleView)
            cycleView.classList.remove('active');
        if (notesView)
            notesView.classList.remove('active');
        if (schedView)
            schedView.style.display = 'none';
        if (settingsView)
            settingsView.classList.remove('active');
        scheduleActive = false;
        if (dcFab)
            dcFab.style.display = 'none';
        const mainFab3 = document.querySelector('.fab');
        if (mainFab3)
            mainFab3.style.display = 'none';
        closeAll();
        _currentTab = 'profile';
        if (profileView)
            profileView.classList.add('active');
        // Populate profile content
        try {
            const p = JSON.parse(localStorage.getItem('vikram_profile') || '{}');
            if (typeof applyProfilePhoto === 'function')
                applyProfilePhoto(p.photo || null);
            if (typeof profileBdayCardUpdate === 'function')
                profileBdayCardUpdate(p.bday || null);
            const disp = document.getElementById('profileBdayDisplay');
            if (disp)
                disp.textContent = typeof bdayDisplayText === 'function' ? bdayDisplayText(p.bday || null) : '🎂 Add your birthday';
            if (typeof renderProfileShareEvents === 'function')
                renderProfileShareEvents();
            if (typeof renderProfileBirthdays === 'function')
                renderProfileBirthdays();
            try {
                if (typeof window.whRenderCard === 'function')
                    window.whRenderCard();
            }
            catch (e) {
                console.error('[Vikram] whRenderCard error:', e);
            }
            if (typeof renderProfileNotes === 'function')
                renderProfileNotes();
            if (typeof renderProfileTasks === 'function')
                renderProfileTasks();
            if (typeof renderNotifHistory === 'function')
                renderNotifHistory();
            if (typeof renderProfileBackup === 'function')
                renderProfileBackup();
            if (typeof renderProfileExtras === 'function')
                renderProfileExtras();
        }
        catch (e) { }
    }
}
// ══ DAY COUNTER ══
(function () {
    const DC_KEY = 'vikram_daycounters';
    function dcLoad() {
        try {
            return JSON.parse(localStorage.getItem(DC_KEY)) || [];
        }
        catch (e) {
            return [];
        }
    }
    function dcSaveAll(arr) { try {
        localStorage.setItem(DC_KEY, JSON.stringify(arr));
    }
    catch (e) { } }
    let _dcType = 'build';
    let _dcEditId = null; // null = adding new; otherwise id of habit being edited
    // ── Evening reminder for un-checked habits ────────────────────────────────
    const HABIT_REMINDER_KEY = 'vikram_habit_reminder';
    function dcLoadReminderSettings() {
        try {
            return Object.assign({ enabled: false, time: '20:00' }, JSON.parse(localStorage.getItem(HABIT_REMINDER_KEY)) || {});
        }
        catch (e) {
            return { enabled: false, time: '20:00' };
        }
    }
    function dcSaveReminderSettings(s) { try {
        localStorage.setItem(HABIT_REMINDER_KEY, JSON.stringify(s));
    }
    catch (e) { } }
    window.dcToggleHabitReminder = function () {
        if (typeof haptic === 'function')
            haptic('light');
        const s = dcLoadReminderSettings();
        s.enabled = !s.enabled;
        if (s.enabled && typeof requestNotifPerm === 'function' && 'Notification' in window && Notification.permission !== 'granted') {
            requestNotifPerm().then(function () { dcSaveReminderSettings(s); if (typeof renderActivitySheet === 'function')
                renderActivitySheet(); });
            return;
        }
        dcSaveReminderSettings(s);
        if (typeof renderActivitySheet === 'function')
            renderActivitySheet();
    };
    window.dcSetHabitReminderTime = function (val) {
        const s = dcLoadReminderSettings();
        s.time = val || '20:00';
        dcSaveReminderSettings(s);
    };
    window.checkHabitReminders = async function () {
        if (typeof notifEnabled !== 'undefined' && !notifEnabled)
            return;
        if (!('Notification' in window) || Notification.permission !== 'granted')
            return;
        const s = dcLoadReminderSettings();
        if (!s.enabled)
            return;
        const arr = dcLoad();
        if (!arr.length)
            return;
        const tk = todayKey();
        const unchecked = arr.filter(function (c) { return c.lastCheckin !== tk; });
        if (!unchecked.length)
            return;
        const now = new Date();
        const nowHM = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
        const reminderTime = s.time || '20:00';
        const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const key = 'vn_habit_' + todayMid;
        if (nowHM >= reminderTime && nowHM < _addMinutesHM(reminderTime, 2) && !localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            const n = unchecked.length;
            const body = n <= 3 ? unchecked.map(function (c) { return c.name; }).join(', ') : (n + ' habits still need a check-in');
            await showNotif('\uD83D\uDD25 ' + n + ' habit' + (n === 1 ? '' : 's') + ' left today', body, 'habit-' + todayMid);
        }
    };
    // Sync the date field's label + min/max bounds to whichever type is active.
    // Countdown targets must be today-or-later; build/quit start dates can be any day.
    function dcSyncDateField(type) {
        const label = document.getElementById('dcDateLabel');
        const input = document.getElementById('dcDateInput');
        const nameInput = document.getElementById('dcNameInput');
        if (!label || !input)
            return;
        if (type === 'countdown') {
            label.textContent = 'Target Date';
            const d = new Date();
            const todayIso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
            input.min = todayIso;
            if (input.value && input.value < todayIso)
                input.value = todayIso;
            if (nameInput)
                nameInput.placeholder = 'e.g. Birthday, Exam, Trip... (optional)';
        }
        else {
            label.textContent = 'Start Date';
            input.removeAttribute('min');
            if (nameInput)
                nameInput.placeholder = 'e.g. No sugar, Morning walk...';
        }
    }
    window.dcOpenAdd = function () {
        _dcEditId = null;
        _dcType = 'build';
        document.getElementById('dcModalTitle').textContent = 'New Counter';
        document.getElementById('dcModalSaveBtn').textContent = 'Add Counter';
        document.getElementById('dcTypeBuild').classList.add('selected');
        document.getElementById('dcTypeQuit').classList.remove('selected');
        document.getElementById('dcTypeCountdown').classList.remove('selected');
        document.getElementById('dcNameInput').value = '';
        document.getElementById('dcNoteInput').value = '';
        const d = new Date();
        const iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        document.getElementById('dcDateInput').value = iso;
        dcSyncDateField('build');
        document.getElementById('dcModalOverlay').classList.add('open');
        setTimeout(() => document.getElementById('dcNameInput').focus(), 220);
    };
    window.dcOpenEdit = function (id) {
        const arr = dcLoad();
        const c = arr.find(function (x) { return x.id === id; });
        if (!c)
            return;
        if (typeof haptic === 'function')
            haptic('light');
        _dcEditId = id;
        _dcType = c.type;
        document.getElementById('dcModalTitle').textContent = 'Edit Counter';
        document.getElementById('dcModalSaveBtn').textContent = 'Save Changes';
        document.getElementById('dcTypeBuild').classList.toggle('selected', c.type === 'build');
        document.getElementById('dcTypeQuit').classList.toggle('selected', c.type === 'quit');
        document.getElementById('dcTypeCountdown').classList.toggle('selected', c.type === 'countdown');
        document.getElementById('dcNameInput').value = c.name || '';
        document.getElementById('dcNoteInput').value = c.note || '';
        const sd = new Date(c.startTs);
        const iso = sd.getFullYear() + '-' + String(sd.getMonth() + 1).padStart(2, '0') + '-' + String(sd.getDate()).padStart(2, '0');
        document.getElementById('dcDateInput').value = iso;
        dcSyncDateField(c.type);
        document.getElementById('dcModalOverlay').classList.add('open');
        document.querySelectorAll('.dc-card-menu.open').forEach(function (m) { m.classList.remove('open'); });
        setTimeout(() => document.getElementById('dcNameInput').focus(), 220);
    };
    window.dcCloseAdd = function (e) {
        if (e && e.target !== document.getElementById('dcModalOverlay'))
            return;
        document.getElementById('dcModalOverlay').classList.remove('open');
    };
    window.dcSelectType = function (type) {
        _dcType = type;
        document.getElementById('dcTypeBuild').classList.toggle('selected', type === 'build');
        document.getElementById('dcTypeQuit').classList.toggle('selected', type === 'quit');
        document.getElementById('dcTypeCountdown').classList.toggle('selected', type === 'countdown');
        dcSyncDateField(type);
    };
    window.dcSave = function () {
        let name = document.getElementById('dcNameInput').value.trim();
        const note = document.getElementById('dcNoteInput').value.trim();
        const dateVal = document.getElementById('dcDateInput').value;
        const startTs = dateVal ? (() => { const [y, m, d] = dateVal.split('-').map(Number); return new Date(y, m - 1, d).getTime(); })() : Date.now();
        // Countdown cards don't strictly need a typed name — fall back to the
        // target date itself so picking a date is always enough to save.
        if (!name && _dcType === 'countdown' && dateVal) {
            name = new Date(startTs).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
        }
        if (!name) {
            document.getElementById('dcNameInput').focus();
            return;
        }
        haptic('success');
        const arr = dcLoad();
        if (_dcEditId !== null) {
            const c = arr.find(function (x) { return x.id === _dcEditId; });
            if (c) {
                c.name = name;
                c.type = _dcType;
                c.startTs = startTs;
                c.note = note;
            }
            _dcEditId = null;
        }
        else {
            arr.push({ id: Date.now(), name, type: _dcType, startTs, lastCheckin: null, note, pinned: false });
        }
        dcSaveAll(arr);
        document.getElementById('dcModalOverlay').classList.remove('open');
        dcRender();
    };
    function daysBetween(ts1, ts2) { return Math.floor((ts2 - ts1) / (1000 * 60 * 60 * 24)); }
    function todayKey() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    const COLORS = ['#1a1a1a', '#e0507a', '#3a9e6e', '#e08c2e', '#3a7fe0', '#9e3adb'];
    const MILESTONES = [7, 14, 30, 60, 100, 180, 365, 1000];
    function nextMilestone(days) {
        for (let i = 0; i < MILESTONES.length; i++) {
            if (days < MILESTONES[i])
                return { prev: i === 0 ? 0 : MILESTONES[i - 1], target: MILESTONES[i] };
        }
        return { prev: MILESTONES[MILESTONES.length - 1], target: MILESTONES[MILESTONES.length - 1] + 1000 };
    }
    function dayKeyFor(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    const RING_C = 2 * Math.PI * 24; // r=24 (habit card rings)
    const HERO_RING_C = 2 * Math.PI * 33; // r=33 (hero "Today" ring — must match dcHeroRingFg's r in HTML)
    // Real streak = consecutive checked-in days ending today (or yesterday, if today
    // isn't checked in yet). Missing a check-in breaks the chain — the streak no
    // longer just counts elapsed days since the habit was created.
    function dcCurrentStreak(c) {
        const history = c.history || [];
        if (!history.length)
            return 0;
        const set = new Set(history);
        const cursor = new Date();
        cursor.setHours(0, 0, 0, 0);
        if (!set.has(dayKeyFor(cursor))) {
            // Not checked in today yet — don't count today, but don't break the
            // streak either (the day isn't over). Look at yesterday backwards.
            cursor.setDate(cursor.getDate() - 1);
        }
        let streak = 0;
        while (set.has(dayKeyFor(cursor))) {
            streak++;
            cursor.setDate(cursor.getDate() - 1);
        }
        return streak;
    }
    // Completion % over the trailing `days` window (or fewer, if the habit is
    // younger than that window — so a 3-day-old habit isn't unfairly scored
    // against a 30-day denominator).
    function dcCompletionPct(c, days) {
        const history = c.history || [];
        const startDay = new Date(c.startTs);
        startDay.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysSinceStart = Math.floor((+today - +startDay) / 86400000) + 1;
        const denom = Math.max(1, Math.min(days, daysSinceStart));
        const set = new Set(history);
        const cursor = new Date(today);
        let count = 0;
        for (let i = 0; i < denom; i++) {
            if (set.has(dayKeyFor(cursor)))
                count++;
            cursor.setDate(cursor.getDate() - 1);
        }
        return { pct: Math.round((count / denom) * 100), denom: denom };
    }
    function dcUpdateStats(arr) {
        const totalEl = document.getElementById('dcStatTotal');
        const bestEl = document.getElementById('dcStatBest');
        const ringFg = document.getElementById('dcHeroRingFg');
        const ringNum = document.getElementById('dcHeroRingNum');
        const heroEl = document.getElementById('dcHero');
        const statusEl = document.getElementById('dcHeroStatus');
        if (!totalEl)
            return;
        const now = Date.now();
        const tk = todayKey();
        // Countdown cards aren't daily habits — keep them out of the streak hero stats.
        const habitArr = arr.filter(function (c) { return c.type !== 'countdown'; });
        totalEl.textContent = habitArr.length;
        let best = 0;
        habitArr.forEach(function (c) {
            const d = dcCurrentStreak(c);
            if (d > best)
                best = d;
        });
        bestEl.textContent = String(best);
        const checkedToday = habitArr.filter(function (c) { return c.lastCheckin === tk; }).length;
        if (ringNum)
            ringNum.textContent = checkedToday + '/' + habitArr.length;
        if (ringFg) {
            const frac = habitArr.length ? checkedToday / habitArr.length : 0;
            ringFg.style.strokeDasharray = String(HERO_RING_C);
            ringFg.style.strokeDashoffset = String(HERO_RING_C * (1 - frac));
        }
        const isComplete = habitArr.length > 0 && checkedToday === habitArr.length;
        if (heroEl)
            heroEl.classList.toggle('complete', isComplete);
        if (statusEl) {
            if (habitArr.length === 0) {
                statusEl.textContent = 'Add a habit to start your streak';
            }
            else if (isComplete) {
                statusEl.textContent = '🎉 All habits checked in today';
            }
            else {
                const left = habitArr.length - checkedToday;
                statusEl.textContent = left + ' habit' + (left === 1 ? '' : 's') + ' left to check in today';
            }
        }
        if (typeof renderTodayCard === 'function')
            renderTodayCard();
    }
    window.dcRender = function () {
        const list = document.getElementById('dcList');
        const lbl = document.getElementById('dcListLabel');
        const cnt = document.getElementById('dcListCount');
        if (!list)
            return;
        try {
            const arr = dcLoad();
            if (arr.length === 0) {
                if (lbl)
                    lbl.style.display = 'none';
                list.innerHTML = '<div class="dc-empty">'
                    + '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/>'
                    + '<path d="M8 12h8M12 8v8"/></svg>'
                    + '<div class="dc-empty-title">No counters yet</div>'
                    + '<div class="dc-empty-sub">Tap + to start tracking a habit or goal</div></div>';
                dcUpdateStats(arr);
                return;
            }
            if (lbl)
                lbl.style.display = 'flex';
            if (cnt)
                cnt.textContent = arr.length;
            const now = Date.now();
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tk = todayKey();
            dcUpdateStats(arr);
            // Colors are keyed to each habit's original (creation) position, so they
            // stay stable even when pinning/dragging changes display order.
            const colorOf = {};
            arr.forEach(function (c, idx) { colorOf[c.id] = COLORS[idx % COLORS.length]; });
            // Pinned habits float to the top; within each group, order follows the
            // stored array order (which drag-to-reorder rewrites).
            const pinned = arr.filter(function (c) { return !!c.pinned; });
            const unpinned = arr.filter(function (c) { return !c.pinned; });
            const sorted = pinned.concat(unpinned);
            let html = '';
            if (pinned.length) {
                html += '<div class="dc-group-lbl">\uD83D\uDCCC Pinned</div>';
            }
            sorted.forEach(function (c, i) {
                if (pinned.length && i === pinned.length) {
                    html += '<div class="dc-group-lbl">All Habits</div>';
                }
                // ── Countdown cards render completely differently: no streaks, no
                // check-ins — just "how many days until this future date". ──────────
                if (c.type === 'countdown') {
                    const color = colorOf[c.id];
                    const target = new Date(c.startTs);
                    target.setHours(0, 0, 0, 0);
                    const diffDays = daysBetween(today, target);
                    const dateStr = target.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                    let bigNum, unitLbl, subLbl;
                    if (diffDays > 0) {
                        bigNum = diffDays;
                        unitLbl = 'day' + (diffDays === 1 ? '' : 's');
                        subLbl = 'until <b>' + esc(dateStr) + '</b>';
                    }
                    else if (diffDays === 0) {
                        bigNum = '\uD83C\uDF89';
                        unitLbl = 'today';
                        subLbl = 'It\u2019s today!';
                    }
                    else {
                        bigNum = Math.abs(diffDays);
                        unitLbl = 'day' + (Math.abs(diffDays) === 1 ? '' : 's') + ' ago';
                        subLbl = esc(dateStr) + ' has passed';
                    }
                    html += '<div class="dc-card' + (c.pinned ? ' pinned' : '') + '" data-id="' + c.id + '" data-pinned="' + (c.pinned ? '1' : '0') + '" style="--acc:' + color + '">'
                        + '<div class="dc-drag-handle" title="Drag to reorder">'
                        + '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>'
                        + '</div>'
                        + '<div class="dc-card-ring">'
                        + '<svg viewBox="0 0 56 56">'
                        + '<circle class="dc-card-ring-bg" cx="28" cy="28" r="24"/>'
                        + '<circle class="dc-card-ring-fg" cx="28" cy="28" r="24" stroke-dasharray="' + RING_C + '" stroke-dashoffset="0"/>'
                        + '</svg>'
                        + '<div class="dc-card-ring-label">'
                        + '<span class="dc-card-ring-num" style="' + (diffDays === 0 ? 'font-size:20px;' : '') + '">' + bigNum + '</span>'
                        + '<span class="dc-card-ring-unit">' + unitLbl + '</span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="dc-card-main">'
                        + '<div class="dc-card-header">'
                        + '<div class="dc-card-name">' + (c.pinned ? '\uD83D\uDCCC ' : '') + '\uD83D\uDCC5 ' + esc(c.name) + '</div>'
                        + '<div class="dc-card-type countdown">Countdown</div>'
                        + '</div>'
                        + '<div class="dc-card-sub">' + subLbl + '</div>'
                        + (c.note ? '<div class="dc-card-note" title="' + esc(c.note) + '">\uD83D\uDCAD ' + esc(c.note) + '</div>' : '')
                        + '</div>'
                        + '<div class="dc-card-actions">'
                        + '<div class="dc-card-more">'
                        + '<button class="dc-icon-btn dc-more" onclick="dcToggleMenu(event,' + c.id + ')" title="More">'
                        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>'
                        + '</button>'
                        + '<div class="dc-card-menu" id="dcMenu' + c.id + '">'
                        + '<button onclick="dcTogglePin(' + c.id + ')">' + (c.pinned ? '\uD83D\uDCCC Unpin' : '\uD83D\uDCCC Pin to top') + '</button>'
                        + '<button onclick="dcOpenEdit(' + c.id + ')">\u270F\uFE0F Edit</button>'
                        + '<button class="danger" onclick="dcDelete(' + c.id + ')">\u2715 Delete</button>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                    return;
                }
                const days = dcCurrentStreak(c);
                const color = colorOf[c.id];
                const checked = c.lastCheckin === tk;
                const startStr = new Date(c.startTs).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                const typeLabel = c.type === 'build' ? 'Build' : 'Quit';
                const emoji = c.type === 'build' ? '\uD83C\uDF31' : '\uD83D\uDEAB';
                // Ring progress toward next milestone
                const ms = nextMilestone(days);
                const frac = ms.target > ms.prev ? (days - ms.prev) / (ms.target - ms.prev) : 0;
                const dashoff = RING_C * (1 - Math.max(0, Math.min(1, frac)));
                // Week dots (oldest -> newest, 7 days incl. today)
                const history = c.history || [];
                const dowLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                let weekHtml = '';
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(today);
                    d.setDate(today.getDate() - i);
                    const isToday = i === 0;
                    const done = history.indexOf(dayKeyFor(d)) !== -1;
                    weekHtml += '<div class="dc-week-dot' + (done ? ' done' : '') + (isToday ? ' today' : '') + '">' + (done ? '\u2713' : dowLabels[d.getDay()]) + '</div>';
                }
                const week = dcCompletionPct(c, 7);
                const month = dcCompletionPct(c, 30);
                function tier(pct) { return pct >= 80 ? 'hi' : pct >= 50 ? 'mid' : 'lo'; }
                html += '<div class="dc-card' + (c.pinned ? ' pinned' : '') + '" data-id="' + c.id + '" data-pinned="' + (c.pinned ? '1' : '0') + '" style="--acc:' + color + '">'
                    + '<div class="dc-drag-handle" title="Drag to reorder">'
                    + '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>'
                    + '</div>'
                    + '<div class="dc-card-ring">'
                    + '<svg viewBox="0 0 56 56">'
                    + '<circle class="dc-card-ring-bg" cx="28" cy="28" r="24"/>'
                    + '<circle class="dc-card-ring-fg" cx="28" cy="28" r="24" stroke-dasharray="' + RING_C + '" stroke-dashoffset="' + dashoff + '"/>'
                    + '</svg>'
                    + '<div class="dc-card-ring-label">'
                    + '<span class="dc-card-ring-num">' + days + '</span>'
                    + '<span class="dc-card-ring-unit">day' + (days === 1 ? '' : 's') + '</span>'
                    + '</div>'
                    + '</div>'
                    + '<div class="dc-card-main">'
                    + '<div class="dc-card-header">'
                    + '<div class="dc-card-name">' + (c.pinned ? '\uD83D\uDCCC ' : '') + emoji + ' ' + esc(c.name) + '</div>'
                    + '<div class="dc-card-type ' + c.type + '">' + typeLabel + '</div>'
                    + '</div>'
                    + '<div class="dc-card-sub">' + (days === 0 ? ((c.history && c.history.length) ? 'Check in to start a new streak' : 'Started today') : 'Next milestone: <b>' + ms.target + ' days</b>') + ' \u00b7 Since ' + startStr + '</div>'
                    + (c.note ? '<div class="dc-card-note" title="' + esc(c.note) + '">\uD83D\uDCAD ' + esc(c.note) + '</div>' : '')
                    + '<div class="dc-card-pct-row">'
                    + '<span class="dc-pct-pill ' + tier(week.pct) + '">7d <b>' + week.pct + '%</b></span>'
                    + '<span class="dc-pct-pill ' + tier(month.pct) + '">30d <b>' + month.pct + '%</b></span>'
                    + '</div>'
                    + '<div class="dc-week">' + weekHtml + '</div>'
                    + '</div>'
                    + '<div class="dc-card-actions">'
                    + '<button class="dc-icon-btn dc-check' + (checked ? ' done' : '') + '" onclick="dcCheckin(' + c.id + ')" title="' + (checked ? 'Checked in' : 'Check in') + '">'
                    + (checked
                        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
                        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>')
                    + '</button>'
                    + '<div class="dc-card-more">'
                    + '<button class="dc-icon-btn dc-more" onclick="dcToggleMenu(event,' + c.id + ')" title="More">'
                    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>'
                    + '</button>'
                    + '<div class="dc-card-menu" id="dcMenu' + c.id + '">'
                    + '<button onclick="dcTogglePin(' + c.id + ')">' + (c.pinned ? '\uD83D\uDCCC Unpin' : '\uD83D\uDCCC Pin to top') + '</button>'
                    + '<button onclick="dcOpenEdit(' + c.id + ')">\u270F\uFE0F Edit</button>'
                    + '<button onclick="dcReset(' + c.id + ')">\u21bb Reset</button>'
                    + '<button class="danger" onclick="dcDelete(' + c.id + ')">\u2715 Delete</button>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
            });
            list.innerHTML = html;
            dcInitDragHandles();
        }
        catch (e) {
            console.error('[Vikram] dcRender error:', e);
            list.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:40px 24px;text-align:center;">'
                + '<div style="font-size:32px;">⚠️</div>'
                + '<div style="font-size:14px;font-weight:800;color:var(--dtext);">Tracker failed to load</div>'
                + '<button onclick="window.dcRender&&window.dcRender()" style="padding:10px 24px;border-radius:12px;border:none;background:var(--tgon,#1a1a1a);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:\'Nunito\',sans-serif;">Retry</button>'
                + '</div>';
        }
    };
    window.dcTogglePin = function (id) {
        if (typeof haptic === 'function')
            haptic('light');
        const arr = dcLoad();
        const c = arr.find(function (x) { return x.id === id; });
        if (!c)
            return;
        c.pinned = !c.pinned;
        dcSaveAll(arr);
        document.querySelectorAll('.dc-card-menu.open').forEach(function (m) { m.classList.remove('open'); });
        dcRender();
    };
    window.dcToggleMenu = function (e, id) {
        e.stopPropagation();
        document.querySelectorAll('.dc-card-menu.open').forEach(function (m) {
            if (m.id !== 'dcMenu' + id)
                m.classList.remove('open');
        });
        const m = document.getElementById('dcMenu' + id);
        if (m)
            m.classList.toggle('open');
        dcPositionMenu(id);
    };
    document.addEventListener('click', function (e) {
        if (_dcSuppressNextClick) {
            _dcSuppressNextClick = false;
            return;
        }
        if (!e.target.closest('.dc-card-more')) {
            document.querySelectorAll('.dc-card-menu.open').forEach(function (m) { m.classList.remove('open'); });
        }
    });
    // ── Keep the card menu clear of the fixed bottom-nav / FAB — flip it to
    //    open upward instead of downward when it's near the bottom of the
    //    screen (e.g. the last habit in the list), rather than relying on
    //    the user finding extra room to scroll it into view. ──────────────────
    function dcPositionMenu(id) {
        const m = document.getElementById('dcMenu' + id);
        if (!m)
            return;
        m.classList.remove('flip-up');
        if (!m.classList.contains('open'))
            return;
        const wrap = m.closest('.dc-card-more');
        if (!wrap)
            return;
        const wrapRect = wrap.getBoundingClientRect();
        const menuHeight = m.offsetHeight || 150;
        const projectedBottom = wrapRect.top + 30 + menuHeight; // 30 = default top offset
        const nav = document.getElementById('bottomNav');
        const fab = document.getElementById('dcFab');
        let boundary = window.innerHeight;
        if (nav) {
            const r = nav.getBoundingClientRect();
            if (r.top < boundary)
                boundary = r.top;
        }
        if (fab && fab.style.display !== 'none') {
            const r = fab.getBoundingClientRect();
            if (r.top < boundary)
                boundary = r.top;
        }
        if (projectedBottom > boundary - 8) {
            m.classList.add('flip-up');
        }
    }
    // ── Drag-to-reorder (Pointer Events; works for mouse and touch) ──────────
    let _dcDrag = null;
    function dcInitDragHandles() {
        document.querySelectorAll('#dcList .dc-drag-handle').forEach(function (handle) {
            handle.onpointerdown = function (e) { dcDragStart(e, handle); };
        });
        dcInitLongPress();
    }
    // ── Long-press anywhere on a card (except its buttons/handle) opens the
    //    same three-dot menu (Pin to top / Edit / Reset / Delete) ─────────────
    let _dcLongPress = null;
    let _dcSuppressNextClick = false;
    function dcInitLongPress() {
        document.querySelectorAll('#dcList .dc-card').forEach(function (card) {
            card.addEventListener('pointerdown', function (e) {
                if (e.target.closest('.dc-drag-handle,.dc-icon-btn,.dc-card-menu'))
                    return;
                const id = card.getAttribute('data-id');
                clearTimeout(_dcLongPress && _dcLongPress.timer);
                _dcLongPress = {
                    id: id,
                    startX: e.clientX,
                    startY: e.clientY,
                    fired: false,
                    timer: setTimeout(function () {
                        if (!_dcLongPress)
                            return;
                        _dcLongPress.fired = true;
                        _dcSuppressNextClick = true; // the tap-release after this will fire a click — ignore it
                        if (typeof haptic === 'function')
                            haptic('medium');
                        document.querySelectorAll('.dc-card-menu.open').forEach(function (m) {
                            if (m.id !== 'dcMenu' + id)
                                m.classList.remove('open');
                        });
                        const m = document.getElementById('dcMenu' + id);
                        if (m)
                            m.classList.toggle('open');
                        dcPositionMenu(id);
                    }, 480)
                };
            });
            card.addEventListener('pointermove', function (e) {
                if (!_dcLongPress || _dcLongPress.fired)
                    return;
                const dx = Math.abs(e.clientX - _dcLongPress.startX);
                const dy = Math.abs(e.clientY - _dcLongPress.startY);
                if (dx > 8 || dy > 8) {
                    clearTimeout(_dcLongPress.timer);
                    _dcLongPress = null;
                }
            });
            ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (evt) {
                card.addEventListener(evt, function () {
                    if (_dcLongPress) {
                        clearTimeout(_dcLongPress.timer);
                        _dcLongPress = null;
                    }
                });
            });
            // Suppress the native mobile long-press callout/selection menu on the card
            card.addEventListener('contextmenu', function (e) { e.preventDefault(); });
        });
    }
    function dcDragStart(e, handle) {
        e.preventDefault();
        const card = handle.closest('.dc-card');
        if (!card)
            return;
        const list = document.getElementById('dcList');
        document.querySelectorAll('.dc-card-menu.open').forEach(function (m) { m.classList.remove('open'); });
        _dcDrag = { card: card, list: list, startY: e.clientY, pointerId: e.pointerId };
        card.classList.add('dc-dragging');
        try {
            handle.setPointerCapture(e.pointerId);
        }
        catch (err) { }
        document.addEventListener('pointermove', dcDragMove);
        document.addEventListener('pointerup', dcDragEnd);
        document.addEventListener('pointercancel', dcDragEnd);
    }
    function dcDragMove(e) {
        if (!_dcDrag)
            return;
        const dy = e.clientY - _dcDrag.startY;
        const card = _dcDrag.card;
        card.style.transform = 'translateY(' + dy + 'px)';
        const group = card.dataset.pinned;
        let prev = card.previousElementSibling;
        while (prev && (!prev.classList.contains('dc-card') || prev.dataset.pinned !== group))
            prev = prev.previousElementSibling;
        let next = card.nextElementSibling;
        while (next && (!next.classList.contains('dc-card') || next.dataset.pinned !== group))
            next = next.nextElementSibling;
        const cardRect = card.getBoundingClientRect();
        const cardMid = cardRect.top + cardRect.height / 2;
        if (prev) {
            const pr = prev.getBoundingClientRect();
            if (cardMid < pr.top + pr.height / 2) {
                dcDragReposition(e, prev, true);
                return;
            }
        }
        if (next) {
            const nr = next.getBoundingClientRect();
            if (cardMid > nr.top + nr.height / 2) {
                dcDragReposition(e, next, false);
                return;
            }
        }
    }
    function dcDragReposition(e, sib, insertBeforeSib) {
        const card = _dcDrag.card;
        const list = _dcDrag.list;
        const oldVisualTop = card.getBoundingClientRect().top;
        if (insertBeforeSib)
            list.insertBefore(card, sib);
        else
            list.insertBefore(card, sib.nextElementSibling);
        card.style.transform = 'translateY(0px)';
        const newLayoutTop = card.getBoundingClientRect().top;
        const neededDy = oldVisualTop - newLayoutTop;
        _dcDrag.startY = e.clientY - neededDy;
        card.style.transform = 'translateY(' + neededDy + 'px)';
    }
    function dcDragEnd() {
        if (!_dcDrag)
            return;
        const card = _dcDrag.card;
        card.classList.remove('dc-dragging');
        card.style.transform = '';
        document.removeEventListener('pointermove', dcDragMove);
        document.removeEventListener('pointerup', dcDragEnd);
        document.removeEventListener('pointercancel', dcDragEnd);
        // Commit the new visual order back to storage.
        const ids = Array.from(document.querySelectorAll('#dcList .dc-card')).map(function (el) {
            return parseInt(el.dataset.id, 10);
        });
        const arr = dcLoad();
        const byId = {};
        arr.forEach(function (c) { byId[c.id] = c; });
        const reordered = ids.map(function (id) { return byId[id]; }).filter(Boolean);
        // Safety net: include any habit somehow missing from the DOM pass, at the end.
        arr.forEach(function (c) { if (reordered.indexOf(c) === -1)
            reordered.push(c); });
        dcSaveAll(reordered);
        _dcDrag = null;
        dcRender();
    }
    window.dcCheckin = function (id) {
        const arr = dcLoad();
        const c = arr.find(function (x) { return x.id === id; });
        if (!c)
            return;
        const tk = todayKey();
        const wasChecked = c.lastCheckin === tk;
        haptic(wasChecked ? 'light' : 'success');
        c.lastCheckin = wasChecked ? null : tk;
        if (!c.history)
            c.history = [];
        if (wasChecked) {
            c.history = c.history.filter(function (k) { return k !== tk; });
        }
        else if (c.history.indexOf(tk) === -1) {
            c.history.push(tk);
        }
        dcSaveAll(arr);
        dcRender();
        const sheet = document.getElementById('activitySheet');
        if (sheet && sheet.classList.contains('open'))
            renderActivitySheet();
    };
    window.dcReset = function (id) {
        dcShowConfirm('Reset this counter to today? Your current streak will start over.', 'Reset', 'var(--tf)', function () {
            haptic('medium');
            const arr = dcLoad();
            const c = arr.find(function (x) { return x.id === id; });
            if (!c)
                return;
            c.startTs = Date.now();
            c.lastCheckin = null;
            c.history = [];
            dcSaveAll(arr);
            dcRender();
        });
    };
    window.dcDelete = function (id) {
        dcShowConfirm('Delete this counter? This cannot be undone.', 'Delete', '#e0507a', function () {
            haptic('medium');
            const arr = dcLoad();
            const c = arr.find(function (x) { return x.id === id; });
            const removedIdx = arr.findIndex(function (x) { return x.id === id; });
            dcSaveAll(arr.filter(function (x) { return x.id !== id; }));
            dcRender();
            if (c && typeof showUndoSnackbar === 'function') {
                showUndoSnackbar('Habit deleted', function () {
                    const arr2 = dcLoad();
                    arr2.splice(Math.min(removedIdx, arr2.length), 0, c);
                    dcSaveAll(arr2);
                    dcRender();
                });
            }
        });
    };
    // ── Custom confirm modal (replaces window.confirm, which is unreliable in webviews) ──
    let _dcConfirmCb = null;
    window.dcShowConfirm = function (msg, btnLabel, btnColor, cb) {
        const msgEl = document.getElementById('dcConfirmMsg');
        const btnEl = document.getElementById('dcConfirmBtn');
        if (!msgEl || !btnEl) {
            if (cb)
                cb();
            return;
        }
        msgEl.textContent = msg;
        btnEl.textContent = btnLabel;
        btnEl.style.background = btnColor;
        btnEl.style.boxShadow = '0 6px 18px ' + (btnColor.indexOf('#') === 0 ? btnColor + '59' : 'rgba(60,60,70,.3)');
        _dcConfirmCb = cb;
        document.getElementById('dcConfirmOverlay').classList.add('open');
    };
    window.dcConfirmYes = function () {
        document.getElementById('dcConfirmOverlay').classList.remove('open');
        const cb = _dcConfirmCb;
        _dcConfirmCb = null;
        if (cb)
            cb();
    };
    window.dcConfirmClose = function (e) {
        if (e && e.target !== document.getElementById('dcConfirmOverlay'))
            return;
        document.getElementById('dcConfirmOverlay').classList.remove('open');
        _dcConfirmCb = null;
    };
    // ══════════════════════════════════════════════════════════════════════
    // ACTIVITY SHEET — GitHub-style check-in heatmap, opened from the hero card
    // ══════════════════════════════════════════════════════════════════════
    const ACT_WEEKS = 18; // ≈ 4 months of history
    function dcBuildActivityGrid(weeksToShow) {
        const arr = dcLoad();
        const counts = {}; // dayKeyFor() key -> number of habits checked in that day
        arr.forEach(function (c) {
            (c.history || []).forEach(function (k) { counts[k] = (counts[k] || 0) + 1; });
        });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const curSunday = new Date(today);
        curSunday.setDate(today.getDate() - today.getDay());
        const gridStart = new Date(curSunday);
        gridStart.setDate(curSunday.getDate() - (weeksToShow - 1) * 7);
        let totalCheckins = 0;
        const cols = [];
        for (let w = 0; w < weeksToShow; w++) {
            const colDays = [];
            for (let d = 0; d < 7; d++) {
                const day = new Date(gridStart);
                day.setDate(gridStart.getDate() + w * 7 + d);
                const isFuture = day.getTime() > today.getTime();
                const key = dayKeyFor(day);
                const cnt = isFuture ? 0 : (counts[key] || 0);
                if (!isFuture)
                    totalCheckins += cnt;
                colDays.push({ date: day, count: cnt, isFuture: isFuture });
            }
            cols.push(colDays);
        }
        return { cols: cols, totalCheckins: totalCheckins };
    }
    window.openActivitySheet = function () {
        if (typeof haptic === 'function')
            haptic('light');
        renderActivitySheet();
        const sheet = document.getElementById('activitySheet');
        const ov = document.getElementById('ov');
        if (sheet)
            sheet.classList.add('open');
        if (ov)
            ov.classList.add('open');
    };
    window.closeActivitySheet = function () {
        if (typeof haptic === 'function')
            haptic('light');
        const sheet = document.getElementById('activitySheet');
        const ov = document.getElementById('ov');
        if (sheet)
            sheet.classList.remove('open');
        if (ov)
            ov.classList.remove('open');
    };
    function renderActivitySheet() {
        const body = document.getElementById('activitySheetBody');
        if (!body)
            return;
        try {
            const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const DOW_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
            const CELL = 11, GAP = 3;
            const data = dcBuildActivityGrid(ACT_WEEKS);
            const cols = data.cols;
            const colCount = cols.length;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Month labels: one label per calendar month, placed above the first
            // column whose week begins in that month.
            let lastMonth = null;
            const monthLabels = [];
            cols.forEach(function (colDays, idx) {
                const mo = colDays[0].date.getMonth();
                if (mo !== lastMonth) {
                    monthLabels.push({ col: idx, label: MONTH_NAMES[mo] });
                    lastMonth = mo;
                }
            });
            const monthsCount = monthLabels.length;
            let monthsHtml = '';
            cols.forEach(function (_, idx) {
                const m = monthLabels.find(function (x) { return x.col === idx; });
                monthsHtml += '<div class="act-month-lbl">' + (m ? m.label : '') + '</div>';
            });
            let dayLabelsHtml = '';
            DOW_LABELS.forEach(function (l) { dayLabelsHtml += '<div class="act-daylabel">' + l + '</div>'; });
            // NOTE: iterate column-major (week, then day-of-week) to match the
            // act-grid's `grid-auto-flow:column` placement order.
            let gridHtml = '';
            for (let col = 0; col < colCount; col++) {
                for (let row = 0; row < 7; row++) {
                    const day = cols[col][row];
                    if (day.isFuture) {
                        gridHtml += '<div class="act-cell act-future"></div>';
                        continue;
                    }
                    const level = Math.max(0, Math.min(3, day.count));
                    const dateStr = day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                    const title = day.count > 0
                        ? (day.count + ' check-in' + (day.count === 1 ? '' : 's') + ' on ' + dateStr)
                        : ('No check-ins on ' + dateStr);
                    const isToday = day.date.getTime() === today.getTime();
                    const cls = 'act-cell act-l' + level + (isToday ? ' act-today' : '') + (isToday && day.count > 0 ? ' act-checked' : '');
                    gridHtml += '<div class="' + cls + '" title="' + title + '"></div>';
                }
            }
            const total = data.totalCheckins;
            const rs = dcLoadReminderSettings();
            body.innerHTML = ''
                + '<div class="act-card">'
                + '<div class="act-header">'
                + '<div class="act-title">Activity</div>'
                + '<div class="act-sub">' + total + ' check-in' + (total === 1 ? '' : 's') + ' in the last ' + monthsCount + ' month' + (monthsCount === 1 ? '' : 's') + '</div>'
                + '</div>'
                + '<div class="act-scroll">'
                + '<div class="act-graph">'
                + '<div class="act-months-row">'
                + '<div class="act-months-spacer"></div>'
                + '<div class="act-months" style="grid-template-columns:repeat(' + colCount + ',' + CELL + 'px);">' + monthsHtml + '</div>'
                + '</div>'
                + '<div class="act-body-row">'
                + '<div class="act-daylabels" style="grid-template-rows:repeat(7,' + CELL + 'px);gap:' + GAP + 'px;">' + dayLabelsHtml + '</div>'
                + '<div class="act-grid" style="grid-template-columns:repeat(' + colCount + ',' + CELL + 'px);grid-template-rows:repeat(7,' + CELL + 'px);gap:' + GAP + 'px;">' + gridHtml + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="act-legend">'
                + '<span>Less</span>'
                + '<div class="act-cell act-l0"></div>'
                + '<div class="act-cell act-l1"></div>'
                + '<div class="act-cell act-l2"></div>'
                + '<div class="act-cell act-l3"></div>'
                + '<span>More</span>'
                + '</div>'
                + '</div>'
                + '<div class="ssec" style="padding-top:0;">'
                + '<div class="ssect">Reminders</div>'
                + '<div class="srow" style="cursor:pointer;' + (rs.enabled ? '' : 'border-bottom:none;') + '" onclick="dcToggleHabitReminder()">'
                + '<div style="min-width:0;flex:1;">'
                + '<div class="slbl">Evening reminder</div>'
                + '<div class="ssub">Nudge for any habits not yet checked in</div>'
                + '</div>'
                + '<div class="cm-opt-switch' + (rs.enabled ? ' on' : '') + '"><div class="cm-opt-switch-knob"></div></div>'
                + '</div>'
                + (rs.enabled ? ('<div class="srow" style="border-bottom:none;">'
                    + '<div class="slbl">Reminder time</div>'
                    + '<input type="time" value="' + (rs.time || '20:00') + '" onchange="dcSetHabitReminderTime(this.value)" '
                    + 'style="padding:8px 10px;border-radius:10px;border:1.5px solid var(--sbdr);background:var(--sbg);color:var(--dtext);font-size:13px;font-family:\'Nunito\',sans-serif;font-weight:700;"/>'
                    + '</div>') : '')
                + '</div>';
        }
        catch (err) {
            console.error('[Vikram] renderActivitySheet error:', err);
            body.innerHTML = '<div style="padding:32px 18px;text-align:center;color:var(--dsub);font-size:13px;font-weight:700;">Couldn\'t load activity.</div>';
        }
    }
})();
// ══ WORK HOURS TRACKER ══
(function () {
    const WH_KEY = 'vikram_work_hours';
    function whLoad() { try {
        return JSON.parse(localStorage.getItem(WH_KEY)) || {};
    }
    catch (e) {
        return {};
    } }
    function whSaveAll(obj) { try {
        localStorage.setItem(WH_KEY, JSON.stringify(obj));
    }
    catch (e) { } }
    function whDayKey(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    function whTodayKey() { return whDayKey(new Date()); }
    // Week runs Sunday → Saturday (matches Nepal's week).
    function whWeekDates() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dow = today.getDay(); // 0 = Sunday
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - dow + i);
            days.push(d);
        }
        return days;
    }
    function whWeekTotal(data) {
        let total = 0;
        whWeekDates().forEach(function (d) { total += Number(data[whDayKey(d)]) || 0; });
        return total;
    }
    function whFmt(n) {
        n = Math.round(n * 10) / 10;
        return (n % 1 === 0) ? String(n) : String(n);
    }
    window.whRenderCard = function () {
        const card = document.getElementById('whCard');
        if (!card)
            return;
        const data = whLoad();
        const tk = whTodayKey();
        const todayVal = data[tk];
        const totalEl = document.getElementById('whWeekTotal');
        if (totalEl)
            totalEl.textContent = whFmt(whWeekTotal(data)) + 'h this week';
        const row = document.getElementById('whTodayRow');
        if (row) {
            if (todayVal !== undefined && todayVal !== null && todayVal !== '') {
                row.innerHTML =
                    '<div class="wh-logged-row">'
                        + '<span class="wh-logged-txt"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2f9e63" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Today: <b>' + whFmt(todayVal) + 'h</b> worked</span>'
                        + '<button class="wh-edit-btn" onclick="whEditToday(event)" aria-label="Edit hours">'
                        + '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>'
                        + '</button>'
                        + '</div>';
            }
            else {
                row.innerHTML =
                    '<span class="wh-today-label">How many hours today?</span>'
                        + '<input class="wh-input" id="whTodayInput" type="number" inputmode="decimal" min="0" max="24" step="0.5" placeholder="e.g. 8" onkeydown="if(event.key===\'Enter\'){whSaveToday();}">'
                        + '<button class="wh-save-btn" onclick="whSaveToday()">Save</button>';
            }
        }
        const bars = document.getElementById('whWeekBars');
        if (bars) {
            const days = whWeekDates();
            const dowLbls = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            const vals = days.map(function (d) { return Number(data[whDayKey(d)]) || 0; });
            const maxH = Math.max(8, ...vals);
            const tk2 = whTodayKey();
            let html = '';
            days.forEach(function (d, i) {
                const key = whDayKey(d);
                const val = vals[i];
                const isToday = key === tk2;
                const isFuture = d.getTime() > (new Date()).setHours(0, 0, 0, 0);
                const pct = (!isFuture && val > 0) ? Math.max(32, (val / maxH) * 100) : 0;
                const valLabel = (val > 0) ? '<span class="wh-day-val">' + whFmt(val) + '</span>' : '';
                html += '<div class="wh-day">'
                    + '<div class="wh-day-bar-track"><div class="wh-day-bar-fill' + (isToday ? ' today' : '') + '" style="height:' + pct + '%">' + valLabel + '</div></div>'
                    + '<span class="wh-day-lbl' + (isToday ? ' today' : '') + '">' + dowLbls[i] + '</span>'
                    + '</div>';
            });
            bars.innerHTML = html;
        }
    };
    window.whSaveToday = function () {
        const input = document.getElementById('whTodayInput');
        if (!input)
            return;
        let v = parseFloat(input.value);
        if (isNaN(v) || v < 0) {
            input.focus();
            return;
        }
        if (v > 24)
            v = 24;
        const data = whLoad();
        data[whTodayKey()] = v;
        whSaveAll(data);
        if (typeof haptic === 'function')
            haptic('success');
        window.whRenderCard();
    };
    window.whEditToday = function (e) {
        if (e)
            e.stopPropagation();
        if (typeof haptic === 'function')
            haptic('light');
        const data = whLoad();
        const cur = data[whTodayKey()];
        const row = document.getElementById('whTodayRow');
        if (!row)
            return;
        row.innerHTML =
            '<span class="wh-today-label">How many hours today?</span>'
                + '<input class="wh-input" id="whTodayInput" type="number" inputmode="decimal" min="0" max="24" step="0.5" value="' + (cur !== undefined ? cur : '') + '" placeholder="e.g. 8" onkeydown="if(event.key===\'Enter\'){whSaveToday();}">'
                + '<button class="wh-save-btn" onclick="whSaveToday()">Save</button>';
        setTimeout(function () { const el = document.getElementById('whTodayInput'); if (el) {
            el.focus();
            el.select();
        } }, 50);
    };
})();
