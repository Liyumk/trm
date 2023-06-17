export const getLocalUser = () => {
  return localStorage.getItem("luid") ?? "";
};
