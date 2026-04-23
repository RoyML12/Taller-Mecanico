import { FaSave } from 'react-icons/fa';

export default function VehiculoForm({ form, setForm, onSubmit, loading, clientes = [] }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="placa">Placa *</label>
        <input
          id="placa"
          name="placa"
          type="text"
          value={form.placa}
          onChange={handleChange}
          placeholder="Ej: ABC-123"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="modelo">Modelo *</label>
        <input
          id="modelo"
          name="modelo"
          type="text"
          value={form.modelo}
          onChange={handleChange}
          placeholder="Ej: Tsuru 2015"
          required
        />
      </div>

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

      <button className="btn-submit" type="submit" disabled={loading}>
        <FaSave /> {loading ? 'Guardando...' : 'Guardar Vehículo'}
      </button>
    </form>
  );
}
