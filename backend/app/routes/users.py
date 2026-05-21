from fastapi import ( APIRouter,  Depends, HTTPException)
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.database import get_db
from app.models.user import User
from app.models.department import Department
from app.dependencies.role import require_roles
from app.schemas.user import OfficerCreate
from app.core.security import hash_password
from app.schemas.user import OfficerResponse

router = APIRouter(
    prefix="/api/v1/users",
    tags=["Users"]
)

@router.patch("/{user_id}/assign-department")
def assign_department(
    user_id: UUID,
    department_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(
        require_roles(["admin"])
    )
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    department = db.query(Department).filter(
        Department.id == department_id
    ).first()

    if not department:

        raise HTTPException(
            status_code=404,
            detail="Department not found"
        )

    if user.role != "officer":

        raise HTTPException(
            status_code=400,
            detail="User is not an officer"
        )

    user.department_id = department_id

    db.commit()

    return {
        "message": "Department assigned successfully"
    }


@router.post("/create-officer")
def create_officer(
    officer_data: OfficerCreate,
    db: Session = Depends(get_db),
    current_user = Depends(
        require_roles(["admin"])
    )
):

    existing_user = db.query(User).filter(
        User.email == officer_data.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    officer = User(
        name=officer_data.name,
        email=officer_data.email,
        password_hash=hash_password(
            officer_data.password
        ),
        role="officer"
    )

    db.add(officer)

    db.commit()

    return {
        "message": "Officer created successfully"
    }


@router.get(
    "/officers",
    response_model=list[OfficerResponse]
)
def get_officers(
    db: Session = Depends(get_db),
    current_user = Depends(
        require_roles(["admin"])
    )
):

    officers = db.query(User).filter(
        User.role == "officer"
    ).all()

    result = []

    for officer in officers:

        result.append({

            "id": officer.id,

            "name": officer.name,

            "email": officer.email,

            "role": officer.role,

            "department_id": officer.department_id,

            "department_name":
                officer.department.name
                if officer.department
                else None
        })

    return result