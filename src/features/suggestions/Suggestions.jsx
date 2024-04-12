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
        w-full dark:bg-quick4 dark:text-white"
      >
        {/* <h1 className="text-black dark:text-white dark:border-quick5 border-b">Suggestions</h1> */}
        <div
          className="
				m-2
				font-semibold
				text-xl
      dark:bg-quick4
			"
        >
          You may know
        </div>
        <div className="flex flex-col items-center text-center group dark:bg-quick4">
          <ul className="w-full text-sm dark:bg-quick4">
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
