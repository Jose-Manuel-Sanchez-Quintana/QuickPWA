import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";

const UseFollowerPicker = () => {
    const [search_results, setSearchResults] = useState(null);
    const [users, setUsers] = useState(null);
    const [participan_list, setParticipantList] = useState([]);
    const { user } = useContext(UserContext)

    const fetchUsers = async () => {
        axios.get(`https://quick-api-9c95.onrender.com/user/${user.uid}/followers`).then((response) => {
            if (response.status === 200) {
                setUsers(response.data)
                setSearchResults(response.data)
            }
        })
    }

    const searchUsers = async (search_input) => {
        let search = new RegExp(search_input, 'i');

        setSearchResults(users.filter(user => search.test(user.name)));
    }

    const removeParticipant = (participan) => {
        setParticipantList([...participan_list.filter((e) => (e.id !== participan.id))])
        setSearchResults([...search_results, participan])
    }

    const addParticipant = (participan) => {
        setParticipantList([...participan_list, participan])
        setSearchResults([...search_results.filter((e) => (e.id !== participan.id))])
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return ({ search_results, searchUsers, participan_list, addParticipant, removeParticipant })
}

export default UseFollowerPicker;