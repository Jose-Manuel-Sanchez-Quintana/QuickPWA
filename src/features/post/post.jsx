import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePost from "./usePost";
import { FaSync } from "react-icons/fa";
import { UserContext } from "../../App";
import { Spinner } from "@material-tailwind/react";
import { IoIosFlag } from "react-icons/io";
import axios from "axios";
import { BiRepost } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";

const relativeDate = (date) => {
  const diff = Math.round((new Date() - new Date(date)) / 1000);
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;

  if (diff < 30) {
    return "Just now";
  } else if (diff < minute) {
    return diff + " seconds ago";
  } else if (diff < 2 * minute) {
    return "A minute ago";
  } else if (diff < hour) {
    return Math.floor(diff / minute) + " minutes ago";
  } else if (Math.floor(diff / hour) === 1) {
    return "1 hour ago";
  } else if (diff < day) {
    return Math.floor(diff / hour) + " hours ago";
  } else if (diff < day * 2) {
    return "1 day ago";
  } else if (diff < week) {
    return Math.floor(diff / day) + " days ago";
  } else if (diff < week * 2) {
    return Math.floor(diff / week) + " week ago";
  } else if (diff < month) {
    return Math.floor(diff / week) + " weeks ago";
  } else if (diff < month * 2) {
    return Math.floor(diff / month) + " month ago";
  } else if (diff < year) {
    return Math.floor(diff / month) + " months ago";
  } else {
    ////////////////////////////
    return Math.floor(diff / year) + " years ago";
  }
};

