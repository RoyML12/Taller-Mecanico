from pydantic import BaseModel, ConfigDict, Field


class VehiculoBase(BaseModel):
    placa: str = Field(min_length=1, max_length=30)
    modelo: str = Field(min_length=1, max_length=120)
    id_cliente: int


class VehiculoCreate(VehiculoBase):
    pass


class VehiculoUpdate(VehiculoBase):
    pass


class Vehiculo(VehiculoBase):
    id_vehiculos: int

    model_config = ConfigDict(from_attributes=True)
