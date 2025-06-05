export const apiRequest = async (url, method = 'GET', body = null) => {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const response = await fetch(`http://localhost:8080${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en la solicitud');
    }
  
    return response.json();
  };
  
  // Ejemplo de función específica para login
  export const login = async (username, password) => {
    return apiRequest('/auth/login', 'POST', { username, password });
  };