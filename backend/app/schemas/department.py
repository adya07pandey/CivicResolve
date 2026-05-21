from pydantic import BaseModel, field_validator
from uuid import UUID


class DepartmentCreate(BaseModel):

    name: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):

        if value.strip() == "":

            raise ValueError(
                "Department name cannot be empty"
            )

        return value


class DepartmentResponse(BaseModel):

    id: UUID
    name: str

    class Config:
        from_attributes = True