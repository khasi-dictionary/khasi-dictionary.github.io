import React, { useMemo, useState } from 'react';
import { Caption, ChoiceRow, Closing, FileButton, FileCard, Header, Link, NavLink, Photos, Route, Routes, Row, Rows, TextField, useLocalState } from './kit';
import { CATEGORIES, ENTRIES, khasiGroup, khasiMatches, localAnswers, localText, normalizeEnglish, normalizeHebrew, normalizeKhasi, type Entry, type Lang } from './vocab';
import hero from './photos/hero.png';
import { OPENSANS_LATIN, OPENSANS_LATIN_RANGE, OPENSANS_HEBREW, OPENSANS_HEBREW_RANGE } from './fonts-data';
import './fonts.css';
import './style.css';

interface Strings {
    language: string; title: string; intro: string; dictionary: string; practice: string; navAria: string;
    wotd: string; search: string; noMatch: string; practiceTitle: string; direction: string;
    kh2local: string; local2kh: string; mix: string; category: string; all: string; roundSize: string;
    start: string; whatMeaning: string; howSay: string; yourAnswer: string; check: string; skip: string;
    next: string; finish: string; correct: string; wrong: string; roundDone: string; newRound: string;
    question: string; of: string; photoLabel: string; photoAlt: string;
    practiceNow: string; dailyPractice: string; settings: string; reviewTitle: string;
    youAnswered: string; mistakesRound: string;
    lifetime: (c: number, total: number) => string;
    closing: (n: number, d: string) => string;
    scoreLine: (c: number, total: number) => string;
    setupSummary: (size: number, cat: string, dir: string) => string;
    includesWotd: (w: string, m: string) => string;
    progressLine: (practiced: number, known: number, total: number) => string;
    stamp: string;
}

const STR: Record<Lang, Strings> = {
    he: {
        language: 'שפה', title: 'מילון קהאסי-עברי',
        intro: 'מילון חי שגדל עם כל מילה חדשה, עם כרטיסיות תרגול בשני הכיוונים.',
        dictionary: 'מילון', practice: 'תרגול', navAria: 'דפים',
        wotd: 'מילת היום', search: 'חיפוש מילה', noMatch: 'לא נמצאה מילה מתאימה.',
        practiceTitle: 'תרגול כרטיסיות', direction: 'כיוון',
        kh2local: 'מקהאסי לעברית', local2kh: 'מעברית לקהאסי', mix: 'מעורב',
        category: 'קטגוריה', all: 'הכול', roundSize: 'מילים בסבב',
        start: 'התחל תרגול', whatMeaning: 'מה המשמעות בעברית?', howSay: 'איך אומרים בקהאסי?',
        yourAnswer: 'התשובה שלך', check: 'בדיקה', skip: 'דילוג', next: 'השאלה הבאה', finish: 'לתוצאה',
        correct: 'נכון!', wrong: 'לא בדיוק.', roundDone: 'הסבב הסתיים!', newRound: 'סבב חדש',
        question: 'שאלה', of: 'מתוך', photoLabel: 'איור להמחשה',
        photoAlt: 'איור של מחברת פתוחה עם אותיות עבריות ולטיניות',
        practiceNow: 'לתרגול עכשיו', dailyPractice: 'תרגול יומי', settings: 'הגדרות תרגול',
        reviewTitle: 'כדאי לחזור על', youAnswered: 'ענית:', mistakesRound: 'סבב טעויות',
        lifetime: (c, total) => `סך הכול: ${c} נכונות מתוך ${total} · המעקב נשמר במכשיר הזה בלבד`,
        closing: (n, d) => `עודכן ב-${d} · ${n} מילים. מילה חדשה נשלחת בוואטסאפ והדף מתעדכן.`,
        scoreLine: (c, total) => `ענית נכון על ${c} מתוך ${total}`,
        setupSummary: (size, cat, dir) => `${size} מילים · ${cat} · ${dir}`,
        includesWotd: (w, m) => `כולל את מילת היום: ${w} · ${m}`,
        progressLine: (p, k, total) => `נתרגלו ${p} מתוך ${total} מילים · ${k} בשליטה`,
        stamp: "© מלאכי גולדשמידט ורייצ'ל ג'ויס לייטפלנג · 2026",
    },
    en: {
        language: 'Language', title: 'Khasi-English Dictionary',
        intro: 'A living dictionary that grows with every new word, with flashcard practice in both directions.',
        dictionary: 'Dictionary', practice: 'Practice', navAria: 'Pages',
        wotd: 'Word of the day', search: 'Search a word', noMatch: 'No matching word.',
        practiceTitle: 'Flashcard practice', direction: 'Direction',
        kh2local: 'Khasi → English', local2kh: 'English → Khasi', mix: 'Mixed',
        category: 'Category', all: 'All', roundSize: 'Words per round',
        start: 'Start practice', whatMeaning: 'What does it mean in English?', howSay: 'How do you say it in Khasi?',
        yourAnswer: 'Your answer', check: 'Check', skip: 'Skip', next: 'Next question', finish: 'See score',
        correct: 'Correct!', wrong: 'Not quite.', roundDone: 'Round complete!', newRound: 'New round',
        question: 'Question', of: 'of', photoLabel: 'Illustration',
        photoAlt: 'Illustration of an open notebook with Hebrew and Latin letters',
        practiceNow: 'Practice now', dailyPractice: 'Daily practice', settings: 'Practice settings',
        reviewTitle: 'Worth reviewing', youAnswered: 'You answered:', mistakesRound: 'Mistakes round',
        lifetime: (c, total) => `All time: ${c} correct out of ${total} · progress is saved on this device only`,
        closing: (n, d) => `Updated ${d} · ${n} words. A new word is sent on WhatsApp and the page is updated.`,
        scoreLine: (c, total) => `You answered ${c} out of ${total} correctly`,
        setupSummary: (size, cat, dir) => `${size} words · ${cat} · ${dir}`,
        includesWotd: (w, m) => `Includes today's word: ${w} · ${m}`,
        progressLine: (p, k, total) => `Practiced ${p} of ${total} words · ${k} mastered`,
        stamp: '© Malachi Goldschmidt & Rachel Joyce Laitflang · 2026',
    },
};

