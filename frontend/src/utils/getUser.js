import { mockUser } from "./mockUser";

export const getUser = (userFromState) => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  return userFromState || savedUser || mockUser;
};
