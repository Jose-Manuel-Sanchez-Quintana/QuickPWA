import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { BsBellFill, BsFillGearFill } from "react-icons/bs";
import { FaWrench } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

export const Profile = ({ name, avatar }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      {/* Profile */}
      <div
        className={`
        ${window.location.pathname !== "/dms" && "sticky top-navbar-height"}
				overflow-hidden
				w-full h-fit
				dark:bg-quick4 
				dark:bg-quick4 
				lg:row-span-3
				dark:bg-quick4 md:dark:outline md:dark:outline-1 
				md:dark:outline-quick5 md:row-span-3
			`}
      >
        <div
          className="
					flex flex-col
					text-xs xl:text-base
					
<<<<<<< HEAD
				">
					<div className="items-stretch col-span-1">
						<button className="flex flex-row p-2 justify-center xl:justify-start text-sm hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white w-full" onClick={() => { navigate("/dms?to=" + user.uid) }}>
							<span className="xl:mr-3">
								<img src={user.avatar} className="rounded bg-black h-12 w-12 object-contain" alt="" />
							</span>
							<span className="hidden xl:block text-left p-1">
								<div className="flex font-semibold">
									{user.name}
									{user.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}
								</div>
								<div className="text-gray-500">{user.post_count} Post{user.post_count > 1 && 's'}</div>
							</span>
						</button>
					</div>
					<button className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white w-full text-gray-600" onClick={() => { navigate('/') }}>
						<BsBellFill className="xl:mr-3" />
						<span className='hidden lg:block'>
							Home
						</span>
					</button>
					<button className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600" onClick={() => { navigate('/dms?to=' + user.uid) }}>
						<BiSolidMessageRoundedDetail className="xl:mr-3" />
						<span className='hidden lg:block'>
							Messages
						</span>
					</button>
					<button className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600" onClick={() => { navigate('/settings') }}>
						<BsFillGearFill className="xl:mr-3" />
						<span className='hidden lg:block'>
							Settings
						</span>
					</button>
					{
						user.role.indexOf('administrator') !== -1 &&
						<button className="flex flex-col xl:flex-row items-center p-3  hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600" onClick={() => { navigate('/admintools') }}>
							<FaWrench className="xl:mr-3" />
							<span className='hidden lg:block'>
								Administrator tools
							</span>
						</button>
					}
				</div>
			</div >
		</>
	)
}

=======
				"
        >
          <div className="items-stretch col-span-1">
            <button
              className="flex flex-row p-2 justify-center xl:justify-start text-sm hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white w-full"
              onClick={() => {
                navigate("/profile?user=" + user.uid);
              }}
            >
              <span className="xl:mr-3">
                <img
                  src={user.avatar}
                  className="rounded bg-black h-12 w-12 object-contain"
                  alt=""
                />
              </span>
              <span className="hidden xl:block text-left p-1">
                <div className="flex font-semibold">
                  {user.name}
                  {user.subscriptions.indexOf("quicker") !== -1 && (
                    <span className="w-4 ml-1">
                      <img src="quicker_badge.png" />
                    </span>
                  )}
                </div>
                <div className="text-gray-500">{user.post_count} Posts</div>
              </span>
            </button>
          </div>
          <button
            className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white w-full text-gray-600"
            onClick={() => {
              navigate("/");
            }}
          >
            <FaHouse className="xl:mr-3" />
            <span className="hidden lg:block">Home</span>
          </button>
          <button
            className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600"
            onClick={() => {
              navigate("/dms?to=" + user.uid);
            }}
          >
            <BiSolidMessageRoundedDetail className="xl:mr-3" />
            <span className="hidden lg:block">Messages</span>
          </button>
          <button
            className="flex flex-col xl:flex-row items-center p-3 hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <BsFillGearFill className="xl:mr-3" />
            <span className="hidden lg:block">Settings</span>
          </button>
          {user.role.indexOf("administrator") !== -1 && (
            <button
              className="flex flex-col xl:flex-row items-center p-3  hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white` w-full text-gray-600"
              onClick={() => {
                navigate("/admintools");
              }}
            >
              <FaWrench className="xl:mr-3" />
              <span className="hidden lg:block">Administrator tools</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
>>>>>>> f74a3d5ff6db149677783ab37ccfaec53e21373b
