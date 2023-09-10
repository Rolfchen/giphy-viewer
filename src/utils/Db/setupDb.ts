import { openDB } from 'idb';
import getEnv from '../getEnv';

const setupDb = async () => {
  const dbName = getEnv('VITE_DB_NAME');
  const dbStore = getEnv('VITE_DB_STORE_NAME');
  const dbVersion = 1;
  if (!dbName || !dbStore) {
    console.error('Which one is wrong?', {
      dbName,
      dbStore,
      dbVersion,
      raw: 1,
    });
    throw new Error(
      'Missing important environment variables for DB name and DB store'
    );
  }
  const db = await openDB(dbName, dbVersion, {
    upgrade(db) {
      db.createObjectStore(dbStore, { keyPath: 'id' });
    },
  });

  return db;
};

export default setupDb;
