/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

/* ---------- brand CTA button + rainbow section-seam rule ---------- */
function Button({ variant, size = 'md', type = 'button', style, rightIcon, children, ...props }) {
  const h = size === 'sm' ? 40 : size === 'lg' ? 54 : 46;
  const pad = size === 'sm' ? '0 20px' : size === 'lg' ? '0 30px' : '0 24px';
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 16 : 15;
  return (
    <button type={type} style={{
      height: h, padding: pad, borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      background: 'var(--gradient-brand)', color: 'var(--text-on-brand)',
      font: `800 ${fontSize}px/1 var(--font-display)`, fontStyle: 'italic',
      letterSpacing: '.03em', textTransform: 'uppercase', boxShadow: 'var(--shadow-glow-green)',
      ...style,
    }} {...props}>
      {children}{rightIcon}
    </button>
  );
}
function RainbowRule() {
  return <div style={{ height: 2, borderRadius: 999, background: 'var(--gradient-rainbow)' }} />;
}

/* ---------- lifestyle photo with brand grade ---------- */
function PhotoFrame({ src, alt, grade, caption, style, className }) {
  return (
    <div className={'photo-frame' + (className ? ' ' + className : '')} style={{ '--grade': grade, ...style }}>
      <img src={src} alt={alt || caption || ''} />
      {caption && <span className="photo-cap">{caption}</span>}
    </div>
  );
}

/* ---------- scroll reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#top"><img src="assets/darte-logo-secondary.webp" alt="DARTE" /></a>
        <div className="soon-badge">
          <span className="soon-dot" />
          Coming Soon
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="#waitlist">
            <Button variant="gradient" size="sm">Join the wait list</Button>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <header id="top" style={{ position: 'relative', overflow: 'hidden', paddingTop: 40,
      background: 'radial-gradient(120% 88% at 50% -12%, #061a34 0%, #00070f 60%, #00040b 100%)' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h1 className="display reveal in" style={{
          fontSize: 'clamp(40px, 6.4vw, 82px)', fontWeight: 900, color: 'var(--text-strong)',
          margin: '8px auto 0', maxWidth: 1000, lineHeight: 0.94, textWrap: 'balance',
        }}>
          Your AI concierge for <span style={{ color: 'var(--brand)' }}>real-world experiences.</span>
        </h1>
        {/* lockup on solid dark ground — static, no glow/motion behind it */}
        <img className="hero-lockup reveal in" src="assets/darte-lockup-primary.webp" alt="DARTE — One App. Fast Plans."
          style={{ width: 'min(680px, 82vw)', margin: '10px auto 0' }} />

        {/* phones */}
        <div className="reveal" style={{ display: 'flex', gap: 'clamp(14px,3vw,44px)', justifyContent: 'center', alignItems: 'center', margin: '46px 0 8px', flexWrap: 'wrap' }}>
          <div style={{ transform: 'rotate(-4deg)' }}><PhoneFrame glow="aqua"><ScreenshotScreen src="assets/app-map.jpeg" alt="DARTE map view" /></PhoneFrame></div>
          <div style={{ transform: 'rotate(4deg)' }}><PhoneFrame glow="green"><ScreenshotScreen src="assets/app-chat-home.jpeg" alt="DARTE chat home screen" /></PhoneFrame></div>
        </div>

        {/* single CTA */}
        <div id="waitlist" style={{ maxWidth: 540, margin: '40px auto 0', scrollMarginTop: 90 }}>
          <div className="reveal" style={{ font: '700 clamp(18px,2.4vw,23px)/1.25 var(--font-display)', fontStyle: 'italic', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
            Join the wait list — be the first to experience Darte
          </div>
          {sent ? (
            <div style={{ padding: '18px 20px', borderRadius: 14, background: 'var(--surface-1)', border: '1px solid var(--brand)', color: 'var(--text-strong)', font: '600 15px/1.4 var(--font-body)' }}>
              You’re on the list. Darte’s got the rest.
            </div>
          ) : (
            <form className="reveal" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSent(true); }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ flex: '1 1 240px', display: 'flex', alignItems: 'center', gap: 10, height: 54, padding: '0 18px', borderRadius: 12, background: 'var(--surface-1)', border: '1px solid var(--border-default)' }}>
                <Icon name="mail" size={20} color="var(--text-muted)" />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="you@email.com"
                  style={{ flex: 1, minWidth: 0, background: 'none', border: 'none', outline: 'none', color: 'var(--text-strong)', font: '400 16px/1 var(--font-body)' }} />
              </span>
              <Button type="submit" variant="gradient" size="lg" style={{ height: 54, flex: '0 0 auto' }}>Get early access</Button>
            </form>
          )}
        </div>
      </div>
      {/* human presence — people actually out living the DARTE night */}
      <div className="wrap reveal" style={{ position: 'relative', zIndex: 2, marginTop: 'clamp(48px,7vw,88px)' }}>
        <PhotoFrame src="assets/hero-band.webp" alt="Friends gathered for an outdoor dinner at night"
          grade="#C24DFF" caption="Your night — already handled"
          style={{ height: 'clamp(220px, 30vw, 380px)', borderRadius: 20 }} />
      </div>
      <div style={{ maxWidth: 1200, margin: '84px auto 0', padding: '0 32px' }}><RainbowRule /></div>
    </header>
  );
}

