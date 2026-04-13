from pydantic import BaseModel
from typing import Optional, List

class Mentor(BaseModel):
    name: str
    email: str
    industry: str
    expertise: List[str]
    bio: str
    years_experience: int
    availability: bool = True

class MentorInDB(Mentor):
    id: str

class FounderProfile(BaseModel):
    name: str
    startup_name: str
    industry: str
    problem_description: str
    technical_level: str        # "bajo", "medio", "alto"
    stage: str                  # "idea", "mvp", "crecimiento"
    help_needed: List[str]      # ["go-to-market", "tech", "fundraising", ...]

class MatchResult(BaseModel):
    mentor: MentorInDB
    score: int
    justification: str

class MatchResponse(BaseModel):
    founder: FounderProfile
    top_matches: List[MatchResult]