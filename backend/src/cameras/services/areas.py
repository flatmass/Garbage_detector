from .. import schemas, models
from src.base.services import BaseService
from tortoise.transactions import atomic


class AreasService(BaseService):
    model = models.Area
    create_schema = schemas.CreateArea
    update_schema = schemas.UpdateArea
    get_schema = schemas.GetArea
    get_detail = schemas.GetArea

    @atomic()
    async def update(self, unique_id: int, schema: schemas.UpdateArea) -> schemas.GetArea:
        await models.AreaPoint.filter(area_id=unique_id).delete()
        await models.Area.filter(id=unique_id).update(name=schema.name)
        for point in schema.points:
            await models.AreaPoint.create(**point.dict(exclude_unset=True), area_id=unique_id)
        return await self.get(pk=unique_id)

    async def get(self, **kwargs) -> schemas.GetArea:
        obj = await models.Area.get(**kwargs).prefetch_related('points')
        return schemas.GetArea(
            id=obj.id,
            name=obj.name,
            camera_id=obj.camera_id,
            points=[
                schemas.AreaPointSchema(
                    x1=p.x1, y1=p.y1,
                    x2=p.x2, y2=p.y2,
                    area_id=p.area_id
                ) for p in obj.points
            ]
        )


areas_s = AreasService()
