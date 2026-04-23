import { FaTrash } from 'react-icons/fa';

export default function VehiculosTable({ vehiculos, clientes = [], loading, onDelete }) {
  const clientesMap = new Map(
    clientes.map((cliente) => [
      String(cliente.id_cliente ?? cliente.id),
      cliente,
    ])
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="loading">Cargando vehículos...</td>
            </tr>
          ) : vehiculos.length === 0 ? (
            <tr>
              <td colSpan="5" className="loading">No hay vehículos registrados</td>
            </tr>
          ) : (
            vehiculos.map((vehiculo) => {
              const idVehiculo = vehiculo.id_vehiculo ?? vehiculo.id_vehiculos ?? vehiculo.id;
              const clienteId = vehiculo.id_cliente ?? vehiculo.cliente_id;
              const cliente = clientesMap.get(String(clienteId));

              return (
                <tr key={idVehiculo ?? vehiculo.placa}>
                  <td>{idVehiculo ?? '-'}</td>
                  <td><strong>{vehiculo.placa || '-'}</strong></td>
                  <td>{vehiculo.modelo || '-'}</td>
                  <td>
                    {cliente ? (
                      <>
                        <strong>{cliente.nombre || '-'}</strong>
                        <br />
                        <small>ID: {clienteId}</small>
                      </>
                    ) : (
                      clienteId ?? '-'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      type="button"
                      onClick={() => onDelete(idVehiculo)}
                      disabled={!idVehiculo}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
