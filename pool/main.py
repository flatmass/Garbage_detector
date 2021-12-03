from asyncio import run
from src.services import process_new_frames


async def main():
    while True:
        await process_new_frames()


if __name__ == '__main__':
    run(main())
