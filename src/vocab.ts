export interface Category { id: string; label: string; he: string; en: string; }
export interface Entry { khasi: string; hebrew: string; english: string; category: string; added?: string; }

export const CATEGORIES: Category[] = [
    { id: 'greetings', label: 'Greetings', he: 'ברכות', en: 'Greetings' },
    { id: 'jingbam', label: 'Jingbam', he: 'Jingbam · אוכל', en: 'Jingbam · Food' },
    { id: 'mrat', label: 'Mrat (Animals)', he: 'Mrat · חיות', en: 'Mrat · Animals' },
    { id: 'furnitures', label: 'Furnitures', he: 'רהיטים', en: 'Furnitures' },
    { id: 'others', label: 'Others', he: 'שונות', en: 'Others' },
    { id: 'numbers', label: 'Numbers', he: 'מספרים', en: 'Numbers' },
    { id: 'pronouns', label: 'Pronouns', he: 'כינויי גוף', en: 'Pronouns' },
    { id: 'adjectives', label: 'Adjectives', he: 'שמות תואר', en: 'Adjectives' },
];

export const ENTRIES: Entry[] = [
    { khasi: 'Thiah suk', hebrew: 'לילה טוב (מילולית: תישן טוב)', english: 'Good night (literally: sleep well)', category: 'greetings' },
    { khasi: 'Kumno', hebrew: 'שלום (פונה) / איך? (מילולית)', english: 'Hello (greeting) / How? (literally)', category: 'greetings' },
    { khasi: 'Kumne', hebrew: 'שלום (משיב) / ככה (מילולית)', english: 'Hello (response) / Like this (literally)', category: 'greetings' },
    { khasi: 'Khublei', hebrew: 'תודה', english: 'Thank you', category: 'greetings' },
    { khasi: 'Map', hebrew: 'סליחה', english: 'Sorry / excuse me', category: 'greetings' },

    { khasi: 'Jingbam', hebrew: 'אוכל', english: 'Food', category: 'jingbam' },
    { khasi: 'Doh syiar', hebrew: 'עוף', english: 'Chicken meat', category: 'jingbam' },
    { khasi: 'Doh masi', hebrew: 'בשר פרה', english: 'Beef', category: 'jingbam' },
    { khasi: 'Doh kha', hebrew: 'דג/בשר דג', english: 'Fish / fish meat', category: 'jingbam' },
    { khasi: 'Jhur', hebrew: 'ירקות', english: 'Vegetables', category: 'jingbam' },
    { khasi: 'Ja', hebrew: 'אורז', english: 'Rice', category: 'jingbam' },
    { khasi: 'Sha', hebrew: 'תה', english: 'Tea', category: 'jingbam' },
    { khasi: 'Ruti', hebrew: 'לחם', english: 'Bread', category: 'jingbam' },
    { khasi: 'Pylleng', hebrew: "ביצה/חביתה/וכו'", english: 'Egg / omelette etc.', category: 'jingbam' },
    { khasi: 'Phan', hebrew: 'תפו"א', english: 'Potato', category: 'jingbam' },
    { khasi: 'Kajor', hebrew: 'גזר', english: 'Carrot', category: 'jingbam' },
    { khasi: 'Um', hebrew: 'מים', english: 'Water', category: 'jingbam' },
    { khasi: 'Dud', hebrew: 'חלב', english: 'Milk', category: 'jingbam' },
    { khasi: 'Soh', hebrew: 'פרי', english: 'Fruit', category: 'jingbam' },
    { khasi: 'Sohsaw', hebrew: 'עגבניה', english: 'Tomato', category: 'jingbam' },
    { khasi: 'Kait', hebrew: 'בננה', english: 'Banana', category: 'jingbam' },
    { khasi: 'Sohkhia', hebrew: 'מלפפון', english: 'Cucumber', category: 'jingbam' },
    { khasi: 'Piat', hebrew: 'בצל', english: 'Onion', category: 'jingbam', added: '2026-10-23' },
    { khasi: 'Rynsun', hebrew: 'שום', english: 'Garlic', category: 'jingbam', added: '2026-10-24' },

    { khasi: 'Mrat', hebrew: 'חיות', english: 'Animals', category: 'mrat' },
    { khasi: 'Miaow', hebrew: 'חתול', english: 'Cat', category: 'mrat' },
    { khasi: 'Ksiew', hebrew: 'כלב', english: 'Dog', category: 'mrat' },
    { khasi: 'Syiar', hebrew: 'תרנגול', english: 'Chicken', category: 'mrat' },
    { khasi: 'Masi', hebrew: 'פרה', english: 'Cow', category: 'mrat' },
    { khasi: 'Doh Kha', hebrew: 'דג', english: 'Fish', category: 'mrat' },
    { khasi: 'Sim', hebrew: 'ציפור', english: 'Bird', category: 'mrat' },

    { khasi: 'Meij', hebrew: 'שולחן', english: 'Table', category: 'furnitures' },
    { khasi: 'Jingthiah', hebrew: 'מיטה', english: 'Bed', category: 'furnitures' },
    { khasi: 'Jingkhang', hebrew: 'דלת', english: 'Door', category: 'furnitures', added: '2026-10-25' },
    { khasi: 'Shuki', hebrew: 'כיסא', english: 'Chair', category: 'furnitures' },
    { khasi: 'Pliang', hebrew: 'צלחת / צלחות', english: 'plate / plates', category: 'others', added: '2026-10-26' },
    { khasi: 'Proh', hebrew: 'מזלג', english: 'fork', category: 'others', added: '2026-10-28' },
    { khasi: 'Tari', hebrew: 'סכין/סכינים', english: 'knife / knives', category: 'others', added: '2026-10-29' },
    { khasi: 'Jrong', hebrew: 'גבוה/ארוך', english: 'tall / long', category: 'adjectives' },
    { khasi: 'Sat', hebrew: 'חריף', english: 'spicy', category: 'adjectives', added: '2026-10-27' },

    { khasi: 'Syntiew', hebrew: 'פרחים', english: 'Flowers', category: 'others' },
    { khasi: 'Thiah', hebrew: 'לישון', english: 'To sleep', category: 'others' },
    { khasi: 'khang', hebrew: 'סגור/סגורה', english: 'Closed', category: 'others' },
    { khasi: 'Doh', hebrew: 'נשיקה', english: 'Kiss', category: 'others' },
    { khasi: 'Deing', hebrew: 'עץ', english: 'Tree', category: 'others' },
    { khasi: 'Saw', hebrew: 'אדום', english: 'Red', category: 'others' },
    { khasi: 'Khia', hebrew: 'כבד', english: 'Heavy', category: 'others' },
    { khasi: 'Nga', hebrew: 'אני', english: 'I', category: 'pronouns' },
    { khasi: 'Ieit', hebrew: 'אהבה', english: 'Love', category: 'others' },
    { khasi: 'Ia phi', hebrew: 'אותך/בשבילך/עבורך/לך', english: 'You / for you / to you', category: 'pronouns' },

    { khasi: 'Wei', hebrew: '1', english: '1', category: 'numbers' },
    { khasi: 'Ar', hebrew: '2', english: '2', category: 'numbers' },
    { khasi: 'Lai', hebrew: '3', english: '3', category: 'numbers' },
    { khasi: 'Saw', hebrew: '4', english: '4', category: 'numbers' },
    { khasi: 'San', hebrew: '5', english: '5', category: 'numbers' },
    { khasi: 'Hynriew', hebrew: '6', english: '6', category: 'numbers' },
    { khasi: 'Hynñiew', hebrew: '7', english: '7', category: 'numbers' },
    { khasi: 'Phra', hebrew: '8', english: '8', category: 'numbers' },
    { khasi: 'Khyndai', hebrew: '9', english: '9', category: 'numbers' },
    { khasi: 'Shiphew', hebrew: '10', english: '10', category: 'numbers' },
];

