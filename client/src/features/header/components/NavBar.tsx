import { renderNavBarLinks } from '@/utils/navBar';

export const Navbar = ({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) => {
  // Common function to render links

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-around w-full">
        {renderNavBarLinks(false, toggleMenu)} {/* Passing false for desktop */}
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`z-10 fixed md:hidden flex h-[calc(100%-6.8rem)] top-0 left-0 justify-evenly bg-black text-white flex-col items-center w-full transition-all duration-500 ease-in-out transform gap-3 ${
          isMenuOpen
            ? 'opacity-100 translate-y-[6.8rem]'
            : 'opacity-0 -translate-y-full'
        }`}
      >
        {renderNavBarLinks(true, toggleMenu)} {/* Passing true for mobile */}
      </nav>
    </>
  );
};
