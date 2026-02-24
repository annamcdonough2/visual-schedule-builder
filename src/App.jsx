import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from './components/Header';
import TemplateSelector from './components/TemplateSelector';
import RoutineBuilder from './components/RoutineBuilder';
import InteractiveMode from './components/InteractiveMode';
import InstallPrompt from './components/InstallPrompt';
import { templates } from './data/templates';
import { getSavedRoutines, saveRoutine, deleteRoutine } from './utils/storage';

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState('');
  const [isInteractive, setIsInteractive] = useState(false);
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    setSavedRoutines(getSavedRoutines());
  }, []);

  const handleSelectTemplate = (templateId) => {
    const template = templates[templateId];
    if (!template) return;

    setSelectedTemplate(templateId);
    setTitle(template.defaultTitle);

    // Create unique IDs for each step instance
    const stepsWithUniqueIds = template.steps.map((step, index) => ({
      ...step,
      id: `${step.id}-${index}`,
    }));

    setSteps(stepsWithUniqueIds);
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setSteps([]);
    setTitle('');
    setIsInteractive(false);
    setSaveStatus(null);
    setSavedRoutines(getSavedRoutines());
  };

  const handleSaveRoutine = () => {
    if (!title.trim() || steps.length === 0) return;

    const result = saveRoutine({ title, steps });
    if (result.success) {
      setSaveStatus('saved');
      setSavedRoutines(getSavedRoutines());
      setTimeout(() => setSaveStatus(null), 3000);
    } else if (result.reason === 'limit') {
      setSaveStatus('limit');
    }
  };

  const handleLoadSavedRoutine = (routine) => {
    setTitle(routine.title);
    setSteps(routine.steps);
    setSelectedTemplate('saved');
    setIsInteractive(true);
  };

  const handleDeleteRoutine = (id) => {
    deleteRoutine(id);
    setSavedRoutines(getSavedRoutines());
  };

  // Interactive mode - full screen experience
  if (isInteractive) {
    return (
      <InteractiveMode
        steps={steps}
        setSteps={setSteps}
        title={title}
        onExit={() => setIsInteractive(false)}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pb-24">
        {!selectedTemplate ? (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <TemplateSelector
              onSelectTemplate={handleSelectTemplate}
              selectedTemplate={selectedTemplate}
              savedRoutines={savedRoutines}
              onLoadSavedRoutine={handleLoadSavedRoutine}
              onDeleteRoutine={handleDeleteRoutine}
            />
          </div>
        ) : (
          <>
            <RoutineBuilder
              steps={steps}
              setSteps={setSteps}
              title={title}
              setTitle={setTitle}
              onStartInteractive={() => setIsInteractive(true)}
              onSaveRoutine={handleSaveRoutine}
              saveStatus={saveStatus}
            />

            {/* Reset button */}
            <div className="no-print fixed bottom-6 left-6">
              <button
                onClick={handleReset}
                className="cute-button flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-sm text-gray-600 rounded-2xl shadow-lg hover:bg-white transition-all font-bold text-base border-2 border-white"
              >
                <ArrowLeft className="w-5 h-5" />
                Start Over
              </button>
            </div>
          </>
        )}
      </main>

      <InstallPrompt />
    </div>
  );
}
