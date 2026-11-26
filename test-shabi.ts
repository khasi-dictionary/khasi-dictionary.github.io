import {ENTRIES,localAnswers,normalizeHebrew} from './src/vocab';
import assert from 'node:assert/strict';
assert.equal(ENTRIES.length,104);
const s=ENTRIES.find(e=>e.khasi==='Shabi')!;
assert.equal(s.hebrew,'מפתח'); assert.equal(s.category,'homekitchen'); assert.equal(s.added,'2026-11-25');
assert(localAnswers(s,'he').includes(normalizeHebrew('מפתח')));
assert(localAnswers(s,'he').includes(normalizeHebrew('מפתחות')),'plural via noun rule');
assert.equal(ENTRIES.filter(e=>e.added).sort((a,b)=>b.added!.localeCompare(a.added!))[0].khasi,'Shabi');
console.log('PASS: 104 entries, Shabi = מפתח (25.11, homekitchen), מפתחות accepted, WOTD = Shabi');
