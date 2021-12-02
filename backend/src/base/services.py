import os
from typing import TypeVar, Type, Optional, Tuple, List
from aiofiles import open as async_open
from aiofiles.os import mkdir as async_mkdir
from fastapi import HTTPException, UploadFile
from datetime import datetime
from pydantic import BaseModel
from tortoise import models
from abc import ABC
from .schemas import GetFile, EditSettings
from .models import File, Setting
from uuid import uuid4


ModelType = TypeVar("ModelType", bound=models.Model)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)
GetSchemaType = TypeVar("GetSchemaType", bound=BaseModel)
QuerySchemaType = TypeVar("QuerySchemaType", bound=BaseModel)


class BaseService(ABC):
    model: Type[ModelType]
    create_schema: CreateSchemaType
    update_schema: UpdateSchemaType
    query_schema: QuerySchemaType
    get_schema: GetSchemaType
    get_detail: GetSchemaType

    async def create(self, schema, **kwargs) -> Optional[GetSchemaType]:
        obj = await self.model.create(**schema.dict(exclude_unset=True), **kwargs)
        return await self.get(pk=obj.pk)

    async def get_or_create(self, schema, **kwargs) -> Optional[GetSchemaType]:
        obj, _ = await self.model.get_or_create(**schema.dict(exclude_unset=True), **kwargs)
        return await self.get(pk=obj.pk)

    async def update(self, schema, exclude=None, **kwargs) -> Optional[GetSchemaType]:
        if exclude is not None:
            new_dict = {}
            s_dict = schema.dict()
            for key in s_dict.keys():
                if key not in exclude:
                    new_dict.update({key: s_dict[key]})
            await self.model.filter(**kwargs).update(**new_dict)
        else:
            await self.model.filter(**kwargs).update(**schema.dict(exclude_unset=True))
        return await self.get(**kwargs)

    async def delete(self, **kwargs):
        obj = await self.model.filter(**kwargs).delete()
        if not obj:
            raise HTTPException(status_code=404, detail='Запись не существует!')

    async def all(self) -> Optional[GetSchemaType]:
        return [await self.get(id=pk) for pk in await self.model.all().values_list('id', flat=True)]

    async def filter(
            self, limit=None, offset=None,
            order_by: Optional[List[str]] = None,
            **kwargs
    ) -> Optional[GetSchemaType]:
        query = self.model.filter(**{x: y for x, y in kwargs.items() if y is not None})
        if offset:
            query = query.offset(offset)
        if limit:
            query = query.limit(limit)
        if order_by:
            query = query.order_by(*order_by)
        records_ids = await query.values_list('id', flat=True)
        return [await self.get(id=pk) for pk in records_ids]

    async def get(self, **kwargs) -> Optional[GetSchemaType]:
        return await self.get_detail.from_queryset_single(self.model.get(**kwargs))

    async def get_obj(self, **kwargs) -> Optional[ModelType]:
        return await self.model.get_or_none(**kwargs)


async def save_file(file: UploadFile, out_file_path: str, file_format: str) -> GetFile:
    folder = datetime.now().date().strftime("%Y-%m-%d")
    folder_path = f'{out_file_path}/{folder}'
    if folder not in os.listdir(out_file_path):
        await async_mkdir(folder_path)
    path = f'{folder_path}/{uuid4()}.{file_format}'
    async with async_open(path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    file_obj = await File.create(url=path, size=len(content))
    return await GetFile.from_tortoise_orm(file_obj)


class SettingsService(BaseService):
    model = Setting
    update_schema = EditSettings
    get_schema = EditSettings
    get_detail = EditSettings


settings_s = SettingsService()
