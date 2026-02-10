import { api } from "./axiosInstance";

export const userLogin = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("This is the token: ", response.data.data);

    window.localStorage.setItem(
      "accessToken",
      `${response.data.data.accessToken}`,
    );
  } catch (err) {
    console.error("Auth API hit error: ", err);
    throw err;
  }
};

export const sessionVerify = async (accessToken) => {
  try {
    const response = await api.get("/auth/session", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.statusCode == 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
