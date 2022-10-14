import styles from "./Register.module.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { registerRoute } from "../utils/APIROutes";

export default function Register() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();
  const usernameRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password1 = password1Ref.current.value;
    const password2 = password2Ref.current.value;
    const username = usernameRef.current.value;
    if (handleValidation({ email, password1, password2, username })) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password1,
      });

      if (data.status === false) console.log(data.msg);
      if (data.status === true) {
        localStorage.setItem("chat-user", JSON.stringify(data.user));
        navigate("/setAvatar");
      }
    }
  };
  const handleValidation = ({ email, password1, password2, username }) => {
    if (password1 !== password2) return false;
    if (username.length < 7) return false;
    return true;
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          <input ref={emailRef} type="text" id="email" placeholder=" " />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.inputContainer}>
          <input ref={usernameRef} type="text" id="Username" placeholder=" " />
          <label htmlFor="Username">Username</label>
        </div>
        <div className={styles.inputContainer}>
          <input
            ref={password1Ref}
            type="password"
            id="password"
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles.inputContainer}>
          <input
            ref={password2Ref}
            type="password"
            id="password2"
            placeholder=" "
          />
          <label htmlFor="password2">Repeat password</label>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "indigo",
            ":hover": {
              bgcolor: "indigo", // theme.palette.primary.main
              color: "white",
            },
            fontWeight: "500",
            fontSize: "1.1rem",
          }}
          type="submit"
        >
          Sign up
        </Button>
        <h3>
          Already have an account ? <Link to="/login">Login </Link>
        </h3>
      </form>
    </div>
  );
}
