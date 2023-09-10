import { IGiphyGifObject, IGiphyImages, IGiphyUser } from '../types/giphyTypes';

export const generateMockImage = (): IGiphyImages => ({
  fixed_height: { url: 'mockUrl', width: '100', height: '100' },
  fixed_height_still: { url: 'mockUrl', width: '100', height: '100' },
  fixed_height_downsampled: { url: 'mockUrl', width: '100', height: '100' },
  fixed_width: { url: 'mockUrl', width: '100', height: '100' },
  fixed_width_still: { url: 'mockUrl', width: '100', height: '100' },
  fixed_width_downsampled: { url: 'mockUrl', width: '100', height: '100' },
  fixed_height_small: { url: 'mockUrl', width: '100', height: '100' },
  fixed_height_small_still: { url: 'mockUrl', width: '100', height: '100' },
  fixed_width_small: { url: 'mockUrl', width: '100', height: '100' },
  fixed_width_small_still: { url: 'mockUrl', width: '100', height: '100' },
  downsized: { url: 'mockUrl', width: '100', height: '100' },
  downsized_still: { url: 'mockUrl', width: '100', height: '100' },
  downsized_large: { url: 'mockUrl', width: '100', height: '100' },
  downsized_medium: { url: 'mockUrl', width: '100', height: '100' },
  original: { url: 'mockUrl', width: '100', height: '100' },
  original_still: { url: 'mockUrl', width: '100', height: '100' },
  looping: { mp4: 'mockMp4Url' },
  preview: { url: 'mockUrl', width: '100', height: '100' },
  preview_gif: { url: 'mockUrl', width: '100', height: '100' },
  preview_webp: { url: 'mockUrl', width: '100', height: '100' },
  hd: { url: 'mockUrl', width: '100', height: '100' },
  '480w_still': { url: 'mockUrl', width: '480', height: '100' },
});

export const generateMockUser = (): IGiphyUser => ({
  avatar_url: 'mockAvatarUrl',
  banner_url: 'mockBannerUrl',
  profile_url: 'mockProfileUrl',
  username: 'mockUsername',
  display_name: 'mockDisplayName',
  is_verified: true,
});

/**
 * Used in test to generate a mock giphy gif object.
 * @param overrides - Provide your own custom props.
 * @returns
 */
export const generateMockGifObject = (
  overrides?: Partial<IGiphyGifObject>
): IGiphyGifObject => {
  const defaultGifObject: IGiphyGifObject = {
    type: 'gif',
    id: '12345',
    url: 'mockUrl',
    slug: 'mockSlug',
    bitly_gif_url: 'mockBitlyGifUrl',
    bitly_url: 'mockBitlyUrl',
    embed_url: 'mockEmbedUrl',
    username: 'mockUsername',
    source: 'mockSource',
    title: 'mockTitle',
    rating: 'G',
    content_url: 'mockContentUrl',
    source_tld: 'mockSourceTld',
    source_post_url: 'mockSourcePostUrl',
    is_sticker: 0,
    import_datetime: '2023-09-07',
    trending_datetime: '2023-09-07',
    images: generateMockImage(),
    analytics_response_payload: 'mockPayload',
    analytics: {
      onload: { url: 'mockOnloadUrl' },
      onclick: { url: 'mockOnclickUrl' },
      onsent: { url: 'mockOnsentUrl' },
    },
    user: generateMockUser(),
  };

  return {
    ...defaultGifObject,
    ...overrides,
  };
};
