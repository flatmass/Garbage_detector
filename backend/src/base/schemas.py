from tortoise.contrib.pydantic import PydanticModel
from .models import File, Setting
from config import db_paths, URL
from tortoise import Tortoise
from typing import Optional


Tortoise.init_models(db_paths.base, 'models')


class GetFile(PydanticModel):
    id: int
    url: str

    def __init__(self, **kwargs):
        super(GetFile, self).__init__(**kwargs)
        self.url = f'{URL}/{self.url}' if self.url.find(URL) == -1 else self.url

    class Config:
        orig_model = File


class EditSettings(PydanticModel):
    title: str
    subtitle: str
    i_buy: str
    i_sell: str
    vk: Optional[str] = None
    telegram: Optional[str] = None
    fb: Optional[str] = None
    inst: Optional[str] = None
    youtube: Optional[str] = None

    class Config:
        orig_model = Setting
