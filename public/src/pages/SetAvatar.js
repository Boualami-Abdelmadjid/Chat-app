import axios from "axios";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { avatarRoute } from "../utils/APIROutes";
import styles from "./SetAvatar.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const api = "https://api.multiavatar.com/";
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));
    if (!user) navigate("/login");
    if (user.isAvatarImageSet) {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    async function getAvatars() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.floor(Math.random() * 10000)}?apikey=XO6Zn5iyjmCQRh`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
    }
    getAvatars();
  }, []);
  const setAvatarHandler = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("chat-user"));
    const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });
    if (data.isSet) {
      user.isAvatarImageSet = true;
      console.log(user);
      user.avatarImage = data.Image;
      localStorage.removeItem("chat-user");
      localStorage.setItem("chat-user", JSON.stringify(user));
      navigate("/");
    }
  };
  return (
    <div className={styles.container}>
      <h1>Pick an avatar as your profile picture</h1>
      <div className={styles.avatars}>
        {avatars.map((avatar, index) => (
          <img
            src={`data:image/svg+xml;base64,${avatar}`}
            alt="avatar"
            key={index}
            className={selectedAvatar === index ? `${styles.selected}` : ""}
            onClick={() => {
              setSelectedAvatar(index);
            }}
          />
        ))}
      </div>
      <Button
        variant="contained"
        sx={{
          display: "block",
          marginBlock: "1rem",
          marginInline: "auto",
          backgroundColor: "indigo",
          ":hover": {
            bgcolor: "indigo", // theme.palette.primary.main
            color: "white",
          },
          fontWeight: "500",
          fontSize: "1.1rem",
        }}
        type="submit"
        onClick={setAvatarHandler}
      >
        Submit
      </Button>
    </div>
  );
}
