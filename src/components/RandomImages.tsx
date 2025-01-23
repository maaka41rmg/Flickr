"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

const RandomImages: React.FC = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Estado para evitar múltiples solicitudes

  const fetchRandomImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://api.unsplash.com/photos/random", {
        params: { count: 12, page },
        headers: {
          Authorization: `Client-ID FOxWbdr4ZLAbLD8_WJPTeY7TaF9JImFxUEp1WnE0cSU`,
        },
      });
      setImages((prevImages) => [...prevImages, ...response.data]);
    } catch (err: any) {
      console.error("Error al obtener imágenes:", err);
      setError("Error al cargar las imágenes. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
      setIsFetching(false); // Indicamos que la carga ha terminado
    }
  };

  // Cargar imágenes cuando se monta el componente
  useEffect(() => {
    fetchRandomImages();
  }, [page]);

  const handleScroll = useCallback(() => {
    // Verifica si estamos cerca del final de la página
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !isLoading && !isFetching) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1); // Aumenta la página para cargar más imágenes
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-6 text-black">Explorar</h1>

      {isLoading && <p>Cargando imágenes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="border rounded overflow-hidden">
            <Image
              src={image.urls.small}
              alt={image.alt_description || "Imagen sin descripción"}
              width={200}
              height={200}
              className="w-full h-40 object-cover cursor-pointer"
              loading="lazy"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>

      {/* Indicador de carga adicional */}
      {isLoading && !isFetching && <div className="text-center mt-4">Cargando más imágenes...</div>}

      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-3xl mx-auto">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 text-white bg-red-500 p-2 rounded-full"
            >
              X
            </button>
            <div className="flex justify-between items-center">
              <button
                onClick={goToPreviousImage}
                disabled={selectedImageIndex === 0}
                className="text-white bg-gray-500 p-2 rounded-full"
              >
                &lt;
              </button>

              <Image
                src={images[selectedImageIndex].urls.regular}
                alt={images[selectedImageIndex].alt_description || "Imagen expandida"}
                width={800}
                height={800}
                className="object-contain"
              />

              <button
                onClick={goToNextImage}
                disabled={selectedImageIndex === images.length - 1}
                className="text-white bg-gray-500 p-2 rounded-full"
              >
                &gt;
              </button>
            </div>
            <div className="mt-4 text-center">
              <a
                href={images[selectedImageIndex].urls.regular}
                download
                className="text-blue-500 hover:underline"
              >
                Descargar imagen
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomImages;
