import styles from "../CommentsForm/CommentsForm.module.css";

export const CommentsForm = ({ commentText, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.commentsForm}>
      <textarea
        placeholder="Please type something..."
        value={commentText}
        onChange={onInputChange}
      />
      <button type="submit">Send</button>
    </form>
  );
};