export const Post = ({
  post,
  like,
  repost,
  unlike,
  unrepost,
  profile_user,
  flag,
  unflag,
}) => {
  const [updating_likes, setUpdatingLikes] = useState(true);
  const [updating_reposts, setUpdatingReposts] = useState(true);
  //const and var para obtener la fecha de la publicacion
  // const sec = post.date._seconds;
  // const out = new Date(sec * 1000);
  // const time = out.toLocaleString('default');
  const navigate = useNavigate();
  const [search_params] = useSearchParams();
  const [is_flagged, setFlagged] = useState(null);
  const is_repost = post.original_post !== undefined;
  const [updating_flagged, setUpdatingFlagged] = useState(false);

  const { user } = usePost();

  if (is_repost) {
    useEffect(() => {
      setUpdatingLikes(false);
    }, [post.original_post.liked]);
    useEffect(() => {
      setUpdatingReposts(false);
    }, [post.original_post.reposted]);

    useEffect(() => {
      setUpdatingFlagged(false);
      setFlagged(post.original_post.flagged);
    }, [post.original_post.flagged]);
  } else {
    useEffect(() => {
      setUpdatingFlagged(false);
      setFlagged(post.flagged);
    }, [post.flagged]);

    useEffect(() => {
      setUpdatingLikes(false);
    }, [post.liked]);

    useEffect(() => {
      setUpdatingReposts(false);
    }, [post.reposted]);
  }

  useEffect(() => {
    if (is_repost) {
      setFlagged(post.original_post.flagged);
    } else {
      setFlagged(post.flagged);
    }
  }, []);

  return (
    (is_repost || (!is_repost && post.active === true)) && (
      <>
        <div
          className="
			

				bg-light-white-0 dark:bg-quick4 dark:text-white "
        >
          <div className="sm:mt-0 sm:text-left break-words w-full p-2">
            {/* Div para la foto de perfil, nombre y numero de followers */}
            {is_repost && (
              <div className="h-6">
                <span className="flex h-full justify-between items-center mt-3">
                  <span className="flex h-full items-center">
                    {is_repost && <BiRepost color="green" className="h-5" />}
                    <p
                      className="text-sm font-sembold text-slate-400 hover:underline cursor-pointer"
                      onClick={() => {
                        navigate("/profile?user=" + post.author.id);
                      }}
                    >
                      {is_repost
                        ? post.author.id === user.uid
                          ? "You reposted"
                          : `${post.author.name} reposted`
                        : ""}
                    </p>
                  </span>
                </span>
              </div>
            )}
            <div
              className={
                is_repost
                  ? "rounded-md border border-light-grey-border dark:border-light-gray-8 p-2 mt-1"
                  : "p-2"
              }
            >
              <div className="flex justify-between">
                <span className="flex items-center space-x-4">
                  {is_repost ? (
                    <img
                      className="w-12 h-12 rounded cursor-pointer object-cover"
                      onClick={() => {
                        navigate(
                          "/profile?user=" + post.original_post.author.id
                        );
                      }}
                      src={post.original_post.author.avatar}
                      alt="user avatar"
                      loading="lazy"
                    ></img>
                  ) : (
                    <img
                      className="w-12 h-12 rounded cursor-pointer object-cover"
                      onClick={() => {
                        navigate("/profile?user=" + post.author.id);
                      }}
                      src={post.author.avatar}
                      alt="user avatar"
                      loading="lazy"
                    ></img>
                  )}
                  <div>
                    <div>
                      {/* <a className="dark:text-white"> */}
                      {
                        is_repost ? (
                          <h1
                            className="font-sembold text-black dark:text-white hover:underline cursor-pointer"
                            onClick={() => {
                              navigate(
                                "/profile?user=" + post.original_post.author.id
                              );
                            }}
                          >
                            <span className="flex">
                              <p className="font-semibold text-sm">
                                {post.original_post.author.name}
                              </p>
                              {post.original_post.author.subscriptions.indexOf(
                                "quicker"
                              ) !== -1 && (
                                <span className="w-4 ml-1">
                                  <img src="quicker_badge.png" />
                                </span>
                              )}
                            </span>
                          </h1>
                        ) : (
                          // post.original_post.author.name
                          <h1
                            className="font-sembold text-black dark:text-white hover:underline cursor-pointer"
                            onClick={() => {
                              navigate("/profile?user=" + post.author.id);
                            }}
                          >
                            <span className="flex">
                              <p className="font-semibold text-sm">
                                {post.author.name}
                              </p>
                              {post.author.subscriptions.indexOf("quicker") !==
                                -1 && (
                                <span className="w-4 ml-1">
                                  <img src="quicker_badge.png" />
                                </span>
                              )}
                            </span>
                          </h1>
                        )
                        // post.author.name
                      }
                      {/* </a> */}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      <h1
                        href=""
                        class="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400"
                      >
                        {is_repost
                          ? relativeDate(
                              post.original_post.date._seconds * 1000
                            )
                          : relativeDate(post.date._seconds * 1000)}
                      </h1>
                    </span>
                  </div>
                </span>
                {is_flagged !== null && updating_flagged ? (
                  <AiOutlineLoading className="text-quick-green-0 h-6 animate-spin" />
                ) : (
                  user.role !== undefined &&
                  user.role.indexOf("administrator") !== -1 && (
                    <button
                      className={
                        is_flagged
                          ? "text-light-warning-3 h-6"
                          : "text-light-gray-4 h-6"
                      }
                      onClick={() => {
                        setUpdatingFlagged(true);
                        if (is_repost) {
                          is_flagged
                            ? unflag(post.original_post.id)
                            : flag(post.original_post.id);
                        } else {
                          is_flagged ? unflag(post.id) : flag(post.id);
                        }
                      }}
                    >
                      {((is_repost && post.original_post.active) ||
                        (!is_repost && post.active)) && (
                        <IoIosFlag className="h-full" />
                      )}
                    </button>
                  )
                )}
              </div>
              <div className="">
                <p className="text-gray-700 text-xl font-serif dark:text-white pt-5 pb-5 content-start">
                  {is_repost ? (
                    post.original_post.active === true ? (
                      post.original_post.content
                    ) : (
                      <p className="italic text-lg text-light-gray-5">
                        This post was removed by an administrator
                      </p>
                    )
                  ) : (
                    post.active === true && post.content
                  )}
                </p>
                {!is_repost
                  ? post.active === true && (
                      <div
                        className={
                          post.media.length > 1 && "grid grid-cols-2 gap-1"
                        }
                      >
                        {post.media.length > 1
                          ? post.media
                              .slice(0, 4)
                              .map((file) => (
                                <img
                                  src={file.url}
                                  className="rounded-md bg-black dark:bg-quick4 aspect-square object-cover object-center w-full"
                                  alt=""
                                />
                              ))
                          : post.media.length > 0 && (
                              <img
                                src={post.media[0].url}
                                className="rounded-md dark:bg-quick4 w-auto max-h-72 object-contain"
                                alt=""
                              />
                            )}
                      </div>
                    )
                  : post.original_post.active === true && (
                      <div
                        className={
                          post.original_post.media.length > 1 &&
                          "grid grid-cols-2 gap-1"
                        }
                      >
                        {post.original_post.media.length > 1
                          ? post.original_post.media
                              .slice(0, 4)
                              .map((file) => (
                                <img
                                  src={file.url}
                                  className="rounded-md bg-black aspect-square object-cover object-center w-full"
                                  alt=""
                                />
                              ))
                          : post.original_post.media.length > 0 && (
                              <img
                                src={post.original_post.media[0].url}
                                className="rounded-md object-cover max-w-xs"
                                alt=""
                              />
                            )}
                      </div>
                    )}
                {((is_repost && post.original_post.active) ||
                  (!is_repost && post.active)) && (
                  <div className="flex gap-x-5 pt-7">
                    <div className="flex items-center space-x-4">
                      <span
                        onClick={() => {
                          setUpdatingLikes(true);
                          if (!updating_likes) {
                            if (is_repost) {
                              post.original_post.liked
                                ? unlike(post.original_post.id)
                                : like(post.original_post.id);
                            } else {
                              post.liked ? unlike(post.id) : like(post.id);
                            }
                          }
                        }}
                      >
                        {updating_likes ? (
                          <AiOutlineLoading className="h-6 w-6 text-quick-green-0 animate-spin" />
                        ) : is_repost ? (
                          <FaHeart
                            className={`h-6 w-6 p-1
                            ${
                              post.original_post.liked
                                ? "fill-light-error-10"
                                : "fill-light-gray-4"
                            }`}
                          />
                        ) : (
                          post.active === true && (
                            <FaHeart
                              className={`h-6 w-6 p-1
                              ${
                                post.liked
                                  ? "fill-light-error-10"
                                  : "fill-light-gray-4"
                              }`}
                            />
                          )
                        )}
                      </span>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {is_repost
                          ? post.original_post.likes
                          : post.active === true && post.likes}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {
                        <span
                          onClick={() => {
                            setUpdatingReposts(true);
                            !updating_reposts && is_repost
                              ? post.original_post.reposted
                                ? unrepost(post.original_post.id)
                                : repost(post.original_post.id)
                              : post.reposted
                              ? unrepost(post.id)
                              : repost(post.id);
                          }}
                        >
                          {updating_reposts ? (
                            <AiOutlineLoading className="h-6 w-6 ml-2 text-quick-green-0 animate-spin" />
                          ) : is_repost ? (
                            <BiRepost
                              className={`cursor-pointer h-6 w-6 ml-2 ${
                                post.original_post.reposted
                                  ? "fill-green-400"
                                  : "fill-light-gray-4 dark:fill-white"
                              }`}
                            />
                          ) : (
                            <BiRepost
                              className={`cursor-pointer h-6 w-6 ml-2 ${
                                post.reposted
                                  ? "fill-green-400"
                                  : "fill-light-gray-4 dark:fill-white"
                              }`}
                            />
                          )}
                        </span>
                      }
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {is_repost
                          ? post.original_post.active === true &&
                            post.original_post.reposts
                          : post.active === true && post.reposts}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Seccion para el post de las personas */}
          </div>
        </div>
      </>
    )
  );
};
