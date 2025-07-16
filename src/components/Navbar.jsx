import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHouse,
  faPaste,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faPaste} />
            <span className="tracking-wide">Vishwa's Project</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-base font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link transition-all ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              <FontAwesomeIcon icon={faHouse} className="mr-1" />
              Home
            </NavLink>
            <NavLink
              to="/paste"
              className={({ isActive }) =>
                `nav-link transition-all ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              <FontAwesomeIcon icon={faPaste} className="mr-1" />
              Paste
            </NavLink>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={open ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          open ? "block" : "hidden"
        } bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 text-base font-medium ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`
          }
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          Home
        </NavLink>
        <NavLink
          to="/paste"
          className={({ isActive }) =>
            `block py-2 text-base font-medium ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`
          }
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faPaste} className="mr-2" />
          Paste
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
