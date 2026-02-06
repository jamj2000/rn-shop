import { Platform } from 'react-native'
import { SecureStorageAdapter } from '@/lib/secure-storage-adapter'


const apiUrl = `${process.env.EXPO_PUBLIC_API_HOST}/api/files/product`



export const uploadFileImage = async (imageUri) => {

    try {
        // Recuperamos el token
        const token = Platform.OS === 'web'
            ? localStorage.getItem('token')
            : await SecureStorageAdapter.getItem('token')

        // Recuperamos imagen desde el dispositivo
        const res = await fetch(imageUri)
        const blob = await res.blob()

        // Solicitamos la subida de la imagen al backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: blob,
            headers: {
                'Content-Type': blob.type || 'image/jpeg',
                'Authorization': `Bearer ${token}`
            }
        })

        // Recuperamos la respuesta del backend
        const data = await response.json()

        // Validamos la respuesta
        if (!response.ok) {
            console.log('Error de servidor:', data)
            throw new Error(data.error || 'Error al subir la imagen')
        }

        // Retornamos la respuesta del backend
        return data
    } catch (error) {
        console.log('Error de subida:', error.message)
        throw new Error('Error al subir la imagen')
    }
}




export const deleteFileImage = async (imageUri) => {
    console.log('deleteFileImage', imageUri)

    try {
        // Recuperamos el token
        const token = Platform.OS === 'web'
            ? localStorage.getItem('token')
            : await SecureStorageAdapter.getItem('token')

        // Solicitamos la eliminación de la imagen al backend
        const response = await fetch(apiUrl + "/" + imageUri, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        // Recuperamos la respuesta del backend
        const data = await response.json()

        // Validamos la respuesta
        if (!response.ok) {
            console.log('Error de servidor:', data)
            throw new Error(data.error || 'Error al eliminar la imagen')
        }

        // Retornamos la respuesta del backend
        console.log('deleteFileImage', data)
        return data
    } catch (error) {
        console.log('Error de eliminación:', error.message)
        throw new Error('Error al eliminar la imagen')
    }
}
