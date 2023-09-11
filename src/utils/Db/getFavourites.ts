import { IGiphyGifObject } from '../../types/giphyTypes';
import getEnv from '../getEnv';
import setupDb from './setupDb';

/**
 * Get user's favourite giphys from local index db
 * @returns
 */
const getFavourites = async (): Promise<IGiphyGifObject[]> => {
  const db = await setupDb();
  const dbStore = getEnv('VITE_DB_STORE_NAME');
  return db.getAll(dbStore);
};

export default getFavourites;
