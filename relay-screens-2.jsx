
// relay-screens-2.jsx — Additional screens (9–15) for Gateway

// ─── SCREEN 9: AI MATCHING ANIMATION ─────────────────────────
function ScreenMatching({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [phase, setPhase] = React.useState(0); // 0=scanning, 1=found
  const [progress, setProgress] = React.useState(0);
  const [nodes, setNodes] = React.useState([]);

  React.useEffect(() => {
    // Animate progress bar
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(() => setPhase(1), 400); return 100; }
        return p + 2;
      });
    }, 40);
    // Generate random nodes
    setNodes(Array.from({ length: 12 }, (_, i) => ({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      delay: i * 0.15,
      size: 6 + Math.random() * 10,
    })));
    return () => clearInterval(t);
  }, []);

  const mentors = MENTORS_DATA.slice(0, 4);

  return (
    <div style={{
      minHeight: '100%', background: COLORS.primary, display: 'flex',
      flexDirection: 'column', alignItems: 'center', padding: '40px 24px 32px',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 40 }}>Gateway</div>

      {phase === 0 ? (
        <>
          {/* Node graph animation */}
          <div style={{ position: 'relative', width: 260, height: 200, marginBottom: 32 }}>
            <svg width="260" height="200" style={{ position: 'absolute', inset: 0 }}>
              {/* Connection lines */}
              {nodes.map((n, i) => nodes.slice(i + 1, i + 3).map((m, j) => (
                <line key={`${i}-${j}`}
                  x1={`${n.x}%`} y1={`${n.y}%`} x2={`${m.x}%`} y2={`${m.y}%`}
                  stroke="rgba(0,201,177,0.2)" strokeWidth="1"
                />
              )))}
              {/* Center node */}
              <circle cx="50%" cy="50%" r="22" fill={COLORS.accent} opacity="0.9"/>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18">👤</text>
              {/* Outer nodes */}
              {nodes.map((n, i) => (
                <g key={i} style={{ animation: `nodeAppear 0.4s ${n.delay}s both` }}>
                  <circle cx={`${n.x}%`} cy={`${n.y}%`} r={n.size / 2}
                    fill="rgba(0,201,177,0.4)" stroke={COLORS.accent} strokeWidth="1.5"/>
                </g>
              ))}
            </svg>
          </div>

          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8, textAlign: 'center' }}>
            {isRTL ? 'الذكاء الاصطناعي يحلل بروفيلك...' : "L'IA analyse ton profil…"}
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>
            {isRTL ? 'كنقارن مجالاتك مع أكثر من 200 منتور' : 'Comparaison avec + de 200 mentors dans notre réseau'}
          </p>

          {/* Progress bar */}
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 8, height: 6, marginBottom: 12, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 8, background: COLORS.accent,
              width: `${progress}%`, transition: 'width 0.1s linear',
            }}/>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{progress}%</span>
        </>
      ) : (
        <>
          {/* Found! */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: COLORS.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, marginBottom: 20, animation: 'bounceIn 0.5s ease',
            boxShadow: '0 0 0 16px rgba(0,201,177,0.15)',
          }}>✓</div>

          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6, textAlign: 'center' }}>
            {isRTL ? 'كاين {4} منتور مناسبين ليك!' : '4 mentors compatibles trouvés !'}
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 28, textAlign: 'center' }}>
            {isRTL ? 'بنا على مجالاتك ف IA/ML و Cybersécurité' : 'Basé sur tes intérêts en IA/ML et Cybersécurité'}
          </p>

          {/* Mini mentor previews */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {mentors.map((m, i) => (
              <div key={m.name} style={{
                background: 'rgba(255,255,255,0.08)', borderRadius: 14,
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                animation: `slideUp 0.4s ${i * 0.1}s both`,
              }}>
                <Avatar name={m.name} size={38} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: '#fff' }}>{m.name}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{m.role} · {m.company}</div>
                </div>
                <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.accent }}>✨{m.score}%</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate('home')} style={{
            width: '100%', padding: '15px', borderRadius: 12,
            background: COLORS.accent, border: 'none', color: '#fff',
            fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,201,177,0.4)',
          }}>
            {isRTL ? 'شوف المنتورين →' : 'Voir mes mentors →'}
          </button>
        </>
      )}

      <style>{`
        @keyframes nodeAppear { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
        @keyframes bounceIn { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

// ─── SCREEN 10: SUBMIT SUCCESS ─────────────────────────────────
function ScreenSubmitSuccess({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [copied, setCopied] = React.useState(false);
  return (
    <div style={{
      minHeight: '100%', background: COLORS.bg, display: 'flex',
      flexDirection: 'column', alignItems: 'center', padding: '60px 24px 32px',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {/* Success icon */}
      <div style={{
        width: 90, height: 90, borderRadius: '50%', background: '#DCFCE7',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="22" fill={COLORS.green}/>
          <path d="M12 22l7 7 13-14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div style={{ ...T.h1, fontSize: 22, textAlign: 'center', marginBottom: 8 }}>
        {isRTL ? 'تم الإرسال بنجاح!' : 'Doléance soumise !'}
      </div>
      <p style={{ ...T.body, textAlign: 'center', lineHeight: 1.7, marginBottom: 28 }}>
        {isRTL ? 'تم تبليغ الإدارة بمشكلتك. سيتم معالجتها في أقرب وقت.' : 'Ton signalement a bien été transmis à l\'administration. Tu recevras une notification dès qu\'il sera pris en charge.'}
      </p>

      {/* Ticket number */}
      <div style={{
        background: COLORS.white, borderRadius: 16, padding: '20px 24px',
        width: '100%', boxShadow: '0 2px 12px rgba(27,58,107,0.08)',
        marginBottom: 20, textAlign: 'center',
      }}>
        <div style={{ ...T.small, marginBottom: 6 }}>{isRTL ? 'رقم التيكيت' : 'Numéro de ticket'}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 700, color: COLORS.primary, letterSpacing: 2 }}>#REL-0043</div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <PriorityBadge level="urgent" />
          <span style={{ ...T.small, fontSize: 11 }}>🚿 Douches · Bloc C</span>
        </div>
      </div>

      {/* Share to collect upvotes */}
      <div style={{
        background: COLORS.accentLight, borderRadius: 14, padding: '14px 16px',
        width: '100%', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 24 }}>👥</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.primary }}>
            {isRTL ? 'شارك مع زملائك' : 'Partage avec tes camarades'}
          </div>
          <div style={{ ...T.body, fontSize: 12, marginTop: 2 }}>
            {isRTL ? 'كلما زاد الدعم، كلما كانت الأولوية أعلى' : 'Plus d\'upvotes = priorité plus haute'}
          </div>
        </div>
        <button onClick={() => setCopied(true)} style={{
          padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: COLORS.accent, color: '#fff',
          fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
        }}>{copied ? '✓ Copié' : (isRTL ? 'شارك' : 'Copier')}</button>
      </div>

      {/* Stepper preview */}
      <div style={{ background: COLORS.white, borderRadius: 14, padding: '14px 16px', width: '100%', marginBottom: 24, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
        <div style={{ ...T.label, marginBottom: 10 }}>{isRTL ? 'حالة الطلب' : 'Suivi en temps réel'}</div>
        <StatusStepper step={0} />
      </div>

      <button onClick={() => navigate('ticketDetail')} style={{
        width: '100%', padding: '14px', borderRadius: 12,
        background: COLORS.primary, border: 'none', color: '#fff',
        fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 12,
      }}>
        {isRTL ? 'تابع تيكيتي' : 'Suivre mon ticket'}
      </button>
      <button onClick={() => navigate('home')} style={{
        width: '100%', padding: '14px', borderRadius: 12,
        border: `1.5px solid ${COLORS.gray200}`, background: 'none', color: COLORS.gray600,
        fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 600, cursor: 'pointer',
      }}>
        {isRTL ? 'رجع للأكيي' : 'Retour à l\'accueil'}
      </button>
    </div>
  );
}

// ─── SCREEN 11: TICKET DETAIL ─────────────────────────────────
function ScreenTicketDetail({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const ticket = TICKETS_DATA[0];
  const [voted, setVoted] = React.useState(false);

  const timeline = [
    { time: '20 avr. 14:32', label: isRTL ? 'تم استلام الشكوى' : 'Doléance reçue', done: true, icon: '📥', note: isRTL ? 'تم توليد نص رسمي وإرساله تلقائياً' : 'Message formel généré et envoyé automatiquement.' },
    { time: '20 avr. 17:05', label: isRTL ? 'قيد المعالجة' : 'Prise en charge', done: true, icon: '🔧', note: isRTL ? 'تقني مُعيَّن: محمد أوحادوش' : 'Technicien assigné : Mohammed Ouhadouch.' },
    { time: isRTL ? 'متوقع: 22 أبريل' : 'Prévu : 22 avr.', label: isRTL ? 'تم الحل' : 'Résolu', done: false, icon: '✅', note: '' },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 32, direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div style={{ background: COLORS.white, padding: '16px 20px', borderBottom: `1px solid ${COLORS.gray200}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('tickets')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <span style={{ ...T.h2, fontSize: 16 }}>{isRTL ? 'تفاصيل الشكوى' : 'Détail du ticket'}</span>
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: COLORS.gray400, marginLeft: 8 }}>#{ticket.id}</span>
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Summary card */}
        <div style={{
          background: COLORS.white, borderRadius: 16, padding: 16,
          boxShadow: '0 2px 10px rgba(27,58,107,0.07)',
          borderLeft: `4px solid ${COLORS.red}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ ...T.h3, fontSize: 15 }}>{ticket.icon} {ticket.title}</div>
              <div style={{ ...T.small, marginTop: 4 }}>{ticket.date}</div>
            </div>
            <PriorityBadge level={ticket.priority} />
          </div>
          <div style={{ ...T.body, fontSize: 13, lineHeight: 1.6, padding: '10px 12px', background: COLORS.gray100, borderRadius: 10 }}>
            {isRTL ? 'الدوش ديال البلوك C ماشي خدام من نهار الجمعة. والو تيخرج من رأس الدوش.' : 'La douche du bloc C ne fonctionne plus depuis vendredi. Aucun débit d\'eau en sortie.'}
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setVoted(v => !v)} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
              borderRadius: 10, border: `1.5px solid ${voted ? COLORS.accent : COLORS.gray200}`,
              background: voted ? COLORS.accentLight : 'none', cursor: 'pointer',
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: voted ? COLORS.accent : COLORS.gray600, fontWeight: 600,
            }}>
              👍 {ticket.upvotes + (voted ? 1 : 0)} {isRTL ? 'طالب' : 'étudiants'}
            </button>
            <span style={{ ...T.small, fontSize: 11 }}>📍 {isRTL ? 'البلوك C، الطابق 2' : 'Bloc C, Étage 2'}</span>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 10px rgba(27,58,107,0.07)' }}>
          <div style={{ ...T.h3, marginBottom: 16 }}>{isRTL ? 'مسار الطلب' : 'Historique du traitement'}</div>
          {timeline.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < timeline.length - 1 ? 20 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: step.done ? COLORS.accentLight : COLORS.gray100,
                  border: `2px solid ${step.done ? COLORS.accent : COLORS.gray200}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
                }}>{step.icon}</div>
                {i < timeline.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: step.done ? COLORS.accent : COLORS.gray200, minHeight: 20, marginTop: 4 }}/>
                )}
              </div>
              <div style={{ paddingTop: 6, flex: 1 }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: step.done ? COLORS.gray900 : COLORS.gray400 }}>{step.label}</div>
                <div style={{ ...T.small, fontSize: 11, marginTop: 2 }}>{step.time}</div>
                {step.note && <div style={{ ...T.body, fontSize: 12, marginTop: 6, padding: '6px 10px', background: COLORS.gray100, borderRadius: 8, lineHeight: 1.5 }}>{step.note}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Similar issues */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 10px rgba(27,58,107,0.07)' }}>
          <div style={{ ...T.h3, marginBottom: 12 }}>{isRTL ? 'مشاكل مشابهة' : 'Signalements similaires'}</div>
          {[
            { icon: '🚿', title: isRTL ? 'دوش مكسور — البلوك A' : 'Douche HS — Bloc A', votes: 5 },
            { icon: '💧', title: isRTL ? 'تسرب المياه — الطابق 3' : 'Fuite d\'eau — Étage 3', votes: 3 },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? `1px solid ${COLORS.gray100}` : 'none' }}>
              <span style={{ ...T.body, fontSize: 13 }}>{s.icon} {s.title}</span>
              <span style={{ ...T.small, fontSize: 11 }}>👍 {s.votes}</span>
            </div>
          ))}
        </div>

        {/* Admin message */}
        <div style={{ background: `${COLORS.primary}10`, borderRadius: 14, padding: '14px 16px', border: `1px solid ${COLORS.primary}20` }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20 }}>🏛️</span>
            <div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.primary, marginBottom: 4 }}>
                {isRTL ? 'رسالة الإدارة' : 'Message de l\'administration'}
              </div>
              <p style={{ ...T.body, fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                {isRTL ? 'شكراً على إبلاغنا. سنرسل تقنياً في أقرب وقت.' : 'Merci pour votre signalement. Un technicien sera dépêché dans les 48h. Nous vous tiendrons informé.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 12: COMMUNITY FEED ─────────────────────────────────
function ScreenCommunity({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [view, setView] = React.useState('list'); // list | map
  const [filter, setFilter] = React.useState('Toutes');
  const filters = ['Toutes', 'Urgent', 'En cours', 'Résolu'];

  const allIssues = [
    { id: 'REL-0042', icon: '🚿', title: isRTL ? 'دوش مكسور — البلوك C' : 'Douche cassée — Bloc C', upvotes: 12, priority: 'urgent', step: 1, zone: 'Bloc C' },
    { id: 'REL-0041', icon: '🌐', title: isRTL ? 'واي فاي بطيء — الأمفي A' : 'WiFi instable — Amphi A', upvotes: 23, priority: 'faible', step: 2, zone: 'Amphi A' },
    { id: 'REL-0040', icon: '💡', title: isRTL ? 'كهرباء مقطوعة — القاعة 204' : 'Électricité coupée — Salle 204', upvotes: 7, priority: 'normal', step: 0, zone: 'Bâtiment B' },
    { id: 'REL-0037', icon: '🚽', title: isRTL ? 'مرحاض عطلان — البلوك D' : 'Toilettes bouchées — Bloc D', upvotes: 18, priority: 'urgent', step: 1, zone: 'Bloc D' },
    { id: 'REL-0033', icon: '🏗️', title: isRTL ? 'باب مكسور — المدخل الرئيسي' : 'Porte cassée — Entrée principale', upvotes: 4, priority: 'normal', step: 0, zone: 'Entrée' },
  ];

  const priorityColor = { urgent: COLORS.red, normal: COLORS.yellow, faible: COLORS.green };
  const stepLabel = (s) => ['Reçu','En cours','Résolu'][s];

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: COLORS.white, padding: '16px 20px 14px', borderBottom: `1px solid ${COLORS.gray200}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ ...T.h2, fontSize: 17 }}>{isRTL ? 'شكاوى الكامبوس' : 'Campus — Doléances'}</span>
          {/* List / Map toggle */}
          <div style={{ display: 'flex', background: COLORS.gray100, borderRadius: 10, padding: 3 }}>
            {[{ id: 'list', icon: '☰' }, { id: 'map', icon: '🗺' }].map(v => (
              <button key={v.id} onClick={() => setView(v.id)} style={{
                width: 34, height: 28, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: view === v.id ? COLORS.white : 'none',
                boxShadow: view === v.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                fontSize: 14,
              }}>{v.icon}</button>
            ))}
          </div>
        </div>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 14px', borderRadius: 20, border: `1.5px solid ${filter === f ? COLORS.accent : COLORS.gray200}`,
              background: filter === f ? COLORS.accentLight : COLORS.white, cursor: 'pointer',
              color: filter === f ? COLORS.accent : COLORS.gray600, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {view === 'map' ? (
        /* Map view */
        <div style={{ padding: 16 }}>
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: '#D6DDE8', height: 220, marginBottom: 14 }}>
            <svg width="100%" height="100%" viewBox="0 0 360 220">
              <rect width="360" height="220" fill="#D6DDE8"/>
              <rect x="0" y="90" width="360" height="28" fill="#C5CDD9"/>
              <rect x="155" y="0" width="28" height="220" fill="#C5CDD9"/>
              <rect x="12" y="12" width="68" height="70" rx="6" fill="#B0BAC9"/><text x="46" y="51" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Bloc A</text>
              <rect x="90" y="12" width="55" height="70" rx="6" fill="#9AA5B7"/><text x="117" y="51" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Bloc B</text>
              <rect x="193" y="12" width="75" height="70" rx="6" fill="#B0BAC9"/><text x="230" y="51" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Amphi</text>
              <rect x="278" y="12" width="70" height="70" rx="6" fill="#9AA5B7"/><text x="313" y="51" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Admin</text>
              <rect x="12" y="128" width="68" height="70" rx="6" fill="#9AA5B7"/><text x="46" y="167" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Bloc C</text>
              <rect x="90" y="128" width="55" height="70" rx="6" fill="#B0BAC9"/><text x="117" y="167" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Bloc D</text>
              <rect x="193" y="128" width="75" height="70" rx="6" fill="#B0BAC9"/><text x="230" y="167" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Biblio</text>
              <rect x="278" y="128" width="70" height="70" rx="6" fill="#9AA5B7"/><text x="313" y="167" textAnchor="middle" fontSize="9" fill="#7A8499" fontFamily="DM Sans">Cafét.</text>
              {/* Issue pins */}
              <circle cx="46" cy="163" r="12" fill={COLORS.red} opacity="0.9"/><text x="46" y="167" textAnchor="middle" fontSize="11">🚿</text>
              <circle cx="230" cy="47" r="12" fill={COLORS.green} opacity="0.9"/><text x="230" y="51" textAnchor="middle" fontSize="11">🌐</text>
              <circle cx="117" cy="47" r="12" fill={COLORS.yellow} opacity="0.9"/><text x="117" y="51" textAnchor="middle" fontSize="11">💡</text>
              <circle cx="117" cy="163" r="12" fill={COLORS.red} opacity="0.9"/><text x="117" y="167" textAnchor="middle" fontSize="11">🚽</text>
            </svg>
          </div>
          <div style={{ ...T.small, textAlign: 'center' }}>{isRTL ? 'اضغط على الدبوس لرؤية التفاصيل' : 'Appuie sur un pin pour voir les détails'}</div>
        </div>
      ) : (
        /* List view */
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {allIssues.map((issue) => (
            <div key={issue.id} onClick={() => navigate('ticketDetail')} style={{
              background: COLORS.white, borderRadius: 14, padding: '12px 14px',
              boxShadow: '0 2px 8px rgba(27,58,107,0.06)', cursor: 'pointer',
              borderLeft: `4px solid ${priorityColor[issue.priority]}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ ...T.h3, fontSize: 13 }}>{issue.icon} {issue.title}</div>
                  <div style={{ ...T.small, fontSize: 11, marginTop: 2 }}>📍 {issue.zone}</div>
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: COLORS.gray400 }}>#{issue.id.split('-')[1]}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <PriorityBadge level={issue.priority} />
                  <span style={{
                    padding: '2px 8px', borderRadius: 10,
                    background: issue.step === 2 ? '#DCFCE7' : COLORS.gray100,
                    color: issue.step === 2 ? COLORS.green : COLORS.gray600,
                    fontSize: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 500,
                  }}>{stepLabel(issue.step)}</span>
                </div>
                <span style={{ ...T.small, fontSize: 12 }}>👍 {issue.upvotes}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button onClick={() => navigate('submit')} style={{
        position: 'fixed', bottom: 76, right: 20,
        width: 52, height: 52, borderRadius: '50%',
        background: COLORS.accent, border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,201,177,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, zIndex: 50,
      }}>+</button>
    </div>
  );
}

