import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";

const usePost = () => {
    const { user, setUser } = useContext(UserContext);
    const [likes, setLikes] = useState(false);
    const [reposts, setReposts] = useState(false);
    const [liked, setLiked] = useState(false);
    const [reposted, setReposted] = useState(false);
    const [likeable, setLikeable] = useState(true);
    const [repostable, setRepostable] = useState(true);

    const getLikes = async () => {
        // const user_ref = await doc(db, "users", user.uid);
        // const post_ref = await doc(db, "posts", post_id);
        // const like_qry = await query(collection(db, "likes"), and(where("from", "==", user_ref), where("on", "==", post_ref)));
        // const like_ref = await getDocs(like_qry);
        // const like_n_qry = await query(collection(db, "likes"), where("on", "==", post_ref));
        // const likes_n_ref = await getDocs(like_n_qry);

        // setLikes(likes_n_ref.size);
        // setLiked(like_ref.size != 0);
    }

    const repost = (post_id) => {
        if (repostable) {
            setRepostable(false);
            if (reposted) {
                axios.delete(`https://quick-api-9c95.onrender.com/repost/${post_id}`, {
                    params: { user_id: user.uid }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            setReposts(reposts - 1);
                            setRepostable(true);
                            setReposted(!reposted);
                        }
                    }).catch((error) => {
                        console.error(error);
                        setRepostable(true);
                    });
            } else {
                axios.post(`https://quick-api-9c95.onrender.com/repost/${post_id}`, {}, {
                    params: { user_id: user.uid }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            setReposts(reposts + 1);
                            setRepostable(true);
                            setReposted(!reposted);
                        }
                    }).catch((error) => {
                        console.error(error);
                        setRepostable(true);
                    });
            }
        }
    }

    const likePost = (post_id) => {
        if (likeable) {
            setLikeable(false);
            if (liked) {
                axios.delete(`https://quick-api-9c95.onrender.com/likes/${post_id}`, {
                    params: { user_id: user.uid }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            setLikes(likes - 1);
                            setLikeable(true);
                            setLiked(!likes);
                        }
                    }).catch((error) => {
                        console.error(error);
                        setLikeable(true);
                    });
            } else {
                axios.post(`https://quick-api-9c95.onrender.com/likes/${post_id}`, {}, {
                    params: { user_id: user.uid }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            setLikes(likes + 1);
                            setLikeable(true);
                            setLiked(!likes);
                        }
                    }).catch((error) => {
                        console.error(error);
                        setLikeable(true);
                    });
            }
        }
    }

    useEffect(() => {
        // getLikes();
    }, [])

    return {
        likes,
        user,
        reposts,
        liked,
        reposted,
        likePost,
        setLikes,
        setReposts,
        repost,
        setLiked,
        setReposted
    }

}

export default usePost;