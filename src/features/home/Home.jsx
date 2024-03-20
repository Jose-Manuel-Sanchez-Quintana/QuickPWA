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
  const [tabs, setTabs] = useState([
    {
      index: 0,
      label: 'Appearance',
      callback: (index) => { handleSetSettingTab(index) },
      selected: true
    },
    {
      index: 1,
      label: 'Account',
      callback: (index) => { handleSetSettingTab(index) },
      selected: false
    }
  ])

  const handleSetSettingTab = (index) => {
    setTabs(tabs.map((tab) => {
      return {
        ...tab,
        selected: tab.index === index
      }
    }))
  }

  return (
    <div className="
        flex flex-col 
        h-screen
        bg-light-pattern
        dark:bg-quick7
        overflow-y-scroll
      ">
      <NavBar tab_group={tabs} />
      {/* w-full lg:w-[1010px] xl:w-[1150px] */}
      <div className="
          flex
          grow
          justify-center
          w-full lg:w-fit
          bg-light-gray-0
          mx-auto
        ">

        {/* w-[590px] max-w-[590px] md:min-w-[590px] */}

        {/* <Speed_Dial clickHandler={() => { setQtActive(true) }} /> */}
        <div className="hidden md:block grow lg:w-[100px] xl:w-[250px]">
          <Profile name={user_name} avatar={user_avatar} />
        </div>
        <div className="
            flex
            justify-center md:justify-start lg:justify-center
            w-[580px] max-w-[580px] md:min-w-[580px]
            md:px-2
            text-xl 
            md:border-x border-light-grey-border
            box-content
          ">
          <span className="w-full">
            {
              posts !== null && <Quick_Thought makePost={post} handleClose={() => { setQtActive(false) }} />
            }
            <Feed posts={posts} setPosts={setPosts} />
          </span>
        </div>
        <aside className="hidden md:flex w-[300px] min-w-[300px] max-w-[300px]">
          <Suggestions />
        </aside>
      </div>
      <Bottom_NavBar />
    </div>
  );
};
