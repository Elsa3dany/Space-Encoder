import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delay?: number;
}

export default function StatsCard({ icon: Icon, label, value, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-blue-500/10 p-3">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}