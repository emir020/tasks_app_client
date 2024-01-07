import TaskListPage from "./pages/taskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <TaskListPage />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
}

export default App;
