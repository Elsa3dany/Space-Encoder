import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Planet } from '@/types';
import { BookingForm } from './booking/BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planet: Planet | null;
}

export default function BookingModal({ isOpen, onClose, planet }: BookingModalProps) {
  if (!planet) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900 p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-2xl font-bold text-white">
                    Book Your Journey to {planet.name}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-6">
                  <BookingForm planet={planet} onClose={onClose} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}