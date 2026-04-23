# Taller mecánico - FastAPI + MySQL

Este proyecto quedó adaptado para usar MySQL con SQLAlchemy ORM.

## 1. Instalar dependencias

```bash
pip install -r requirements.txt
```

## 2. Crear archivo `.env`

Copia `.env.example` a `.env` y coloca tus credenciales reales.

## 3. Ejecutar

```bash
uvicorn src.api.main:app --reload
```

## 4. Endpoints

- `GET /clientes`
- `POST /clientes`
- `PUT /clientes/{id_cliente}`
- `DELETE /clientes/{id_cliente}`
- `GET /vehiculos`
- `POST /vehiculos`
- `PUT /vehiculos/{id_vehiculo}`
- `DELETE /vehiculos/{id_vehiculo}`
- `GET /ordenes`
- `POST /ordenes`
- `PUT /ordenes/{id_orden}`
- `DELETE /ordenes/{id_orden}`

## 5. Estructura de tablas usada

- `cliente`
- `vehiculos`
- `ordenes_servicio`

## 6. Nota importante

En el modelo ORM se tomó `fecha_ingreso` como tipo `DATE`.
Si en tu base realmente es `DATETIME`, cambia `Date` por `DateTime` en:

`src/data/models/models.py`
