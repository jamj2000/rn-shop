import api from '@/lib/api'
import { uploadFileImage } from '@/lib/actions/files'




export const updateCreateProduct = (product) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock)
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price)

  if (product.id && product.id !== 'new') {
    return updateProduct(product)
  }

  return createProduct(product)
}



// Subimos SOLO si la URI comienza con 'file://'
// y devolvemos nombre sin URL ni extensión
const upload = async (imageUri) => {
  if (imageUri.startsWith('file://')) {
    const { public_id } = await uploadFileImage(imageUri)
    return public_id
  }
  return imageUri
}



const updateProduct = async (product) => {
  const { id, images = [], user, ...rest } = product

  try {
    const imagesNames = await Promise.all(images.map(upload))


    const { data } = await api.patch(`/products/${id}`, {
      ...rest,
      images: imagesNames,
    })

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error al actualizar el producto')
  }
}




const createProduct = async (product) => {
  const { id, images = [], user, ...rest } = product

  try {
    const imagesNames = await Promise.all(images.map(upload))

    const { data } = await api.post(`/products`, {
      ...rest,
      images: imagesNames,
    })

    return data
  } catch (error) {
    throw new Error('Error al crear el producto')
  }
}



export async function deleteProduct(id) {

  try {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error('Error al eliminar el producto');
  }
}
