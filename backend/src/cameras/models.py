from tortoise import fields, models


class Pool(models.Model):
    id = fields.BigIntField(pk=True)
    name = fields.CharField(max_length=255)


class GeoCoord(models.Model):
    id = fields.BigIntField(pk=True)
    x = fields.FloatField()
    y = fields.FloatField()


class Camera(models.Model):
    id = fields.BigIntField(pk=True)
    name = fields.CharField(max_length=255)
    url = fields.CharField(max_length=255)
    coord = fields.ForeignKeyField(
        'models.GeoCoord', related_name='cameras', on_delete=fields.CASCADE
    )
    pool = fields.ForeignKeyField(
        'models.Pool', related_name='cameras', on_delete=fields.CASCADE
    )
    areas: fields.ReverseRelation['Area']


class Area(models.Model):
    id = fields.BigIntField(pk=True)
    name = fields.CharField(max_length=255)
    camera = fields.ForeignKeyField(
        'models.Camera', related_name='areas', on_delete=fields.CASCADE
    )
    points: fields.ReverseRelation['AreaPoint']


class AreaPoint(models.Model):
    id = fields.UUIDField(pk=True)
    area = fields.ForeignKeyField(
        'models.Area', related_name='points', on_delete=fields.CASCADE
    )
    x = fields.FloatField()
    y = fields.FloatField()
