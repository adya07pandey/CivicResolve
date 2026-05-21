from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.core.database import Base, engine
from app.models.user import User
from app.models.department import Department
from app.models.complaint import Complaint
from app.dependencies.role import require_roles
from app.dependencies.auth import get_current_user
from app.models.user import User
from fastapi import Depends
from app.routes.complaints import ( router as complaint_router )
from app.routes.departments import ( router as department_router)
from app.routes.users import (  router as users_router )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:5173" ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(complaint_router)
app.include_router(department_router)


@app.get("/")
def root():
    return {
        "message": "Complaint System API Running"
    }


@app.get("/health")
def health_check():

    return {
        "status": "healthy"
    }

