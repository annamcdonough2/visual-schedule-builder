import { useState, useEffect } from 'react';
import { X, Share, PlusSquare, MoreVertical, Download } from 'lucide-react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState(null); // 'ios' | 'android' | null

  useEffect(() => {
    // Check if already dismissed
    if (localStorage.getItem('installPromptDismissed')) {
      return;
    }

    // Check if already installed (running in standalone mode)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    // Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      // Only show for Safari on iOS (other browsers can't add to homescreen)
      const isSafari = /safari/.test(userAgent) && !/crios|fxios|opios|mercury/.test(userAgent);
      if (isSafari) {
        setPlatform('ios');
        setShowPrompt(true);
      }
    } else if (isAndroid) {
      setPlatform('android');
      setShowPrompt(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('installPromptDismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="modal-content bg-white w-full rounded-t-3xl max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-pink-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-700">Add to Home Screen</h2>
          </div>
          <button
            onClick={handleDismiss}
            className="p-3 hover:bg-pink-50 rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-lg">
            Install this app on your phone for quick access to your routines anytime!
          </p>

          {platform === 'ios' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-2xl font-bold text-pink-500">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-700 mb-1">
                    Tap the Share button
                  </p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Share className="w-5 h-5" />
                    <span>at the bottom of your screen</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-2xl font-bold text-purple-500">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-700 mb-1">
                    Scroll and tap "Add to Home Screen"
                  </p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <PlusSquare className="w-5 h-5" />
                    <span>in the share menu</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-2xl font-bold text-pink-500">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-700 mb-1">
                    Tap the menu button
                  </p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MoreVertical className="w-5 h-5" />
                    <span>in the top right corner</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-2xl font-bold text-purple-500">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-700 mb-1">
                    Tap "Add to Home Screen" or "Install App"
                  </p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Download className="w-5 h-5" />
                    <span>in the menu</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-bold text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
