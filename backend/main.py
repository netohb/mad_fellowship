from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import mentors, matching

app = FastAPI(
    title="EPIC Lab Mentor Matching API",
    description="API para hacer match entre founders y mentores del EPIC Lab del ITAM",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(mentors.router)
app.include_router(matching.router)


@app.get("/")
async def root():
    return {
        "message": "EPIC Lab Mentor Matching API",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "ok"}