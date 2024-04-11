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
import { Profile } from "../profile/Profile";
import { Suggestions } from "../suggestions/Suggestions";
import Bottom_NavBar from "../bottom_navbar/Bottom_NavBar";
import useHome from "../home/UseHome";
import FullQuickThought from "../full_quick_thought/FullQuickThought";

export const ProfilePage = ({ name, avatar }) => {
  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const [qt_active, setQtActive] = useState(false);
  const [full_thought_open, setFullThoughtOpen] = useState(false);

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
    setQtActive(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const file_type = file.type.split("/");
    if (file_type[0] === "image") {
      updateAvatar(new Blob([file], { type: file.type }), file_type[1]);
    }
  };
  return (
    <>
      <span className="block md:hidden">
        {full_thought_open && (
          <FullQuickThought
            makePost={post}
            handleClose={() => {
              setTimeout(() => {
                setFullThoughtOpen(false);
              }, 500);
              // setQtActive(false);
            }}
          />
        )}
      </span>
      <div
        className="
        flex flex-col 
        h-screen
        bg-light-pattern dark:bg-black-pattern 
        dark:bg-quick7
        overflow-y-scroll
      "
      >
        <NavBar />
        {/* w-full lg:w-[1010px] xl:w-[1150px] */}
        <div
          className="
        flex
        grow
        justify-center
        w-full lg:w-fit
        bg-light-gray-0
        dark:bg-quick4
        mx-auto
    "
        >
          {/* w-[590px] max-w-[590px] md:min-w-[590px] */}
          {/* <Speed_Dial clickHandler={() => { setQtActive(true) }} /> */}
          <div className="hidden md:block grow lg:w-[100px] xl:w-[250px]">
            <Profile name={user_name} avatar={user_avatar} />
          </div>
          <div
            className="
          flex
          justify-center md:justify-start lg:justify-center
          w-[580px] max-w-[580px] md:min-w-[580px]
          md:px-2
          text-xl 
          md:border-x dark:md:border-0 border-light-grey-border
          box-content
        "
          >
            <div className="w-full bg-white dark:bg-quick7 overflow-hidden">
              {user.uid === search_params.get("user") && (
                <span className="block md:hidden dark:bg-quick4">
                  <Speed_Dial
                    clickHandler={() => {
                      setFullThoughtOpen(true);
                    }}
                  />
                </span>
              )}

              <div className="bg-white w-full " />

              <input
                className="hidden"
                id="default_size"
                ref={ref}
                onChange={handleChange}
                type="file"
              />

              {/* Avatar */}
              <div className="bg-profile-banner w-full h-44 border-x border-light-gray-border"></div>
              <div className="p-5 border-x border-light-gray-border">
                {user.uid === search_params.get("user") ? (
                  <div
                    className="-mt-20 cursor-pointer overflow-hidden rounded-2xl h-40 w-40 border-white dark:border-quick4 border-8 bg-cover bg-center"
                    style={{ backgroundImage: `url("${user_avatar}")` }}
                    onClick={handleClick}
                    alt="user avatar"
                    title="Upload Image"
                    loading="lazy"
                  >
                    <div className="flex justify-center h-full w-full items-center bg-black backdrop-brightness-75 opacity-0 hover:opacity-70">
                      <span className="text-white text-lg text-center">
                        Upload Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <div
                      className="-mt-20 cursor-pointer overflow-hidden rounded-2xl h-40 w-40 border-white dark:border-quick4 border-8 bg-cover bg-center"
                      style={{ backgroundImage: `url("${user_avatar}")` }}
                      alt="user avatar"
                      title="Upload Image"
                      loading="lazy"
                    ></div>
                    <div className="h-10 flex gap-2">
                      {follows_you && (
                        <button
                          onClick={() => {
                            navigate("/dms?to=" + search_params.get("user"));
                          }}
                          className="flex items-center text-quick-green-0 dark:bg-quick5 hover:bg-light-gray-0 justify-center rounded-md bg-white border border-light-gray-border dark:border-0 h-full aspect-square"
                        >
                          <FaPaperPlane />
                        </button>
                      )}
                      {following !== null &&
                        user.uid !== search_params.get("user") && (
                          <button
                            type="button"
                            onClick={followUser}
                            className={`shadow-2xl p-1 rounded-md h-full ${
                              following
                                ? "bg-yellow-900 hover:bg-yellow-800"
                                : "bg-green-800 hover:bg-green-700"
                            } outline-none focus:outline-none`}
                          >
                            <h1 className="text-white">
                              {following ? "Unfollow" : "Follow"}
                            </h1>
                          </button>
                        )}
                    </div>
                  </div>
                )}

                {/* Username and folowwers */}
                <div className="">
                  <span className="flex items-center">
                    <p className="flex text-md font-semibold text-black dark:text-white p-0 lg:text-2xl md:text-2xl sm:text-2xl mr-5">
                      {user_name}{" "}
                      {user_subscriptions.indexOf("quicker") !== -1 && (
                        <span className="w-4 ml-1">
                          <img src="quicker_badge.png" />
                        </span>
                      )}
                    </p>
                    <div>
                      {follows_you &&
                        user.uid !== search_params.get("user") && (
                          <Chip
                            variant="outlined"
                            value="Follows You"
                            className="static text-black dark:text-white bg-slate-200 dark:bg-slate-700 p-1"
                          ></Chip>
                        )}
                    </div>
                  </span>
                  <span className="text-md text-black dark:text-white block lg:text-lg md:text-lg sm:text-lg mt-1">
                    <span className="flex gap-5">
                      <h1 className="flex items-center space-x-1 text-black dark:text-white">
                        {followers != null && <>{followers} followers</>}
                      </h1>
                    </span>
                  </span>
                </div>
              </div>

              {/* Settings and messagges */}
              <div
                className={`h-full ${
                  posts &&
                  posts.length < 1 &&
                  "border-x border-light-gray-border"
                }`}
              >
                {/* POST Quick Thought */}
                <div className="col-span-3">
                  <div className="">
                    {posts && search_params.get("user") === user.uid && (
                      <span
                        className={`${qt_active ? "block" : "hidden"} md:block`}
                      >
                        <Quick_Thought makePost={post} handleClose={qtClose} />
                      </span>
                    )}
                    <div>
                      <Feed posts={posts} setPosts={setPosts} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden md:flex w-[300px] min-w-[300px] max-w-[300px]">
            <Suggestions />
          </aside>
        </div>
        <Bottom_NavBar />
      </div>
    </>
  );
};
