
// relay-screens.jsx — All screens for Relay app

const MENTORS_DATA = [
  { name: 'Yasmine Benali', role: 'Ingénieure IA', company: 'Google', tags: ['IA/ML', 'Python', 'NLP'], score: 92, available: true, bio: "Ingénieure senior chez Google Brain, spécialisée en NLP et vision. Ancienne élève INPT promo 2018.", sector: 'Professionnels', slots: ['Lun 18h', 'Mer 19h', 'Sam 10h'] },
  { name: 'Karim Tazi', role: 'Chef de projet', company: 'Orange Maroc', tags: ['Réseaux', 'Télécoms', '5G'], score: 87, available: false, bio: "Chef de projet 5G chez Orange Maroc. Alumni INPT 2015.", sector: 'Alumni', slots: ['Mar 17h', 'Jeu 18h'] },
  { name: 'Pr. Amina Chraibi', role: 'Professeure', company: 'INPT', tags: ['Cybersécurité', 'Cryptographie'], score: 84, available: true, bio: "Professeure-chercheuse à l'INPT, spécialiste en cybersécurité.", sector: 'Professeurs', slots: ['Lun 14h', 'Ven 15h', 'Sam 11h'] },
  { name: 'Mehdi Lahlou', role: 'CTO & Fondateur', company: 'TechUp Maroc', tags: ['Entrepreneuriat', 'Cloud', 'DevOps'], score: 79, available: true, bio: "CTO de TechUp Maroc, startup SaaS B2B. Alumni INPT 2013.", sector: 'Alumni', slots: ['Mer 20h', 'Dim 10h'] },
];

const TICKETS_DATA = [
  { id: 'REL-0042', icon: '🚿', title: 'Douche cassée — Bloc C', date: '20 avr. 2026', priority: 'urgent', upvotes: 12, step: 1 },
  { id: 'REL-0039', icon: '💡', title: 'Électricité coupée — Salle 204', date: '18 avr. 2026', priority: 'normal', upvotes: 7, step: 0 },
  { id: 'REL-0031', icon: '🌐', title: 'WiFi instable — Amphi A', date: '14 avr. 2026', priority: 'faible', upvotes: 23, step: 2 },
];

