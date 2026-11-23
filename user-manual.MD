# Control de Asistencia de Ararat (Manual de usuario)

## [https://ararat-tracker.vercel.app](https://ararat-tracker.vercel.app)

---

## 1. Perfiles disponibles

| Función | Operator | Admin | Superadmin |
|---|:---:|:---:|:---:|
| Registrar y editar personas | ✓ | ✓ | ✓ |
| Registrar asistencia de hoy y consultar fechas anteriores | ✓ | ✓ | ✓ |
| Cambiar sus propios datos de acceso | ✓ | ✓ | ✓ |
| Acceder al panel administrativo y consultar métricas | x | ✓ | ✓ |
| Eliminar personas y editar sus fechas especiales | x | ✓ | ✓ |
| Gestionar usuarios operator | x | ✓ | ✓ |
| Crear usuarios admin y gestionar usuarios admin | x | x | ✓ |
| Exportar personas a CSV | x | x | ✓ |
| Cambiar rangos de edad para miembros y líderes | x | x | ✓ |

## 2. Funciones para todos los perfiles

### Iniciar y cerrar sesión

1. Introduzca su correo y contraseña en la pantalla de acceso.
2. Pulse **Iniciar sesión**.
3. Para salir, pulse el icono de cierre de sesión en el encabezado.

El nombre y perfil de la sesión aparecen en el encabezado.

### Registrar asistencia

1. Entre en **Tomar asistencia**.
2. Seleccione la fecha de hoy.
3. Busque por nombre, apellido o cédula; el filtro se activa con tres caracteres.
4. Marque o desmarque las personas presentes.
5. Pulse **Guardar Asistencia**.

Las personas marcadas aparecen primero. El contador **Asistentes** muestra cuántas están seleccionadas. Al elegir una fecha anterior, la lista es solo de consulta y muestra las personas registradas para ese día.

### Registrar o editar una persona

1. Pulse **Ir a Gestión personas**.
2. Complete nombre, apellido, fecha de nacimiento y tipo de persona. La cédula es opcional.
3. Añada los datos de contacto, necesidades y notas disponibles.
4. Pulse **Guardar Persona**.

Para encontrar una persona en la lista, busque por nombre, apellido o cédula; el filtro se activa con tres caracteres. Para modificar un registro, pulse **Editar** junto a la persona, cambie sus datos y seleccione **Actualizar**.

En celulares el formulario de registro está oculto inicialmente; pulse **Mostrar registro de nueva persona** para abrirlo. Al editar una persona, el formulario se muestra automáticamente y el botón para ocultarlo desaparece hasta actualizar o cancelar la edición.

Los tipos **Miembro** y **Líder** tienen requisitos de edad y otras condiciones que el formulario indica cuando no se cumplen.

**Asistencia automática:** cuando un operator o admin crea una persona, el sistema intenta registrar también su asistencia. Si falla, muestra un aviso indicando que la persona fue creada pero la asistencia no se guardó. Para superadmin no se crea esa asistencia automáticamente.

### Cambiar datos de la cuenta

En la pantalla principal, abra **Configuración de Usuario**, cambie su nombre, correo o contraseña y pulse **Guardar**. Después de guardar, la aplicación cierra la sesión para que vuelva a ingresar.

## 3. Funciones de Admin y Superadmin

Acceda mediante el icono de administración del encabezado.

### Métricas y gráficos

- **Métricas:** muestra totales de miembros y visitantes, promedio de asistencia de los domingos con registros y cifras de visitantes.
- **Gráficos:** muestra tendencia de asistencia, visitantes por mes, composición general y peticiones.

### Gestión de personas

En la pestaña **Personas** puede consultar la lista y el número de asistencias de cada persona, editar las fechas de **primera visita** y **bautismo**, o eliminar un registro.

Para filtrar la lista, busque por nombre, apellido o cédula; el filtro se activa con tres caracteres. La exportación a CSV incluye todas las personas, independientemente de la búsqueda.

> Al eliminar una persona con asistencias, la confirmación advierte que también se borrará su historial.

### Gestión de usuarios

En la pestaña **Usuarios** puede crear, editar o eliminar cuentas:

- **Admin:** gestiona usuarios **operator**.
- **Superadmin:** puede crear usuarios **operator** y **admin**, y gestionar los usuarios mostrados en la lista. Las cuentas superadmin no aparecen en esa lista.

**Precaución:** actualmente, al guardar la edición de un usuario desde este panel, el sistema establece su rol como **operator**, incluso si se selecciona admin. Evite editar cuentas admin hasta corregir ese comportamiento.

## 4. Funciones exclusivas de Superadmin

### Exportar personas

En la seccion de Administrador en la pestaña **Gestión de Personas**, pulse **Exportar a CSV**, junto al título *Personas Registradas*. El botón está deshabilitado si la lista está vacía.

El archivo contiene nombres, apellidos, teléfonos, correo, fecha de nacimiento, tipo de persona, primera visita, bautismo y notas. Su nombre incluye la fecha de descarga, por ejemplo `personas-2026nov17.csv`.

### Ajustar rangos de edad para miembros y líderes

1. En la seccion de Administrador, abra la pestaña **Ajustes Generales**.
2. Mueva los controles de edad mínima y máxima para miembros o líderes.
3. Pulse **Guardar**; use **Cancelar** para descartar los cambios pendientes.