/* ---------- WHAT DARTE DOES + acronym ---------- */
function WhatDarte() {
  const rows = [
    { L: 'D', word: 'ining', color: 'var(--cat-dining)', icon: 'utensils', sub: 'Restaurants & Bars' },
    { L: 'A', word: 'ttractions', color: 'var(--cat-attractions)', icon: 'ferris-wheel', sub: 'Theme & Water Parks, Museums & Beaches' },
    { L: 'R', word: 'eservations', color: 'var(--cat-reservations)', icon: 'calendar-check', sub: 'Clubs, Shows & Events' },
    { L: 'T', word: 'ransportation', color: 'var(--cat-transportation)', icon: 'car-front', sub: 'Taxi, Transfers, & Rentals' },
    { L: 'E', word: 'ntertainment', color: 'var(--cat-entertainment)', icon: 'party-popper', sub: 'Concerts, Professional Sports & Museums' },
  ];
  return (
    <section className="sec-pad sec-light">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h2 className="display reveal" style={{ fontSize: 'clamp(40px,7vw,88px)', color: '#07130a', margin: '0 auto', lineHeight: 0.92, textWrap: 'balance' }}>
          What Darte does
        </h2>
        <p className="reveal" style={{ font: '500 clamp(19px,2.4vw,28px)/1.45 var(--font-body)', color: '#26332b', maxWidth: 820, margin: '20px auto 0', textWrap: 'balance' }}>
          Darte simplifies booking, dining, attractions, reservations, and transportation into
          <span style={{ color: '#0c8f00', fontWeight: 700 }}> one intelligent planning experience.</span>
        </p>

        {/* one photo per headline category — real people living each one */}
        <div className="what-photos reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 980, margin: '44px auto 0' }}>
          <PhotoFrame src="assets/cat-dining.webp" alt="A busy dining hall with people at tables" grade="var(--cat-dining)" caption="Dining" style={{ height: 260 }} />
          <PhotoFrame src="assets/cat-attractions.webp" alt="Friends at an outdoor attraction" grade="var(--cat-attractions)" caption="Attractions" style={{ height: 260 }} />
          <PhotoFrame src="assets/cat-entertainment.webp" alt="A live entertainment crowd" grade="var(--cat-entertainment)" caption="Entertainment" style={{ height: 260 }} />
        </div>

        <div className="force-dark" style={{ display: 'grid', gap: 12, maxWidth: 780, margin: '52px auto 0' }}>
          {rows.map((r, i) => (
            <div key={r.L} className="reveal" style={{
              display: 'flex', alignItems: 'center', gap: 20, padding: '16px 22px',
              borderRadius: 16, background: 'var(--surface-1)', border: '1px solid var(--border-subtle)',
              borderLeft: `3px solid ${r.color}`, textAlign: 'left',
              transitionDelay: `${i * 60}ms`,
            }}>
              <span className="display" style={{ lineHeight: 0.9, color: 'var(--text-strong)', flex: '1 1 auto', minWidth: 0 }}>
                <span className="acr-initial" style={{ color: r.color, fontSize: 'clamp(30px,5vw,52px)' }}>{r.L}</span><span style={{ fontSize: 'clamp(22px,3.4vw,38px)' }}>{r.word}</span>
              </span>
              <span style={{ display: 'none', font: '400 13px/1.35 var(--font-body)', color: 'var(--text-muted)', textAlign: 'right', maxWidth: 220, flexShrink: 1 }} className="acr-sub">{r.sub}</span>
              <Icon name={r.icon} size={26} color={r.color} style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- APPS → DARTE converging graphic ---------- */
function neonArrow(x1, y1, x2, y2, color, key) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const ah = 30, aw = 17;
  const bx = x2 - Math.cos(ang) * ah, by = y2 - Math.sin(ang) * ah;
  const lx = bx - Math.sin(ang) * aw, ly = by + Math.cos(ang) * aw;
  const rx = bx + Math.sin(ang) * aw, ry = by - Math.cos(ang) * aw;
  return (
    <g key={key} filter="url(#neon)">
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth="7" strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} fill={color} />
    </g>
  );
}

function AppTile({ ic, label, color }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 18px 12px 12px', borderRadius: 16,
      background: 'var(--surface-1)', border: `1px solid color-mix(in srgb, ${color} 45%, var(--border-default))`,
      boxShadow: `0 8px 26px -14px ${color}, inset 0 0 24px -18px ${color}` }}>
      <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: `color-mix(in srgb, ${color} 16%, var(--surface-2))`, border: `1px solid color-mix(in srgb, ${color} 55%, transparent)` }}>
        <Icon name={ic} size={22} color={color} />
      </span>
      <span style={{ font: '700 15px/1.15 var(--font-body)', color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

function Problem() {
  const G = '#15BF00', O = '#FF7A1A';
  const apps = [
    { ic: 'map-pin', label: 'Maps', color: '#21B8FF' },
    { ic: 'car-front', label: 'Uber', color: '#00E0C6' },
    { ic: 'utensils', label: 'OpenTable', color: '#FF7A1A' },
    { ic: 'ticket', label: 'Ticketmaster', color: '#C24DFF' },
  ];
  return (
    <section className="sec-pad" style={{ background: 'var(--bg-sunken)' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 960, margin: '0 auto' }}>
          <h2 className="display reveal" style={{ fontSize: 'clamp(46px,8vw,104px)', color: 'var(--text-strong)', margin: '0 auto', lineHeight: 0.9 }}>
            The Problem
          </h2>
          <p className="reveal" style={{ font: '500 clamp(19px,2.6vw,30px)/1.35 var(--font-body)', color: 'var(--text-body)', margin: '22px auto 0', maxWidth: 820, textWrap: 'balance' }}>
            Planning a night out shouldn’t require five apps, ten tabs, and a dozen dead-end searches.
          </p>
        </div>

        <h3 className="display reveal" style={{ textAlign: 'center', fontSize: 'clamp(30px,5vw,60px)', color: 'var(--brand)', lineHeight: 0.95, margin: 'clamp(56px,8vw,88px) auto 0', textWrap: 'balance' }}>
          The Darte Solution
        </h3>

        {/* ---- DESKTOP converging band ---- */}
        <div className="converge-desktop reveal" style={{ position: 'relative', maxWidth: 1000, margin: '36px auto 0' }}>
          <svg viewBox="0 0 1000 380" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
            <defs>
              <filter id="neon" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {neonArrow(254, 106, 372, 146, G, 'a1')}
            {neonArrow(254, 274, 372, 234, G, 'a2')}
            {neonArrow(746, 106, 628, 146, O, 'a3')}
            {neonArrow(746, 274, 628, 234, O, 'a4')}
          </svg>
          {/* corner tiles */}
          <div style={{ position: 'absolute', left: '15%', top: '18.4%', transform: 'translate(-50%,-50%)' }}><AppTile {...apps[0]} /></div>
          <div style={{ position: 'absolute', left: '15%', top: '81.6%', transform: 'translate(-50%,-50%)' }}><AppTile {...apps[1]} /></div>
          <div style={{ position: 'absolute', left: '85%', top: '18.4%', transform: 'translate(-50%,-50%)' }}><AppTile {...apps[2]} /></div>
          <div style={{ position: 'absolute', left: '85%', top: '81.6%', transform: 'translate(-50%,-50%)' }}><AppTile {...apps[3]} /></div>
          {/* center DARTE mark */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '15%', aspectRatio: '1', borderRadius: 26,
            boxShadow: '0 0 50px -6px #15bf0088, 0 0 0 1px #2be01555' }}>
            <img src="assets/darte-app-icon.webp" alt="DARTE" style={{ width: '100%', height: '100%', borderRadius: 26 }} />
          </div>
        </div>

        {/* ---- MOBILE stacked ---- */}
        <div className="converge-mobile reveal" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', gap: 16, margin: '48px auto 0' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}><AppTile {...apps[0]} /><AppTile {...apps[2]} /></div>
          <Icon name="arrow-down" size={28} color="#15BF00" />
          <img src="assets/darte-app-icon.webp" alt="DARTE" style={{ width: 96, height: 96, borderRadius: 22, boxShadow: '0 0 44px -8px #15bf0088' }} />
          <Icon name="arrow-up" size={28} color="#FF7A1A" />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}><AppTile {...apps[1]} /><AppTile {...apps[3]} /></div>
        </div>

        <p className="reveal" style={{ textAlign: 'center', font: '500 clamp(16px,2vw,22px)/1.5 var(--font-body)', color: 'var(--text-muted)', margin: '36px auto 0', maxWidth: 680, textWrap: 'balance' }}>
          Darte does not replace existing platforms. <span style={{ color: 'var(--text-strong)' }}>It connects them.</span>
        </p>
      </div>
    </section>
  );
}

