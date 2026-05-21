from typing import Optional
from uuid import UUID

from pydantic import (
    BaseModel,
    EmailStr,
    field_validator
)


class UserResponse(BaseModel):

    id: UUID
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class OfficerCreate(BaseModel):

    name: str
    email: EmailStr
    password: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):

        if value.strip() == "":
            raise ValueError(
                "Name cannot be empty"
            )

        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if value.strip() == "":
            raise ValueError(
                "Password cannot be empty"
            )

        if len(value) < 8:
            raise ValueError(
                "Password must be at least 8 characters"
            )

        return value


class OfficerResponse(BaseModel):

    id: UUID
    name: str
    email: EmailStr
    role: str
    department_id: Optional[UUID]
    department_name: Optional[str]

    class Config:
        from_attributes = True