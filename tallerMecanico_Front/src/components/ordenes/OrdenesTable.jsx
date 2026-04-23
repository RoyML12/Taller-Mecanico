import { FaTrash } from 'react-icons/fa';

export default function OrdenesTable({ ordenes, clientes = [], vehiculos = [], loading, onDelete }) {
  const clientesMap = new Map(
    clientes.map((cliente) => [
      String(cliente.id_cliente ?? cliente.id),
      cliente,
    ])
  );

  const vehiculosMap = new Map(
    vehiculos.map((vehiculo) => [
      String(vehiculo.id_vehiculo ?? vehiculo.id_vehiculos ?? vehiculo.id),
      vehiculo,
    ])
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Vehículo</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="loading">Cargando órdenes...</td>
            </tr>
          ) : ordenes.length === 0 ? (
            <tr>
              <td colSpan="8" className="loading">No hay órdenes registradas</td>
            </tr>
          ) : (
            ordenes.map((orden) => {
              const cliente = clientesMap.get(String(orden.id_cliente));
              const vehiculo = vehiculosMap.get(String(orden.id_vehiculo));

              return (
                <tr key={orden.id_orden}>
                  <td>{orden.id_orden}</td>
                  <td>
                    {cliente ? (
                      <>
                        <strong>{cliente.nombre || '-'}</strong>
                        <br />
                        <small>ID: {orden.id_cliente}</small>
                      </>
                    ) : (
                      orden.id_cliente ?? '-'
                    )}
                  </td>
                  <td>
                    {vehiculo ? (
                      <>
                        <strong>{vehiculo.placa || '-'}</strong>
                        <br />
                        <small>{vehiculo.modelo || 'Sin modelo'}</small>
                      </>
                    ) : (
                      orden.id_vehiculo ?? '-'
                    )}
                  </td>
                  <td>{orden.fecha_ingreso || '-'}</td>
                  <td>{orden.estado || '-'}</td>
                  <td>{orden.total ?? '-'}</td>
                  <td className="descripcion-cell">{orden.descripcion || '-'}</td>
                  <td>
                    <button className="btn-delete" type="button" onClick={() => onDelete(orden.id_orden)}>
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
