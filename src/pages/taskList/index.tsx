// TaskListPage.tsx

/**
 * TaskListPage Component
 *
 * Renders a page displaying a grid of tasks fetched from an API endpoint.
 * Each task is rendered using the Task component, and pagination controls
 * allow the user to navigate through the task list.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered TaskListPage component.
 */
import { useEffect, useState } from "react";
import { Task as ITask, ITaskState, IUserState } from "../../types";
import Task from "../../components/task";
import useTaskStore from "../../store/tasks";
import CreateTaskForm from "../../components/createTaskForm";
import FloatingButton from "../../components/floatingButton";
import UpdateTaskForm from "../../components/updateTaskForm";
import Pagination from "../../components/pagination"; // Import the Pagination component
import LoginForm from "../../components/loginForm";
import useUserStore from "../../store/users";
import { toast } from "react-toastify";

const TaskListPage = () => {
  // State and hooks to manage tasks and their fetching
  const { tasks, fetchTasks } = useTaskStore((state: ITaskState) => state);
  const { setAuthenticated, authenticated } = useUserStore(
    (state: IUserState) => state
  );
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false);
  const [loginFormVisible, setLoginFormVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 8; // Set the number of tasks per page

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Callback function to handle editing a task.
   *
   * @param {string} id - The ID of the task to be edited.
   */
  const handleEditTask = (id: string) => {
    setShowUpdateTaskForm(true);
    console.log(`Edit task with ID: ${id}`);

    // Create a copy of tasks array to avoid direct modification
    const taskCopy = [...tasks];
    const taskIndex = taskCopy.findIndex((task: ITask) => task.id === id);

    if (taskIndex === -1) return;

    // Set the selected task for update
    setSelectedTask(taskCopy[taskIndex]);
  };

  /**@description Logout logic. */
  const handleLogout = () => {
    if (!authenticated) return;
    setAuthenticated(false);
    toast.success("Loged out successfully!");
  };

  // Paginate tasks based on the current page and tasks per page
  const startTaskIndex = (currentPage - 1) * tasksPerPage;
  const endTaskIndex = startTaskIndex + tasksPerPage;
  const paginatedTasks = tasks.slice(startTaskIndex, endTaskIndex);

  return (
    <div className="overflow-hidden">
      <div className="h-screen overflow-scroll">
        <div className="container mx-auto p-4">
          {/* Grid layout for tasks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Map through paginated tasks and render each task using the Task component */}
            {paginatedTasks.map((task: ITask) => (
              <Task
                key={task.id}
                task={task}
                editTask={handleEditTask}
                showLoginForm={setLoginFormVisible}
              />
            ))}
          </div>

          {/* Pagination controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(tasks.length / tasksPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Floating button to Logout task creation */}
        {authenticated && (
          <FloatingButton
            tooltip="Logout!"
            onClick={() => handleLogout()}
            containerStyle="bottom-[70px]"
            tooltipStyle="top-[-45px]"
          >
            {/* SVG icon for the create task button */}
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </FloatingButton>
        )}
        {/* Floating button to initiate task creation */}
        <FloatingButton
          tooltip="Create Task!"
          onClick={() => setShowCreateTaskForm(true)}
          tooltipStyle="top-[-70px]"
        >
          {/* SVG icon for the create task button */}
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

      {/* Modal form for creating a new task */}
      <CreateTaskForm
        isVisible={showCreateTaskForm}
        setIsVisible={setShowCreateTaskForm}
      />

      {/* Modal form for updating an existing task */}
      <UpdateTaskForm
        isVisible={showUpdateTaskForm}
        setIsVisible={setShowUpdateTaskForm}
        selectedTask={selectedTask}
      />
      {/* Modal form for login */}
      <LoginForm
        isVisible={loginFormVisible}
        setIsVisible={setLoginFormVisible}
      />
    </div>
  );
};

export default TaskListPage;
