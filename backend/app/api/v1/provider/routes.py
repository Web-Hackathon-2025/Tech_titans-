from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_provider
from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.core.dependencies import get_current_provider
from app.db.database import services_collection
from app.schemas.service import ServiceCreate

router = APIRouter()

@router.post("/services")
def create_service(
    service: ServiceCreate,
    provider=Depends(get_current_provider)
):
    new_service = {
        "title": service.title,
        "description": service.description,
        "category": service.category,
        "price": service.price,
        "availability": service.availability,
        "provider_id": provider["id"]
    }

    result = services_collection.insert_one(new_service)

    return {
        "message": "Service created successfully",
        "service_id": str(result.inserted_id)
    }

@router.get("/services")
def get_my_services(provider=Depends(get_current_provider)):
    services = services_collection.find(
        {"provider_id": provider["id"]}
    )

    response = []
    for service in services:
        service["id"] = str(service["_id"])
        del service["_id"]
        response.append(service)

    return response

@router.put("/services/{service_id}")
def update_service(
    service_id: str,
    service: ServiceCreate,
    provider=Depends(get_current_provider)
):
    existing = services_collection.find_one({
        "_id": ObjectId(service_id),
        "provider_id": provider["id"]
    })

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Service not found or unauthorized"
        )

    services_collection.update_one(
        {"_id": ObjectId(service_id)},
        {"$set": service.dict()}
    )

    return {"message": "Service updated successfully"}

@router.delete("/services/{service_id}")
def delete_service(
    service_id: str,
    provider=Depends(get_current_provider)
):
    result = services_collection.delete_one({
        "_id": ObjectId(service_id),
        "provider_id": provider["id"]
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Service not found or unauthorized"
        )

    return {"message": "Service deleted successfully"}
