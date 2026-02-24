import { Printer, Download, CheckSquare, Square, Plus, Play, Save } from 'lucide-react';

export default function Controls({
  title,
  setTitle,
  showCheckbox,
  setShowCheckbox,
  onPrint,
  onDownloadPDF,
  onAddStep,
  onStartInteractive,
  onSaveRoutine,
  saveStatus,
  isGeneratingPDF,
  hasSteps,
}) {
  return (
    <div className="no-print bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-5 md:p-6 mb-6 border-2 border-white">
      {/* Title input */}
      <div className="mb-5">
        <label htmlFor="routine-title" className="block text-lg font-bold text-gray-600 mb-2">
          Give it a name!
        </label>
        <input
          id="routine-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Emma's Morning Routine"
          maxLength={50}
          className="w-full px-5 py-4 rounded-2xl border-3 border-pink-200 focus:border-pink-400 focus:outline-none text-xl font-medium bg-pink-50/50 placeholder:text-gray-400"
        />
      </div>

      {/* Let's Go button - prominent when there are steps */}
      {hasSteps && (
        <div className="mb-5">
          <button
            onClick={onStartInteractive}
            className="cute-button w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-white hover:from-emerald-500 hover:to-teal-500 transition-all touch-manipulation font-bold text-xl shadow-lg"
          >
            <Play className="w-8 h-8" fill="currentColor" />
            <span>Let's Go!</span>
          </button>
        </div>
      )}

      {/* Options row */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Checkbox toggle */}
        <button
          onClick={() => setShowCheckbox(!showCheckbox)}
          className="cute-button flex items-center gap-3 px-5 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 transition-colors touch-manipulation"
        >
          {showCheckbox ? (
            <CheckSquare className="w-7 h-7 text-purple-500" />
          ) : (
            <Square className="w-7 h-7 text-gray-400" />
          )}
          <span className="text-base font-bold text-gray-700">
            Checkboxes
          </span>
        </button>

        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onAddStep}
            className="cute-button flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-200 text-emerald-700 hover:bg-emerald-300 transition-colors touch-manipulation font-bold text-base shadow-sm"
          >
            <Plus className="w-7 h-7" />
            <span>Add Step</span>
          </button>

          <button
            onClick={onSaveRoutine}
            disabled={!hasSteps || !title.trim()}
            className="cute-button flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-200 text-amber-700 hover:bg-amber-300 transition-colors touch-manipulation font-bold text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-7 h-7" />
            <span>Save</span>
          </button>

          <button
            onClick={onPrint}
            className="cute-button flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-300 text-blue-700 hover:bg-blue-400 transition-colors touch-manipulation font-bold text-base shadow-sm"
          >
            <Printer className="w-7 h-7" />
            <span>Print</span>
          </button>

          <button
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="cute-button flex items-center gap-2 px-5 py-3 rounded-2xl bg-pink-300 text-pink-700 hover:bg-pink-400 transition-colors touch-manipulation font-bold text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-7 h-7" />
            <span>{isGeneratingPDF ? 'Creating...' : 'PDF'}</span>
          </button>
        </div>
      </div>

      {/* Save status feedback */}
      {saveStatus === 'saved' && (
        <div className="mt-4 text-center text-amber-600 font-medium">
          Saved on this device!
        </div>
      )}
      {saveStatus === 'limit' && (
        <div className="mt-4 text-center text-amber-600 font-medium">
          You can save up to 2 routines. Delete one to save a new one!
        </div>
      )}
    </div>
  );
}
