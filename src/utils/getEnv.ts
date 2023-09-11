/**
 * Intermediary function to help handle `import.meta` when doing tests. Probably makes the code
 * a little nicer to read as well than having `import.meta` around.
 *
 * TODO - review and identify solutions
 * @param envName
 */
const getEnv = (envName: string): string => {
  const value = import.meta.env[envName];

  if (!value) {
    throw Error(`No environment variable found for ${envName}`);
  }
  return value;
};

export default getEnv;
