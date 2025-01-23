"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "@/firebase/config"; // Importa tu configuración de Firebase

const NavbarLoggedIn = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [userPhoto, setUserPhoto] = useState<string | null>(null); // Estado para la foto de perfil

  useEffect(() => {
    // Ocultar la navbar en rutas específicas
    const hiddenRoutes = ["/auth/login", "/", "/auth/register"];
    setIsVisible(!hiddenRoutes.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    // Escuchar el estado de autenticación del usuario
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserPhoto(user.photoURL); // Establecer la foto de perfil del usuario autenticado
      } else {
        setUserPhoto(null);
      }
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, []);

  // Manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Manejar cambios en el input de búsqueda
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("Sesión cerrada");
      router.push("/login");
    });
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  if (!isVisible) return null;

  return (
    <nav className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="https://combo.staticflickr.com/66a031f9fc343c5e42d965ca/66b3f60bcd82f68f2716490a_flickr%20horz%20logo-light.png"
          alt="Flickr Logo"
          width={120}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/inicio")}
        />
      </div>

      <div className="hidden md:flex space-x-6">
  {/* Link para redirigir a /dashboard */}
  <Link href="/dashboard" className="hover:text-blue-500">
    Tú
  </Link>

  {/* Link para redirigir a /Explorar */}
  <Link href="/Explorar" className="hover:text-blue-500">
    Explorar
  </Link>

  {/* Enlace de adorno para Impresiones */}
  <a href="#" className="hover:text-blue-500">
    Impresiones
  </a>

  {/* Enlace de adorno para Hazte Pro */}
  <a href="#" className="hover:text-blue-500">
    Hazte Pro
  </a>
</div>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
          <input
            type="text"
            placeholder="Fotos, personas o grupos"
            className="bg-transparent outline-none text-white placeholder-gray-400 px-2 w-32 md:w-64"
            value={query}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="ml-2 hover:text-blue-500"
            aria-label="Buscar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Iconos y dropdown */}
      <div className="relative flex items-center space-x-4">
        <button className="hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586A2 2 0 1015.172 7z"
            />
          </svg>
        </button>

        {/* Dropdown */}
        <div className="relative">
          <Image
            src={userPhoto || "/default-avatar.png"} // Mostrar la foto de perfil o un avatar predeterminado
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md py-2">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={goToDashboard}
              >
                Dashboard
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarLoggedIn;
