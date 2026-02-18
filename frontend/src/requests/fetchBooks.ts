import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";

const accessToken = window.localStorage.getItem("accessToken");

export const fetchBookDetail = (bookId: number) => {
  return useQuery({
    queryKey: ["bookDetail"],
    queryFn: async () => {
      const response = await api.get(`/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.data;
    },
  });
};

export const fetchBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await api.get("/book", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    },
  });
};

export const fetchUserBooks = () => {
  return useQuery({
    queryKey: ["userAddedBooks"],
    queryFn: async () => {
      const response = await api.get("/book/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    },
  });
};
