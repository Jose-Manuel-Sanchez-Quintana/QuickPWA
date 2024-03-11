import { React, useContext, useRef, useState } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Feed } from "../feed/Feed";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import UseProfile from "./UseProfile";
import { Post } from "../post/post";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Repost } from "../repost/reposts";
import { Speed_Dial } from "../speed_dial/speed_dial";
import { Button, Chip, SpeedDial } from "@material-tailwind/react";
import { FaPaperPlane } from "react-icons/fa";

export const ProfilePage = ({ name, avatar }) => {
  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const [qt_active, setQtActive] = useState(false)
  const {
    user_name,
    user_avatar,
    updateAvatar,
    posts,
    following,
    unrepost,
    setPosts,
    followUser,
    followers,
    follows_you,
    user_subscriptions,
    user_roles,
    post,
  } = UseProfile();

  const qtClose = () => {
    setQtActive(false)
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    const file_type = file.type.split("/");
    if (file_type[0] === "image") {
      updateAvatar(new Blob([file], { type: file.type }), file_type[1]);
    }
  };
  return (
    <div className="min-h-screen bg-gray-400 dark:bg-quick7 overflow-hidden">
      {user.uid === search_params.get("user") ? <Speed_Dial clickHandler={() => { setQtActive(true) }} /> : null}
      <NavBar />

      <div className="bg-white h-20 w-full " />

      <input
        className="hidden"
        id="default_size"
        ref={ref}
        onChange={handleChange}
        type="file"
      />

      {/* Avatar */}
      <div className="flex flex-col items-center flex-row sm:justify-center">
        {user.uid === search_params.get("user") ? (
          <div
            className="top-24 lg:z-40 lg:left-24
            cursor-pointer rounded-full h-40 w-40 mt-2 border-gray-400 dark:border-quick7 border-8 bg-cover bg-center"
            style={{ backgroundImage: `url("${user_avatar}")` }}
            onClick={handleClick}
            alt="user avatar"
            title="Upload Image"
            loading="lazy"
          >
            <div className="flex rounded-full justify-center h-full w-full items-center bg-gray-600/30 dark:bg-quick7/30 backdrop-brightness-75 opacity-0 hover:opacity-70">
              <span className="text-white text-lg text-center">
                Upload Image
              </span>
            </div>
          </div>
        ) : (
          <div
            className="top-24 lg:z-40 lg:left-24
            cursor-pointer rounded-full h-40 w-40 mt-2 border-gray-400 dark:border-quick7 border-8 bg-cover bg-center"
            style={{ backgroundImage: `url("${user_avatar}")` }}
            alt="user avatar"
            title="Upload Image"
            loading="lazy"
          ></div>
        )}

        {/* Username and folowwers */}
        <div className="lg:absolute lg:mt-16 lg:ml-16 left-40 px-8">
          <span className="flex items-center">
            <p className="flex text-md font-semibold text-black dark:text-white p-0 lg:text-2xl md:text-2xl sm:text-2xl mr-5">
              {user_name} {user_subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}
            </p>
            <div>
              {follows_you && user.uid !== search_params.get("user") && <Chip variant="outlined" value="Follows You" className="static text-black dark:text-white bg-slate-200 dark:bg-slate-700 p-1"></Chip>}
            </div>
          </span>
          <span className="text-md text-black dark:text-white block lg:text-lg md:text-lg sm:text-lg mt-1">
            <span className="flex gap-5">
              <h1 className="flex items-center space-x-1 text-black dark:text-white">
                {followers != null && <>{followers} followers</>}
              </h1>
              <div className="mt-1">
                {
                  following !== null && user.uid !== search_params.get("user") &&
                  <button
                    type="button"
                    onClick={followUser}
                    className={`shadow-2xl p-1 rounded-lg ${following ? 'bg-yellow-900 hover:bg-yellow-800' : 'bg-green-800 hover:bg-green-700'} outline-none focus:outline-none`}
                  >
                    <h1 className="text-white">
                      {following ? "Unfollow" : "Follow"}
                    </h1>
                  </button>
                }
                {
                  follows_you &&
                  <Button color="green" onClick={() => { navigate('/dms?to=' + search_params.get('user')) }} className="inline-block md:hidden ml-5">
                    <FaPaperPlane />
                  </Button>
                }
              </div>
            </span>
          </span>
        </div>
      </div>

      {/* Settings and messagges */}
      <div className="lg-p-10 p-5 grid grid-cols-1 lg:grid-cols-4 lg:gap-3">
        <div className="bg-white text-white text-3xl rounded-lg row-span-3 max-h-24 hidden lg:block">
          <div className="flex flex-col hover:cursor-pointer">
            <button
              disabled={follows_you === null || !follows_you}
              className="dark:disabled:text-slate-500 disabled:text-gray-400 disabled:bg-gray-200 dark:disabled:bg-quick4 hover:bg-gray-300 dark:hover:bg-quick5 dark:outline dark:outline-1 dark:outline-quick5 bg-white p-3 w-full text-xl text-left text-black dark:bg-quick4 dark:text-white font-semibold rounded-lg rounded-b-none"
              onClick={() => { navigate('/dms?to=' + search_params.get("user")) }}
            >
              {user.uid === search_params.get("user") ? 'Messages' : 'Send message'}
            </button>
            <button
              className={`hover:bg-gray-300 dark:hover:bg-quick5 dark:outline dark:outline-1 dark:outline-quick5 bg-white border-t dark:border-quick3 p-3 w-full text-xl text-left text-black dark:bg-quick4 dark:text-white font-semibold border-black ${(user.role.indexOf('administrator') === -1 || user.uid !== search_params.get("user")) && 'rounded rounded-t-none'}`}
              onClick={() => { navigate('/settings') }}
            >
              Settings
            </button>
            {
              user.uid === search_params.get("user") && user.role.indexOf('administrator') !== -1 &&
              <button className="hover:bg-gray-300 dark:hover:bg-quick5 dark:outline dark:outline-1 dark:outline-quick5 bg-white border-t dark:border-quick3 p-3 w-full text-xl text-left text-black dark:bg-quick4 dark:text-white font-semibold rounded-lg rounded-t-none border-black"
                onClick={() => { navigate('/admintools') }}
              >Administrator tools
              </button>
            }
          </div>
        </div>
        {/* POST Quick Thought */}
        <div className="col-span-3">
          <div className="text-xl rounded-lg col-span-2 grid gap-3">
            {
              search_params.get("user") === user.uid &&
              <span className={`${qt_active ? 'block' : 'hidden'} md:block`}>
                <Quick_Thought makePost={post} handleClose={qtClose} />
              </span>
            }
            <div>
              <Feed posts={posts} setPosts={setPosts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
