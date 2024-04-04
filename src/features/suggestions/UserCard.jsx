import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const UserCard = ({ profile_user }) => {
  const [following, setFollowing] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setFollowing(profile_user.following);
  }, []);

  return (
    <li
      className="text p-2 font-semibold hover:bg-gray-200 cursor-pointer dark:hover:bg-quick5 dark:text-white flex"
      key={profile_user.id}
      onClick={(e) => {
        e.stopPropagation();
        navigate("/profile?user=" + profile_user.id);
        window.location.reload();
      }}
    >
      <div>
        <img
          className="w-10 h-10 rounded mr-2"
          src={profile_user.avatar}
          alt="Imagen de profile_user"
        />
      </div>
      <div className="h-fit text-left">
        <p>{profile_user.name}</p>
        <p className="text-sm font-light text-italic">
          Followed by {profile_user.followed_by[0].name}
        </p>
      </div>
      <div className="flex justify-end items-center grow bg-gray text-gray-500">
        <button
          onClick={(e) => {
            console.log(profile_user);
            e.stopPropagation();
            axios
              .get(
                `https://quick-api-9c95.onrender.com/${
                  following ? "unfollow" : "follow"
                }/${profile_user.id}`,
                {
                  params: {
                    requester_id: user.uid,
                  },
                }
              )
              .then((response) => {
                if (response.status === 200 && response.data === true) {
                  setFollowing(!following);
                }
              });
          }}
          className="
            hover:underline 
            decoration-green-500 decoration-2 
            h-fit
            p-1
          "
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
    </li>
  );
};

export default UserCard;
