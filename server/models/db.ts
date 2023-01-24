import { Low, JSONFile } from 'lowdb';
import fs from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';
import path from 'path';

import type { Post } from '../types/posts';

const __dirname = path.resolve();

export interface Data {
  posts: Post[];
}

export let db: Low<Data>;

export const initDatabase = async () => {
  // Use JSON file for storage
  const dbFolderPath = join(__dirname, './db');
  const filePath = join(__dirname, './db/db.json');
  const dbFolder = await fs.readdir(dbFolderPath).catch(() => void 0);
  const file = await fs.readFile(filePath).catch(() => void 0);

  if (!dbFolder) {
    await fs.mkdir(dbFolderPath);
  }
  if (!file) {
    await fs.writeFile(filePath, JSON.stringify({ posts: [] }));
  }

  return filePath;
};

export const createConnection = async () => {
  const filePath = await initDatabase();

  const adapter = new JSONFile<Data>(filePath);
  db = new Low<Data>(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  db.data ||= { posts: [] };
  // Write db.data content to db.json
  await db.write();
};

export const getConnection = () => db;

export const create = <T>(content: any): T => {
  const timestamp = new Date().toISOString();
  return {
    ...content,
    current: 0,
    id: nanoid(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const update = <T>(content: any): T => {
  const timestamp = new Date().toISOString();
  return {
    ...content,
    updatedAt: timestamp,
  };
};
