import { updatedBlog } from "@/util/helper";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBlog = () => {
  return useMutation(updatedBlog);
};
