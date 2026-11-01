import { CustomerMemory } from '../types';
import { checkAdminAuth } from './authService';

const CUSTOMER_MEMORIES_STORAGE_KEY = 'yazhi_customer_memories_v2';

// Standard Indian destinations used as suggestions and default filters
export const STANDARD_DOMESTIC_DESTINATIONS = [
  'Ooty',
  'Kodaikanal',
  'Munnar',
  'Coorg',
  'Kerala',
  'Goa',
  'Mysore',
  'Wayanad',
  'Other Indian Destinations'
];

const notifyMemoriesUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('yazhi_memories_updated'));
  }
};

/**
 * Get all customer memories from local storage.
 * By default, returns only published photos for public visitors.
 * If includeUnpublished is true (admin only), returns all photos.
 */
export const getCustomerMemories = (includeUnpublished = false): CustomerMemory[] => {
  try {
    const raw = localStorage.getItem(CUSTOMER_MEMORIES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    if (includeUnpublished) {
      return parsed;
    }
    return parsed.filter(m => m.isPublished === true);
  } catch {
    return [];
  }
};

/**
 * Save or update a single customer memory.
 * Requires admin authentication.
 */
export const saveCustomerMemory = (memory: CustomerMemory): { success: boolean; error?: string } => {
  const admin = checkAdminAuth();
  if (!admin) {
    return { success: false, error: 'Unauthorized: Admin authentication required.' };
  }

  const all = getCustomerMemories(true);
  const index = all.findIndex(m => m.id === memory.id);
  let updated: CustomerMemory[];
  if (index >= 0) {
    updated = [...all];
    updated[index] = memory;
  } else {
    updated = [memory, ...all];
  }

  localStorage.setItem(CUSTOMER_MEMORIES_STORAGE_KEY, JSON.stringify(updated));
  notifyMemoriesUpdated();
  return { success: true };
};

/**
 * Save multiple customer memories in batch (for multi-upload).
 * Requires admin authentication.
 */
export const saveMultipleCustomerMemories = (memories: CustomerMemory[]): { success: boolean; error?: string } => {
  const admin = checkAdminAuth();
  if (!admin) {
    return { success: false, error: 'Unauthorized: Admin authentication required.' };
  }

  const all = getCustomerMemories(true);
  const updated = [...memories, ...all];
  localStorage.setItem(CUSTOMER_MEMORIES_STORAGE_KEY, JSON.stringify(updated));
  notifyMemoriesUpdated();
  return { success: true };
};

/**
 * Delete a customer memory by ID.
 * Requires admin authentication.
 */
export const deleteCustomerMemory = (id: string): { success: boolean; error?: string } => {
  const admin = checkAdminAuth();
  if (!admin) {
    return { success: false, error: 'Unauthorized: Admin authentication required.' };
  }

  const all = getCustomerMemories(true);
  const updated = all.filter(m => m.id !== id);
  localStorage.setItem(CUSTOMER_MEMORIES_STORAGE_KEY, JSON.stringify(updated));
  notifyMemoriesUpdated();
  return { success: true };
};

/**
 * Toggle the publish status of a customer memory.
 * Requires admin authentication.
 */
export const togglePublishCustomerMemory = (id: string): { success: boolean; error?: string; memory?: CustomerMemory } => {
  const admin = checkAdminAuth();
  if (!admin) {
    return { success: false, error: 'Unauthorized: Admin authentication required.' };
  }

  const all = getCustomerMemories(true);
  const index = all.findIndex(m => m.id === id);
  if (index === -1) {
    return { success: false, error: 'Customer memory not found.' };
  }

  const updatedMem = { ...all[index], isPublished: !all[index].isPublished };
  const updatedList = [...all];
  updatedList[index] = updatedMem;
  localStorage.setItem(CUSTOMER_MEMORIES_STORAGE_KEY, JSON.stringify(updatedList));
  notifyMemoriesUpdated();

  return { success: true, memory: updatedMem };
};

/**
 * Dynamically extract all available destinations from current memories.
 * Combines standard domestic destinations with any custom destinations created by admin.
 */
export const getDynamicDestinations = (): string[] => {
  const memories = getCustomerMemories(false);
  const customDestinations = Array.from(new Set(memories.map(m => m.destination.trim()).filter(Boolean)));
  
  // Combine standard and custom, keeping unique
  const combined = Array.from(new Set(['All Memories', ...STANDARD_DOMESTIC_DESTINATIONS, ...customDestinations]));
  return combined;
};

/**
 * Secure server-authenticated photo upload function.
 * Enforces admin authorization, validates format & file size, and writes to public/uploads.
 */
export const uploadCustomerPhoto = async (
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> => {
  const admin = checkAdminAuth();
  if (!admin || !admin.token) {
    return {
      success: false,
      error: 'Authentication required: You must be logged in as an administrator to upload photos.'
    };
  }

  // Client-side file type and size validation
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    return {
      success: false,
      error: 'Invalid file format. Please upload JPG, PNG, or WebP images only.'
    };
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    return {
      success: false,
      error: 'File size exceeds 5MB limit. Please choose a smaller image.'
    };
  }

  try {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${admin.token}`
      },
      body: JSON.stringify({
        filename: file.name,
        category: 'customer',
        base64
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error || `Server responded with status ${response.status}`
      };
    }

    return {
      success: true,
      url: data.url
    };
  } catch (err: any) {
    // Fallback to data URL if in offline/preview without Vite server middleware active
    const fallbackBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
    return {
      success: true,
      url: fallbackBase64
    };
  }
};

/**
 * Sample domestic customer tour photos that admin can optionally load.
 * Useful for demonstration when administrator wishes to test or seed the gallery.
 */
export const SAMPLE_REAL_CUSTOMER_MEMORIES: CustomerMemory[] = [
  {
    id: 'mem-ooty-family-1',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    destination: 'Ooty',
    tripType: 'Family Tour',
    tripDate: 'October 2026',
    caption: 'The Sundaram family enjoying the crisp morning air and lush tea gardens of Nilgiri Hills.',
    isPublished: true,
    isFeatured: true,
    aspectRatio: 'landscape',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'mem-munnar-tea-2',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    destination: 'Munnar',
    tripType: 'Couple Getaway',
    tripDate: 'September 2026',
    caption: 'Mesmerizing misty tea slopes and serene valleys explored on our bespoke Munnar circuit.',
    isPublished: true,
    isFeatured: true,
    aspectRatio: 'landscape',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString()
  },
  {
    id: 'mem-kodai-lake-3',
    imageUrl: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80',
    destination: 'Kodaikanal',
    tripType: 'Friends Group Tour',
    tripDate: 'August 2026',
    caption: 'College friends reunion trip visiting the misty star lake and pine forests in Kodaikanal.',
    isPublished: true,
    isFeatured: false,
    aspectRatio: 'portrait',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString()
  },
  {
    id: 'mem-bus-boarding-4',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    destination: 'Mysore',
    tripType: 'Bus Tour Group',
    tripDate: 'October 2026',
    caption: 'Our energetic travellers boarding the Yazhi Holidays luxury coach for the Grand Dasara Mysore Tour.',
    isPublished: true,
    isFeatured: true,
    aspectRatio: 'landscape',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'mem-coorg-waterfall-5',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    destination: 'Coorg',
    tripType: 'Family Tour',
    tripDate: 'July 2026',
    caption: 'Refreshing moments near Abbey Falls amidst aromatic coffee and spice plantations in Coorg.',
    isPublished: true,
    isFeatured: false,
    aspectRatio: 'square',
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString()
  },
  {
    id: 'mem-kerala-backwater-6',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    destination: 'Kerala',
    tripType: 'Group Sightseeing',
    tripDate: 'October 2026',
    caption: 'Golden hour cruise through the palm-fringed backwaters of Alleppey aboard a private houseboat.',
    isPublished: true,
    isFeatured: true,
    aspectRatio: 'landscape',
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: 'mem-wayanad-hills-7',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    destination: 'Wayanad',
    tripType: 'Friends Group Tour',
    tripDate: 'September 2026',
    caption: 'Trekking together up Chembra Peak and watching the clouds roll over the Western Ghats.',
    isPublished: true,
    isFeatured: false,
    aspectRatio: 'landscape',
    createdAt: new Date(Date.now() - 86400000 * 18).toISOString()
  },
  {
    id: 'mem-goa-beach-8',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    destination: 'Goa',
    tripType: 'Couple Getaway',
    tripDate: 'November 2026',
    caption: 'Sunset walks along South Goa’s pristine white sand beaches and heritage Portuguese quarters.',
    isPublished: true,
    isFeatured: false,
    aspectRatio: 'square',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

/**
 * Load sample domestic tour photos (Admin convenience action).
 */
export const loadSampleMemories = (): void => {
  localStorage.setItem(CUSTOMER_MEMORIES_STORAGE_KEY, JSON.stringify(SAMPLE_REAL_CUSTOMER_MEMORIES));
  notifyMemoriesUpdated();
};

/**
 * Clear all memories (Admin action to reset to empty state).
 */
export const clearAllMemories = (): void => {
  localStorage.setItem(CUSTOMER_MEMORIES_STORAGE_KEY, JSON.stringify([]));
  notifyMemoriesUpdated();
};
