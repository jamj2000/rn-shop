import api from '@/lib/api';




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
    const { data } = await api.patch(`/products/${id}`, {
      // todo: images
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
};





async function createProduct(product) {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await api.post(`/products`, {
      // todo: images
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
}
