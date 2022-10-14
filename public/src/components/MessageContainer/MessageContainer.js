import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/store";
import axios from "axios";
import { getAllMessages } from "../../utils/APIROutes";
import styles from "./MessageContainer.module.css";

export default function MessageContainer() {
  const dispatch = useDispatch();
  const connectedUser = useSelector((state) => state.connectedUser);
  const selectedUser = useSelector((state) => state.selectedUser);
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    if (selectedUser._id) {
      async function fetchData() {
        const response = await axios.post(getAllMessages, {
          from: connectedUser._id,
          to: selectedUser._id,
        });
        dispatch(userActions.updateMessages(response.data));
      }
      fetchData();
    }
  }, [dispatch, connectedUser, selectedUser._id]);
  return (
    <div className={styles.container}>
      {messages.map((msg, index) => (
        <p key={index} className={msg.fromSelf ? styles.self : styles.received}>
          {msg.message}
        </p>
      ))}
    </div>
  );
}
