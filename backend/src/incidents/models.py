from enum import IntEnum
from tortoise import models, fields
from ..base.models import File
from ..cameras.models import Camera


class IncidentStatus(IntEnum):
    is_created = 1
    is_moderate = 2
    is_prepare_to_work = 3
    is_work = 4
    is_success = 5
    is_reject = 6


class Incident(models.Model):
    id = fields.BigIntField(pk=True)
    camera = fields.ForeignKeyField(
        'models.Camera', related_name='incidents', on_delete=fields.CASCADE
    )
    time_open = fields.DatetimeField(auto_now_add=True)
    time_close = fields.DatetimeField(default=None, null=True)
    status = fields.IntEnumField(IncidentStatus, default=IncidentStatus.is_created)
    file = fields.ForeignKeyField(
        'models.File', related_name='incidents', on_delete=fields.CASCADE
    )
    polygons: fields.ReverseRelation['Polygon']


class Polygon(models.Model):
    id = fields.BigIntField(pk=True)
    name = fields.CharField(max_length=255)
    incident = fields.ForeignKeyField(
        'models.Incident', related_name='polygons', on_delete=fields.CASCADE
    )
    points: fields.ReverseRelation['PolygonPoint']


class PolygonPoint(models.Model):
    id = fields.UUIDField(pk=True)
    area = fields.ForeignKeyField(
        'models.Polygon', related_name='points', on_delete=fields.CASCADE
    )
    x = fields.FloatField()
    y = fields.FloatField()
