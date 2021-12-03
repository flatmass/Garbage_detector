from os import environ
import asyncio


loop = asyncio.new_event_loop()

POOL_ID = int(environ.get('POOL_ID', 1))
BACKEND_URL = environ.get('BACKEND_URL', 'http://51.250.18.129/api')
