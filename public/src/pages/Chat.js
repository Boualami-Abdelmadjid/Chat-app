import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/store";
import { useNavigate } from "react-router-dom";
import styles from "./Chat.module.css";
import axios from "axios";
import { getContacts, host } from "../utils/APIROutes";
import Contacts from "../components/Contacts/Contacts";
import MessageHeader from "../components/MessagesHeader/MessageHeader";
import ChatInput from "../components/ChatInput/ChatInput";
import MessageContainer from "../components/MessageContainer/MessageContainer";
import io from "socket.io-client";
const socket = io(host);

export default function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const currentUser = useSelector((state) => state.user.connectedUser);
  const isEmojiPickerShown = useSelector(
    (state) => state.user.isEmojiPickerShown
  );

  useEffect(() => {
    document.addEventListener("click", (e) => {
      !e.target.closest(".emojiSelector") &&
        !e.target.closest(".emoji") &&
        !isEmojiPickerShown &&
        dispatch(userActions.closeEmojiPicker());
    });
    if (!localStorage.getItem("chat-user")) navigate("/login");
    else if (!JSON.parse(localStorage.getItem("chat-user")).isAvatarImageSet)
      navigate("/setAvatar");
    else {
      async function getContactsfunction() {
        const user = JSON.parse(localStorage.getItem("chat-user"));
        dispatch(userActions.changeConnectedUser(user));
        const id = user._id;
        const { data } = await axios.get(`${getContacts}/${id}`);
        setContacts(data);
      }
      getContactsfunction();
    }
  }, [navigate, dispatch, isEmojiPickerShown]);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  return (
    <div className={styles.container}>
      <div className={styles.contacts}>
        <Contacts contacts={contacts} currentUser={currentUser} />
        <div className="messagesContainer">
          <MessageHeader />
          <MessageContainer socket={socket} />
          <ChatInput socket={socket} />
        </div>
      </div>
    </div>
  );
}
