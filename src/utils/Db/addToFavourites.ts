import { IGiphyGifObject } from '../../types/giphyTypes';
import setupDb from './setupDb';

/**
 * Add Giphy object to user local index DB's favourites
 * @param gifOBject
 */
const addToFavourites = async (gifObject: IGiphyGifObject) => {
  const dbStore = import.meta.env.VITE_DB_STORE_NAME;
  const db = await setupDb();
  const transaction = db.transaction(dbStore, 'readwrite');
  transaction.store.add(gifObject);
  await transaction.done;
};

export default addToFavourites;
