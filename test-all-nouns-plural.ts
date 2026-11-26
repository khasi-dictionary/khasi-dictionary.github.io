import {ENTRIES,localAnswers,normalizeHebrew,hebrewAnswers} from './src/vocab';
import assert from 'node:assert/strict';
assert.equal(ENTRIES.length,103);
const NOUN_CATS=new Set(['jingbam','mrat','nature','furnitures','homekitchen']);
const he=(k:string,c:string)=>{const e=ENTRIES.find(x=>x.khasi===k&&x.category===c)!;return localAnswers(e,'he');};
const ok=(k:string,c:string,a:string)=>assert(he(k,c).includes(normalizeHebrew(a)),`${k} must accept ${a}`);
const no=(k:string,c:string,a:string)=>assert(!he(k,c).includes(normalizeHebrew(a)),`${k} must NOT accept ${a}`);
// Irregulars (exact plurals, generic suppressed)
ok('Meij','furnitures','שולחנות'); no('Meij','furnitures','שולחנים'); no('Meij','furnitures','שולחןות');
ok('Soh','jingbam','פירות'); no('Soh','jingbam','פריים'); no('Soh','jingbam','פריות');
ok('Sngi','nature','ימים'); no('Sngi','nature','יוםים');
ok('Pylleng','jingbam','ביצים'); ok('Pylleng','jingbam','ביצות');
// Regular plurals via generic rules (suffix, ה->ות, ת->ות, ם->מים)
ok('Miaow','mrat','חתולים'); ok('Ksiew','mrat','כלבים'); ok('Masi','mrat','פרות');
ok('Klat','homekitchen','כוסות'); ok('Jingkhang','homekitchen','דלתות');
ok('Tari','homekitchen','סכינים'); ok('Shamoit','homekitchen','כפות'); ok('Shamoit','homekitchen','כפיות');
ok('Deing','nature','עצים'); ok('Slap','nature','גשמים'); ok('Sohbaingon','jingbam','חצילים');
ok('Shuki','furnitures','כיסאות'); ok('Jingthiah','furnitures','מיטות');
ok('Ruti','jingbam','לחמים'); ok('Sngi','nature','שמשות'); ok('Bnai','nature','ירחים'); ok('Bnai','nature','חודשים');
ok('Pla','homekitchen','שקיות'); ok('Pla','homekitchen','תיקים'); ok('lyoh','nature','עננים');
// Non-noun categories: no plural tolerance
no('Bam','others','לאכולים'); no('Bang','adjectives','טעימים'); no('Khriat','adjectives','קרים');
no('Wei','numbers','אחדים'); no('Nga','pronouns','אניים');
// Greetings keep their curated pairs (not affected by the rule)
ok('Khublei','greetings','תודות'); ok('Map','greetings','סליחות');
// Coverage sweep: every single-word, not-already-plural Hebrew answer of every noun-category entry gains at least one plural form
let swept=0;
for (const e of ENTRIES.filter(x=>NOUN_CATS.has(x.category))) {
  const ans=localAnswers(e,'he');
  for (const base of hebrewAnswers(e.hebrew)) {
    if (base.includes(' ')||base.endsWith('ים')||base.endsWith('ות')) continue;
    const irregular=new Set(['פירות','שולחנות','ימים','ביצים','ביצות']);
    const plurals=ans.filter(a=>a!==base&&((a.startsWith(base.slice(0,-1))||a.startsWith(base.slice(0,2)))&&a.length>base.length||irregular.has(a)));
    assert(plurals.length>0,`${e.khasi}: no plural form accepted for base '${base}'`);
    swept++;
  }
}
console.log(`PASS: 103 entries, plural acceptance for all noun categories, irregulars exact, non-nouns unchanged (${swept} base forms swept)`);
