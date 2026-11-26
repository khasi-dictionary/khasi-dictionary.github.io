import {ENTRIES,localAnswers,normalizeHebrew} from './src/vocab';
import assert from 'node:assert/strict';
assert.equal(ENTRIES.length,105);
const i=ENTRIES.find(e=>e.khasi==='Iong')!;
assert.equal(i.hebrew,'שחור'); assert.equal(i.category,'adjectives'); assert.equal(i.added,'2026-11-26');
assert(localAnswers(i,'he').includes(normalizeHebrew('שחור')));
assert(!localAnswers(i,'he').includes(normalizeHebrew('שחורים')),'adjectives: no plural rule');
assert.equal(ENTRIES.filter(e=>e.added).sort((a,b)=>b.added!.localeCompare(a.added!))[0].khasi,'Iong');
console.log('PASS: 105 entries, Iong = שחור (26.11, adjectives), שחור accepted, no noun-plural leak, WOTD = Iong');
