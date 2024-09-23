import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-teal-600 shadow-md">
      <nav className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-stone-50 text-2xl font-bold">Comments App</div>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-stone-50 hover:text-teal-200 transition duration-300 ease-in-out">Home</Link>
            <Link to="/add" className="bg-stone-50 text-teal-600 px-4 py-2 rounded-full hover:bg-teal-100 transition duration-300 ease-in-out">Add Comment</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;