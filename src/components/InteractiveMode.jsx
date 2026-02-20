import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Check, PartyPopper, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

// Pastel color rotation for step items
const stepColors = [
  { bg: 'bg-pink-100', completedBg: 'bg-pink-200', icon: 'bg-pink-200', iconColor: 'text-pink-500' },
  { bg: 'bg-blue-100', completedBg: 'bg-blue-200', icon: 'bg-blue-200', iconColor: 'text-blue-500' },
  { bg: 'bg-amber-100', completedBg: 'bg-amber-200', icon: 'bg-amber-200', iconColor: 'text-amber-500' },
  { bg: 'bg-emerald-100', completedBg: 'bg-emerald-200', icon: 'bg-emerald-200', iconColor: 'text-emerald-500' },
  { bg: 'bg-purple-100', completedBg: 'bg-purple-200', icon: 'bg-purple-200', iconColor: 'text-purple-500' },
];

function fireConfetti(originX = 0.5, originY = 0.6) {
  // Fire confetti from the click position
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { x: originX, y: originY },
    colors: ['#FFB5C5', '#B5D8FF', '#FFF3B5', '#B5FFD9', '#E0B5FF'],
    ticks: 150,
    gravity: 0.8,
    scalar: 1.2,
  });
}

function fireFinaleConfetti() {
  // Big celebration when all done!
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFB5C5', '#B5D8FF', '#FFF3B5', '#B5FFD9', '#E0B5FF'],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FFB5C5', '#B5D8FF', '#FFF3B5', '#B5FFD9', '#E0B5FF'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export default function InteractiveMode({ steps, title, onExit }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const allDone = completedSteps.size === steps.length;

  const handleStepClick = (stepId, event) => {
    if (completedSteps.has(stepId)) return;

    // Get click position for confetti origin
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Add to completed
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    setCompletedSteps(newCompleted);

    // Fire confetti
    fireConfetti(x, y);

    // Check if all done
    if (newCompleted.size === steps.length) {
      setTimeout(() => {
        fireFinaleConfetti();
      }, 300);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-white py-6 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {title || 'My Routine'}
          </h1>
          <p className="text-white/90 text-lg">
            {allDone ? "Amazing job! All done!" : "Tap each step when you're done!"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-500 ml-2">
              {completedSteps.size}/{steps.length}
            </span>
            <div className="flex-grow h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
              />
            </div>
            {allDone && <PartyPopper className="w-6 h-6 text-amber-500" />}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto px-4 py-2">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = LucideIcons[step.icon] || LucideIcons.CircleDot;
            const colors = stepColors[index % stepColors.length];
            const isCompleted = completedSteps.has(step.id);

            return (
              <button
                key={step.id}
                onClick={(e) => handleStepClick(step.id, e)}
                disabled={isCompleted}
                className={`
                  w-full flex items-center gap-4 rounded-2xl p-4 md:p-5
                  border-2 min-h-[88px] md:min-h-[96px]
                  touch-manipulation shadow-sm text-left
                  transition-all duration-300 ease-out
                  ${isCompleted
                    ? `${colors.completedBg} border-white/60 opacity-75 scale-[0.98]`
                    : `${colors.bg} border-white/60 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] cursor-pointer`
                  }
                `}
              >
                {/* Icon */}
                <div className={`w-[72px] h-[72px] md:w-20 md:h-20 ${colors.icon} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm relative`}>
                  <Icon className={`w-9 h-9 md:w-10 md:h-10 ${colors.iconColor} ${isCompleted ? 'opacity-50' : ''}`} />
                  {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
                      <Check className="w-10 h-10 text-emerald-500" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Label */}
                <span className={`flex-grow font-bold text-xl md:text-2xl ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {step.label}
                </span>

                {/* Checkbox */}
                <div className={`w-10 h-10 border-3 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors ${
                  isCompleted
                    ? 'bg-emerald-400 border-emerald-400'
                    : 'bg-white border-gray-300'
                }`}>
                  {isCompleted && <Check className="w-6 h-6 text-white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* All done message */}
        {allDone && (
          <div className="mt-8 text-center animate-bounce">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100 to-yellow-100 px-8 py-4 rounded-2xl shadow-lg">
              <PartyPopper className="w-10 h-10 text-amber-500" />
              <span className="text-2xl font-bold text-amber-700">Great job!</span>
              <PartyPopper className="w-10 h-10 text-amber-500" />
            </div>
          </div>
        )}
      </div>

      {/* Exit button */}
      <div className="fixed bottom-6 left-6">
        <button
          onClick={onExit}
          className="cute-button flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-sm text-gray-600 rounded-2xl shadow-lg hover:bg-white transition-all font-bold text-base border-2 border-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Edit
        </button>
      </div>
    </div>
  );
}