// ─── SCREEN 1: ONBOARDING ─────────────────────────────────────
function ScreenOnboarding({ navigate, lang, setLang, role, setRole }) {
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState(['IA/ML', 'Cybersécurité']);
  const [filiere, setFiliere] = React.useState('');
  const [annee, setAnnee] = React.useState('');
  const [objectif, setObjectif] = React.useState('stage');
  const isRTL = lang === 'دارجة';

  const roles = [
    { id: 'student', icon: '👨‍🎓', label: isRTL ? 'طالب' : 'Étudiant', desc: isRTL ? 'ابحث عن منتور وأبلغ عن مشاكل الكامبوس' : 'Accède aux mentors et signale des problèmes campus', bg: COLORS.accentLight },
    { id: 'mentor',  icon: '🤝',  label: isRTL ? 'خريج / منتور' : 'Alumni / Mentor', desc: isRTL ? 'أرشد الطلاب وشارك خبرتك' : 'Guide les étudiants et partage ton expérience', bg: '#EEF2FF' },
    { id: 'admin',   icon: '🏛️',  label: isRTL ? 'الإدارة' : 'Administration', desc: isRTL ? 'تابع وعالج شكاوى الطلاب' : 'Gérez et traitez les doléances étudiantes', bg: '#FFF7ED' },
  ];

  // Step 0 — role selection
  if (step === 0) {
    return (
      <div style={{ minHeight: '100%', background: COLORS.bg, padding: '0 0 24px' }}>
        <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.primary }}>Relay</span>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div style={{ padding: '28px 20px 0' }}>
          <div style={{ ...T.h1, fontSize: 22, lineHeight: 1.3, marginBottom: 8 }}>
            {isRTL ? 'أهلاً بك في Relay' : 'Bienvenue sur Relay.'}<br/>
            <span style={{ color: COLORS.accent }}>{isRTL ? 'من أنت؟' : 'Qui êtes-vous ?'}</span>
          </div>
          <p style={{ ...T.body, lineHeight: 1.6, marginBottom: 28 }}>
            {isRTL ? 'اختر دورك للوصول إلى الواجهة المناسبة.' : "Choisissez votre rôle pour accéder à l'interface adaptée."}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {roles.map(r => (
              <button key={r.id} onClick={() => {
                setRole(r.id);
                if (r.id === 'student') setStep(1); else navigate('home');
              }} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 16px',
                borderRadius: 16, cursor: 'pointer', border: `2px solid ${COLORS.gray200}`,
                background: COLORS.white, textAlign: 'left',
                boxShadow: '0 2px 10px rgba(27,58,107,0.06)',
              }}>
                <div style={{ width: 54, height: 54, borderRadius: 14, flexShrink: 0, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...T.h3, fontSize: 16 }}>{r.label}</div>
                  <div style={{ ...T.body, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{r.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray400} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 1 — student profile
  const interests = ['Cybersécurité', 'Réseaux', 'IA/ML', 'Développement Web', 'Cloud', 'Télécoms', 'Finance', 'Entrepreneuriat', 'Recherche', 'Management'];
  const toggle = tag => setSelected(s => s.includes(tag) ? s.filter(t => t !== tag) : [...s, tag]);

  return (
    <div style={{ minHeight: '100%', background: COLORS.bg, padding: '0 0 24px', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setStep(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: COLORS.primary }}>Relay</span>
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ ...T.h1, fontSize: 22, lineHeight: 1.3, marginBottom: 8 }}>
          {isRTL ? 'مرحباً بك في Relay' : 'Bienvenue sur Relay.'}<br/>
          <span style={{ color: COLORS.accent }}>{isRTL ? 'هيا نتحدث عنك.' : 'Parlons de toi.'}</span>
        </div>
        <p style={{ ...T.body, lineHeight: 1.6, marginBottom: 20 }}>
          {isRTL ? 'ختار المجالات ديالك باش نلقيو ليك المنتورين المناسبين.' : "Choisis tes centres d'intérêt pour trouver les bons mentors."}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {interests.map(tag => (
            <button key={tag} onClick={() => toggle(tag)} style={{
              padding: '7px 14px', borderRadius: 20,
              border: `1.5px solid ${selected.includes(tag) ? COLORS.accent : COLORS.gray200}`,
              background: selected.includes(tag) ? COLORS.accentLight : COLORS.white,
              color: selected.includes(tag) ? COLORS.accent : COLORS.gray600,
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>{tag}</button>
          ))}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ ...T.label, display: 'block', marginBottom: 6 }}>{isRTL ? 'الشعبة' : 'Filière'}</label>
          <select value={filiere} onChange={e => setFiliere(e.target.value)} style={{
            width: '100%', padding: '12px 14px', borderRadius: 12,
            border: `1.5px solid ${COLORS.gray200}`, background: COLORS.white,
            fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: COLORS.gray900,
            appearance: 'none', boxSizing: 'border-box',
          }}>
            <option value="">{isRTL ? 'اختار الشعبة' : 'Sélectionner...'}</option>
            {['Génie Logiciel', 'Réseaux & Télécoms', 'IA & Data Science', 'Cybersécurité', 'Cloud & DevOps'].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ ...T.label, display: 'block', marginBottom: 6 }}>{isRTL ? 'السنة' : 'Année'}</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['1', '2', '3'].map(a => (
              <button key={a} onClick={() => setAnnee(a)} style={{
                flex: 1, padding: '10px 0', borderRadius: 12,
                border: `1.5px solid ${annee === a ? COLORS.accent : COLORS.gray200}`,
                background: annee === a ? COLORS.accentLight : COLORS.white,
                color: annee === a ? COLORS.accent : COLORS.gray600,
                fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, cursor: 'pointer',
              }}>{a}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ ...T.label, display: 'block', marginBottom: 8 }}>{isRTL ? 'الهدف الأساسي' : 'Objectif principal'}</label>
          {[
            { id: 'stage',    label: isRTL ? 'نقلب على ستاج' : 'Trouver un stage' },
            { id: 'guidance', label: isRTL ? 'نتوجه في مساري' : 'Être guidé dans mon parcours' },
            { id: 'network',  label: isRTL ? 'نوسع شبكة علاقاتي' : 'Élargir mon réseau' },
          ].map(opt => (
            <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
              <input type="radio" name="objectif" value={opt.id} checked={objectif === opt.id}
                onChange={() => setObjectif(opt.id)} style={{ accentColor: COLORS.accent, width: 16, height: 16 }} />
              <span style={{ ...T.body, fontSize: 14, color: COLORS.gray900 }}>{opt.label}</span>
            </label>
          ))}
        </div>
        <button onClick={() => navigate('matching')} style={{
          width: '100%', padding: '15px', borderRadius: 12,
          background: COLORS.accent, border: 'none', color: '#fff',
          fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,201,177,0.35)',
        }}>
          {isRTL ? 'ابحث عن منتور ←' : 'Trouver mes mentors →'}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 2a: HOME ÉTUDIANT ──────────────────────────────────
function ScreenHomeStudent({ navigate, tab, setTab, lang, setLang }) {
  const isRTL = lang === 'دارجة';
  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: COLORS.primary }}>Relay</span>
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ ...T.h1, fontSize: 22, marginBottom: 4 }}>
          {isRTL ? 'صباح الخير، أمين 👋' : 'Bonjour, Amine 👋'}
        </div>
        <p style={{ ...T.body }}>{isRTL ? '2 منتورين مقترحين · 1 تيكيت في الطريق' : '2 mentors suggérés · 1 ticket en cours'}</p>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '20px 20px 0', display: 'flex', gap: 10 }}>
        {[
          { icon: '🚨', label: isRTL ? 'صيفط مشكل' : 'Signaler', bg: '#FEE2E2', accent: COLORS.red, action: () => navigate('submit') },
          { icon: '📋', label: isRTL ? 'تيكيتاتي' : 'Mes tickets', bg: '#EEF2FF', accent: COLORS.primary, action: () => navigate('tickets') },
          { icon: '✨', label: isRTL ? 'مطابقة AI' : 'Match IA', bg: COLORS.accentLight, accent: COLORS.accent, action: () => navigate('matching') },
        ].map((a, i) => (
          <button key={i} onClick={a.action} style={{
            flex: 1, padding: '14px 10px', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: a.bg, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: a.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{a.icon}</div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.gray900, lineHeight: 1.3 }}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Mentors section */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ ...T.h2, fontSize: 15 }}>{isRTL ? 'المنتورين المقترحين' : 'Mentors suggérés'}</span>
          <button onClick={() => { setTab('mentors'); navigate('mentors'); }} style={{ ...T.small, color: COLORS.accent, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {isRTL ? 'شوف الكل' : 'Voir tous'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MENTORS_DATA.slice(0, 2).map(m => (
            <MentorCard key={m.name} mentor={m} onContact={() => navigate('chat')} compact />
          ))}
        </div>
      </div>

      {/* Last ticket */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ ...T.h2, fontSize: 15 }}>{isRTL ? 'تيكيتي الأخير' : 'Mon dernier ticket'}</span>
          <button onClick={() => navigate('tickets')} style={{ ...T.small, color: COLORS.accent, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {isRTL ? 'شوف الكل' : 'Voir tous'}
          </button>
        </div>
        <TicketCard ticket={TICKETS_DATA[0]} />
      </div>
    </div>
  );
}

// ─── SCREEN 2b: HOME ADMINISTRATION ───────────────────────────
function ScreenHomeAdmin({ navigate, lang, setLang }) {
  const isRTL = lang === 'دارجة';
  const stats = [
    { label: isRTL ? 'عاجل' : 'Urgents',  count: 3,  color: COLORS.red,    bg: '#FEE2E2' },
    { label: isRTL ? 'جارية' : 'En cours', count: 8,  color: COLORS.yellow, bg: '#FEF9C3' },
    { label: isRTL ? 'محلولة' : 'Résolus', count: 24, color: COLORS.green,  bg: '#DCFCE7' },
  ];
  const urgent = [
    { id: 'REL-0042', icon: '🚿', title: 'Douche cassée — Bloc C',       upvotes: 12, since: '2j' },
    { id: 'REL-0037', icon: '🚽', title: 'Toilettes bouchées — Bloc D',  upvotes: 18, since: '1j' },
    { id: 'REL-0043', icon: '💡', title: 'Court-circuit — Salle 101',    upvotes: 5,  since: '3h' },
  ];
  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80 }}>
      <div style={{ background: COLORS.primary, padding: '18px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: '#fff' }}>Relay Admin</span>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
          {isRTL ? 'لوحة تحكم الإدارة' : 'Tableau de bord — INPT'}
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {stats.map(s => (
            <div key={s.label} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 800, color: s.color }}>{s.count}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...T.h2, fontSize: 15 }}>{isRTL ? 'تذاكر عاجلة' : 'Tickets urgents'}</span>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: COLORS.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>3</span>
            </div>
          </div>
          <button onClick={() => navigate('tickets')} style={{ ...T.small, color: COLORS.accent, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {isRTL ? 'شوف الكل' : 'Voir tous'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {urgent.map(t => (
            <div key={t.id} onClick={() => navigate('ticketDetail')} style={{
              background: COLORS.white, borderRadius: 14, padding: '13px 14px',
              boxShadow: '0 2px 8px rgba(27,58,107,0.07)', borderLeft: `4px solid ${COLORS.red}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ ...T.h3, fontSize: 13 }}>{t.title}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <span style={{ ...T.small, fontSize: 11 }}>👍 {t.upvotes}</span>
                  <span style={{ ...T.small, fontSize: 11 }}>⏱ {t.since}</span>
                </div>
              </div>
              <button onClick={e => e.stopPropagation()} style={{
                padding: '6px 12px', borderRadius: 10, background: COLORS.primary,
                border: 'none', cursor: 'pointer', color: '#fff',
                fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
              }}>{isRTL ? 'عيَّن' : 'Assigner'}</button>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('tickets')} style={{
          width: '100%', padding: '14px', borderRadius: 12, marginTop: 14,
          background: COLORS.white, border: `1.5px solid ${COLORS.gray200}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(27,58,107,0.05)',
        }}>
          <span style={{ fontSize: 18 }}>📋</span>
          <span style={{ ...T.h3, fontSize: 14, color: COLORS.primary }}>{isRTL ? 'جميع التذاكر' : 'Tous les tickets'}</span>
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 2c: HOME MENTOR / ALUMNI ──────────────────────────
function ScreenHomeMentor({ navigate, lang, setLang }) {
  const isRTL = lang === 'دارجة';
  const requests = [
    { name: 'Amine El Mansouri', filiere: 'Génie Logiciel · 3ème année', tags: ['IA/ML', 'Stage'], msg: isRTL ? 'نبحث عن توجيه في مجال ال ML' : 'Cherche une orientation en IA/ML', time: 'Il y a 2h' },
    { name: 'Sara Ouali',        filiere: 'Cybersécurité · 2ème année',  tags: ['Cybersécurité'],  msg: isRTL ? 'محتاجة توجيه في الكريبتو' : 'Besoin de conseils en cryptographie', time: 'Il y a 5h' },
  ];
  const mentees = [
    { name: 'Mehdi B.', progress: 'Entretien Google préparé ✓', next: 'Lun 18h' },
    { name: 'Lina T.',  progress: 'CV finalisé ✓',              next: 'Mer 19h' },
  ];
  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80 }}>
      <div style={{ padding: '18px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: COLORS.primary }}>Relay</span>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: COLORS.gray400, marginTop: 1 }}>
            {isRTL ? 'لوحة المنتور' : 'Espace Mentor'}
          </div>
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      {/* Welcome card */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, #2A5298 100%)`, borderRadius: 18, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name="Yasmine Benali" size={52} color={COLORS.accent} />
          <div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>Yasmine Benali</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Ingénieure IA · Google</div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.accent }}>✨ 2 {isRTL ? 'طلبات جديدة' : 'nouvelles demandes'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending requests */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ ...T.h2, fontSize: 15 }}>{isRTL ? 'طلبات في الانتظار' : 'Demandes en attente'}</span>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: COLORS.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>2</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {requests.map((r, i) => (
            <div key={i} style={{ background: COLORS.white, borderRadius: 14, padding: '14px', boxShadow: '0 2px 8px rgba(27,58,107,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <Avatar name={r.name} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ ...T.h3, fontSize: 14 }}>{r.name}</div>
                  <div style={{ ...T.small, fontSize: 11, marginTop: 1 }}>{r.filiere}</div>
                  <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
                    {r.tags.map(t => <span key={t} style={{ padding: '2px 7px', borderRadius: 8, background: COLORS.gray100, color: COLORS.gray600, fontSize: 10, fontFamily: "'DM Sans',sans-serif" }}>{t}</span>)}
                  </div>
                </div>
                <span style={{ ...T.small, fontSize: 10, flexShrink: 0 }}>{r.time}</span>
              </div>
              <div style={{ ...T.body, fontSize: 12, background: COLORS.gray100, borderRadius: 8, padding: '7px 10px', marginBottom: 10, lineHeight: 1.5 }}>{r.msg}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => navigate('chat')} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', cursor: 'pointer', background: COLORS.accent, color: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>
                  {isRTL ? '✓ قبول' : '✓ Accepter'}
                </button>
                <button style={{ flex: 1, padding: '8px', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${COLORS.gray200}`, background: 'none', color: COLORS.gray600, fontFamily: "'DM Sans',sans-serif", fontSize: 12 }}>
                  {isRTL ? '✕ رفض' : '✕ Refuser'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active mentees */}
      <div style={{ padding: '20px 20px 0' }}>
        <span style={{ ...T.h2, fontSize: 15, display: 'block', marginBottom: 12 }}>{isRTL ? 'مرشَّحيني الفعليون' : 'Mes mentorés actifs'}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {mentees.map((m, i) => (
            <div key={i} onClick={() => navigate('chat')} style={{
              background: COLORS.white, borderRadius: 14, padding: '12px 14px',
              boxShadow: '0 2px 8px rgba(27,58,107,0.06)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <Avatar name={m.name} size={38} />
              <div style={{ flex: 1 }}>
                <div style={{ ...T.h3, fontSize: 13 }}>{m.name}</div>
                <div style={{ ...T.body, fontSize: 11, marginTop: 2, color: COLORS.green }}>{m.progress}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...T.small, fontSize: 10 }}>{isRTL ? 'الجلسة القادمة' : 'Prochaine séance'}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.primary, marginTop: 2 }}>{m.next}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 2: HOME ROUTER ─────────────────────────────────────
function ScreenHome({ navigate, tab, setTab, lang, setLang, role }) {
  if (role === 'admin')  return <ScreenHomeAdmin  navigate={navigate} lang={lang} setLang={setLang} />;
  if (role === 'mentor') return <ScreenHomeMentor navigate={navigate} lang={lang} setLang={setLang} />;
  return <ScreenHomeStudent navigate={navigate} tab={tab} setTab={setTab} lang={lang} setLang={setLang} />;
}

// ─── SCREEN 3: SUBMIT DOLÉANCE ───────────────────────────────
function ScreenSubmit({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [category, setCategory] = React.useState('douches');
  const [inputTab, setInputTab] = React.useState('text');
  const [text, setText] = React.useState('');
  const [recording, setRecording] = React.useState(false);
  const [photo, setPhoto] = React.useState(null);
  const [aiText, setAiText] = React.useState('');
  const [aiLoading, setAiLoading] = React.useState(false);
  const [pinPos, setPinPos] = React.useState({ x: 60, y: 55 });

  const categories = [
    { id: 'douches',    icon: '🚿', label: isRTL ? 'دوشات' : 'Douches' },
    { id: 'sanitaires', icon: '🚽', label: isRTL ? 'مرافق' : 'Sanitaires' },
    { id: 'electricite',icon: '💡', label: isRTL ? 'كهرباء' : 'Électricité' },
    { id: 'reseau',     icon: '🌐', label: isRTL ? 'شبكة' : 'Réseau' },
    { id: 'infra',      icon: '🏗️', label: isRTL ? 'بنية' : 'Infrastructure' },
    { id: 'autre',      icon: '📦', label: isRTL ? 'أخرى' : 'Autre' },
  ];

  const generateAI = () => {
    if (!text && !recording) return;
    setAiLoading(true); setAiText('');
    setTimeout(() => {
      setAiLoading(false);
      setAiText(`Monsieur/Madame le Responsable,\n\nJe me permets de vous signaler un problème de ${categories.find(c=>c.id===category)?.label || 'maintenance'}. ${text || 'La situation nécessite une intervention rapide.'}\n\nCordialement,\nAmine El Mansouri — GL3`);
    }, 1800);
  };

  const toggleRecording = () => {
    setRecording(r => !r);
    if (recording) {
      setTimeout(() => {
        setText(isRTL ? 'الدوش ديال البلوك C ماشي خدام من نهار الجمعة' : 'La douche du bloc C ne fonctionne plus depuis vendredi.');
        setRecording(false);
      }, 100);
    }
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', direction: isRTL ? 'rtl' : 'ltr', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: COLORS.white, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${COLORS.gray200}`, flexShrink: 0 }}>
        <button onClick={() => navigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span style={{ ...T.h2, fontSize: 17 }}>{isRTL ? 'صيفط مشكل' : 'Signaler un problème'}</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Map */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 14, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.label, marginBottom: 10 }}>📍 {isRTL ? 'فين المشكل؟' : 'Où est le problème ?'}</div>
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#E8EDF5', height: 130, cursor: 'crosshair' }}
            onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setPinPos({ x: ((e.clientX-rect.left)/rect.width)*100, y: ((e.clientY-rect.top)/rect.height)*100 }); }}>
            <svg width="100%" height="100%" viewBox="0 0 300 130" style={{ position: 'absolute', inset: 0 }}>
              <rect width="300" height="130" fill="#D6DDE8"/>
              <rect x="0" y="55" width="300" height="18" fill="#C5CDD9"/>
              <rect x="130" y="0" width="18" height="130" fill="#C5CDD9"/>
              <rect x="10" y="8" width="55" height="42" rx="4" fill="#B0BAC9" opacity="0.7"/>
              <rect x="75" y="8" width="45" height="42" rx="4" fill="#9AA5B7" opacity="0.7"/>
              <rect x="160" y="8" width="60" height="42" rx="4" fill="#B0BAC9" opacity="0.7"/>
              <rect x="230" y="8" width="60" height="42" rx="4" fill="#9AA5B7" opacity="0.7"/>
              <rect x="10" y="78" width="55" height="42" rx="4" fill="#9AA5B7" opacity="0.7"/>
              <rect x="75" y="78" width="45" height="42" rx="4" fill="#B0BAC9" opacity="0.7"/>
              <rect x="160" y="78" width="60" height="42" rx="4" fill="#B0BAC9" opacity="0.7"/>
              <rect x="230" y="78" width="60" height="42" rx="4" fill="#9AA5B7" opacity="0.7"/>
              <text x="37" y="33" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Bloc A</text>
              <text x="97" y="33" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Bloc B</text>
              <text x="190" y="33" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Amphi</text>
              <text x="260" y="33" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Admin</text>
              <text x="37" y="103" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Bloc C</text>
              <text x="97" y="103" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Bloc D</text>
              <text x="190" y="103" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Biblio</text>
              <text x="260" y="103" textAnchor="middle" fontSize="7" fill="#7A8499" fontFamily="DM Sans,sans-serif">Cafét.</text>
            </svg>
            <div style={{ position: 'absolute', left: `${pinPos.x}%`, top: `${pinPos.y}%`, transform: 'translate(-50%, -100%)', pointerEvents: 'none' }}>
              <svg width="24" height="30" viewBox="0 0 24 30"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0z" fill={COLORS.red}/><circle cx="12" cy="12" r="5" fill="white"/></svg>
            </div>
          </div>
        </div>

        {/* Category */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 14, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.label, marginBottom: 10 }}>{isRTL ? 'الفئة' : 'Catégorie'}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)} style={{
                padding: '7px 12px', borderRadius: 12, cursor: 'pointer',
                border: `1.5px solid ${category === c.id ? COLORS.accent : COLORS.gray200}`,
                background: category === c.id ? COLORS.accentLight : COLORS.white,
                fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500,
                color: category === c.id ? COLORS.accent : COLORS.gray600,
                display: 'flex', alignItems: 'center', gap: 5,
              }}><span>{c.icon}</span> {c.label}</button>
            ))}
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...T.small }}>{isRTL ? 'الأولوية:' : 'Priorité auto :'}</span>
            <PriorityBadge level={category === 'douches' ? 'urgent' : category === 'reseau' ? 'normal' : 'faible'} />
          </div>
        </div>

        {/* Input */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 14, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.label, marginBottom: 10 }}>{isRTL ? 'وصف المشكل' : 'Décris le problème'}</div>
          <div style={{ display: 'flex', background: COLORS.gray100, borderRadius: 12, padding: 3, marginBottom: 14 }}>
            {[{ id: 'photo', icon: '📷' }, { id: 'vocal', icon: '🎙️' }, { id: 'text', icon: '✏️' }].map(t => (
              <button key={t.id} onClick={() => setInputTab(t.id)} style={{
                flex: 1, padding: '7px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: inputTab === t.id ? COLORS.white : 'none',
                boxShadow: inputTab === t.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                fontSize: 16,
              }}>{t.icon}</button>
            ))}
          </div>
          {inputTab === 'text' && (
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder={isRTL ? 'وصف المشكل هنا...' : 'Décris le problème ici...'} style={{
              width: '100%', height: 90, borderRadius: 12, border: `1.5px solid ${COLORS.gray200}`,
              padding: '10px 12px', fontFamily: "'DM Sans',sans-serif", fontSize: 14,
              resize: 'none', boxSizing: 'border-box', color: COLORS.gray900, outline: 'none',
            }} />
          )}
          {inputTab === 'photo' && (
            <div style={{ height: 90, borderRadius: 12, border: `2px dashed ${COLORS.gray200}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', background: COLORS.gray100 }} onClick={() => setPhoto('taken')}>
              {photo ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 8, background: '#D1FAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📸</div>
                  <span style={{ ...T.small, color: COLORS.green, fontWeight: 600 }}>Photo ajoutée ✓</span>
                </div>
              ) : (<><span style={{ fontSize: 28 }}>📷</span><span style={{ ...T.small }}>{isRTL ? 'اضغط لإضافة صورة' : 'Appuyer pour ajouter une photo'}</span></>)}
            </div>
          )}
          {inputTab === 'vocal' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <button onClick={toggleRecording} style={{
                width: 68, height: 68, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: recording ? COLORS.red : COLORS.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                boxShadow: recording ? '0 0 0 8px rgba(232,64,64,0.2)' : '0 4px 16px rgba(0,201,177,0.35)',
              }}>🎙️</button>
              <span style={{ ...T.small, fontWeight: 500, color: recording ? COLORS.red : COLORS.gray600 }}>
                {recording ? (isRTL ? 'جاري التسجيل...' : 'Enregistrement...') : (isRTL ? 'اضغط للتسجيل' : 'Appuyer pour enregistrer')}
              </span>
              {text && <div style={{ ...T.body, background: COLORS.gray100, borderRadius: 10, padding: '8px 12px', fontSize: 13 }}>{text}</div>}
            </div>
          )}
        </div>

        {/* AI preview */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 14, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ ...T.label }}>{isRTL ? '🤖 النص المُولَّد:' : '🤖 Texte généré pour l\'administration :'}</div>
            <button onClick={generateAI} style={{ padding: '4px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: COLORS.accentLight, color: COLORS.accent, fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600 }}>
              {isRTL ? 'توليد' : 'Générer ✨'}
            </button>
          </div>
          <div style={{ background: COLORS.gray100, borderRadius: 10, padding: '10px 12px', minHeight: 70 }}>
            {aiLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[100, 80, 90].map((w, i) => <div key={i} style={{ height: 10, borderRadius: 5, background: COLORS.gray200, width: `${w}%` }}/>)}
              </div>
            ) : aiText ? (
              <p style={{ ...T.body, fontSize: 12, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>{aiText}</p>
            ) : (
              <p style={{ ...T.small, fontStyle: 'italic', margin: 0 }}>
                {isRTL ? 'اضغط على "توليد"' : 'Appuie sur "Générer" pour créer le message formel.'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer button — stays at bottom, no position:fixed */}
      <div style={{ padding: '12px 20px 20px', background: COLORS.white, borderTop: `1px solid ${COLORS.gray200}`, flexShrink: 0 }}>
        <button onClick={() => navigate('submitSuccess')} style={{
          width: '100%', padding: '14px', borderRadius: 12,
          background: COLORS.primary, border: 'none', color: '#fff',
          fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer',
        }}>
          {isRTL ? '📤 صيفط للإدارة' : "📤 Soumettre à l'administration"}
        </button>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 8px rgba(232,64,64,0.2)} 50%{box-shadow:0 0 0 16px rgba(232,64,64,0.1)} }
      `}</style>
    </div>
  );
}

// ─── SCREEN 4: TICKETS ────────────────────────────────────────
function ScreenTickets({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: COLORS.white, padding: '16px 20px', borderBottom: `1px solid ${COLORS.gray200}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span style={{ ...T.h2, fontSize: 17 }}>{isRTL ? 'شكاواتي' : 'Mes doléances'}</span>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {TICKETS_DATA.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
      </div>
    </div>
  );
}

// ─── SCREEN 5: MENTORS LIST ───────────────────────────────────
function ScreenMentors({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('Tous');
  const filters = ['Tous', 'Alumni', 'Professeurs', 'Professionnels'];
  const filtered = MENTORS_DATA.filter(m =>
    (filter === 'Tous' || m.sector === filter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );
  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: COLORS.white, padding: '16px 20px 14px', borderBottom: `1px solid ${COLORS.gray200}` }}>
        <div style={{ ...T.h2, fontSize: 17, marginBottom: 12 }}>{isRTL ? 'اكتشف المنتورين' : 'Découvrir les mentors'}</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: COLORS.gray100, borderRadius: 12, padding: '8px 12px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray400} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={isRTL ? 'ابحث...' : 'Rechercher...'} style={{ border: 'none', background: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: 14, flex: 1, outline: 'none', color: COLORS.gray900 }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 14px', borderRadius: 20,
              border: `1.5px solid ${filter === f ? COLORS.accent : COLORS.gray200}`,
              background: filter === f ? COLORS.accentLight : COLORS.white, cursor: 'pointer',
              color: filter === f ? COLORS.accent : COLORS.gray600,
              fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
            }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(m => <MentorCard key={m.name} mentor={m} onContact={() => navigate('chat')} />)}
      </div>
    </div>
  );
}

// ─── SCREEN 6: MENTOR PROFILE ─────────────────────────────────
function ScreenMentorProfile({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const mentor = MENTORS_DATA[0];
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    let v = 0; const i = setInterval(() => { v += 2; if (v >= mentor.score) { setScore(mentor.score); clearInterval(i); } else setScore(v); }, 16);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', direction: isRTL ? 'rtl' : 'ltr', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: COLORS.primary, padding: '20px 20px 28px' }}>
        <button onClick={() => navigate('mentors')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, padding: '6px 10px', cursor: 'pointer', marginBottom: 20 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar name={mentor.name} size={72} color="#00C9B1" />
          <div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff' }}>{mentor.name}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>{mentor.role} · {mentor.company}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: COLORS.accent }}>✨ {score}%</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{isRTL ? 'توافق' : 'compatible'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.h3, marginBottom: 8 }}>À propos</div>
          <p style={{ ...T.body, lineHeight: 1.7, margin: 0 }}>{mentor.bio}</p>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.h3, marginBottom: 10 }}>Expertise</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {mentor.tags.map(tag => (
              <span key={tag} style={{ padding: '5px 12px', borderRadius: 10, background: COLORS.accentLight, color: COLORS.accent, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.h3, marginBottom: 10 }}>Disponibilités</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {mentor.slots.map(slot => (
              <button key={slot} style={{ padding: '7px 14px', borderRadius: 10, border: `1.5px solid ${COLORS.gray200}`, background: COLORS.bg, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: COLORS.gray900, cursor: 'pointer', fontWeight: 500 }}>{slot}</button>
            ))}
          </div>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ ...T.h3 }}>Avis</div>
            <div style={{ display: 'flex', gap: 2 }}>{'⭐'.repeat(5)}</div>
          </div>
          {[
            { name: 'Mehdi B.', text: "Yasmine m'a vraiment aidé à préparer mes entretiens Google. Super disponible !" },
            { name: 'Sara L.', text: 'Conseils très pratiques pour le stage. Je la recommande vivement.' },
          ].map((r, i) => (
            <div key={i} style={{ borderTop: `1px solid ${COLORS.gray100}`, paddingTop: 10, marginTop: 10 }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.gray900 }}>{r.name}</div>
              <p style={{ ...T.body, fontSize: 12, lineHeight: 1.6, margin: '4px 0 0' }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 20px 20px', background: COLORS.white, borderTop: `1px solid ${COLORS.gray200}`, flexShrink: 0 }}>
        <button onClick={() => navigate('chat')} style={{
          width: '100%', padding: '14px', borderRadius: 12,
          background: COLORS.accent, border: 'none', color: '#fff',
          fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,201,177,0.35)',
        }}>
          {isRTL ? 'صيفط طلب' : 'Envoyer une demande'}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 7: CHAT ──────────────────────────────────────────
function ScreenChat({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    { from: 'mentor', text: 'Bonjour ! Je suis ravie de pouvoir vous aider. Parlez-moi de votre parcours.', time: '10:12' },
    { from: 'student', text: "Bonjour Yasmine ! Je suis en 3ème année GL, je cherche un stage en IA pour cet été.", time: '10:15' },
    { from: 'mentor', text: "Parfait ! Avez-vous déjà eu des expériences en machine learning ? Je peux vous orienter vers des opportunités chez Google.", time: '10:17' },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: 'student', text: input.trim(), time: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div style={{ background: COLORS.bg, height: '100%', display: 'flex', flexDirection: 'column', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: COLORS.white, padding: '14px 16px', borderBottom: `1px solid ${COLORS.gray200}`, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => navigate('mentors')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <Avatar name="Yasmine Benali" size={36} />
        <div style={{ flex: 1 }}>
          <div style={{ ...T.h3, fontSize: 14 }}>Yasmine Benali</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green }} />
            <span style={{ ...T.small, fontSize: 11 }}>En ligne</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'student' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
            {msg.from === 'mentor' && <Avatar name="Yasmine Benali" size={28} />}
            <div style={{ maxWidth: '72%' }}>
              <div style={{
                background: msg.from === 'student' ? COLORS.accent : COLORS.white,
                color: msg.from === 'student' ? '#fff' : COLORS.gray900,
                borderRadius: msg.from === 'student' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '10px 14px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.5,
              }}>{msg.text}</div>
              <div style={{ ...T.small, fontSize: 10, textAlign: msg.from === 'student' ? 'right' : 'left', marginTop: 3 }}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: COLORS.white, borderTop: `1px solid ${COLORS.gray200}`, padding: '10px 16px 20px', display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={isRTL ? 'اكتب رسالة...' : 'Écrire un message...'} style={{
          flex: 1, padding: '10px 14px', borderRadius: 24, border: `1.5px solid ${COLORS.gray200}`,
          fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: 'none', color: COLORS.gray900, background: COLORS.gray100,
        }} />
        <button onClick={send} style={{ width: 42, height: 42, borderRadius: '50%', background: COLORS.accent, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 8: STUDENT PROFILE ────────────────────────────────
function ScreenProfile({ navigate, lang }) {
  const isRTL = lang === 'دارجة';
  const [skills, setSkills] = React.useState(['Python', 'React', 'TensorFlow', 'Linux']);
  const [editSkill, setEditSkill] = React.useState('');

  return (
    <div style={{ background: COLORS.bg, minHeight: '100%', paddingBottom: 80, direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ background: `linear-gradient(160deg, ${COLORS.primary} 0%, #2A5298 100%)`, padding: '24px 20px 36px', textAlign: 'center' }}>
        <Avatar name="Amine El Mansouri" size={72} color={COLORS.accent} />
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 12 }}>Amine El Mansouri</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Génie Logiciel · 3ème année · INPT</div>
        <div style={{ marginTop: 10 }}>
          <span style={{ padding: '4px 14px', borderRadius: 20, background: 'rgba(0,201,177,0.2)', color: COLORS.accent, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>
            🎯 {isRTL ? 'نقلب على ستاج' : 'Recherche de stage'}
          </span>
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.h3, marginBottom: 10 }}>{isRTL ? 'كفاءاتي' : 'Mes compétences'}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map(s => (
              <button key={s} onClick={() => setSkills(skills.filter(sk => sk !== s))} style={{
                padding: '5px 12px', borderRadius: 10, border: `1.5px solid ${COLORS.gray200}`,
                background: COLORS.bg, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: COLORS.gray900, cursor: 'pointer',
              }}>{s} ×</button>
            ))}
            <input value={editSkill} onChange={e => setEditSkill(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && editSkill.trim()) { setSkills([...skills, editSkill.trim()]); setEditSkill(''); } }}
              placeholder="+ Ajouter"
              style={{ padding: '5px 12px', borderRadius: 10, border: `1.5px dashed ${COLORS.accent}`, background: COLORS.accentLight, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: COLORS.accent, outline: 'none', width: 80 }} />
          </div>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(27,58,107,0.06)' }}>
          <div style={{ ...T.h3, marginBottom: 10 }}>{isRTL ? 'اهتماماتي' : "Centres d'intérêt"}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['IA/ML', 'Cybersécurité', 'Cloud'].map(t => (
              <span key={t} style={{ padding: '5px 12px', borderRadius: 10, background: COLORS.accentLight, color: COLORS.accent, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: isRTL ? 'شكاوى' : 'Doléances', count: 3, action: () => navigate('tickets') },
            { label: isRTL ? 'منتورين' : 'Mentors', count: 2, action: () => navigate('mentors') },
          ].map((s, i) => (
            <button key={i} onClick={s.action} style={{ flex: 1, background: COLORS.white, borderRadius: 16, padding: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(27,58,107,0.06)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800, color: COLORS.primary }}>{s.count}</div>
              <div style={{ ...T.small, marginTop: 4 }}>{s.label}</div>
            </button>
          ))}
        </div>
        <button onClick={() => navigate('settings')} style={{ padding: '12px', borderRadius: 12, border: `1.5px solid ${COLORS.primary}`, background: 'none', color: COLORS.primary, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          ✏️ {isRTL ? 'عدل البروفيل' : 'Modifier le profil'}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenOnboarding, ScreenHome, ScreenHomeStudent, ScreenHomeAdmin, ScreenHomeMentor,
  ScreenSubmit, ScreenTickets, ScreenMentors, ScreenMentorProfile, ScreenChat, ScreenProfile,
  MENTORS_DATA, TICKETS_DATA,
});
