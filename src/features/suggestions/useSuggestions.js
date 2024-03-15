import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const useSuggestion = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const user_list = await getDocs(collection(db, "users"));

            setUsers(await Promise.all(
                user_list.docs.slice(0, 6).map(async (user) => {
                    let user_data = user.data();
                    user_data.uid = user.id;
                    return user_data;
                })
            ));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return { users }
}

export default useSuggestion;
