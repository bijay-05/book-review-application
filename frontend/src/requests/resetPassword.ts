import { api } from "./axiosInstance";

export const resetPassword = async ({
  password,
  email,
  token,
}: {
  password: string;
  email: string | undefined;
  token: string | undefined;
}) => {
  // upload the file to S3 bucket folder
  try {
    const response = await api.post(
      `/auth/reset-password/token/${token}/email/${email}/`,
      {
        password,
      },
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
