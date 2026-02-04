import api from "@/lib/api";

const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
const IMAGES_PATH = process.env.EXPO_PUBLIC_IMAGES_PATH;

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
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error(`product with id ${id} not found`);
  }
};
