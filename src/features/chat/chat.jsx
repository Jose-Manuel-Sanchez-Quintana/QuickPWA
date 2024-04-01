import React, { useState, useEffect, useContext } from 'react';
import UseChat from './useChat';
import './chat.modules.css';
import { FaArrowLeft, FaImage, FaPaperPlane, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { NavBar } from '../nav_bar/Navbar';
import { useRef } from 'react';
import { IoMdPersonAdd } from 'react-icons/io';
import { Button, Input, button } from '@material-tailwind/react';
import { IoIosClose } from 'react-icons/io';
import { FollowerPicker } from '../follower_picker/FollowerPicker';
import Message from './Message';
import { Profile } from '../profile/Profile';
import useHome from "../home/UseHome";
import { Suggestions } from '../suggestions/Suggestions';
import Bottom_NavBar from '../bottom_navbar/Bottom_NavBar';


export const Chat = () => {
  const { user_name, user_avatar, posts, setPosts, post } = useHome();

  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const [message_media, setMessageMedia] = useState([]);
  const file_input_ref = useRef(null);
  const [message_enabled, setMessageEnabled] = useState(false);
  const [search_user, setSearchUser] = useState(false)
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
    addParticipants
  } = UseChat();

  const handleSetNewMessage = (value) => {
    setMessageEnabled(value.length > 0 || message_media.length > 0);
    setNewMessage(value);
  }

  const removeMessageMedia = (file_name) => {
    setMessageMedia(message_media.filter(({ file }) => (file.name !== file_name)));

    if (newMessage.length <= 0 && message_media.length <= 1) {
      setMessageEnabled(false);
    }
  }

  const HandlecloseSearchModal = () => {
    setSearchUser(false)
  }

  const handleSendMessage = () => {
    if (message_enabled) {
      sendMessage(newMessage, message_media);
      setMessageMedia([]);
      setNewMessage('');
      setMessageEnabled(false);
    }
  };

  const handleSetMessageMedia = (file_list) => {
    setMessageMedia([...message_media, ...Array.from(file_list).map((file) => ({
      preview: URL.createObjectURL(file),
      file
    }))]);

    if (newMessage.length <= 0) {
      setMessageEnabled(true);
    }
  }
  const scrollToBottom = () => {
    if (messages_end_ref.current.scrollHeight - messages_end_ref.current.scrollTop < 800) {
      messages_end_ref.current.scrollTop = messages_end_ref.current.scrollHeight
    }
  }

  useEffect(() => {
    if (chatroom !== null) {
      if (chatroom.name == null) {
        if (chatroom.participants.length > 2) {
          setChatName(chatroom.participants.map(({ name }) => (name)).join(", "));
        } else {
          setChatName(chatroom.participants.filter(({ id }) => (id !== user.uid))[0].name);
        }
      } else {
        setChatName(chatroom.name);
      }
    }
  }, [chatroom])

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    getMessages();
    // getChatName();
  }, [search_params]);

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <div className="
        flex flex-col 
        h-screen
        bg-light-pattern
        dark:bg-quick7
        overflow-y-scroll
      ">
        <NavBar />
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
          <div className="hidden md:block grow lg:w-[100px] xl:w-[250px] ">
            <Profile name={user_name} avatar={user_avatar} />
          </div>
          {search_user && <FollowerPicker current_chatroom={chatroom} handleAddParticipants={addParticipants} handleClose={HandlecloseSearchModal} />}
          <div className="w-full h-screen flex flex-col ">
            <input type='file' ref={file_input_ref} accept='image/*,video/mp4' multiple hidden onChange={(e) => { handleSetMessageMedia(e.target.files) }} />
            {/* <NavBar/> */}
            <div className="flex flex-grow max-h-max overflow-hidden dark:bg-quick5">
              <div className={`${chatroom === null && !new_recipient ? 'block' : 'hidden lg:block'} w-screen sm:w-56 md:w-56 lg:w-56 pl-4 pr-4 bg-gray-100 dark:bg-quick4 border-r border-quick5`}>
                {/* Encabezado de Chats en la barra lateral izquierda */}
                <div className="bg-gray-100 dark:bg-quick4 h-16 dark:text-white text-black flex items-center justify-between border-b border-quick5">
                  <span className="flex items-center gap-5">
                    <button onClick={() => { navigation(-1) }} className="block md:hidden">
                      <FaArrowLeft />
                    </button>
                    <h1 className="text-lg font-semibold">Chats</h1>

                  </span>
                </div>
                {/* Contenido de la barra lateral izquierda */
                  chatroom_list !== null && chatroom_list.map((chatroom) => (
                    <div key={chatroom.id} className={`flex items-center gap-2 p-2 cursor-pointer dark:hover:bg-quick5`} onClick={() => { setChatroom(chatroom) }}>
                      <div className='flex '>
                        {
                          chatroom.participants.length > 2 ?
                            chatroom.participants.slice(0, 2).map(({ profile_picture }) => (
                              <img src={profile_picture} className='rounded-full w-10 h-10 last:-ml-4 border-2 border-gray-100' />
                            ))
                            :
                            <img src={chatroom.participants.filter(({ id }) => (id !== user.uid))[0].avatar} className='rounded-full w-10 h-10 border-2 border-gray-100' />
                        }
                      </div>
                      <p className='truncate dark:text-white'>
                        {
                          chatroom.participants.length > 2 ?
                            chatroom.participants.map(({ name }) => (name)).join(", ")
                            :
                            chatroom.participants.filter(({ id }) => (id !== user.uid))[0].name
                        }
                      </p>
                      {/* <div key={chatroom.id} className={`flex items-center p-2 cursor-pointer ${chat.uid === search_params.get("to") && "bg-blue-100"}`} onClick={() => { navigation("/dms?to=" + chat.uid); }}> */}
                      {/* <img src={chat.avatar} alt={`Foto de ${chat.name}`} className="w-12 h-12 rounded-full mr-2" /> */}
                      {/* <span>{chat.name}</span> */}
                    </div>
                  ))}
              </div>

              <div className={`${chatroom === null && !new_recipient ? 'hidden' : 'block'} w-full flex flex-col max-h-max overflow-hidden dark:bg-quick4`}>
                {/* Rectángulo superior */}
                <div className="flex pl-4 pr-4 h-16 dark:text-white shrink-0 justify-between items-center dark:border-b dark:border-quick5">
                  {
                    chatroom === null ?
                      new_recipient ?
                        <span className="flex items-center gap-5">
                          <button onClick={() => { navigation(-1) }} className="block md:hidden">
                            <FaArrowLeft />
                          </button>
                          <p>
                            {`New chat with ${chat_name}`}
                          </p>
                        </span>
                        :
                        <span className="flex items-center gap-5">
                          <button onClick={() => { navigation(-1) }} className="block md:hidden">
                            <FaArrowLeft />
                          </button>
                          <p>Select a chatroom to start chatting!</p>
                        </span>
                      :
                      <>
                        <span className="flex items-center gap-5">
                          <button onClick={() => { setChatroom(null) }} className="block md:hidden">
                            <FaArrowLeft />
                          </button>
                          <p>{chat_name}</p>
                        </span>
                        {
                          chatroom.participants.find((participant) => (participant.id === user.uid)).chatroom_role === 'owner' &&
                          <>
                            <button onClick={() => { setSearchUser(true) }}>
                              <IoMdPersonAdd />
                            </button>
                          </>
                        }
                      </>
                  }
                  {/* <p>{user.uid === search_params.get("to") ? "Select a user to start a conversation" : chat_name}</p> */}
                </div>
                <div ref={messages_end_ref} className="p-4 grow bg-gray-100 dark:bg-neutral-800 overflow-y-auto">
                  {
                    chatroom === null ?
                      <img src={'./quicker.png'} className='h-full w-full object-contain' />
                      :
                      <div className="flex flex-col-reverse">
                        {messages.map((message, index) => (
                          <Message key={message.id} index={index} content={message} by_user={message.from_user === user.uid} />
                        ))}
                      </div>
                  }
                </div>

                {/* Rectángulo inferior */}
                {/* {user.uid !== search_params.get("to") && */}
                {(chatroom !== null || new_recipient) &&
                  <>
                    <div className='flex'>
                      {
                        message_media &&
                        message_media.map((media) => (
                          <div className='flex p-1'>
                            <img src={media.preview} className='bg-black rounded-md w-24 h-24' alt='' />
                            <span className='absolute text-white cursor-pointer p-1' >
                              <button
                                className="rounded relative h-8 max-h-[40px] w-8 max-w-[40px] select-none text-center align-middle font-sans text-xs font-medium uppercase dark:text-white transition-all hover:bg-gray-900/60 active:bg-gray-900/70 bg-gray-900/50 disabled:pointer-events-none disabled:opacity-80 disabled:shadow-none"
                                type="button"
                                onClick={() => { removeMessageMedia(media.file.name) }}
                              >
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                  <IoIosClose size={40} />
                                </span>
                              </button>
                            </span>
                          </div>

                        ))
                      }
                    </div>
                    <div className="flex gap-4 mt-4 mb-4 ml-4 mr-4 bg-[#] text-gray">
                      <button className="bg-[#64DE92] hover:bg-[#397850] text-white py-2 px-4 rounded flex items-center cursor-pointer" onClick={() => { file_input_ref.current.click() }}>
                        <FaImage />
                      </button>
                      <input
                        type="text"
                        className="w-full py-2 px-3 rounded border border-gray-300"
                        placeholder="Escribe tu mensaje..."
                        value={newMessage}
                        onChange={(e) => handleSetNewMessage(e.target.value)}
                      />
                      <button className="bg-[#64DE92] disabled:bg-quick4 enabled:hover:bg-[#397850] text-white py-2 px-4 rounded" onClick={handleSendMessage} disabled={!message_enabled}>
                        <FaPaperPlane />
                      </button>
                    </div>
                  </>
                }
              </div>
            </div>
          </div >
          <aside className="hidden md:flex w-[300px] min-w-[300px] max-w-[300px]">
            <Suggestions />
          </aside>
        </div>
        <Bottom_NavBar />
      </div>

    </>

  );
};
