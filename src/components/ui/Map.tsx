"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

interface MapProps {
  location: string;
  zoom?: number;
}

const Map = ({ location, zoom = 14 }: MapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const encodedLocation = encodeURIComponent(location);
  
  // Coordenadas para Cascavel, Paraná
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-53.5451,-25.0359,-53.3657,-24.8963&layer=mapnik&marker=-24.9577,-53.4590`;
  
  // URL para o Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-[var(--color4)]">
      {/* Iframe do OpenStreetMap */}
      <iframe
        src={mapSrc}
        className={`w-full h-full border-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={handleIframeLoad}
        title={`Mapa de ${location}`}
        allowFullScreen
      ></iframe>

      {/* Estado de carregamento */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <FaMapMarkerAlt className="h-12 w-12 text-[var(--color1)] mb-4" />
            <div className="h-4 w-32 bg-[var(--color2)] rounded"></div>
          </div>
        </div>
      )}
      
      {/* Overlay com informações de localização - Botão OpenStreetMap removido */}
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--background)]/80 backdrop-blur-sm p-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-1">
            Localização
          </h3>
          <p className="text-[var(--foreground-muted)]">
            {location}
          </p>
          <p className="mt-2 text-[var(--color1)]">
            Disponível para trabalhos remotos globais
          </p>
          <div className="mt-2">
            <a 
              href={googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 bg-[var(--color1)] text-[var(--background)] text-sm rounded-md hover:bg-[var(--color3)] transition-colors"
            >
              Ver no Google Maps <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