const CAT_STYLE: Record<string, { color: string; emoji: string; enShort: string }> = {
    greetings: { color: '#e2714f', emoji: '👋', enShort: 'Greetings' },
    jingbam: { color: '#d9943a', emoji: '🍲', enShort: 'Jingbam · Food' },
    mrat: { color: '#5f9e6e', emoji: '🐾', enShort: 'Mrat · Animals' },
    furnitures: { color: '#8a7ec8', emoji: '🪑', enShort: 'Furniture' },
    others: { color: '#d3608a', emoji: '🌈', enShort: 'Other' },
    numbers: { color: '#4f8fc9', emoji: '🔢', enShort: 'Numbers' },
    pronouns: { color: '#3aa7a3', emoji: '🧍', enShort: 'Pronouns' },
};

const catName = (id: string, lang: Lang) => {
    const cat = CATEGORIES.find(c => c.id === id);
    if (!cat) return id;
    return lang === 'he' ? cat.he : (CAT_STYLE[id]?.enShort ?? cat.label);
};

const HE_MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const updatedLabel = (lang: Lang): string => {
    const iso = ENTRIES.map(e => e.added).filter(Boolean).sort().pop()!;
    const [y, m, d] = iso.split('-').map(Number);
    return lang === 'he' ? `${d} ב${HE_MONTHS[m - 1]} ${y}` : `${d} ${EN_MONTHS[m - 1]} ${y}`;
};

const wordOfTheDay = (): Entry => {
    const dated = ENTRIES.map((e, i) => ({ e, i })).filter(x => x.e.added)
        .sort((a, b) => (a.e.added === b.e.added ? b.i - a.i : (a.e.added! < b.e.added! ? 1 : -1)));
    return (dated[0]?.e) ?? ENTRIES[0];
};

type CardDir = 'kh2local' | 'local2kh';
const cardKey = (e: Entry, dir: CardDir) => dir + '|' + e.khasi + '|' + e.hebrew;

