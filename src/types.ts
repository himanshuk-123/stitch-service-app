export interface BrandConfig {
  name: string;
  tagline: string;
  logoUrl?: string;
  primaryColor: string; // hex
  secondaryColor: string;
  accentColor: string;
  currencySymbol: string;
  currencyCode: string;
  supportPhone: string;
  supportEmail: string;
  platformFee: number;
  taxRatePercent: number; // e.g. 9% + 9% or 18%
  appVersion: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  heroImage: string;
  heroSubtitle: string;
  active: boolean;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  subtitle?: string;
  startingPrice: number;
  durationMinutes: string; // "60–90 min"
  rating: number;
  reviewsCount: string; // "2.4k+"
  image: string;
  images: string[];
  professionalsCount: number;
  highlightChips: string[]; // ["1-2 Hours", "Up to 2 BHK", "Eco-friendly"]
  about: string;
  whatsIncluded: {
    title: string;
    description: string;
  }[];
  isPopular?: boolean;
}

export interface Professional {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  experienceYears: number;
  serviceCategoryIds: string[];
  serviceTitle: string; // "Home Deep Cleaning"
  price: number; // e.g. 799
  availabilityText: string; // "Available today, 2:00 PM onwards"
  isRecommended?: boolean;
  positiveRatingPercent: number; // 98
  bio: string;
  specializations: string[];
  credentials: string[];
  city: string;
  phone: string;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  authorInitials: string;
  city: string;
  rating: number;
  reviewText: string;
  date: string;
}

export interface Address {
  id: string;
  label: string; // "Home", "Work", "Other"
  street: string;
  city: string;
  state: string;
  pincode?: string;
  isDefault?: boolean;
}

export type SavedAddress = Address;

export type BookingStatus = 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string; // "FXR-260817-1042"
  serviceId: string;
  serviceTitle: string;
  serviceImage: string;
  professionalId: string;
  professionalName: string;
  professionalPhoto: string;
  date: string; // "Monday, 17 August"
  dateShort: string; // "Mon, 17 Aug"
  timeSlot: string; // "10:30 AM – 11:30 AM"
  location: string; // "Home, Jaipur, Rajasthan"
  addressDetails: Address;
  servicePrice: number;
  platformFee: number;
  taxes: number;
  totalAmount: number;
  paymentMethod: string; // "Cash / UPI after service"
  status: BookingStatus;
  createdAt: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  avatarText?: string;
  city: string;
  state: string;
  notificationsEnabled: boolean;
  savedAddresses: Address[];
}

export type ScreenType =
  | 'home'
  | 'explore'
  | 'service_detail'
  | 'choose_professional'
  | 'provider_detail'
  | 'select_datetime'
  | 'booking_summary'
  | 'booking_confirmed'
  | 'my_bookings'
  | 'profile'
  | 'login'
  | 'signup';

export interface BookingFlowState {
  serviceId: string;
  professionalId: string;
  selectedDate: string; // e.g. "2026-08-17"
  selectedDateLabel: string; // "Monday, 17 August"
  selectedTimeSlot: string; // "10:30 AM – 11:30 AM"
  addressId: string;
  paymentMethod: string; // "Cash / UPI after service"
  latestBookingId?: string;
}
