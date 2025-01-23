"use client";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
   const [userPhoto, setUserPhoto] = useState(null); // Para la foto de perfil

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/"); // Redirige al login si no está autenticado
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/register"); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Bienvenido, {user.displayName || "Usuario"}!
          </h2>
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <image
                src={userPhoto }
                alt="Foto de perfil"
                className="w-16 h-16 rounded-full shadow-md"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                <span className="text-xl font-bold">
                  {user.displayName?.[0] || "U"}
                </span>
              </div>
            )}
            <div>
              <p className="text-gray-700">
                <strong>Nombre:</strong> {user.displayName || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */