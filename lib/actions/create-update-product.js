import api from '@/lib/api';
import { uploadFileImage } from './upload_file_image';




export const updateCreateProduct = (product) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};





const updateProduct = async (product) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const checkedImages = await Promise.all(
      images.map(async (image) => {
        if (image.startsWith('file://')) {
          const { public_id } = await uploadFileImage(image);
          return public_id;
        }
        return image;
      })
    );

    const { data } = await api.patch(`/products/${id}`, {
      ...rest,
      images: checkedImages,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el producto');
  }
};





async function createProduct(product) {
  const { id, images = [], user, ...rest } = product;

  try {
    const checkedImages = await Promise.all(
      images.map(async (image) => {
        if (image.startsWith('file://')) {
          const { public_id } = await uploadFileImage(image);
          return public_id;
        }
        return image;
      })
    );

    const { data } = await api.post(`/products`, {
      ...rest,
      images: checkedImages,
    });

    return data;
  } catch (error) {
    throw new Error('Error al crear el producto');
  }
}
