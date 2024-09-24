import logo from '@/assets/images/logo.svg';
import { Navbar } from '@/features/header/components/NavBar';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-black text-cream-middle p-4 gap-4 flex md:flex-col justify-between items-center">
      <Link to="/">
        <img
          className="md:w-[28.125rem]"
          width={350}
          src={logo}
          alt="Hub Mobility Services"
          loading="lazy"
        />
      </Link>

      {/* Hamburger Menu Icon (Mobile) */}
      <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
        {isMenuOpen ? (
          <X className="w-8 h-8" color="#00c2cb" />
        ) : (
          <Menu className="w-8 h-8" color="#00c2cb" />
        )}
      </button>

      <Navbar isMenuOpen={isMenuOpen} />
    </header>
  );
};
