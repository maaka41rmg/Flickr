"use client";
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [error, setError] = useState(""); // Manejo de errores
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        alert("El inicio de sesión fue cancelado.");
      } else {
        alert("Error al iniciar sesión con Google: " + error.message);
      }
    }
  };

  const registrarUsuario = async () => {
    if (!recaptchaVerified) {
      alert("Por favor verifica que no eres un robot.");
      return;
    }
    if (email === "" || password === "") {
      alert("Debes llenar todos los campos.");
      return;
    }
    if (!email.includes("@")) {
      alert("Por favor, introduce un correo válido.");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const respuesta = await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      setError("Error al registrarse: " + error.message);
    }
  };

  useEffect(() => {
    if (!document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    window.handleRecaptcha = () => {
      setRecaptchaVerified(true);
    };
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage:
          "url('https://static8.depositphotos.com/1591133/1054/i/600/depositphotos_10541952-stock-photo-scenic-nature-landscape-with-mountain.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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

      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Regístrate
          </h2>

          <button
            onClick={loginWithGoogle}
            className="flex items-center justify-center w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
          >
            <Image
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Registrarse con Google
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">O</span>
            </div>
          </div>

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

          <div
            className="g-recaptcha mb-4"
            data-sitekey="6LfP474qAAAAAE9TB1QosjU-c_45mheswigsmzRG"
            data-callback="handleRecaptcha"
          ></div>

          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
            onClick={registrarUsuario}
          >
            Registrarse
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="text-center text-gray-600 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
