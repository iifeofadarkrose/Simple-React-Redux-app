import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, deleteComment } from '../store/commentsSlice';

const CommentList = () => {
  const dispatch = useDispatch();
  const { items: comments, status, error } = useSelector(state => state.comments);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      {comments.map(comment => (
        <div key={comment.id} className="bg-white p-4 rounded shadow mb-4">
          <p className="mb-2">{comment.body}</p>
          <p className="text-sm text-gray-600">Author: {comment.user.username}</p>
          <button 
            onClick={() => handleDelete(comment.id)}
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
