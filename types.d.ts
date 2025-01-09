export interface BlogType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface Comment {
  id: number;
  user: {
    username: string;
  };
  content: string;
}

export interface Friend {
  id: number;
  email: string;
  follower: false;
  username: string;
  created_at: string;
}
