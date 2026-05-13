import { AnimatePresence } from 'framer-motion';
import ConfessionItem from './ConfessionItem';

export default function ConfessionFeed({ confessions, onEdit }) {
  if (confessions.length === 0) {
    return (
      <div className="text-center py-20 text-warm-500 bg-white/40 backdrop-blur-sm rounded-3xl border border-warm-100 border-dashed">
        <p className="text-xl font-medium mb-2">The cathedral is silent.</p>
        <p className="text-md">Be the first to unburden yourself.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="popLayout">
        {confessions.map((confession) => (
          <ConfessionItem
            key={confession.id}
            confession={confession}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
