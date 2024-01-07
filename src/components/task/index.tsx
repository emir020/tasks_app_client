import getRandomColor from "../../helpers/getRandomColor";
import { Task as ITask } from "../../types";

interface TaskProps {
  task: ITask;
  editTask: (id: string) => void;
  deleteTask: (id: string) => void;
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
const Task: React.FC<TaskProps> = ({ task, editTask, deleteTask }) => {
  return (
    <div
      key={task.id}
      className={`relative p-6 rounded shadow text-white transition ease-in delay-50 hover:shadow-lg hover:scale-105`}
      style={{ backgroundColor: getRandomColor() }}
    >
      <h1 className="font-semibold text-xl mb-4">{task.name}</h1>
      <p className="mb-4">{task.description}</p>
      <p className="mb-8">Due Date: {task.dueDate}</p>

      {/* Action Icons */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button
          className="bg-blue-500 rounded-full p-3 flex items-center justify-center"
          onClick={() => editTask(task.id)}
        >
          {/* Edit Icon SVG */}
        </button>
        <button
          className="bg-red-500 rounded-full p-3 flex items-center justify-center"
          onClick={() => deleteTask(task.id)}
        >
          {/* Delete Icon SVG */}
        </button>
      </div>
    </div>
  );
};

export default Task;
