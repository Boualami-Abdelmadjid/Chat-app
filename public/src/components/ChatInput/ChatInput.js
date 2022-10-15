import React, { useState, useRef } from "react";
import styles from "./ChatInput.module.css";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/store";
import axios from "axios";
import { AddMessage } from "../../utils/APIROutes";

export default function ChatInput({ socket }) {
  const [message, setMessage] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const connectedUser = useSelector((state) => state.user.connectedUser);
  const showEmoji = useSelector((state) => state.user.isEmojiPickerShown);
  const emojiClickHandler = (emoji, event) => {
    setMessage((prev) => prev + emoji.emoji);
  };
  const sendMessageHandler = () => {
    axios.post(AddMessage, {
      from: connectedUser._id,
      to: selectedUser._id,
      message: message,
    });
    setMessage("");
    inputRef.current.focus();
    socket.emit("send-msg", {
      to: selectedUser._id,
      from: connectedUser._id,
      message: message,
    });
    dispatch(userActions.addMessages({ fromSelf: true, message: message }));
  };

  return (
    <div className={styles.chatInput}>
      <p
        className="emoji"
        onClick={() => dispatch(userActions.toggleEmojiPicker())}
      >
        🙂
      </p>

      {showEmoji && (
        <div className="emojiSelector">
          <EmojiPicker onEmojiClick={emojiClickHandler} />
        </div>
      )}

      <input
        type="text"
        value={message}
        placeholder="Type your message here"
        onChange={(e) => setMessage(e.target.value)}
        ref={inputRef}
      />
      <SendIcon
        sx={{
          backgroundColor: "#9186f3",
          color: "whitesmoke",
          height: "3rem",
          marginLeft: "-5rem",
          paddingInline: "1rem",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={sendMessageHandler}
      />
    </div>
  );
}
