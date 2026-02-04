import { updateCreateProduct } from '@/lib/actions/create-update-product';
import { getProductById } from '@/lib/data/get-product-by-id';
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
      productIdRef.current = product.id;

      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products', product.id],
      });

      Alert.alert('Producto guardado', `${product.title} se guardo correctamente`);
      console.log('producto guardado: last image', product.images);
    },
  });

  // Mantener el ID del producto en caso de ser uno nuevo

  return {
    productQuery,
    productMutation,
  };
};
