import * as LucideIcons from 'lucide-react';
import { Bookmark, Heart, Play, Trash2 } from 'lucide-react';
import { templateList } from '../data/templates';

const colorStyles = {
  yellow: {
    bg: 'bg-amber-100',
    hoverBg: 'hover:bg-amber-200',
    selectedBg: 'bg-amber-200',
    border: 'border-amber-400',
    icon: 'text-amber-500',
    selectedIcon: 'text-amber-600',
  },
  purple: {
    bg: 'bg-purple-100',
    hoverBg: 'hover:bg-purple-200',
    selectedBg: 'bg-purple-200',
    border: 'border-purple-400',
    icon: 'text-purple-500',
    selectedIcon: 'text-purple-600',
  },
  green: {
    bg: 'bg-emerald-100',
    hoverBg: 'hover:bg-emerald-200',
    selectedBg: 'bg-emerald-200',
    border: 'border-emerald-400',
    icon: 'text-emerald-500',
    selectedIcon: 'text-emerald-600',
  },
  pink: {
    bg: 'bg-pink-100',
    hoverBg: 'hover:bg-pink-200',
    selectedBg: 'bg-pink-200',
    border: 'border-pink-400',
    icon: 'text-pink-500',
    selectedIcon: 'text-pink-600',
  },
};

export default function TemplateSelector({
  onSelectTemplate,
  selectedTemplate,
  savedRoutines = [],
  onLoadSavedRoutine,
  onDeleteRoutine,
}) {
  return (
    <div className="no-print bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-6 border-2 border-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center">
        Pick Your Routine!
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {templateList.map((template) => {
          const Icon = LucideIcons[template.icon] || LucideIcons.CircleDot;
          const isSelected = selectedTemplate === template.id;
          const colors = colorStyles[template.color] || colorStyles.pink;

          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`
                cute-button flex flex-col items-center justify-center p-5 md:p-6 rounded-3xl
                min-h-[140px] md:min-h-[160px] transition-all duration-200
                touch-manipulation border-3
                ${isSelected
                  ? `${colors.selectedBg} border-4 ${colors.border} shadow-lg`
                  : `${colors.bg} border-transparent ${colors.hoverBg} hover:shadow-md`
                }
              `}
            >
              <div className={`mb-3 p-3 rounded-full ${isSelected ? 'bg-white/60' : 'bg-white/40'}`}>
                <Icon className={`w-10 h-10 md:w-12 md:h-12 ${isSelected ? colors.selectedIcon : colors.icon}`} />
              </div>
              <span className="font-bold text-base md:text-lg text-gray-700">{template.name}</span>
              <span className="text-sm text-gray-500 mt-1">{template.description}</span>
            </button>
          );
        })}
      </div>

      {/* Saved Routines Section */}
      {savedRoutines.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-pink-500" fill="currentColor" />
            Your Saved Routines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {savedRoutines.map((routine) => (
              <div
                key={routine.id}
                className="relative cute-button flex flex-row items-center gap-4 p-5 md:p-6 rounded-3xl min-h-[100px] transition-all duration-200 touch-manipulation border-3 bg-pink-100 border-transparent hover:bg-pink-200 hover:shadow-md cursor-pointer"
                onClick={() => onLoadSavedRoutine(routine)}
              >
                <div className="p-3 rounded-full bg-white/40 flex-shrink-0">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-pink-500" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-base md:text-lg text-gray-700 flex items-center gap-1.5">
                    <span className="p-1 rounded-full bg-white/60 flex-shrink-0">
                      <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
                    </span>
                    {routine.title}
                  </span>
                  <span className="text-sm text-gray-500 mt-1 block">
                    {routine.steps.length} steps
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteRoutine(routine.id);
                  }}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 transition-colors touch-manipulation flex-shrink-0"
                  aria-label={`Delete ${routine.title}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
