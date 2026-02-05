import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";

export const fetchBookDetail = (bookId) => {
  return useQuery({
    queryKey: ["bookDetail"],
    queryFn: async () => {
      const response = await api.get(`/book/${bookId}`);

      return response.data.data;
    },
  });
};

export const fetchBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await api.get("/book");

      return response.data;
    },
  });
};

export const fetchUserBooks = () => {
  return useQuery({
    queryKey: ["userAddedBooks"],
    queryFn: async () => {
      const response = await api.get("/book/user");

      return response.data;
    },
  });
};
