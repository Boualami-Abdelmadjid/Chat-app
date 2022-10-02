import styles from "./Register.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Register() {
  const emailRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();
  const usernameRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password1 = password1Ref.current.value;
    const password2 = password2Ref.current.value;
    const username = usernameRef.current.value;
    console.log(email, password1, password2, username);
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
