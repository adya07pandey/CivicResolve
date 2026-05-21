from sqlalchemy import Column, String, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base
from sqlalchemy import Enum
from app.utils.enums import ( ComplaintPriority,  ComplaintStatus) 

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    title = Column(String, nullable=False)

    description = Column(Text, nullable=False)

    priority = Column(Enum(ComplaintPriority), nullable=False)

    status = Column(Enum(ComplaintStatus), nullable=False, default=ComplaintStatus.OPEN)

    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id")
    )

    department_id = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id")
    )

    created_at = Column(DateTime, default=datetime.utcnow)

    department = relationship("Department", back_populates="complaints")