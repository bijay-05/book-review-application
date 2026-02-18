import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance.js";

const accessToken = window.localStorage.getItem("accessToken");

export const fetchReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await api.get("/review/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    },
  });
};

export const fetchReviewsByUser = () => {
  return useQuery({
    queryKey: ["reviewsByUser"],
    queryFn: async () => {
      const response = await api.get("/review/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    },
  });
};
