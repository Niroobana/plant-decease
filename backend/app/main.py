from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models
from .routers import users, plants, checks


models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Plant Disease Analyzer API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
        "https://plant-dec.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router)
app.include_router(plants.router)
app.include_router(checks.router)


@app.get("/")
def root():
    return {
        "message": "Plant Disease Analyzer API is running"
    }