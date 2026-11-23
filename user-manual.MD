<div style="display: flex; justify-content: center; align-items: center; gap: 16px;">
  <img src="public/ararat.png" alt="Logo de Iglesia Ararat" width="90">
  <div>
    <h2>Control de Asistencia de Ararat</h2>
    <h2>(Manual de usuario)</h2>
  </div>
</div>

## [https://ararat-tracker.vercel.app](https://ararat-tracker.vercel.app)

---

## 1. Perfiles disponibles

| Función | Operator | Admin | Superadmin |
|---|:---:|:---:|:---:|
| Registrar y editar personas | ✅ | ✅ | ✅ |
| Registrar asistencia de hoy y consultar fechas anteriores | ✅ | ✅ | ✅ |
| Cambiar sus propios datos de acceso | ✅ | ✅ | ✅ |
| Acceder al panel administrativo y consultar métricas y gráficos | — | ✅ | ✅ |
| Editar fechas de primera visita y bautismo | — | ✅ | ✅ |
| Crear y gestionar usuarios operator | — | ✅ | ✅ |
| Eliminar personas | — | — | ✅ |
| Crear y gestionar usuarios admin | — | — | ✅ |
| Exportar personas a CSV | — | — | ✅ |
| Cambiar rangos de edad configurados para miembros y líderes | — | — | ✅ |

El panel de usuarios no muestra cuentas superadmin. El botón de exportación solo aparece en pantallas grandes. Consulte las limitaciones de validación de edades en **Registrar o editar una persona**.

## 2. Funciones para todos los perfiles

### Iniciar y cerrar sesión

1. Introduzca su correo y contraseña en la pantalla de acceso.
2. Pulse **Iniciar sesión**.
3. Para salir, pulse el icono de cierre de sesión en el encabezado.

El nombre y perfil de la sesión aparecen en el encabezado. Una cuenta inactiva no puede iniciar sesión; contacte a un administrador.

### Registrar asistencia

1. Abra la vista de asistencia; si está en personas, pulse **Ir a Tomar asistencia**.
2. Seleccione la fecha de hoy.
3. Busque por nombre, apellido o cédula; el filtro se activa con tres caracteres.
4. Marque o desmarque las personas presentes.

Cada cambio se guarda automáticamente y aparece un mensaje de confirmación o error; no hay un botón de guardar. Las personas marcadas aparecen primero. El contador **Asistentes**, cuando se muestra, indica el total de personas marcadas para la fecha, no solo las del filtro.

Al elegir una fecha anterior, la lista es solo de consulta y muestra los asistentes registrados ese día. Los puntos en el calendario señalan fechas con asistencia.

### Registrar o editar una persona

1. Pulse **Ir a Gestión personas**.
2. Complete nombre, apellido y tipo de persona. La cédula y la fecha de nacimiento son opcionales, salvo que para registrar un líder se necesita la fecha de nacimiento.
3. Añada los datos de contacto, necesidades y notas disponibles.
4. Pulse **Guardar Persona**.

Para encontrar una persona en la lista, busque por nombre, apellido o cédula; el filtro se activa con tres caracteres. Para modificar un registro, pulse **Editar** junto a la persona, cambie sus datos y seleccione **Actualizar**.

En celulares el formulario de registro está oculto inicialmente; pulse **Mostrar registro de nueva persona** para abrirlo. Al editar una persona, el formulario se muestra automáticamente y el botón para ocultarlo desaparece hasta actualizar o cancelar la edición.

El formulario rechaza fechas futuras y edades mayores de 120 años. Para **Líder**, exige estar dentro del rango de edad configurado, haber aceptado a Jesús y recibido el Espíritu Santo, y no tener marcadas las opciones de primera visita, venir de otra iglesia, desear visita o estudios bíblicos, ni ser nuevo en la zona. La validación de requisitos de **Miembro**, incluido su rango de edad, está actualmente desactivada.

Al guardar una persona con **Visitante por primera vez** marcado, la fecha de primera visita se establece en la fecha actual del dispositivo, incluso al editar un registro existente. Admin y superadmin pueden corregir esa fecha en el panel administrativo.

**Asistencia automática:** cuando un operator o admin crea una persona, el sistema intenta registrar también su asistencia para la fecha actual del servidor en UTC. Si falla, avisa que la persona fue creada pero la asistencia no se guardó. Para superadmin no se crea esa asistencia automáticamente.

### Cambiar datos de la cuenta

En la pantalla principal, abra **Configuración de Usuario**, cambie su nombre, correo o contraseña y pulse **Guardar**. Después de guardar, la aplicación cierra la sesión para que vuelva a ingresar.

## 3. Funciones de Admin y Superadmin

Acceda mediante el icono de administración del encabezado.

### Métricas y gráficos

- **Métricas:** muestra totales de miembros y visitantes, promedio de asistencia de los domingos con registros y cifras de visitantes. Los indicadores de nuevos visitantes cuentan registros de asistencia de personas que actualmente tienen marcada la opción **Visitante por primera vez**; no necesariamente cuentan personas únicas ni su primera visita real.
- **Gráficos:** muestra tendencia de asistencia, visitantes por mes, composición general y peticiones.

### Gestión de personas

En la pestaña **Personas** puede consultar la lista y el número de asistencias de cada persona y editar las fechas de **primera visita** y **bautismo**. Solo superadmin puede eliminar registros.

Para filtrar la lista, busque por nombre, apellido o cédula; el filtro se activa con tres caracteres. La exportación a CSV incluye todas las personas, independientemente de la búsqueda.

> Al eliminar una persona con asistencias, la confirmación advierte que también se borrará su historial.

### Gestión de usuarios

En la pestaña **Usuarios** puede crear, editar o eliminar cuentas y marcar si están activas:

- **Admin:** gestiona usuarios **operator**.
- **Superadmin:** puede crear usuarios **operator** y **admin**, y gestionar los usuarios mostrados en la lista. Las cuentas superadmin no aparecen en esa lista.

Al editar una cuenta, deje la nueva contraseña en blanco para conservar la actual. Una cuenta marcada como inactiva no podrá volver a iniciar sesión.

## 4. Funciones exclusivas de Superadmin

### Exportar personas

En una pantalla grande, abra **Gestión de Personas** en el panel administrativo y pulse **Exportar a CSV**, junto al título *Personas Registradas*. El botón está deshabilitado si la lista está vacía.

El archivo contiene nombres, apellidos, teléfonos, correo, fecha de nacimiento, tipo de persona, primera visita, bautismo y notas. Su nombre incluye la fecha de descarga, por ejemplo `personas-2026nov17.csv`.

### Ajustar rangos de edad para miembros y líderes

1. En el panel administrativo, abra la pestaña **Ajustes Generales**.
2. Mueva los controles de edad mínima y máxima para miembros o líderes.
3. Pulse **Guardar**; use **Cancelar** para descartar los cambios pendientes.

Los controles admiten valores entre 0 y 100 años y mantienen una separación mínima de 10 años. Actualmente solo se aplica el rango de líder en la validación del formulario.