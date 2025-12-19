from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.core.dependencies import (
    get_current_customer,
    get_current_provider
)
from app.db.database import (
    bookings_collection,
    services_collection
)
from app.schemas.booking import BookingCreate, BookingStatus

router = APIRouter()

# 3️⃣ Customer → Create Booking (REQUESTED)
@router.post("/request")
def request_service(
    booking: BookingCreate,
    customer=Depends(get_current_customer)
):
    service = services_collection.find_one(
        {"_id": ObjectId(booking.service_id)}
    )

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    new_booking = {
        "service_id": booking.service_id,
        "customer_id": customer["id"],
        "provider_id": service["provider_id"],
        "status": BookingStatus.requested
    }

    result = bookings_collection.insert_one(new_booking)

    return {
        "message": "Service requested successfully",
        "booking_id": str(result.inserted_id),
        "status": BookingStatus.requested
    }


# 4️⃣ Provider → View Booking Requests
@router.get("/provider")
def provider_bookings(provider=Depends(get_current_provider)):
    bookings = bookings_collection.find(
        {"provider_id": provider["id"]}
    )

    response = []
    for booking in bookings:
        booking["id"] = str(booking["_id"])
        del booking["_id"]
        response.append(booking)

    return response


# 5️⃣ Provider → Confirm Booking
@router.put("/{booking_id}/confirm")
def confirm_booking(
    booking_id: str,
    provider=Depends(get_current_provider)
):
    booking = bookings_collection.find_one({
        "_id": ObjectId(booking_id),
        "provider_id": provider["id"]
    })

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking["status"] != BookingStatus.requested:
        raise HTTPException(
            status_code=400,
            detail="Only requested bookings can be confirmed"
        )

    bookings_collection.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"status": BookingStatus.confirmed}}
    )

    return {"message": "Booking confirmed"}


# 6️⃣ Provider → Complete Booking
@router.put("/{booking_id}/complete")
def complete_booking(
    booking_id: str,
    provider=Depends(get_current_provider)
):
    booking = bookings_collection.find_one({
        "_id": ObjectId(booking_id),
        "provider_id": provider["id"]
    })

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking["status"] != BookingStatus.confirmed:
        raise HTTPException(
            status_code=400,
            detail="Only confirmed bookings can be completed"
        )

    bookings_collection.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"status": BookingStatus.completed}}
    )

    return {"message": "Booking completed"}


# 7️⃣ Customer → Cancel Booking
@router.put("/{booking_id}/cancel")
def cancel_booking(
    booking_id: str,
    customer=Depends(get_current_customer)
):
    booking = bookings_collection.find_one({
        "_id": ObjectId(booking_id),
        "customer_id": customer["id"]
    })

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking["status"] == BookingStatus.completed:
        raise HTTPException(
            status_code=400,
            detail="Completed bookings cannot be cancelled"
        )

    bookings_collection.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"status": BookingStatus.cancelled}}
    )

    return {"message": "Booking cancelled"}


# 8️⃣ Customer → View Their Bookings
@router.get("/customer")
def customer_bookings(customer=Depends(get_current_customer)):
    bookings = bookings_collection.find(
        {"customer_id": customer["id"]}
    )

    response = []
    for booking in bookings:
        booking["id"] = str(booking["_id"])
        del booking["_id"]
        response.append(booking)

    return response
