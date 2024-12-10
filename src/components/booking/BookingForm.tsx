import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { SeatMap } from './SeatMap';
import Button from '../ui/Button';
import { Planet, BookingDetails } from '@/types';
import { generateTicket } from '@/lib/generateTicket';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  planet: Planet;
  onClose: () => void;
}

export function BookingForm({ planet, onClose }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isGeneratingTicket, setIsGeneratingTicket] = useState(false);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmBooking = async () => {
    if (!departureDate) return;

    setIsGeneratingTicket(true);
    try {
      const bookingDetails: BookingDetails = {
        tripType,
        departureDate: departureDate.toISOString(),
        returnDate: returnDate?.toISOString(),
        passengers: selectedSeats.length,
        selectedSeats,
        planet,
      };

      const doc = await generateTicket(bookingDetails);
      doc.save(`space-encoder-ticket-${planet.name.toLowerCase()}.pdf`);
      onClose();
    } catch (error) {
      console.error('Failed to generate ticket:', error);
    } finally {
      setIsGeneratingTicket(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between">
        {['Journey Details', 'Seat Selection', 'Review'].map((label, index) => (
          <div
            key={label}
            className={cn(
              'flex items-center',
              index < step && 'text-blue-500',
              index === step - 1 && 'font-bold'
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2',
                index < step
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-600'
              )}
            >
              {index + 1}
            </div>
            <span className="ml-2">{label}</span>
            {index < 2 && (
              <div
                className={cn(
                  'mx-4 h-0.5 w-12',
                  index < step - 1 ? 'bg-blue-500' : 'bg-gray-600'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Trip Type</label>
              <div className="flex gap-4">
                <Button
                  variant={tripType === 'one-way' ? 'primary' : 'outline'}
                  onClick={() => setTripType('one-way')}
                >
                  One Way
                </Button>
                <Button
                  variant={tripType === 'round-trip' ? 'primary' : 'outline'}
                  onClick={() => setTripType('round-trip')}
                >
                  Round Trip
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Departure Date</label>
              <DatePicker date={departureDate} onSelect={setDepartureDate} />
            </div>

            {tripType === 'round-trip' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Return Date</label>
                <DatePicker
                  date={returnDate}
                  onSelect={setReturnDate}
                />
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Select Your Seats</h3>
            <SeatMap
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Review Your Journey</h3>
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Destination</dt>
                  <dd>{planet.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Trip Type</dt>
                  <dd className="capitalize">{tripType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Departure</dt>
                  <dd>{departureDate?.toLocaleDateString()}</dd>
                </div>
                {tripType === 'round-trip' && returnDate && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Return</dt>
                    <dd>{returnDate.toLocaleDateString()}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-400">Selected Seats</dt>
                  <dd>{selectedSeats.length}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-4">
                  <dt className="text-lg font-medium">Total Cost</dt>
                  <dd className="text-lg font-bold">
                    ${(planet.cost * selectedSeats.length).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={step === 1 ? onClose : handleBack}
          disabled={isGeneratingTicket}
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>
        <Button
          onClick={step === 3 ? handleConfirmBooking : handleNext}
          disabled={
            isGeneratingTicket ||
            (step === 1 && !departureDate) ||
            (step === 2 && selectedSeats.length === 0)
          }
        >
          {isGeneratingTicket
            ? 'Generating Ticket...'
            : step === 3
            ? 'Confirm Booking'
            : 'Continue'}
        </Button>
      </div>
    </div>
  );
}