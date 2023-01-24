export interface Post {
  title: string;
  goal: number;
  unit: string;
  id: string;
  current: number;
  createdAt: string;
  updatedAt: string;
}

export type PostInput = Pick<Post, 'title' | 'goal' | 'unit' | 'current'>;
