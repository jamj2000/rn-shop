# Shop App


## Inspiración

La aplicación está fuertemente inspirada en [expo-products-app](https://github.com/DevTalles-corp/expo-products-app)


## Actualizaciones

Esta aplicación fue actualizada a Expo 54 desde Expo 51. Para ello se siguió el siguiente procedimiento:

```sh
# 1. Actualizar expo al siguiente SDK
bun install expo@^52.0.0   # (luego 53, luego 54)

# 2. Actualizar todas las dependencias relacionadas
bunx expo install --fix

# 3. Verificar problemas comunes
bunx expo-doctor

# 4. Probar la aplicación y resolver incidencias
bunx expo start
```

> [!NOTE]
>
> Por motivos de compatibilidad con [EAS Build](https://docs.expo.dev/build/introduction/) se sustituyó `bun` por `npm` y se resolvieron algunas incidencias con las versiones de algunos paquetes. Se eliminó la carpeta `node_modules` y se volvieron a instalar las dependencias con `npm install`.


> [!NOTE]
>
> En el archivo `app.json` se debe cambiar la propiedad `newArchEnabled` a `true` para habilitar la nueva arquitectura de React Native.
> 
> Además, en expo 54 se debe instalar el paquete `react-native-worklets`: `npx expo install react-native-worklets`



## Prueba y Desarrollo local

1. Instalar las dependencias `npm install`
2. Clonar `.env.template` a `.env` y cambiar la dirección IP o dominio del backend
3. Ejecutar `npx expo start`



## Autenticación 

Para autenticarte en la aplicación puedes usar una de las siguientes credenciales:

Email               | Contraseña
---------------------|------------------
`test@google.com`    | 123
`test1@google.com`   | Abc123
`test2@google.com`   | Abc123




## Backend usado

El backend usado es [nxapi-shop](https://github.com/jamj2000/nxapi-shop) desplegado en [Vercel](https://nxapi-shop.vercel.app)
