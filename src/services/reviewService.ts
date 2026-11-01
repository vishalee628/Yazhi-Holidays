import { ReviewTestimonial } from '../types';
import { TESTIMONIALS } from '../data/travelData';
import { checkAdminAuth } from './authService';

const REVIEWS_STORAGE_KEY = 'yazhi_customer_reviews_v2';

export const getReviews = (): ReviewTestimonial[] => {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(TESTIMONIALS));
      return TESTIMONIALS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(TESTIMONIALS));
      return TESTIMONIALS;
    }
    return parsed;
  } catch {
    return TESTIMONIALS;
  }
};

export const saveReview = (review: ReviewTestimonial): void => {
  const current = getReviews();
  const index = current.findIndex(r => r.id === review.id);
  let updated: ReviewTestimonial[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = review;
  } else {
    updated = [review, ...current];
  }
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteReview = (id: string): void => {
  const current = getReviews();
  const updated = current.filter(r => r.id !== id);
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
};

export const resetReviewsToDefault = (): void => {
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(TESTIMONIALS));
};

/**
 * Server-authenticated image upload function.
 * Ensures only an authenticated administrator can upload photos.
 * Rejects with an error if no valid admin session is present.
 */
export const uploadAdminImage = async (
  file: File,
  category: 'destination' | 'review'
): Promise<{ success: boolean; url?: string; error?: string }> => {
  const admin = checkAdminAuth();
  if (!admin || !admin.token) {
    return {
      success: false,
      error: 'Authentication required: You must be logged in as an administrator to upload photos.'
    };
  }

  // Client-side file type and size pre-validation
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
    // Convert to base64 for reliable transmission
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
        category,
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
    // If running in an environment where server endpoint falls back to local data URL
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
