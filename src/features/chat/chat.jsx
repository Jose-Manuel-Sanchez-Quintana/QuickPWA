import React, { useState, useEffect, useContext } from "react";
import UseChat from "./useChat";
import "./chat.modules.css";
import {
  FaArrowLeft,
  FaImage,
  FaPaperPlane,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import { NavBar } from "../nav_bar/Navbar";
import { useRef } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { Button, Input, button } from "@material-tailwind/react";
import { IoIosClose } from "react-icons/io";
import { FollowerPicker } from "../follower_picker/FollowerPicker";
import Message from "./Message";
import { Profile } from "../profile/Profile";
import useHome from "../home/UseHome";
import { Suggestions } from "../suggestions/Suggestions";
import Bottom_NavBar from "../bottom_navbar/Bottom_NavBar";

export const Chat = () => {
  const { user_name, user_avatar, posts, setPosts, post } = useHome();

  const [newMessage, setNewMessage] = useState("");
  const navigation = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const [message_media, setMessageMedia] = useState([]);
  const file_input_ref = useRef(null);
  const [message_enabled, setMessageEnabled] = useState(false);
  const [search_user, setSearchUser] = useState(false);
  const {
    messages_end_ref,
    messages,
    sendMessage,
    chat_list,
    new_recipient,
    chatroom,
    chatroom_list,
    chat_name,
    getChatName,
    setChatName,
    getMessages,
    getChatrooms,
    setChatroom,
    // openChatroomListener,
    addParticipants,
  } = UseChat();

  const handleSetNewMessage = (value) => {
    setMessageEnabled(value.length > 0 || message_media.length > 0);
    setNewMessage(value);
  };

  const removeMessageMedia = (file_name) => {
    setMessageMedia(
      message_media.filter(({ file }) => file.name !== file_name)
    );

    if (newMessage.length <= 0 && message_media.length <= 1) {
      setMessageEnabled(false);
    }
  };

  const HandlecloseSearchModal = () => {
    setSearchUser(false);
  };

  const handleSendMessage = () => {
    if (message_enabled) {
      sendMessage(newMessage, message_media);
      setMessageMedia([]);
      setNewMessage("");
      setMessageEnabled(false);
    }
  };

  const handleSetMessageMedia = (file_list) => {
    setMessageMedia([
      ...message_media,
      ...Array.from(file_list).map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      })),
    ]);

    if (newMessage.length <= 0) {
      setMessageEnabled(true);
    }
  };
  const scrollToBottom = () => {
    if (
      messages_end_ref.current.scrollHeight -
        messages_end_ref.current.scrollTop <
      800
    ) {
      messages_end_ref.current.scrollTop =
        messages_end_ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatroom !== null) {
      if (chatroom.name == null) {
        if (chatroom.participants.length > 2) {
          setChatName(chatroom.participants.map(({ name }) => name).join(", "));
        } else {
          setChatName(
            chatroom.participants.filter(({ id }) => id !== user.uid)[0].name
          );
        }
      } else {
        setChatName(chatroom.name);
      }
    }
  }, [chatroom]);

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    getMessages();
    // getChatName();
  }, [search_params]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div
        className="
        flex flex-col 
        h-screen
        bg-light-pattern dark:bg-black-pattern 
        overflow-y-scroll

        dark:bg-quick7
        "
        // overflow-y-scroll
      >
        <NavBar />
        {/* w-full lg:w-[1010px] xl:w-[1150px] */}
        <div
          className="
          flex
          grow
          justify-center
          overflow-hidden
          w-full lg:w-fit
          bg-light-gray-0
          dark:bg-quick4
          mx-auto
        "
        >
          {/* w-[590px] max-w-[590px] md:min-w-[590px] */}

          {/* <Speed_Dial clickHandler={() => { setQtActive(true) }} /> */}
          <div className="hidden md:block grow lg:w-[100px] xl:w-[250px] ">
            <Profile name={user_name} avatar={user_avatar} />
          </div>
          {search_user && (
            <FollowerPicker
              current_chatroom={chatroom}
              handleAddParticipants={addParticipants}
              handleClose={HandlecloseSearchModal}
            />
          )}
          <div
            className="
            flex flex-col
            justify-start lg:justify-center
            w-full md:max-w-[580px] md:min-w-[580px] h-full
            md:px-2
            text-xl 
            box-content
            md:border-x border-light-gray-border
            "
          >
            <input
              type="file"
              ref={file_input_ref}
              accept="image/*,video/mp4"
              multiple
              hidden
              onChange={(e) => {
                handleSetMessageMedia(e.target.files);
              }}
            />
            {/* <NavBar/> */}
            {/* </div> */}
            {/* <div className="max-h-max overflow-hidden dark:bg-quick5"> */}
            {/* <div
              className={`${
                chatroom === null && !new_recipient ? "hidden" : "block"
              } w-full flex flex-col h-full overflow-hidden dark:bg-quick4`}
            >
              <h1>aaa</h1>
            </div> */}
            {/* Rectángulo superior */}
            {/* CHATLIST IN MOBILE */}
            {chatroom === null && !new_recipient ? (
              <span className="md:hidden">
                <div className="overflow-y-scroll h-full">
                  <div className="font-semibold text-xl p-4 border-b border-light-gray-border">
                    <span className="flex items-center gap-5 dark:text-white ">
                      <button
                        onClick={() => {
                          navigation(-1);
                        }}
                        className="block md:hidden "
                      >
                        <FaArrowLeft />
                      </button>
                      <p>Chats</p>
                    </span>
                  </div>
                  {chatroom_list !== null &&
                    chatroom_list.map((chatroom_c) => (
                      <div
                        key={chatroom_c.id}
                        className={`flex items-center gap-2 py-4 cursor-pointer hover:bg-light-gray-2 dark:hover:bg-quick5`}
                        onClick={() => {
                          setChatroom(chatroom_c);
                        }}
                      >
                        <div className="flex ">
                          {chatroom_c.participants.length > 2 ? (
                            chatroom_c.participants
                              .slice(1, 3)
                              .map(({ avatar }) => (
                                <img
                                  src={avatar}
                                  className="rounded-full w-10 h-10 last:-ml-4 border-2 border-gray-100"
                                />
                              ))
                          ) : (
                            <img
                              src={
                                chatroom_c.participants.filter(
                                  ({ id }) => id !== user.uid
                                )[0].avatar
                              }
                              className="rounded-full w-10 h-10 border-2 border-gray-100"
                            />
                          )}
                        </div>
                        <p className="truncate dark:text-white">
                          {chatroom_c.name === null
                            ? chatroom_c.participants.length > 2
                              ? chatroom_c.participants
                                  .map(({ name }) => name)
                                  .join(", ")
                              : chatroom_c.participants.filter(
                                  ({ id }) => id !== user.uid
                                )[0].name
                            : chatroom_c.name}
                        </p>
                        {/* <div key={chatroom.id} className={`flex items-center p-2 cursor-pointer ${chat.uid === search_params.get("to") && "bg-blue-100"}`} onClick={() => { navigation("/dms?to=" + chat.uid); }}> */}
                        {/* <img src={chat.avatar} alt={`Foto de ${chat.name}`} className="w-12 h-12 rounded-full mr-2" /> */}
                        {/* <span>{chat.name}</span> */}
                      </div>
                    ))}
                  {/* <Suggestions /> */}
                </div>
              </span>
            ) : (
              <span className="flex md:hidden flex-col h-full">
                <div className="flex dark:text-white p-4 font-semibold text-xl shrink-0 justify-between items-center dark:border-b dark:border-quick5 border border-light-gray-border">
                  {chatroom === null ? (
                    new_recipient ? (
                      <span className="flex items-center gap-5">
                        <button
                          onClick={() => {
                            navigation(-1);
                          }}
                          className="block md:hidden"
                        >
                          <FaArrowLeft />
                        </button>
                        <p>{`New chat with ${chat_name}`}</p>
                      </span>
                    ) : (
                      <span className="flex items-center gap-5">
                        <button
                          onClick={() => {
                            navigation(-1);
                          }}
                          className="block md:hidden"
                        >
                          <FaArrowLeft />
                        </button>
                        <p>Select a chatroom to start chatting!</p>
                      </span>
                    )
                  ) : (
                    <>
                      <span className="flex items-center gap-5">
                        <button
                          onClick={() => {
                            setChatroom(null);
                          }}
                          className="block md:hidden"
                        >
                          <FaArrowLeft />
                        </button>
                        <p>{chat_name}</p>
                      </span>
                      {(chatroom.participants.find(
                        (participant) => participant.id === user.uid
                      ).chatroom_role === "owner" ||
                        chatroom.participants.length <= 2) && (
                        <>
                          <button
                            onClick={() => {
                              setSearchUser(true);
                            }}
                          >
                            <IoMdPersonAdd />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div
                  ref={messages_end_ref}
                  className="hidden p-4 h-full overflow-y-scroll"
                ></div>
                {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                {chatroom === null ? (
                  <div className="flex justify-center items-center h-full overflow-y-scroll">
                    <img
                      src={"./quicker.png"}
                      className="h-1/2 w-1/2 opacity-70 object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col-reverse h-full overflow-y-scroll">
                    {messages.map((message, index) => (
                      <Message
                        key={message.id}
                        index={index}
                        content={message}
                        by_user={message.from_user === user.uid}
                      />
                    ))}
                  </div>
                )}

                {/* Rectángulo inferior */}
                {/* {user.uid !== search_params.get("to") && */}
                {/* </div> */}
                {/* </div> */}
                {(chatroom !== null || new_recipient) && (
                  <>
                    <div className="bg-light-gray-2 dark:bg-quick5">
                      <div>
                        <div className="flex dark:bg-quick5">
                          {message_media &&
                            message_media.map((media) => (
                              <div className="flex dark:bg-quick5">
                                <img
                                  src={media.preview}
                                  className="bg-black dark:bg-quick5 rounded-md w-24 h-24"
                                  alt=""
                                />
                                <span className="absolute text-white cursor-pointer p-1">
                                  <button
                                    className="rounded relative h-8 max-h-[40px] w-8 max-w-[40px] select-none text-center align-middle font-sans text-xs font-medium uppercase dark:text-white transition-all hover:bg-gray-900/60 active:bg-gray-900/70 bg-gray-900/50 disabled:pointer-events-none disabled:opacity-80 disabled:shadow-none"
                                    type="button"
                                    onClick={() => {
                                      removeMessageMedia(media.file.name);
                                    }}
                                  >
                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                      <IoIosClose size={40} />
                                    </span>
                                  </button>
                                </span>
                              </div>
                            ))}
                        </div>
                        <div className="flex gap-2 p-2 dark:bg-quick5">
                          <button
                            className="text-light-gray-7 dark:text-white cursor-pointer"
                            onClick={() => {
                              file_input_ref.current.click();
                            }}
                          >
                            <FaImage />
                          </button>
                          <input
                            type="text"
                            className="grow text-lg p-2 rounded bg-light-gray-2 focus:outline-none dark:bg-quick4 dark:text-white"
                            placeholder="Escribe tu mensaje..."
                            value={newMessage}
                            onChange={(e) =>
                              handleSetNewMessage(e.target.value)
                            }
                          />
                          <button
                            className="text-quick-green-0 disabled:text-light-gray-5"
                            onClick={handleSendMessage}
                            disabled={!message_enabled}
                          >
                            <FaPaperPlane />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </span>
            )}
            {/* MESSAGES */}
            <span className="hidden md:flex flex-col md:border-x border-light-gray-border h-full">
              <div className="flex dark:text-white p-2 font-semibold text-xl shrink-0 justify-between items-center dark:border-b dark:border-quick5 border-b border-light-gray-border">
                {chatroom === null ? (
                  new_recipient ? (
                    <span className="flex items-center gap-5">
                      <button
                        onClick={() => {
                          navigation(-1);
                        }}
                        className="block md:hidden"
                      >
                        <FaArrowLeft />
                      </button>
                      <p>{`New chat with ${chat_name}`}</p>
                    </span>
                  ) : (
                    <span className="flex items-center gap-5">
                      <button
                        onClick={() => {
                          navigation(-1);
                        }}
                        className="block md:hidden"
                      >
                        <FaArrowLeft />
                      </button>
                      <p>Select a chatroom to start chatting!</p>
                    </span>
                  )
                ) : (
                  <>
                    <span className="flex items-center gap-5">
                      <button
                        onClick={() => {
                          setChatroom(null);
                        }}
                        className="block md:hidden"
                      >
                        <FaArrowLeft />
                      </button>
                      <p>{chat_name}</p>
                    </span>
                    {chatroom.participants.find(
                      (participant) => participant.id === user.uid
                    ).chatroom_role === "owner" && (
                      <>
                        <button
                          onClick={() => {
                            setSearchUser(true);
                          }}
                        >
                          <IoMdPersonAdd />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
              <div
                ref={messages_end_ref}
                className="hidden p-4 h-full overflow-y-scroll"
              ></div>
              {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
              {chatroom === null ? (
                <div className="flex justify-center items-center h-full overflow-y-scroll">
                  <img
                    src={"./quicker.png"}
                    className="h-1/2 w-1/2 opacity-70 object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col-reverse h-full overflow-y-scroll">
                  {messages.map((message, index) => (
                    <Message
                      key={message.id}
                      index={index}
                      content={message}
                      by_user={message.from_user === user.uid}
                    />
                  ))}
                </div>
              )}

              {/* Rectángulo inferior */}
              {/* {user.uid !== search_params.get("to") && */}
              {/* </div> */}
              {/* </div> */}
              {(chatroom !== null || new_recipient) && (
                <>
                  <div className="bg-light-gray-2 dark:bg-quick5 p-1">
                    <div>
                      <div className="flex dark:bg-quick5">
                        {message_media &&
                          message_media.map((media) => (
                            <div className="flex dark:bg-quick5">
                              <img
                                src={media.preview}
                                className="bg-black dark:bg-quick5 rounded-md w-24 h-24"
                                alt=""
                              />
                              <span className="absolute text-white cursor-pointer p-1">
                                <button
                                  className="rounded relative h-8 max-h-[40px] w-8 max-w-[40px] select-none text-center align-middle font-sans text-xs font-medium uppercase dark:text-white transition-all hover:bg-gray-900/60 active:bg-gray-900/70 bg-gray-900/50 disabled:pointer-events-none disabled:opacity-80 disabled:shadow-none"
                                  type="button"
                                  onClick={() => {
                                    removeMessageMedia(media.file.name);
                                  }}
                                >
                                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <IoIosClose size={40} />
                                  </span>
                                </button>
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="flex gap-2 p-2 ">
                        <button
                          className="text-light-gray-5 cursor-pointer dark:text-white"
                          onClick={() => {
                            file_input_ref.current.click();
                          }}
                        >
                          <FaImage />
                        </button>
                        <input
                          type="text"
                          className="grow text-lg p-2 rounded bg-light-gray-2 dark:bg-quick5 dark:text-white focus:outline-none"
                          placeholder="Escribe tu mensaje..."
                          value={newMessage}
                          onChange={(e) => handleSetNewMessage(e.target.value)}
                        />
                        <button
                          className="text-quick-green-0 dark:bg-quick5 disabled:text-light-gray-5"
                          onClick={handleSendMessage}
                          disabled={!message_enabled}
                        >
                          <FaPaperPlane />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </span>
          </div>
          <aside className="hidden md:block w-[300px] min-w-[300px] max-w-[300px]">
            <div className="overflow-y-scroll h-full">
              <div className="font-semibold text-xl p-4 border-b border-light-gray-border dark:text-white">
                <p>Chats</p>
              </div>
              {chatroom_list !== null &&
                chatroom_list.map((chatroom_c) => (
                  <div
                    key={chatroom_c.id}
                    className={`${
                      chatroom &&
                      chatroom.id === chatroom_c.id &&
                      "bg-light-gray-3 dark:bg-quick4"
                    } flex items-center gap-2 p-2 hover:bg-light-gray-2 cursor-pointer dark:hover:bg-quick5`}
                    onClick={() => {
                      setChatroom(chatroom_c);
                    }}
                  >
                    <div className="flex">
                      {chatroom_c.participants.length > 2 ? (
                        chatroom_c.participants
                          .slice(1, 3)
                          .map(({ avatar }) => (
                            <img
                              src={avatar}
                              className="rounded-full w-10 h-10 last:-ml-4 border-2 border-gray-100"
                            />
                          ))
                      ) : (
                        <img
                          src={
                            chatroom_c.participants.filter(
                              ({ id }) => id !== user.uid
                            )[0].avatar
                          }
                          className="rounded-full w-10 h-10 border-2 border-gray-100"
                        />
                      )}
                    </div>
                    <p className="truncate dark:text-white">
                      {chatroom_c.participants.length > 2
                        ? chatroom_c.participants
                            .map(({ name }) => name)
                            .join(", ")
                        : chatroom_c.participants.filter(
                            ({ id }) => id !== user.uid
                          )[0].name}
                    </p>
                    {/* <div key={chatroom.id} className={`flex items-center p-2 cursor-pointer ${chat.uid === search_params.get("to") && "bg-blue-100"}`} onClick={() => { navigation("/dms?to=" + chat.uid); }}> */}
                    {/* <img src={chat.avatar} alt={`Foto de ${chat.name}`} className="w-12 h-12 rounded-full mr-2" /> */}
                    {/* <span>{chat.name}</span> */}
                  </div>
                ))}
              {/* <Suggestions /> */}
            </div>
          </aside>
        </div>
        {!chatroom && !new_recipient && <Bottom_NavBar />}
      </div>
    </>
  );
};
