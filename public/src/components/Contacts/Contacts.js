import React, { useState } from "react";
import styles from "./Contacts.module.css";
export default function Contacts({ contacts }) {
  const [selectedContact, setSelectedContact] = useState(undefined);
  return (
    <div className={styles.container}>
      {contacts.map((contact, index) => (
        <div
          className={`${styles.contact} ${
            selectedContact === index ? styles.selected : ""
          }`}
          key={index}
          onClick={() => setSelectedContact(index)}
        >
          <img
            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
            alt="avatar"
          />
          <p>{contact.username}</p>
        </div>
      ))}
    </div>
  );
}
