import Database from 'better-sqlite3';

// Abre (ou cria) o banco na raiz do backend
export const db = new Database('banco.db');

// Integridade referencial
db.exec('PRAGMA foreign_keys = ON;');

// Cria as tabelas se não existirem
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    email    TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS hosts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    name       TEXT NOT NULL,
    link       TEXT,
    status     TEXT NOT NULL DEFAULT 'active',
    notes      TEXT,
    image      TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );
`);
