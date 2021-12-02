from fastapi_users.authentication import CookieAuthentication
from config import SECRET
from typing import Optional, List

from fastapi_users import FastAPIUsers
from fastapi_users.db import TortoiseUserDatabase

from src.users.models import UserModel
from src.users.schemas import get_user_db
from src.users.schemas import User, UserCreate, UserDB, UserUpdate, GetMinimizeUser
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi_users import models
from fastapi_users.manager import (
    BaseUserManager,
    InvalidPasswordException,
    UserAlreadyExists,
    UserNotExists,
)
from fastapi_users.router.common import ErrorCode
from pydantic import UUID4


class UserManager(BaseUserManager[UserCreate, UserDB]):
    user_db_model = UserDB
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: UserDB, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(self, user: UserDB, token: str, request: Optional[Request] = None):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(self, user: UserDB, token: str, request: Optional[Request] = None):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


def get_user_manager(user_db: TortoiseUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


cookie_authentication = CookieAuthentication(
    secret=SECRET,
    cookie_secure=False,
    cookie_httponly=False,
)


fastapi_cookies = FastAPIUsers(
    get_user_manager,
    [cookie_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)

get_current_active_user = fastapi_cookies.current_user(active=True)
get_current_superuser = fastapi_cookies.current_user(superuser=True)


async def get_user_or_404(
    id: UUID4,
    user_manager: BaseUserManager[models.UC, models.UD] = Depends(get_user_manager),
) -> models.UD:
    try:
        return await user_manager.get(id)
    except UserNotExists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)


users_router = APIRouter(dependencies=[Depends(get_current_active_user)])


@users_router.get("/me", response_model=UserDB)
async def me(user: UserDB = Depends(get_current_active_user), ):
    return user


@users_router.get('/minimize', response_model=List[GetMinimizeUser])
async def get_minimal_users_info(user: UserDB = Depends(get_current_superuser)):
    return await GetMinimizeUser.from_queryset(UserModel.all())


@users_router.patch(
    "/{id:uuid}",
    response_model=User,
    dependencies=[Depends(get_current_superuser)],
)
async def update_user(
    user_update: UserUpdate,
    request: Request,
    user=Depends(get_user_or_404),
    user_manager: BaseUserManager[models.UC, models.UD] = Depends(get_user_manager),
):
    try:
        return await user_manager.update(
            user_update, user, safe=False, request=request
        )
    except InvalidPasswordException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "code": ErrorCode.UPDATE_USER_INVALID_PASSWORD,
                "reason": e.reason,
            },
        )
    except UserAlreadyExists:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail=ErrorCode.UPDATE_USER_EMAIL_ALREADY_EXISTS,
        )


@users_router.get("/{id:uuid}", dependencies=[Depends(get_current_active_user)],)
async def get_user_detail(user=Depends(get_user_or_404),):
    return await GetMinimizeUser.from_queryset_single(UserModel.filter(id=user.id).first())


@users_router.delete(
    "/{id:uuid}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    dependencies=[Depends(get_current_superuser)],
)
async def delete_user(
    user=Depends(get_user_or_404),
    user_manager: BaseUserManager[models.UC, models.UD] = Depends(get_user_manager),
):
    await user_manager.delete(user)
    return None
