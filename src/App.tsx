import { useState } from 'react';
import { Rocket, Users, Clock, Gauge } from 'lucide-react';
import { planets } from './data/planets';
import { Planet } from './types';
import PlanetCard from './components/PlanetCard';
import BookingModal from './components/BookingModal';
import StatsCard from './components/StatsCard';
import StarField from './components/StarField';
import Meteors from './components/Meteors';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <StarField />
      <Meteors />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold">Space Encoder</span>
          </div>
          <nav className="flex gap-6">
            <a href="#destinations" className="text-gray-300 hover:text-white">
              Destinations
            </a>
            <a href="#stats" className="text-gray-300 hover:text-white">
              Statistics
            </a>
            <a href="#about" className="text-gray-300 hover:text-white">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Your Journey to the Stars Begins Here
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            Experience the thrill of space travel with our premium interplanetary
            transportation services. Choose your destination and embark on the
            adventure of a lifetime.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={Rocket}
              label="Successful Launches"
              value="1,248"
              delay={0}
            />
            <StatsCard
              icon={Users}
              label="Space Travelers"
              value="15,742"
              delay={0.1}
            />
            <StatsCard
              icon={Clock}
              label="Hours in Space"
              value="2.5M"
              delay={0.2}
            />
            <StatsCard
              icon={Gauge}
              label="Distance Covered"
              value="8.3B km"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="mb-12 text-3xl font-bold">Available Destinations</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {planets.map((planet) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onBook={setSelectedPlanet}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">About Space Encoder</h2>
              <p className="mt-6 text-gray-300">
                Space Encoder is the leading provider of commercial space travel
                services, offering unforgettable journeys to various celestial
                destinations. Our state-of-the-art spacecraft and experienced crew
                ensure safe and comfortable travels across the solar system.
              </p>
              <p className="mt-4 text-gray-300">
                With over a decade of experience in space tourism, we've
                successfully transported thousands of adventurers to Mars, Europa,
                and beyond. Our commitment to safety, comfort, and innovation has
                made us the most trusted name in space travel.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80"
                alt="Space"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
        planet={selectedPlanet}
      />
    </div>
  );
}

export default App;