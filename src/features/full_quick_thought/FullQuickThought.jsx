import { React, useContext, useEffect, useRef, useState } from "react";
import { Post } from "../post/post";
import useHome from "../feed/UseFeed";
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { FaArrowLeft, FaBuffer, FaFileImage, FaImages } from "react-icons/fa";
import { IoIosClose, IoIosSend, IoMdSend } from "react-icons/io";
import { UserContext } from "../../App";
import { AiOutlineLoading } from "react-icons/ai";

const FullQuickThought = ({ makePost, handleClose }) => {
  const { user } = useContext(UserContext);
  const [close, setClose] = useState(false);
  const [post_message, setPostMessage] = useState("");
  const [post_enabled, setPostEnabled] = useState(true);
  const post_media_input = useRef(null);
  const [post_media, setPostMedia] = useState([]);
  const [posting, setPosting] = useState(false);
  // const {
  //     post,
  //     posts
  // } = useHome();
  const message_max_chars =
    user.subscriptions.indexOf("quicker") === -1 ? 128 : 512;

  const removePostMedia = (file_name) => {
    setPostMedia(post_media.filter(({ file }) => file.name !== file_name));

    if (post_message.length <= 0 && post_media.length <= 1) {
      setPostEnabled(true);
    }
  };

  const handleSetPostMedia = (file_list) => {
    setPostMedia([
      ...post_media,
      ...Array.from(file_list).map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      })),
    ]);

    if (post_message.length <= message_max_chars) {
      setPostEnabled(false);
    }
  };

  const handleSetPostMessage = (value) => {
    if (post_media.length <= 0) {
      setPostEnabled(value.length < 1 || value.length > message_max_chars);
    } else {
      setPostEnabled(value.length > message_max_chars);
    }
    setPostMessage(value);
  };

  const handleMakePost = () => {
    if (!post_enabled) {
      makePost(post_message, post_media).then(() => {
        setPosting(false);
        setClose(true);
        handleClose();
      });
      setPosting(true);
      // remember to free previews from memory
      setPostMedia([]);
      setPostMessage("");
      setPostEnabled(true);
    }
  };

  return (
    <>
      <input
        type="file"
        className="hidden"
        ref={post_media_input}
        onChange={(e) => {
          handleSetPostMedia(e.target.files);
        }}
        multiple
        accept="image/*"
      />

      <div
        className={`absolute flex flex-col justify-between border z-40 h-screen w-screen bg-white dark:bg-quick4 ${
          close ? "animate-slide_down" : "animate-slide_up"
        }`}
      >
        <div className="flex h-10 px-4 items-end justify-between dark:bg-quick4">
          <button
            onClick={() => {
              setClose(true);
              handleClose();
            }}
            className="h-6 w-6 text-black dark:text-white dark:bg-quick4"
          >
            <FaArrowLeft className="h-full w-full" />
          </button>
          {!posting ? (
            <button
              disabled={post_enabled}
              className="h-6 w-6 text-quick-green-0 disabled:pointer-events-none disabled:text-light-gray-3"
              type="button"
              onClick={() => {
                handleMakePost();
              }}
            >
              {/* <span className=" transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
              <IoMdSend className="h-full w-full" />
              {/* </span> */}
            </button>
          ) : (
            <div className="flex justify-center items-center h-6 w-6">
              <AiOutlineLoading className="h-full w-full text-quick-green-0 animate-spin" />
            </div>
          )}
        </div>
        <div
          className="
            flex flex-row 
            items-top gap-2  
            p-6 md:p-3 grow bg-white dark:bg-quick4
          "
        >
          <div className="grid h-full w-full">
            <textarea
              rows="5"
              placeholder="Quick tought..."
              value={post_message}
              onChange={(e) => {
                handleSetPostMessage(e.target.value);
              }}
              className="peer h-full w-full resize-none rounded-[7px] !border-0 border-blue-gray-200 border-t-transparent bg-transparent font-sans text-lg font-normal dark:text-white outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            ></textarea>
            {/* <label */}
            {/* className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label> */}
          </div>
        </div>
        {post_media.length > 0 && (
          <div className="flex border-t-2 border-dashed border-light-grey-border dark:border-light-gray-8 p-3 bg-white">
            {post_media.map((media) => (
              <div className="relative flex p-1">
                <img
                  src={media.preview}
                  className="bg-black dark:bg-quick4 object-cover rounded-md w-24 h-24"
                  alt=""
                />
                <span className="absolute text-white cursor-pointer p-1">
                  <button
                    className="rounded relative h-8 max-h-[40px] w-8 max-w-[40px] select-none text-center align-middle font-sans text-xs font-medium uppercase dark:text-white transition-all hover:bg-gray-900/60 active:bg-gray-900/70 bg-gray-900/50 disabled:pointer-events-none disabled:opacity-80 disabled:shadow-none"
                    type="button"
                    onClick={() => {
                      removePostMedia(media.file.name);
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
        )}
        <div className="flex h-10 px-4 justify-between">
          <button
            className="h-6 w-6 select-none text-light-gray-5 disabled:pointer-events-none"
            type="button"
            onClick={() => {
              post_media_input.current.click();
            }}
          >
            {/* <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
            <FaImages className="w-full h-full" />
            {/* </span> */}
          </button>
          <p className="text-light-gray-5">{`${post_message.length}/${message_max_chars}`}</p>
        </div>
      </div>
    </>
  );
};

export default FullQuickThought;
