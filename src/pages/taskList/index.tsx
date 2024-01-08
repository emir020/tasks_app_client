import { useEffect, useState } from "react";
import { Task as ITask, ITaskState } from "../../types";
import Task from "../../components/task";
import useTaskStore from "../../store/tasks";
import CreateTaskForm from "../../components/createTaskForm";
import FloatingButton from "../../components/floatingButton";
import UpdateTaskForm from "../../components/updateTaskForm";

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
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();

  /**
   * useEffect hook to fetch tasks from the API when the component mounts.
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Callback function to handle editing a task.
   */
  const handleEditTask = (id: string) => {
    setShowUpdateTaskForm(true);

    // Implement your edit task logic here
    console.log(`Edit task with ID: ${id}`);

    const taskCopy = [...tasks];
    const taskIndex = taskCopy.findIndex((task: ITask) => task.id === id);

    if (taskIndex === -1) return;

    setSelectedTask(taskCopy[taskIndex]);
  };

  return (
    <div className="overflow-hidden">
      <div className="h-screen overflow-scroll">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Map through tasks and render each task using the Task component */}
            {tasks.map((task: ITask) => (
              <Task key={task.id} task={task} editTask={handleEditTask} />
            ))}
          </div>
        </div>
        <FloatingButton
          tooltip="Create Task!"
          onClick={() => setShowCreateTaskForm(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </FloatingButton>
      </div>
      <CreateTaskForm
        isVisible={showCreateTaskForm}
        setIsVisible={setShowCreateTaskForm}
      />
      <UpdateTaskForm
        isVisible={showUpdateTaskForm}
        setIsVisible={setShowUpdateTaskForm}
        selectedTask={selectedTask}
      />
    </div>
  );
};

export default TaskListPage;
