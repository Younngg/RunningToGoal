export interface GoalType {
  [index: string]: any;
  title: string;
  goal: number;
  unit: string;
  id: string;
  current: 0;
}

export interface GoalsResType {
  [index: string]: GoalType;
}
