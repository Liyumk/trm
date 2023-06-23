export const addHttpToUrl = (url: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  return url;
};
