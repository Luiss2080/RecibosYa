# Plan de desarrollo — RecibosYa

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Perfil del emisor y clientes | 3 | 5 |
| 3 | Recibos con items | 4 | 9 |
| 4 | PDF y compartir | 3 | 12 |
| 5 | Anulación y exportación CSV | 3 | 15 |

Total: **15 días** (~3 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Perfil del emisor y clientes

**Estimación:** 3 días. **Rama sugerida:** `fase-2-perfil-del-emisor-y-clientes`.

**Objetivo:** Perfil del emisor y clientes.

**Historias que se completan:** HU-01 (Configurar el perfil del emisor), HU-02 (Guardar clientes frecuentes).

**Tareas**

- [ ] **F2-T1** Pantalla de perfil con guardado único (tabla perfil de una fila).
- [ ] **F2-T2** Selector de logo con expo-image-picker y copia local.
- [ ] **F2-T3** CRUD de clientes.
- [ ] **F2-T4** Validación de perfil mínimo para emitir.
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — aún no cargué mi perfil → intento emitir un recibo → la app me lleva a completar al menos nombre y teléfono.
- [ ] HU-01 — cargo un logo → emito un recibo → el PDF muestra el logo.
- [ ] HU-02 — un cliente guardado → creo un recibo y lo elijo → sus datos se completan solos.

**Criterio de salida:**

- [ ] No se puede emitir sin perfil mínimo.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Recibos con items

**Estimación:** 4 días. **Rama sugerida:** `fase-3-recibos-con-items`.

**Objetivo:** Recibos con ítems y numeración.

**Historias que se completan:** HU-03 (Emitir recibos con varios ítems).

**Tareas**

- [ ] **F3-T1** Contador correlativo transaccional (sin saltos ni repeticiones) con pruebas.
- [ ] **F3-T2** Formulario de recibo con ítems dinámicos.
- [ ] **F3-T3** Total con función pura y pruebas.
- [ ] **F3-T4** Bloqueo de edición tras emitir.
- [ ] **F3-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-03 — un recibo con 2 ítems → agrego 2 × 50 y 1 × 120 → el total muestra 220 y al emitir recibe el número siguiente correlativo.

**Criterio de salida:**

- [ ] Emitir 100 recibos seguidos produce numeración sin huecos en las pruebas.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — PDF y compartir

**Estimación:** 3 días. **Rama sugerida:** `fase-4-pdf-y-compartir`.

**Objetivo:** PDF y compartir.

**Historias que se completan:** HU-04 (PDF y compartir).

**Tareas**

- [ ] **F4-T1** Plantilla HTML del recibo (logo, datos, ítems, total, leyenda de comprobante).
- [ ] **F4-T2** Generación con expo-print.
- [ ] **F4-T3** Compartir con expo-sharing.
- [ ] **F4-T4** Reimpresión idéntica de un recibo emitido.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — un recibo emitido → toco «Compartir» → se genera el PDF y se abre el menú de compartir.

**Criterio de salida:**

- [ ] El PDF abre y se comparte desde un teléfono real.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Anulación y exportación CSV

**Estimación:** 3 días. **Rama sugerida:** `fase-5-anulacion-y-exportacion-csv`.

**Objetivo:** Anulación y exportación CSV.

**Historias que se completan:** HU-05 (Anular recibos), HU-06 (Exportar lo emitido).

**Tareas**

- [ ] **F5-T1** Anulación con motivo conservando el número.
- [ ] **F5-T2** Totales que excluyen anulados.
- [ ] **F5-T3** Historial con filtros por mes y estado.
- [ ] **F5-T4** Exportación CSV con expo-file-system.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — un recibo emitido por error → lo anulo con motivo → queda marcado «ANULADO», conserva su número y no suma a los totales.
- [ ] HU-05 — un recibo anulado → intento reutilizar su número → no es posible; el siguiente recibo usa el próximo número.
- [ ] HU-06 — recibos de un mes con uno anulado → toco «Exportar CSV» → el archivo incluye todos con una columna de estado.

**Criterio de salida:**

- [ ] El CSV incluye anulados con su estado.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Perfil del emisor y clientes

- **Día 3** (día 1 de la fase): `F2-T1` Pantalla de perfil con guardado único (tabla perfil de una fila).; `F2-T2` Selector de logo con expo-image-picker y copia local.; `F2-T3` CRUD de clientes..
- **Día 4** (día 2 de la fase): `F2-T4` Validación de perfil mínimo para emitir.; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Recibos con items

- **Día 6** (día 1 de la fase): `F3-T1` Contador correlativo transaccional (sin saltos ni repeticiones) con pruebas.; `F3-T2` Formulario de recibo con ítems dinámicos..
- **Día 7** (día 2 de la fase): `F3-T3` Total con función pura y pruebas.; `F3-T4` Bloqueo de edición tras emitir..
- **Día 8** (día 3 de la fase): `F3-T5` Validaciones, estados vacíos y mensajes en español; `F3-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 9** (día 4 de la fase): `F3-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — PDF y compartir

- **Día 10** (día 1 de la fase): `F4-T1` Plantilla HTML del recibo (logo, datos, ítems, total, leyenda de comprobante).; `F4-T2` Generación con expo-print.; `F4-T3` Compartir con expo-sharing..
- **Día 11** (día 2 de la fase): `F4-T4` Reimpresión idéntica de un recibo emitido.; `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 12** (día 3 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Anulación y exportación CSV

- **Día 13** (día 1 de la fase): `F5-T1` Anulación con motivo conservando el número.; `F5-T2` Totales que excluyen anulados.; `F5-T3` Historial con filtros por mes y estado..
- **Día 14** (día 2 de la fase): `F5-T4` Exportación CSV con expo-file-system.; `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 15** (día 3 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
