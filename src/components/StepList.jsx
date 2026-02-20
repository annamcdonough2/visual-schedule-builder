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
} from '@dnd-kit/sortable';
import StepItem from './StepItem';
import { Sparkles } from 'lucide-react';

export default function StepList({ steps, setSteps, showCheckbox }) {
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

  const handleRemove = (stepId) => {
    setSteps((items) => items.filter((item) => item.id !== stepId));
  };

  if (steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-10 h-10 text-pink-400" />
        </div>
        <p className="text-xl font-bold text-gray-500">No steps yet!</p>
        <p className="text-base text-gray-400 mt-1">Tap "Add Step" to build your routine</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={steps} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <StepItem
              key={step.id}
              step={step}
              index={index}
              onRemove={handleRemove}
              showCheckbox={showCheckbox}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
