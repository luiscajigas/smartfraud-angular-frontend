# Historias de Usuario - Sistema SmartFraud

Este documento detalla las historias de usuario que describen las funcionalidades del sistema de detección de fraude **SmartFraud**, organizadas por roles.

---

## Autenticación y Seguridad

### HU-01: Registro de Usuarios

**Como** nuevo usuario,  
**quiero** registrarme en el sistema proporcionando mis datos personales,  
**para** poder tener una cuenta y acceder a las funcionalidades del sistema.

### HU-02: Inicio de Sesión (JWT)

**Como** usuario registrado,  
**quiero** iniciar sesión con mi nombre de usuario y contraseña,  
**para** obtener un token de acceso seguro que me permita navegar por la aplicación según mi rol.

### HU-03: Renovación de Sesión (Refresh Token)

**Como** usuario activo,  
**quiero** que mi sesión se renueve automáticamente cuando el token expire,  
**para** no tener que volver a ingresar mis credenciales mientras estoy usando la aplicación.

---

## Gestión de Transacciones (Rol: CLIENTE)

### HU-04: Realizar Transacción

**Como** cliente,  
**quiero** registrar una nueva transacción (monto, comercio, ubicación),  
**para** que el sistema pueda procesarla y evaluarla en busca de fraudes.

### HU-05: Ver Historial de Transacciones

**Como** cliente,  
**quiero** ver una lista de mis transacciones realizadas,  
**para** llevar un control de mis movimientos financieros.

### HU-06: Ver Alertas de Fraude Propias

**Como** cliente,  
**quiero** visualizar las alertas generadas por mis transacciones sospechosas,  
**para** estar informado sobre posibles riesgos en mi cuenta.

---

## Monitoreo y Gestión de Fraude (Rol: ANALISTA / ADMIN)

### HU-07: Evaluación Automática de Fraude

**Como** sistema,  
**quiero** evaluar cada transacción contra múltiples reglas (monto alto, ubicación sospechosa, etc.),  
**para** generar alertas automáticas basadas en un puntaje de riesgo.

### HU-08: Gestión de Alertas

**Como** analista,  
**quiero** revisar la lista de alertas pendientes y ver su detalle,  
**para** decidir si una transacción es realmente un fraude o es legítima.

### HU-09: Actualización de Estado de Alerta

**Como** analista,  
**quiero** cambiar el estado de una alerta (Aprobada, Fraude Confirmado) y dejar un comentario,  
**para** mantener un registro del proceso de revisión.

### HU-10: Dashboard de Estadísticas

**Como** analista/administrador,  
**quiero** visualizar gráficas con el resumen de alertas y niveles de riesgo,  
**para** identificar patrones de fraude de manera rápida.

---

## Administración del Sistema (Rol: ADMIN)

### HU-11: Gestión de Usuarios y Roles

**Como** administrador,  
**quiero** crear, editar o eliminar usuarios y asignarles roles (ADMIN, ANALISTA, CLIENTE),  
**para** controlar quién tiene acceso a qué partes del sistema.

### HU-12: Menú Dinámico y Recursivo

**Como** administrador,  
**quiero** configurar las opciones del menú y su jerarquía (padres e hijos),  
**para** que la interfaz de usuario se adapte dinámicamente según el rol del usuario que inicia sesión.
