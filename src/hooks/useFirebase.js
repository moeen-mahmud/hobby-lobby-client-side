import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        const newUser = { email, displayName: name };
        setUser(newUser);

        // Save user to database
        saveUser(email, name);
        // Update user profile
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setAuthError("");
          })
          .catch((err) => {
            console.log(err.message);
            setAuthError(err.message);
          });
        history.replace("/");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const logInUser = (email, password, location, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        history.replace(destination);
        setAuthError("");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message.slice(22, -2));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    axios.post("http://localhost:5000/users", user).then((res) => {
      console.log(res.data);
    });
  };

  return {
    user,
    authError,
    isLoading,
    registerUser,
    logInUser,
    logOut,
  };
};
export default useFirebase;
