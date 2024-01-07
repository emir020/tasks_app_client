export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface ITaskState {
  loading: boolean;
  tasks: Task[];
  fetchTasks: () => void;
}
