# 🚀 Guía de Ejecución - Inmobiliaria SL

## Requisitos Previos

- Node.js 16+ instalado
- npm o yarn
- Expo CLI (opcional para algunos comandos)

---

## 📥 Instalación Inicial

### 1. Instalar Dependencias
```bash
cd c:\laragon\www\Inmobiliaria-SL\inmobiliaria-sl
npm install
```

Todas las dependencias ya están configuradas en `package.json`.

### 2. Verificar la Instalación
```bash
npm list
```

Deberías ver:
- ✅ @react-native-async-storage/async-storage
- ✅ expo ~54.0.31
- ✅ react-native 0.81.5
- ✅ react-navigation y expo-router

---

## ▶️ Ejecutar la Aplicación

### Opción 1: Expo (Recomendado)
```bash
npm start
```

Luego:
- Presiona `w` para Web
- Presiona `i` para iOS (requiere macOS)
- Presiona `a` para Android (requiere emulador)
- Escanea QR con Expo Go en tu teléfono

### Opción 2: Web Directamente
```bash
npm run web
```

### Opción 3: iOS (macOS)
```bash
npm run ios
```

### Opción 4: Android
```bash
npm run android
```

---

## 🔍 Verificación de Funcionamiento

Después de ejecutar la app:

### 1. Pantalla de Login
- ✅ Debe mostrarse el formulario de login
- ✅ Enlace a "Regístrate" visible

### 2. Registro
- ✅ Botón "Regístrate" lleva a formulario
- ✅ Validaciones funcionan (prueba campos vacíos)
- ✅ Después de registrar → Va a Home

### 3. Home
- ✅ Muestra propiedades
- ✅ Búsqueda filtra resultados
- ✅ Puede hacer scroll

### 4. Agregar Propiedad
- ✅ Formulario con todos los campos
- ✅ Toggle para Venta/Alquiler funciona
- ✅ Validaciones activas
- ✅ Publicar guarda la propiedad

### 5. Perfil
- ✅ Muestra datos del usuario
- ✅ Botón "Editar Perfil" funciona
- ✅ Muestra propiedades publicadas
- ✅ Puede eliminar propiedades
- ✅ Cerrar sesión funciona

---

## 🧹 Limpiar y Reinstalar

### Eliminar node_modules
```bash
rmdir /s node_modules
```

### Eliminar caché de npm
```bash
npm cache clean --force
```

### Reinstalar
```bash
npm install
```

---

## 🗑️ Limpiar Datos de la App

Los datos se guardan en AsyncStorage. Para limpiarlos:

### Opción 1: Reinstalar la App
```bash
npm start
# Luego en Expo Go, desliza la aplicación hacia la izquierda y elimina
```

### Opción 2: Código de Prueba
Agregue esto en `app/_layout.tsx`:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Descomenta para limpiar datos
// AsyncStorage.clear();
```

---

## 🐛 Troubleshooting

### Problema: "Cannot find module '@react-native-async-storage/async-storage'"
**Solución**: 
```bash
npm install @react-native-async-storage/async-storage
```

### Problema: Port 8081 ya en uso
**Solución**:
```bash
npx expo start -c
```
(Flag `-c` limpia caché)

### Problema: Expo Go no carga la app
**Solución**:
1. Reinicia el servidor: Presiona `r` en la terminal
2. Recarga la app: Shake el teléfono y selecciona "Reload"
3. Escanea nuevamente el QR

### Problema: TypeScript errors en editor
**Solución**: 
```bash
npm run lint
```
Algunos son solo advertencias y no afectan ejecución.

---

## 📱 Probar en Dispositivo Físico

### iOS
1. Instala Expo Go desde App Store
2. Escanea QR cuando ejecutes `npm start`

### Android
1. Instala Expo Go desde Google Play
2. Escanea QR cuando ejecutes `npm start`

---

## 🏗️ Estructura de Carpetas

```
inmobiliaria-sl/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx ✅ Mejorado
│   │   └── register.tsx ✅ Mejorado
│   ├── (tabs)/
│   │   ├── index.tsx ✅ Mejorado
│   │   ├── add-property.tsx ✅ Mejorado
│   │   └── explore.tsx ✅ Mejorado (Perfil)
│   ├── context/
│   │   └── AuthContext.tsx ✅ Mejorado
│   ├── data/
│   │   └── properties.ts
│   ├── types/
│   │   └── index.ts ✅ Mejorado
│   └── property/
│       └── [id].tsx
├── components/
│   ├── property-card.tsx
│   └── ... otros componentes
├── constants/
│   └── theme.ts
├── hooks/
│   └── use-color-scheme.ts
├── package.json
├── tsconfig.json
├── app.json
├── FEATURES.md ✅ Nuevo
├── TEST_GUIDE.md ✅ Nuevo
├── IMPLEMENTATION_SUMMARY.md ✅ Nuevo
└── RUNNING_GUIDE.md (Este archivo)
```

---

## 📊 Variables de Entorno

Actualmente no hay variables de entorno configuradas. Para producción:

```bash
# .env
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production
```

---

## 🔐 Notas de Seguridad

⚠️ **Para Desarrollo/Demo:**
- Contraseñas almacenadas en texto plano
- AsyncStorage sin encriptación
- No hay validación en servidor

✅ **Para Producción:**
- Implementar autenticación en servidor
- Usar JWT o OAuth
- Encriptar datos sensibles
- Validar en backend

---

## 📈 Performance

### Optimizaciones Implementadas
- ✅ FlatList para listas de propiedades
- ✅ ScrollView nativo
- ✅ Memoización donde es necesaria
- ✅ Carga perezosa (lazy loading)

### Futuras Optimizaciones
- [ ] Redux Toolkit para estado global
- [ ] React Query para datos remotos
- [ ] Pagination en listas largas
- [ ] Image caching

---

## 📚 Recursos Útiles

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)
- [AsyncStorage Guide](https://react-native-async-storage.github.io/async-storage/)

---

## ✅ Checklist de Ejecución

- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor Expo iniciado (`npm start`)
- [ ] App cargada en dispositivo/emulador
- [ ] Puedo registrar un usuario
- [ ] Puedo publicar una propiedad
- [ ] Puedo buscar propiedades
- [ ] Puedo ver mi perfil
- [ ] Puedo cerrar sesión
- [ ] Datos persisten al cerrar app

---

## 🎯 Próximos Pasos

1. **Ejecuta la app** con `npm start`
2. **Prueba todas las funcionalidades** según TEST_GUIDE.md
3. **Personaliza estilos** en `constants/theme.ts`
4. **Agrega tu branding** en `assets/images/`
5. **Conecta a un backend** cuando esté listo

---

## 📞 Soporte Técnico

Si tienes problemas:

1. Revisa este archivo (RUNNING_GUIDE.md)
2. Revisa TEST_GUIDE.md para casos de prueba
3. Revisa FEATURES.md para funcionalidades
4. Revisa IMPLEMENTATION_SUMMARY.md para arquitectura

---

**¡La aplicación está lista para usar! 🚀**

Versión: 1.0.0  
Última actualización: Enero 2026
