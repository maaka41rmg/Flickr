import React from "react";
import Image from "next/image"; // Si usas Next.js
import Link from "next/link"; // Importa Link correctamente
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
const Page = () => {
  return (
    <div className="bg-[#232323] min-h-screen text-white flex flex-col items-center">
      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-start w-full gap-8">
        {/* Left Section: Text */}
        <div className="flex-1 lg:flex lg:justify-start">
          <div className="text-left pl-0 lg:pl-8">
            <h1 className="text-6xl lg:text-8xl font-extrabold leading-tight tracking-tight transition-transform duration-300 group-hover:opacity-100 group-hover:scale-105 transform opacity-90 scale-100">
              The best <br />
              place to be a <br />
              photographer <br />
              online.
            </h1>
            <Link href="/auth/register">
              <button className="mt-8 bg-pink-500 text-white py-4 px-8 rounded-md text-xl font-bold hover:bg-pink-400 transition duration-300">
                JOIN FOR FREE
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Images */}
        <div className="flex-1 flex flex-col items-end">
          {/* Primera Imagen */}
          <div className="relative group">
            <Image
              src="https://combo.staticflickr.com/66a031f9fc343c5e42d965ca/66ba7c9da1c31a04c651ee06_Hero%201-p-500.avif"
              alt="Photographer with camera"
              width={329}
              height={308}
              className="rounded-lg shadow-lg group-hover:grayscale-0 filter grayscale transition duration-300"
            />
            <p className="mt-2 text-sm text-gray-400 text-center">Alwen KLIM</p>
          </div>

          {/* Segunda Imagen */}
          <div className="relative group">
            <Image
              src="https://combo.staticflickr.com/66a031f9fc343c5e42d965ca/66ba7f8b6ce1b219366751dd_Hero%202-p-500.avif"
              alt="Smiling photographer"
              width={400}
              height={221}
              className="rounded-lg shadow-lg group-hover:grayscale-0 filter grayscale transition duration-300"
            />
            <p className="mt-2 text-sm text-gray-400 text-center">Ave Kalvan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
