# Pantallas y flujos — RecibosYa

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Perfil del emisor | `app/perfil-del-emisor.tsx` | Lista / vista |
| Clientes | `app/clientes.tsx` | Lista / vista |
| Nuevo recibo | `app/nuevo-recibo.tsx` | Formulario |
| Detalle de recibo | `app/detalle-de-recibo.tsx` | Detalle |
| Historial | `app/historial.tsx` | Detalle |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Total emitido del mes y últimos recibos
- **Acciones:** Nuevo recibo

**Bosquejo**

```
┌──────────────────────────────┐
│ RecibosYa                    │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Perfil del emisor        │
│  ▸ Clientes                 │
│  ▸ Detalle de recibo        │
│  ▸ Historial                │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Total emitido del mes y últimos recibos |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Perfil del emisor

- **Archivo:** `app/perfil-del-emisor.tsx`
- **Qué muestra:** Nombre, NIT, teléfono, dirección, logo
- **Acciones:** Guardar
- **Historias relacionadas:** HU-01, HU-02 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Perfil del emisor           │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay perfil. Tocá «Guardar» para empezar. |
| Con datos | Nombre, NIT, teléfono, dirección, logo |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Clientes

- **Archivo:** `app/clientes.tsx`
- **Qué muestra:** Lista de clientes frecuentes
- **Acciones:** Crear, editar
- **Historias relacionadas:** HU-02 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Clientes                    │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay clientes. Tocá «Crear» para empezar. |
| Con datos | Lista de clientes frecuentes |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Nuevo recibo

- **Archivo:** `app/nuevo-recibo.tsx`
- **Qué muestra:** Cliente, ítems, total, notas
- **Acciones:** Emitir
- **Historias relacionadas:** HU-02, HU-03, HU-05, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| numero | Numérico entero | Sí | Entero mayor o igual a 0 |
| cliente id | Selector de clientes | No | Debe existir en `clientes` |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| concepto | Texto | No | Texto de 1 a 80 caracteres sin espacios sobrantes |
| total | Numérico decimal | Sí | Mayor o igual a 0; Hasta 2 decimales |
| anulado | Interruptor | Sí | 0 o 1 |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Nuevo recibo                │
├──────────────────────────────┤
│ numero                       │
│ [____________________]       │
│ cliente id                   │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ concepto                     │
│ [____________________]       │
│ total                        │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay recibos. Tocá «Emitir» para empezar. |
| Con datos | Cliente, ítems, total, notas |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Detalle de recibo

- **Archivo:** `app/detalle-de-recibo.tsx`
- **Qué muestra:** Vista previa con número y estado
- **Acciones:** Compartir PDF, anular
- **Historias relacionadas:** HU-03, HU-04, HU-05, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de recibo           │
├──────────────────────────────┤
│ fecha                        │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay recibos. Tocá «Compartir PDF» para empezar. |
| Con datos | Vista previa con número y estado |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Historial

- **Archivo:** `app/historial.tsx`
- **Qué muestra:** Lista con filtros por mes y estado
- **Acciones:** Exportar CSV
- **Historias relacionadas:** HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Historial                   │
├──────────────────────────────┤
│ nombre                       │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Lista con filtros por mes y estado |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Configurar el perfil del emisor**

```
intento emitir un recibo  →  la app me lleva a completar al menos nombre y teléfono
```

**HU-02 — Guardar clientes frecuentes**

```
creo un recibo y lo elijo  →  sus datos se completan solos
```

**HU-03 — Emitir recibos con varios ítems**

```
agrego 2 × 50 y 1 × 120  →  el total muestra 220 y al emitir recibe el número siguiente correlativo
```

**HU-04 — PDF y compartir**

```
toco «Compartir»  →  se genera el PDF y se abre el menú de compartir
```

**HU-05 — Anular recibos**

```
lo anulo con motivo  →  queda marcado «ANULADO», conserva su número y no suma a los totales
```

**HU-06 — Exportar lo emitido**

```
toco «Exportar CSV»  →  el archivo incluye todos con una columna de estado
```
