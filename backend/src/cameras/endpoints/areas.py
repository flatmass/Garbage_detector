from fastapi import APIRouter
from .. import schemas, services
from typing import List, Optional


areas_router = APIRouter(
    prefix="/areas", tags=['Areas']
)


@areas_router.post('', response_model=schemas.GetArea)
async def create_area(schema: schemas.CreateArea):
    return await services.areas_s.create(schema=schema)


@areas_router.put('/{pk}', response_model=schemas.GetArea)
async def update_area(pk: int, schema: schemas.UpdateArea):
    return await services.areas_s.update(unique_id=pk, schema=schema)


@areas_router.delete('/{pk}', response_model=schemas.GetArea)
async def delete_area(pk: int):
    return await services.areas_s.delete(id=pk)


@areas_router.get('/{pk}', response_model=schemas.GetArea)
async def get_area(pk: int):
    return await services.areas_s.get(id=pk)


@areas_router.get('', response_model=List[schemas.GetArea])
async def get_areas(skip: Optional[int] = 0, limit: Optional[int] = 10):
    return await services.areas_s.filter(limit=limit, offset=skip)
