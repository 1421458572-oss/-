import React, { useState } from 'react';
import { AnalysisResult as AnalysisResultType, Token, PartOfSpeech } from '../types';
import TokenDisplay from './TokenDisplay';
import { POS_LABELS, POS_COLORS } from '../constants';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const [showReading, setShowReading] = useState(true);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  // Extract translation from result if available, otherwise handled in parent or separate component
  // The layout in image shows results -> full translation below. 
  // We will keep this component focused on the token grid.

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-lg border border-gray-700/50 mt-6 relative overflow-hidden">
        {/* Decorative background glow */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            解析结果 
            <span className="text-xs font-normal text-gray-500 border border-gray-700 rounded px-2 py-0.5">Parsed Result</span>
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">显示假名</span>
          <button 
            onClick={() => setShowReading(!showReading)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${showReading ? 'bg-primary' : 'bg-gray-700'}`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${showReading ? 'translate-x-5' : ''}`}></div>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-end content-start min-h-[150px] mb-8">
        {result.tokens.map((token, index) => (
          <TokenDisplay
            key={`${token.surface}-${index}`}
            token={token}
            showReading={showReading}
            onSelect={setSelectedToken}
            isSelected={selectedToken === token}
          />
        ))}
      </div>

      <div className="border-t border-gray-700/50 pt-4 flex flex-wrap justify-between items-center gap-4">
        <div className="text-sm text-gray-500 italic">
            {selectedToken 
                ? <span className="text-gray-300">
                    <span className="font-bold text-primary mr-2">{selectedToken.surface}</span>
                    <span className="mr-2">[{selectedToken.reading}]</span>
                    <span className="mr-2 text-gray-400">{selectedToken.pos}</span>
                    <span className="block mt-1 text-white text-base">{selectedToken.meaning}</span>
                  </span>
                : "点击词汇查看详细释义。悬停词汇可查看词性。" // Click word to see meaning. Hover for POS.
            }
        </div>
        
        <div className="flex flex-wrap gap-3">
          {Object.entries(POS_LABELS).map(([key, label]) => {
             const pos = key as PartOfSpeech;
             if (pos === PartOfSpeech.PUNCTUATION || pos === PartOfSpeech.OTHER) return null;
             return (
                <div key={key} className="flex items-center space-x-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${POS_COLORS[pos]}`}></div>
                    <span className="text-xs text-gray-400">{label}</span>
                </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;