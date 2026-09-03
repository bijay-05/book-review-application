import { type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useValidPassword } from "../hooks/useAuthHooks";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../requests/resetPassword";

export default function ResetPassword() {
  const { token, email } = useParams();

  const { password, setPassword, passwordIsValid } = useValidPassword("");

  const navigate = useNavigate();

  const isValid = !passwordIsValid || password.length === 0;

  const buttonClicked = async (e: FormEvent) => {
    try {
      e.preventDefault();
      console.log("Reset Password Clicked in the page");
      await resetPassword({ password, email, token });
      navigate("/login");
    } catch (error) {
      alert("Error while password reset");
    }
  };

  return (
    <>
      <div className="w-fit mx-auto">
        <div className="p-8 m-8 rounded-md shadow-md  bg-violet-300">
          <form onSubmit={buttonClicked}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
