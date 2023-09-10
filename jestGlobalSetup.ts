// update global declaration of Vite Environment config for meta
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).import = {
  meta: {
    env: {
      VITE_DB_STORE_NAME: 'mockedDbStoreName',
      // Add any other global mocks as needed
    },
  },
};
