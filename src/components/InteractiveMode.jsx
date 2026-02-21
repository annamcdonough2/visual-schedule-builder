import { useState, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as LucideIcons from 'lucide-react';
import { Check, PartyPopper, ArrowLeft, GripVertical, Printer, Download, Pencil } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generatePDF } from '../utils/pdf';
import PrintPreview from './PrintPreview';

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

function SortableStep({ step, index, isCompleted, onToggle }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  // Track touch start to detect taps vs drags
  const touchStart = useRef({ x: 0, y: 0, time: 0 });
  const wasDragging = useRef(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = LucideIcons[step.icon] || LucideIcons.CircleDot;
  const colors = stepColors[index % stepColors.length];

  const handlePointerDown = (e) => {
    touchStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    wasDragging.current = false;
  };

  const handlePointerUp = (e) => {
    // Don't toggle if clicking on drag handle
    if (e.target.closest('.drag-handle')) return;

    // Check if this was a tap (not a drag)
    const dx = Math.abs(e.clientX - touchStart.current.x);
    const dy = Math.abs(e.clientY - touchStart.current.y);
    const dt = Date.now() - touchStart.current.time;

    // If moved more than 10px or was dragging, don't toggle
    if (dx > 10 || dy > 10 || isDragging || wasDragging.current) return;

    // If held for more than 300ms without moving much, it might be a drag attempt
    if (dt > 300) return;

    onToggle(step.id, e);
  };

  // Track if dragging started
  useEffect(() => {
    if (isDragging) {
      wasDragging.current = true;
    }
  }, [isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="button"
      tabIndex={0}
      className={`
        flex items-center gap-4 rounded-2xl p-4 md:p-5
        border-2 min-h-[88px] md:min-h-[96px]
        touch-manipulation shadow-sm text-left
        transition-all duration-300 ease-out cursor-pointer select-none
        ${isDragging ? 'z-50 shadow-xl scale-[1.02]' : ''}
        ${isCompleted
          ? `${colors.completedBg} border-white/60 opacity-75 scale-[0.98]`
          : `${colors.bg} border-white/60 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]`
        }
      `}
    >
      {/* Drag handle */}
      <button
        className="drag-handle p-3 text-gray-400 hover:text-gray-600 touch-manipulation rounded-xl hover:bg-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-7 h-7" />
      </button>

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
      <span className={`flex-grow font-bold text-xl md:text-2xl ${isCompleted ? 'text-gray-600 line-through' : 'text-gray-700'}`}>
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
    </div>
  );
}

export default function InteractiveMode({ steps, setSteps, title, onExit }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printRef = useRef(null);
  const allDone = completedSteps.size === steps.length && steps.length > 0;

  const handleDownloadPDF = async () => {
    if (!printRef.current || isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    try {
      await generatePDF(printRef.current, title || 'My Routine');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToggle = (stepId, event) => {
    const newCompleted = new Set(completedSteps);

    if (completedSteps.has(stepId)) {
      // Uncheck
      newCompleted.delete(stepId);
      setCompletedSteps(newCompleted);
    } else {
      // Check - fire confetti
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      newCompleted.add(stepId);
      setCompletedSteps(newCompleted);

      fireConfetti(x, y);

      // Check if all done
      if (newCompleted.size === steps.length) {
        setTimeout(() => {
          fireFinaleConfetti();
        }, 300);
      }
    }
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-white py-4 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {/* Edit button */}
          <button
            onClick={onExit}
            className="no-print p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Back to Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>

          {/* Title and subtitle */}
          <div className="flex-grow text-center">
            <h1 className="text-xl md:text-2xl font-bold">
              {title || 'My Routine'}
            </h1>
            <p className="text-white/90 text-sm">
              {allDone ? "Amazing job! All done!" : "Tap each step when you're done!"}
            </p>
          </div>

          {/* Print and Download icons */}
          <button
            onClick={() => window.print()}
            className="no-print p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Print"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="no-print p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
            aria-label="Download PDF"
          >
            <Download className={`w-5 h-5 ${isGeneratingPDF ? 'animate-pulse' : ''}`} />
          </button>
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
                style={{ width: `${steps.length > 0 ? (completedSteps.size / steps.length) * 100 : 0}%` }}
              />
            </div>
            {allDone && <PartyPopper className="w-6 h-6 text-amber-500" />}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto px-4 py-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={steps} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <SortableStep
                  key={step.id}
                  step={step}
                  index={index}
                  isCompleted={completedSteps.has(step.id)}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* All done message - centered overlay */}
        {allDone && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="animate-bounce pointer-events-auto">
              <div className="flex flex-col items-center gap-4 bg-gradient-to-r from-amber-100 to-yellow-100 px-12 py-8 rounded-3xl shadow-2xl border-4 border-amber-200">
                <div className="flex items-center gap-4">
                  <PartyPopper className="w-16 h-16 text-amber-500" />
                  <span className="text-4xl md:text-5xl font-bold text-amber-700">Great job!</span>
                  <PartyPopper className="w-16 h-16 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden print preview for PDF generation */}
      <div className="fixed -left-[9999px]" aria-hidden="true">
        <PrintPreview
          ref={printRef}
          title={title}
          steps={steps}
          showCheckbox={true}
        />
      </div>
    </div>
  );
}
