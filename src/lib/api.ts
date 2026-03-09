const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function fetchJSON<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

async function postJSON<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export interface HotelRoomType {
  name: string;
  description: string;
  image?: string;
}

export interface HotelDistance {
  place: string;
  distance: string;
  duration: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  features: string[];
  roomTypes: HotelRoomType[];
  distances: HotelDistance[];
  mapCoordinates?: { lat: number; lng: number };
  starRating?: number;
  category?: string;
  tripAdvisorRating?: number;
  tripAdvisorReviews?: number;
  bookingComRating?: number;
  bookingComReviews?: number;
}

export interface Tour {
  id: string;
  name: string;
  duration: { days: number; nights: number };
  summary: string;
  route: string[];
  tags: string[];
  heroImage: string;
  highlights: string[];
  placesToStay: { location: string; hotel: string; type: string; image?: string }[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    image: string;
    location: string;
    activities: string[];
    accommodation?: string;
    hotelId?: string;
    hotelIds?: string[];
  }[];
  faqs?: { question: string; answer: string }[];
  parentTourName?: string;
  published?: boolean;
}

export interface DayTour {
  id: string;
  name: string;
  location: string;
  summary: string;
  overview: string;
  highlights: string[];
  heroImage: string;
  galleryImages: string[];
  duration: string;
  startsEnds: string;
  tourType: string;
  itinerary: { title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  tags: string[];
  published?: boolean;
}

function langParam(lang?: string): string {
  return lang && lang !== "en" ? `&lang=${lang}` : "";
}

export const api = {
  getTours: (lang?: string) =>
    fetchJSON<Tour[]>(`/api/tours?published=true${langParam(lang)}`),
  getTour: (id: string, lang?: string) =>
    fetchJSON<Tour>(`/api/tours/${id}?_=1${langParam(lang)}`),
  getSubPackages: (parentTourName: string, lang?: string) =>
    fetchJSON<Tour[]>(
      `/api/tours?published=true&parentTourName=${encodeURIComponent(parentTourName)}${langParam(lang)}`
    ),
  getDayTours: (lang?: string) =>
    fetchJSON<DayTour[]>(`/api/day-tours?published=true${langParam(lang)}`),
  getDayTour: (id: string, lang?: string) =>
    fetchJSON<DayTour>(`/api/day-tours/${id}?_=1${langParam(lang)}`),
  getHotel: (id: string) => fetchJSON<Hotel>(`/api/hotels/${id}`),

  submitContact: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    country?: string;
    countryOther?: string;
    whatsapp?: string;
    dates?: string;
    selectedPackage?: string;
    type?: string;
    tailorMade?: {
      title?: string;
      arrivalDate?: string;
      departureDate?: string;
      pickupPlace?: string;
      groupSize?: string;
      numAdults?: string;
      ageGroupAdults?: string[];
      numChildren?: string;
      ageGroupChildren?: string[];
      tourDuration?: string;
      accommodation?: string;
      budgetRange?: string;
      interests?: string[];
      specialRequirements?: string;
    };
  }) => postJSON("/api/contacts", data),

  submitBooking: (data: {
    tourId: string;
    tourName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    numberOfGuests: number;
    preferredDate: string;
    specialRequests?: string;
  }) => postJSON("/api/bookings", data),
};