interface Stats { correct: number; total: number; cards: Record<string, { c: number; w: number }>; }
const EMPTY_STATS: Stats = { correct: 0, total: 0, cards: {} };

function Dictionary({ lang, t, stats }: { lang: Lang; t: Strings; stats: Stats }) {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const q = query.trim();
    const qh = normalizeHebrew(q);
    const qk = normalizeKhasi(q);
    const qe = normalizeEnglish(q);
    const matches = (e: Entry) => !q ||
        (qh.length > 0 && normalizeHebrew(e.hebrew).includes(qh)) ||
        (qe.length > 0 && normalizeEnglish(e.english).includes(qe)) ||
        (qk.length > 0 && normalizeKhasi(e.khasi).includes(qk));
    const anyMatch = ENTRIES.some(matches);
    const wotd = wordOfTheDay();
    const perEntry = new Map<string, { c: number; w: number }>();
    for (const [k, v] of Object.entries(stats.cards)) {
        const id = k.split('|').slice(1).join('|');
        const prev = perEntry.get(id) ?? { c: 0, w: 0 };
        perEntry.set(id, { c: prev.c + v.c, w: prev.w + v.w });
    }
    const practiced = [...perEntry.values()].filter(v => v.c + v.w > 0).length;
    const known = [...perEntry.values()].filter(v => v.c >= 3).length;
    return <>
        <div className="wotd">
            <span className="wotd-spark">✨</span>
            <div className="wotd-body">
                <div className="wotd-label">{t.wotd}</div>
                <div className="wotd-word"><span dir="ltr">{wotd.khasi}</span> · <span dir="auto">{localText(wotd, lang)}</span></div>
            </div>
            <Link className="file-button is-compact" to="/">{t.practiceNow}</Link>
        </div>
        {stats.total > 0 && <Caption>{t.progressLine(practiced, known, ENTRIES.length)}</Caption>}
        <div className="search-wrap"><TextField label={t.search} value={query} onChange={setQuery} /></div>
        {CATEGORIES.map(cat => {
            const rows = ENTRIES.filter(e => e.category === cat.id && matches(e));
            if (!rows.length) return null;
            const cs = CAT_STYLE[cat.id];
            const isOpen = open[cat.id] === true || q.length > 0;
            const label = lang === 'he' ? cat.he : cat.en;
            return <section key={cat.id} className="cat">
                <button type="button" className="cat-head" onClick={() => setOpen(o => ({ ...o, [cat.id]: !isOpen }))} aria-expanded={isOpen}>
                    <span className="fc-chip" style={{ background: cs.color }}>{cs.emoji}</span>
                    <span className="cat-name">{label}</span>
                    <span className="cat-count">{rows.length}</span>
                    <span className={`cat-chevron${isOpen ? ' open' : ''}`}>▾</span>
                </button>
                {isOpen && <Rows>
                    {rows.map(e => <Row key={e.khasi + '|' + e.hebrew} name={localText(e, lang)} value={e.khasi} />)}
                </Rows>}
            </section>;
        })}
        {q.length > 0 && !anyMatch && <Caption>{t.noMatch}</Caption>}
        <Photos label={t.photoLabel} items={[{ src: hero, alt: t.photoAlt }]} />
    </>;
}

interface RoundCard { entry: Entry; dir: CardDir; }
interface Round { deck: RoundCard[]; idx: number; correct: number; results: ('c' | 'w' | 's' | null)[]; answers: (string | null)[]; done: boolean; }

