import { Dispatch, SetStateAction, useState } from "react";

/**
 * Props for the LoginForm component.
 */
interface LoginFormProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

/**
 * @description A React component for login.
 */
const LoginForm: React.FC<LoginFormProps> = ({ isVisible, setIsVisible }) => {
  // State to manage the form input values
  const [formState, setFormState] = useState<any>({
    email: "",
  });

  /**
   * Handles changes in the form input values.
   */
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {isVisible && (
        <section className="bg-white dark:bg-gray-900 absolute h-screen w-screen top-0 left-0 z-[1000]">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Login
            </h2>
            <form action="#" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className={`block mb-2 text-sm font-medium text-white`}
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white outline-none`}
                    placeholder="Enter email..."
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Form Submission Buttons */}
              <div className="flex items-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:bg-gray-500"
                  disabled={formState.email === ""}
                >
                  Login
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

export default LoginForm;
