import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';

interface DatePickerProps {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
}

export function DatePicker({ date, onSelect }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          'w-full justify-start text-left font-normal',
          !date && 'text-gray-400'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, 'PPP') : <span>Pick a date</span>}
      </Button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 rounded-md border border-gray-700 bg-gray-800 p-3">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(day) => {
              onSelect(day);
              setIsOpen(false);
            }}
            disabled={{ before: new Date() }}
            className="bg-gray-800 text-white"
            classNames={{
              day: 'text-white hover:bg-gray-700 rounded-md',
              selected: 'bg-blue-600',
            }}
          />
        </div>
      )}
    </div>
  );
}