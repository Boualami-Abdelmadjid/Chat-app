import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Chat.module.css";
import axios from "axios";
import { getContacts } from "../utils/APIROutes";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("chat-user")) navigate("/login");
    else if (!JSON.parse(localStorage.getItem("chat-user")).isAvatarImageSet)
      navigate("/setAvatar");
    else {
      async function getContactsfunctin() {
        const id = JSON.parse(localStorage.getItem("chat-user"))._id;
        const { data } = await axios.get(`${getContacts}/${id}`);
        setContacts(data);
      }
      getContactsfunctin();
    }
  }, [navigate]);
  return (
    <div className={styles.container}>
      <div className={styles.contacts}></div>
    </div>
  );
}
