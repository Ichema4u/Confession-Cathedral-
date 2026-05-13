import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Check, X } from 'lucide-react';

export default function ConfessionItem({ confession, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(confession.text);

  const charLimit = 150;
  const isLong = confession.text.length > charLimit;
  const displayText = isExpanded ? confession.text : confession.text.slice(0, charLimit);

  const handleSave = () => {
    if (editText.trim() === '') return;
    onEdit(confession.id, editText.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(confession.text);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-lg border border-warm-100 mb-6 hover:shadow-xl transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-warm-900 text-lg">{confession.nickname}</h3>
          <span className="text-xs text-warm-500 font-medium tracking-wide uppercase">
            {formatDistanceToNow(new Date(confession.timestamp), { addSuffix: true })}
            {confession.isEdited && ' (edited)'}
          </span>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-warm-400 hover:text-warm-700 transition-colors p-2 rounded-full hover:bg-warm-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Edit confession"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-warm-50 border border-warm-200 focus:outline-none focus:ring-2 focus:ring-warm-500 transition-all resize-none min-h-[100px] mb-3 text-warm-800"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-4 py-2 rounded-full text-warm-600 hover:bg-warm-100 transition-colors text-sm font-semibold"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={editText.trim() === '' || editText.length > 280}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-warm-800 text-warm-50 hover:bg-warm-900 transition-colors text-sm font-semibold disabled:opacity-50"
              >
                <Check size={16} /> Save
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-warm-800 leading-relaxed whitespace-pre-wrap text-[1.05rem]">
              {displayText}
              {isLong && !isExpanded && (
                <span className="text-warm-400">...</span>
              )}
            </p>
            {isLong && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-warm-600 font-semibold text-sm hover:text-warm-900 transition-colors underline decoration-warm-300 decoration-2 underline-offset-4"
              >
                {isExpanded ? 'Show less' : 'View more'}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
