import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";

export const fetchReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await api.get("/review/list");

      return response.data;
    },
  });
};

export const fetchReviewsByUser = (id) => {
  return useQuery({
    queryKey: ["reviewsByUser"],
    queryFn: async () => {
      const response = await api.get(`/review/user/${id}`);

      return response.data;
    },
  });
};
