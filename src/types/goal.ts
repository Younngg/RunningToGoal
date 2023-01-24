export interface GoalType {
  [index: string]: any;
  title: string;
  goal: number;
  unit: string;
  id: string;
  current: number;
}

export interface GoalsResType {
  [index: string]: GoalType;
}

export interface PostReqType {
  title?: string;
  goal?: number;
  unit?: string;
  current?: number;
}

export interface PostResType {
  title: string;
  goal: number;
  unit: string;
  id: string;
  current: number;
  createdAt: string;
  updatedAt: string;
}
