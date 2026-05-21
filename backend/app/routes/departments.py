from fastapi import (APIRouter,Depends,HTTPException)
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.department import Department
from app.schemas.department import ( DepartmentCreate, DepartmentResponse )
from app.dependencies.role import require_roles


router = APIRouter(
    prefix="/api/v1/departments",
    tags=["Departments"]
)

@router.post(
    "/",
    response_model=DepartmentResponse
)
def create_department(
    department_data: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user = Depends(
        require_roles(["admin"])
    )
):

    existing_department = db.query(
        Department
    ).filter(
        Department.name ==
        department_data.name
    ).first()

    if existing_department:

        raise HTTPException(
            status_code=400,
            detail="Department already exists"
        )

    department = Department(
        name=department_data.name
    )

    db.add(department)

    db.commit()

    db.refresh(department)

    return department


@router.get(
    "/",
    response_model=list[DepartmentResponse]
)
def get_departments(
    db: Session = Depends(get_db)
):

    departments = db.query(
        Department
    ).all()

    return departments