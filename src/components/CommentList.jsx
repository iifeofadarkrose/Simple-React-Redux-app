import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, deleteComment } from '../store/commentsSlice';

const CommentItem = React.memo(({ comment, onDelete }) => (
  <div className="bg-stone-50 p-6 rounded-lg shadow-md mb-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
    <p className="text-slate-700 mb-3">{comment.body}</p>
    <p className="text-sm text-slate-500 mb-2">Author: {comment.user.username}</p>
    <button 
      onClick={() => onDelete(comment.id)}
      className="bg-rose-400 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50"
    >
      Delete
    </button>
  </div>
));

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

CommentItem.displayName = 'CommentItem';

const CommentList = () => {
  const dispatch = useDispatch();
  const { items: comments, status, error } = useSelector(state => state.comments);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments());
    }
  }, [status, dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteComment(id));
  }, [dispatch]);

  const memoizedComments = useMemo(() => comments.map(comment => (
    <CommentItem key={comment.id} comment={comment} onDelete={handleDelete} />
  )), [comments, handleDelete]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Comments</h1>
      {status === 'loading' && <div className="text-center text-slate-600">Loading...</div>}
      {status === 'failed' && <div className="text-center text-rose-500">Error: {error}</div>}
      <div className="space-y-6">
        {memoizedComments}
      </div>
    </div>
  );
};

export default CommentList;
