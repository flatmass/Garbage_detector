import os
import sys
from tortoise import Tortoise, run_async
from config import DBPaths, DB_URL
from src.users.schemas import UserCreate, UserDB
from src.users.routers import get_user_manager, get_user_db
from fastapi_users.password import get_password_hash
from os import environ


sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


async def main(on_startup=False):
    """Script for creating first user in system"""
    if not on_startup:
        await Tortoise.init(
            db_url=DB_URL,
            modules={"models": DBPaths.all_paths},
        )
    if not on_startup:
        print("Create superuser")
        email = input("Email: ")
        password = input("Password: ")
    else:
        email = environ.get('API_LOGIN', 'e@e.e')
        password = environ.get('API_PASS', 'e')
    schema = UserCreate(email=email, password=password, is_superuser=True, username='admin', is_support=True)
    user_manager = next(get_user_manager())
    user_db = next(get_user_db())

    await user_manager.validate_password(schema.password, schema)

    existing_user = await user_db.get_by_email(schema.email)
    if existing_user is not None:
        print('Super admin already exists')
        return

    hashed_password = get_password_hash(schema.password)
    user_dict = schema.create_update_dict_superuser()
    db_user = UserDB(**user_dict, hashed_password=hashed_password)
    created_user = await user_db.create(db_user)
    print('Super admin created successfully')
    return created_user


if __name__ == '__main__':
    run_async(main())
