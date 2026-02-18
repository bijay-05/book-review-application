import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

interface ILogoutPopupProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogOutPopup = ({ showPopup, setShowPopup }: ILogoutPopupProps) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      authContext?.signOut();
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return showPopup ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Confirm Log Out ??</h2>
        <form onSubmit={handleLogOut}>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-sm"
          >
            Log Out
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LogOutPopup;
