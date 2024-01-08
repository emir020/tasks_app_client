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
  fetchTasks: () => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createTask: (data: Partial<Task>) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
}

export interface IUserState {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  login: (email: string) => Promise<void>;
}
