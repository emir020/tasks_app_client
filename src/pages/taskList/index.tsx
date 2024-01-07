import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleDeleteTask = (id: string) => {
    // Implement your delete task logic here
    console.log(`Delete task with ID: ${id}`);
  };

  const handleEditTask = (id: string) => {
    // Implement your edit task logic here
    console.log(`Edit task with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.map((task: Task) => (
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
                onClick={() => handleEditTask(task.id)}
              >
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
                onClick={() => handleDeleteTask(task.id)}
              >
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
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
