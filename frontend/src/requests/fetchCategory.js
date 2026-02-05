import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";

export const fetchCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/category");

      return response.data;
    },
  });
};
