/* global React */
const { useEffect, useRef, useState } = React;

/* ---------- Lucide icon helper ---------- */
function Icon({ name, size = 22, stroke = 2, color = 'currentColor', style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: { width: size, height: size, stroke: color, 'stroke-width': stroke },
        nameAttr: 'data-lucide', root: ref.current,
      });
    }
  }, [name, size, stroke, color]);
  return <span ref={ref} style={{ display: 'inline-flex', lineHeight: 0, color, ...style }} />;
}

/* ---------- iPhone frame ---------- */
function PhoneFrame({ children, style = {}, glow = 'green' }) {
  const glowColor = glow === 'aqua' ? 'var(--darte-aqua)' : 'var(--darte-green)';
  return (
    <div style={{
      position: 'relative', width: 300, height: 620, flexShrink: 0,
      borderRadius: 46, padding: 11,
      background: 'linear-gradient(150deg,#2b3550,#0a1122 60%)',
      boxShadow: `0 40px 90px -20px #000c, 0 0 0 1px #ffffff14, 0 0 60px -18px ${glowColor}88`,
      ...style,
    }}>
      <div className="force-dark" style={{
        position: 'relative', width: '100%', height: '100%',
        borderRadius: 36, overflow: 'hidden',
        background: 'var(--darte-charcoal)',
        border: '1px solid #ffffff10',
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)',
          width: 104, height: 26, borderRadius: 999, background: '#000', zIndex: 20,
        }} />
        {children}
      </div>
    </div>
  );
}

function StatusBar({ dark = false }) {
  const c = dark ? '#0b1324' : '#fff';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '13px 24px 0', height: 44, color: c,
      font: '600 15px/1 var(--font-body)', position: 'relative', zIndex: 10,
    }}>
      <span style={{ letterSpacing: '.02em' }}>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="signal" size={16} color={c} />
        <Icon name="wifi" size={16} color={c} />
        <Icon name="battery-full" size={20} color={c} />
      </span>
    </div>
  );
}

