// localStorageService.jsx
const LOCAL_STORAGE_KEY = 'authData';

export const saveAuthData = (data) => {
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 día en milisegundos
    const item = {
        ...data,
        expiry: expiryTime,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(item));
};

export const getAuthData = () => {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) return null;

    const data = JSON.parse(item);
    const now = new Date().getTime();

    // Verifica si el tiempo de expiración ha pasado
    if (now > data.expiry) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return null;
    }

    return data;
};

export const clearAuthData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getAuthToken = () => {
    const authData = getAuthData();
    return authData ? authData.token : null; // Devuelve el token o null si no existe
};
