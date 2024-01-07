import { create } from "zustand";
import { ITaskState, Task } from "../../types";
import axios, { AxiosResponse } from "axios";
import { showApiResponse } from "../../common/apiResponses";

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
        showApiResponse("deleted");
      }
    } catch (err) {
      console.log(err);
      showApiResponse("deleted", false);
    }
  },

  createTask: async (data: Partial<Task>) => {
    try {
      const response: AxiosResponse = await axios.post("/tasks", { ...data });

      if (response.status === 201) {
        set({ tasks: response.data.tasks });
        showApiResponse("created");
      }
    } catch (err) {
      console.log(err);
      showApiResponse("created", false);
    }
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    try {
      const response: AxiosResponse = await axios.patch(`/tasks/${id}`, {
        ...data,
      });

      if (response.status === 200) {
        set({ tasks: response.data.tasks });
        showApiResponse("updated");
      }
    } catch (err) {
      console.log(err);
      showApiResponse("updated", false);
    }
  },
}));

export default useTaskStore;
