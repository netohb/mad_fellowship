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

const HELP_OPTIONS = [
    { id: 'fundraising', label: '💰 Fundraising' },
    { id: 'go-to-market', label: '🚀 Go-to-market' },
    { id: 'tech', label: '💻 Desarrollo tech' },
    { id: 'ventas', label: '🤝 Ventas' },
    { id: 'producto', label: '🎯 Producto' },
    { id: 'operaciones', label: '⚙️ Operaciones' },
    { id: 'growth', label: '📈 Growth' },
    { id: 'regulación', label: '⚖️ Regulación' },
]

const STEPS = ['Tu perfil', 'Tu startup', 'Tu impacto', '¿Qué necesitas?']

export default function FounderForm() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const [error, setError] = useState(null)

    const [form, setForm] = useState({
        name: '',
        startup_name: '',
        industry: '',
        problem_description: '',
        impact_description: '',
        technical_level: '',
        stage: '',
        help_needed: [],
    })

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const toggleHelp = (id) => {
        setForm(prev => ({
            ...prev,
            help_needed: prev.help_needed.includes(id)
                ? prev.help_needed.filter(h => h !== id)
                : [...prev.help_needed, id]
        }))
    }

    const canNext = () => {
        if (step === 0) return form.name.trim()
        if (step === 1) return form.startup_name && form.industry && form.stage
        if (step === 2) return form.problem_description.trim() && form.impact_description.trim()
        if (step === 3) return form.help_needed.length > 0 && form.technical_level
        return false
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        try {
            const payload = {
                name: form.name,
                startup_name: form.startup_name,
                industry: form.industry,
                problem_description: `${form.problem_description} | Impacto: ${form.impact_description}`,
                technical_level: form.technical_level,
                stage: form.stage,
                help_needed: form.help_needed,
            }
            const res = await axios.post('http://localhost:8000/match/', payload)
            setResults(res.data)
        } catch (e) {
            setError('Hubo un error conectando con la API. Verifica que el backend esté corriendo.')
        } finally {
            setLoading(false)
        }
    }

    if (results) return <Results results={results} onReset={() => { setResults(null); setStep(0) }} navigate={navigate} />

    return (
        <div style={styles.container}>
            {/* NAV */}
            <nav style={styles.nav}>
                <div style={styles.navLeft} onClick={() => navigate('/')} >
                    <img src="/logo-epic.png" alt="EPIC Lab" style={{ height: '44px', cursor: 'pointer' }} />
                    <span style={styles.navDivider}>|</span>
                    <span style={styles.navSub}>Mentor Match</span>
                </div>
                <button style={styles.navBack} onClick={() => navigate('/')}>← Volver</button>
            </nav>

            <div style={styles.main}>
                {/* PROGRESS */}
                <div style={styles.progressWrap}>
                    {STEPS.map((s, i) => (
                        <div key={s} style={styles.progressItem}>
                            <div style={{
                                ...styles.progressDot,
                                background: i <= step ? GREEN : '#333',
                                border: i === step ? `2px solid ${GREEN}` : '2px solid #333',
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

                    {/* STEP 0 — Tu perfil */}
                    {step === 0 && (
                        <div>
                            <h2 style={styles.stepTitle}>👋 Cuéntanos sobre ti</h2>
                            <p style={styles.stepSub}>Empecemos con lo básico</p>
                            <label style={styles.label}>Tu nombre completo</label>
                            <input
                                style={styles.input}
                                placeholder="Ej. Ana García"
                                value={form.name}
                                onChange={e => update('name', e.target.value)}
                            />
                        </div>
                    )}

                    {/* STEP 1 — Tu startup */}
                    {step === 1 && (
                        <div>
                            <h2 style={styles.stepTitle}>🚀 Tu startup</h2>
                            <p style={styles.stepSub}>Cuéntanos sobre tu proyecto</p>

                            <label style={styles.label}>Nombre de tu startup</label>
                            <input
                                style={styles.input}
                                placeholder="Ej. FinanzasFácil"
                                value={form.startup_name}
                                onChange={e => update('startup_name', e.target.value)}
                            />

                            <label style={styles.label}>Industria</label>
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

                            <label style={styles.label}>Etapa de tu startup</label>
                            <div style={styles.stageRow}>
                                {[
                                    { id: 'idea', label: '💡 Idea', desc: 'Validando el problema' },
                                    { id: 'mvp', label: '🛠 MVP', desc: 'Producto en construcción' },
                                    { id: 'crecimiento', label: '📈 Crecimiento', desc: 'Tracción y escala' },
                                ].map(s => (
                                    <button
                                        key={s.id}
                                        style={{
                                            ...styles.stageBtn,
                                            background: form.stage === s.id ? DARK_GREEN : 'transparent',
                                            border: `1px solid ${form.stage === s.id ? GREEN : '#333'}`,
                                        }}
                                        onClick={() => update('stage', s.id)}
                                    >
                                        <span style={{ fontSize: '20px' }}>{s.label.split(' ')[0]}</span>
                                        <span style={{ fontWeight: '700', color: form.stage === s.id ? GREEN : '#fff' }}>
                                            {s.label.split(' ')[1]}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#666' }}>{s.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 2 — Tu impacto */}
                    {step === 2 && (
                        <div>
                            <h2 style={styles.stepTitle}>🌍 Tu problema e impacto</h2>
                            <p style={styles.stepSub}>Queremos entender qué resuelves y cómo cambias el mundo</p>

                            <label style={styles.label}>¿Qué problema resuelve tu startup?</label>
                            <textarea
                                style={styles.textarea}
                                placeholder="Ej. Las PyMEs en México no tienen acceso a crédito porque los bancos no tienen forma de evaluar su historial crediticio..."
                                value={form.problem_description}
                                onChange={e => update('problem_description', e.target.value)}
                                rows={4}
                            />

                            <label style={styles.label}>¿Cómo impacta tu startup al mundo?</label>
                            <textarea
                                style={styles.textarea}
                                placeholder="Ej. Democratizamos el acceso a financiamiento para 4 millones de PyMEs en México, generando empleos y crecimiento económico..."
                                value={form.impact_description}
                                onChange={e => update('impact_description', e.target.value)}
                                rows={4}
                            />
                        </div>
                    )}

                    {/* STEP 3 — Qué necesitas */}
                    {step === 3 && (
                        <div>
                            <h2 style={styles.stepTitle}>🎯 ¿En qué necesitas ayuda?</h2>
                            <p style={styles.stepSub}>Selecciona todas las áreas donde buscas mentoría</p>

                            <label style={styles.label}>Áreas de apoyo (puedes elegir varias)</label>
                            <div style={styles.helpGrid}>
                                {HELP_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        style={{
                                            ...styles.helpBtn,
                                            background: form.help_needed.includes(opt.id) ? DARK_GREEN : 'transparent',
                                            border: `1px solid ${form.help_needed.includes(opt.id) ? GREEN : '#333'}`,
                                            color: form.help_needed.includes(opt.id) ? GREEN : '#aaa',
                                        }}
                                        onClick={() => toggleHelp(opt.id)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            <label style={styles.label}>Tu nivel técnico</label>
                            <div style={styles.stageRow}>
                                {[
                                    { id: 'bajo', label: '📊 Bajo', desc: 'Perfil de negocio' },
                                    { id: 'medio', label: '🔧 Medio', desc: 'Conocimiento general' },
                                    { id: 'alto', label: '💻 Alto', desc: 'Perfil técnico/ingeniero' },
                                ].map(t => (
                                    <button
                                        key={t.id}
                                        style={{
                                            ...styles.stageBtn,
                                            background: form.technical_level === t.id ? DARK_GREEN : 'transparent',
                                            border: `1px solid ${form.technical_level === t.id ? GREEN : '#333'}`,
                                        }}
                                        onClick={() => update('technical_level', t.id)}
                                    >
                                        <span style={{ fontSize: '20px' }}>{t.label.split(' ')[0]}</span>
                                        <span style={{ fontWeight: '700', color: form.technical_level === t.id ? GREEN : '#fff' }}>
                                            {t.label.split(' ')[1]}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#666' }}>{t.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BOTONES */}
                    {error && <p style={styles.error}>{error}</p>}
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
                                style={{ ...styles.btnNext, opacity: canNext() && !loading ? 1 : 0.4 }}
                                disabled={!canNext() || loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Buscando mentores...' : '🎯 Ver mis matches'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// COMPONENTE DE RESULTADOS
function Results({ results, onReset, navigate }) {
    const { founder, top_matches } = results

    return (
        <div style={styles.container}>
            <nav style={styles.nav}>
                <div style={styles.navLeft} onClick={() => navigate('/')}>
                    <img src="/logo-epic.png" alt="EPIC Lab" style={{ height: '44px', cursor: 'pointer' }} />
                    <span style={styles.navDivider}>|</span>
                    <span style={styles.navSub}>Mentor Match</span>
                </div>
                <button style={styles.navBack} onClick={() => navigate('/')}>← Inicio</button>
            </nav>

            <div style={styles.main}>
                <div style={styles.resultsHeader}>
                    <div style={styles.badge}>✅ Match completado</div>
                    <h1 style={styles.resultsTitle}>
                        Tus top 3 mentores, <span style={{ color: GREEN }}>{founder.name}</span>
                    </h1>
                    <p style={styles.resultsSub}>
                        Basado en el perfil de <strong>{founder.startup_name}</strong> en {founder.industry}
                    </p>
                </div>

                <div style={styles.matchesGrid}>
                    {top_matches.map((match, i) => (
                        <div key={i} style={{ ...styles.matchCard, borderTop: `3px solid ${i === 0 ? GREEN : '#333'}` }}>
                            {i === 0 && <div style={styles.bestBadge}>⭐ Mejor match</div>}
                            <div style={styles.matchHeader}>
                                <div style={styles.avatar}>
                                    {match.mentor.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 style={styles.mentorName}>{match.mentor.name}</h3>
                                    <span style={styles.mentorIndustry}>{match.mentor.industry}</span>
                                </div>
                                <div style={styles.scoreCircle}>
                                    <span style={styles.scoreNum}>{match.score}</span>
                                    <span style={styles.scoreLbl}>/ 100</span>
                                </div>
                            </div>

                            <p style={styles.mentorBio}>{match.mentor.bio}</p>

                            <div style={styles.tags}>
                                {match.mentor.expertise.map(e => (
                                    <span key={e} style={styles.tag}>{e}</span>
                                ))}
                            </div>

                            <div style={styles.justification}>
                                <span style={styles.justIcon}>💡</span>
                                <p style={styles.justText}>{match.justification}</p>
                            </div>

                            <div style={styles.mentorMeta}>
                                <span style={styles.metaItem}>📅 {match.mentor.years_experience} años de experiencia</span>
                                <span style={styles.metaItem}>✉️ {match.mentor.email}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.resetRow}>
                    <button style={styles.btnReset} onClick={onReset}>
                        Hacer otro match
                    </button>
                    <button style={styles.btnHome} onClick={() => navigate('/')}>
                        Volver al inicio
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

    // PROGRESS
    progressWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', gap: '0' },
    progressItem: { display: 'flex', alignItems: 'center', gap: '8px' },
    progressDot: {
        width: '32px', height: '32px', borderRadius: '50%', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '13px',
        fontWeight: '700', color: '#000', flexShrink: 0,
    },
    progressLabel: { fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', marginRight: '8px' },
    progressLine: { width: '40px', height: '2px', marginRight: '8px' },

    // CARD
    card: {
        background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px',
        padding: '40px', marginBottom: '24px',
    },
    stepTitle: { fontSize: '26px', fontWeight: '800', marginBottom: '8px', color: '#fff' },
    stepSub: { fontSize: '15px', color: '#666', marginBottom: '32px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#aaa', marginBottom: '10px', marginTop: '24px', textTransform: 'uppercase', letterSpacing: '1px' },
    input: {
        width: '100%', padding: '14px 16px', background: '#0f0f0f', border: `1px solid ${BORDER}`,
        borderRadius: '8px', color: '#fff', fontSize: '16px', boxSizing: 'border-box',
    },
    textarea: {
        width: '100%', padding: '14px 16px', background: '#0f0f0f', border: `1px solid ${BORDER}`,
        borderRadius: '8px', color: '#fff', fontSize: '15px', resize: 'vertical',
        boxSizing: 'border-box', lineHeight: '1.6',
    },
    optionsGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' },
    optionBtn: { padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
    stageRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
    stageBtn: {
        flex: 1, minWidth: '140px', padding: '16px', borderRadius: '10px', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    },
    helpGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px', marginBottom: '8px' },
    helpBtn: { padding: '12px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' },

    // BOTONES
    btnRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' },
    btnBack: { background: 'transparent', border: '1px solid #333', color: '#aaa', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
    btnNext: { background: GREEN, color: '#000', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' },
    error: { color: '#ff4444', fontSize: '14px', marginTop: '16px', padding: '12px', background: '#1a0000', borderRadius: '8px', border: '1px solid #ff444433' },

    // RESULTADOS
    resultsHeader: { textAlign: 'center', marginBottom: '48px' },
    badge: { display: 'inline-block', background: DARK_GREEN, border: `1px solid ${GREEN}`, color: GREEN, padding: '6px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    resultsTitle: { fontSize: '36px', fontWeight: '900', marginBottom: '12px' },
    resultsSub: { fontSize: '16px', color: '#666' },
    matchesGrid: { display: 'flex', flexDirection: 'column', gap: '24px' },
    matchCard: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '32px', position: 'relative' },
    bestBadge: { position: 'absolute', top: '16px', right: '16px', background: DARK_GREEN, border: `1px solid ${GREEN}`, color: GREEN, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
    matchHeader: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
    avatar: { width: '52px', height: '52px', borderRadius: '50%', background: DARK_GREEN, border: `2px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '900', color: GREEN, flexShrink: 0 },
    mentorName: { fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '4px' },
    mentorIndustry: { fontSize: '13px', color: GREEN, fontWeight: '600' },
    scoreCircle: { marginLeft: 'auto', textAlign: 'center', background: '#0f0f0f', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '10px 16px' },
    scoreNum: { fontSize: '28px', fontWeight: '900', color: GREEN, display: 'block' },
    scoreLbl: { fontSize: '11px', color: '#555' },
    mentorBio: { fontSize: '14px', color: '#888', lineHeight: '1.7', marginBottom: '16px' },
    tags: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' },
    tag: { background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#aaa', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' },
    justification: { display: 'flex', gap: '12px', background: '#0f1a0f', border: `1px solid ${GREEN}22`, borderRadius: '8px', padding: '16px', marginBottom: '16px' },
    justIcon: { fontSize: '18px', flexShrink: 0 },
    justText: { fontSize: '14px', color: '#aaa', lineHeight: '1.6' },
    mentorMeta: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
    metaItem: { fontSize: '13px', color: '#555' },
    resetRow: { display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '40px' },
    btnReset: { background: GREEN, color: '#000', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' },
    btnHome: { background: 'transparent', color: '#fff', border: '1px solid #333', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
}