import { IGiphyGifObject } from '../../types/giphyTypes';
import getEnv from '../getEnv';
import setupDb from './setupDb';

/**
 * Add Giphy object to user local index DB's favourites
 * @param gifOBject
 */
const addToFavourites = async (gifObject: IGiphyGifObject) => {
  const dbStore = getEnv('VITE_DB_STORE_NAME');
  const db = await setupDb();
  const transaction = db.transaction(dbStore, 'readwrite');
  transaction.store.add(gifObject);
  await transaction.done;
};

export default addToFavourites;
