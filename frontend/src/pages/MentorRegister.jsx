import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const GREEN = '#7dc242'
const DARK_GREEN = '#1a5c2a'
const BLACK = '#0a0a0a'
const CARD = '#161616'
const BORDER = '#222222'

const INDUSTRIES = [
    'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 'SaaS B2B',
    'Sostenibilidad', 'Logística', 'Agritech', 'Legaltech', 'Otra'
]

const EXPERTISE_OPTIONS = [
    { id: 'fundraising', label: '💰 Fundraising' },
    { id: 'go-to-market', label: '🚀 Go-to-market' },
    { id: 'tech', label: '💻 Desarrollo tech' },
    { id: 'ventas', label: '🤝 Ventas' },
    { id: 'producto', label: '🎯 Producto' },
    { id: 'operaciones', label: '⚙️ Operaciones' },
    { id: 'growth', label: '📈 Growth' },
    { id: 'regulación', label: '⚖️ Regulación' },
    { id: 'marketing', label: '📣 Marketing' },
    { id: 'liderazgo', label: '👥 Liderazgo' },
    { id: 'finanzas', label: '📊 Finanzas' },
    { id: 'impacto social', label: '🌍 Impacto social' },
]

const STEPS = ['Tu perfil', 'Experiencia', 'Tu expertise', 'Disponibilidad']

