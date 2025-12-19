from pydantic import BaseModel
from enum import Enum


class BookingStatus(str, Enum):
    requested = "requested"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


class BookingCreate(BaseModel):
    service_id: str


class BookingResponse(BaseModel):
    id: str
    service_id: str
    customer_id: str
    provider_id: str
    status: BookingStatus
