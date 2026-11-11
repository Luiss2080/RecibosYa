# Modelo de datos — RecibosYa

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `recibos.cliente_id` | `clientes` | Sin borrado en cascada |
| `items_recibo.recibo_id` | `recibos` | Al borrar el padre se borran los hijos |

```
perfil
clientes  ──<  recibos
recibos  ──<  items_recibo
items_recibo
```

## 3. Detalle por tabla

### 3.1 `perfil`

Datos del emisor que salen en el recibo.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `nit` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nit» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |
| `direccion` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí direccion» |
| `logo_uri` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí logo uri» |
| `prefijo` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes; Valor inicial `R` | «Escribí prefijo» |

**Consultas base** (en `src/db/perfil.ts`):

```ts
listar(): Promise<Perfil[]>            // SELECT * FROM perfil ORDER BY id DESC
obtener(id: number): Promise<Perfil | null>   // SELECT * FROM perfil WHERE id = ?
crear(datos: NuevoPerfil): Promise<number>   // INSERT INTO perfil (nombre, nit, telefono, direccion, logo_uri, prefijo) VALUES (?, ?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoPerfil): Promise<void>   // UPDATE perfil SET nombre = ?, nit = ?, telefono = ?, direccion = ?, logo_uri = ?, prefijo = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM perfil WHERE id = ?
```

### 3.2 `clientes`

Clientes frecuentes.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `documento` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí documento» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |

**Consultas base** (en `src/db/clientes.ts`):

```ts
listar(): Promise<Cliente[]>            // SELECT * FROM clientes ORDER BY id DESC
obtener(id: number): Promise<Cliente | null>   // SELECT * FROM clientes WHERE id = ?
crear(datos: NuevoCliente): Promise<number>   // INSERT INTO clientes (nombre, documento, telefono) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoCliente): Promise<void>   // UPDATE clientes SET nombre = ?, documento = ?, telefono = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM clientes WHERE id = ?
```

### 3.3 `recibos`

Cada recibo con su número y estado.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `numero` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `cliente_id` | INTEGER → `number \| null` | Selector de clientes | Opcional; Debe existir en `clientes` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `concepto` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí concepto» |
| `total` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |
| `anulado` | INTEGER → `number` | Interruptor | Obligatorio; 0 o 1; Valor inicial `0` | — |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_recibos_cliente_id ON recibos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_recibos_fecha ON recibos(fecha);
```

**Consultas base** (en `src/db/recibos.ts`):

```ts
listar(): Promise<Recibo[]>            // SELECT * FROM recibos ORDER BY id DESC
obtener(id: number): Promise<Recibo | null>   // SELECT * FROM recibos WHERE id = ?
crear(datos: NuevoRecibo): Promise<number>   // INSERT INTO recibos (numero, cliente_id, fecha, concepto, total, anulado) VALUES (?, ?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoRecibo): Promise<void>   // UPDATE recibos SET numero = ?, cliente_id = ?, fecha = ?, concepto = ?, total = ?, anulado = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM recibos WHERE id = ?
listarPorCliente(cliente_id: number): Promise<Recibo[]>   // WHERE cliente_id = ?
```

### 3.4 `items_recibo`

Líneas del recibo con cantidad y precio.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `recibo_id` | INTEGER → `number` | Selector de recibos | Obligatorio; Debe existir en `recibos` | «Elegí un registro» |
| `descripcion` | TEXT → `string` | Texto largo | Obligatorio; Hasta 280 caracteres | «Máximo 280 caracteres» |
| `cantidad` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `1` | «Ingresá un número válido» |
| `precio` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un monto mayor a 0» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_items_recibo_recibo_id ON items_recibo(recibo_id);
```

**Consultas base** (en `src/db/items_recibo.ts`):

```ts
listar(): Promise<Items_recibo[]>            // SELECT * FROM items_recibo ORDER BY id DESC
obtener(id: number): Promise<Items_recibo | null>   // SELECT * FROM items_recibo WHERE id = ?
crear(datos: NuevoItems_recibo): Promise<number>   // INSERT INTO items_recibo (recibo_id, descripcion, cantidad, precio) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoItems_recibo): Promise<void>   // UPDATE items_recibo SET recibo_id = ?, descripcion = ?, cantidad = ?, precio = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM items_recibo WHERE id = ?
listarPorRecibo(recibo_id: number): Promise<Items_recibo[]>   // WHERE recibo_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Perfil {
  id: number;
  nombre: string;
  nit: string | null;
  telefono: string | null;
  direccion: string | null;
  logo_uri: string | null;
  prefijo: string;
}
export type NuevoPerfil = Omit<Perfil, 'id'>;

export interface Cliente {
  id: number;
  nombre: string;
  documento: string | null;
  telefono: string | null;
}
export type NuevoCliente = Omit<Cliente, 'id'>;

export interface Recibo {
  id: number;
  numero: number;
  cliente_id: number | null;
  fecha: string;
  concepto: string | null;
  total: number;
  anulado: number;
}
export type NuevoRecibo = Omit<Recibo, 'id'>;

export interface Items_recibo {
  id: number;
  recibo_id: number;
  descripcion: string;
  cantidad: number;
  precio: number;
}
export type NuevoItems_recibo = Omit<Items_recibo, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

Esta app no usa columnas con valores cerrados.

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 5 | Guardar el motivo al anular un recibo. |

**Migración 2** (fase 5)

```sql
ALTER TABLE recibos ADD COLUMN motivo_anulacion TEXT;
```

## 7. Esquema inicial completo

```sql
CREATE TABLE perfil (id INTEGER PRIMARY KEY CHECK (id = 1), nombre TEXT NOT NULL, nit TEXT, telefono TEXT, direccion TEXT, logo_uri TEXT, prefijo TEXT NOT NULL DEFAULT 'R');
CREATE TABLE clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, documento TEXT, telefono TEXT);
CREATE TABLE recibos (id INTEGER PRIMARY KEY AUTOINCREMENT, numero INTEGER NOT NULL UNIQUE, cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL, fecha TEXT NOT NULL, concepto TEXT, total REAL NOT NULL DEFAULT 0, anulado INTEGER NOT NULL DEFAULT 0);
CREATE TABLE items_recibo (id INTEGER PRIMARY KEY AUTOINCREMENT, recibo_id INTEGER NOT NULL REFERENCES recibos(id) ON DELETE CASCADE, descripcion TEXT NOT NULL, cantidad REAL NOT NULL DEFAULT 1, precio REAL NOT NULL DEFAULT 0);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** La numeración es correlativa y única; no se reutiliza ni siquiera si el recibo se anula.
- **RN-02** Un recibo anulado conserva su número y se marca como anulado con motivo.
- **RN-03** Un recibo emitido no se edita; si hay error se anula y se emite uno nuevo.
- **RN-04** Total del recibo = suma de cantidad × precio de sus ítems.
- **RN-05** El recibo debe indicar que es un comprobante de pago y no una factura fiscal.
- **RN-06** El perfil del emisor (nombre y teléfono como mínimo) es obligatorio para emitir.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
