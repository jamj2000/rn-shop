import { Platform } from 'react-native';
import { SecureStorageAdapter } from '@/lib/secure-storage-adapter';


export const uploadFileImage = async (imageUri) => {
    console.log('uploadFileImage', imageUri);

    try {
        const token = Platform.OS === 'web'
            ? localStorage.getItem('token')
            : await SecureStorageAdapter.getItem('token');

        const response = await fetch(imageUri);
        const blob = await response.blob();

        const apiUrl = `${process.env.EXPO_PUBLIC_API_HOST}/api/files/product`;

        const responsePost = await fetch(apiUrl, {
            method: 'POST',
            body: blob,
            headers: {
                'Content-Type': blob.type || 'image/jpeg',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await responsePost.json();

        if (!responsePost.ok) {
            console.log('Error de servidor:', data);
            throw new Error(data.error || 'Error al subir la imagen');
        }

        // console.log('data', data);
        return data;
    } catch (error) {
        console.log('Error de subida:', error.message);
        throw new Error('Error al subir la imagen');
    }
};
