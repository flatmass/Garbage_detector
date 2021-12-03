from tortoise import models, fields


class File(models.Model):
    id = fields.BigIntField(pk=True)
    url = fields.CharField(max_length=255)


class Setting(models.Model):
    id = fields.SmallIntField(pk=True)
    title = fields.CharField(max_length=255)
    subtitle = fields.CharField(max_length=255)
    i_buy = fields.TextField(null=True, default=None)
    i_sell = fields.TextField(null=True, default=None)
    vk = fields.TextField(null=True, default=None)
    telegram = fields.TextField(null=True, default=None)
    fb = fields.TextField(null=True, default=None)
    inst = fields.TextField(null=True, default=None)
    youtube = fields.TextField(null=True, default=None)
