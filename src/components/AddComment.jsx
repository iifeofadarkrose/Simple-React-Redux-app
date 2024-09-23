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
    <div className="max-w-md mx-auto mt-10 bg-stone-50 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Add a Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-slate-700 mb-1">Comment:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
