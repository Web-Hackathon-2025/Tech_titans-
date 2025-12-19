# from fastapi import APIRouter, Depends
# from app.core.dependencies import get_current_customer

# router = APIRouter()


# @router.get("/dashboard")
# def customer_dashboard(user=Depends(get_current_customer)):
#     return {
#         "message": "Welcome Customer",
#         "user_id": user["id"]
#     }

# @router.post("/request")
# def request_service(
#     booking: BookingCreate,
#     customer=Depends(get_current_customer)
# ):
#     service = services_collection.find_one(
#         {"_id": ObjectId(booking.service_id)}
#     )

#     if not service:
#         raise HTTPException(status_code=404, detail="Service not found")

#     new_booking = {
#         "service_id": booking.service_id,
#         "customer_id": customer["id"],
#         "provider_id": service["provider_id"],
#         "status": BookingStatus.requested
#     }

#     result = bookings_collection.insert_one(new_booking)

#     return {
#         "message": "Service requested successfully",
#         "booking_id": str(result.inserted_id),
#         "status": BookingStatus.requested
#     }

from fastapi import APIRouter, Depends, Query
from bson import ObjectId

from app.core.dependencies import get_current_customer
from app.db.database import services_collection, users_collection

router = APIRouter()

@router.get("/services")
def list_services(
    category: str | None = Query(default=None),
    customer=Depends(get_current_customer)
):
    query = {"availability": True}

    if category:
        query["category"] = category

    services = services_collection.find(query)

    response = []
    for service in services:
        provider = users_collection.find_one(
            {"_id": ObjectId(service["provider_id"])}
        )

        response.append({
            "id": str(service["_id"]),
            "title": service["title"],
            "description": service["description"],
            "category": service["category"],
            "price": service["price"],
            "provider": {
                "id": service["provider_id"],
                "name": provider["name"] if provider else "Unknown"
            }
        })

    return response

@router.get("/services/{service_id}")
def get_service_detail(
    service_id: str,
    customer=Depends(get_current_customer)
):
    service = services_collection.find_one(
        {"_id": ObjectId(service_id), "availability": True}
    )

    if not service:
        return {"detail": "Service not found"}

    provider = users_collection.find_one(
        {"_id": ObjectId(service["provider_id"])}
    )

    return {
        "id": str(service["_id"]),
        "title": service["title"],
        "description": service["description"],
        "category": service["category"],
        "price": service["price"],
        "availability": service["availability"],
        "provider": {
            "id": service["provider_id"],
            "name": provider["name"] if provider else "Unknown",
            "email": provider["email"] if provider else None
        }
    }
