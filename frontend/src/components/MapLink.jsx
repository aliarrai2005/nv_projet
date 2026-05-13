import React from 'react';

const MapLink = ({ lat, lng, text }) => {
  if (!lat || !lng) return null;
  const url = `https://www.google.com/maps?q=${lat},${lng}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="map-link">
      {text || '📍 Voir sur Google Maps'}
    </a>
  );
};

export default MapLink;