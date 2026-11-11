# Backlog de issues — RecibosYa

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Perfil del emisor y clientes | 2 | 3 | 7 | 17.5 |
| Fase 3 — Recibos con items | 3 | 4 | 7 | 24.5 |
| Fase 4 — PDF y compartir | 4 | 3 | 7 | 17.5 |
| Fase 5 — Anulación y exportación CSV | 5 | 3 | 7 | 17.5 |

Total: **34 tareas**, ~89 horas (15 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Perfil del emisor y clientes

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | Pantalla de perfil con guardado único (tabla perfil de una fila). | HU-01, HU-02 | ui, datos | Alta | 2.5 |
| `F2-T2` | Selector de logo con expo-image-picker y copia local. | HU-01, HU-02 | tarea | Alta | 2.5 |
| `F2-T3` | CRUD de clientes. | HU-01, HU-02 | tarea | Alta | 2.5 |
| `F2-T4` | Validación de perfil mínimo para emitir. | HU-01, HU-02 | lógica | Alta | 2.5 |
| `F2-T5` | Validaciones, estados vacíos y mensajes en español | HU-01, HU-02 | lógica | Alta | 2.5 |
| `F2-T6` | Pruebas automáticas y verificación manual de criterios | HU-01, HU-02 | pruebas | Alta | 2.5 |
| `F2-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01, HU-02 | pruebas | Alta | 2.5 |

### Fase 3 — Recibos con items

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Contador correlativo transaccional (sin saltos ni repeticiones) con pruebas. | HU-03 | pruebas | Alta | 3.5 |
| `F3-T2` | Formulario de recibo con ítems dinámicos. | HU-03 | ui | Alta | 3.5 |
| `F3-T3` | Total con función pura y pruebas. | HU-03 | lógica, pruebas | Alta | 3.5 |
| `F3-T4` | Bloqueo de edición tras emitir. | HU-03 | tarea | Alta | 3.5 |
| `F3-T5` | Validaciones, estados vacíos y mensajes en español | HU-03 | lógica | Alta | 3.5 |
| `F3-T6` | Pruebas automáticas y verificación manual de criterios | HU-03 | pruebas | Alta | 3.5 |
| `F3-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-03 | pruebas | Alta | 3.5 |

### Fase 4 — PDF y compartir

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Plantilla HTML del recibo (logo, datos, ítems, total, leyenda de comprobante). | HU-04 | tarea | Media | 2.5 |
| `F4-T2` | Generación con expo-print. | HU-04 | tarea | Media | 2.5 |
| `F4-T3` | Compartir con expo-sharing. | HU-04 | integración | Media | 2.5 |
| `F4-T4` | Reimpresión idéntica de un recibo emitido. | HU-04 | tarea | Media | 2.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-04 | lógica | Media | 2.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-04 | pruebas | Media | 2.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04 | pruebas | Media | 2.5 |

### Fase 5 — Anulación y exportación CSV

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Anulación con motivo conservando el número. | HU-05, HU-06 | tarea | Media | 2.5 |
| `F5-T2` | Totales que excluyen anulados. | HU-05, HU-06 | tarea | Media | 2.5 |
| `F5-T3` | Historial con filtros por mes y estado. | HU-05, HU-06 | tarea | Media | 2.5 |
| `F5-T4` | Exportación CSV con expo-file-system. | HU-05, HU-06 | integración | Media | 2.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-05, HU-06 | lógica | Media | 2.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-05, HU-06 | pruebas | Media | 2.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05, HU-06 | pruebas | Media | 2.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
