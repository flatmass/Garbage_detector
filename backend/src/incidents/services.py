from . import schemas, models
from src.base.services import BaseService, save_file
from tortoise.transactions import atomic
from fastapi import UploadFile
from config import MediaPath


class IncidentService(BaseService):
    model = models.Incident
    create_schema = schemas.CreateIncident
    update_schema = schemas.CreateIncident
    get_schema = schemas.GetIncident
    get_detail = schemas.GetIncident

    @atomic()
    async def create(self, schema: schemas.CreateIncident, **kwargs) -> schemas.GetIncident:
        obj = await self.model.create(**schema.dict(exclude_unset=True))
        for polygon in schema.polygons:
            await models.Polygon.create(name=polygon.name, incident_id=obj.id)
            for point in polygon.points:
                await models.PolygonPoint.create(x=point.x, y=point.y)
        return await self.get(id=obj.id)

    @staticmethod
    async def upload_file(file: UploadFile):
        return await save_file(file, MediaPath.incidents, 'png')


incident_s = IncidentService()
