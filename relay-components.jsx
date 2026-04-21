
// relay-components.jsx — Design tokens + shared UI components for Relay

const COLORS = {
  primary: '#1B3A6B',
  accent: '#00C9B1',
  accentLight: '#E6FAF8',
  bg: '#F7F8FC',
  white: '#FFFFFF',
  red: '#E84040',
  orange: '#F97316',
  yellow: '#F5A623',
  green: '#22C55E',
  gray100: '#F1F2F6',
  gray200: '#E2E4EC',
  gray400: '#A0A6B8',
  gray600: '#636B82',
  gray900: '#1A1D2E',
};

const T = {
  h1: { fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, color: COLORS.gray900 },
  h2: { fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: COLORS.gray900 },
  h3: { fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, color: COLORS.gray900 },
  body: { fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400, color: COLORS.gray600 },
  small: { fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, color: COLORS.gray400 },
  label: { fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.gray600 },
};

// ── Language Toggle ──────────────────────────────────────────
function LangToggle({ lang, setLang }) {
  return (
    <div style={{
      display: 'flex', borderRadius: 20, overflow: 'hidden',
      border: `1.5px solid ${COLORS.gray200}`, background: COLORS.white,
    }}>
      {['FR', 'دارجة'].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: '4px 10px', border: 'none', cursor: 'pointer',
          background: lang === l ? COLORS.primary : 'transparent',
          color: lang === l ? '#fff' : COLORS.gray600,
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
          transition: 'all 0.2s',
        }}>{l}</button>
      ))}
    </div>
  );
}

// ── Bottom Nav ───────────────────────────────────────────────
function BottomNav({ tab, setTab, navigate }) {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? COLORS.accent : COLORS.gray400} stroke="none">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    )},
    { id: 'doleances', label: 'Doléances', icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? COLORS.accent : COLORS.gray400} strokeWidth="2" strokeLinecap="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    )},
    { id: 'mentors', label: 'Mentors', icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? COLORS.accent : COLORS.gray400} strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    )},
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: COLORS.white, borderTop: `1px solid ${COLORS.gray200}`,
      display: 'flex', paddingBottom: 20, paddingTop: 8, zIndex: 100,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => { setTab(t.id); navigate('home'); }} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 3, border: 'none', background: 'none', cursor: 'pointer', padding: '4px 0',
        }}>
          {t.icon(tab === t.id)}
          <span style={{
            ...T.small, fontSize: 10, fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? COLORS.accent : COLORS.gray400,
          }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Chip / Tag ───────────────────────────────────────────────
function Chip({ label, selected, onClick, color, small }) {
  return (
    <button onClick={onClick} style={{
      padding: small ? '4px 10px' : '6px 14px',
      borderRadius: 20, border: `1.5px solid ${selected ? (color||COLORS.accent) : COLORS.gray200}`,
      background: selected ? (color ? color+'18' : COLORS.accentLight) : COLORS.white,
      color: selected ? (color||COLORS.accent) : COLORS.gray600,
      fontFamily: "'DM Sans', sans-serif", fontSize: small ? 11 : 13, fontWeight: 500,
      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
    }}>{label}</button>
  );
}

// ── Avatar ───────────────────────────────────────────────────
function Avatar({ name, size = 44, color }) {
  const colors = ['#1B3A6B', '#00C9B1', '#7C3AED', '#E84040', '#F97316', '#059669'];
  const c = color || colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: c,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontFamily: "'Sora',sans-serif", fontSize: size * 0.35, fontWeight: 700 }}>
        {initials}
      </span>
    </div>
  );
}

// ── Priority Badge ───────────────────────────────────────────
function PriorityBadge({ level }) {
  const map = {
    urgent: { color: COLORS.red, bg: '#FEE2E2', label: '🔴 Urgent' },
    normal: { color: COLORS.yellow, bg: '#FEF9C3', label: '🟡 Normal' },
    faible: { color: COLORS.green, bg: '#DCFCE7', label: '🟢 Faible' },
  };
  const p = map[level] || map.normal;
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 10, background: p.bg,
      color: p.color, fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
    }}>{p.label}</span>
  );
}

