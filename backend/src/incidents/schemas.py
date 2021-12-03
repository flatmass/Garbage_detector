from typing import List, Optional
from datetime import datetime
from tortoise.contrib.pydantic import PydanticModel
from tortoise import Tortoise
from . import models
from ..base.schemas import GetFile
from ..cameras.schemas import GetCamera
from ..users.schemas import GetMinimizeUser
from config import db_paths


Tortoise.init_models(db_paths.incidents, 'models')


class PolygonPointSchema(PydanticModel):
    x: float
    y: float

    class Config:
        orig_model = models.PolygonPoint


class PolygonSchema(PydanticModel):
    name: str
    points: List[PolygonPointSchema] = []

    class Config:
        orig_model = models.Polygon


class CreateIncident(PydanticModel):
    camera_id: int
    label: str
    accuracy: int
    user_id: str
    time_close: Optional[datetime] = None
    status: models.IncidentStatus
    file_id: int
    polygons: List[PolygonSchema] = []

    class Config:
        orig_model = models.Incident


class GetIncident(CreateIncident):
    id: int
    user: GetMinimizeUser
    camera: GetCamera
    time_open: datetime
    file: GetFile
