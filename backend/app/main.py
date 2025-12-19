from fastapi import FastAPI
from app.db.database import db
from app.api.v1.auth import router as auth_router
from app.api.v1.customer.routes import router as customer_router
from app.api.v1.provider.routes import router as provider_router
from app.api.v1.admin.routes import router as admin_router
from app.api.v1.booking import router as booking_router

app = FastAPI(
    title="Karigar API",
    description="Hyperlocal Services Marketplace",
    version="1.0.0"
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(customer_router, prefix="/api/v1/customer", tags=["Customer"])
app.include_router(provider_router, prefix="/api/v1/provider", tags=["Provider"])
app.include_router(admin_router, prefix="/api/v1/admin", tags=["Admin"])
app.include_router(booking_router, prefix="/api/v1/booking", tags=["Booking"])




@app.get("/")
def root():
    return {"message": "Karigar API is running"}

@app.get("/test_db")
def test_db():
    try:
        collections = db.list_collection_names()
        return {
            "status": "success",
            "message": "Database connected successfully",
            "collections": collections
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }