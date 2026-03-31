import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbDir = join(__dirname, '../db');
mkdirSync(dbDir, { recursive: true });

const dbPath = process.env.DB_PATH || './db/pizzeria.db';
export const db = new Database(join(__dirname, '..', dbPath.replace('./', '')));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin','manager','employee','kitchen')),
    full_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default users (only if not exist)
import bcrypt from 'bcrypt';

const seedUsers = async () => {
  const existing = db.prepare('SELECT COUNT(*) as cnt FROM users').get();
  if (existing.cnt > 0) return;

  const users = [
    { username: 'admin',    password: 'admin123',    role: 'admin',    full_name: 'Admin' },
    { username: 'manager',  password: 'manager123',  role: 'manager',  full_name: 'Manager' },
    { username: 'employee', password: 'employee123', role: 'employee', full_name: 'Mitarbeiter' },
    { username: 'kitchen',  password: 'kitchen123',  role: 'kitchen',  full_name: 'Küche' },
  ];

  const insert = db.prepare('INSERT INTO users (username, password, role, full_name) VALUES (?, ?, ?, ?)');
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    insert.run(u.username, hash, u.role, u.full_name);
  }
  console.log('✅ Users seeded');
};

await seedUsers();

export default db;