export type Lang = 'he' | 'en';

const stripMarks = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

export function normalizeKhasi(s: string): string {
    return stripMarks(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function normalizeHebrew(s: string): string {
    return s
        .replace(/[״"„”]/g, '"')
        .replace(/[׳'‘’`]/g, "'")
        .replace(/\([^)]*\)/g, ' ')
        .replace(/["'.?,!;:،־-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export function normalizeEnglish(s: string): string {
    return s
        .toLowerCase()
        .replace(/\([^)]*\)/g, ' ')
        .replace(/["'.,?!;:()-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export function hebrewAnswers(hebrew: string): string[] {
    const out = new Set<string>();
    const noParen = hebrew.replace(/\([^)]*\)/g, ' ');
    for (const source of [hebrew, noParen]) {
        // Accept the full displayed string too, with or without a trailing וכו, not only single alternatives.
        const full = normalizeHebrew(source);
        if (full) out.add(full);
        const fullNoEtc = normalizeHebrew(source.replace(/וכו'?\s*$/, ''));
        if (fullNoEtc) out.add(fullNoEtc);
        for (const part of source.split('/')) {
            const cleaned = normalizeHebrew(part.replace(/וכו'?\s*$/, ''));
            if (cleaned) out.add(cleaned);
        }
    }
    return [...out];
}

export function englishAnswers(english: string): string[] {
    const out = new Set<string>();
    const noParen = english.replace(/\([^)]*\)/g, ' ');
    for (const source of [english, noParen]) {
        // Accept the full displayed string too, with or without a trailing "etc.", not only single alternatives.
        const full = normalizeEnglish(source);
        if (full) out.add(full);
        const fullNoEtc = normalizeEnglish(source.replace(/\betc\.?\s*$/, ''));
        if (fullNoEtc) out.add(fullNoEtc);
        for (const part of source.split('/')) {
            const cleaned = normalizeEnglish(part.replace(/\betc\.?\s*$/, ''));
            if (cleaned) out.add(cleaned);
        }
    }
    return [...out];
}

// Extra accepted answers beyond the displayed gloss: full-word forms of abbreviations,
// user-validated aliases, number words and singular/plural variants of plural glosses.
// Keyed by khasi + category so homograph entries (Saw = red vs Saw = 4) stay separate.
const EXTRA_ANSWERS: Record<string, { he?: string[]; en?: string[] }> = {
    'Thiah suk|greetings': { he: ['תישן טוב'] },
    'Doh syiar|jingbam': { he: ['בשר עוף'] },
    'Doh masi|jingbam': { he: ['בשר'] },
    'Ieit|others': { he: ['אוהב', 'אוהבת'] },
    'Phan|jingbam': { he: ['תפוח אדמה', 'תפוחי אדמה', 'תפוד'], en: ['potatoes'] },
    'Jhur|jingbam': { he: ['ירק'], en: ['vegetable'] },
    'Syntiew|others': { he: ['פרח'], en: ['flower'] },
    'Thiah|others': { he: ['שינה'] },
    'Wei|numbers': { he: ['אחד', 'אחת'], en: ['one'] },
    'Ar|numbers': { he: ['שניים', 'שתיים'], en: ['two'] },
    'Lai|numbers': { he: ['שלוש', 'שלושה'], en: ['three'] },
    'Saw|numbers': { he: ['ארבע', 'ארבעה'], en: ['four'] },
    'San|numbers': { he: ['חמש', 'חמישה'], en: ['five'] },
    'Hynriew|numbers': { he: ['שש', 'שישה'], en: ['six'] },
    'Hynñiew|numbers': { he: ['שבע', 'שבעה'], en: ['seven'] },
    'Phra|numbers': { he: ['שמונה'], en: ['eight'] },
    'Khyndai|numbers': { he: ['תשע', 'תשעה'], en: ['nine'] },
    'Shiphew|numbers': { he: ['עשר', 'עשרה'], en: ['ten'] },
};

export function localAnswers(entry: Entry, lang: Lang): string[] {
    const base = lang === 'he' ? hebrewAnswers(entry.hebrew) : englishAnswers(entry.english);
    const norm = lang === 'he' ? normalizeHebrew : normalizeEnglish;
    const extra = EXTRA_ANSWERS[`${entry.khasi}|${entry.category}`];
    const extraList = (lang === 'he' ? extra?.he : extra?.en) ?? [];
    return [...new Set([...base, ...extraList.map(norm)])];
}

export function localText(entry: Entry, lang: Lang): string {
    return lang === 'he' ? entry.hebrew : entry.english;
}

// Every entry whose local-language text is exactly this entry's (for local -> kh accept list)
export function khasiMatches(entry: Entry, lang: Lang): Entry[] {
    const text = localText(entry, lang);
    return ENTRIES.filter(e => localText(e, lang) === text);
}

// Every entry sharing this Khasi spelling (case/diacritic-insensitive), for kh -> local accept list
export function khasiGroup(entry: Entry): Entry[] {
    const key = normalizeKhasi(entry.khasi);
    return ENTRIES.filter(e => normalizeKhasi(e.khasi) === key);
}
