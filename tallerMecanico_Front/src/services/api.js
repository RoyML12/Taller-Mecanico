const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    let errorMessage = 'Ocurrió un error en la petición';

    try {
      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage =
          errorData.detail ||
          errorData.message ||
          JSON.stringify(errorData);
      } else {
        errorMessage = await response.text();
      }
    } catch {
      errorMessage = 'No se pudo procesar la respuesta del servidor';
    }

    throw new Error(errorMessage || 'Ocurrió un error en la petición');
  }

  if (response.status === 204) return null;

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export function getClientes() {
  return request('/clientes');
}

export function getCliente(id) {
  return request(`/clientes/${id}`);
}

export function createCliente(payload) {
  return request('/clientes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateCliente(id, payload) {
  return request(`/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteCliente(id) {
  return request(`/clientes/${id}`, {
    method: 'DELETE',
  });
}

export function getVehiculos() {
  return request('/vehiculos');
}

export function getVehiculo(id) {
  return request(`/vehiculos/${id}`);
}

export function createVehiculo(payload) {
  return request('/vehiculos', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateVehiculo(id, payload) {
  return request(`/vehiculos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteVehiculo(id) {
  return request(`/vehiculos/${id}`, {
    method: 'DELETE',
  });
}

export function getOrdenes() {
  return request('/ordenes');
}

export function getOrden(id) {
  return request(`/ordenes/${id}`);
}

export function createOrden(payload) {
  return request('/ordenes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateOrden(id, payload) {
  return request(`/ordenes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteOrden(id) {
  return request(`/ordenes/${id}`, {
    method: 'DELETE',
  });
}
