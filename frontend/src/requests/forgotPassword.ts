import { api } from "./axiosInstance";

export const forgotPassword = async ({
  email,
}: {
  email: string | undefined;
}): Promise<string> => {
  try {
    const response = await api.post("/auth/forgot-password", {
      email,
    });
    return response.data.message;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
