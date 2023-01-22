import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
} from "firebase/auth";
import { onSucces, onError } from "../../utils/toasts";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "../../components/Spinner/Spinner";

const Auth = () => {
     const [user, loading] = useAuthState(auth);
     let navigate = useNavigate();

     let authUser = async (
          email: string,
          password: string,
          name: string | undefined,
          type: string
     ) => {
          if (type === "signup") {
               if (email === "" || password === "" || name === "") {
                    return onError("Name,email or password isn't eneterd ");
               }
               try {
                    let response = await createUserWithEmailAndPassword(
                         auth,
                         email,
                         password
                    );
                    let newUser = { uid: response.user?.uid, name, email };

                    const docRef = await addDoc(
                         collection(db, "users"),
                         newUser
                    );
                    navigate("/");
                    onSucces("Congrats, you are successfully authorized !");
               } catch (err: any) {
                    onError(err.message);
                    console.log(err.message);
               }
          }

          if (type === "login") {
               if (email === "" || password === "") {
                    return onError("Email or password isn't eneterd ");
               }
               signInWithEmailAndPassword(auth, email, password)
                    .then((res: any) => {
                         onSucces("You have authoried succesfully !");
                         return navigate("/");
                    })
                    .catch((err: any) => {
                         onError(err.message);
                    });
          }
     };

     return (
          <div className="auth-bg">
               {!loading ? (
                    <AuthForm
                         label="Sign up"
                         button="Sign up"
                         span="Already have an account?"
                         onSubmit={authUser}
                    />
               ) : (
                    <Spinner />
               )}
          </div>
     );
};

export default Auth;
