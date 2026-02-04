import api from "@/lib/api";


export const getProducts = async (limit = 20, offset = 0) => {
  try {
    const { data } = await api.get('/products', {
      params: {
        limit,
        offset,
      },
    });

    return data;
  } catch (error) {
    throw new Error('Unable to load products');
  }
};
