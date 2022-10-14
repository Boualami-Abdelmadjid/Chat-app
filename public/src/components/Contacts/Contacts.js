import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/store";
import styles from "./Contacts.module.css";

export default function Contacts({ contacts, currentUser }) {
  const selectedContact = useSelector((state) => state.selectedUser);
  // const currentUser = useSelector((state) => state.connectedUser);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.contacts}>
        {contacts.map((contact, index) => (
          <div
            className={`${styles.contact} ${
              selectedContact === contact ? styles.selected : ""
            }`}
            key={index}
            onClick={() => dispatch(userActions.changeSelecteduser(contact))}
          >
            <img
              src={`data:image/svg+xml;base64,${contact.avatarImage}`}
              alt="avatar"
            />
            <p>{contact.username}</p>
          </div>
        ))}
      </div>
      <div className={styles.currentUser}>
        <img
          src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
          alt={currentUser?.username}
        />
        <p>{currentUser?.username}</p>
      </div>
    </div>
  );
}
