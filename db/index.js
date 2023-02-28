import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../data/users.json')

const getUsers = async () => {
  const adapter = new JSONFileSync(file)
  const db = new LowSync(adapter)
  await db.read();
  await db.write();
  return db;
}

const updateUser = async (id, req) => {
  const adapter = new JSONFileSync(file)
  const db = new LowSync(adapter)
  await db.read();
  const {users} = db.data;
  const userIndex = users.findIndex(user => user._id === id);
  if(!users[userIndex]) return null;
  const updatedUser = Object.assign(users[userIndex], req);
  await db.write
  return updatedUser;
}

export {getUsers, updateUser};
