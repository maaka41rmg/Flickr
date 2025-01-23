"use client";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const iniciarSesion = async () => {
    if (email === "" || password === "") {
      alert("Debes llenar todos los campos");
      return;
    }

    try {
      const respuesta = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", respuesta.user);
      router.push("/"); // Redirige al inicio
    } catch (error: any) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://static8.depositphotos.com/1591133/1054/i/600/depositphotos_10541952-stock-photo-scenic-nature-landscape-with-mountain.jpg')", // Ruta de la imagen
        backgroundSize: "cover", // Ajusta el tamaño de la imagen para cubrir toda la pantalla
        backgroundPosition: "center", // Centra la imagen
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
      }}
    >
      {/* Navbar */}
      <nav className="bg-[#232323] px-6 py-3 flex items-center justify-center border-b border-gray-700">
        <Link href="/" passHref>
          <Image
            src="https://combo.staticflickr.com/66a031f9fc343c5e42d965ca/66b3f60bcd82f68f2716490a_flickr%20horz%20logo-light.png"
            alt="Flickr Logo"
            width={189}
            height={42}
            className="cursor-pointer"
          />
        </Link>
      </nav>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Inicia Sesión
          </h2>

          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full px-4 py-2 mb-4 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 mb-6 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
            onClick={iniciarSesion}
          >
            Iniciar Sesión
          </button>

          <p className="text-center text-gray-600 mt-4">
            ¿No tienes una cuenta?{" "}
            <a href="/auth/register" className="text-blue-500 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */