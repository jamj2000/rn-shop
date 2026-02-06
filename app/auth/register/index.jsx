import CustomButton from '@/components/CustomButton';
import { CustomText } from '@/components/CustomText';
import CustomTextInput from '@/components/CustomTextInput';
import { Link, router } from 'expo-router';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import Colors from '@/lib/colors';
import { authRegister } from '@/lib/actions/auth';
import { useState } from 'react';




const RegisterScreen = () => {

  const { height } = useWindowDimensions();
  const backgroundColor = Colors.background;
  const primaryColor = Colors.primary;

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const onRegister = async () => {
    const { fullName, email, password } = form;

    console.log({ fullName, email, password });

    if (email.length === 0 || password.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await authRegister(fullName, email, password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace('/auth/login');
      return;
    }

    Alert.alert('Error', 'El usuario no ha podido registrarse');
  };




  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <CustomText type="title">Crear cuenta</CustomText>
          <CustomText style={{ color: 'grey' }}>
            Por favor crea una cuenta para continuar
          </CustomText>
        </View>

        {/* Nombre completo, Email y Password */}
        <View style={{ marginTop: 20 }}>
          <CustomTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={form.fullName}
            onChangeText={(value) => setForm({ ...form, fullName: value })}
          />

          <CustomTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <CustomTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón */}
        <CustomButton
          icon="arrow-forward-outline"
          onPress={onRegister}
          disabled={isPosting}
        >
          Crear cuenta
        </CustomButton>


        {/* Spacer */}
        <View style={{ marginTop: 50 }} />

        {/* Enlace a registro */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomText>¿Ya tienes cuenta?</CustomText>

          <Link href="/auth/login" style={{ color: primaryColor, marginHorizontal: 5 }}>
            Ingresar
          </Link>


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default RegisterScreen;
