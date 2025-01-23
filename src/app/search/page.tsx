"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    username: string;
  };
  description: string | null;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Para evitar múltiples solicitudes simultáneas

  const fetchImages = async () => {
    if (!searchQuery) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: searchQuery,
          page,
          per_page: 20,
        },
        headers: {
          Authorization: `Client-ID FOxWbdr4ZLAbLD8_WJPTeY7TaF9JImFxUEp1WnE0cSU`,
        },
      });

      if (response.data.results && Array.isArray(response.data.results)) {
        setImages((prevImages) => [...prevImages, ...response.data.results]); // Agregar nuevas imágenes al estado
      } else {
        setError("La respuesta de la API no tiene el formato esperado");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al buscar las imágenes. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
      setIsFetching(false); // Indicamos que la carga ha terminado
    }
  };

  useEffect(() => {
    fetchImages();
  }, [searchQuery, page]);

  const handleScroll = useCallback(() => {
    if (isLoading || isFetching) return; // Evitar solicitudes adicionales mientras cargamos imágenes

    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1); // Incrementamos la página para cargar más imágenes
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Manejar las teclas para navegar entre las imágenes
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      navigateToNextImage();
    } else if (e.key === "ArrowLeft") {
      navigateToPreviousImage();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedImage]);

  const navigateToNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const navigateToPreviousImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  // Modal para mostrar la imagen en grande
  const ImageModal = () => {
    if (!selectedImage) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <div 
          className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Botón de cerrar */}
          <button 
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagen en grande */}
          <div className="relative w-full" style={{ height: '70vh' }}>
            <Image
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || "Imagen seleccionada"}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Información de la imagen */}
          <div className="p-4 bg-white">
            <p className="text-gray-700">
              Fotografía por: {selectedImage.user.name} (@{selectedImage.user.username})
            </p>
            {selectedImage.description && (
              <p className="text-gray-600 mt-2">{selectedImage.description}</p>
            )}
          </div>

          {/* Navegación por teclas */}
          <div className="absolute top-1/2 left-0 p-4 cursor-pointer z-10" onClick={navigateToPreviousImage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="absolute top-1/2 right-0 p-4 cursor-pointer z-10" onClick={navigateToNextImage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabecera de resultados */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Búsqueda'}
        </h1>
        <p className="text-gray-600">
          {images.length} imágenes encontradas
        </p>
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-w-1 aspect-h-1 w-full" style={{ height: '200px' }}>
              <Image
                src={image.urls.small}
                alt={image.alt_description || "Imagen sin descripción"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {!isLoading && images.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No se encontraron resultados</h2>
          <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
        </div>
      )}

      {/* Modal de imagen */}
      <ImageModal />
    </div>
  );
};

export default SearchPage;
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */