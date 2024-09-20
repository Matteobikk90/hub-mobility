import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>
          </li>
          {[...Array(5)].map((_, index) => (
            <li key={index}>
              <Link
                to={`/section/${index + 1}`}
                className="hover:text-yellow-300"
              >
                Section {index + 1}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/admin" className="hover:text-yellow-300">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
