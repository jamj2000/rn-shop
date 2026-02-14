import { View, Text, Image, FlatList, Alert } from 'react-native';
import { FAB } from '@/components/FAB';
import { deleteFileImage } from '@/lib/actions/files';

const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
const IMAGES_PATH = process.env.EXPO_PUBLIC_IMAGES_PATH;



const ProductImages = ({ images, setImages }) => {
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
        <View>
          <Image
            source={{
              uri: (item.startsWith('file://') || item.startsWith('data:'))
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
          {/* <FAB
            iconName="trash-outline"
            onPress={() => {
              Alert.alert('Eliminar imagen', '¿Estás seguro de eliminar esta imagen?', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancelar Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Eliminar', onPress: async () => {
                    await deleteFileImage(item);
                    // setImages(images.filter((img) => img !== item));
                  }
                },
              ]);
            }}
            style={{ width: 40, height: 40, position: 'absolute', top: 10, right: 10, backgroundColor: 'lightcoral', borderRadius: 100 }}
          /> */}
        </View>
      )}
    />
  );
};
export default ProductImages;
