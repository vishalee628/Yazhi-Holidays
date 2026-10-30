import { Destination, TravelPackage } from '../types';
import { DESTINATIONS, PACKAGES } from '../data/travelData';

const DESTINATIONS_KEY = 'yazhi_catalog_destinations';
const PACKAGES_KEY = 'yazhi_catalog_packages';

export const getCatalogDestinations = (): Destination[] => {
  try {
    const raw = localStorage.getItem(DESTINATIONS_KEY);
    if (!raw) {
      localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(DESTINATIONS));
      return DESTINATIONS;
    }
    return JSON.parse(raw);
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
    return JSON.parse(raw);
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

export const resetCatalogToDefault = (): void => {
  localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(DESTINATIONS));
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(PACKAGES));
};
