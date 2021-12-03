from fastapi import APIRouter
from .. import schemas, services
from typing import List, Optional


cam_router = APIRouter(
    prefix="/cam", tags=['Cameras']
)


@cam_router.post('', response_model=schemas.GetCamera)
async def create_camera(schema: schemas.CreateCamera):
    return await services.cameras_s.create(schema=schema)


@cam_router.put('/{pk}', response_model=schemas.GetCamera)
async def update_camera(pk: int, schema: schemas.CreateCamera):
    return await services.cameras_s.update(unique_id=pk, schema=schema)


@cam_router.delete('/{pk}', response_model=schemas.GetCamera)
async def delete_camera(pk: int):
    return await services.cameras_s.delete(id=pk)


@cam_router.get('/{pk}', response_model=schemas.GetCamera)
async def get_camera(pk: int):
    return await services.cameras_s.get(id=pk)


@cam_router.get('', response_model=List[schemas.GetCamera])
async def get_cameras(skip: Optional[int] = 0, limit: Optional[int] = 10):
    return await services.cameras_s.filter(limit=limit, offset=skip)
