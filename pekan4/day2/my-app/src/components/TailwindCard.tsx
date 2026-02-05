import React from 'react';

function TailwindCard() {
  return (
    // Menggunakan utility classes untuk styling
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4 border border-slate-200">
      <div className="text-2xl font-bold text-slate-800">Belajar Tailwind CSS</div>
      <p className="text-slate-600">
        Dengan utility classes, kita bisa membuat desain yang konsisten dan responsif
        langsung dari file JSX kita.
      </p>
      <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
        Mulai Belajar
      </button>
    </div>
  );
}

export default TailwindCard;