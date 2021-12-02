from fastapi_users.db import TortoiseBaseUserModel
from tortoise import fields


class UserModel(TortoiseBaseUserModel):
    username = fields.CharField(index=True, unique=True, null=False, max_length=255)
    is_support = fields.BooleanField(default=True)
    is_verified = fields.BooleanField(default=True, null=False)
