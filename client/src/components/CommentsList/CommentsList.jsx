import { Comment } from "../Comment/Comment";
import styles from "../CommentsList/CommentsList.module.css";

export const CommentsList = ({ comments, onDelete }) => {
  return (
    <div className={styles.commentsList}>
      {comments.map(({ body, user, id }) => (
        <Comment key={id} id={id} body={body} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
};
