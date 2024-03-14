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
    <div className="flex flex-col w-screen h-screen">
      <NavBar />
      <div className="
        grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4  
        grow overflow-scroll 
        bg-light-gray-0 dark:bg-quick7    
        p-4 sm:p-5 md:p-5 lg:p-5
      ">
        <Speed_Dial clickHandler={() => { setQtActive(true) }} />
        <Profile name={user_name} avatar={user_avatar} />
        <div className="text-xl rounded-lg col-span-1 sm:col-span-3 lg:col-span-2 grid gap-3">
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
        <span className="hidden lg:flex row-span-3">
          <Suggestions />
        </span>
      </div>

      <Bottom_NavBar />
    </div>
  );
};
