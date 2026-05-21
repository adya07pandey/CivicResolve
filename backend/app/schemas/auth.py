from pydantic import BaseModel, EmailStr, field_validator


class RegisterSchema(BaseModel):

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
        
        if len(value) > 72:
            raise ValueError(
                "Password cannot exceed 72 characters"
            )

        return value


class LoginSchema(BaseModel):

    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if value.strip() == "":
            raise ValueError(
                "Password cannot be empty"
            )

        return value


class TokenResponse(BaseModel):

    access_token: str
    token_type: str
