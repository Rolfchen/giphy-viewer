/// <reference types="vite/client" />

/**
 * Extending Vite's environment variables to include our own.
 */
interface ImportMetaEnv {
  VITE_GIPHY_URL: string;
  VITE_GIPHY_API_KEY: string;
  VITE_GIPHY_PAGE_SIZE: string;
}
