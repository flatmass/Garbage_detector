from .. import schemas, models
from src.base.services import BaseService
from tortoise.transactions import atomic


class CameraService(BaseService):
    model = models.Camera
    create_schema = schemas.CreateCamera
    update_schema = schemas.CreateCamera
    get_schema = schemas.GetCamera
    get_detail = schemas.GetCamera

    @atomic()
    async def create(self, schema: schemas.CreateCamera):
        coord = await models.GeoCoord.create(**schema.coord.dict(exclude_unset=True))
        obj = await models.Camera.create(
            name=schema.name,
            url=schema.url,
            coord_id=coord.id,
            pool_id=schema.pool_id
        )
        return await self.get(pk=obj.pk)

    @atomic()
    async def update(self, unique_id: int, schema: schemas.CreateCamera):
        camera = await models.Camera.get(id=unique_id)
        await models.GeoCoord.filter(id=camera.coord_id).update(**schema.coord.dict(exclude_unset=True))
        await models.Camera.filter(id=unique_id).update(
            name=schema.name,
            url=schema.url,
            pool_id=schema.pool_id
        )
        return await self.get(pk=unique_id)

    async def get(self, **kwargs) -> schemas.GetCamera:
        obj = await models.Camera.get(**kwargs).prefetch_related('coord')
        return schemas.GetCamera(
            id=obj.id,
            name=obj.name,
            url=obj.url,
            pool_id=obj.pool_id,
            coord=schemas.GetGeoCoord(
                id=obj.coord.id,
                x=obj.coord.x,
                y=obj.coord.y
            )
        )


cameras_s = CameraService()
