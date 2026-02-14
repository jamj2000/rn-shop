import { updateCreateProduct, deleteProduct } from '@/lib/actions/products';
import { getProductById } from '@/lib/data/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Alert } from 'react-native';




export const useProduct = (productId) => {
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId); // new | UUID


  // Consulta
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
    // staleTime: 1000 * 60 * 60, // 1 hora
    staleTime: 1000, // 1 segundo
  });


  // Mutación
  const productMutation = useMutation({
    mutationFn: async (product) =>
      updateCreateProduct({
        ...product,
        id: productIdRef.current,
      }),

    onSuccess(product) {
      // queryClient.setQueryData(['products', product.id], product);
      productIdRef.current = product.id;

      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products', product.id],
      });

      Alert.alert('Producto guardado', `${product.title} se guardo correctamente`);
    },
  });


  const deleteMutation = useMutation({
    mutationFn: async (id) => deleteProduct(id),

    onSuccess(product) {
      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });

      Alert.alert('Producto eliminado', `${product.title} se elimino correctamente`);
    },

    onError(error) {
      console.log('DELETE ERROR:', error?.response?.data || error.message);
      Alert.alert('Error', 'No se pudo eliminar el producto');
    },

  });


  return {
    productQuery,
    productMutation,
    deleteMutation,
  };
};
