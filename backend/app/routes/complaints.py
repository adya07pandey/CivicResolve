from fastapi import (APIRouter, Depends, HTTPException)
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.complaint import Complaint
from app.models.user import User
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintResponse,
    ComplaintStatusUpdate
)
from app.dependencies.role import require_roles

router = APIRouter(
    prefix="/api/v1/complaints",
    tags=["Complaints"]
)

@router.post(
    "/",
    response_model=ComplaintResponse
)
def create_complaint(
    complaint_data: ComplaintCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["citizen"])
    )
):

    complaint = Complaint(
        title=complaint_data.title,
        description=complaint_data.description,
        priority=complaint_data.priority,
        department_id=complaint_data.department_id,
        created_by=current_user.id
    )
    print(complaint)
    db.add(complaint)

    db.commit()

    db.refresh(complaint)

    return complaint


@router.get(
    "/my",
    response_model=list[ComplaintResponse]
)
def get_my_complaints(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["citizen"])
    )
):

    complaints = db.query(Complaint).filter(
        Complaint.created_by == current_user.id
    ).all()

    return complaints


@router.get(
    "/department",
    response_model=list[ComplaintResponse]
)
def get_department_complaints(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["officer"])
    )
):

    complaints = db.query(Complaint).filter(
        Complaint.department_id ==
        current_user.department_id
    ).all()

    return complaints


@router.patch("/{complaint_id}/status")
def update_complaint_status(
    complaint_id: str,
    status_data: ComplaintStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["officer"])
    )
):

    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:

        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    # department authorization check

    if complaint.department_id != current_user.department_id:

        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    complaint.status = status_data.status

    db.commit()

    return {
        "message": "Complaint updated"
    }