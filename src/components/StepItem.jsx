import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as LucideIcons from 'lucide-react';
import { GripVertical, X } from 'lucide-react';

// Pastel color rotation for step items
const stepColors = [
  { bg: 'bg-pink-100', icon: 'bg-pink-200', iconColor: 'text-pink-500' },
  { bg: 'bg-blue-100', icon: 'bg-blue-200', iconColor: 'text-blue-500' },
  { bg: 'bg-amber-100', icon: 'bg-amber-200', iconColor: 'text-amber-500' },
  { bg: 'bg-emerald-100', icon: 'bg-emerald-200', iconColor: 'text-emerald-500' },
  { bg: 'bg-purple-100', icon: 'bg-purple-200', iconColor: 'text-purple-500' },
];

export default function StepItem({ step, onRemove, showCheckbox, index = 0 }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = LucideIcons[step.icon] || LucideIcons.CircleDot;
  const colors = stepColors[index % stepColors.length];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-4 ${colors.bg} rounded-2xl p-4 md:p-5
        border-2 border-white/60 min-h-[88px] md:min-h-[96px]
        touch-manipulation shadow-sm
        ${isDragging ? 'dragging z-50 border-pink-300 shadow-xl' : ''}
      `}
    >
      {/* Drag handle */}
      <button
        className="no-print drag-handle p-3 text-gray-400 hover:text-gray-600 touch-manipulation rounded-xl hover:bg-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-7 h-7" />
      </button>

      {/* Icon */}
      <div className={`w-[72px] h-[72px] md:w-20 md:h-20 ${colors.icon} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <Icon className={`w-9 h-9 md:w-10 md:h-10 ${colors.iconColor}`} />
      </div>

      {/* Label */}
      <span className="flex-grow font-bold text-gray-700 text-xl md:text-2xl">
        {step.label}
      </span>

      {/* Checkbox (optional) - on the right side */}
      {showCheckbox && (
        <div className="w-8 h-8 border-3 border-gray-300 rounded-lg flex-shrink-0 bg-white print:border-gray-400" />
      )}

      {/* Delete button */}
      <button
        onClick={() => onRemove(step.id)}
        className="no-print p-3 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-2xl transition-colors touch-manipulation"
        aria-label={`Remove ${step.label}`}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}
