export interface Child {
  id: string;
  name: string;
  age: number;
  points: number;
}

export interface Activity {
  id: string;
  name: string;
  points: number;
  description: string;
  childId: string;
  completed: boolean;
  date: string;
}

export interface Reward {
  id: string;
  name: string;
  points: number;
  description: string;
  childId: string;
  claimed: boolean;
}