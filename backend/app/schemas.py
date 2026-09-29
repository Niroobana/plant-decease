from datetime import date
from typing import Optional, List

from pydantic import BaseModel, ConfigDict


# -----------------------
# USER SCHEMAS
# -----------------------

class UserCreate(BaseModel):
    name: str
    email: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    model_config = ConfigDict(from_attributes=True)


# -----------------------
# PLANT SCHEMAS
# -----------------------

class PlantCreate(BaseModel):
    plant_name: str
    plant_type: str
    location: Optional[str] = None
    user_id: int


class PlantResponse(BaseModel):
    id: int
    plant_name: str
    plant_type: str
    location: Optional[str] = None
    user_id: int

    model_config = ConfigDict(from_attributes=True)


# -----------------------
# PLANT CHECK SCHEMAS
# -----------------------

class PlantCheckCreate(BaseModel):
    plant_id: int
    symptom: str
    checked_date: date


class PlantCheckResponse(BaseModel):
    id: int
    plant_id: int
    symptom: str
    checked_date: date
    ai_result: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class OwnerResponse(BaseModel):
    id: int
    name: str
    email: str

    model_config = ConfigDict(from_attributes=True)


class PlantCheckNested(BaseModel):
    id: int
    symptom: str
    checked_date: date
    ai_result: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class PlantDetailsResponse(BaseModel):
    id: int
    plant_name: str
    plant_type: str
    location: Optional[str] = None
    owner: OwnerResponse
    checks: List[PlantCheckNested]
