import styles from "../Comment/Comments.module.css";

export const Comment = ({ id, body, user, onDelete }) => {
  const { username } = user;
  console.log(id);
  const handleDelete = () => {
    console.log(id);
    onDelete(id);
  };
  console.log(body);
  return (
    <div className={styles.comment}>
      <h2>{username}</h2>
      <p>{body}</p>
      <button onClick={handleDelete}>Delete Comment</button>
    </div>
  );
};
