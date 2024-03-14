import { React, useContext, useEffect, useRef, useState } from 'react';
import { Post } from "../post/post";
import useHome from "../feed/UseFeed";
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { FaArrowLeft, FaBuffer, FaFileImage, FaImages } from "react-icons/fa";
import { IoIosClose, IoIosSend, IoMdSend } from 'react-icons/io';
import { UserContext } from '../../App';
// import { LinkIcon } from "@heroicons/react/24/outline";

export const Quick_Thought = ({ makePost, handleClose }) => {
   const { user } = useContext(UserContext);
   const [post_message, setPostMessage] = useState("");
   const [post_enabled, setPostEnabled] = useState(true);
   const post_media_input = useRef(null);
   const [post_media, setPostMedia] = useState([]);
   // const {
   //     post,
   //     posts
   // } = useHome();
   const message_max_chars = user.subscriptions.indexOf('quicker') === -1 ? 128 : 512;


   const removePostMedia = (file_name) => {
      setPostMedia(post_media.filter(({ file }) => (file.name !== file_name)));

      if (post_message.length <= 0 && post_media.length <= 1) {
         setPostEnabled(true);
      }
   }

   const handleSetPostMedia = (file_list) => {
      setPostMedia([...post_media, ...Array.from(file_list).map((file) => ({
         preview: URL.createObjectURL(file),
         file
      }))]);

      if (post_message.length <= message_max_chars) {
         setPostEnabled(false);
      }
   }

   const handleSetPostMessage = (value) => {
      if (post_media.length <= 0) {
         setPostEnabled(value.length < 1 || value.length > message_max_chars);
      } else {
         setPostEnabled(value.length > message_max_chars);
      }
      setPostMessage(value);
   }

   const handleMakePost = () => {
      if (!post_enabled) {
         makePost(post_message, post_media);
         handleClose()
         // remember to free previews from memory
         setPostMedia([]);
         setPostMessage("");
         setPostEnabled(true);
      }
   }

   return (
      <>
         <input type='file' hidden ref={post_media_input} onChange={(e) => { handleSetPostMedia(e.target.files) }} multiple accept='image/*' />
         <div className="top-0 left-0 rounded-none dark:outline outline-1 outline-quick5 flex md:w-auto md:h-auto flex-row items-top gap-2 md:rounded-md border border-gray-900/10 bg-white dark:bg-quick4 p-6 md:p-1">
            <div className="block md:hidden">
               <button onClick={handleClose} className="text-black dark:text-white">
                  <FaArrowLeft />
               </button>
            </div>
            <div className="">
               <button
                  className="rounded-full h-10 w-10 select-none text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all active:bg-gray-700 disabled:pointer-events-none disabled:shadow-none"
                  type="button"
                  onClick={() => { post_media_input.current.click() }}
               >
                  {/* <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
                  <FaImages color='#90A4AE' size={20} />
                  {/* </span> */}
               </button>

               {/* <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1824 10.1815L10.1825 10.1814C10.3031 10.0607 10.3989 9.9173 10.4641 9.75953C10.5294 9.60177 10.563 9.43269 10.5629 9.26194C10.5629 9.0912 10.5292 8.92215 10.4638 8.76443C10.3984 8.60671 10.3026 8.46342 10.1818 8.34273C10.061 8.22204 9.91767 8.12632 9.7599 8.06104L9.56872 8.52304L9.7599 8.06104C9.60213 7.99575 9.43305 7.96218 9.26231 7.96224C9.09158 7.9623 8.92252 7.99599 8.7648 8.06139L8.95631 8.52326L8.7648 8.06139C8.60716 8.12675 8.46393 8.22251 8.34328 8.3432C7.98697 8.69939 7.50379 8.89949 6.99998 8.89949C6.49616 8.89949 6.01298 8.69939 5.65668 8.3432C5.41295 8.0994 5.08237 7.96237 4.73763 7.96224C4.39281 7.96212 4.06206 8.09898 3.81815 8.34273C3.57423 8.58647 3.43714 8.91712 3.43701 9.26194C3.43689 9.60677 3.57376 9.93752 3.8175 10.1814L3.81758 10.1815C4.23545 10.5995 4.73158 10.9311 5.27763 11.1573C5.82367 11.3835 6.40893 11.5 6.99998 11.5C7.59102 11.5 8.17628 11.3835 8.72232 11.1573C9.26837 10.9311 9.7645 10.5995 10.1824 10.1815ZM11.1719 11.1719C10.0654 12.2784 8.56475 12.9 6.99998 12.9C5.4352 12.9 3.93451 12.2784 2.82805 11.1719C1.72158 10.0655 1.09998 8.56478 1.09998 7.00001C1.09998 5.43523 1.72158 3.93454 2.82805 2.82808C3.93451 1.72161 5.4352 1.10001 6.99998 1.10001C8.56475 1.10001 10.0654 1.72161 11.1719 2.82808C12.2784 3.93454 12.9 5.43523 12.9 7.00001C12.9 8.56478 12.2784 10.0655 11.1719 11.1719ZM4.59998 6.70001C4.94476 6.70001 5.27542 6.56304 5.51921 6.31924C5.76301 6.07545 5.89998 5.74479 5.89998 5.40001C5.89998 5.05522 5.76301 4.72456 5.51921 4.48077C5.27542 4.23697 4.94476 4.10001 4.59998 4.10001C4.25519 4.10001 3.92453 4.23697 3.68074 4.48077C3.43694 4.72456 3.29998 5.05522 3.29998 5.40001C3.29998 5.74479 3.43694 6.07545 3.68074 6.31924C3.92453 6.56304 4.25519 6.70001 4.59998 6.70001ZM10.3192 6.31924C10.563 6.07545 10.7 5.74479 10.7 5.40001C10.7 5.05522 10.563 4.72456 10.3192 4.48077C10.0754 4.23697 9.74476 4.10001 9.39997 4.10001C9.05519 4.10001 8.72453 4.23697 8.48074 4.48077C8.23694 4.72456 8.09998 5.05522 8.09998 5.40001C8.09998 5.74479 8.23694 6.07545 8.48074 6.31924C8.72453 6.56304 9.05519 6.70001 9.39997 6.70001C9.74476 6.70001 10.0754 6.56304 10.3192 6.31924Z"
                                    fill="#90A4AE" stroke="#90A4AE"></path>
                            </svg>
                        </span>
                    </button> */}
            </div>
            <div className="grid h-full w-full min-w-[200px]">
               <textarea rows="5" placeholder="Quick tought..." value={post_message} onChange={(e) => { handleSetPostMessage(e.target.value) }}
                  className="peer h-full w-full resize-none rounded-[7px]  !border-0 border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal dark:text-white outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50">
               </textarea>
               <div className='flex'>
                  {
                     post_media &&
                     post_media.map((media) => (
                        <div className='flex p-1'>
                           <img src={media.preview} className='bg-black object-cover rounded-md w-24 h-24' alt='' />
                           <span className='absolute text-white cursor-pointer p-1' >
                              <button
                                 className="rounded relative h-8 max-h-[40px] w-8 max-w-[40px] select-none text-center align-middle font-sans text-xs font-medium uppercase dark:text-white transition-all hover:bg-gray-900/60 active:bg-gray-900/70 bg-gray-900/50 disabled:pointer-events-none disabled:opacity-80 disabled:shadow-none"
                                 type="button"
                                 onClick={() => { removePostMedia(media.file.name) }}
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
               {/* <label */}
               {/* className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label> */}
            </div>
            <div className='grid'>
               <button
                  disabled={post_enabled}
                  className="h-10 w-10 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase dark:text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:shadow-none"
                  type="button"
                  onClick={handleMakePost}
               >
                  {/* <span className=" transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
                  <IoMdSend size={20} />
                  {/* </span> */}
               </button>
               <span className='flex dark:text-white text-sm items-end justify-center'>
                  <p className='text-slate-400'>{`${post_message.length}/${message_max_chars}`}</p>
               </span>
            </div>
         </div>
      </>
   )
}