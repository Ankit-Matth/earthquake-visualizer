import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/brand_logo.png"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-blue-50 text-black shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-xl font-bold">Earthquake Visualizer</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/map" className="hover:text-blue-600 transition">
            Map
          </Link>
          <Link to="/visualize" className="hover:text-blue-600 transition">
            Visualize
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            // Close Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-gray-100 flex flex-col space-y-3 p-4 pt-0 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 transition text-center border p-1 rounded"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/map"
            className="hover:text-blue-600 transition text-center border p-1 rounded"
            onClick={() => setIsOpen(false)}
          >
            Map
          </Link>
          <Link
            to="/visualize"
            className="hover:text-blue-600 transition text-center border p-1 rounded"
            onClick={() => setIsOpen(false)}
          >
            Visualize
          </Link>
        </nav>
      )}
    </header>
  )
}
