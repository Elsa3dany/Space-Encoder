import { Planet } from '@/types';
import { Rocket, Clock, Scale, Wind } from 'lucide-react';
import Button from './ui/Button';

interface PlanetCardProps {
  planet: Planet;
  onBook: (planet: Planet) => void;
}

export default function PlanetCard({ planet, onBook }: PlanetCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900 p-6 transition-transform hover:scale-105">
      <div className="absolute inset-0">
        <img
          src={planet.imageUrl}
          alt={planet.name}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-white">{planet.name}</h3>
        <p className="mt-2 text-gray-300">{planet.description}</p>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Rocket size={18} />
            <span>{planet.distance}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock size={18} />
            <span>{planet.travelTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Scale size={18} />
            <span>{planet.gravity}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Wind size={18} />
            <span>{planet.atmosphere}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-lg font-bold text-white">
            ${planet.cost.toLocaleString()}
          </div>
          <Button
            onClick={() => onBook(planet)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Book Journey
          </Button>
        </div>
      </div>
    </div>
  );
}