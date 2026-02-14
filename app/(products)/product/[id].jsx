import { useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { CustomView } from '@/components/CustomView';
import CustomTextInput from '@/components/CustomTextInput';
import { useProduct } from '@/lib/hooks/useProduct';
import ProductImages from '@/components/products/ProductImages';
import CustomButtonGroup from '@/components/CustomButtonGroup';
import CustomButton from '@/components/CustomButton';
import { Formik } from 'formik';
import CameraIconButton from '@/components/CameraIconButton';
import { useCameraStore } from '@/lib/stores/useCameraStore';




const ProductScreen = () => {
  const { selectedImages, clearImages } = useCameraStore();

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation, deleteMutation } = useProduct(`${id}`);


  useEffect(() => {
    clearImages();
  }, []);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CameraIconButton
          onPress={() => router.push('/camera')}
          iconName="camera-outline"
        />
      ),
    });
  }, []);


  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);


  const onDeleteProduct = () => {
    Alert.alert(
      'Eliminar producto',
      '¿Seguro que quieres borrarlo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(id, {
              onSuccess: () => router.replace('/'),
            });
          },
        },
      ]
    );
  };




  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }


  if (!productQuery.data) {
    return <Redirect href="/" />;
  }

  const product = productQuery.data;


  return (
    <Formik
      initialValues={{
        ...product,
        images: [...product.images],
      }}
      onSubmit={(values) =>
        productMutation.mutate({
          ...values,
          images: [...values.images, ...selectedImages],
        })
      }
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView>
            <ProductImages images={[...values.images, ...selectedImages]} />

            <CustomView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <CustomTextInput
                placeholder="Título"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange('title')}
              />

              <CustomTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />

              <CustomTextInput
                placeholder="Descripción"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange('description')}
              />
            </CustomView>

            <CustomView
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <CustomTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange('price')}
              />
              <CustomTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
              />
            </CustomView>

            <CustomView
              style={{
                marginHorizontal: 10,
              }}
            >
              <CustomButtonGroup
                options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                selectedOptions={values.sizes}
                onSelect={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(
                    selectedSize
                  )
                    ? values.sizes.filter((s) => s !== selectedSize)
                    : [...values.sizes, selectedSize];

                  setFieldValue('sizes', newSizesValue);
                }}
              />

              <CustomButtonGroup
                options={['kid', 'men', 'women', 'unisex']}
                selectedOptions={[values.gender]}
                onSelect={(selectedOption) =>
                  setFieldValue('gender', selectedOption)
                }
              />
            </CustomView>


            {/* GUARDAR */}
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
              <CustomButton
                icon="save-outline"
                onPress={() => handleSubmit()}
                isLoading={productMutation.isPending}
              >
                Guardar
              </CustomButton>
            </View>

            {/* BOTÓN BORRAR */}
            <View style={{ marginHorizontal: 10, marginBottom: 80, marginTop: 15 }}>
              <CustomButton
                icon="trash-outline"
                onPress={onDeleteProduct}
                isLoading={deleteMutation.isPending}
                style={{ backgroundColor: '#ff3b30' }}
              >
                Borrar producto
              </CustomButton>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};
export default ProductScreen;
