import React, { createContext, useContext, useEffect, useState } from 'react';

const RouterCtx = createContext('/');
const usePath = () => useContext(RouterCtx);
const getPath = () => {
    const h = window.location.hash.replace(/^#/, '');
    return h.startsWith('/') ? h : '/';
};

export function FileRouter({ children }: { children?: React.ReactNode }) {
    const [path, setPath] = useState(getPath);
    useEffect(() => {
        const on = () => setPath(getPath());
        window.addEventListener('hashchange', on);
        return () => window.removeEventListener('hashchange', on);
    }, []);
    return <RouterCtx.Provider value={path}>{children}</RouterCtx.Provider>;
}
export function Routes({ children }: { children?: React.ReactNode }) {
    const path = usePath();
    let match: React.ReactElement | null = null;
    React.Children.forEach(children, (c) => {
        if (match || !React.isValidElement(c)) return;
        if ((c.props as any).path === path) match = c as React.ReactElement;
    });
    if (!match) React.Children.forEach(children, (c) => {
        if (match || !React.isValidElement(c)) return;
        if ((c.props as any).path === '/') match = c as React.ReactElement;
    });
    return <>{match ? (match.props as any).element : null}</>;
}
export function Route(_props: { path: string; element: React.ReactNode }) { return null; }
export function Link({ to, className, children }: { to: string; className?: string; children?: React.ReactNode }) {
    return <a className={className} href={'#' + to}>{children}</a>;
}
export function NavLink({ to, end, children }: { to: string; end?: boolean; children?: React.ReactNode }) {
    const path = usePath();
    const active = end ? path === to : path === to || path.startsWith(to + '/');
    return <a href={'#' + to} aria-current={active ? 'page' : undefined}>{children}</a>;
}
export function FileCard({ children }: { children?: React.ReactNode }) {
    return <div className="file-card">{children}</div>;
}
export function Header({ title, intro }: { title: string; intro?: string }) {
    return <header className="hdr"><h1>{title}</h1>{intro ? <p className="hdr-intro">{intro}</p> : null}</header>;
}
export function Closing({ children }: { children?: React.ReactNode }) {
    return <footer className="closing">{children}</footer>;
}
export function Caption({ children }: { children?: React.ReactNode }) {
    return <p className="caption">{children}</p>;
}
export function Rows({ children }: { children?: React.ReactNode }) {
    return <div className="rows">{children}</div>;
}
export function Row({ name, value }: { name: React.ReactNode; value: React.ReactNode }) {
    return <div className="row"><span className="row-name" dir="auto">{name}</span><span className="row-value" dir="auto">{value}</span></div>;
}
export function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return <label className="tf"><span className="tf-label">{label}</span>
        <input className="tf-input" type="text" value={value} onChange={e => onChange(e.target.value)} /></label>;
}
export function ChoiceRow({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
    return <div className="choice"><div className="choice-label">{label}</div>
        <div className="choice-opts">{options.map(o =>
            <button key={o.value} type="button" className={'choice-opt' + (o.value === value ? ' sel' : '')} onClick={() => onChange(o.value)}>{o.label}</button>)}
        </div></div>;
}
export function FileButton({ variant, onClick, disabled, children }: { variant?: string; onClick?: () => void; disabled?: boolean; children?: React.ReactNode }) {
    return <button type="button" className={'fb fb-' + (variant || 'secondary')} onClick={onClick} disabled={disabled}>{children}</button>;
}
export function Photos({ items, label }: { items: { src: string; alt: string }[]; label: string }) {
    return <figure className="photos" aria-label={label}>{items.map((it, i) => <img key={i} src={it.src} alt={it.alt} />)}</figure>;
}
export function useLocalState<T>(key: string, initial: T): [T, (v: T) => void, { ready: boolean; message: string | null }] {
    const [value, setValue] = useState<T>(() => {
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initial;
        } catch { return initial; }
    });
    const set = (v: T) => {
        setValue(v);
        try { window.localStorage.setItem(key, JSON.stringify(v)); } catch { }
    };
    return [value, set, { ready: true, message: null }];
}
