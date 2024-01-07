import { create } from "zustand";
import { ITaskState, Task } from "../../types";
import axios, { AxiosResponse } from "axios";

/**
 * Task store using Zustand for managing tasks.
 * @returns {Object} An object containing state and actions for managing tasks.
 */
const useTaskStore = create<ITaskState>((set, get) => ({
  loading: false,
  tasks: [],

  /**
   * Fetches tasks from the server and updates the state.
   * @returns {Promise<void>} A promise that resolves after fetching and updating tasks.
   */
  fetchTasks: async (): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.get("/tasks");

      if (response.status === 200) {
        set({ tasks: response.data?.tasks });
      }
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Deletes a task with the specified ID from the server and updates the state.
   * @param {string} id - The ID of the task to delete.
   * @returns {Promise<void>} A promise that resolves after deleting and updating tasks.
   */
  deleteTask: async (id: string): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.delete(`/tasks/${id}`);

      if (response.status === 204) {
        const tasks = get().tasks;
        const updatedTasks: Task[] = tasks.filter(
          (task: Task) => task.id !== id
        );

        set({ tasks: updatedTasks });
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useTaskStore;
