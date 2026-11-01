import { Destination, TravelPackage } from '../types';
import { DESTINATIONS, PACKAGES } from '../data/travelData';

const DESTINATIONS_KEY = 'yazhi_catalog_destinations_v2';
const PACKAGES_KEY = 'yazhi_catalog_packages_v2';

export const getCatalogDestinations = (): Destination[] => {
  try {
    const raw = localStorage.getItem(DESTINATIONS_KEY);
    if (!raw) {
      localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(DESTINATIONS));
      return DESTINATIONS;
    }
    const parsed: Destination[] = JSON.parse(raw);
    // Sanity check: Ensure legacy international items are cleared
    const hasLegacy = parsed.some(d => d.region === 'International' || d.country !== 'India');
    if (hasLegacy || !Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(DESTINATIONS));
      return DESTINATIONS;
    }
    return parsed;
  } catch {
    return DESTINATIONS;
  }
};

export const getCatalogPackages = (): TravelPackage[] => {
  try {
    const raw = localStorage.getItem(PACKAGES_KEY);
    if (!raw) {
      localStorage.setItem(PACKAGES_KEY, JSON.stringify(PACKAGES));
      return PACKAGES;
    }
    const parsed: TravelPackage[] = JSON.parse(raw);
    const hasLegacy = parsed.some(p => p.region === 'International');
    if (hasLegacy || !Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PACKAGES_KEY, JSON.stringify(PACKAGES));
      return PACKAGES;
    }
    return parsed;
  } catch {
    return PACKAGES;
  }
};

export const saveCatalogPackage = (pkg: TravelPackage): void => {
  const current = getCatalogPackages();
  const index = current.findIndex(p => p.id === pkg.id);
  let updated: TravelPackage[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = pkg;
  } else {
    updated = [pkg, ...current];
  }
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(updated));
};

export const deleteCatalogPackage = (id: string): void => {
  const current = getCatalogPackages();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(updated));
};

export const saveCatalogDestination = (dest: Destination): void => {
  const current = getCatalogDestinations();
  const index = current.findIndex(d => d.id === dest.id);
  let updated: Destination[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = dest;
  } else {
    updated = [dest, ...current];
  }
  localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(updated));
};

export const deleteCatalogDestination = (id: string): void => {
  const current = getCatalogDestinations();
  const updated = current.filter(d => d.id !== id);
  localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(updated));
};

export const updateDestinationPhotos = (
  destinationId: string,
  photos: { heroImage?: string; thumbnail?: string; gallery?: string[] }
): void => {
  const current = getCatalogDestinations();
  const target = current.find(d => d.id === destinationId);
  if (!target) return;

  const updated: Destination = {
    ...target,
    heroImage: photos.heroImage !== undefined ? photos.heroImage : target.heroImage,
    thumbnail: photos.thumbnail !== undefined ? photos.thumbnail : target.thumbnail,
    gallery: photos.gallery !== undefined ? photos.gallery : target.gallery
  };
  saveCatalogDestination(updated);
};

export const addDestinationGalleryPhoto = (destinationId: string, photoUrl: string): void => {
  const current = getCatalogDestinations();
  const target = current.find(d => d.id === destinationId);
  if (!target) return;
  const currentGallery = target.gallery || [];
  if (!currentGallery.includes(photoUrl)) {
    updateDestinationPhotos(destinationId, {
      gallery: [...currentGallery, photoUrl]
    });
  }
};

export const removeDestinationGalleryPhoto = (destinationId: string, photoUrl: string): void => {
  const current = getCatalogDestinations();
  const target = current.find(d => d.id === destinationId);
  if (!target || !target.gallery) return;
  updateDestinationPhotos(destinationId, {
    gallery: target.gallery.filter(url => url !== photoUrl)
  });
};

export const resetCatalogToDefault = (): void => {
  localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(DESTINATIONS));
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(PACKAGES));
};
