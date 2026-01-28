import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";

export const fetchBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await api.get("/book/list");

      return response.data;
    },
  });
};

export const fetchUserBooks = () => {
  return useQuery({
    queryKey: ["userAddedBooks"],
    queryFn: async () => {
      const response = await api.get("/book/list/user");

      return response.data;
    },
  });
};
