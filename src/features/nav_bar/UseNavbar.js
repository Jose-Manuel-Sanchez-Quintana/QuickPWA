import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const UseNavbar = () => {
    const [search_results, setSearchResults] = useState(null);
    const [users, setUsers] = useState(null);

    const fetchUsers = async () => {
        try {
            const user_list = await getDocs(collection(db, "users"));

            setUsers(await Promise.all(
                user_list.docs.map(async (user) => {
                    let user_data = user.data();
                    user_data.uid = user.id;
                    return user_data;
                })
            ));
        } catch (error) {
            console.log(error)
        }
    }

    const searchUsers = async (search_input) => {
        let search = new RegExp(search_input, 'i');
        setSearchResults(users.filter(user => search.test(user.name)));
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return ({ search_results, searchUsers })
}

export default UseNavbar;