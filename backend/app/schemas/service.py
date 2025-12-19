from pydantic import BaseModel
from typing import Optional


class ServiceCreate(BaseModel):
    title: str
    description: str
    category: str
    price: float
    availability: bool = True


class ServiceResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str
    price: float
    availability: bool
    provider_id: str
