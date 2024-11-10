import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";

export const useFetchBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,

    onSuccess: (data) => {
      console.log("blog data fetched successfully", data);
    },
    onError: (error) => {
      console.log("blog data fetch failed", error);
    },
    onSettled: () => {
      console.log("query settled");
    },
  });
};
