import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/store-logo.png";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import CartOnHeader from "./CartOnHeader";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Product", href: "/products" },
  { name: "About Us", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAppSelector(selectToken);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    if (currentScroll > scrollPosition) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setScrollPosition(currentScroll);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50  transition-all duration-300 bg-[#FAF7F0] px-2 md:px-6 py-1.5
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <NavLink to="/">
            <img className="w-16" src={logo} alt="" />
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-10 text-gray-700 text-xl">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive ? "text-slate-800 font-semibold" : "hover:text-black"
                }>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <div className="hidden md:flex space-x-4 items-center">
            <CartOnHeader />
            <NavLink to="/dashboard">
              <button className="hidden md:block px-4 py-2 bg-[#1E2525] text-white rounded hover:bg-[#1E2525] transition cursor-pointer">
                Dashboard
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <NavLink to="/login">
              <button className="px-4 py-2 border border-[#1E2525] text-[blue-600] rounded hover:bg-blue-50 transition cursor-pointer">
                Login
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button className="px-4 py-2 bg-[#1E2525] text-white rounded hover:bg-[#1E2525] transition cursor-pointer">
                Sign Up
              </button>
            </NavLink>
          </div>
        )}

        {/* Mobile Menu Button & Cart */}
        <div className="flex items-center md:hidden space-x-2">
          <div className="inline">
            <CartOnHeader />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center">
          {navLinks.map((link) => (
            <NavLink to={link.href} className="block text-gray-700">
              {link.name}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <NavLink to="/dashboard">
              <button className="w-full px-4 py-2 bg-[#1E2525] text-white rounded hover:bg-[#1E2525] transition cursor-pointer">
                Dashboard
              </button>
            </NavLink>
          ) : (
            <div className="space-y-2 pt-2">
              <NavLink to="/login">
                <button className="w-full px-4 py-2 border border-[#1E2525] text-[#1E2525] rounded hover:bg-blue-50 transition">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="w-full px-4 py-2 bg-[#1E2525] text-white rounded hover:bg-[#1E2525] transition">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
