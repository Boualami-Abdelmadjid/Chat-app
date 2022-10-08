import styles from "./Register.module.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { loginRoute } from "../utils/APIROutes";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    if (handleValidation({ password, username })) {
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(data);
      if (data.status === false) console.log(data.msg);
      if (data.status === true) {
        localStorage.setItem("chat-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleValidation = ({ password, username }) => {
    if (password.length < 7) return false;
    if (username.length < 3) return false;
    return true;
  };
  useEffect(() => {
    if (localStorage.getItem("chat-user")) navigate("/");
  }, [navigate]);
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          <input
            ref={usernameRef}
            type="text"
            id="Username"
            name="username"
            min="3"
            placeholder=" "
          />
          <label htmlFor="Username">Username</label>
        </div>
        <div className={styles.inputContainer}>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder=" "
            min="8"
          />
          <label htmlFor="password">Password</label>
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
          Login
        </Button>
        <h3>
          You don't have an account <Link to="/register">Sign up </Link>
        </h3>
      </form>
    </div>
  );
}
