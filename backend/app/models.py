from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    plants = relationship(
        "Plant",
        back_populates="user",
        cascade="all, delete-orphan"
    )


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)

    plant_name = Column(
        String(100),
        nullable=False
    )

    plant_type = Column(
        String(100),
        nullable=False
    )

    location = Column(
        String(150),
        nullable=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="plants"
    )

    checks = relationship(
        "PlantCheck",
        back_populates="plant",
        cascade="all, delete-orphan"
    )


class PlantCheck(Base):
    __tablename__ = "plant_checks"

    id = Column(Integer, primary_key=True, index=True)

    symptom = Column(
        Text,
        nullable=False
    )

    ai_result = Column(
        Text,
        nullable=True
    )

    checked_date = Column(
        Date,
        nullable=False
    )

    plant_id = Column(
        Integer,
        ForeignKey("plants.id"),
        nullable=False
    )

    plant = relationship(
        "Plant",
        back_populates="checks"
    )