import axios from 'axios';
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter';
import { Platform } from 'react-native';



const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_HOST + '/api'
});



api.interceptors.request.use(async (config) => {
    // Verificar si tenemos un token en el secure storage

    let token;
    if (Platform.OS === 'web') {
        token = localStorage.getItem('token');
    } else {
        token = await SecureStorageAdapter.getItem('token');
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



export default api;
