from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from fastapi import Response
from app.schemas.auth import (RegisterSchema,LoginSchema,TokenResponse)
from app.core.security import ( hash_password, verify_password, create_access_token)
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)

@router.post("/register")
def register(
    user_data: RegisterSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hash_password(
            user_data.password
        ),
        role="citizen"
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "Citizen registered successfully"
    }


@router.post("/login")
def login(
    login_data: LoginSchema,
    response: Response,
    db: Session = Depends(get_db)
):
    
    user = db.query(User).filter(
        User.email == login_data.email
    ).first()

    
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid_password = verify_password(
        login_data.password,
        user.password_hash
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        data={
            "user_id": str(user.id),
            "role": user.role
        }
    )
    
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none"
    )
    return {
        "message": "Login successful"
    }


@router.post("/logout")
def logout(response: Response):

    response.delete_cookie("access_token")

    return {
        "message": "Logged out successfully"
    }


@router.get("/me")
def get_me(
    current_user = Depends(get_current_user)
):

    return {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }