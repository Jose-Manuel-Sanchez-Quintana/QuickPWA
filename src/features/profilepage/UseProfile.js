import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { db, fs } from "../../firebase";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import usePost from "../post/usePost";

const UseProfile = () => {
    const { user } = useContext(UserContext);
    const [user_name, setUserName] = useState("");
    const [user_avatar, setUserAvatar] = useState("");
    const [user_subscriptions, setUserSubscription] = useState([]);
    const [user_roles, setUserRoles] = useState([]);
    const [search_params] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [following, setFollowing] = useState(null);
    const [follows_you, setFollowsYou] = useState(null);
    const [followers, setFollowers] = useState(null);


    const user_uid = search_params.get("user") != null ? search_params.get("user") : user.uid;

    const getUserInfo = () => {
        // axios.get(`https://quick-api-9c95.onrender.com/user/${search_params.get("user")}`, {
        axios.get(`https://quick-api-9c95.onrender.com/user/${search_params.get("user")}`, {
            params: {
                requester_id: user.uid
            }
        }).then((response) => {
            if (response.status === 200) {
                // console.log(response.data);
                setFollowsYou(response.data.follows_back)
                setFollowers(response.data.followers)
                setFollowing(response.data.following)
                setUserName(response.data.name)
                setUserAvatar(response.data.avatar)
                setUserSubscription(response.data.subscriptions)
                setUserRoles(response.data.role)
            }
        });

        // const doc_ref = doc(db, "users", search_params.get("user"));
        // const user_doc = await getDoc(doc_ref);
        // const user_data = user_doc.data();
        // setUserName(user_data.name);
        // setUserAvatar(user_data.avatar);
    }


    const unrepost = (post_id) => {
        setPosts(posts.filter(post => (
            post.id !== post_id
        )))
    }

    const getPosts = () => {
        axios.get(`https://quick-api-9c95.onrender.com/users/${search_params.get("user")}/posts`, {
            params: {
                before_date: 0,
                limit: 222,
                requester_id: user.uid
            }
        }).then((response) => {
            if (response.status === 200) {
                setPosts(response.data);
                // setPosts([
                //     ...response.data.posts.map((post) => ({ type: "post", ...post })),
                //     ...response.data.reposts.map((repost) => ({ type: "repost", ...repost }))
                // ]);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    // const getFollowers = async () => {
    //     try {

    //         const other_ref = await doc(db, "users", search_params.get("user"));
    //         const followers_qry = await query(collection(db, "friends"), where("follows", "==", other_ref));
    //         const followers_ref = await getDocs(followers_qry);

    //         setFollowers(followers_ref.size);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const getFollowing = async () => {
    //     try {
    //         const user_ref = await doc(db, "users", user.uid);
    //         const other_ref = await doc(db, "users", search_params.get("user"));
    //         const follow_qry = await query(collection(db, "friends"), and(where("user", "==", user_ref), where("follows", "==", other_ref)));
    //         const follow_ref = await getDocs(follow_qry);

    //         setFollowing(follow_ref.size !== 0)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const followUser = () => {
        axios.get(`https://quick-api-9c95.onrender.com/${following ? 'unfollow' : 'follow'}/${search_params.get("user")}`, {
            params: {
                requester_id: user.uid
            }
        }).then((response) => {
            if (response.status === 200 && response.data === true) {
                setFollowing(!following);
                setFollowers(following ? followers - 1 : followers + 1);
            }
        });
        // try {
        //     const user_ref = await doc(db, "users", user.uid);
        //     const other_ref = await doc(db, "users", search_params.get("user"));
        //     const follow_qry = await query(collection(db, "friends"), and(where("user", "==", user_ref), where("follows", "==", other_ref)));
        //     const follow_ref = await getDocs(follow_qry);

        //     if (follow_ref.size === 0) {
        //         await addDoc(collection(db, "friends"), {
        //             user: user_ref,
        //             follows: other_ref
        //         });
        //         setFollowing(true);
        //         setFollowers(followers + 1);
        //     } else {
        //         follow_ref.forEach(async (follow) => {
        //             await deleteDoc(doc(db, "friends", follow.id));
        //         })
        //         setFollowing(false);
        //         setFollowers(followers - 1);
        //     }
        // } catch (error) {
        //     console.log(error)
        // }

    }

    const updateAvatar = async (new_avatar, format) => {
        const avatar_ref = ref(fs, `avatars/${user_name}.${format}`);
        await uploadBytes(avatar_ref, new_avatar).then(async (avatar_snapshot) => {
            await getDownloadURL(avatar_ref).then((url) => {
                setUserAvatar(url);
                const user_ref = doc(db, "users", user.uid);
                updateDoc(user_ref, {
                    avatar: url
                });
            })
        })
    };

    const post = async (message, media) => {
        const form_data = new FormData();

        form_data.append('message', message);

        media.forEach(media_file => {
            form_data.append('media', media_file.file);
        });

        axios.post(`https://quick-api-9c95.onrender.com/posts/${user.uid}`, form_data, {}).then(response => {
            setPosts([response.data, ...posts])
        })
    };

    useEffect(() => {
        getUserInfo();
        getPosts();
        // getFollowing();
        // getFollowers();
    }, [])

    return ({
        user_name,
        user_avatar,
        updateAvatar,
        posts,
        unrepost,
        following,
        followUser,
        setPosts,
        followers,
        post,
        follows_you,
        user_subscriptions,
        user_roles
    });
}

export default UseProfile;