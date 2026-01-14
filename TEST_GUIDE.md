# 🧪 Guía de Pruebas - Inmobiliaria SL

## ✅ Casos de Prueba

### Caso 1: Registro Completo
**Objetivo**: Verificar que el registro funciona con validaciones

**Pasos**:
1. Abre la aplicación
2. Toca "Regístrate"
3. Prueba las validaciones:
   - Nombre vacío → Error
   - Email inválido (ej: "noesvalido") → Error
   - Teléfono corto (ej: "123") → Error
   - Contraseña corta (ej: "12345") → Error
   - Contraseñas no coinciden → Error
4. Completa correctamente:
   - Nombre: "Juan Pérez"
   - Email: "juan@email.com"
   - Teléfono: "1234567890"
   - Contraseña: "Password123"
   - Confirmar: "Password123"
5. ✅ Debe llevarte a la pantalla Home

**Resultado Esperado**: Registro exitoso, sesión iniciada automáticamente

---

### Caso 2: Inicio de Sesión
**Objetivo**: Verificar login con credenciales existentes

**Pasos**:
1. Estando en Home, abre el perfil
2. Cierra sesión
3. Intenta iniciar con credenciales incorrectas:
   - Email correcto + Contraseña incorrecta → Error
4. Inicia con credenciales correctas:
   - Email: "juan@email.com"
   - Contraseña: "Password123"
5. ✅ Debe regresar a Home con el usuario autenticado

**Resultado Esperado**: Login exitoso

---

### Caso 3: Publicar Propiedad - Venta
**Objetivo**: Verificar creación de propiedad en venta

**Pasos**:
1. Estando autenticado, ve a "Agregar"
2. Selecciona "Venta" (toggle hacia la derecha)
3. Elige tipo "Casa"
4. Completa:
   - Título: "Casa de Lujo con Piscina"
   - Ciudad: "Barcelona"
   - Dirección: "Paseo de Gracia 42"
   - Precio: "450000"
   - Dormitorios: "4"
   - Baños: "3"
   - Área: "250"
   - Descripción: "Hermosa casa con todas las comodidades"
5. Toca "Publicar Propiedad"
6. ✅ Debe mostrar "Éxito"

**Resultado Esperado**: Propiedad creada y guardada

---

### Caso 4: Publicar Propiedad - Alquiler
**Objetivo**: Verificar creación de propiedad en alquiler

**Pasos**:
1. Ve a "Agregar"
2. Selecciona "Alquiler" (toggle hacia la izquierda)
3. Elige tipo "Apartamento"
4. Completa:
   - Título: "Apartamento Centro"
   - Ciudad: "Madrid"
   - Dirección: "Gran Vía 100"
   - Precio: "1200"
   - Dormitorios: "2"
   - Baños: "1"
   - Área: "85"
   - Descripción: "Apartamento moderno en el centro"
5. Toca "Publicar Propiedad"
6. ✅ Debe mostrar "Éxito"

**Resultado Esperado**: Propiedad en alquiler creada

---

### Caso 5: Búsqueda de Propiedades
**Objetivo**: Verificar filtrado funciona correctamente

**Pasos**:
1. Ve a "Home"
2. Prueba búsquedas:
   - Escribe "Barcelona" → Debe mostrar la casa que publicaste
   - Escribe "Madrid" → Debe mostrar apartamentos en Madrid
   - Escribe "Villa" → Debe mostrar la villa mock
   - Escribe "XYZ" → Debe mostrar "No se encontraron propiedades"
3. Limpia el buscador → Deben mostrarse todas

**Resultado Esperado**: Búsqueda funciona correctamente

---

### Caso 6: Ver Mis Propiedades
**Objetivo**: Verificar que tus propiedades aparecen en el perfil

**Pasos**:
1. Ve a "Perfil"
2. En la sección "Mis Propiedades" debe aparecer:
   - La casa de venta
   - El apartamento de alquiler
   - Contador debe mostrar "2"
3. Toca en una propiedad para ver detalles
4. ✅ Los datos deben ser correctos

**Resultado Esperado**: Propiedades mostradas correctamente

---

### Caso 7: Eliminar Propiedad
**Objetivo**: Verificar que puedas eliminar tu propia propiedad

**Pasos**:
1. Ve a "Perfil"
2. En "Mis Propiedades", toca "Eliminar" en una propiedad
3. Confirma en el diálogo
4. ✅ Propiedad debe desaparecer
5. El contador debe decrementar

**Resultado Esperado**: Propiedad eliminada

---

### Caso 8: Editar Perfil
**Objetivo**: Verificar que puedas actualizar tu información

**Pasos**:
1. Ve a "Perfil"
2. Toca "Editar Perfil"
3. Cambia:
   - Nombre: "Juan Carlos Pérez"
   - Teléfono: "9876543210"
4. Toca "Guardar"
5. ✅ Debe mostrar "Éxito"
6. Recarga el perfil y verifica los cambios

**Resultado Esperado**: Datos actualizados correctamente

---

### Caso 9: Cerrar Sesión
**Objetivo**: Verificar que el cierre de sesión funciona

**Pasos**:
1. Ve a "Perfil"
2. Toca "Cerrar Sesión"
3. Confirma en el diálogo
4. ✅ Debe ir a pantalla de login

**Resultado Esperado**: Sesión cerrada, vuelve a login

---

### Caso 10: Persistencia de Datos
**Objetivo**: Verificar que los datos persisten tras cerrar la app

**Pasos**:
1. Cierra completamente la aplicación (proceso background)
2. Reabre la aplicación
3. ✅ Debe estar autenticado automáticamente
4. Las propiedades deben estar presentes
5. Los datos del perfil deben ser correctos

**Resultado Esperado**: Datos persisten correctamente

---

## 🐛 Casos de Error a Validar

### Error 1: Intentar registrar con email duplicado
**Pasos**:
1. Intenta registrarte con un email que ya existe
2. **Esperado**: Mensaje de error "El email ya está registrado"

### Error 2: Crear propiedad con campos vacíos
**Pasos**:
1. Ve a "Agregar"
2. Deja campos vacíos y toca "Publicar"
3. **Esperado**: Errores individuales para cada campo

### Error 3: Crear propiedad con datos inválidos
**Pasos**:
1. Ve a "Agregar"
2. Ingresa:
   - Precio: "abc" (no es número)
   - Dormitorios: "-5" (número negativo)
   - Área: "0" (cero no es válido)
3. Toca "Publicar"
4. **Esperado**: Mensajes de error para los campos inválidos

---

## 📊 Métricas de Éxito

- ✅ Todos los formularios validan correctamente
- ✅ Los errores se muestran de forma clara
- ✅ La búsqueda filtra correctamente
- ✅ Los datos persisten entre sesiones
- ✅ Las acciones destructivas piden confirmación
- ✅ No hay crashes o excepciones no manejadas
- ✅ Los tiempos de carga son razonables (<2 segundos)

---

## 📝 Notas Finales

- Todos los datos se guardan en **AsyncStorage** de tu dispositivo
- Los datos se pueden limpiar reinstalando la aplicación
- Para testing con múltiples usuarios, usa diferentes emails
- Las propiedades de demostración siempre aparecen en el listado
