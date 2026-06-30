import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-black px-[60px] py-[20px] border-b border-[#1a1a1a]">
      <h1 className="text-[22px] font-bold text-white m-0">AniVerse</h1>
      <nav className="flex gap-[30px] items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-purple-500 no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
              : "text-white no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/anime"
          className={({ isActive }) =>
            isActive
              ? "text-purple-500 no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
              : "text-white no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
          }
        >
          Anime
        </NavLink>
        <NavLink
          to="/characters"
          className={({ isActive }) =>
            isActive
              ? "text-purple-500 no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
              : "text-white no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
          }
        >
          Characters
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "text-purple-500 no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
              : "text-white no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/my-library"
          className={({ isActive }) =>
            isActive
              ? "text-purple-500 no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
              : "text-white no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
          }
        >
          My Library
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-purple-500 no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
              : "text-white no-underline text-[13px] font-medium tracking-[0.5px] uppercase"
          }
        >
          Dashboard
        </NavLink>
      </nav>
    </div>
  );
}
