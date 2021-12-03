from config import POOL_ID
from .client import client
import aio_pika
from config import loop


async def get_dummy_frame(url: str):
    # frame = client.get(url)
    return


async def process_new_frames():
    cameras = await client.get(f'/cameras/cam?pool_id={POOL_ID}')
    for camera in cameras:
        file = await get_dummy_frame(camera['url'])
        file_schema = await client.upload(f'/incidents/upload', file)
        connection = await aio_pika.connect_robust(
            "amqp://admin:admin@127.0.0.1/", loop=loop
        )

        async with connection:
            routing_key = "incidents"
            channel = await connection.channel()
            await channel.default_exchange.publish(
                aio_pika.Message(body=f'{file_schema}'),
                routing_key=routing_key,
            )
