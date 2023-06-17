export const getEnv = () => {
  const env = process.env.NODE_ENV;
  let isDev = false;
  let isProd = false;
  let isTest = false;

  if (env === "development") {
    isDev = true;
  }
  if (env === "production") {
    isProd = true;
  }
  if (env === "test") {
    isTest = true;
  }

  return {
    isDev,
    isProd,
    isTest,
    env,
  };
};
