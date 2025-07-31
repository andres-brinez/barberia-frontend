//import { StorageService } from "./storage.service";

import { getAuthToken } from "./localStorageService";

//const storageService = new StorageService();

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}` // Añade el token de autorización si está disponible
};

export default {
  post: (url, body ) => fetch(url, { headers, method: 'POST', body: JSON.stringify(body) }),
  get: (url) => fetch(url, { headers, method: 'GET' }),
  // put: (url: string, body: any) => fetch(url, { headers, method: 'PUT', body: JSON.stringify(body) }),
  // delete: (url: string) => fetch(url, { headers, method: 'DELETE' })
}