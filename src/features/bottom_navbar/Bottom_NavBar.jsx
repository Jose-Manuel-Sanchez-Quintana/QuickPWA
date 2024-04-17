import { useContext } from "react";
import { FaHome, FaPaperPlane, FaPortrait } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Bottom_NavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="sticky md:hidden bottom-0 left-0 z-10 w-full h-navbar-height shrink-0 bg-white border-t border-light-grey-border dark:border-light-gray-8 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          <button
            onClick={() => {
              navigate("/");
            }}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaHome
              className={`${
                window.location.pathname === "/"
                  ? "text-quick-green-0"
                  : "text-light-gray-8 dark:text-white"
              } `}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
          </button>
          <button
            onClick={() => {
              navigate("/dms");
            }}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaPaperPlane
              className={`${
                window.location.pathname === "/dms"
                  ? "text-quick-green-0"
                  : "text-light-gray-8 dark:text-white"
              }`}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
          </button>
          <button
            onClick={() => {
              navigate("/profile?user=" + user.uid);
            }}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaPortrait
              className={`${
                window.location.pathname === "/profile" &&
                window.location.search === "?user=" + user.uid
                  ? "text-quick-green-0"
                  : "text-light-gray-8 dark:text-white"
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Bottom_NavBar;
