import { router } from 'expo-router';
import { TouchableOpacity, Image } from 'react-native';

import { CustomText } from '@/components/CustomText';
import { CustomView } from '@/components/CustomView';



export const ProductCard = ({ product }) => {
  return (
    <CustomView
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 5,
      }}
    >
      <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)}>
        {product.images.length === 0 ? (
          <Image
            source={require('@/assets/images/no-product-image.png')}
            style={{ width: '100%', height: 200 }}
          />
        ) : (
          <Image
            source={{ uri: product.images[0] }}
            style={{ flex: 1, height: 200, width: '100%' }}
          />
        )}

        <CustomText
          numberOfLines={2}
          style={{ textAlign: 'center' }}
          darkColor={'black'}
        >
          {product.title}
        </CustomText>
      </TouchableOpacity>
    </CustomView>
  );
};
