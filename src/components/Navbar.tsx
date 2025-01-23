"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase/config"; // Configuración de Firebase
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el término de búsqueda
  const pathname = usePathname();
  const router = useRouter();

  const hideNavbar = ["/auth", "/search", "/Explorar", "/inicio", "/dashboard"].some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserPhoto(user.photoURL);
        if (pathname === "/auth/login" || pathname === "/auth/register") {
          router.push("/inicio");
        }
      } else {
        setIsAuthenticated(false);
        setUserPhoto(null);
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push("/auth/register"); // Redirigir si no está autenticado
      return;
    }

    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (hideNavbar) return null;

  return (
    <nav className="bg-[#232323] px-8 py-4 flex items-center justify-between border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/inicio">
          <Image
            src="https://combo.staticflickr.com/66a031f9fc343c5e42d965ca/66b3f60bcd82f68f2716490a_flickr%20horz%20logo-light.png"
            alt="Flickr Logo"
            width={300} // Aumenta el tamaño del logo
            height={100}
          />
        </Link>
      </div>

      {/* Links de navegación */}
      <div className="hidden md:flex space-x-6 text-gray-300 text-base uppercase font-semibold">
        <a href="#features" className="hover:text-blue-400 transition duration-300">
          Features
        </a>
        <a href="#flickrpro" className="hover:text-blue-400 font-bold transition duration-300">
          FlickrPro
        </a>
        <a href="#apps" className="hover:text-blue-400 transition duration-300">
          The Apps
        </a>
        <div
          className="relative"
          onMouseEnter={() => setIsCompanyDropdownOpen(true)}
          onMouseLeave={() => setIsCompanyDropdownOpen(false)}
        >
          <button
            className="hover:text-blue-400 flex items-center transition duration-300 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isCompanyDropdownOpen ? "true" : "false"}
          >
            Company <span className="ml-1 text-xs">▼</span>
          </button>
          {isCompanyDropdownOpen && (
            <div
              className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white shadow-lg rounded-md"
              role="menu"
            >
              <a href="#about" className="block px-4 py-2 hover:bg-gray-700" role="menuitem">
                About Us
              </a>
              <a href="#careers" className="block px-4 py-2 hover:bg-gray-700" role="menuitem">
                Careers
              </a>
              <a href="#contact" className="block px-4 py-2 hover:bg-gray-700" role="menuitem">
                Contact
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center space-x-6">
        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search images..."
            className="p-2 bg-transparent text-white focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75L19.5 19.5M10.5 4.5a6 6 0 100 12 6 6 0 000-12z"
              />
            </svg>
          </button>
        </form>

        {/* Perfil del usuario / Login */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition duration-300 focus:outline-none"
            >
              <Image
                src={userPhoto || "/default-avatar.png"}
                alt="Avatar del usuario"
                width={40} // Aumenta el tamaño del avatar
                height={40}
                className="rounded-full"
              />
              <span className="hidden md:block font-medium">Mi Perfil</span>
            </button>
            {isProfileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-md z-50"
                role="menu"
              >
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-700" role="menuitem">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  role="menuitem"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/login" className="text-gray-300 hover:text-blue-400 transition duration-300">
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-pink-500 text-white py-1 px-4 rounded-md font-bold hover:bg-pink-400 transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