// ── Mentor Card ──────────────────────────────────────────────
function MentorCard({ mentor, onContact, compact }) {
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    let v = 0;
    const interval = setInterval(() => {
      v += 3;
      if (v >= mentor.score) { setScore(mentor.score); clearInterval(interval); }
      else setScore(v);
    }, 16);
    return () => clearInterval(interval);
  }, [mentor.score]);

  return (
    <div style={{
      background: COLORS.white, borderRadius: 16,
      boxShadow: '0 2px 12px rgba(27,58,107,0.08)',
      padding: compact ? '12px' : '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name={mentor.name} size={compact ? 40 : 48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...T.h3, fontSize: 14 }}>{mentor.name}</div>
          <div style={{ ...T.small, marginTop: 2, fontSize: 12 }}>{mentor.role} · {mentor.company}</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
            {mentor.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{
                padding: '2px 8px', borderRadius: 10, background: COLORS.gray100,
                color: COLORS.gray600, fontSize: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
        </div>
        <button onClick={onContact} style={{
          padding: '6px 12px', borderRadius: 12, border: `1.5px solid ${COLORS.accent}`,
          color: COLORS.accent, background: 'none', cursor: 'pointer',
          fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
        }}>Contacter</button>
      </div>
      <div style={{
        borderTop: `1px solid ${COLORS.gray100}`, paddingTop: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13 }}>✨</span>
          <span style={{
            fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.accent,
          }}>{score}% compatible</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: mentor.available ? COLORS.green : COLORS.gray400,
          }}/>
          <span style={{ ...T.small, fontSize: 11 }}>
            {mentor.available ? 'Disponible' : 'Occupé'}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Status Stepper ───────────────────────────────────────────
function StatusStepper({ step }) {
  const steps = ['Reçu', 'En cours', 'Résolu'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: i <= step ? COLORS.accent : COLORS.gray200,
              border: `2px solid ${i <= step ? COLORS.accent : COLORS.gray200}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {i <= step && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
            </div>
            <span style={{ ...T.small, fontSize: 9, fontWeight: i === step ? 600 : 400, color: i <= step ? COLORS.accent : COLORS.gray400 }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < step ? COLORS.accent : COLORS.gray200, marginBottom: 14 }}/>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Ticket Card ──────────────────────────────────────────────
function TicketCard({ ticket, onUpvote }) {
  const [voted, setVoted] = React.useState(false);
  const [bounce, setBounce] = React.useState(false);
  const priorityColor = { urgent: COLORS.red, normal: COLORS.yellow, faible: COLORS.green };
  const borderColor = priorityColor[ticket.priority] || COLORS.yellow;

  const handleUpvote = () => {
    setVoted(!voted); setBounce(true);
    setTimeout(() => setBounce(false), 400);
    onUpvote && onUpvote();
  };

  return (
    <div style={{
      background: COLORS.white, borderRadius: 16,
      boxShadow: '0 2px 12px rgba(27,58,107,0.07)',
      borderLeft: `4px solid ${borderColor}`,
      padding: '14px 14px 12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ ...T.h3, fontSize: 13 }}>{ticket.icon} {ticket.title}</span>
          <span style={{ ...T.small, fontSize: 11 }}>{ticket.date}</span>
        </div>
        <span style={{
          fontFamily: 'monospace', fontSize: 11, color: COLORS.gray400, fontWeight: 600,
        }}>#{ticket.id}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <PriorityBadge level={ticket.priority} />
        <button onClick={handleUpvote} style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px',
          borderRadius: 10, border: `1.5px solid ${voted ? COLORS.accent : COLORS.gray200}`,
          background: voted ? COLORS.accentLight : 'none', cursor: 'pointer',
          transform: bounce ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s',
        }}>
          <span style={{ fontSize: 13 }}>👍</span>
          <span style={{ ...T.small, fontSize: 11, color: voted ? COLORS.accent : COLORS.gray500, fontWeight: 600 }}>
            {ticket.upvotes + (voted ? 1 : 0)}
          </span>
        </button>
      </div>
      <StatusStepper step={ticket.step} />
    </div>
  );
}

Object.assign(window, {
  COLORS, T, LangToggle, BottomNav, Chip, Avatar, PriorityBadge,
  MentorCard, StatusStepper, TicketCard,
});