/* ---------- Full-bleed real app screenshot ---------- */
function ScreenshotScreen({ src, alt }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

/* ---------- Category tile ---------- */
function CatTile({ icon, label, color }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 8px',
      borderRadius: 14, background: 'var(--surface-1)',
      border: '1px solid #ffffff12',
      boxShadow: `inset 0 0 22px -12px ${color}`,
      position: 'relative', overflow: 'hidden', minWidth: 0,
    }}>
      <span style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 90% at 100% 100%, ${color}22, transparent 60%)` }} />
      <Icon name={icon} size={20} color={color} />
      <span style={{ display: 'block', width: '100%', font: '600 10px/1.15 var(--font-body)', letterSpacing: '-.02em', color: 'var(--text-strong)', overflowWrap: 'anywhere', wordBreak: 'break-word', hyphens: 'auto' }}>{label}</span>
    </div>
  );
}

/* ---------- SCREEN 1: Chat home ---------- */
function ChatHomeScreen() {
  const cats = [
    { icon: 'utensils', label: 'Dining', color: 'var(--cat-dining)' },
    { icon: 'ferris-wheel', label: 'Attractions', color: 'var(--cat-attractions)' },
    { icon: 'calendar-check', label: 'Reservations', color: 'var(--cat-reservations)' },
    { icon: 'car-front', label: 'Transport', color: 'var(--cat-transportation)' },
    { icon: 'party-popper', label: 'Entertainment', color: 'var(--cat-entertainment)' },
    { icon: 'bed-double', label: 'Hotels', color: 'var(--cat-hotels)' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <StatusBar />
      <div style={{ padding: '6px 18px 0', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <img src="assets/darte-app-icon.jpg" alt="" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--brand)' }} />
          <div>
            <div className="display" style={{ fontSize: 20, color: 'var(--brand)', lineHeight: 1 }}>DARTE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, font: '500 11px/1 var(--font-body)', color: 'var(--text-muted)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--brand)' }} />
              AI Concierge · Online
            </div>
          </div>
        </div>
        {/* hello card */}
        <div style={{
          display: 'flex', gap: 12, padding: 14, borderRadius: 16,
          background: 'var(--surface-1)', border: '1px solid var(--border-subtle)',
          boxShadow: 'inset 0 0 0 1px #00f5ff10', marginBottom: 16,
        }}>
          <img src="assets/darte-app-icon.jpg" alt="" style={{ width: 52, height: 52, borderRadius: 12, alignSelf: 'flex-start' }} />
          <div>
            <div style={{ font: '700 15px/1.2 var(--font-body)', color: 'var(--text-strong)', marginBottom: 4 }}>Hi, I'm DARTE.</div>
            <div style={{ font: '400 12px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>Your AI concierge near you. Ask me anything — dining, rides, events, and more.</div>
          </div>
        </div>
        <div style={{ font: '700 11px/1 var(--font-display)', fontStyle: 'italic', letterSpacing: '.12em', color: 'var(--accent)', marginBottom: 12 }}>WHAT CAN I HELP WITH?</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
          {cats.map(c => <CatTile key={c.label} {...c} />)}
        </div>
        <div style={{ flex: 1 }} />
        {/* input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px 9px 15px',
          borderRadius: 999, background: 'var(--surface-1)', border: '1px solid var(--border-default)',
          marginBottom: 12,
        }}>
          <span style={{ flex: 1, font: '400 13px/1 var(--font-body)', color: 'var(--text-faint)' }}>Ask me anything…</span>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="arrow-up" size={18} color="var(--text-on-brand)" />
          </span>
        </div>
      </div>
      <TabBar active="chat" />
    </div>
  );
}

/* ---------- SCREEN 2: Onboarding ---------- */
function OnboardingScreen() {
  const chips = [
    { t: 'Relaxed & Easy', on: false }, { t: 'Adventurous', on: true },
    { t: 'Food-Driven', on: true }, { t: 'Romantic', on: false },
    { t: 'Family Fun', on: false }, { t: 'Nightlife First', on: true },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <StatusBar />
      <div style={{ padding: '10px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <Icon name="chevron-left" size={24} color="var(--text-body)" />
          <span style={{ font: '600 12px/1 var(--font-body)', color: 'var(--text-muted)' }}>4 of 9 · 44%</span>
        </div>
        <div style={{ height: 5, borderRadius: 999, background: 'var(--surface-2)', marginBottom: 34, overflow: 'hidden' }}>
          <div style={{ width: '44%', height: '100%', background: 'var(--gradient-brand)' }} />
        </div>
        <div className="display" style={{ fontSize: 32, color: 'var(--text-strong)', lineHeight: 1, marginBottom: 8 }}>What's your travel vibe?</div>
        <div style={{ font: '400 13px/1.5 var(--font-body)', color: 'var(--text-muted)', marginBottom: 26 }}>Pick all that resonate with this trip.</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {chips.map(c => (
            <span key={c.t} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 15px', borderRadius: 999,
              font: '600 13px/1 var(--font-body)',
              color: c.on ? 'var(--brand)' : 'var(--text-body)',
              background: c.on ? '#15bf0016' : 'var(--surface-1)',
              border: `1px solid ${c.on ? 'var(--brand)' : 'var(--border-default)'}`,
            }}>
              {c.on && <Icon name="check" size={14} color="var(--brand)" />}
              {c.t}
            </span>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <button style={{
          height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: 'var(--gradient-brand)', color: 'var(--text-on-brand)',
          font: '800 17px/1 var(--font-display)', fontStyle: 'italic', letterSpacing: '.03em', textTransform: 'uppercase',
          boxShadow: 'var(--shadow-glow-green)', marginBottom: 18,
        }}>Next</button>
      </div>
    </div>
  );
}

/* ---------- SCREEN 2b: Map / Explore ---------- */
function MapExploreScreen() {
  const pins = [
    { top: '30%', left: '26%', icon: 'utensils', color: 'var(--cat-dining)' },
    { top: '22%', left: '64%', icon: 'ferris-wheel', color: 'var(--cat-attractions)' },
    { top: '52%', left: '72%', icon: 'party-popper', color: 'var(--cat-entertainment)' },
    { top: '60%', left: '38%', icon: 'car-front', color: 'var(--cat-transportation)' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      {/* map ground */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#08182e,#04101f 60%,#020a15)' }} />
      {/* faux streets */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6, backgroundImage:
        'linear-gradient(112deg, transparent 47%, #ffffff12 48%, #ffffff12 50%, transparent 51%),'
        + 'linear-gradient(28deg, transparent 58%, #ffffff0d 59%, #ffffff0d 61%, transparent 62%),'
        + 'linear-gradient(82deg, transparent 28%, #ffffff0d 29%, #ffffff0d 31%, transparent 32%),'
        + 'linear-gradient(150deg, transparent 70%, #ffffff0d 71%, #ffffff0d 72%, transparent 73%)' }} />
      {/* route */}
      <svg viewBox="0 0 300 620" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M78 186 C 120 150, 170 150, 192 136 S 240 300, 216 322 C 180 360, 150 340, 114 372"
          fill="none" stroke="var(--darte-aqua)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" opacity="0.85" />
      </svg>
      <StatusBar />
      {/* search bar */}
      <div style={{ padding: '4px 16px 0', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', borderRadius: 999,
          background: 'color-mix(in srgb, var(--surface-1) 82%, transparent)', backdropFilter: 'blur(18px)',
          border: '1px solid var(--border-default)' }}>
          <Icon name="search" size={17} color="var(--brand)" />
          <span style={{ flex: 1, font: '500 13px/1 var(--font-body)', color: 'var(--text-body)' }}>Explore near you</span>
          <Icon name="sliders-horizontal" size={16} color="var(--text-muted)" />
        </div>
      </div>
      {/* pins */}
      {pins.map((p, i) => (
        <span key={i} style={{ position: 'absolute', top: p.top, left: p.left, zIndex: 6, transform: 'translate(-50%,-100%)',
          width: 34, height: 34, borderRadius: '50% 50% 50% 2px', background: p.color, transform: 'translate(-50%,-100%) rotate(45deg)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 16px -4px ${p.color}, 0 0 0 3px #00060f` }}>
          <span style={{ transform: 'rotate(-45deg)', display: 'inline-flex' }}><Icon name={p.icon} size={16} color="#00060f" /></span>
        </span>
      ))}
      {/* you-are-here */}
      <span style={{ position: 'absolute', top: '78%', left: '48%', zIndex: 6, transform: 'translate(-50%,-50%)',
        width: 16, height: 16, borderRadius: '50%', background: 'var(--darte-aqua)', boxShadow: '0 0 0 6px #00f5ff33, 0 0 0 2px #00060f' }} />
      <div style={{ flex: 1 }} />
      {/* bottom sheet */}
      <div style={{ position: 'relative', zIndex: 6, margin: '0 12px 10px', padding: 15, borderRadius: 20,
        background: 'color-mix(in srgb, var(--surface-1) 90%, transparent)', backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-subtle)', boxShadow: '0 -8px 30px -12px #000c' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ font: '700 11px/1 var(--font-display)', fontStyle: 'italic', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>Tonight’s route</span>
          <span style={{ font: '600 11px/1 var(--font-body)', color: 'var(--text-muted)' }}>4 stops · 1.4 mi</span>
        </div>
        <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
          <span style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--cat-dining)1f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--cat-dining)' }}>
            <Icon name="utensils" size={19} color="var(--cat-dining)" />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ font: '700 14px/1.2 var(--font-body)', color: 'var(--text-strong)' }}>Christinis Ristorante</div>
            <div style={{ font: '400 12px/1.3 var(--font-body)', color: 'var(--text-muted)' }}>Rooftop dining · 0.3 mi · 7:30 PM</div>
          </div>
          <Icon name="navigation" size={18} color="var(--brand)" />
        </div>
      </div>
      <TabBar active="map" />
    </div>
  );
}