// ─── SCREEN 13: NOTIFICATIONS ─────────────────────────────────
function ScreenNotifications({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [readIds, setReadIds] = React.useState([]);
  const markRead = (id) => setReadIds(r => [...r, id]);

  const groups = [
    {
      label: isRTL ? 'اليوم' : "Aujourd'hui",
      items: [
        { id: 1, icon: '🔧', color: COLORS.yellow, title: isRTL ? 'تيكيتك قيد المعالجة' : 'Ton ticket est en cours', body: isRTL ? '#REL-0042 — البلوك C' : '#REL-0042 — Douche Bloc C', time: 'Il y a 2h', action: () => navigate('ticketDetail') },
        { id: 2, icon: '✨', color: COLORS.accent, title: isRTL ? 'منتور جديد متوافق معك' : 'Nouveau match mentor', body: isRTL ? 'Mehdi Lahlou — 79% توافق' : 'Mehdi Lahlou — 79% compatible', time: 'Il y a 4h', action: () => navigate('mentorProfile') },
        { id: 3, icon: '👍', color: COLORS.green, title: isRTL ? 'شكواك حصلت على 5 أصوات' : '5 upvotes sur ta doléance', body: isRTL ? 'طلاب آخرون يدعمون شكواك' : 'D\'autres étudiants soutiennent ton signalement', time: 'Il y a 6h', action: () => navigate('ticketDetail') },
      ],
    },
    {
      label: isRTL ? 'هذا الأسبوع' : 'Cette semaine',
      items: [
        { id: 4, icon: '💬', color: COLORS.primary, title: isRTL ? 'رسالة جديدة من ياسمين' : 'Message de Yasmine Benali', body: isRTL ? 'عندك خبرة في ال ML؟' : 'Avez-vous déjà eu des expériences en ML ?', time: 'Hier', action: () => navigate('chat') },
        { id: 5, icon: '✅', color: COLORS.green, title: isRTL ? 'تم حل مشكل الواي فاي' : 'Problème WiFi résolu', body: '#REL-0031 — Amphi A', time: 'Lun.', action: () => navigate('ticketDetail') },
      ],
    },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: COLORS.white, padding: '16px 20px', borderBottom: `1px solid ${COLORS.gray200}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...T.h2, fontSize: 17 }}>{isRTL ? 'الإشعارات' : 'Notifications'}</span>
        <button onClick={() => setReadIds([1,2,3,4,5])} style={{ ...T.small, color: COLORS.accent, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
          {isRTL ? 'قرأت الكل' : 'Tout lire'}
        </button>
      </div>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {groups.map(group => (
          <div key={group.label}>
            <div style={{ ...T.label, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{group.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.items.map(item => (
                <div key={item.id} onClick={() => { markRead(item.id); item.action(); }} style={{
                  background: readIds.includes(item.id) ? COLORS.white : `${COLORS.accent}08`,
                  borderRadius: 14, padding: '12px 14px',
                  display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer',
                  border: readIds.includes(item.id) ? 'none' : `1px solid ${COLORS.accent}20`,
                  boxShadow: '0 1px 6px rgba(27,58,107,0.05)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: `${item.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...T.h3, fontSize: 13 }}>{item.title}</div>
                    <div style={{ ...T.small, fontSize: 11, marginTop: 2 }}>{item.body}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                    <span style={{ ...T.small, fontSize: 10 }}>{item.time}</span>
                    {!readIds.includes(item.id) && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.accent }}/>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN 14: CHAT INBOX ─────────────────────────────────────
function ScreenInbox({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const conversations = [
    { mentor: MENTORS_DATA[0], lastMsg: 'Avez-vous déjà eu des expériences en ML ?', time: 'Hier', unread: 1 },
    { mentor: MENTORS_DATA[1], lastMsg: 'Je vous enverrai des ressources cette semaine.', time: 'Lun.', unread: 0 },
    { mentor: MENTORS_DATA[2], lastMsg: isRTL ? 'شوف هاد المقال عن الكريبتو' : 'Consultez cet article sur la crypto.', time: 'Dim.', unread: 2 },
    { mentor: MENTORS_DATA[3], lastMsg: 'Bonne chance pour ton entretien !', time: '14 avr.', unread: 0 },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: COLORS.white, padding: '16px 20px 14px', borderBottom: `1px solid ${COLORS.gray200}` }}>
        <div style={{ ...T.h2, fontSize: 17, marginBottom: 12 }}>{isRTL ? 'الرسائل' : 'Messagerie'}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: COLORS.gray100, borderRadius: 12, padding: '8px 12px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray400} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ ...T.body, fontSize: 13, color: COLORS.gray400 }}>{isRTL ? 'ابحث في المحادثات...' : 'Rechercher une conversation…'}</span>
        </div>
      </div>

      <div style={{ padding: '8px 0' }}>
        {conversations.map((conv, i) => (
          <div key={i} onClick={() => navigate('chat')} style={{
            display: 'flex', gap: 12, padding: '12px 20px', cursor: 'pointer',
            borderBottom: `1px solid ${COLORS.gray100}`,
            background: conv.unread > 0 ? `${COLORS.accent}05` : COLORS.white,
          }}>
            <div style={{ position: 'relative' }}>
              <Avatar name={conv.mentor.name} size={48} />
              {conv.mentor.available && (
                <div style={{ position: 'absolute', bottom: 1, right: 1, width: 11, height: 11, borderRadius: '50%', background: COLORS.green, border: '2px solid white' }}/>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: conv.unread > 0 ? 700 : 600, color: COLORS.gray900 }}>{conv.mentor.name}</div>
                <span style={{ ...T.small, fontSize: 11 }}>{conv.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...T.body, fontSize: 13, fontWeight: conv.unread > 0 ? 500 : 400, color: conv.unread > 0 ? COLORS.gray900 : COLORS.gray400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>{conv.lastMsg}</span>
                {conv.unread > 0 && (
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{conv.unread}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN 15: SETTINGS ──────────────────────────────────────
function ScreenSettings({ navigate, lang, setLang }) {
  const isRTL = lang === 'دارجة';
  const [notifTickets, setNotifTickets] = React.useState(true);
  const [notifMentors, setNotifMentors] = React.useState(true);
  const [notifUpvotes, setNotifUpvotes] = React.useState(false);

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{
      width: 44, height: 26, borderRadius: 13,
      background: value ? COLORS.accent : COLORS.gray200,
      position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s',
      }}/>
    </div>
  );

  const Section = ({ title, children }) => (
    <div>
      <div style={{ ...T.label, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, padding: '0 4px', marginBottom: 8 }}>{title}</div>
      <div style={{ background: COLORS.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
        {children}
      </div>
    </div>
  );

  const Row = ({ icon, label, right, border = true }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: border ? `1px solid ${COLORS.gray100}` : 'none' }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ ...T.body, flex: 1, color: COLORS.gray900, fontSize: 14, fontWeight: 500 }}>{label}</span>
      {right}
    </div>
  );

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: COLORS.white, padding: '16px 20px', borderBottom: `1px solid ${COLORS.gray200}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('profile')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span style={{ ...T.h2, fontSize: 17 }}>{isRTL ? 'الإعدادات' : 'Paramètres'}</span>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Language */}
        <Section title={isRTL ? 'اللغة' : 'Langue'}>
          <Row icon="🌐" label={isRTL ? 'لغة التطبيق' : "Langue de l'application"} border={false} right={
            <div style={{ display: 'flex', gap: 6 }}>
              {['FR', 'دارجة'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '4px 10px', borderRadius: 10,
                  border: `1.5px solid ${lang === l ? COLORS.accent : COLORS.gray200}`,
                  background: lang === l ? COLORS.accentLight : 'none',
                  color: lang === l ? COLORS.accent : COLORS.gray600,
                  fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}>{l}</button>
              ))}
            </div>
          }/>
        </Section>

        {/* Notifications */}
        <Section title={isRTL ? 'الإشعارات' : 'Notifications'}>
          <Row icon="🎫" label={isRTL ? 'تحديثات التيكيت' : 'Mises à jour tickets'} right={<Toggle value={notifTickets} onChange={setNotifTickets} />} />
          <Row icon="🤝" label={isRTL ? 'مطابقات جديدة' : 'Nouveaux matchs mentors'} right={<Toggle value={notifMentors} onChange={setNotifMentors} />} />
          <Row icon="👍" label={isRTL ? 'أصوات الدعم' : 'Upvotes sur tes doléances'} right={<Toggle value={notifUpvotes} onChange={setNotifUpvotes} />} border={false} />
        </Section>

        {/* Account */}
        <Section title={isRTL ? 'الحساب' : 'Compte'}>
          <Row icon="👤" label={isRTL ? 'عدل البروفيل' : 'Modifier le profil'} right={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray400} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>} />
          <Row icon="🔒" label={isRTL ? 'الأمان والخصوصية' : 'Sécurité & confidentialité'} right={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray400} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>} />
          <Row icon="📄" label={isRTL ? 'شروط الاستخدام' : "Conditions d'utilisation"} border={false} right={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray400} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>} />
        </Section>

        {/* Logout */}
        <button onClick={() => navigate('onboarding')} style={{
          width: '100%', padding: '13px', borderRadius: 12,
          border: `1.5px solid #FEE2E2`, background: '#FEF2F2',
          color: COLORS.red, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>
          🚪 {isRTL ? 'تسجيل الخروج' : 'Se déconnecter'}
        </button>

        <div style={{ ...T.small, textAlign: 'center', fontSize: 11 }}>Gateway v1.0.0 · INPT 2026</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenMatching, ScreenSubmitSuccess, ScreenTicketDetail,
  ScreenCommunity, ScreenNotifications, ScreenInbox, ScreenSettings,
});
