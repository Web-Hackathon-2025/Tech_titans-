from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.customer.routes import router as customer_router
from app.api.v1.provider.routes import router as provider_router
from app.api.v1.admin.routes import router as admin_router
from app.api.v1.booking import router as booking_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(customer_router, prefix="/customer", tags=["Customer"])
api_router.include_router(provider_router, prefix="/provider", tags=["Provider"])
api_router.include_router(admin_router, prefix="/admin", tags=["Admin"])
api_router.include_router(booking_router, prefix="/booking", tags=["Booking"])
