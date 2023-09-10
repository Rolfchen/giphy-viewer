import { openDB } from 'idb';

const setupDb = async () => {
  const dbName = import.meta.env.VITE_DB_NAME;
  const dbStore = import.meta.env.VITE_DB_STORE_NAME;
  const dbVersion = parseInt(import.meta.env.VITE_DB_VERSION);
  if (!dbName || !dbStore || isNaN(dbVersion)) {
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
