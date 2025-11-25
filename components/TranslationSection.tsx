import React, { useState } from 'react';

interface TranslationSectionProps {
  translation: string;
}

const TranslationSection: React.FC<TranslationSectionProps> = ({ translation }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!translation) return null;

  return (
    <div className="mt-6 animate-fade-in-up">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-700 shadow-sm">
             翻译整句
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-6 shadow-lg border border-gray-700/50 relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-500 opacity-75"></div>
         
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">全文翻译 (中)</h3>
            <button 
                onClick={() => setIsVisible(!isVisible)}
                className="text-xs border border-gray-600 text-gray-400 hover:text-white px-3 py-1 rounded-full transition-colors"
            >
                {isVisible ? '隐藏' : '显示'}
            </button>
         </div>
         
         {isVisible && (
             <p className="text-gray-300 leading-relaxed text-lg font-medium">
                 {translation}
             </p>
         )}
         
         {!isVisible && (
             <div className="h-8 bg-gray-800/50 rounded flex items-center justify-center text-gray-500 text-sm">
                 Translation Hidden
             </div>
         )}
      </div>
    </div>
  );
};

export default TranslationSection;
