// Normalized campsites export that ensures consistent shape
// - images: array of objects { url, caption, credit }
// - coverImage: string url always present
// - mapLink/weatherLink computed; coordinates preserved if present
// - location/description fallbacks

import raw from './campsiteData';

function toImageObject(entry, idx, name) {
  if (typeof entry === 'string') {
    return { url: entry, caption: idx === 0 ? name : `${name} ${idx + 1}` };
  }
  if (entry && typeof entry === 'object' && entry.url) {
    return {
      url: entry.url,
      caption: entry.caption || (idx === 0 ? name : `${name} ${idx + 1}`),
      credit: entry.credit || undefined,
    };
  }
  return null;
}

function normalize(c) {
  const name = c.name || 'Campsite';
  const imagesRaw = Array.isArray(c.images) ? c.images : (c.image ? [c.image] : []);
  const images = imagesRaw
    .map((it, idx) => toImageObject(it, idx, name))
    .filter(Boolean);
  const coverImage = c.coverImage || images[0]?.url || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop';
  const location = c.location && String(c.location).trim().length > 0 ? c.location : 'Location coming soon';
  const description = c.description && String(c.description).trim().length > 0 ? c.description : `Experience ${name} — book your stay and explore the outdoors.`;

  const hasCoords = Array.isArray(c.coordinates) && c.coordinates.length === 2 && typeof c.coordinates[0] === 'number' && typeof c.coordinates[1] === 'number';
  const computedMapLink = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${c.coordinates[0]},${c.coordinates[1]}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${location}`.trim())}`;
  const computedWeatherLink = hasCoords
    ? `https://openweathermap.org/weathermap?basemap=map&cities=true&lat=${c.coordinates[0]}&lon=${c.coordinates[1]}&zoom=8`
    : `https://www.google.com/search?q=${encodeURIComponent(`${name || location || 'campsite'} weather`)}`;

  return {
    ...c,
    location,
    description,
    images,
    coverImage,
    mapLink: c.mapLink || computedMapLink,
    weatherLink: c.weatherLink || computedWeatherLink,
  };
}

const campsites = (Array.isArray(raw) ? raw : []).map(normalize);
export default campsites;
