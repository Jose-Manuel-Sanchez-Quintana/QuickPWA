import React, { useState, useEffect } from "react";
import UseFollowerPicker from "./UseFollowerPicker";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Search } from "../search/Search";
import ReactSwitch from "react-switch";
import { RxCross1 } from "react-icons/rx";
import BuyButton from "../buy_button/BuyButton";
import { Avatar, Chip, Typography, button } from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa";

export const FollowerPicker = ({
  current_chatroom,
  handleAddParticipants,
  handleClose,
}) => {
  const {
    searchUsers,
    search_results,
    participan_list,
    addParticipant,
    removeParticipant,
  } = UseFollowerPicker();
  const [search_value, setSearchValue] = useState(null);
  const [search_active, setSearchActive] = useState(false);

  useEffect(() => {
    if (search_value !== null) {
      searchUsers(search_value);
    }
  }, [search_value]);

  return (
    <>
      <div className="fixed grow w-full">
        <div className="flex h-full flex-col bg-white dark:bg-quick4 font-semibold text-xl p-4 border-b border-light-gray-border dark:text-white">
          <div className="flex items-center justify-between dark:text-white ">
            <span className="flex items-center gap-5">
              <button className="block md:hidden" onClick={handleClose}>
                <FaArrowLeft />
              </button>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Add participants
              </h3>
              <button
                type="button"
                onClick={handleClose}
                class="hidden md:block w-3 h-3 text-light-gray-8 bg-transparent text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </span>
            <button
              disabled={participan_list.length === 0}
              class="blick md:hidden text-white disabled:bg-light-gray-8 bg-quick-green-5 font-medium w-20 rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                handleAddParticipants(
                  current_chatroom.id,
                  participan_list.map((e) => e.id)
                );
                handleClose();
              }}
              type="button"
            >
              Add
            </button>
          </div>
          <div className="grow overflow-y-scroll ">
            {/* <div className="container w-80 ml-24  absolute mt-11 z-50"> */}
            <ul className="h-full dark:bg-quick4 font-normal border-transparent text-black bg-white">
              {search_results != null &&
                search_results.map((result) =>
                  current_chatroom.participants.findIndex(
                    (e) => e.id === result.id
                  ) === -1 ? (
                    <>
                      <li
                        className="flex items-center hover:bg-light-gray-2 dark:hover:bg-quick5 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
                        key={result.uid}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => {
                          addParticipant(result);
                        }}
                      >
                        <img
                          className="w-10 h-10 rounded mr-2"
                          src={result.avatar}
                          alt="Imagen de result"
                        ></img>
                        <p>{result.name}</p>
                      </li>
                      <li
                        className="flex items-center hover:bg-light-gray-2 dark:hover:bg-quick5 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
                        key={result.uid}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => {
                          addParticipant(result);
                        }}
                      >
                        <img
                          className="w-10 h-10 rounded mr-2"
                          src={result.avatar}
                          alt="Imagen de result"
                        ></img>
                        <p>{result.name}</p>
                      </li>
                      <li
                        className="flex items-center hover:bg-light-gray-2 dark:hover:bg-quick5 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
                        key={result.uid}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => {
                          addParticipant(result);
                        }}
                      >
                        <img
                          className="w-10 h-10 rounded mr-2"
                          src={result.avatar}
                          alt="Imagen de result"
                        ></img>
                        <p>{result.name}</p>
                      </li>
                      <li
                        className="flex items-center hover:bg-light-gray-2 dark:hover:bg-quick5 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
                        key={result.uid}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => {
                          addParticipant(result);
                        }}
                      >
                        <img
                          className="w-10 h-10 rounded mr-2"
                          src={result.avatar}
                          alt="Imagen de result"
                        ></img>
                        <p>{result.name}</p>
                      </li>
                    </>
                  ) : null
                )}
            </ul>
            {/* </div> */}
          </div>
          <div className="w-100 p-2 bg-white">
            {participan_list !== null && participan_list.length > 0 && (
              <div className="flex gap-3 p-3">
                {participan_list.map((participant) => (
                  <Chip
                    variant="outlined"
                    size="lg"
                    value={
                      <Typography
                        variant="small"
                        className="text-light-gray-9 dark:text-white font-bold capitalize leading-none"
                      >
                        {participant.name}
                      </Typography>
                    }
                    className="rounded-full border-light-gray-9 dark:border-light-gray-1 hover:bg-light-error-4 dark:hover:bg-light-error-11 cursor-pointer"
                    onClick={() => {
                      removeParticipant(participant);
                    }}
                  />
                ))}
              </div>
            )}
            <input
              type="text"
              className="text-lg p-4 bg-light-gray-2 dark:bg-quick4 dark:text-white focus:outline-none w-full"
              placeholder="Search in followers..."
              value={search_value}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            aaa
          </div>
        </div>
      </div>

      <div class="hidden md:flex fixed bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen md:max-h-full">
        <div class="relative p-0 md:p-4 w-full max-w-full md:max-w-2xl max-h-full">
          <div class="relative h-screen md:h-auto bg-white shadow  dark:bg-quick4">
            <div className="font-semibold text-xl p-4 border-b border-light-gray-border dark:text-white">
              <div className="flex items-center justify-between dark:text-white ">
                <span className="flex items-center gap-5">
                  <button className="block md:hidden" onClick={handleClose}>
                    <FaArrowLeft />
                  </button>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add participants
                  </h3>
                  <button
                    type="button"
                    onClick={handleClose}
                    class="hidden md:block w-3 h-3 text-light-gray-8 bg-transparent text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </span>
                <button
                  disabled={participan_list.length === 0}
                  class="blick md:hidden text-white disabled:bg-light-gray-8 bg-quick-green-5 font-medium w-20 rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => {
                    handleAddParticipants(
                      current_chatroom.id,
                      participan_list.map((e) => e.id)
                    );
                    handleClose();
                  }}
                  type="button"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="w-100">
              <input
                type="text"
                className="grow text-lg p-4 bg-light-gray-2 dark:bg-quick4 dark:text-white focus:outline-none w-full"
                placeholder="Search in followers..."
                value={search_value}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            <div>
              {/* <div className="container w-80 ml-24  absolute mt-11 z-50"> */}
              <ul className="overflow-y-scroll md:h-96 dark:bg-quick4 font-normal border-transparent text-black bg-white">
                {search_results != null &&
                  search_results.map((result) =>
                    current_chatroom.participants.findIndex(
                      (e) => e.id === result.id
                    ) === -1 ? (
                      <>
                        <li
                          className="flex items-center hover:bg-light-gray-2 dark:hover:bg-quick5 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
                          key={result.uid}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          onClick={() => {
                            addParticipant(result);
                          }}
                        >
                          <img
                            className="w-10 h-10 rounded mr-2"
                            src={result.avatar}
                            alt="Imagen de result"
                          ></img>
                          <p>{result.name}</p>
                        </li>
                        <li
                          className="flex items-center hover:bg-light-gray-2 dark:hover:bg-quick5 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
                          key={result.uid}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          onClick={() => {
                            addParticipant(result);
                          }}
                        >
                          <img
                            className="w-10 h-10 rounded mr-2"
                            src={result.avatar}
                            alt="Imagen de result"
                          ></img>
                          <p>{result.name}</p>
                        </li>
                        <li
                          className="flex items-center hover:bg-light-gray-2 dark:hover:bg-quick5 text-gray-900 dark:text-white flex text-lg p-4 hover:cursor-pointer"
                          key={result.uid}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          onClick={() => {
                            addParticipant(result);
                          }}
                        >
                          <img
                            className="w-10 h-10 rounded mr-2"
                            src={result.avatar}
                            alt="Imagen de result"
                          ></img>
                          <p>{result.name}</p>
                        </li>
                      </>
                    ) : null
                  )}
              </ul>
              {/* </div> */}
            </div>
            {participan_list !== null && participan_list.length > 0 && (
              <div className="flex gap-3 p-3">
                {participan_list.map((participant) => (
                  <Chip
                    variant="outlined"
                    size="lg"
                    value={
                      <Typography
                        variant="small"
                        className="text-light-gray-9 dark:text-white font-bold capitalize leading-none"
                      >
                        {participant.name}
                      </Typography>
                    }
                    className="rounded-full border-light-gray-9 dark:border-light-gray-1 hover:bg-light-error-4 dark:hover:bg-light-error-11 cursor-pointer"
                    onClick={() => {
                      removeParticipant(participant);
                    }}
                  />
                ))}
              </div>
            )}
            <div class="hidden md:block flex items-center p-4 md:p-5 border-t border-light-gray-2 rounded-b dark:border-gray-600">
              <button
                disabled={participan_list.length === 0}
                onClick={() => {
                  handleAddParticipants(
                    current_chatroom.id,
                    participan_list.map((e) => e.id)
                  );
                  handleClose();
                }}
                type="button"
                class="text-white disabled:bg-light-gray-8 bg-quick-green-5 font-medium w-20 rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
