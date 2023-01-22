import { useState, FC, useRef } from "react";
import "./AuthForm.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onSucces, onError } from "../../utils/toasts";

interface authFormProps {
     label: string;
     button: string;
     span: string;
     onSubmit: (
          email: string,
          password: string,
          name: string,
          type: string
     ) => void;
}

const AuthForm: FC<authFormProps> = ({ label, button, span, onSubmit }) => {
     const [user, loading] = useAuthState(auth);
     let navigate = useNavigate();
     const [passwordVisibility, setPasswordVisibility] =
          useState<Boolean>(false);
     const [openForm, setOpenForm] = useState<Boolean>(false);
     let emailRef = useRef<any>(null);
     let passwordRef = useRef<any>(null);
     let emailLoginRef = useRef<any>(null);
     let passwordLoginRef = useRef<any>(null);
     let nameRef = useRef<any>(null);

     let onSubmitAuthForm = (e: any, type: string) => {
          e.preventDefault();

          if (type === "login") {
               onSubmit(
                    emailLoginRef.current?.value,
                    passwordLoginRef.current?.value,
                    nameRef.current?.value,
                    type
               );
               return;
          }

          if (type === "signup") {
               onSubmit(
                    emailRef.current?.value,
                    passwordRef.current?.value,
                    nameRef.current?.value,
                    type
               );
               return;
          }
     };

     const login = () => {
          setOpenForm(!openForm);
          if (user) {
               onSucces("You have authoried succesfully !");
               return navigate("/");
          }
     };

     return (
          <div className="form-structor">
               <div className={`signup  ${openForm ? "slide-up" : ""}`}>
                    <h2
                         className="form-title"
                         id="signup"
                         onClick={() => setOpenForm(!openForm)}>
                         <span>or</span>Sign up
                    </h2>
                    <div className="form-holder">
                         <input
                              ref={nameRef}
                              type="text"
                              className="input"
                              placeholder="Name"
                         />
                         <input
                              ref={emailRef}
                              type="email"
                              className="input"
                              placeholder="Email"
                         />
                         <div className="form-password">
                              <input
                                   ref={passwordRef}
                                   type={
                                        passwordVisibility ? "text" : "password"
                                   }
                                   className="input"
                                   placeholder="Password"
                              />
                              <img
                                   onClick={() =>
                                        setPasswordVisibility(
                                             !passwordVisibility
                                        )
                                   }
                                   src="/Auth-input-check.png"
                                   alt="passwordVisibility"
                              />
                         </div>
                    </div>
                    <button
                         className="submit-btn"
                         onClick={(e) => onSubmitAuthForm(e, "signup")}>
                         Sign up
                    </button>
               </div>
               <div className={`login  ${!openForm ? "slide-up" : ""}`}>
                    <div className="center">
                         <h2 className="form-title" id="login" onClick={login}>
                              <span>or</span>Log in
                         </h2>
                         <div className="form-holder">
                              <input
                                   ref={emailLoginRef}
                                   type="email"
                                   className="input"
                                   placeholder="Email"
                              />
                              <div className="form-password">
                                   <input
                                        ref={passwordLoginRef}
                                        type={
                                             passwordVisibility
                                                  ? "text"
                                                  : "password"
                                        }
                                        className="input"
                                        placeholder="Password"
                                   />
                                   <img
                                        onClick={() =>
                                             setPasswordVisibility(
                                                  !passwordVisibility
                                             )
                                        }
                                        src="/Auth-input-check.png"
                                        alt="passwordVisibility"
                                   />
                              </div>
                         </div>
                         <button
                              className="submit-btn"
                              onClick={(e) => onSubmitAuthForm(e, "login")}>
                              Log in
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default AuthForm;
