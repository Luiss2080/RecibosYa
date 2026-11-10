# Plan de desarrollo — RecibosYa

Guía para construir el MVP fase por fase. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por fase** con las tareas de abajo como checklist.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Cierre de fase:** lint, tipos y tests en verde, probar en el teléfono, actualizar [ROADMAP.md](ROADMAP.md) y el [CHANGELOG](../CHANGELOG.md), y fusionar a `main`.

### Definición de «terminado» (vale para toda fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos y mensajes de error en español.
- [ ] Los datos persisten al reiniciar la app.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.

**Tareas**

- [ ] `npm install` y `npx expo start` abren la app en Expo Go.
- [ ] Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque.
- [ ] Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] Confirmar que el CI de GitHub Actions pasa en verde.

**Cierre:** la app abre, navega entre secciones vacías y no da errores.

---

## Fase 2 — Perfil del emisor y clientes

**Estimación:** 4 días.

**Objetivo:** perfil del emisor con nombre, NIT, teléfono, dirección y logo; clientes frecuentes para llenar el recibo en segundos.

**Tareas**

- [ ] Consultas de `perfil` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `clientes` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: perfil del emisor con nombre, NIT, teléfono, dirección y logo.
- [ ] Pantalla(s) y formulario(s) para: clientes frecuentes para llenar el recibo en segundos.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Perfil del emisor con nombre, NIT, teléfono, dirección y logo: funciona sin internet y persiste al reiniciar.
- [ ] Clientes frecuentes para llenar el recibo en segundos: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 3 — Recibos con items

**Estimación:** 4 días.

**Objetivo:** recibos con varios items y numeración correlativa.

**Tareas**

- [ ] Consultas de `recibos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `items_recibo` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: recibos con varios items y numeración correlativa.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Recibos con varios items y numeración correlativa: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 4 — PDF y compartir

**Estimación:** 3 días.

**Objetivo:** PDF listo para enviar por WhatsApp o imprimir.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: PDF listo para enviar por WhatsApp o imprimir.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] PDF listo para enviar por WhatsApp o imprimir: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 5 — Anulación y exportación CSV

**Estimación:** 3 días.

**Objetivo:** anulación de recibos sin perder la numeración; exportación CSV de lo emitido.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: anulación de recibos sin perder la numeración.
- [ ] Pantalla(s) y formulario(s) para: exportación CSV de lo emitido.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Anulación de recibos sin perder la numeración: funciona sin internet y persiste al reiniciar.
- [ ] Exportación CSV de lo emitido: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio.
- [ ] Publicar el release con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.
