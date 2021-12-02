from fastapi_users import models
from tortoise import Tortoise
from tortoise.contrib.pydantic import PydanticModel
from fastapi_users.db import TortoiseUserDatabase
from config import db_paths
from src.users.models import UserModel
from pydantic import UUID4


Tortoise.init_models(db_paths.users, 'models')


class User(models.BaseUser):
    is_support: bool
    username: str


class UserCreate(models.BaseUserCreate):
    is_support: bool
    username: str


class UserUpdate(models.BaseUserUpdate):
    is_support: bool
    username: str


class UserDB(User, models.BaseUserDB, PydanticModel):
    class Config:
        orm_mode = True
        orig_model = UserModel


def get_user_db():
    yield TortoiseUserDatabase(UserDB, UserModel)


class GetMinimizeUser(PydanticModel):
    id: UUID4
    email: str
    username: str
    is_support: bool
    is_superuser: bool

    class Config:
        orig_model = UserModel
