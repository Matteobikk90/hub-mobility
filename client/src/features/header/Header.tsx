import logo from '@/assets/images/logo.svg';
import { Navbar } from '@/features/header/components/NavBar';
import { Menu, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <header className="bg-black text-cream-middle p-[1rem_1rem_0.35rem_1rem] gap-4 flex lg:flex-col justify-between items-center">
      <Link to="/">
        <img
          className="md:w-[20rem]"
          width={350}
          src={logo}
          alt="Hub Mobility Services"
          loading="lazy"
        />
      </Link>

      {/* Hamburger Menu Icon (Mobile) */}
      <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
        {isMenuOpen ? (
          <X className="w-8 h-8" color="#00c2cb" />
        ) : (
          <Menu className="w-8 h-8" color="#00c2cb" />
        )}
      </button>

      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};
