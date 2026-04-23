import { useEffect, useMemo } from 'react';
import { FaSave } from 'react-icons/fa';

export default function OrdenForm({
  form,
  setForm,
  onSubmit,
  loading,
  clientes = [],
  vehiculos = [],
}) {
  const vehiculosFiltrados = useMemo(() => {
    if (!form.id_cliente) return [];

    return vehiculos.filter((vehiculo) => {
      const clienteIdVehiculo = vehiculo.id_cliente ?? vehiculo.cliente_id;
      return String(clienteIdVehiculo) === String(form.id_cliente);
    });
  }, [vehiculos, form.id_cliente]);

  useEffect(() => {
    if (!form.id_cliente || !form.id_vehiculo) return;

    const vehiculoValido = vehiculosFiltrados.some((vehiculo) => {
      const idVehiculo = vehiculo.id_vehiculo ?? vehiculo.id_vehiculos ?? vehiculo.id;
      return String(idVehiculo) === String(form.id_vehiculo);
    });

    if (!vehiculoValido) {
      setForm((prev) => ({ ...prev, id_vehiculo: '' }));
    }
  }, [form.id_cliente, form.id_vehiculo, setForm, vehiculosFiltrados]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => {
      if (name === 'id_cliente') {
        return {
          ...prev,
          id_cliente: value,
          id_vehiculo: '',
        };
      }

      return { ...prev, [name]: value };
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="id_cliente">Cliente *</label>
          <select id="id_cliente" name="id_cliente" value={form.id_cliente} onChange={handleChange} required>
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => {
              const idCliente = cliente.id_cliente ?? cliente.id;
              const nombreCliente = cliente.nombre || `Cliente ${idCliente}`;

              return (
                <option key={idCliente} value={idCliente}>
                  {nombreCliente} (ID: {idCliente})
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="id_vehiculo">Vehículo *</label>
          <select
            id="id_vehiculo"
            name="id_vehiculo"
            value={form.id_vehiculo}
            onChange={handleChange}
            required
            disabled={!form.id_cliente}
          >
            <option value="">
              {form.id_cliente ? 'Selecciona un vehículo' : 'Primero selecciona un cliente'}
            </option>
            {vehiculosFiltrados.map((vehiculo) => {
              const idVehiculo = vehiculo.id_vehiculo ?? vehiculo.id_vehiculos ?? vehiculo.id;
              const placa = vehiculo.placa || 'Sin placa';
              const modelo = vehiculo.modelo || 'Sin modelo';

              return (
                <option key={idVehiculo} value={idVehiculo}>
                  {placa} - {modelo} (ID: {idVehiculo})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción *</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          rows="4"
          placeholder="Describe el servicio o problema del vehículo"
          required
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="fecha_ingreso">Fecha de ingreso *</label>
          <input
            id="fecha_ingreso"
            name="fecha_ingreso"
            type="date"
            value={form.fecha_ingreso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado *</label>
          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            <option value="Terminado">Terminado</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="total">Total *</label>
        <input
          id="total"
          name="total"
          type="number"
          min="0"
          step="0.01"
          value={form.total}
          onChange={handleChange}
          placeholder="Ej: 850"
          required
        />
      </div>

      <button className="btn-submit" type="submit" disabled={loading}>
        <FaSave /> {loading ? 'Guardando...' : 'Guardar Orden'}
      </button>
    </form>
  );
}
