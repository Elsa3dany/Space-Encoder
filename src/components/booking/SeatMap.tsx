import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Seat } from '@/types';

interface SeatMapProps {
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const classes = ['first', 'business', 'economy'] as const;
  let id = 1;

  classes.forEach((seatClass, classIndex) => {
    const rows = seatClass === 'economy' ? 10 : 2;
    const seatsPerRow = seatClass === 'economy' ? 6 : 4;
    
    for (let row = 0; row < rows; row++) {
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatNumber = `${String.fromCharCode(65 + row)}${seat + 1}`;
        seats.push({
          id: String(id++),
          number: seatNumber,
          class: seatClass,
          available: Math.random() > 0.3,
          price: seatClass === 'first' ? 10000 : seatClass === 'business' ? 5000 : 2000,
        });
      }
    }
  });

  return seats;
};

const seats = generateSeats();

export function SeatMap({ selectedSeats, onSeatSelect }: SeatMapProps) {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const getSeatColor = (seat: Seat) => {
    if (!seat.available) return 'bg-gray-700 cursor-not-allowed';
    if (selectedSeats.includes(seat.id)) return 'bg-blue-600 hover:bg-blue-700';
    if (seat.class === 'first') return 'bg-purple-900 hover:bg-purple-800';
    if (seat.class === 'business') return 'bg-indigo-900 hover:bg-indigo-800';
    return 'bg-gray-800 hover:bg-gray-700';
  };

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="mb-6 flex justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-purple-900" />
            <span>First Class</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-indigo-900" />
            <span>Business</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-800" />
            <span>Economy</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-700" />
          <span>Unavailable</span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {seats.map((seat) => (
          <button
            key={seat.id}
            disabled={!seat.available}
            onClick={() => onSeatSelect(seat.id)}
            onMouseEnter={() => setHoveredSeat(seat.id)}
            onMouseLeave={() => setHoveredSeat(null)}
            className={cn(
              'relative h-10 rounded transition-colors',
              getSeatColor(seat)
            )}
          >
            <span className="text-xs">{seat.number}</span>
            {hoveredSeat === seat.id && seat.available && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs">
                ${seat.price.toLocaleString()}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}