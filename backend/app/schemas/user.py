from pydantic import BaseModel, EmailStr
from enum import Enum


class UserRole(str, Enum):
    customer = "customer"
    provider = "provider"
    admin = "admin"


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole


class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: UserRole
