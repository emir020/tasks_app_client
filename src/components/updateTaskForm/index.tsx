import { Dispatch, SetStateAction, useState } from "react";
import useTaskStore from "../../store/tasks";
import { ITaskState, Task } from "../../types";

/**
 * Props for the UpdateTaskForm component.
 */
interface UpdateTaskFormProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedTask: Task | undefined;
}

/**
 * @description A React component for creating a new task.
 */
const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  isVisible,
  setIsVisible,
  selectedTask,
}) => {
  const { updateTask } = useTaskStore((state: ITaskState) => state);

  // State to manage the form input values
  const [formState, setFormState] = useState<any>({
    name: "",
    dueDate: new Date().toLocaleDateString(),
    description: "",
    completed: false,
  });

  /**
   * Handles changes in the form input values, including the checkbox.
   */
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    // Assert the event target type as HTMLInputElement
    const target = e.target as HTMLInputElement;

    // If the input is a checkbox, use the 'checked' property
    // Otherwise, use the 'value' property
    const newValue = type === "checkbox" ? target.checked : target.value;

    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  /**
   * Handles form submission.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTask) {
      // Remove properties with empty string values from the formState
      const filteredFormState = Object.fromEntries(
        Object.entries(formState).filter(([key, value]) => value !== "")
      );

      await updateTask(selectedTask.id, filteredFormState);

      // Close the form after task creation
      setIsVisible(false);
    }
  };

  return (
    <>
      {isVisible && (
        <section className="bg-white dark:bg-gray-900 absolute h-screen w-screen top-0 left-0 z-[1000]">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update a task
            </h2>
            <form action="#" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Task Title */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type task title..."
                    onChange={handleChange}
                    defaultValue={selectedTask?.name}
                  />
                </div>
                {/* Due Date */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="dueDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleChange}
                    defaultValue={selectedTask?.dueDate}
                  />
                </div>
                {/* Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={8}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                    defaultValue={selectedTask?.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <input
                  name="completed"
                  id="completed"
                  defaultChecked={selectedTask?.completed}
                  onChange={handleChange}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="completed"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Completed
                </label>
              </div>

              {/* Form Submission Buttons */}
              <div className="flex items-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:bg-gray-500"
                >
                  Update Task
                </button>
                <button
                  type="submit"
                  className="inline-flex ml-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => setIsVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateTaskForm;
