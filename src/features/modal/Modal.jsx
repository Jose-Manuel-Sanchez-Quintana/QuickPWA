import React from "react";
import { useState } from "react";

export const Modal = ({ title, message, callback }) => {
  const [isopen, setIsopen] = useState(true);

  return (
    <>
      {isopen && (
        <div className="fixed w-screen h-screen p-5 md:p-0 z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
          <div className="bg-white p-4 rounded-md max-w-2xl">
            <div className="border-light-grey-border dark:border-light-gray-8 border-b pb-2">
              <p className="font-bold text-center">{title}</p>
            </div>
            <div className="my-5">
              <p>{message}</p>
            </div>
            <div className="flex gap-x-1">
              <button
                onClick={() => {
                  // setIsopen(false);
                  callback(true);
                }}
                className="border border-light-grey-border dark:border-light-gray-8 rounded-sm p-1 min-w-16"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  callback(false);
                  // setIsopen(false);
                }}
                className="border border-light-grey-border dark:border-light-gray-8rounded-sm p-1 min-w-16"
              >
                No
              </button>
            </div>
          </div>
          {/* {props.children} */}
        </div>
      )}
    </>
  );
};
