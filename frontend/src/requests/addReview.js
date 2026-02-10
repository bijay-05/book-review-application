import { api } from "./axiosInstance";

const accessToken = window.localStorage.getItem("accessToken");

export const addNewReview = async ({ value, bookId }) => {
  const response = await api.post(
    "/review",
    {
      value: value,
      bookId: Number(bookId),
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  console.log("Response of Review creation: ", response.data);
};
