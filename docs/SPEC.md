# Especificación del MVP — RecibosYa

## 1. Resumen

Recibos y notas de venta en PDF con logo propio y numeración correlativa.

**Usuario objetivo:** independientes y emprendedores.

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. RecibosYa las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

## 2. Alcance del MVP

### Incluido

- Perfil del emisor con nombre, NIT, teléfono, dirección y logo.
- Clientes frecuentes para llenar el recibo en segundos.
- Recibos con varios items y numeración correlativa.
- Anulación de recibos sin perder la numeración.
- PDF listo para enviar por WhatsApp o imprimir.
- Exportación CSV de lo emitido.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Perfil del emisor con nombre, NIT, teléfono, dirección y logo

**Como** usuario (independientes y emprendedores), **quiero** perfil del emisor con nombre, NIT, teléfono, dirección y logo, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Clientes frecuentes para llenar el recibo en segundos

**Como** usuario (independientes y emprendedores), **quiero** clientes frecuentes para llenar el recibo en segundos, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Recibos con varios items y numeración correlativa

**Como** usuario (independientes y emprendedores), **quiero** recibos con varios items y numeración correlativa, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Anulación de recibos sin perder la numeración

**Como** usuario (independientes y emprendedores), **quiero** anulación de recibos sin perder la numeración, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — PDF listo para enviar por WhatsApp o imprimir

**Como** usuario (independientes y emprendedores), **quiero** PDF listo para enviar por WhatsApp o imprimir, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-06 — Exportación CSV de lo emitido

**Como** usuario (independientes y emprendedores), **quiero** exportación CSV de lo emitido, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de perfil | Ver, buscar y abrir cada registro |
| Formulario de perfil | Crear y editar con validaciones |
| Lista de clientes | Ver, buscar y abrir cada registro |
| Formulario de clientes | Crear y editar con validaciones |
| Lista de recibos | Ver, buscar y abrir cada registro |
| Formulario de recibos | Crear y editar con validaciones |
| Lista de items recibo | Ver, buscar y abrir cada registro |
| Formulario de items recibo | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **perfil**: id, nombre, nit, telefono, direccion, logo_uri, prefijo
- **clientes**: id, nombre, documento, telefono
- **recibos**: id, numero, cliente_id, fecha, concepto, total, anulado
- **items_recibo**: id, recibo_id, descripcion, cantidad, precio

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
