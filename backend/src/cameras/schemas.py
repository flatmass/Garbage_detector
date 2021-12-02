from typing import List
from tortoise.contrib.pydantic import PydanticModel
from tortoise import Tortoise
from . import models
from config import db_paths


Tortoise.init_models(db_paths.all_paths, 'models')


class AreaPointSchema(PydanticModel):
    x: float
    y: float

    class Config:
        orig_model = models.AreaPoint


class CreateArea(PydanticModel):
    name: str
    camera_id: int

    class Config:
        orig_model = models.Area


class UpdateArea(CreateArea):
    points: List[AreaPointSchema] = []


class GetArea(CreateArea):
    id: int
    points: List[AreaPointSchema] = []


class CreateGeoCoord(PydanticModel):
    x: float
    y: float

    class Config:
        orig_model = models.GeoCoord


class GetGeoCoord(CreateGeoCoord):
    id: int


class CreatePool(PydanticModel):
    name: str

    class Config:
        orig_model = models.Pool


class GetPool(CreatePool):
    id: int


class CreateCamera(PydanticModel):
    name: str
    url: str
    coord: CreateGeoCoord
    pool_id: int

    class Config:
        orig_model = models.Camera


class GetCamera(CreateCamera):
    id: int
    areas: List[GetArea] = []
