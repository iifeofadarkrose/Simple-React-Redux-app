import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/commentsSlice';
import { useNavigate } from 'react-router-dom';

const AddComment = () => {
  const [body, setBody] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedBody = localStorage.getItem('commentBody');
    const savedUsername = localStorage.getItem('commentUsername');
    if (savedBody) setBody(savedBody);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  useEffect(() => {
    localStorage.setItem('commentBody', body);
    localStorage.setItem('commentUsername', username);
  }, [body, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body && username) {
      dispatch(addComment({
        id: Date.now(),
        body,
        user: { username }
      }));
      localStorage.removeItem('commentBody');
      localStorage.removeItem('commentUsername');
      setBody('');
      setUsername('');
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block mb-2">Comment:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddComment;
