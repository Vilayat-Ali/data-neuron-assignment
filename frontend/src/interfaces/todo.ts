export interface Todo {
  _id: string;
  title: string;
  description: string | undefined;
  isCompleted: boolean;
  createdAt: string;
}