function Practice({ lang, t, stats, setStats, savedStats }: { lang: Lang; t: Strings; stats: Stats; setStats: (s: Stats) => void; savedStats: { ready: boolean; message?: string } }) {
    const [prefs, setPrefs, savedPrefs] = useLocalState('khasi-practice-prefs.v2', { direction: 'kh2local', category: 'all', size: 10 });
    // Default direction: Khasi prompt -> answer in the local language (מקהאסי לעברית). ?? guard covers any stored null.
    const effDirection = prefs.direction ?? 'kh2local';
    const [round, setRound] = useState<Round | null>(null);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState<null | { ok: boolean; expected: string[] }>(null);
    const [showSettings, setShowSettings] = useState(false);

    const pool = useMemo(() => ENTRIES.filter(e => prefs.category === 'all' || e.category === prefs.category), [prefs.category]);
    const current: RoundCard | null = round && !round.done && round.idx < round.deck.length ? round.deck[round.idx] : null;

    const resolveDir = (): CardDir => effDirection === 'mix' ? (Math.random() < 0.5 ? 'kh2local' : 'local2kh') : (effDirection as CardDir);

    const buildDeck = (fromCards?: RoundCard[]) => {
        let deck: RoundCard[];
        if (fromCards && fromCards.length) {
            deck = fromCards.map(rc => ({ entry: rc.entry, dir: resolveDir() }));
        } else {
            const bag = pool.map(e => ({ e, w: 1 / (1 + (stats.cards[cardKey(e, 'kh2local')]?.c ?? 0)) }));
            deck = [];
            const n = Math.min(typeof prefs.size === 'number' ? prefs.size : 10, bag.length);
            const wotd = wordOfTheDay();
            const wotdIdx = bag.findIndex(x => x.e === wotd);
            if (wotdIdx >= 0 && n > 0) {
                deck.push({ entry: bag[wotdIdx].e, dir: resolveDir() });
                bag.splice(wotdIdx, 1);
            }
            while (deck.length < n && bag.length > 0) {
                const totalW = bag.reduce((s, x) => s + x.w, 0);
                let r = Math.random() * totalW;
                let pick = bag.length - 1;
                for (let j = 0; j < bag.length; j++) { r -= bag[j].w; if (r <= 0) { pick = j; break; } }
                deck.push({ entry: bag[pick].e, dir: resolveDir() });
                bag.splice(pick, 1);
            }
        }
        setRound({ deck, idx: 0, correct: 0, results: deck.map(() => null), answers: deck.map(() => null), done: false });
        setAnswer('');
        setFeedback(null);
    };

    const acceptedFor = (entry: Entry, dir: CardDir): { norm: string[]; display: string[] } => {
        if (dir === 'kh2local') {
            const group = khasiGroup(entry);
            return {
                norm: [...new Set(group.flatMap(e => localAnswers(e, lang)))],
                display: [...new Set(group.map(e => localText(e, lang)))],
            };
        }
        const group = khasiMatches(entry, lang);
        return {
            norm: [...new Set(group.map(e => normalizeKhasi(e.khasi)))],
            display: [...new Set(group.map(e => e.khasi))],
        };
    };

    const check = () => {
        if (!current || feedback) return;
        const { norm, display } = acceptedFor(current.entry, current.dir);
        const normalized = current.dir === 'kh2local'
            ? (lang === 'he' ? normalizeHebrew(answer) : normalizeEnglish(answer))
            : normalizeKhasi(answer);
        const ok = normalized.length > 0 && norm.includes(normalized);
        setFeedback({ ok, expected: display });
        setRound(r => r ? {
            ...r,
            correct: r.correct + (ok ? 1 : 0),
            results: r.results.map((x, i) => (i === r.idx ? (ok ? 'c' as const : 'w' as const) : x)),
            answers: r.answers.map((x, i) => (i === r.idx ? answer : x)),
        } : r);
        if (savedStats.ready) {
            const key = cardKey(current.entry, current.dir);
            const prev = stats.cards[key] ?? { c: 0, w: 0 };
            setStats({
                correct: stats.correct + (ok ? 1 : 0),
                total: stats.total + 1,
                cards: { ...stats.cards, [key]: ok ? { c: prev.c + 1, w: prev.w } : { c: prev.c, w: prev.w + 1 } },
            });
        }
    };

    const advance = (mark?: 's') => {
        setRound(r => {
            if (!r) return r;
            const results = mark ? r.results.map((x, i) => (i === r.idx ? 's' as const : x)) : r.results;
            return r.idx + 1 >= r.deck.length ? { ...r, results, done: true } : { ...r, results, idx: r.idx + 1 };
        });
        setAnswer('');
        setFeedback(null);
    };

    const resetPrefs = (patch: Partial<{ direction: string; category: string; size: number }>) => {
        if (!savedPrefs.ready) return;
        setPrefs({ ...prefs, ...patch });
        setRound(null);
        setAnswer('');
        setFeedback(null);
    };

    const cs = current ? CAT_STYLE[current.entry.category] : null;
    const prompt = current ? (current.dir === 'kh2local' ? current.entry.khasi : localText(current.entry, lang)) : '';
    const isLast = round ? round.idx + 1 >= round.deck.length : false;
    const misses = round ? round.deck.map((rc, i) => ({ rc, i })).filter(x => round.results[x.i] === 'w' || round.results[x.i] === 's') : [];
    const dirLabel = effDirection === 'mix' ? t.mix : (effDirection === 'kh2local' ? t.kh2local : t.local2kh);
    const catSummary = prefs.category === 'all' ? t.all : catName(prefs.category, lang);

    return <>
        {!round && <>
            <div className="start-card">
                <div className="start-emoji">⚡</div>
                <div className="start-title">{t.dailyPractice}</div>
                <div className="start-summary">{t.setupSummary(typeof prefs.size === 'number' ? prefs.size : 10, catSummary, dirLabel)}</div>
                <div className="start-wotd">✨ {t.includesWotd(wordOfTheDay().khasi, localText(wordOfTheDay(), lang))}</div>
                <FileButton variant="primary" onClick={() => buildDeck()}>{t.start}</FileButton>
            </div>
            <button type="button" className="settings-toggle" onClick={() => setShowSettings(s => !s)} aria-expanded={showSettings}>
                {t.settings} <span className={`cat-chevron${showSettings ? ' open' : ''}`}>▾</span>
            </button>
            {showSettings && <>
                <ChoiceRow label={t.direction} options={[
                    { value: 'kh2local', label: t.kh2local },
                    { value: 'local2kh', label: t.local2kh },
                    { value: 'mix', label: t.mix },
                ]} value={effDirection} onChange={v => resetPrefs({ direction: v })} />
                <ChoiceRow label={t.category} options={[{ value: 'all', label: t.all }, ...CATEGORIES.map(c => ({ value: c.id, label: `${CAT_STYLE[c.id].emoji} ${catName(c.id, lang)}` }))]} value={prefs.category} onChange={v => resetPrefs({ category: v })} />
                <ChoiceRow label={t.roundSize} options={[{ value: '5', label: '5' }, { value: '10', label: '10' }, { value: '15', label: '15' }]} value={String(prefs.size ?? 10)} onChange={v => resetPrefs({ size: parseInt(v, 10) })} />
            </>}
        </>}
        {round && <div className="fc-card" style={cs && !round.done ? { background: cs.color + '14', borderColor: cs.color + '66' } : undefined}
            onKeyDown={e => { if (e.key === 'Enter') { if (feedback) { advance(); } else if (current) { check(); } } }}>
            {round.done ? (
                <div className="fc-score">
                    <div className="fc-score-emoji">{round.correct / round.deck.length >= 0.8 ? '🎉' : '💪'}</div>
                    <div className="fc-score-title">{t.roundDone}</div>
                    <div className="fc-score-num">{round.correct}<span className="fc-score-of">/{round.deck.length}</span></div>
                    <div className="fc-score-line">{t.scoreLine(round.correct, round.deck.length)}</div>
                    {misses.length > 0 && <div className="fc-review">
                        <div className="fc-review-title">{t.reviewTitle}:</div>
                        {misses.map(({ rc, i }) => {
                            const correctText = acceptedFor(rc.entry, rc.dir).display.join(' · ');
                            const promptText = rc.dir === 'kh2local' ? rc.entry.khasi : localText(rc.entry, lang);
                            return <div key={i} className="fc-review-row">
                                <span dir="auto">{promptText}</span>: <span className="fc-review-correct" dir="auto">{correctText}</span>
                                {round.answers[i] ? <span className="fc-review-yours"> ({t.youAnswered} {round.answers[i]})</span> : null}
                            </div>;
                        })}
                    </div>}
                    <div className="fc-actions">
                        <FileButton variant="primary" onClick={() => buildDeck()}>{t.newRound}</FileButton>
                        {misses.length > 0 && <FileButton variant="secondary" onClick={() => buildDeck(misses.map(m => m.rc))}>{t.mistakesRound}</FileButton>}
                    </div>
                </div>
            ) : current ? <>
                <div className="fc-progress">{round.deck.map((rc, i) => (
                    <span key={i} className={`fc-seg ${round.results[i] ?? ''}${i === round.idx ? ' cur' : ''}`} />
                ))}</div>
                <div className="fc-eyebrow">
                    <span className="fc-chip" style={{ background: cs!.color }}>{cs!.emoji} {catName(current.entry.category, lang)}</span>
                    <span>{t.question} {round.idx + 1} {t.of} {round.deck.length} · {current.dir === 'kh2local' ? t.whatMeaning : t.howSay}</span>
                </div>
                <div className="fc-prompt" dir="auto">{prompt}</div>
                <TextField label={t.yourAnswer} value={answer} onChange={setAnswer} />
                {feedback && <p role="status" className={feedback.ok ? 'fc-ok' : 'fc-bad'}>
                    {feedback.ok ? `✅ ${t.correct}` : `❌ ${t.wrong}`} <span className="fc-expected" dir="auto">{feedback.expected.join(' · ')}</span>
                </p>}
                <div className="fc-actions">
                    {feedback
                        ? <FileButton variant="primary" onClick={() => advance()}>{isLast ? t.finish : t.next}</FileButton>
                        : <FileButton variant="primary" onClick={check} disabled={!answer.trim()}>{t.check}</FileButton>}
                    {!feedback && <FileButton variant="secondary" onClick={() => advance('s')}>{t.skip}</FileButton>}
                </div>
            </> : null}
        </div>}
        <Caption>{t.lifetime(stats.correct, stats.total)}</Caption>
        {savedStats.message ? <Caption>{savedStats.message}</Caption> : null}
        {savedPrefs.message ? <Caption>{savedPrefs.message}</Caption> : null}
    </>;
}

