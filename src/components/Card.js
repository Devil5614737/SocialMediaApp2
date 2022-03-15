import { Input } from "../components/Input";
import Like from "../assets/like.svg";
import Unlike from "../assets/unlike.svg";
import { motion } from "framer-motion";

export const Card = ({
  photo,
  title,
  postedBy,
  createdAt,
  handleComment,
  id,
  handleChange,
  comments,
  likes,
  like,
  unlike
}) => {
  return (
    <motion.div

    initial={{scale:0,opacity:0}}
      animate={{
        scale: 1,
        opacity:1
      }}
       transition={{ delay: .5,ease:"easeInOut" }}
      className="card"
    >
      <div className="cardTop">
        <img
          src="https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt="user"
        />
        <p>{postedBy}</p>
      </div>
      <img src={photo} alt="post" />
      <div className="cardRes">
        <div  className="cardResLeft">
          <img  src={Like} alt="like" />
          <button disabled={likes.length>=1} onClick={() => like(id)}>Like</button>
          <img   src={Unlike} alt="like" />
          <button disabled={likes.length===0} onClick={() => unlike(id)}>Unlike</button>
        </div>
        <p className="time">{createdAt}</p>
      </div>
      <p className="likesCount">
        likes<span>{likes && likes.length}</span>
      </p>
      <div className="cardTitle">
        <p>kaushik</p>
        <p>{title}</p>
      </div>
      <div className="cardComments">
        {comments.map((comment) => (
          <div className="cardCommentsContainer">
            <p>{comment.postedBy.username}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="cardComment">
        <Input onChange={handleChange} placeholder="add a comment..." />
        <p onClick={() => handleComment(id)}>comment</p>
      </div>
    </motion.div>
  );
};
