# 🏠 Inmobiliaria SL - Aplicación Mobile

Una aplicación inmobiliaria completa para publicar, explorar y gestionar propiedades. Permite a los usuarios registrarse, crear un perfil, publicar propiedades en venta o alquiler.

## ✨ Características Principales

- ✅ **Autenticación Completa**: Registro e inicio de sesión con validaciones
- ✅ **Perfil de Usuario**: Editable con información personal
- ✅ **Publicar Propiedades**: En venta o alquiler con descripción completa
- ✅ **Búsqueda en Tiempo Real**: Filtra por título, ciudad, dirección
- ✅ **Gestión Personal**: Ver, editar y eliminar propiedades propias
- ✅ **Almacenamiento Persistente**: Datos guardados localmente
- ✅ **Validaciones Completas**: 20+ validaciones de campos
- ✅ **Interfaz Moderna**: Responsive y adaptable

## 🚀 Inicio Rápido

### Requisitos
- Node.js 16+
- npm o yarn

### Instalación
```bash
npm install
```

### Ejecutar
```bash
npm start
```

Luego presiona:
- `w` para Web
- `i` para iOS
- `a` para Android

## 📚 Documentación

- **[README_FINAL.md](README_FINAL.md)** - Resumen completo y guía rápida ⭐ START HERE
- **[RUNNING_GUIDE.md](RUNNING_GUIDE.md)** - Cómo ejecutar la aplicación
- **[FEATURES.md](FEATURES.md)** - Descripción detallada de funcionalidades
- **[TEST_GUIDE.md](TEST_GUIDE.md)** - 10 casos de prueba completos
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Resumen técnico

## 📁 Estructura del Proyecto

```
inmobiliaria-sl/
├── app/
│   ├── (auth)/           # Pantallas de autenticación
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/           # Pantallas principales
│   │   ├── index.tsx     (Home/Explorar)
│   │   ├── add-property.tsx
│   │   └── explore.tsx   (Perfil)
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── index.ts
│   └── data/
│       └── properties.ts
├── components/
├── constants/
├── hooks/
├── package.json
└── README_FINAL.md       # ⭐ Comienza aquí!
```

## 🎯 Funcionalidades

### 1. Autenticación
- Registro con validación de email, teléfono y contraseña
- Login con credenciales
- Sesión persistente
- Cierre de sesión con confirmación

### 2. Propiedades
- Publicar en venta o alquiler
- Información completa (título, dirección, precio, etc.)
- Descripción detallada
- Búsqueda en tiempo real

### 3. Perfil
- Ver información personal
- Editar datos
- Ver propiedades publicadas
- Eliminar propiedades

## 🔐 Seguridad

- Validaciones de email (RFC)
- Contraseñas mínimo 6 caracteres
- Confirmación de contraseña
- Prevención de emails duplicados
- Confirmación antes de acciones destructivas
- AsyncStorage para almacenamiento local

## 📊 Estadísticas

- 5 pantallas principales
- 20+ validaciones
- 2,000+ líneas de código
- 100% funcional

## 🛠️ Tecnologías

- React Native
- Expo
- TypeScript
- AsyncStorage
- React Navigation

## 📝 Próximos Pasos

1. Lee [README_FINAL.md](README_FINAL.md)
2. Ejecuta con `npm start`
3. Prueba según [TEST_GUIDE.md](TEST_GUIDE.md)
4. Conecta a un backend cuando esté listo

## 📞 Soporte

Consulta los documentos incluidos:
- Troubleshooting en [RUNNING_GUIDE.md](RUNNING_GUIDE.md)
- Casos de prueba en [TEST_GUIDE.md](TEST_GUIDE.md)
- Detalles técnicos en [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

**Versión**: 1.0.0  
**Estado**: ✅ Completado  
**Plataformas**: iOS, Android, Web
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You'll also find options to open the app's developer menu, reload the app, and more.

#### Web

Web previews will be started and managred automatically. Use the toolbar to manually refresh.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
