import React from "react";
import VideoEmbed from "./VideoEmbed";

const Message = ({ index, content, by_user }) => {
  return (
    <div
      key={index}
      className={`text-sm mb-2 ${
        by_user ? "self-end message-bubble" : "self-start message-bubble other"
      }`}
    >
      {content.message}
      <div className={content.media.length > 1 && "grid grid-cols-2 gap-1"}>
        {content.media.slice(0, 4).map((file) =>
          file.mimetype.split("/")[0] === "image" ? (
            <div
              className={`bg-black h-40 ${
                content.media.length > 1 ? "w-40" : "max-w-lg"
              }`}
            >
              <img
                src={file.url}
                className="object-cover h-full w-full max-w-xs"
              />
            </div>
          ) : (
            file.mimetype.split("/")[0] === "video" && (
              <VideoEmbed url={file.url} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Message;
