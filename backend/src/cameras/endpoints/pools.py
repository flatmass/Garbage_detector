from fastapi_crudrouter import TortoiseCRUDRouter
from .. import schemas, models


pools_router = TortoiseCRUDRouter(
    schema=schemas.GetPool,
    create_schema=schemas.CreatePool,
    update_schema=schemas.CreatePool,
    db_model=models.Pool,
    delete_all_route=None,
    prefix="pool",
    tags=['Pools']
)
