import React from "react"

const VideoEmbed = ({ url }) => {
    return (
        <video className='object-cover h-full w-full max-w-xs' controls>
            <source src={url}>
            </source>
        </video>
    )
}

export default VideoEmbed