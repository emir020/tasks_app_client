import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Task as ITask } from "../../types";
import Task from "../../components/task";

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
  const [tasks, setTasks] = useState<ITask[]>([]);

  /**
   * useEffect hook to fetch tasks from the API when the component mounts.
   */
  useEffect(() => {
    axios("http://localhost:8000/api/v1/tasks")
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setTasks(res.data.tasks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
   * Callback function to handle deleting a task.
   * @param {string} id - The ID of the task to be deleted.
   * @returns {void}
   */
  const handleDeleteTask = (id: string) => {
    // Implement your delete task logic here
    console.log(`Delete task with ID: ${id}`);
  };

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
          <Task
            key={task.id}
            task={task}
            editTask={handleEditTask}
            deleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
