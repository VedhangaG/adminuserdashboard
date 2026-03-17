from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes.analytics_routes import router as analytics_router
from .routes.auth_routes import router as auth_router
from .routes.user_routes import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Admin User Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(analytics_router)


@app.get("/")
def root():
    return {"message": "Admin User Management API is running"}
