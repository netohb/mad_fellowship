from fastapi import APIRouter, HTTPException
from models import FounderProfile
from database import supabase

router = APIRouter(prefix="/match", tags=["Matching"])


def calculate_score(founder: FounderProfile, mentor: dict) -> tuple[int, str]:
    score = 0
    reasons = []

    # 1. INDUSTRIA — peso alto (40 puntos)
    mentor_industry = mentor.get("industry", "").lower()
    founder_industry = founder.industry.lower()

    if mentor_industry == founder_industry:
        score += 40
        reasons.append(f"misma industria ({mentor['industry']})")
    elif any(word in mentor_industry for word in founder_industry.split()):
        score += 20
        reasons.append(f"industria relacionada ({mentor['industry']})")

    # 2. EXPERTISE vs AYUDA NECESITADA — peso alto (30 puntos)
    mentor_expertise = [e.lower() for e in mentor.get("expertise", [])]
    founder_needs = [h.lower() for h in founder.help_needed]

    matches_expertise = set(mentor_expertise) & set(founder_needs)
    if matches_expertise:
        points = min(len(matches_expertise) * 15, 30)
        score += points
        reasons.append(f"experiencia en {', '.join(matches_expertise)}")

    # 3. ETAPA DEL STARTUP — peso medio (20 puntos)
    stage_map = {
        "idea": ["idea", "validación", "mvp"],
        "mvp": ["mvp", "producto", "crecimiento"],
        "crecimiento": ["crecimiento", "escala", "fundraising"]
    }
    mentor_bio = mentor.get("bio", "").lower()
    relevant_keywords = stage_map.get(founder.stage.lower(), [])

    if any(kw in mentor_bio for kw in relevant_keywords):
        score += 20
        reasons.append(f"experiencia con startups en etapa {founder.stage}")

    # 4. NIVEL TÉCNICO — peso bajo (10 puntos)
    technical_keywords = {
        "alto": ["cto", "tech", "ingenier", "software", "arquitectura", "desarrolla"],
        "medio": ["producto", "product", "tech", "digital"],
        "bajo": ["negocio", "ventas", "go-to-market", "operaciones", "marketing"]
    }
    relevant_tech = technical_keywords.get(founder.technical_level.lower(), [])

    if any(kw in mentor_bio for kw in relevant_tech) or \
       any(kw in " ".join(mentor_expertise) for kw in relevant_tech):
        score += 10
        reasons.append("perfil técnico compatible")

    # Construir justificación
    if reasons:
        justification = f"Recomendado porque tiene {'; '.join(reasons)}."
    else:
        justification = "Mentor con perfil general que puede aportar perspectiva valiosa."

    return score, justification


@router.post("/")
async def match_founder_with_mentors(founder: FounderProfile):
    # 1. Traer mentores disponibles
    mentors_response = (
        supabase.table("mentors")
        .select("*")
        .eq("availability", True)
        .execute()
    )
    mentors = mentors_response.data

    if len(mentors) < 3:
        raise HTTPException(
            status_code=400,
            detail="No hay suficientes mentores disponibles (mínimo 3)"
        )

    # 2. Calcular score para cada mentor
    scored_mentors = []
    for mentor in mentors:
        score, justification = calculate_score(founder, mentor)
        scored_mentors.append({
            "mentor": mentor,
            "score": score,
            "justification": justification
        })

    # 3. Ordenar por score y tomar top 3
    top_matches = sorted(scored_mentors, key=lambda x: x["score"], reverse=True)[:3]

    # 4. Guardar el match en Supabase
    supabase.table("matches").insert({
        "founder_name": founder.name,
        "founder_startup": founder.startup_name,
        "founder_industry": founder.industry,
        "founder_problem": founder.problem_description,
        "matched_mentor_ids": [m["mentor"]["id"] for m in top_matches],
        "status": "pending"
    }).execute()

    return {
        "founder": founder.model_dump(),
        "top_matches": top_matches
    }