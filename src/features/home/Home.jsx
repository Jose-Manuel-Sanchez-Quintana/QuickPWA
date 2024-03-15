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
      h-screen
      bg-light-gray-0 dark:bg-quick7
      overflow-y-scroll
      ">
      <NavBar />
      <div className="
          w-full md:w-[750px] lg:w-[900px] xl:w-[1200px]
          grid grid-cols-1 md:grid-cols-4
          mx-auto
        ">
        {/* <Speed_Dial clickHandler={() => { setQtActive(true) }} /> */}
        <div className="hidden lg:block row-span-1">
          <Profile name={user_name} avatar={user_avatar} />
        </div>
        <div className="
            text-xl 
            col-span-1 sm:col-span-3 lg:col-span-3 xl:col-span-2
            m-0
          ">
          {/* <div className="hidden md:block"> */}
          <Quick_Thought makePost={post} handleClose={() => { setQtActive(false) }} />
          {/* </div> */}
          {/* <div> */}
          <Feed posts={posts} setPosts={setPosts} />
          {/* </div> */}
        </div>
        <div className="hidden xl:flex row-span-1">
          <Suggestions />
        </div>
      </div>

      <Bottom_NavBar />
    </div>
  );
};
