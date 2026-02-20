import { Stars } from 'lucide-react';

export default function Header() {
  return (
    <header className="no-print bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-white py-8 px-4 shadow-lg">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <Stars className="w-12 h-12 md:w-14 md:h-14 text-yellow-200 wiggle-hover" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-md">
            Visual Schedule Builder
          </h1>
          <Stars className="w-12 h-12 md:w-14 md:h-14 text-yellow-200 wiggle-hover" />
        </div>
        <p className="text-white/90 text-lg md:text-xl font-medium">
          Create fun routines for awesome kids!
        </p>
      </div>
    </header>
  );
}
