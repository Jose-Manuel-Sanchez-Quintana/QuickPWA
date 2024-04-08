import { React, useContext, useEffect, useState } from "react";
import { Post } from "../post/post";
import UseFeed from "./UseFeed";
import axios from "axios";
import { UserContext } from "../../App";

export const Feed = ({ posts, setPosts }) => {
  const { user } = useContext(UserContext);

  const handleLikePost = (post_id) => {
    axios
      .post(
        `https://quick-api-9c95.onrender.com/posts/${post_id}/like`,
        {},
        {
          params: {
            requester_id: user.uid,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data === true) {
          setPosts(
            posts.map((post) => {
              if (post.id === post_id) {
                post.likes += 1;
                post.liked = true;
              }
              if (
                post.original_post !== undefined &&
                post.original_post.id === post_id
              ) {
                post.original_post.likes += 1;
                post.original_post.liked = true;
              }
              return post;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFlagPost = (post_id) => {
    axios
      .post(
        "https://quick-api-9c95.onrender.com/administration/flag/post/" +
          post_id,
        {},
        {
          params: {
            requester_id: user.uid,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setPosts(
            posts.map((post) => {
              if (post.id === post_id) {
                post.flagged = true;
              }
              if (
                post.original_post !== undefined &&
                post.original_post.id === post_id
              ) {
                post.original_post.flagged = true;
              }
              return post;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnflagPost = (post_id) => {
    axios
      .post(
        "https://quick-api-9c95.onrender.com/administration/unflag/post/" +
          post_id,
        {},
        {
          params: {
            requester_id: user.uid,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setPosts(
            posts.map((post) => {
              if (post.id === post_id) {
                post.flagged = false;
              }
              if (
                post.original_post !== undefined &&
                post.original_post.id === post_id
              ) {
                post.original_post.flagged = false;
              }
              return post;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRepostPost = (post_id) => {
    axios
      .post(
        `https://quick-api-9c95.onrender.com/posts/${post_id}/repost`,
        {},
        {
          params: {
            requester_id: user.uid,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data === true) {
          setPosts(
            posts.map((post) => {
              if (post.original_post === undefined) {
                if (post.id === post_id) {
                  post.reposts += 1;
                  post.reposted = true;
                }
              } else {
                if (post.original_post.id === post_id) {
                  post.original_post.reposts += 1;
                  post.original_post.reposted = true;
                }
              }
              return post;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnrepostPost = (post_id) => {
    axios
      .post(
        `https://quick-api-9c95.onrender.com/posts/${post_id}/unrepost`,
        {},
        {
          params: {
            requester_id: user.uid,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data === true) {
          setPosts(
            posts
              .map((post) => {
                if (post.original_post !== undefined) {
                  if (post.original_post.id === post_id) {
                    post.original_post.reposts -= 1;
                    post.original_post.reposted = false;
                  }
                } else {
                  if (post.id === post_id) {
                    post.reposts -= 1;
                    post.reposted = false;
                  }
                }
                return post;
              })
              .filter((post) => {
                if (post.original_post !== undefined) {
                  return !(
                    post.author.id === user.uid &&
                    post.original_post.id === post_id
                  );
                } else {
                  return true;
                }
              })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnlikePost = (post_id) => {
    axios
      .post(
        `https://quick-api-9c95.onrender.com/posts/${post_id}/unlike`,
        {},
        {
          params: {
            requester_id: user.uid,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data === true) {
          setPosts(
            posts.map((post) => {
              if (post.id === post_id) {
                post.likes -= 1;
                post.liked = false;
              }
              if (
                post.original_post !== undefined &&
                post.original_post.id === post_id
              ) {
                post.original_post.likes -= 1;
                post.original_post.liked = false;
              }
              return post;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`
            overflow-hidden
            col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2  
            bg-light-white dark:bg-quick4
            border-x border-light-gray-border
            text-black text-3xl
            divide-y divide-light-gray-border
						${posts === null && "h-full"}
        `}
    >
      {posts === null ? (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      ) : (
        posts.map((post) => (
          <Post
            post={post}
            like={handleLikePost}
            repost={handleRepostPost}
            unlike={handleUnlikePost}
            unrepost={handleUnrepostPost}
            flag={handleFlagPost}
            unflag={handleUnflagPost}
            profile_user={{ id: "", name: "" }}
            key={post.id}
          />
        ))
      )}
    </div>
  );
};
