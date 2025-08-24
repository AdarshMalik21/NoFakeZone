// src/components/Navbar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons from lucide-react
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NoFake<span className="text-gray-800">Zone</span>
        </Link>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link to="/verify" className="hover:text-blue-600">Verify</Link>
          </li>
          <li>
            <Link to="/india" className="hover:text-blue-600">Trending India</Link>
          </li>
          <li>
            <Link to="/world" className="hover:text-blue-600">Trending World</Link>
          </li>
          <li>
            <Link to="/community" className="hover:text-blue-600">Community</Link>
          </li>
        </ul>


        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
         <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">

            <li>
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/verify" className="hover:text-blue-600">Verify</Link>
            </li>
            <li>
              <Link to="/india" className="hover:text-blue-600">Trending India</Link>
            </li>
            <li>
              <Link to="/world" className="hover:text-blue-600">Trending World</Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-blue-600">Community</Link>
            </li>
          </ul>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
