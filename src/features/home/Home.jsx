import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";
import { Feed } from "../feed/Feed";
import { Profile } from "../profile/Profile";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import { Post } from "../post/post";
import useHome from "./UseHome";
import { Speed_Dial } from "../speed_dial/speed_dial";
import Bottom_NavBar from "../bottom_navbar/Bottom_NavBar";
import axios from "axios";
import { UserContext } from "../../App";
import useStateRef from "react-usestateref";
import FullQuickThought from "../full_quick_thought/FullQuickThought";

export const Home = () => {
  const { user_name, user_avatar, posts, setPosts, post, posts_ref } =
    useHome();
  const [qt_active, setQtActive] = useState(false);
  const { user } = useContext(UserContext);
  const [followers, setFollowers, followers_ref] = useStateRef([]);
  const [full_thought_open, setFullThoughtOpen] = useState(false);
  const [tabs, setTabs] = useState([
    {
      index: 0,
      label: "Latest",
      callback: (index) => {
        handleSetSettingTab(index);
      },
      selected: true,
    },
    {
      index: 1,
      label: "Following",
      callback: (index) => {
        handleSetSettingTab(index);
      },
      selected: false,
    },
  ]);

  const handleSetSettingTab = (index) => {
    setTabs(
      tabs.map((tab) => {
        return {
          ...tab,
          selected: tab.index === index,
        };
      })
    );

    switch (index) {
      case 0:
        setPosts(null);
        axios
          .get("https://quick-api-9c95.onrender.com/posts", {
            params: {
              before_date: 170227262,
              limit: 222,
              requester_id: user.uid,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setPosts(response.data);
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 1:
        setPosts(null);
        axios
          .get("https://quick-api-9c95.onrender.com/posts", {
            params: {
              before_date: 170227262,
              limit: 222,
              requester_id: user.uid,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setPosts(
                response.data.filter((post) => {
                  if (post.original_post === undefined) {
                    console.log(followers_ref.current);
                    console.log(
                      followers_ref.current.findIndex(
                        (user) => user.id === post.author.id
                      )
                    );
                    return (
                      followers_ref.current.findIndex(
                        (user) => user.id === post.author.id
                      ) !== -1
                    );
                  }
                })
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });

        break;
    }
  };

  useEffect(() => {
    axios
      .get(`https://quick-api-9c95.onrender.com/user/${user.uid}/following`)
      .then((response) => {
        if (response.status === 200) {
          setFollowers(response.data);
        }
      });
  }, []);

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
      bg-light-pattern
      dark:bg-quick7
      overflow-y-scroll
      "
      >
        <NavBar tab_group={tabs} />
        {/* w-full lg:w-[1010px] xl:w-[1150px] */}
        <div
          className="
          flex
          grow
          justify-center
          w-full lg:w-fit
          bg-light-gray-0
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
          md:border-x border-light-grey-border
          box-content
          "
          >
            <span className="w-full">
              {posts !== null && (
                <span className="hidden md:block">
                  <Quick_Thought
                    makePost={post}
                    handleClose={() => {
                      setQtActive(false);
                    }}
                  />
                </span>
              )}
              <Feed posts={posts} setPosts={setPosts} />
            </span>
          </div>
          <aside className="hidden md:flex w-[300px] min-w-[300px] max-w-[300px]">
            <Suggestions />
          </aside>
        </div>
        <span className="block md:hidden">
          <Speed_Dial
            clickHandler={() => {
              setFullThoughtOpen(true);
            }}
          />
        </span>
        <Bottom_NavBar />
      </div>
    </>
  );
};
