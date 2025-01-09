'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
  <div>
       <Image 
          className="w-10 h-10"
          src="https://combo.staticflickr.com/66a031f9fc343c5e42d965ca/66b3f60bcd82f68f2716490a_flickr%20horz%20logo-light.png"
          alt="Descripción de la imagen"
          layout="responsive"
          width={2000}
         height={2000} 
      />

</div>

      {/* Links */}
      <div className="flex space-x-8 text-gray-300 text-sm uppercase">
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#flickrpro" className="hover:text-white font-semibold">FlickrPro</a>
        <a href="#apps" className="hover:text-white">The Apps</a>
        <div 
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <a href="#company" className="hover:text-white flex items-center">
            Company <span className="ml-1 text-xs">▼</span>
          </a>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white shadow-lg rounded-md">
              <a href="#about" className="block px-4 py-2 hover:bg-gray-700">About Us</a>
              <a href="#careers" className="block px-4 py-2 hover:bg-gray-700">Careers</a>
              <a href="#contact" className="block px-4 py-2 hover:bg-gray-700">Contact</a>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-300 cursor-pointer hover:text-white">🔍</span>
        <a href="#login" className="text-gray-300 hover:text-white">Login</a>
        <a href="#signup" className="bg-pink-500 text-white py-1 px-4 rounded-md font-bold hover:bg-pink-400">
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
