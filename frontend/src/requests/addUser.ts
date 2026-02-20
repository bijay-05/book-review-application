import { api } from "./axiosInstance.js";

export interface IUserSignUp {
  email: string;
  name: string;
  password: string;
}

export const userSignUp = async ({
  email,
  name,
  password,
}: IUserSignUp): Promise<boolean> => {
  try {
    console.log("Inside requests file, userSignUp: ");
    const response = await api.post("/user", {
      email,
      name,
      password,
    });
    console.log("This the response from signup: ", response.data);
    if (response.data.statusCode == 201) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Auth API hit error: ", err);
    throw err;
  }
};
