import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CommentList />} />
            <Route path="/add" element={<AddComment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;