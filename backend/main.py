from config import DB_URL, db_paths
from tortoise.contrib.fastapi import register_tortoise
from fastapi import FastAPI, APIRouter, Depends
from src.users.routers import (
    fastapi_cookies, cookie_authentication,
    get_current_superuser
)

from src.users.routers import users_router
from src.cameras.routers import cameras_router
from src.incidents.routers import incidents_router

from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from scripts import create_superuser
from config import ALLOW_CORS


app = FastAPI(
    title="Garbage detector",
    version="0.0.1",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_CORS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

api = APIRouter(prefix="/api",)
api.include_router(
    fastapi_cookies.get_auth_router(cookie_authentication), prefix="/auth/jwt", tags=["Auth"]
)
api.include_router(
    fastapi_cookies.get_register_router(), prefix="/auth", tags=["Auth"],
    dependencies=[Depends(get_current_superuser)]
)
api.include_router(users_router, prefix="/users", tags=["Users"])

api.include_router(cameras_router, prefix="/cameras")
api.include_router(incidents_router, prefix='/incidents')

app.mount("/api/media", StaticFiles(directory="media"), name="media")


app.include_router(api)

register_tortoise(
    app,
    db_url=DB_URL,
    modules={"models": db_paths.all_paths},
    generate_schemas=True,
    add_exception_handlers=True,
)


@app.on_event('startup')
async def on_startup():
    await create_superuser.main(True)