/* ---------- SOLUTION — animated chat ---------- */
const USER_MSG = 'find me dinner and something fun tonight';

function SolutionChat() {
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState('typing'); // typing -> thinking -> reply
  const boxRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let timers = [];
    function run() {
      setTyped(''); setPhase('typing');
      let i = 0;
      function typeChar() {
        if (cancelled) return;
        i++;
        setTyped(USER_MSG.slice(0, i));
        if (i < USER_MSG.length) timers.push(setTimeout(typeChar, 55));
        else timers.push(setTimeout(() => { setPhase('thinking'); timers.push(setTimeout(() => setPhase('reply'), 1400)); timers.push(setTimeout(run, 7000)); }, 500));
      }
      timers.push(setTimeout(typeChar, 700));
    }
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  useEffect(() => { if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight; }, [typed, phase]);

  return (
    <PhoneFrame glow="green" style={{ width: 320, height: 640 }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 18px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
          <img src="assets/darte-app-icon.webp" alt="" style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--brand)' }} />
          <div>
            <div className="display" style={{ fontSize: 16, color: 'var(--brand)', lineHeight: 1 }}>DARTE</div>
            <div style={{ font: '500 10px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 3 }}>AI Concierge · Online</div>
          </div>
        </div>

        <div ref={boxRef} style={{ flex: 1, overflow: 'hidden', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* user bubble */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '82%', padding: '11px 15px', borderRadius: '16px 4px 16px 16px', background: 'var(--brand)', color: 'var(--text-on-brand)', font: '400 14px/1.45 var(--font-body)', minHeight: 20 }}>
            {typed}{phase === 'typing' && <span className="caret">|</span>}
          </div>

          {phase === 'thinking' && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 5, padding: '13px 16px', borderRadius: '4px 16px 16px 16px', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
              <span className="dot" style={{ animationDelay: '0ms' }} />
              <span className="dot" style={{ animationDelay: '160ms' }} />
              <span className="dot" style={{ animationDelay: '320ms' }} />
            </div>
          )}

          {phase === 'reply' && (
            <div className="reply-in" style={{ alignSelf: 'flex-start', maxWidth: '92%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: '11px 15px', borderRadius: '4px 16px 16px 16px', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)', font: '400 14px/1.5 var(--font-body)' }}>
                Say less. Here’s your night — dinner, then a show, ride timed in between.
              </div>
              <ItinLine icon="utensils" color="var(--cat-dining)" title="Capa Terrace" sub="Rooftop dining · 7:30 PM · table held" />
              <ItinLine icon="car-front" color="var(--cat-transportation)" title="Ride booked" sub="UberX · picks you up 9:05 PM" />
              <ItinLine icon="party-popper" color="var(--cat-entertainment)" title="Moonlit Jazz" sub="Live set · 9:30 PM · 2 seats" />
              <button style={{ marginTop: 2, height: 46, borderRadius: 12, border: 'none', cursor: 'pointer', background: 'var(--gradient-brand)', color: 'var(--text-on-brand)', font: '800 15px/1 var(--font-display)', fontStyle: 'italic', letterSpacing: '.03em', textTransform: 'uppercase', boxShadow: 'var(--shadow-glow-green)' }}>
                Book all three — one tap
              </button>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

function ItinLine({ icon, color, title, sub }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 13px', borderRadius: 14, background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderLeft: `3px solid ${color}` }}>
      <span style={{ width: 34, height: 34, borderRadius: 9, background: `${color}1f`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={17} color={color} />
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ font: '700 13px/1.2 var(--font-body)', color: 'var(--text-strong)' }}>{title}</div>
        <div style={{ font: '400 11px/1.3 var(--font-body)', color: 'var(--text-muted)' }}>{sub}</div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', icon: 'message-square', title: 'Ask.', sub: 'Tell Darte what you’re in the mood for — in plain words.', color: 'var(--cat-attractions)', size: 'clamp(24px,3vw,32px)', mw: 440 },
    { n: '02', icon: 'sparkles', title: 'DARTE Recommends.', sub: 'It reads your vibe and lines up a complete, timed plan.', color: 'var(--cat-reservations)', size: 'clamp(28px,3.8vw,42px)', mw: 560 },
    { n: '03', icon: 'check-check', title: 'You Book!', sub: 'Dinner, tickets, and a ride — confirmed within one app.', color: 'var(--brand)', size: 'clamp(36px,5vw,58px)', mw: 680 },
  ];
  const [notifIn, setNotifIn] = useState(false);
  const diffRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setNotifIn(false); setTimeout(() => setNotifIn(true), 400); }
    }, { threshold: 0.4 });
    if (diffRef.current) io.observe(diffRef.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className="sec-pad" id="how-it-works">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <span className="eyebrow reveal" style={{ fontSize: 'clamp(18px,2.2vw,26px)', letterSpacing: '.14em' }}>How it works</span>
        <h2 className="display reveal" style={{ fontSize: 'clamp(46px,8vw,104px)', color: 'var(--text-strong)', margin: '14px auto 0', lineHeight: 0.94 }}>
          Ask.<br />DARTE Recommends.<br />You Book!
        </h2>
        <p className="reveal" style={{ font: '600 var(--text-lg)', color: 'var(--text-strong)', maxWidth: 620, margin: '22px auto 0', textWrap: 'balance' }}>
          No tabs, no toggling. One conversation turns a vague idea into a night that’s proactively planned.
        </p>

        <div className="reveal" style={{ margin: '54px auto 8px', display: 'flex', justifyContent: 'center' }}><SolutionChat /></div>

        {/* three steps — centered, pyramid by size, color-coded */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(28px,4vw,44px)', marginTop: 'clamp(56px,8vw,96px)' }}>
          {steps.map((s, i) => (
            <div key={s.n} className="reveal" style={{ maxWidth: s.mw, width: '100%', transitionDelay: `${i * 110}ms`,
              padding: 'clamp(20px,3vw,30px) clamp(26px,4vw,40px)', borderRadius: 18,
              background: `color-mix(in srgb, ${s.color} 13%, var(--surface-1))`,
              border: `1px solid color-mix(in srgb, ${s.color} 42%, var(--border-subtle))`,
              boxShadow: `0 12px 34px -20px ${s.color}` }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <Icon name={s.icon} size={26} color={s.color} />
                <span className="display" style={{ fontSize: 15, color: s.color, letterSpacing: '.06em' }}>{s.n}</span>
              </div>
              <div className="display" style={{ fontSize: s.size, color: s.color, lineHeight: 0.98 }}>{s.title}</div>
              <div style={{ font: '400 clamp(14px,1.7vw,18px)/1.5 var(--font-body)', color: 'var(--text-muted)', marginTop: 8 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- THE DARTE DIFFERENCE — same section, visually delineated sub-block ---- */}
      <div className="wrap" style={{ marginTop: 'clamp(72px,10vw,120px)' }}>
        <RainbowRule />
      </div>
      <div ref={diffRef} className="wrap" style={{ position: 'relative', marginTop: 'clamp(56px,8vw,88px)', padding: 'clamp(32px,5vw,56px) clamp(24px,4vw,48px)',
        borderRadius: 24, background: 'color-mix(in srgb, var(--darte-green) 7%, var(--surface-1))',
        border: '1px solid color-mix(in srgb, var(--darte-green) 30%, var(--border-subtle))', overflow: 'hidden' }}>
        <div className="glow-green" style={{ width: 460, height: 460, top: '-20%', left: -140, background: 'var(--darte-green)', opacity: 0.5 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(32px,7vw,100px)', alignItems: 'center', position: 'relative', zIndex: 1 }} id="pro-grid">
          <div className="reveal" style={{ justifySelf: 'center' }}>
            <PhoneFrame glow="green"><LockScreen notifIn={notifIn} /></PhoneFrame>
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="eyebrow reveal" style={{ color: 'var(--accent)', fontSize: 'clamp(18px,2.2vw,26px)', letterSpacing: '.14em' }}>The Darte difference</span>
            <h3 className="display reveal" style={{ fontSize: 'clamp(32px,4.8vw,60px)', color: 'var(--text-strong)', margin: '16px 0 20px', lineHeight: 0.98, textWrap: 'balance' }}>
              Darte suggests <span style={{ color: 'var(--brand)' }}>before you ask.</span>
            </h3>
            <p className="reveal" style={{ font: 'var(--text-xl)', color: 'var(--text-body)', maxWidth: 500, marginBottom: 22 }}>
              Most apps wait for a search. Darte is proactive — it knows your taste, reads the moment, and surfaces the plan before it crosses your mind.
            </p>
            {/* the key differentiator, called out with real visual weight */}
            <div className="reveal" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', maxWidth: 520, margin: '0 0 22px',
              padding: '18px 20px', borderRadius: 16, background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-glow-green)' }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,0,0,.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check-check" size={24} color="var(--text-on-brand)" />
              </span>
              <div>
                <div style={{ font: '800 18px/1.2 var(--font-display)', fontStyle: 'italic', color: 'var(--text-on-brand)', textTransform: 'uppercase', letterSpacing: '.01em' }}>
                  It doesn’t just recommend. It books it.
                </div>
                <div style={{ font: '500 14px/1.5 var(--font-body)', color: 'var(--text-on-brand)', marginTop: 4 }}>
                  A general AI chatbot stops at a suggestion. Darte completes the booking — table, tickets, ride — done, not just described.
                </div>
              </div>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 500 }}>
              {[
                { ic: 'radar', t: 'Reads the moment', d: 'Time, location, and your vibe — Darte connects them in the background.' },
                { ic: 'zap', t: 'Suggests, not searches', d: 'The right place, table, and ride arrive as one tappable plan.' },
              ].map(x => (
                <div key={x.t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-1)', border: '1px solid var(--border-default)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={x.ic} size={20} color="var(--brand)" />
                  </span>
                  <div>
                    <div style={{ font: '700 16px/1.2 var(--font-body)', color: 'var(--text-strong)' }}>{x.t}</div>
                    <div style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--text-muted)', marginTop: 2 }}>{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER CTA ---------- */
function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}><RainbowRule /></div>
      <div className="wrap sec-pad" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div className="glow-green" style={{ width: 820, height: 820, top: -380, left: '50%', transform: 'translateX(-50%)', background: 'var(--darte-green)', opacity: 0.2, filter: 'blur(160px)' }} />
        <div className="reveal" style={{ position: 'relative', width: 76, height: 76, margin: '0 auto 22px' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: -34, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,191,0,0.45) 0%, rgba(21,191,0,0) 70%)', filter: 'blur(22px)', zIndex: 0 }} />
          <img src="assets/darte-app-icon.webp" alt="" style={{ position: 'relative', zIndex: 1, display: 'block', width: 76, height: 76, borderRadius: 20, border: '2px solid var(--brand)' }} />
        </div>
        <h2 className="display reveal" style={{ fontSize: 'clamp(30px,5vw,60px)', color: 'var(--text-strong)', lineHeight: 0.98, margin: '0 auto 10px', maxWidth: 720 }}>
          One app. Fast plans. <span style={{ color: 'var(--brand)' }}>Be first in line.</span>
        </h2>
        <p className="reveal" style={{ font: 'var(--text-lg)', color: 'var(--text-muted)', margin: '0 auto 28px', maxWidth: 460 }}>
          Join the wait list — be the first to experience Darte.
        </p>
        <a href="#waitlist" className="reveal" style={{ display: 'inline-block' }}>
          <Button variant="gradient" size="lg" rightIcon={<Icon name="arrow-right" size={20} color="var(--text-on-brand)" />}>Join the wait list</Button>
        </a>
        <div style={{ marginTop: 60, display: 'flex', justifyContent: 'center' }}>
          <img src="assets/darte-logo-secondary.webp" alt="DARTE" style={{ height: 52, opacity: 0.92 }} />
        </div>
        <div style={{ font: '400 13px/1.5 var(--font-body)', color: 'var(--text-faint)', marginTop: 18 }}>© 2026 DARTE · One App. Fast Plans.</div>
      </div>
    </footer>
  );
}

/* ---------- APP ---------- */
function App() {
  useReveal();
  useEffect(() => { document.documentElement.setAttribute('data-theme', 'dark'); }, []);
  return (
    <>
      <Nav />
      <Hero />
      <WhatDarte />
      <Problem />
      <HowItWorks />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('darte-root')).render(<App />);
