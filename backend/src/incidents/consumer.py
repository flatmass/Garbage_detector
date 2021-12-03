import aio_pika
from asyncio import sleep as async_sleep
from config import loop
from json import loads
from . import services, schemas, models


async def process_message(message: aio_pika.IncomingMessage):
    async with message.process():
        json = loads(message.body)
        incident = schemas.CreateIncident(
            camera_id=json['camera_id'],
            label='Переполнение мусорных баков',
            accuracy=json['accuracy'],
            user_id=None,
            status=models.IncidentStatus.is_created,
            file_id=json['file_id'],
            polygons=[
                schemas.PolygonSchema(
                    name=x['name'],
                    points=[
                        schemas.PolygonPointSchema(x=p['x'], y=p['y'])
                        for p in x['points']
                    ]
                )
                for x in json['polygons']
            ]
        )
        await services.incident_s.create(incident)


async def consume():
    await async_sleep(30)
    connection = await aio_pika.connect_robust(
        "amqp://admin:admin@51.250.18.129/", loop=loop
    )
    channel = await connection.channel()
    await channel.set_qos(prefetch_count=100)
    queue = await channel.declare_queue("incidents_end", auto_delete=True)
    await queue.consume(process_message)
    return connection
