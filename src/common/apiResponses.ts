import { toast } from "react-toastify";

// Interface defining the structure of success and failure messages
interface ApiResponse {
  successMessage: string;
  failureMessage: string;
}

// Object defining different API responses for actions (created, updated, deleted) and their success or failure states
export const API_RESPONSES = {
  created: {
    successfully: {
      successMessage: "Successfully created!",
      failureMessage: "Failed to create.",
    } as ApiResponse,
    failed: {
      successMessage: "Creation failed!",
      failureMessage: "Failed to create.",
    } as ApiResponse,
  },
  updated: {
    successfully: {
      successMessage: "Successfully updated!",
      failureMessage: "Failed to update.",
    } as ApiResponse,
    failed: {
      successMessage: "Update failed!",
      failureMessage: "Failed to update.",
    } as ApiResponse,
  },
  deleted: {
    successfully: {
      successMessage: "Successfully deleted!",
      failureMessage: "Failed to delete.",
    } as ApiResponse,
    failed: {
      successMessage: "Deletion failed!",
      failureMessage: "Failed to delete.",
    } as ApiResponse,
  },
};

/**
 * Display a toast message based on the action and success status.
 * @param action - The key representing the action (created, updated, deleted).
 * @param isSuccess - Indicates whether the action was successful. Default is true.
 */
export const showApiResponse = (
  action: keyof typeof API_RESPONSES,
  isSuccess: boolean = true
): void => {
  // Get the response based on the action and success status
  const response = API_RESPONSES[action][isSuccess ? "successfully" : "failed"];

  // Use react-toastify to display a success or error toast
  toast[isSuccess ? "success" : "error"](
    isSuccess ? response.successMessage : response.failureMessage
  );
};
