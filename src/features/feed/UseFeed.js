import { useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, query } from "firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "../../App";
import { getAuth } from "firebase/auth";

const UseFeed = () => {
    /*
    const [posts, setPosts] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const loaded_users = [];

    const getPosts = async () => 
    {
        const docSnap = await getDocs(collection(db, "posts"));

        setPosts(await Promise.all(docSnap.docs.map(async(post) => {
            console.log(posts);
            let post_data = post.data();
            let from_user = await getDoc(post_data.from);
            
            let user_data = from_user.data();
            console.log(user_data)
            user_data.uid = post_data.from.id;
            post_data.from = user_data;
            return post_data;
        })));
    }
    
    const post = async (message) => 
    {
        try {
            const user_ref = doc(db, "users", user.uid);
            await addDoc(collection(db, "posts"), {
                from: user_ref,
                message: message,
                date: serverTimestamp(),
                likes: 0
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(()=>{
        getPosts();
    }, []);

    return {
        post,
        posts,
        setPosts
    };
    */
}

export default UseFeed;