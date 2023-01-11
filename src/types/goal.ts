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
