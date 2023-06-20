import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../MainForm/MainForm.module.css";
export const MainForm = () => {
  const [name, setName] = useState("");
  const [chat, setChat] = useState("");
  const handleChange = (e) => {
    console.log(e.currentTarget.name);
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "chat":
        setChat(e.currentTarget.value);
        break;

      default:
        break;
    }
  };
  console.log(name, chat);
  const handleClick = (e) => {
    const isChange = !name || !chat;
    if (isChange) e.preventDefault();
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>START</h1>

        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Your Name"
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="chat"
              placeholder="Chat"
              value={chat}
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <Link
            className={styles.group}
            onClick={handleClick}
            to={`/chat?name=${name}&chat=${chat}`}
          >
            <button type="submit" className={styles.button}>
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
