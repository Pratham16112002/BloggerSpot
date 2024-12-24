import { addBlog } from "@/util/helper";
import { useMutation } from "@tanstack/react-query";

export const useAddBlogData = () => {
  return useMutation(addBlog);
};