export default function MentorRegister() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const [form, setForm] = useState({
        name: '',
        email: '',
        industry: '',
        bio: '',
        years_experience: '',
        current_role: '',
        company: '',
        expertise: [],
        availability: true,
    })

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const toggleExpertise = (id) => {
        setForm(prev => ({
            ...prev,
            expertise: prev.expertise.includes(id)
                ? prev.expertise.filter(e => e !== id)
                : [...prev.expertise, id]
        }))
    }

    const canNext = () => {
        if (step === 0) return form.name.trim() && form.email.trim() && form.email.includes('@')
        if (step === 1) return form.industry && form.years_experience && form.bio.trim().length > 30
        if (step === 2) return form.expertise.length > 0
        if (step === 3) return true
        return false
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        try {
            const payload = {
                name: form.name,
                email: form.email,
                industry: form.industry,
                bio: form.bio,
                years_experience: parseInt(form.years_experience),
                expertise: form.expertise,
                availability: form.availability,
            }
            await axios.post('http://localhost:8000/mentors/', payload)
            setSuccess(true)
        } catch (e) {
            if (e.response?.status === 400 || e.response?.status === 409) {
                setError('Este email ya está registrado como mentor.')
            } else {
                setError('Hubo un error al registrarte. Verifica que el backend esté corriendo.')
            }
        } finally {
            setLoading(false)
        }
    }

    if (success) return <SuccessScreen name={form.name} navigate={navigate} />

    return (
        <div style={styles.container}>
            {/* NAV */}
            <nav style={styles.nav}>
                <div style={styles.navLeft} onClick={() => navigate('/')}>
                    <img src="/logo-epic.png" alt="EPIC Lab" style={{ height: '44px', cursor: 'pointer' }} />
                    <span style={styles.navDivider}>|</span>
                    <span style={styles.navSub}>Registro de Mentores</span>
                </div>
                <button style={styles.navBack} onClick={() => navigate('/')}>← Volver</button>
            </nav>

            <div style={styles.main}>

                {/* HEADER */}
                <div style={styles.pageHeader}>
                    <div style={styles.badge}>Comunidad ITAM</div>
                    <h1 style={styles.pageTitle}>Regístrate como <span style={{ color: GREEN }}>mentor</span></h1>
                    <p style={styles.pageSub}>
                        Tu experiencia puede cambiar el rumbo de una startup. Únete a la red de mentores del EPIC Lab.
                    </p>
                </div>

                {/* PROGRESS */}
                <div style={styles.progressWrap}>
                    {STEPS.map((s, i) => (
                        <div key={s} style={styles.progressItem}>
                            <div style={{
                                ...styles.progressDot,
                                background: i <= step ? GREEN : '#333',
                                border: i === step ? `2px solid ${GREEN}` : '2px solid #333',
                                color: i <= step ? '#000' : '#666',
                            }}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            <span style={{ ...styles.progressLabel, color: i <= step ? GREEN : '#555' }}>{s}</span>
                            {i < STEPS.length - 1 && (
                                <div style={{ ...styles.progressLine, background: i < step ? GREEN : '#333' }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* CARD */}
                <div style={styles.card}>

                    {/* STEP 0 — Perfil básico */}
                    {step === 0 && (
                        <div>
                            <h2 style={styles.stepTitle}>👤 Tu información básica</h2>
                            <p style={styles.stepSub}>Con esto los founders podrán conocerte</p>

                            <label style={styles.label}>Nombre completo</label>
                            <input
                                style={styles.input}
                                placeholder="Ej. María González"
                                value={form.name}
                                onChange={e => update('name', e.target.value)}
                            />

                            <label style={styles.label}>Correo electrónico</label>
                            <input
                                style={styles.input}
                                type="email"
                                placeholder="Ej. maria@empresa.com"
                                value={form.email}
                                onChange={e => update('email', e.target.value)}
                            />

                            <label style={styles.label}>Rol actual</label>
                            <input
                                style={styles.input}
                                placeholder="Ej. CEO, CTO, Director de Producto..."
                                value={form.current_role}
                                onChange={e => update('current_role', e.target.value)}
                            />

                            <label style={styles.label}>Empresa u organización</label>
                            <input
                                style={styles.input}
                                placeholder="Ej. Clip, Konfío, ITAM..."
                                value={form.company}
                                onChange={e => update('company', e.target.value)}
                            />
                        </div>
                    )}

                    {/* STEP 1 — Experiencia */}
                    {step === 1 && (
                        <div>
                            <h2 style={styles.stepTitle}>💼 Tu experiencia</h2>
                            <p style={styles.stepSub}>Cuéntanos de tu trayectoria profesional</p>

                            <label style={styles.label}>Industria principal</label>
                            <div style={styles.optionsGrid}>
                                {INDUSTRIES.map(ind => (
                                    <button
                                        key={ind}
                                        style={{
                                            ...styles.optionBtn,
                                            background: form.industry === ind ? GREEN : 'transparent',
                                            color: form.industry === ind ? '#000' : '#aaa',
                                            border: `1px solid ${form.industry === ind ? GREEN : '#333'}`,
                                        }}
                                        onClick={() => update('industry', ind)}
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>

                            <label style={styles.label}>Años de experiencia profesional</label>
                            <div style={styles.yearsRow}>
                                {['1-3', '4-6', '7-10', '11-15', '15+'].map(y => (
                                    <button
                                        key={y}
                                        style={{
                                            ...styles.yearBtn,
                                            background: form.years_experience === y ? DARK_GREEN : 'transparent',
                                            border: `1px solid ${form.years_experience === y ? GREEN : '#333'}`,
                                            color: form.years_experience === y ? GREEN : '#aaa',
                                        }}
                                        onClick={() => update('years_experience', y)}
                                    >
                                        {y} años
                                    </button>
                                ))}
                            </div>

                            <label style={styles.label}>Tu bio profesional</label>
                            <p style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>
                                Describe tu trayectoria, logros y por qué quieres ser mentor (mín. 30 caracteres)
                            </p>
                            <textarea
                                style={styles.textarea}
                                placeholder="Ej. Ex-CTO de startup de Fintech adquirida por Grupo Financiero Banorte. 10 años construyendo productos digitales en LATAM. Apasionado por ayudar a founders técnicos a entender el negocio..."
                                value={form.bio}
                                onChange={e => update('bio', e.target.value)}
                                rows={5}
                            />
                            <p style={{ fontSize: '12px', color: form.bio.length > 30 ? GREEN : '#555', textAlign: 'right' }}>
                                {form.bio.length} caracteres
                            </p>
                        </div>
                    )}

                    {/* STEP 2 — Expertise */}
                    {step === 2 && (
                        <div>
                            <h2 style={styles.stepTitle}>⚡ Tu expertise</h2>
                            <p style={styles.stepSub}>¿En qué áreas puedes mentorear? Selecciona todas las que apliquen</p>

                            <div style={styles.helpGrid}>
                                {EXPERTISE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        style={{
                                            ...styles.helpBtn,
                                            background: form.expertise.includes(opt.id) ? DARK_GREEN : 'transparent',
                                            border: `1px solid ${form.expertise.includes(opt.id) ? GREEN : '#333'}`,
                                            color: form.expertise.includes(opt.id) ? GREEN : '#aaa',
                                        }}
                                        onClick={() => toggleExpertise(opt.id)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            {form.expertise.length > 0 && (
                                <div style={styles.selectedWrap}>
                                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                                        Seleccionadas ({form.expertise.length}):
                                    </p>
                                    <div style={styles.tags}>
                                        {form.expertise.map(e => (
                                            <span key={e} style={styles.tag}>{e}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 3 — Disponibilidad y confirmación */}
                    {step === 3 && (
                        <div>
                            <h2 style={styles.stepTitle}>📅 Disponibilidad y confirmación</h2>
                            <p style={styles.stepSub}>Último paso antes de unirte a la comunidad</p>

                            <label style={styles.label}>¿Estás disponible para mentorear ahora?</label>
                            <div style={styles.stageRow}>
                                {[
                                    { id: true, label: '✅ Sí, disponible', desc: 'Apareceré en los matches activos' },
                                    { id: false, label: '⏸ Por ahora no', desc: 'Me registró pero no aparezco en matches' },
                                ].map(opt => (
                                    <button
                                        key={String(opt.id)}
                                        style={{
                                            ...styles.stageBtn,
                                            background: form.availability === opt.id ? DARK_GREEN : 'transparent',
                                            border: `1px solid ${form.availability === opt.id ? GREEN : '#333'}`,
                                        }}
                                        onClick={() => update('availability', opt.id)}
                                    >
                                        <span style={{ fontSize: '22px' }}>{opt.label.split(' ')[0]}</span>
                                        <span style={{ fontWeight: '700', color: form.availability === opt.id ? GREEN : '#fff', fontSize: '14px' }}>
                                            {opt.label.split(' ').slice(1).join(' ')}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>{opt.desc}</span>
                                    </button>
                                ))}
                            </div>

                            {/* RESUMEN */}
                            <div style={styles.summary}>
                                <h3 style={styles.summaryTitle}>Resumen de tu perfil</h3>
                                <div style={styles.summaryGrid}>
                                    <div style={styles.summaryItem}>
                                        <span style={styles.summaryLabel}>Nombre</span>
                                        <span style={styles.summaryValue}>{form.name}</span>
                                    </div>
                                    <div style={styles.summaryItem}>
                                        <span style={styles.summaryLabel}>Email</span>
                                        <span style={styles.summaryValue}>{form.email}</span>
                                    </div>
                                    <div style={styles.summaryItem}>
                                        <span style={styles.summaryLabel}>Industria</span>
                                        <span style={styles.summaryValue}>{form.industry}</span>
                                    </div>
                                    <div style={styles.summaryItem}>
                                        <span style={styles.summaryLabel}>Experiencia</span>
                                        <span style={styles.summaryValue}>{form.years_experience} años</span>
                                    </div>
                                </div>
                                <div style={styles.summaryItem}>
                                    <span style={styles.summaryLabel}>Expertise</span>
                                    <div style={styles.tags}>
                                        {form.expertise.map(e => (
                                            <span key={e} style={styles.tag}>{e}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && <p style={styles.error}>{error}</p>}

                    {/* BOTONES */}
                    <div style={styles.btnRow}>
                        {step > 0 && (
                            <button style={styles.btnBack} onClick={() => setStep(s => s - 1)}>
                                ← Anterior
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                style={{ ...styles.btnNext, opacity: canNext() ? 1 : 0.4 }}
                                disabled={!canNext()}
                                onClick={() => setStep(s => s + 1)}
                            >
                                Siguiente →
                            </button>
                        ) : (
                            <button
                                style={{ ...styles.btnNext, opacity: !loading ? 1 : 0.4 }}
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Registrando...' : '🎉 Registrarme como mentor'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// PANTALLA DE ÉXITO
function SuccessScreen({ name, navigate }) {
    return (
        <div style={styles.container}>
            <nav style={styles.nav}>
                <div style={styles.navLeft} onClick={() => navigate('/')}>
                    <img src="/logo-epic.png" alt="EPIC Lab" style={{ height: '44px', cursor: 'pointer' }} />
                    <span style={styles.navDivider}>|</span>
                    <span style={styles.navSub}>Registro de Mentores</span>
                </div>
            </nav>

            <div style={styles.successMain}>
                <div style={styles.successIcon}>🎉</div>
                <div style={styles.badge}>¡Registro exitoso!</div>
                <h1 style={styles.successTitle}>
                    Bienvenido a la comunidad,<br />
                    <span style={{ color: GREEN }}>{name}</span>
                </h1>
                <p style={styles.successSub}>
                    Ya eres parte de la red de mentores del EPIC Lab del ITAM.
                    Los founders podrán encontrarte a través de nuestro algoritmo de matching.
                </p>
                <div style={styles.successCards}>
                    <div style={styles.successCard}>
                        <span style={{ fontSize: '28px' }}>📬</span>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                            Recibirás un email cuando un founder haga match contigo
                        </p>
                    </div>
                    <div style={styles.successCard}>
                        <span style={{ fontSize: '28px' }}>⚡</span>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                            Tu perfil ya está activo en el algoritmo de matching
                        </p>
                    </div>
                    <div style={styles.successCard}>
                        <span style={{ fontSize: '28px' }}>🤝</span>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                            Podrás aceptar o rechazar cada solicitud de mentoría
                        </p>
                    </div>
                </div>
                <div style={styles.successBtns}>
                    <button style={styles.btnNext} onClick={() => navigate('/')}>
                        Volver al inicio
                    </button>
                    <button style={styles.btnBack} onClick={() => navigate('/founder')}>
                        Ver cómo funciona el match
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: { minHeight: '100vh', backgroundColor: BLACK, color: '#fff' },
    nav: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 60px', backgroundColor: DARK_GREEN, borderBottom: `3px solid ${GREEN}`,
    },
    navLeft: { display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' },
    navDivider: { color: '#ffffff44', fontSize: '24px' },
    navSub: { fontSize: '15px', color: '#ffffffcc', fontWeight: '500' },
    navBack: {
        background: 'transparent', border: `1px solid ${GREEN}`, color: GREEN,
        padding: '8px 20px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer',
    },
    main: { maxWidth: '760px', margin: '0 auto', padding: '48px 24px' },

    pageHeader: { textAlign: 'center', marginBottom: '40px' },
    badge: { display: 'inline-block', background: DARK_GREEN, border: `1px solid ${GREEN}`, color: GREEN, padding: '6px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' },
    pageTitle: { fontSize: '36px', fontWeight: '900', marginBottom: '12px' },
    pageSub: { fontSize: '16px', color: '#666', maxWidth: '500px', margin: '0 auto' },

    progressWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' },
    progressItem: { display: 'flex', alignItems: 'center', gap: '8px' },
    progressDot: { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0 },
    progressLabel: { fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', marginRight: '8px' },
    progressLine: { width: '40px', height: '2px', marginRight: '8px' },

    card: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '40px', marginBottom: '24px' },
    stepTitle: { fontSize: '26px', fontWeight: '800', marginBottom: '8px', color: '#fff' },
    stepSub: { fontSize: '15px', color: '#666', marginBottom: '32px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#aaa', marginBottom: '10px', marginTop: '24px', textTransform: 'uppercase', letterSpacing: '1px' },
    input: { width: '100%', padding: '14px 16px', background: '#0f0f0f', border: `1px solid ${BORDER}`, borderRadius: '8px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '14px 16px', background: '#0f0f0f', border: `1px solid ${BORDER}`, borderRadius: '8px', color: '#fff', fontSize: '15px', resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.6' },

    optionsGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' },
    optionBtn: { padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },

    yearsRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' },
    yearBtn: { padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },

    stageRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' },
    stageBtn: { flex: 1, minWidth: '160px', padding: '20px 16px', borderRadius: '10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },

    helpGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px', marginBottom: '16px' },
    helpBtn: { padding: '12px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' },

    selectedWrap: { marginTop: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '8px', border: `1px solid ${BORDER}` },
    tags: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
    tag: { background: '#1a2a1a', border: `1px solid ${GREEN}44`, color: GREEN, padding: '4px 12px', borderRadius: '20px', fontSize: '12px' },

    summary: { background: '#0f0f0f', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '24px', marginTop: '24px' },
    summaryTitle: { fontSize: '16px', fontWeight: '700', color: GREEN, marginBottom: '16px' },
    summaryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
    summaryItem: { marginBottom: '12px' },
    summaryLabel: { display: 'block', fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' },
    summaryValue: { fontSize: '15px', color: '#fff', fontWeight: '600' },

    btnRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' },
    btnBack: { background: 'transparent', border: '1px solid #333', color: '#aaa', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
    btnNext: { background: GREEN, color: '#000', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' },
    error: { color: '#ff4444', fontSize: '14px', marginTop: '16px', padding: '12px', background: '#1a0000', borderRadius: '8px', border: '1px solid #ff444433' },

    successMain: { maxWidth: '640px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' },
    successIcon: { fontSize: '64px', marginBottom: '24px' },
    successTitle: { fontSize: '36px', fontWeight: '900', margin: '16px 0' },
    successSub: { fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '40px' },
    successCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '40px' },
    successCard: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '24px', textAlign: 'center' },
    successBtns: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
}