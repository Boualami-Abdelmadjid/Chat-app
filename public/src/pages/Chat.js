import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Chat.module.css";
import axios from "axios";
import { getContacts } from "../utils/APIROutes";
import Contacts from "../components/Contacts/Contacts";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-user")) navigate("/login");
    else if (!JSON.parse(localStorage.getItem("chat-user")).isAvatarImageSet)
      navigate("/setAvatar");
    else {
      async function getContactsfunction() {
        const user = JSON.parse(localStorage.getItem("chat-user"));
        setCurrentUser(user);
        const id = user._id;
        const { data } = await axios.get(`${getContacts}/${id}`);
        setContacts(data);
      }
      getContactsfunction();
    }
  }, [navigate]);
  return (
    <div className={styles.container}>
      <div className={styles.contacts}>
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </div>
  );
}
