from fastapi import APIRouter, Depends, HTTPException
from app.db.database import users_collection
from app.core.dependencies import get_current_admin

router = APIRouter()

# Admin → View All Users
@router.get("/users")
def view_all_users(admin=Depends(get_current_admin)):
    users = users_collection.find()  # Fetch all users
    response = []

    for user in users:
        user_data = {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
        response.append(user_data)

    return response

# Admin → Approve Provider
@router.put("/providers/{provider_id}/approve")
def approve_provider(provider_id: str, admin=Depends(get_current_admin)):
    provider = users_collection.find_one({"_id": ObjectId(provider_id), "role": "provider"})

    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")

    # If provider is already active, return a message
    if provider.get("status") == "approved":
        raise HTTPException(status_code=400, detail="Provider already approved")

    users_collection.update_one(
        {"_id": ObjectId(provider_id)},
        {"$set": {"status": "approved"}}
    )

    return {"message": "Provider approved successfully"}


# Admin → Suspend Provider
@router.put("/providers/{provider_id}/suspend")
def suspend_provider(provider_id: str, admin=Depends(get_current_admin)):
    provider = users_collection.find_one({"_id": ObjectId(provider_id), "role": "provider"})

    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")

    # If provider is already suspended, return a message
    if provider.get("status") == "suspended":
        raise HTTPException(status_code=400, detail="Provider already suspended")

    users_collection.update_one(
        {"_id": ObjectId(provider_id)},
        {"$set": {"status": "suspended"}}
    )

    return {"message": "Provider suspended successfully"}

# Admin → View All Services
@router.get("/services")
def view_all_services(admin=Depends(get_current_admin)):
    services = services_collection.find()
    response = []

    for service in services:
        provider = users_collection.find_one({"_id": ObjectId(service["provider_id"])})
        response.append({
            "id": str(service["_id"]),
            "title": service["title"],
            "description": service["description"],
            "category": service["category"],
            "price": service["price"],
            "provider": provider["name"] if provider else "Unknown"
        })

    return response

# Admin → View All Bookings
@router.get("/bookings")
def view_all_bookings(admin=Depends(get_current_admin)):
    bookings = bookings_collection.find()
    response = []

    for booking in bookings:
        service = services_collection.find_one({"_id": ObjectId(booking["service_id"])})
        customer = users_collection.find_one({"_id": ObjectId(booking["customer_id"])})
        provider = users_collection.find_one({"_id": ObjectId(booking["provider_id"])})

        response.append({
            "id": str(booking["_id"]),
            "service_title": service["title"] if service else "Unknown",
            "status": booking["status"],
            "customer": customer["name"] if customer else "Unknown",
            "provider": provider["name"] if provider else "Unknown"
        })

    return response

# Admin → Delete Service
@router.delete("/services/{service_id}")
def delete_service(service_id: str, admin=Depends(get_current_admin)):
    service = services_collection.find_one({"_id": ObjectId(service_id)})

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    services_collection.delete_one({"_id": ObjectId(service_id)})

    return {"message": "Service deleted successfully"}
