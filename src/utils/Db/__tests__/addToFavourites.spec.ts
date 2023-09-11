import setupDb from '../setupDb';
import getEnv from '../../getEnv';
import addToFavourites from '../addToFavourites';
import { IGiphyGifObject } from '../../../types/giphyTypes';
import { generateMockGifObject } from '../../../__mocks__/generateMockGifObject';

// Mock the setupDb module
jest.mock('../setupDb', () => jest.fn());

jest.mock('../../getEnv', () => jest.fn());

describe('addToFavourites', () => {
  it('should invoke index DB transaction to add favourite item to the store.', async () => {
    // Mock gifObject data
    const mockGifObjectId = '12345';
    const mockGifObject: IGiphyGifObject = generateMockGifObject({
      id: mockGifObjectId,
    });
    (getEnv as jest.Mock).mockImplementation(() => 'mockedDbStoreName');

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
