export type TripType = 'Family' | 'Honeymoon' | 'Adventure' | 'Leisure' | 'Cultural' | 'International' | 'Custom';
export type RegionType = 'Domestic' | 'International';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  country: string;
  region: RegionType;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  description: string;
  bestTimeToVisit: string;
  duration: string;
  startingPriceINR: number;
  featured: boolean;
  categories: TripType[];
  highlights: string[];
  itinerarySummary: {
    day: number;
    title: string;
    description: string;
  }[];
  travelTips: string[];
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
  mealsIncluded: string;
  stay: string;
}

export interface TravelPackage {
  id: string;
  slug: string;
  title: string;
  destinationSlug: string;
  destinationName: string;
  durationDays: number;
  durationNights: number;
  durationLabel: string;
  startingPriceINR: number;
  tripType: TripType;
  region: RegionType;
  featured: boolean;
  heroImage: string;
  thumbnail: string;
  overview: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: PackageItineraryDay[];
  accommodationType: string;
  transportType: string;
  highlights: string[];
  cancellationPolicy: string[];
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  category: TripType;
  image: string;
  description: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  excerpt: string;
  content: string[];
}

export interface EnquirySubmission {
  id: string;
  referenceNumber: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Quoted' | 'Completed' | 'Cancelled';
  customerName: string;
  email: string;
  phone: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email';
  destination?: string;
  packageSlug?: string;
  departureCity?: string;
  travelDate?: string;
  flexibleDates?: boolean;
  durationDays?: number;
  adultsCount: number;
  childrenCount: number;
  budgetRange?: string;
  experiencePreferences?: string[];
  specialRequests?: string;
  adminNotes?: string;
}

export interface ReviewTestimonial {
  id: string;
  customerName: string;
  destination: string;
  travelDate: string;
  rating: number;
  comment: string;
  tripType: string;
}
