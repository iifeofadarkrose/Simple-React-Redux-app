import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-stone-200">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CommentList />} />
            <Route path="/add" element={<AddComment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;