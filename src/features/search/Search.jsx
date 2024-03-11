import { React, useEffect, useState } from "react";
import { Post } from "../post/post";
import useSearch from "./useSearch";
import { Navigate, useNavigate } from "react-router-dom";

export const Search = ({ children, results }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container w-full md:w-80 absolute mt-11 z-50">
        <ul className="list-disc flex-col dark:bg-zinc-800 rounded-lg font-normal text-black bg-white">
          {results != null && results.map((result) => {
            return (
              <li
                className="text-gray-900 dark:text-white flex text-lg p-4 dark:hover:bg-quick5 hover:cursor-pointer transition-all duration-100"
                key={result.uid}
                onMouseDown={(e) => { e.preventDefault() }}
                onClick={() => {
                  navigate("/profile?user=" + result.uid, {
                    replace: true,
                  });
                  window.location.reload();
                }}
              >
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={result.avatar}
                  alt="Imagen de result"
                ></img>
                <p>{result.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
