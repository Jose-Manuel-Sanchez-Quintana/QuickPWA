import React, { useContext, useState } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";
import { Feed } from "../feed/Feed";
import { Profile } from "../profile/Profile";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import { Post } from "../post/post";
import useHome from "./UseHome";
import { Speed_Dial } from "../speed_dial/speed_dial";
import Bottom_NavBar from "../bottom_navbar/Bottom_NavBar";

export const Home = () => {
  const { user_name, user_avatar, posts, setPosts, post } = useHome();
  const [qt_active, setQtActive] = useState(false)

  return (
    <div className="
      flex flex-col 
      w-screen h-screen
      bg-light-gray-0 dark:bg-quick7
      overflow-scroll
    ">
      <NavBar />
      <div className="
        w-full md:w-[750px] lg:w-[900px] xl:w-[1200px]
        mx-auto
        grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4  
      ">
        <Speed_Dial clickHandler={() => { setQtActive(true) }} />
        <Profile name={user_name} avatar={user_avatar} />
        <div className="
          grid
          text-xl rounded-lg col-span-1 sm:col-span-3 lg:col-span-3 xl:col-span-2 gap-2">
          <div className="hidden md:block">
            {

              // <span className={`${qt_active ? 'block' : 'hidden'} md:block`}>
              <Quick_Thought makePost={post} handleClose={() => { setQtActive(false) }} />
              // </span>
            }
          </div>
          <div>
            <Feed posts={posts} setPosts={setPosts} />
          </div>
        </div>
        <span className="hidden xl:flex row-span-3">
          <Suggestions />
        </span>
      </div>

      <Bottom_NavBar />
    </div>
  );
};
