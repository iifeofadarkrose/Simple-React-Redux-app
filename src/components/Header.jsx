import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-white text-xl font-bold mb-2 sm:mb-0">Comments</div>
        <div>
          <Link to="/" className="text-white mr-4 hover:underline">Home</Link>
          <Link to="/add" className="text-white hover:underline">Add Comment</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;