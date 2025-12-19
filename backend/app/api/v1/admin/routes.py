from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_admin

router = APIRouter()


@router.get("/dashboard")
def admin_dashboard(user=Depends(get_current_admin)):
    return {
        "message": "Welcome Admin",
        "user_id": user["id"]
    }
