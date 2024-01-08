// Import necessary dependencies and types
import { create } from "zustand";
import { IUserState } from "../../types";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

/**
 * Task store using Zustand for managing user authentication state.
 * @returns {Object} An object containing state and actions for managing user authentication.
 */
const useUserStore = create<IUserState>((set, get) => ({
  // Initial state: User is not authenticated by default
  authenticated: false,

  setAuthenticated: (value: boolean) => {
    set({ authenticated: value });
  },

  /**
   * Async function to perform user login.
   */
  login: async (email: string) => {
    try {
      const response: AxiosResponse = await axios.post(`/users/login`, {
        email,
      });

      if (response.status === 200) {
        set({ authenticated: true });
        toast.success("Login successful!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  },
}));

export default useUserStore;
