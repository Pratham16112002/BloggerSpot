import { RegisterFields } from "@/app/user/register/page";
import { AuthorizationError } from "@/lib/exceptions";

export const fetchUpdated = async (
  p0: string | number | string[],
  p1: string | number | string[],
  p2: string | number | string[],
  p3: string | number | string[],
  p4: string | string[] | number
) => {
  const res = await fetch(
    `/api/feed?limit=${p0}&offset=${(p0 as number) * (p1 as number)}&search=${
      p4 ?? ""
    }&tags=${(p3 as string[]).join(",")}&sort=${p2}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await res.json();
  if (!response.success) {
    throw new Error("No blog found");
  }
  return response.data;
};

interface AddBlogPayload {
  title: string;
  content: string;
  tags: string[];
}

export const addBlog = async (blog: AddBlogPayload) => {
  const res = await fetch("/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });
  const response = await res.json();
  if (!response.success) {
    throw new Error("Blog not posted");
  }
  return response.data;
};

export const getBlog = async (id: number) => {
  const res = await fetch(`/api/blog/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!response.success) {
    throw new Error("Blog not found");
  }
  return response.data;
};

interface UpdateBlogPayload {
  id: number;
  title: string;
  content: string;
}

export const updatedBlog = async (payload: UpdateBlogPayload) => {
  const res = await fetch(`/api/blog/${payload.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      content: payload.content,
    }),
  });
  const response = await res.json();
  if (!response.success) {
    if (response.status == 401) {
      throw new AuthorizationError("Not Authorized");
    }
    if (response.status == 403) {
      throw new AuthorizationError("Only moderator can update post");
    }
    throw new Error(response.error);
  }
  return {};
};

interface CommentPayload {
  id: number;
  content: string;
}

export const addComment = async (payload: CommentPayload) => {
  const res = await fetch(`/api/blog/${payload.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: payload.content,
    }),
  });
  const response = await res.json();
  if (!response.success) {
    throw new Error(response.error);
  }
  return {};
};

export const registerUser = async (payload: RegisterFields) => {
  const res = await fetch(`/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const response = await res.json();
  if (!response.success) {
    throw new Error(response.error);
  }
  return {};
};
