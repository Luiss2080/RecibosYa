# Roadmap de RecibosYa

> Que cualquier independiente emita un recibo prolijo en 30 segundos y lo envíe por WhatsApp.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Recibos y notas de venta en PDF con logo propio y numeración correlativa.
- **Usuario:** Profesional independiente o emprendedor que cobra a clientes frecuentes y necesita un comprobante simple (no reemplaza una factura fiscal).
- **Duración estimada:** ~15 días de trabajo efectivo (~3 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Perfil del emisor y clientes | Perfil del emisor y clientes. | 3 | 1 |
| 3 | Recibos con items | Recibos con ítems y numeración. | 4 | 2 |
| 4 | PDF y compartir | PDF y compartir. | 3 | 3 |
| 5 | Anulación y exportación CSV | Anulación y exportación CSV. | 3 | 3 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Perfil del emisor y clientes

**Demo:** No se puede emitir sin perfil mínimo.

### Hito 3 — Recibos con items

**Demo:** Emitir 100 recibos seguidos produce numeración sin huecos en las pruebas.

### Hito 4 — PDF y compartir

**Demo:** El PDF abre y se comparte desde un teléfono real.

### Hito 5 — Anulación y exportación CSV

**Demo:** El CSV incluye anulados con su estado.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Perfil del emisor y clientes

- **Objetivo:** Perfil del emisor y clientes.
- **Historias cubiertas:** HU-01 Configurar el perfil del emisor; HU-02 Guardar clientes frecuentes
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - No se puede emitir sin perfil mínimo.

### Fase 3 — Recibos con items

- **Objetivo:** Recibos con ítems y numeración.
- **Historias cubiertas:** HU-03 Emitir recibos con varios ítems
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Emitir 100 recibos seguidos produce numeración sin huecos en las pruebas.

### Fase 4 — PDF y compartir

- **Objetivo:** PDF y compartir.
- **Historias cubiertas:** HU-04 PDF y compartir
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El PDF abre y se comparte desde un teléfono real.

### Fase 5 — Anulación y exportación CSV

- **Objetivo:** Anulación y exportación CSV.
- **Historias cubiertas:** HU-05 Anular recibos; HU-06 Exportar lo emitido
- **Depende de:** fase 4.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El CSV incluye anulados con su estado.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Perfil del emisor y clientes
- [ ] **Fase 3:** Recibos con items
- [ ] **Fase 4:** PDF y compartir
- [ ] **Fase 5:** Anulación y exportación CSV

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Configurar el perfil del emisor | 2 | Perfil del emisor y clientes |
| HU-02 Guardar clientes frecuentes | 2 | Perfil del emisor y clientes |
| HU-03 Emitir recibos con varios ítems | 3 | Recibos con items |
| HU-04 PDF y compartir | 4 | PDF y compartir |
| HU-05 Anular recibos | 5 | Anulación y exportación CSV |
| HU-06 Exportar lo emitido | 5 | Anulación y exportación CSV |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 34 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 8 | 100 % |
| Reglas cubiertas | RN con prueba / 6 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
