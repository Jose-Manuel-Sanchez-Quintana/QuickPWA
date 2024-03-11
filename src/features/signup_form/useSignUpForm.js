import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { setUserData } from '../../slices/userSlice';
// import { useDispatch } from 'react-redux';
import { UserContext } from "../../App";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const useSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState("");
  const [status, setStatus] = useState("");
  // const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);

  const createUser = async (id) => {
    try {
      const userRef = doc(db, "users", id);
      await setDoc(userRef, {
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/quick-11766.appspot.com/o/avatars%2Fdefault.png?alt=media&token=a6fac49b-9ee9-4850-86cd-852a31189421",
        name: name,
        date: serverTimestamp(),
        subscriptions: [],
        role: []
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signUp = (email, password, name) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        createUser(userCredential.user.uid);
        setUser({
          uid: userCredential.user.uid,
          avatar: '',
          name: name,
          subscriptions: [],
          role: []
        });
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setLoading(false);
      });
  };

  return {
    name,
    email,
    password,
    setEmail,
    setPassword,
    setName,
    signUp,
    status,
    loading,
  };
};

export default useSignUpForm;
