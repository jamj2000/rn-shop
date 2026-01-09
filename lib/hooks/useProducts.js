import { getProducts } from '@/lib/data/get-products';
import { useInfiniteQuery } from '@tanstack/react-query';



export const useProducts = () => {

  const productsQuery = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam }) => getProducts(20, pageParam * 20),

    // staleTime: 1000 * 60 * 60, // 1 hora
    staleTime: 1000, // 1 segundo

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });


  return {
    productsQuery,

    // Methods
    loadNextPage: productsQuery.fetchNextPage,
  };
};
