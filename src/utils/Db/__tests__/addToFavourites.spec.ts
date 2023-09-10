import setupDb from '../setupDb';
import getEnv from '../../getEnv';
import addToFavourites from '../addToFavourites';
import { IGiphyGifObject } from '../../../types/giphyTypes';
import { generateMockGifObject } from '../../../__mocks__/generateMockGifObject';

// Mock the setupDb module
jest.mock('../setupDb');

jest.mock('../../getEnv', () => ({
  default: jest.fn().mockReturnValue('mockedValue'),
}));

// Mock import.meta.env variables
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// (global as any).import = {
//   meta: {
//     env: {
//       VITE_DB_STORE_NAME: 'mockedDbStoreName',
//     },
//   },
// };

describe('addToFavourites', () => {
  it('should invoke index DB transaction to add favourite item to the store.', async () => {
    // Mock gifObject data
    const mockGifObjectId = '12345';
    const mockGifObject: IGiphyGifObject = generateMockGifObject({
      id: mockGifObjectId,
    });

    // Mock IndexedDB functions
    const mockTransaction = {
      store: {
        add: jest.fn(),
      },
      done: Promise.resolve(),
    };

    const mockDb = {
      transaction: jest.fn(() => mockTransaction),
    };

    // Mock the setupDb response
    (setupDb as jest.Mock).mockResolvedValue(mockDb);

    // Call the function
    await addToFavourites(mockGifObject);

    // Assert that the db.transaction has been called with the right parameters
    expect(mockDb.transaction).toHaveBeenCalledWith(
      'mockedDbStoreName',
      'readwrite'
    );
    expect(mockTransaction.store.add).toHaveBeenCalledWith(mockGifObject);
  });
});
