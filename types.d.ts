export interface BlogType {
  [x: string]: any;
  id: number;
  title: string;
  content: string;
  tags: string[];
  user_id: number;
  created_at: string;
  comment_count: number;
}

export interface ApiResponse {
  success: boolean;
  data: any;
}

export interface Comment {
  id: number;
  user: {
    username: string;
  };
  content: string;
}
