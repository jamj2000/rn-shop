import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { router } from 'expo-router';

import CustomButton from '@/components/CustomButton';
import { CustomText } from '@/components/CustomText';
import CustomTextInput from '@/components/CustomTextInput';
import Colors from '@/lib/colors';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Link } from 'expo-router';



const LoginScreen = () => {
  const { login } = useAuthStore();

  const { height } = useWindowDimensions();
  const backgroundColor = Colors.background;

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    const { email, password } = form;

    console.log({ email, password });

    if (email.length === 0 || password.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(email, password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace('/');
      return;
    }

    Alert.alert('Error', 'Usuario o contraseña no son correctos');
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
          <CustomText type="title">Ingresar</CustomText>
          <CustomText style={{ color: 'grey' }}>
            Por favor ingrese para continuar
          </CustomText>
        </View>

        {/* Email y Password */}
        <View style={{ marginTop: 20 }}>
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
          onPress={onLogin}
          disabled={isPosting}
        >
          Ingresar
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
          <CustomText>¿No tienes cuenta?</CustomText>

          <Link href="/auth/register" style={{ color: '#3D64F4', marginHorizontal: 5 }}>
            Crear cuenta
          </Link>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
