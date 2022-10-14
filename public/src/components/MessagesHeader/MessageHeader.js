import React from "react";
import styles from "./MessageHeader.module.css";
import { useSelector } from "react-redux";

export default function MessageHeader() {
  const selectedUser = useSelector((state) => state.selectedUser);
  return (
    <div className={styles.header}>
      <img
        src={`data:image/svg+xml;base64,${selectedUser.avatarImage}`}
        alt="avatar"
      />
      <p>{selectedUser.username}</p>
    </div>
  );
}
