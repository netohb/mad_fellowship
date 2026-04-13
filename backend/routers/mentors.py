from fastapi import APIRouter, HTTPException
from models import Mentor, MentorInDB
from database import supabase
from typing import List

router = APIRouter(prefix="/mentors", tags=["Mentors"])


@router.get("/", response_model=List[dict])
async def get_all_mentors():
    response = supabase.table("mentors").select("*").execute()
    return response.data


@router.get("/{mentor_id}", response_model=dict)
async def get_mentor(mentor_id: str):
    response = supabase.table("mentors").select("*").eq("id", mentor_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Mentor no encontrado")
    return response.data[0]


@router.post("/", response_model=dict)
async def create_mentor(mentor: Mentor):
    data = mentor.model_dump()
    response = supabase.table("mentors").insert(data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Error al crear mentor")
    return response.data[0]


@router.put("/{mentor_id}/availability")
async def update_availability(mentor_id: str, availability: bool):
    response = (
        supabase.table("mentors")
        .update({"availability": availability})
        .eq("id", mentor_id)
        .execute()
    )
    return {"message": "Disponibilidad actualizada", "data": response.data}


@router.delete("/{mentor_id}")
async def delete_mentor(mentor_id: str):
    response = supabase.table("mentors").delete().eq("id", mentor_id).execute()
    return {"message": "Mentor eliminado"}