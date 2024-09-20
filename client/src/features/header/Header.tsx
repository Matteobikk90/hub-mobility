import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation(); // Get the current URL path

  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav>
        <ul className="flex space-x-4">
          {/* Links to different sections */}
          {[...Array(5)].map((_, index) => {
            const sectionPath = `/section/${index + 1}`;
            const isActive = location.pathname === sectionPath;

            return (
              <li key={index}>
                <Link
                  to={sectionPath}
                  className={isActive ? 'text-yellow-300' : 'text-white'}
                >
                  Section {index + 1}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
