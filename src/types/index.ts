export interface Planet {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  gravity: string;
  atmosphere: string;
  attractions: string[];
  imageUrl: string;
  description: string;
  cost: number;
}

export interface Seat {
  id: string;
  number: string;
  class: 'economy' | 'business' | 'first';
  available: boolean;
  price: number;
}

export interface BookingDetails {
  tripType: 'one-way' | 'round-trip';
  departureDate: string;
  returnDate?: string;
  passengers: number;
  selectedSeats: string[];
  planet: Planet;
}