import { API_URL, productsApi } from '@/core/api/productsApi';
// import { type Product } from '../interfaces/product.interface';

const API_BASE_URL = "https://nxapi-shop.vercel.app"

export const getProducts = async (limit = 20, offset = 0) => {
  try {
    const { data } = await productsApi.get('/products', {
      params: {
        limit,
        offset,
      },
    });

    return data.map((product) => ({
      ...product,
      images: product.images.map(
        // (image) => `${API_URL}/files/product/${image}`
        (image) => `${API_BASE_URL}/products/${image}`
      ),
    }));
  } catch (error) {
    throw new Error('Unable to load products');
  }
};
