from typing import List, Optional
from fastapi import APIRouter, UploadFile, File
from . import schemas, services
from .models import IncidentStatus


incidents_router = APIRouter(tags=['Incidents'])


@incidents_router.post('', response_model=schemas.GetIncident)
async def create_incident(schema: schemas.CreateIncident):
    return await services.incident_s.create(schema=schema)


@incidents_router.post('/upload', response_model=schemas.GetFile)
async def upload_frame(file: UploadFile = File(...)):
    return await services.incident_s.upload_file(file)


@incidents_router.get('/{pk}', response_model=schemas.GetIncident)
async def get_incident(pk: int):
    return await services.incident_s.get(id=pk)


@incidents_router.get('', response_model=List[schemas.GetIncident])
async def get_incidents(
        skip: Optional[int] = 0,
        limit: Optional[int] = 10,
        camera_id: Optional[int] = None,
        status: Optional[IncidentStatus] = None,
        time_open_gte: Optional[IncidentStatus] = None,
        time_open_lte: Optional[IncidentStatus] = None,
        time_close_gte: Optional[IncidentStatus] = None,
        time_close_lte: Optional[IncidentStatus] = None,
):
    return await services.incident_s.filter(
        limit=limit, offset=skip, status=status,
        time_open__gte=time_open_gte,
        time_open__lte=time_open_lte,
        time_close__gte=time_close_gte,
        time_close__lte=time_close_lte,
        camera_id=camera_id
    )
