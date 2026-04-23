from datetime import date
from pydantic import BaseModel, ConfigDict, Field


class OrdenBase(BaseModel):
    id_cliente: int
    id_vehiculo: int
    descripcion: str = Field(min_length=1, max_length=1000)
    fecha_ingreso: date
    estado: str = Field(min_length=1, max_length=50)
    total: float = Field(ge=0)


class OrdenCreate(OrdenBase):
    pass


class OrdenUpdate(OrdenBase):
    pass


class Orden(OrdenBase):
    id_orden: int

    model_config = ConfigDict(from_attributes=True)
