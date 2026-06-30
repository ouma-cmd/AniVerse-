import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-purple-500 font-medium uppercase text-[13px]"
      : "text-white font-medium uppercase text-[13px] hover:text-purple-500 transition";

  return (
    <header className="bg-black border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex justify-between items-center md:px-12 py-5">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          AniVerse
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/anime" className={linkClass}>
            Anime
          </NavLink>

          <NavLink to="/characters" className={linkClass}>
            Characters
          </NavLink>

          <NavLink to="/favorites" className={linkClass}>
            Favorites
          </NavLink>

          <NavLink to="/my-library" className={linkClass}>
            My Library
          </NavLink>

          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden bg-black border-t border-[#1a1a1a] flex flex-col items-center gap-6 py-6">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/anime"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Anime
          </NavLink>

          <NavLink
            to="/characters"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Characters
          </NavLink>

          <NavLink
            to="/favorites"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Favorites
          </NavLink>

          <NavLink
            to="/my-library"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            My Library
          </NavLink>

          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>
        </nav>
      )}
    </header>
  );
}