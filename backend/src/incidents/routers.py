from fastapi import APIRouter, UploadFile, File
from . import schemas, services


incidents_router = APIRouter(tags=['Incidents'])


@incidents_router.post('', response_model=schemas.GetIncident)
async def create_incident(schema: schemas.CreateIncident):
    return services.incident_s.create(schema=schema)


@incidents_router.post('/upload', response_model=schemas.GetFile)
async def upload_frame(file: UploadFile = File(...)):
    return await services.incident_s.upload_file(file)
