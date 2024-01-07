import { useEffect } from "react";
import { Task as ITask, ITaskState } from "../../types";
import Task from "../../components/task";
import useTaskStore from "../../store/tasks";

/**
 * TaskListPage Component
 *
 * Renders a page displaying a grid of tasks. Fetches tasks from an API endpoint and renders each task using the Task component.
 *
 * @component
 * @example
 * // Example usage of TaskListPage component in a parent component
 * <TaskListPage />
 *
 * @returns {JSX.Element} The rendered TaskListPage component.
 */
const TaskListPage = () => {
  // State to store the list of tasks
  const { tasks, fetchTasks } = useTaskStore((state: ITaskState) => state);

  /**
   * useEffect hook to fetch tasks from the API when the component mounts.
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Callback function to handle editing a task.
   * @param {string} id - The ID of the task to be edited.
   * @returns {void}
   */
  const handleEditTask = (id: string) => {
    // Implement your edit task logic here
    console.log(`Edit task with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map through tasks and render each task using the Task component */}
        {tasks.map((task: ITask) => (
          <Task key={task.id} task={task} editTask={handleEditTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
