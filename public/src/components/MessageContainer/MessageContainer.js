import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/store";
import axios from "axios";
import { getAllMessages } from "../../utils/APIROutes";
import styles from "./MessageContainer.module.css";

export default function MessageContainer({ socket }) {
  const dispatch = useDispatch();
  const connectedUser = useSelector((state) => state.user.connectedUser);
  const { selectedUser } = useSelector((state) => state.user);
  const messages = useSelector((state) => state.user.messages);
  const scrollRef = useRef();
  const selectedRef = useRef();
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

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (msg) => {
        if (msg.from === selectedRef.current.value) {
          dispatch(
            userActions.addMessages({
              fromSelf: false,
              message: msg.message,
            })
          );
          scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
        }
      });
    }
  }, [dispatch, socket, selectedRef]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        style={{ display: "none" }}
        defaultValue={selectedUser._id}
        ref={selectedRef}
      />
      {messages.map((msg, index) => (
        <p key={index} className={msg.fromSelf ? styles.self : styles.received}>
          {msg.message}
        </p>
      ))}
      <div ref={scrollRef} />
    </div>
  );
}
