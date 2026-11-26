import {ENTRIES,localAnswers,normalizeHebrew} from './src/vocab';
import assert from 'node:assert/strict';
assert.equal(ENTRIES.length,103);
const s=ENTRIES.find(e=>e.khasi==='Sohbaingon')!;
assert.equal(s.hebrew,'חציל');
for (const a of ['חציל','חצילים']) assert(localAnswers(s,'he').includes(normalizeHebrew(a)),'missing '+a);
assert(!localAnswers(s,'he').includes(normalizeHebrew('חצילת')));
console.log('PASS: Sohbaingon accepts חציל + חצילים, display stays חציל');
