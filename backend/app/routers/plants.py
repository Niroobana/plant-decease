from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas


router = APIRouter(
    prefix="/plants",
    tags=["Plants"]
)
@router.post(
    "",
    response_model=schemas.PlantResponse,
    status_code=status.HTTP_201_CREATED
)
def create_plant(
    plant: schemas.PlantCreate,
    db: Session = Depends(get_db)
):
    user = (
        db.query(models.User)
        .filter(models.User.id == plant.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    new_plant = models.Plant(
        plant_name=plant.plant_name,
        plant_type=plant.plant_type,
        location=plant.location,
        user_id=plant.user_id
    )

    db.add(new_plant)
    db.commit()
    db.refresh(new_plant)

    return new_plant


@router.get(
    "",
    response_model=list[schemas.PlantResponse]
)
def get_plants(
    db: Session = Depends(get_db)
):
    plants = db.query(models.Plant).all()

    return plants
    
@router.get(
    "/{plant_id}/details",
    response_model=schemas.PlantDetailsResponse
)
def get_plant_details(
    plant_id: int,
    db: Session = Depends(get_db)
):
    plant = (
        db.query(models.Plant)
        .filter(models.Plant.id == plant_id)
        .first()
    )

    if not plant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plant not found"
        )

    return {
        "id": plant.id,
        "plant_name": plant.plant_name,
        "plant_type": plant.plant_type,
        "location": plant.location,
        "owner": plant.user,
        "checks": plant.checks
    }