import api from "@/lib/api";

const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
const IMAGES_PATH = process.env.EXPO_PUBLIC_IMAGES_PATH;


export const getProducts = async (limit = 20, offset = 0) => {
  try {
    const { data } = await api.get('/products', {
      params: {
        limit,
        offset,
      },
    });

    return data.map((product) => ({
      ...product,
      images: product.images.map(
        (image) => `${API_HOST}${IMAGES_PATH}${image}`
      ),
    }));
  } catch (error) {
    throw new Error('Unable to load products');
  }
};
