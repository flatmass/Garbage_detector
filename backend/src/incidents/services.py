from . import schemas, models
from src.base.services import BaseService, save_file
from tortoise.transactions import atomic
from fastapi import UploadFile
from config import MediaPath
from ..cameras.services import cameras_s


class IncidentService(BaseService):
    model = models.Incident
    create_schema = schemas.CreateIncident
    update_schema = schemas.CreateIncident
    get_schema = schemas.GetIncident
    get_detail = schemas.GetIncident

    async def get(self, **kwargs) -> schemas.GetIncident:
        obj: models.Incident = await self.model.get(**kwargs).prefetch_related(
            'polygons', 'user', 'camera', 'file'
        )
        return schemas.GetIncident(
            id=obj.id,
            user=schemas.GetMinimizeUser(
                id=obj.user.id,
                email=obj.user.email,
                username=obj.user.username,
                is_support=obj.user.is_support,
                is_superuser=obj.user.is_support
            ),
            camera=await cameras_s.get(id=obj.camera_id),
            time_open=obj.time_open,
            time_close=obj.time_close,
            file=schemas.GetFile(
                id=obj.file.id,
                url=obj.file.url
            ),
            camera_id=obj.camera_id,
            label=obj.label,
            accuracy=obj.accuracy,
            user_id=obj.user_id,
            status=obj.status,
            file_id=obj.file_id,
            polygons=[
                schemas.PolygonSchema(
                    name=poly.name, points=[
                        schemas.PolygonPointSchema(x=point.x, y=point.y)
                        for point in poly.points
                    ]
                )
                for poly in await models.Polygon.filter(incident_id=obj.id).prefetch_related('points')
            ],
        )

    @atomic()
    async def create(self, schema: schemas.CreateIncident, **kwargs) -> schemas.GetIncident:
        obj = await self.model.create(
            camera_id=schema.camera_id,
            label=schema.label,
            accuracy=schema.accuracy,
            user_id=schema.user_id,
            status=schema.status,
            file_id=schema.file_id
        )
        for polygon in schema.polygons:
            await models.Polygon.create(name=polygon.name, incident_id=obj.id)
            for point in polygon.points:
                await models.PolygonPoint.create(x=point.x, y=point.y)
        return await self.get(id=obj.id)

    @staticmethod
    async def upload_file(file: UploadFile):
        return await save_file(file, MediaPath.incidents, 'png')


incident_s = IncidentService()
