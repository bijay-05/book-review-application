import { api } from "./axiosInstance";

const accessToken = window.localStorage.getItem("accessToken");

export const addNewReview = async ({
  value,
  bookId,
  rating,
}: {
  value: string;
  bookId: number | null;
  rating?: number;
}) => {
  const response = await api.post(
    "/review",
    {
      value: value,
      bookId: Number(bookId),
      rating: rating,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  console.log("Response of Review creation: ", response.data);
};
