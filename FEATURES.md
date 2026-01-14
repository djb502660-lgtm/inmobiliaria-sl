# 🏠 Inmobiliaria SL - Guía de Funcionalidades

## Descripción General
Aplicación mobile completa para publicar, explorar y gestionar propiedades inmobiliarias. Los usuarios pueden registrarse, crear un perfil, publicar propiedades en venta o alquiler, y buscar propiedades de otros usuarios.

---

## 🎯 Funcionalidades Implementadas

### 1. **Sistema de Autenticación**
- **Registro de Usuario**: Formulario completo con validaciones
  - Campos: Nombre, Email, Teléfono, Contraseña (con confirmación)
  - Validaciones: Email válido, teléfono con mínimo 7 dígitos, contraseña mínimo 6 caracteres
  - Almacenamiento persistente con AsyncStorage
  
- **Inicio de Sesión**: Login seguro
  - Validación de email y contraseña
  - Manejo de errores
  - Persiste la sesión del usuario

- **Cerrar Sesión**: Opción en el perfil con confirmación

### 2. **Perfil de Usuario** (Pestaña: Explorar)
- **Información del Perfil**:
  - Visualización de nombre, email y teléfono
  - Edición de datos (nombre y teléfono)
  - Email no editable (por seguridad)
  
- **Mis Propiedades**:
  - Lista de todas las propiedades publicadas por el usuario
  - Opción para eliminar propiedades
  - Contador de propiedades

- **Gestión de Sesión**:
  - Botón para cerrar sesión con confirmación

### 3. **Publicar Propiedades** (Pestaña: Agregar)
- **Formulario Completo de Publicación**:
  - Tipo de operación: Venta o Alquiler (con toggle)
  - Tipo de propiedad: Casa, Apartamento, Oficina, Terreno, Otro
  
- **Información Básica**:
  - Título de la propiedad
  - Ciudad
  - Dirección completa
  
- **Detalles de la Propiedad**:
  - Precio (automáticamente en €/mes si es alquiler)
  - Número de dormitorios
  - Número de baños
  - Área en m²
  
- **Descripción y Multimedia**:
  - Descripción detallada
  - URL de imagen (opcional)
  
- **Validaciones Completas**:
  - Todos los campos requeridos
  - Números válidos y positivos
  - Mensajes de error detallados
  - Indicador de carga durante la publicación

### 4. **Explorar Propiedades** (Pestaña: Home)
- **Búsqueda y Filtrado**:
  - Búsqueda por título, ciudad o dirección
  - Resultados en tiempo real
  - Mensaje cuando no hay resultados
  
- **Listado de Propiedades**:
  - Combina propiedades de demostración (mock) con propiedades de usuarios
  - Tarjetas con información resumida
  - Scroll infinito con múltiples propiedades
  
- **Detalles de Propiedad**:
  - Vista detallada con información completa
  - Imágenes
  - Todas las características

### 5. **Almacenamiento Persistente**
- **AsyncStorage** para guardar:
  - Datos de usuario autenticado
  - Lista de usuarios registrados (con contraseñas)
  - Propiedades publicadas por usuarios
  - Sesión activa del usuario
  
- **Funcionalidades**:
  - Carga de datos al iniciar la app
  - Persistencia entre sesiones
  - Sincronización de cambios

---

## 📱 Navegación de la Aplicación

```
INICIO (Sin Autenticación)
├── Login
│   ├── Iniciar sesión con email/contraseña
│   └── Enlace a "Registrarse"
└── Register
    ├── Crear nueva cuenta
    └── Enlace a "Iniciar Sesión"

APLICACIÓN PRINCIPAL (Autenticado)
├── 🏠 Home (Explorar)
│   ├── Buscar propiedades
│   ├── Ver detalles
│   └── Filtrar por ciudad
│
├── ➕ Agregar Propiedad
│   ├── Formulario de publicación
│   ├── Seleccionar tipo (venta/alquiler)
│   ├── Llenar detalles
│   └── Publicar
│
└── 👤 Mi Perfil (Explorar)
    ├── Ver información del usuario
    ├── Editar perfil
    ├── Ver mis propiedades
    ├── Eliminar propiedades
    └── Cerrar sesión
```

---

## 🔐 Seguridad

- ✅ Validación de email con expresiones regulares
- ✅ Contraseñas mínimo 6 caracteres
- ✅ Confirmación de contraseña al registrarse
- ✅ Almacenamiento local seguro con AsyncStorage
- ✅ Confirmación antes de eliminar propiedades
- ✅ Confirmación antes de cerrar sesión
- ⚠️ **Nota**: En producción, implementar hashing de contraseñas (bcrypt)

---

## 💾 Datos Almacenados

### Usuario
```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}
```

### Propiedad
```typescript
{
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  type: 'sale' | 'rent';
  image: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  userId: string;
  publishedAt: string;
  propertyType: string;
}
```

---

## 🧪 Cómo Probar la Aplicación

### 1. Registro
1. Abre la app (verás la pantalla de login)
2. Toca "Regístrate"
3. Completa el formulario con:
   - Nombre: Tu nombre
   - Email: ejemplo@correo.com
   - Teléfono: 1234567890
   - Contraseña: password123
   - Confirmar: password123
4. Toca "Registrarse"

### 2. Publicar una Propiedad
1. Estando en la app, ve a la pestaña "➕ Agregar"
2. Selecciona tipo (Venta/Alquiler)
3. Elige tipo de propiedad
4. Completa:
   - Título: "Casa moderna en el centro"
   - Ciudad: "Madrid"
   - Dirección: "Calle Principal 123"
   - Precio: "350000" (o "1200" si alquiler)
   - Dormitorios: "3"
   - Baños: "2"
   - Área: "150"
   - Descripción: Describe la propiedad
5. Toca "Publicar Propiedad"

### 3. Buscar Propiedades
1. Ve a la pestaña "🏠 Home"
2. Usa el buscador para filtrar por:
   - Título: "Villa"
   - Ciudad: "Barcelona"
   - Dirección: "Calle"

### 4. Gestionar Perfil
1. Ve a la pestaña "👤 Perfil"
2. Puedes:
   - Ver tu información
   - Editar nombre/teléfono
   - Ver propiedades publicadas
   - Eliminar propiedades
   - Cerrar sesión

---

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **AsyncStorage** - Almacenamiento persistente
- **React Navigation** - Navegación entre pantallas
- **Expo Router** - Enrutamiento basado en archivos

---

## 📋 Checklist de Requisitos Cumplidos

- ✅ Registro de usuarios
- ✅ Inicio de sesión
- ✅ Perfil de usuario editable
- ✅ Publicar propiedades (venta/alquiler)
- ✅ Descripción y dirección en propiedades
- ✅ Búsqueda de propiedades
- ✅ Gestión de propiedades personales
- ✅ Almacenamiento persistente
- ✅ Validaciones de formularios
- ✅ Interfaz responsive

---

## 🚀 Mejoras Futuras

- Integración con API backend real
- Sistema de autenticación OAuth (Google, Facebook)
- Imágenes desde galería/cámara
- Mapas interactivos
- Sistema de favoritos
- Chat entre usuarios
- Filtros avanzados (precio, área, zona)
- Historial de búsquedas
- Notificaciones de nuevas propiedades
- Rating y comentarios

---

**Versión**: 1.0.0  
**Última Actualización**: Enero 2026
