import { View, Text, Image, FlatList } from 'react-native';


const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
const IMAGES_PATH = process.env.EXPO_PUBLIC_IMAGES_PATH;



const ProductImages = ({ images }) => {
  if (images.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('@/assets/images/no-product-image.png')}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          source={{
            uri: item.startsWith('file://')
              ? item
              : API_HOST + IMAGES_PATH + item
          }}
          style={{
            width: 300,
            height: 300,
            marginHorizontal: 7,
            borderRadius: 5,
          }}
        />
      )}
    />
  );
};
export default ProductImages;
