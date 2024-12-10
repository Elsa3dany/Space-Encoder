import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { BookingDetails } from '@/types';
import { format } from 'date-fns';

export async function generateTicket(booking: BookingDetails) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a5',
  });

  // Set background color
  doc.setFillColor(17, 24, 39);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

  // Add logo and header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Space Encoder', 20, 20);

  // Add booking details
  doc.setFontSize(12);
  doc.text(`Destination: ${booking.planet.name}`, 20, 40);
  doc.text(
    `Departure: ${format(new Date(booking.departureDate), 'PPP')}`,
    20,
    50
  );
  if (booking.returnDate) {
    doc.text(`Return: ${format(new Date(booking.returnDate), 'PPP')}`, 20, 60);
  }
  doc.text(`Trip Type: ${booking.tripType}`, 20, 70);
  doc.text(`Passengers: ${booking.passengers}`, 20, 80);
  doc.text(`Selected Seats: ${booking.selectedSeats.join(', ')}`, 20, 90);

  // Generate QR code
  const qrData = JSON.stringify({
    id: Math.random().toString(36).substr(2, 9),
    destination: booking.planet.name,
    departure: booking.departureDate,
    seats: booking.selectedSeats,
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    width: 100,
    margin: 1,
    color: {
      dark: '#ffffff',
      light: '#111827',
    },
  });

  // Add QR code
  doc.addImage(
    qrCodeDataUrl,
    'PNG',
    doc.internal.pageSize.width - 50,
    20,
    30,
    30
  );

  // Add decorative elements
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.line(20, 30, doc.internal.pageSize.width - 20, 30);

  return doc;
}