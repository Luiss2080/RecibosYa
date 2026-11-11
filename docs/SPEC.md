# Especificación del MVP — RecibosYa

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que cualquier independiente emita un recibo prolijo en 30 segundos y lo envíe por WhatsApp.

**Problema:** Los independientes y emprendedores entregan recibos a mano o en mensajes sin formato; no hay numeración, se pierden copias y cuesta demostrar un pago.

**Cómo se resuelve hoy:** Talonarios de papel, capturas de pantalla y mensajes.

**Usuario objetivo:** Profesional independiente o emprendedor que cobra a clientes frecuentes y necesita un comprobante simple (no reemplaza una factura fiscal).

**Métricas de éxito del MVP:**

- Emitir un recibo a un cliente frecuente en menos de 30 segundos.
- Nunca repetir ni saltarse un número de recibo.
- Exportar lo emitido del mes en un toque.

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
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** La numeración es correlativa y única; no se reutiliza ni siquiera si el recibo se anula.
- **RN-02** Un recibo anulado conserva su número y se marca como anulado con motivo.
- **RN-03** Un recibo emitido no se edita; si hay error se anula y se emite uno nuevo.
- **RN-04** Total del recibo = suma de cantidad × precio de sus ítems.
- **RN-05** El recibo debe indicar que es un comprobante de pago y no una factura fiscal.
- **RN-06** El perfil del emisor (nombre y teléfono como mínimo) es obligatorio para emitir.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Configurar el perfil del emisor

**Como** independiente **quiero** cargar mi nombre, NIT, teléfono, dirección y logo **para** que mis recibos salgan con mis datos.

**Fase:** 2 — Perfil del emisor y clientes

**Criterios de aceptación:**

1. **Dado:** aún no cargué mi perfil. **Cuando:** intento emitir un recibo. **Entonces:** la app me lleva a completar al menos nombre y teléfono.
2. **Dado:** cargo un logo. **Cuando:** emito un recibo. **Entonces:** el PDF muestra el logo.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Guardar clientes frecuentes

**Como** independiente **quiero** guardar clientes para reutilizarlos **para** emitir más rápido.

**Fase:** 2 — Perfil del emisor y clientes

**Criterios de aceptación:**

1. **Dado:** un cliente guardado. **Cuando:** creo un recibo y lo elijo. **Entonces:** sus datos se completan solos.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Emitir recibos con varios ítems

**Como** independiente **quiero** agregar varios conceptos con cantidad y precio **para** detallar lo cobrado.

**Fase:** 3 — Recibos con items

**Criterios de aceptación:**

1. **Dado:** un recibo con 2 ítems. **Cuando:** agrego 2 × 50 y 1 × 120. **Entonces:** el total muestra 220 y al emitir recibe el número siguiente correlativo.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — PDF y compartir

**Como** independiente **quiero** generar el PDF y mandarlo por WhatsApp **para** dar el comprobante en el acto.

**Fase:** 4 — PDF y compartir

**Criterios de aceptación:**

1. **Dado:** un recibo emitido. **Cuando:** toco «Compartir». **Entonces:** se genera el PDF y se abre el menú de compartir.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Anular recibos

**Como** independiente **quiero** anular un recibo con motivo **para** corregir errores sin perder la numeración.

**Fase:** 5 — Anulación y exportación CSV

**Criterios de aceptación:**

1. **Dado:** un recibo emitido por error. **Cuando:** lo anulo con motivo. **Entonces:** queda marcado «ANULADO», conserva su número y no suma a los totales.
2. **Dado:** un recibo anulado. **Cuando:** intento reutilizar su número. **Entonces:** no es posible; el siguiente recibo usa el próximo número.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Exportar lo emitido

**Como** independiente **quiero** exportar los recibos del mes en CSV **para** pasarlos a mi contador.

**Fase:** 5 — Anulación y exportación CSV

**Criterios de aceptación:**

1. **Dado:** recibos de un mes con uno anulado. **Cuando:** toco «Exportar CSV». **Entonces:** el archivo incluye todos con una columna de estado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Total emitido del mes y últimos recibos | Nuevo recibo |
| Perfil del emisor | Nombre, NIT, teléfono, dirección, logo | Guardar |
| Clientes | Lista de clientes frecuentes | Crear, editar |
| Nuevo recibo | Cliente, ítems, total, notas | Emitir |
| Detalle de recibo | Vista previa con número y estado | Compartir PDF, anular |
| Historial | Lista con filtros por mes y estado | Exportar CSV |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `perfil`

Datos del emisor que salen en el recibo.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria |
| `nombre` | TEXT | Obligatorio |
| `nit` | TEXT | Opcional |
| `telefono` | TEXT | Opcional |
| `direccion` | TEXT | Opcional |
| `logo_uri` | TEXT | Opcional |
| `prefijo` | TEXT | Obligatorio; Por defecto “R” |

### `clientes`

Clientes frecuentes.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `documento` | TEXT | Opcional |
| `telefono` | TEXT | Opcional |

### `recibos`

Cada recibo con su número y estado.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `numero` | INTEGER | Obligatorio; Único |
| `cliente_id` | INTEGER | Referencia a clientes |
| `fecha` | TEXT | Obligatorio |
| `concepto` | TEXT | Opcional |
| `total` | REAL | Obligatorio; Por defecto 0 |
| `anulado` | INTEGER | Obligatorio; Por defecto 0 |

### `items_recibo`

Líneas del recibo con cantidad y precio.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `recibo_id` | INTEGER | Obligatorio; Referencia a recibos (se borra en cascada) |
| `descripcion` | TEXT | Obligatorio |
| `cantidad` | REAL | Obligatorio; Por defecto 1 |
| `precio` | REAL | Obligatorio; Por defecto 0 |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Cierre abrupto de la app mientras se emite: el número solo se consume al confirmar la transacción.
- Cliente eliminado con recibos: el recibo conserva una copia del nombre.
- Moneda distinta a Bs: configurable por recibo en v1.1.
- Ítem con precio 0 (obsequio): permitido.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |
| `expo-file-system` | Guardar y leer archivos locales (CSV, respaldos) | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Que se confunda con factura fiscal | Leyenda fija «Comprobante de pago — no es factura» en el PDF. |
| Saltos en la numeración | Número asignado dentro de la misma transacción que guarda el recibo. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en RecibosYa |
|---|---|
| `perfil` | Datos del emisor que salen en el recibo. |
| `clientes` | Clientes frecuentes. |
| `recibos` | Cada recibo con su número y estado. |
| `items_recibo` | Líneas del recibo con cantidad y precio. |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Configurar el perfil del emisor | 2 | CP-01-1, CP-01-2 |
| HU-02 Guardar clientes frecuentes | 2 | CP-02-1 |
| HU-03 Emitir recibos con varios ítems | 3 | CP-03-1 |
| HU-04 PDF y compartir | 4 | CP-04-1 |
| HU-05 Anular recibos | 5 | CP-05-1, CP-05-2 |
| HU-06 Exportar lo emitido | 5 | CP-06-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
