interface IComment {
    text: string;
    time: string;
    author: string;
    post: string;
    _id: string;
    onCommentDeleted: () => Promise<void>;
  }
  
  export default IComment;
  