import { API_URL, productsApi } from '@/core/api/productsApi';
// import { Gender, type Product } from '../interfaces/product.interface';

const API_BASE_URL = "https://nxapi-shop.vercel.app"


const emptyProduct = {
  id: '',
  title: 'Nuevo producto',
  description: '',
  price: 0,
  images: [],
  slug: '',
  gender: 'men',    // 'kid' | 'men' | 'women'
  sizes: [],
  stock: 0,
  tags: [],
};



export const getProductById = async (id) => {
  if (id === 'new') return emptyProduct;

  try {
    const { data } = await productsApi.get(`/products/${id}`);
    return {
      ...data,
      // images: data.images.map((image) => `${API_URL}/files/product/${image}`),
      images: data.images.map((image) => `${API_BASE_URL}/products/${image}`),

    };
  } catch (error) {
    throw new Error(`product with id ${id} not found`);
  }
};
