import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { X, Search, Plus, Sparkles } from 'lucide-react';
import { stepLibrary, categories, getStepsByCategory } from '../data/steps';

// Available icons for custom steps
const customIcons = [
  'Star', 'Heart', 'Smile', 'ThumbsUp', 'Clock', 'Bell', 'Flag', 'Award',
  'Zap', 'Target', 'Gift', 'Camera', 'Music', 'Phone', 'Mail', 'Bookmark',
];

// Pastel colors for category pills
const categoryColors = {
  hygiene: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
  'getting-ready': 'bg-amber-100 text-amber-600 hover:bg-amber-200',
  meals: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200',
  activities: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
  sleep: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
  transitions: 'bg-pink-100 text-pink-600 hover:bg-pink-200',
};

export default function AddStepModal({ onClose, onAddStep }) {
  const [activeTab, setActiveTab] = useState('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customLabel, setCustomLabel] = useState('');
  const [customIcon, setCustomIcon] = useState('Star');

  const filteredSteps = searchQuery
    ? stepLibrary.filter((step) =>
        step.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
    ? getStepsByCategory(selectedCategory)
    : stepLibrary;

  const handleAddLibraryStep = (step) => {
    onAddStep(step);
    onClose();
  };

  const handleAddCustomStep = () => {
    if (!customLabel.trim()) return;

    const customStep = {
      id: `custom-${Date.now()}`,
      icon: customIcon,
      label: customLabel.trim(),
      category: 'custom',
    };

    onAddStep(customStep);
    onClose();
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
      <div className="modal-content bg-white w-full md:w-auto md:min-w-[550px] md:max-w-[650px] md:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-pink-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700">Add a Step</h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-pink-50 rounded-2xl transition-colors"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-gray-100">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-4 font-bold text-lg transition-colors ${
              activeTab === 'library'
                ? 'text-pink-500 border-b-3 border-pink-400 bg-pink-50/50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Step Library
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-4 font-bold text-lg transition-colors ${
              activeTab === 'custom'
                ? 'text-pink-500 border-b-3 border-pink-400 bg-pink-50/50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Create Your Own
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'library' ? (
            <>
              {/* Search */}
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a step..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategory(null);
                  }}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-lg bg-pink-50/30"
                />
              </div>

              {/* Category filters */}
              {!searchQuery && (
                <div className="flex flex-wrap gap-2 mb-5">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-base font-bold transition-all ${
                      !selectedCategory
                        ? 'bg-pink-400 text-white shadow-md'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => {
                    const Icon = LucideIcons[category.icon] || LucideIcons.CircleDot;
                    const isActive = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-base font-bold transition-all ${
                          isActive
                            ? 'bg-pink-400 text-white shadow-md'
                            : categoryColors[category.id] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredSteps.map((step) => {
                  const Icon = LucideIcons[step.icon] || LucideIcons.CircleDot;
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleAddLibraryStep(step)}
                      className="cute-button flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-2 border-transparent hover:border-pink-200 transition-all text-left"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="w-7 h-7 text-pink-500" />
                      </div>
                      <span className="font-bold text-gray-700 text-lg">{step.label}</span>
                    </button>
                  );
                })}
              </div>

              {filteredSteps.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-500">No steps found</p>
                  <p className="text-gray-400">Try a different search or create your own!</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Custom step form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-600 mb-2">
                    What's the step called?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Feed the fish"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    maxLength={30}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-lg bg-pink-50/30"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-600 mb-3">
                    Pick an icon
                  </label>
                  <div className="grid grid-cols-8 gap-3">
                    {customIcons.map((iconName) => {
                      const Icon = LucideIcons[iconName];
                      return (
                        <button
                          key={iconName}
                          onClick={() => setCustomIcon(iconName)}
                          className={`cute-button p-3 rounded-xl transition-all ${
                            customIcon === iconName
                              ? 'bg-pink-200 border-2 border-pink-400 shadow-md'
                              : 'bg-gray-50 border-2 border-transparent hover:bg-pink-50'
                          }`}
                        >
                          <Icon
                            className={`w-7 h-7 mx-auto ${
                              customIcon === iconName ? 'text-pink-600' : 'text-gray-500'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preview */}
                {customLabel && (
                  <div className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border-2 border-pink-100">
                    <p className="text-sm font-bold text-gray-500 mb-3">Preview:</p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        {(() => {
                          const Icon = LucideIcons[customIcon];
                          return <Icon className="w-8 h-8 text-pink-500" />;
                        })()}
                      </div>
                      <span className="font-bold text-gray-700 text-xl">{customLabel}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddCustomStep}
                  disabled={!customLabel.trim()}
                  className="cute-button w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-bold text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-7 h-7" />
                  Add This Step
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
