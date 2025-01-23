import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"; // Importamos Image de Next.js

// Definimos una interfaz para tipar la respuesta de la API
interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null; // El alt puede ser nulo
}

const ImageSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para la carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  useEffect(() => {
    if (query) {
      const fetchImages = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: { query, per_page: 12 },
            headers: {
              Authorization: `Client-ID FOxWbdr4ZLAbLD8_WJPTeY7TaF9JImFxUEp1WnE0cSU`, // ¡REEMPLAZA ESTO!
            },
          });
          setImages(response.data.results);
        } catch (err: any) {
          console.error("Error al buscar imágenes:", err);
          setError("Error al buscar las imágenes. Inténtalo de nuevo más tarde.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchImages();
    } else {
      setImages([]); // Limpia las imágenes si el query está vacío
    }
  }, [query]); // El useEffect se ejecuta cada vez que cambia el query

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Busca imágenes..."
          className="border p-2 rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && <p>Cargando imágenes...</p>} {/* Mensaje de carga */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mensaje de error */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="border rounded overflow-hidden">
            {/* Usamos next/image */}
            <Image
              src={image.urls.small}
              alt={image.alt_description || "Imagen sin descripción"}
              width={200} // Ajusta el ancho según sea necesario
              height={200} // Ajusta el alto según sea necesario
              className="w-full h-40 object-cover"
              loading="lazy" // Mejora el rendimiento
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch; // Exportamos el componente para poder usarlo en otro archivo.
