Build: esbuild src/main.tsx --bundle --outfile=dist/bundle.js --loader:.png=file --asset-names='[name]' --jsx=automatic
Then copy dist/* to repo root. Deps: react, react-dom (npm). vocab.ts is shared with the Instinct File project.
