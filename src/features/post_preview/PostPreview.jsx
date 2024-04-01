const PostPreview = ({ post_data }) => {
  return (
    <>
      {post_data !== null && (
        <div className="w-full p-2 break-all">
          {post_data.original_post !== undefined && (
            <p>This is a repost of {post_data.original_post.id}</p>
          )}
          <p className="text-gray-600 font-serif dark:text-white lg:pb-8 content-start">
            {post_data.is_repost
              ? post_data.original_post.content
              : post_data.content}
          </p>
          {post_data.media !== undefined && (
            <>
              {post_data.original_post === undefined ? (
                <div
                  className={
                    post_data.media.length > 1 && "grid grid-cols-2 gap-1"
                  }
                >
                  {post_data.media.length > 1
                    ? post_data.media
                        .slice(0, 4)
                        .map((file) => (
                          <img
                            src={file.url}
                            className="rounded-md bg-black h-72 object-cover object-center w-full"
                            alt=""
                          />
                        ))
                    : post_data.media.length > 0 && (
                        <img
                          src={post_data.media[0].url}
                          className="rounded-md object-cover"
                          alt=""
                        />
                      )}
                </div>
              ) : (
                <div
                  className={
                    post_data.original_post.media.length > 1 &&
                    "grid grid-cols-2 gap-1"
                  }
                >
                  {post_data.original_post.media.length > 1
                    ? post_data.media
                        .slice(0, 4)
                        .map((file) => (
                          <img
                            src={file.url}
                            className="rounded-md bg-black h-72 object-cover object-center w-full"
                            alt=""
                          />
                        ))
                    : post_data.original_post.media.length > 0 && (
                        <img
                          src={post_data.original_post.media[0].url}
                          className="rounded-md object-cover w- max-w-xs"
                          alt=""
                        />
                      )}
                </div>
              )}
            </>
          )}
          <div className="flex gap-x-5 pt-7">
            <div className="flex items-center space-x-4">
              <h1 className="text-md text-gray-500 dark:text-gray-400">
                {post_data.original_post === undefined
                  ? post_data.likes + " likes"
                  : post_data.original_post.likes + " likes"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-md text-gray-500 dark:text-gray-400">
                {post_data.original_post === undefined
                  ? post_data.reposts + " reposts"
                  : post_data.original_post.reposts + " reposts"}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPreview;
