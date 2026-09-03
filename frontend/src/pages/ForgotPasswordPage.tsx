import { useValidEmail } from "../hooks/useAuthHooks";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../requests/forgotPassword";

export default function ForgotPassword() {
  const { email, setEmail, emailIsValid } = useValidEmail("");
  const navigate = useNavigate();

  const isValid = !emailIsValid || email.length === 0;

  const forgotPasswordButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await forgotPassword({ email });
      alert(message);
      navigate("/");
    } catch (err) {
      console.log("Error getting forgot password email");
    }
  };

  return (
    <>
      <div className="w-fit mx-auto">
        <div className="p-8 m-8 rounded-md shadow-md  bg-green-200">
          <form onSubmit={forgotPasswordButton}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-center gap-4 w-[20]">
              <button
                onClick={() => navigate("/")}
                className="border-2 px-4 py-2 rounded-md bg-red-600 text-white text-xl"
              >
                Cancel
              </button>
              <button
                disabled={isValid}
                className="border-2 px-4 py-2 rounded-md bg-blue-600 text-white text-xl hover:bg-green-600"
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
