import setupDb from './setupDb';

/**
 * Remove an item from the favourites list through the Giphy object's ID
 */
const removeFromFavorites = async (id: string) => {
  const db = await setupDb();
  const dbStore = import.meta.env.VITE_DB_STORE_NAME;
  const tx = db.transaction(dbStore, 'readwrite');
  tx.store.delete(id);
  await tx.done;
};

export default removeFromFavorites;
