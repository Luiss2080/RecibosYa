// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE perfil (id INTEGER PRIMARY KEY CHECK (id = 1), nombre TEXT NOT NULL, nit TEXT, telefono TEXT, direccion TEXT, logo_uri TEXT, prefijo TEXT NOT NULL DEFAULT 'R');
CREATE TABLE clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, documento TEXT, telefono TEXT);
CREATE TABLE recibos (id INTEGER PRIMARY KEY AUTOINCREMENT, numero INTEGER NOT NULL UNIQUE, cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL, fecha TEXT NOT NULL, concepto TEXT, total REAL NOT NULL DEFAULT 0, anulado INTEGER NOT NULL DEFAULT 0);
CREATE TABLE items_recibo (id INTEGER PRIMARY KEY AUTOINCREMENT, recibo_id INTEGER NOT NULL REFERENCES recibos(id) ON DELETE CASCADE, descripcion TEXT NOT NULL, cantidad REAL NOT NULL DEFAULT 1, precio REAL NOT NULL DEFAULT 0);`,
];

export const TABLAS = ['perfil', 'clientes', 'recibos', 'items_recibo'] as const;
