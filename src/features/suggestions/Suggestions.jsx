import React from "react";
import useSuggestion from "./useSuggestions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserCard from "./UserCard";

export const Suggestions = () => {
  const { users } = useSuggestion();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="
				sticky
				top-navbar-height
				h-fit
        w-full dark:bg-quick4 dark:text-white lg:dark:bg-quick4"
      >
        {/* <h1 className="text-black dark:text-white dark:border-quick5 border-b">Suggestions</h1> */}
        <div
          className="
				m-2
				font-semibold
				text-xl
			"
        >
          You may know
        </div>
        <div className="dark:bg-quick4 flex flex-col items-center text-center group">
          <ul className="w-full text-sm">
            {users.slice(-7).map((user) => {
              return (
                <>
                  <UserCard profile_user={user} />
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
