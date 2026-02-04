import { router } from 'expo-router';
import { Pressable, Image } from 'react-native';

import { CustomText } from '@/components/CustomText';
import { CustomView } from '@/components/CustomView';


const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
const IMAGES_PATH = process.env.EXPO_PUBLIC_IMAGES_PATH;


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
      <Pressable
        style={({ pressed }) => ({
          height: 250,
          opacity: pressed ? 0.5 : 1,
        })}
        onPress={() => router.push(`/product/${product.id}`)}
      >
        {product.images.length === 0 ? (
          <Image
            source={require('@/assets/images/no-product-image.png')}
            style={{ width: '100%', height: 200 }}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={{ uri: API_HOST + IMAGES_PATH + product.images[0] }}
            style={{ flex: 1, height: 200, width: '100%' }}
            resizeMode="contain"
          />
        )}

        <CustomText
          numberOfLines={2}
          style={{ textAlign: 'center' }}
          darkColor={'black'}
        >
          {product.title}
        </CustomText>
      </Pressable>
    </CustomView>
  );
};
