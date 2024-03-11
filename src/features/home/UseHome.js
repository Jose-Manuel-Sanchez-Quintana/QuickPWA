import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  getDoc,
  query,
} from "firebase/firestore";
import axios from "axios";

const UseHome = () => {
  const { user } = useContext(UserContext);
  const [user_name, setUserName] = useState("");
  const [user_avatar, setUserAvatar] = useState("");
  const [posts, setPosts] = useState([]);

  const getUserInfo = async () => {
    const doc_ref = doc(db, "users", user.uid);
    const user_doc = await getDoc(doc_ref);
    const user_data = user_doc.data();
    setUserName(user_data.name);
    setUserAvatar(user_data.avatar);
  };

  const getPosts = () => {
    axios.get('https://quick-api-9c95.onrender.com/posts', {
      params: {
        before_date: 170227262,
        limit: 222,
        requester_id: user.uid
      }
    }).then((response) => {
      if (response.status === 200) {
        setPosts(response.data);
      }
    }).catch((error) => {
      console.log(error);
    })
    // const docSnap = await getDocs(collection(db, "posts"));

    // setPosts(
    //   await Promise.all(
    //     docSnap.docs.map(async (post) => {
    //       let post_data = post.data();
    //       let from_user = await getDoc(post_data.from);

    //       let user_data = from_user.data();
    //       user_data.uid = post_data.from.id;
    //       post_data.from = user_data;
    //       post_data.id = post.id;
    //       return post_data;
    //     })
    //   )
    // );
  };

  const post = async (message, media) => {
    const form_data = new FormData();

    form_data.append('message', message);

    media.forEach(media_file => {
      form_data.append('media', media_file.file);
    });

    axios.post(`https://quick-api-9c95.onrender.com/posts/${user.uid}`, form_data, {}).then(response => {
      console.log(response.data)
      setPosts([response.data, ...posts])
    })
    // try {
    //   const user_ref = doc(db, "users", user.uid);
    //   await addDoc(collection(db, "posts"), {
    //     from: user_ref,
    //     message: message,
    //     date: serverTimestamp(),
    //     likes: 0,
    //     reposts: 0
    //   }).then((post_ref) => {
    //     const new_post = {
    //       id: post_ref.id,
    //       from: {
    //         id: user.uid,
    //         avatar: user_avatar,
    //         name: user_name,
    //         uid: user.uid,
    //       },
    //       message: message,
    //       date: {
    //         seconds: new Date().getTime() / 1000,
    //       },
    //       likes: 0,
    //     };
    //     setPosts([...posts, new_post]);
    //   });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }

  useEffect(() => {
    getUserInfo();
    getPosts();
  }, []);

  return {
    user_name,
    user_avatar,
    post,
    setPosts,
    posts,
  };
};

export default UseHome;
