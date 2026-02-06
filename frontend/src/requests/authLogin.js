import { api } from "./axiosInstance";

export const userLogin = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  console.log("This is the token: ", response.data.data);

  window.localStorage.setItem(
    "accessToken",
    `${response.data.data.accessToken}`,
  );
};
