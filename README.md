# Shop App




## Actualizaciones

Esta aplicación fue actualizada a Expo 54 desde Expo 51. Para ello se siguió el siguiente procedimiento:

```sh
# 1. Actualizar expo al siguiente SDK
bun install expo@^52.0.0   # (luego 53, luego 54)

# 2. Actualizar todas las dependencias relacionadas
bunx expo install --fix

# 3. Verificar problemas comunes
bunx expo-doctor

# 4. Revisar el changelog/release notes de cada versión
bunx expo start
```

> [!NOTE]
>
> En el archivo `app.json` se debe cambiar la propiedad `newArchEnabled` a `true` para habilitar la nueva arquitectura de React Native.
> 
> En expo 54 se debe instalar `react-native-worklets`
> 
> ```sh
> bunx expo install react-native-worklets
> ```


## Dev

1. Instalar las dependencias `bun install`
2. Clonar `.env.template` a `.env` y cambiar la dirección IP o dominio del backend
3. Ejecutar `bunx expo start`


