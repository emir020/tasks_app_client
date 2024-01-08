import getRandomColor from "../../helpers/getRandomColor";
import useTaskStore from "../../store/tasks";
import { Task as ITask, ITaskState } from "../../types";

interface TaskProps {
  task: ITask;
  editTask: (id: string) => void;
}

/**
 * Task Component
 *
 * Displays information about a task and provides action buttons for editing and deleting the task.
 *
 * @component
 * @description
 * Displays detailed information about a task, including its name, description, due date, and completion status.
 * Provides action buttons for editing and deleting the task.
 *
 * @example
 * // Example usage of Task component in a parent component
 * <Task task={exampleTask} editTask={handleEditTask} deleteTask={handleDeleteTask} />
 *
 * @property {Object} task - The task object containing details like id, name, description, dueDate, and completed status.
 * @property {Function} editTask - Callback function triggered when the edit button is clicked. It receives the task id as an argument.
 * @property {Function} deleteTask - Callback function triggered when the delete button is clicked. It receives the task id as an argument.
 *
 * @returns {JSX.Element} The rendered Task component.
 */
const Task: React.FC<TaskProps> = ({ task, editTask }) => {
  const { deleteTask } = useTaskStore((state: ITaskState) => state);

  return (
    <div
      key={task.id}
      className={`relative p-6 rounded shadow text-white transition ease-in delay-50 hover:shadow-lg hover:scale-105`}
      style={{ backgroundColor: getRandomColor() }}
    >
      <h1 className="font-semibold text-xl mb-4">{task.name}</h1>
      <p className="mb-4">{task.description}</p>
      <p className="mb-4">Due Date: {task.dueDate}</p>
      <p className="mb-8">Completed: {task.completed ? "Yes" : "No"}</p>

      {/* Action Icons */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button
          className="bg-blue-500 rounded-full p-3 flex items-center justify-center"
          onClick={() => editTask(task.id)}
        >
          {/* Edit Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
            <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
          </svg>
        </button>
        <button
          className="bg-red-500 rounded-full p-3 flex items-center justify-center"
          onClick={() => deleteTask(task.id)}
        >
          {/* Delete Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
            <path
              fillRule="evenodd"
              d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;
