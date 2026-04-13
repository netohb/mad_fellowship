import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate()

    return (
        <div style={styles.container}>

            {/* NAV */}
            <nav style={styles.nav}>
                <div style={styles.navLeft}>
                    <img
                        src="/logo-epic.png"
                        alt="EPIC Lab"
                        style={{ height: '48px', cursor: 'pointer' }}
                        onClick={() => window.open('https://epiclab.itam.mx', '_blank')}
                    />
                    <span style={styles.navDivider}>|</span>
                    <span style={styles.navSub}>Mentor Match</span>
                </div>
                <div style={styles.navLinks}>
                    <button style={styles.navLinkBtn} onClick={() => navigate('/founder')}>
                        Soy Founder
                    </button>
                    <button style={styles.navBtnOutline} onClick={() => navigate('/mentor')}>
                        Soy Mentor
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section style={styles.hero}>
                <div style={styles.heroInner}>
                    <div style={styles.badge}>MAD Fellowship 2026</div>
                    <h1 style={styles.heroTitle}>
                        Conectamos <span style={styles.green}>founders</span><br />
                        con los mentores<br />
                        correctos del <span style={styles.green}>ITAM</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Una extensión del EPIC Lab que usa un algoritmo inteligente para hacer
                        match entre emprendedores de la comunidad ITAM y mentores de las mejores empresas.
                    </p>
                    <div style={styles.heroButtons}>
                        <button style={styles.btnGreen} onClick={() => navigate('/founder')}>
                            Encontrar mi mentor →
                        </button>
                        <button style={styles.btnOutline} onClick={() => navigate('/mentor')}>
                            Registrarme como mentor
                        </button>
                    </div>
                </div>

                {/* EPIC acrónimo como decoración */}
                <div style={styles.epicAcro}>
                    <div style={styles.acroRow}><span style={styles.acroLetter}>E</span><span style={styles.acroWord}>mprender</span></div>
                    <div style={styles.acroRow}><span style={styles.acroLetter}>P</span><span style={styles.acroWord}>rogresar</span></div>
                    <div style={styles.acroRow}><span style={styles.acroLetter}>I</span><span style={styles.acroWord}>nnovar</span></div>
                    <div style={styles.acroRow}><span style={styles.acroLetter}>C</span><span style={styles.acroWord}>rear</span></div>
                </div>
            </section>

            {/* SEPARADOR */}
            <div style={styles.greenBar}>
                <span>Centro ITAM de Creatividad, Innovación y Emprendimiento</span>
            </div>

            {/* CÓMO FUNCIONA */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>¿Cómo funciona?</h2>
                <p style={styles.sectionSubtitle}>
                    Tres pasos para conectarte con el mentor que tu startup necesita
                </p>
                <div style={styles.stepsGrid}>
                    {[
                        {
                            num: '01',
                            title: 'Describe tu startup',
                            desc: 'Cuéntanos en qué industria estás, el problema que resuelves, tu impacto en el mundo y en qué etapa va tu proyecto.',
                            icon: '🚀'
                        },
                        {
                            num: '02',
                            title: 'El algoritmo trabaja',
                            desc: 'Analizamos tu perfil contra nuestra base de mentores ITAM y calculamos compatibilidad por industria, expertise y etapa.',
                            icon: '⚡'
                        },
                        {
                            num: '03',
                            title: 'Conoce tu top 3',
                            desc: 'Te presentamos los 3 mentores más compatibles con una justificación clara y transparente de por qué son los correctos.',
                            icon: '🎯'
                        },
                    ].map((step) => (
                        <div key={step.num} style={styles.stepCard}>
                            <div style={styles.stepIcon}>{step.icon}</div>
                            <span style={styles.stepNum}>{step.num}</span>
                            <h3 style={styles.stepTitle}>{step.title}</h3>
                            <p style={styles.stepDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* STATS — fondo verde oscuro como el EPIC */}
            <section style={styles.statsSection}>
                <h2 style={styles.statsSectionTitle}>La comunidad ITAM que te respalda</h2>
                <div style={styles.statsGrid}>
                    {[
                        { value: '6+', label: 'Mentores activos' },
                        { value: '4', label: 'Criterios de matching' },
                        { value: '5', label: 'Industrias cubiertas' },
                        { value: '100%', label: 'Comunidad ITAM' },
                    ].map((stat) => (
                        <div key={stat.label} style={styles.statItem}>
                            <span style={styles.statValue}>{stat.value}</span>
                            <span style={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA FINAL */}
            <section style={styles.ctaSection}>
                <h2 style={styles.ctaTitle}>¿Listo para encontrar tu mentor?</h2>
                <p style={styles.ctaSubtitle}>
                    Toma menos de 3 minutos completar tu perfil y ver tus matches.
                </p>
                <button style={styles.btnGreen} onClick={() => navigate('/founder')}>
                    Comenzar ahora →
                </button>
            </section>

            {/* FOOTER */}
            <footer style={styles.footer}>
                <div style={styles.footerTop}>
                    <div style={styles.logoBox}>
                        <span style={styles.logoEpic}>EPIC</span>
                        <span style={styles.logoLab}>LAB</span>
                    </div>
                    <span style={styles.footerTagline}>
                        <span style={styles.green}>E</span>mprender +{' '}
                        <span style={styles.green}>P</span>rogresar +{' '}
                        <span style={styles.green}>I</span>nnovar +{' '}
                        <span style={styles.green}>C</span>rear
                    </span>
                </div>
                <div style={styles.footerBottom}>
                    <p>EPIC Lab ITAM — MAD Fellowship 2026 — Mentor Match Platform</p>
                </div>
            </footer>

        </div>
    )
}

const GREEN = '#7dc242'
const DARK_GREEN = '#1a5c2a'
const BLACK = '#0a0a0a'
const DARK = '#111111'
const CARD = '#161616'
const BORDER = '#222222'

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: BLACK,
        color: '#ffffff',
    },

    // NAV
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 60px',
        backgroundColor: DARK_GREEN,
        borderBottom: `3px solid ${GREEN}`,
    },
    navLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    logoBox: {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1',
    },
    logoEpic: {
        fontSize: '22px',
        fontWeight: '900',
        color: GREEN,
        letterSpacing: '4px',
    },
    logoLab: {
        fontSize: '13px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '3px',
    },
    navDivider: {
        color: '#ffffff44',
        fontSize: '24px',
    },
    navSub: {
        fontSize: '15px',
        color: '#ffffffcc',
        fontWeight: '500',
    },
    navLinks: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
    },
    navLinkBtn: {
        background: 'transparent',
        border: 'none',
        color: '#ffffffcc',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '6px',
    },
    navBtnOutline: {
        background: 'transparent',
        border: `1px solid ${GREEN}`,
        color: GREEN,
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '8px 20px',
        borderRadius: '6px',
    },

    // HERO
    hero: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '80px 60px',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '60px',
    },
    heroInner: {
        flex: 1,
    },
    badge: {
        display: 'inline-block',
        background: DARK_GREEN,
        border: `1px solid ${GREEN}`,
        color: GREEN,
        padding: '6px 16px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '28px',
    },
    heroTitle: {
        fontSize: '52px',
        fontWeight: '900',
        lineHeight: '1.1',
        marginBottom: '24px',
        letterSpacing: '-1px',
        color: '#ffffff',
    },
    green: {
        color: GREEN,
    },
    heroSubtitle: {
        fontSize: '17px',
        color: '#999',
        marginBottom: '40px',
        lineHeight: '1.7',
        maxWidth: '520px',
    },
    heroButtons: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
    },
    btnGreen: {
        background: GREEN,
        color: '#000',
        padding: '14px 32px',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: '700',
        border: 'none',
        cursor: 'pointer',
    },
    btnOutline: {
        background: 'transparent',
        color: '#fff',
        padding: '14px 32px',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: '600',
        border: '1px solid #444',
        cursor: 'pointer',
    },

    // EPIC ACRÓNIMO
    epicAcro: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: DARK_GREEN,
        padding: '32px 40px',
        borderRadius: '12px',
        border: `1px solid ${GREEN}33`,
        flexShrink: 0,
    },
    acroRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    acroLetter: {
        fontSize: '28px',
        fontWeight: '900',
        color: GREEN,
        width: '32px',
    },
    acroWord: {
        fontSize: '18px',
        color: '#ffffffcc',
        fontWeight: '500',
    },

    // BARRA VERDE
    greenBar: {
        backgroundColor: DARK_GREEN,
        padding: '16px 60px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffffdd',
        letterSpacing: '1px',
        textAlign: 'center',
        borderTop: `1px solid ${GREEN}44`,
        borderBottom: `1px solid ${GREEN}44`,
    },

    // SECCIÓN
    section: {
        padding: '80px 60px',
        maxWidth: '1100px',
        margin: '0 auto',
    },
    sectionTitle: {
        fontSize: '36px',
        fontWeight: '800',
        marginBottom: '12px',
        textAlign: 'center',
        color: '#fff',
    },
    sectionSubtitle: {
        textAlign: 'center',
        color: '#666',
        fontSize: '16px',
        marginBottom: '48px',
    },
    stepsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
    },
    stepCard: {
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: '12px',
        padding: '32px',
        borderTop: `3px solid ${GREEN}`,
    },
    stepIcon: {
        fontSize: '28px',
        marginBottom: '16px',
    },
    stepNum: {
        fontSize: '12px',
        fontWeight: '700',
        color: GREEN,
        letterSpacing: '3px',
        display: 'block',
        marginBottom: '12px',
    },
    stepTitle: {
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '12px',
        color: '#fff',
    },
    stepDesc: {
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.7',
    },

    // STATS
    statsSection: {
        backgroundColor: DARK_GREEN,
        padding: '60px',
        textAlign: 'center',
    },
    statsSectionTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '40px',
    },
    statsGrid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        flexWrap: 'wrap',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },
    statValue: {
        fontSize: '48px',
        fontWeight: '900',
        color: GREEN,
        lineHeight: '1',
    },
    statLabel: {
        fontSize: '13px',
        color: '#ffffffaa',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },

    // MENTOR CTA
    mentorSection: {
        padding: '60px',
        maxWidth: '1100px',
        margin: '0 auto',
    },
    mentorCard: {
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: '12px',
        padding: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap',
    },
    mentorTitle: {
        fontSize: '26px',
        fontWeight: '800',
        marginBottom: '12px',
        color: '#fff',
    },
    mentorDesc: {
        fontSize: '15px',
        color: '#666',
        maxWidth: '500px',
        lineHeight: '1.7',
    },
    btnGreenLg: {
        background: GREEN,
        color: '#000',
        padding: '16px 36px',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: '700',
        border: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },

    // CTA
    ctaSection: {
        textAlign: 'center',
        padding: '100px 20px',
        borderTop: `1px solid ${BORDER}`,
    },
    ctaTitle: {
        fontSize: '38px',
        fontWeight: '800',
        marginBottom: '16px',
        color: '#fff',
    },
    ctaSubtitle: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '32px',
    },

    // FOOTER
    footer: {
        backgroundColor: DARK_GREEN,
        borderTop: `3px solid ${GREEN}`,
    },
    footerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 60px',
        flexWrap: 'wrap',
        gap: '16px',
    },
    footerTagline: {
        fontSize: '15px',
        color: '#ffffffaa',
        fontWeight: '500',
    },
    footerBottom: {
        borderTop: `1px solid ${GREEN}33`,
        padding: '16px 60px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#ffffff55',
    },
}