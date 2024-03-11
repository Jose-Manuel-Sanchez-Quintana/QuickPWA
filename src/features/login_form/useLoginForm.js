import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../../App";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("");

  const logIn = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser({
          uid: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
        });
        setLoading(false);
        window.location = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setStatus(error.code);
        setLoading(false);
      });
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    logIn,
    status,
    loading,
  };
};

export default useLoginForm;
