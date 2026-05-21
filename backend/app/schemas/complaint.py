from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from app.utils.enums import ( ComplaintPriority, ComplaintStatus )


class ComplaintCreate(BaseModel):

    title: str
    description: str
    priority: str
    department_id: UUID


class ComplaintResponse(BaseModel):

    id: UUID
    title: str = Field( min_length=5, max_length=100 )
    description: str = Field(min_length=10 )
    priority: ComplaintPriority
    status: ComplaintStatus
    department_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class ComplaintStatusUpdate(BaseModel):

    status: str