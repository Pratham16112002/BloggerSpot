import { getBlog } from "../util/helper";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogData = (id: number) => {
  return useQuery({
    queryKey: ["blog", { id }],
    queryFn: () => {
      return getBlog(id);
    },
  });
};