/* ---------- Bottom tab bar ---------- */
function TabBar({ active }) {
  const tabs = [
    { id: 'map', icon: 'map', label: 'Map' },
    { id: 'explore', icon: 'compass', label: 'Explore' },
    { id: 'chat', icon: null, label: 'DARTE' },
    { id: 'bookings', icon: 'ticket', label: 'Bookings' },
    { id: 'profile', icon: 'user', label: 'Profile' },
  ];
  return (
    <div style={{ position: 'relative', paddingTop: 2 }}>
      <div style={{ height: 2, background: 'var(--gradient-rainbow)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '9px 8px 16px', background: 'var(--bg-sunken)' }}>
        {tabs.map(t => {
          const on = t.id === active;
          if (!t.icon) {
            return (
              <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: -18 }}>
                <img src="assets/darte-app-icon.jpg" alt="" style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid var(--brand)', boxShadow: 'var(--shadow-glow-green)' }} />
                <span style={{ font: '600 9px/1 var(--font-body)', color: 'var(--brand)' }}>{t.label}</span>
              </div>
            );
          }
          return (
            <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Icon name={t.icon} size={20} color={on ? 'var(--brand)' : 'var(--text-faint)'} />
              <span style={{ font: '500 9px/1 var(--font-body)', color: on ? 'var(--brand)' : 'var(--text-faint)' }}>{t.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- SCREEN 3: Lock screen with proactive notification ---------- */
function LockScreen({ notifIn = true }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(120% 80% at 50% 0%, #06213a 0%, #010a1c 55%, #000410 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      <StatusBar />
      <div style={{ textAlign: 'center', marginTop: 26 }}>
        <Icon name="lock" size={16} color="#ffffffcc" />
        <div style={{ font: '600 15px/1 var(--font-body)', color: '#ffffffcc', marginTop: 12 }}>Saturday, June 6</div>
        <div style={{ font: '300 76px/1 var(--font-body)', color: '#fff', letterSpacing: '-.02em', marginTop: 2 }}>9:41</div>
      </div>
      {/* notification */}
      <div style={{ padding: '0 14px', marginTop: 30 }}>
        <div style={{
          display: 'flex', gap: 11, padding: 13, borderRadius: 20,
          background: 'color-mix(in srgb, var(--surface-2) 78%, transparent)',
          backdropFilter: 'blur(24px)',
          border: '1px solid #ffffff1f',
          boxShadow: '0 0 34px -8px #15bf0066',
          transform: notifIn ? 'translateY(0) scale(1)' : 'translateY(-18px) scale(.96)',
          opacity: notifIn ? 1 : 0,
          transition: 'all .55s var(--ease-spring)',
        }}>
          <img src="assets/darte-app-icon.jpg" alt="" style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ font: '700 12px/1 var(--font-display)', fontStyle: 'italic', letterSpacing: '.06em', color: '#fff' }}>DARTE</span>
              <span style={{ font: '400 11px/1 var(--font-body)', color: '#ffffff88' }}>now</span>
            </div>
            <div style={{ font: '400 13px/1.45 var(--font-body)', color: '#fff', marginTop: 5 }}>
              A steakhouse you'd love is 12 minutes away.
            </div>
            <div style={{ font: '400 12px/1.4 var(--font-body)', color: '#ffffffaa', marginTop: 3 }}>
              Table for two at 8, and a ride’s ready when you are. Tap to lock it in.
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px 26px' }}>
        <span style={{ width: 44, height: 44, borderRadius: '50%', background: '#ffffff1a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="flashlight" size={20} color="#fff" />
        </span>
        <span style={{ width: 44, height: 44, borderRadius: '50%', background: '#ffffff1a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="camera" size={20} color="#fff" />
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, PhoneFrame, StatusBar, CatTile, ChatHomeScreen, OnboardingScreen, MapExploreScreen, TabBar, LockScreen, ScreenshotScreen });
