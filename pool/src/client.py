from typing import Optional
from aiohttp import ClientSession, CookieJar
from config import BACKEND_URL


class Client:
    def __init__(self):
        self.session: Optional[ClientSession] = None

    async def init(self):
        if self.session is None:
            jar = CookieJar(unsafe=True, quote_cookie=False)
            self.session = ClientSession(cookie_jar=jar)

    async def upload(self, url: str, file):
        await self.init()
        return await self.session.post(f'{BACKEND_URL}/{url}', data={'file': file})

    async def post(self, url: str, json: dict):
        await self.init()
        return await self.session.post(f'{BACKEND_URL}/{url}', json=json)

    async def get(self, url: str):
        await self.init()
        return await self.session.get(f'{BACKEND_URL}/{url}')


client = Client()
