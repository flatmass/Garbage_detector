from fastapi import APIRouter
from .endpoints.pools import pools_router
from .endpoints.cameras import cam_router
from .endpoints.areas import areas_router


cameras_router = APIRouter()


cameras_router.include_router(pools_router)
cameras_router.include_router(cam_router)
cameras_router.include_router(areas_router)
