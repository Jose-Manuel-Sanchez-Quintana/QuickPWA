import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";

const useSuggestion = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  const fetchUsers = async () => {
    try {
      axios
        .get("https://quick-api-9c95.onrender.com/suggestions", {
          params: {
            requester_id: user.uid,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUsers(response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users };
};

export default useSuggestion;
