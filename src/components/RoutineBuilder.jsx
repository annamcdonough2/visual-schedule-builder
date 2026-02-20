import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import StepList from './StepList';
import Controls from './Controls';
import PrintPreview from './PrintPreview';
import AddStepModal from './AddStepModal';
import { generatePDF } from '../utils/pdf';

export default function RoutineBuilder({
  steps,
  setSteps,
  title,
  setTitle,
  onStartInteractive,
}) {
  const [showCheckbox, setShowCheckbox] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: title || 'My Routine',
  });

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setIsGeneratingPDF(true);
    try {
      await generatePDF(printRef.current, title || 'My Routine');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try printing instead.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleAddStep = (step) => {
    const uniqueStep = {
      ...step,
      id: `${step.id}-${Date.now()}`,
    };
    setSteps((prev) => [...prev, uniqueStep]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Controls */}
      <Controls
        title={title}
        setTitle={setTitle}
        showCheckbox={showCheckbox}
        setShowCheckbox={setShowCheckbox}
        onPrint={handlePrint}
        onDownloadPDF={handleDownloadPDF}
        onAddStep={() => setShowAddModal(true)}
        onStartInteractive={onStartInteractive}
        isGeneratingPDF={isGeneratingPDF}
        hasSteps={steps.length > 0}
      />

      {/* Editable step list */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-5 md:p-6 mb-6 border-2 border-white">
        <h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-5 no-print flex items-center gap-2">
          Your Routine
          <span className="text-base font-medium text-pink-400">({steps.length} steps)</span>
        </h2>
        <StepList
          steps={steps}
          setSteps={setSteps}
          showCheckbox={showCheckbox}
        />
      </div>

      {/* Hidden print preview (used for printing/PDF) */}
      <div className="hidden print:block">
        <PrintPreview
          ref={printRef}
          title={title}
          steps={steps}
          showCheckbox={showCheckbox}
        />
      </div>

      {/* Visible print preview (always rendered but hidden except for printing) */}
      <div className="fixed -left-[9999px]" aria-hidden="true">
        <PrintPreview
          ref={printRef}
          title={title}
          steps={steps}
          showCheckbox={showCheckbox}
        />
      </div>

      {/* Add step modal */}
      {showAddModal && (
        <AddStepModal
          onClose={() => setShowAddModal(false)}
          onAddStep={handleAddStep}
        />
      )}
    </div>
  );
}
