import axios from 'axios';

// 1. Creamos la instancia base
const api = axios.create({
    baseURL: 'http://localhost:5217/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 2. INTERCEPTOR DE PETICIÓN: Siempre adjunta el Access Token actual (Gafete)
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. INTERCEPTOR DE RESPUESTA: El rescatista silencioso
api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 

            try {
                const accessToken = sessionStorage.getItem('token');
                const refreshToken = sessionStorage.getItem('refreshToken');

                if (!refreshToken) {
                    sessionStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // Pedimos el rescate a C#
    const { data } = await axios.post(`${api.defaults.baseURL}/Auth/refresh-token`, {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });

                // Guardamos los nuevos tokens
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('refreshToken', data.refreshToken);

                // Reintentamos la petición original
                originalRequest.headers.Authorization = `Bearer ${data.token}`;
                return api(originalRequest);

            } catch (refreshError) {
                console.error("El Refresh Token caducó o es inválido. Redirigiendo a Login.");
                sessionStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// LO EXPORTAMOS PARA QUE OTROS ARCHIVOS LO PUEDAN USAR
export default api;