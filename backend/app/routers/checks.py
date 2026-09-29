from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from app.services.ai_service import analyze_plant

router = APIRouter(
    prefix="/plant-checks",
    tags=["Plant Checks"]
)
@router.post(
    "",
    response_model=schemas.PlantCheckResponse,
    status_code=status.HTTP_201_CREATED
)
def create_plant_check(
    check: schemas.PlantCheckCreate,
    db: Session = Depends(get_db)
):
    plant = (
        db.query(models.Plant)
        .filter(models.Plant.id == check.plant_id)
        .first()
    )

    if not plant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plant not found"
        )

    new_check = models.PlantCheck(
        plant_id=check.plant_id,
        symptom=check.symptom,
        checked_date=check.checked_date,
        ai_result=None
    )

    db.add(new_check)
    db.commit()
    db.refresh(new_check)

    return new_check

@router.get(
    "",
    response_model=list[schemas.PlantCheckResponse]
)
def get_plant_checks(
    db: Session = Depends(get_db)
):
    checks = db.query(models.PlantCheck).all()

    return checks

@router.post(
    "/{check_id}/analyze",
    response_model=schemas.PlantCheckResponse
)
def analyze_plant_check(
    check_id: int,
    db: Session = Depends(get_db)
):
    check = (
        db.query(models.PlantCheck)
        .filter(models.PlantCheck.id == check_id)
        .first()
    )

    if not check:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plant check not found"
        )

    plant = check.plant

    ai_result = analyze_plant(
        plant_name=plant.plant_name,
        plant_type=plant.plant_type,
        location=plant.location,
        symptom=check.symptom
    )

    check.ai_result = ai_result

    db.commit()
    db.refresh(check)

    return check