const OPENSANS_CSS = '@font-face{font-family:\'Open Sans\';font-style:normal;font-weight:300 800;font-display:swap;src:url(data:font/woff2;base64,' + OPENSANS_LATIN + ') format(\'woff2\');unicode-range:' + OPENSANS_LATIN_RANGE + '}@font-face{font-family:\'Open Sans\';font-style:normal;font-weight:300 800;font-display:swap;src:url(data:font/woff2;base64,' + OPENSANS_HEBREW + ') format(\'woff2\');unicode-range:' + OPENSANS_HEBREW_RANGE + '}';

export function App() {
    const [langRaw, setLang, savedLang] = useLocalState('khasi-dict-lang.v1', 'he');
    const [stats, setStats, savedStats] = useLocalState('khasi-practice-stats.v1', EMPTY_STATS);
    const lang: Lang = langRaw === 'en' ? 'en' : 'he';
    const t = STR[lang];
    return <FileCard>
        <div dir={lang === 'he' ? 'rtl' : 'ltr'} className="khasi-page">
            <style>{OPENSANS_CSS}</style>
            <Header title={t.title} intro={t.intro} />
            <ChoiceRow label={t.language} options={[{ value: 'he', label: 'עברית' }, { value: 'en', label: 'English' }]} value={lang} onChange={v => { if (savedLang.ready) setLang(v); }} />
            {savedLang.message ? <Caption>{savedLang.message}</Caption> : null}
            <nav className="file-nav" aria-label={t.navAria}><NavLink to="/" end>{t.practice}</NavLink><NavLink to="/dictionary">{t.dictionary}</NavLink></nav>
            <Routes>
                <Route path="/" element={<Practice lang={lang} t={t} stats={stats} setStats={setStats} savedStats={savedStats} />} />
                <Route path="/practice" element={<Practice lang={lang} t={t} stats={stats} setStats={setStats} savedStats={savedStats} />} />
                <Route path="/dictionary" element={<Dictionary lang={lang} t={t} stats={stats} />} />
            </Routes>
            <Closing>{t.closing(ENTRIES.length, updatedLabel(lang))}</Closing>
            <div className="stamp">{t.stamp}</div>
        </div>
    </FileCard>;
}
