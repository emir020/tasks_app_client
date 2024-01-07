import { create } from "zustand";
import { ITaskState } from "../../types";
import axios, { AxiosResponse } from "axios";

const useTaskStore = create<ITaskState>()((set) => ({
  loading: false,
  tasks: [],

  fetchTasks: async () => {
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:8000/api/v1/tasks"
      );
      if (response.status === 200) {
        set({ tasks: response.data?.tasks });
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useTaskStore;
