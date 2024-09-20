import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/section/1">Section 1</Link>
          </li>
          <li>
            <Link to="/section/2">Section 2</Link>
          </li>
          <li>
            <Link to="/section/3">Section 3</Link>
          </li>
          <li>
            <Link to="/section/4">Section 4</Link>
          </li>
          <li>
            <Link to="/section/5">Section 5</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
