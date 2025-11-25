import React from 'react';
import { Token, PartOfSpeech } from '../types';
import { POS_COLORS } from '../constants';

interface TokenDisplayProps {
  token: Token;
  showReading: boolean;
  onSelect: (token: Token) => void;
  isSelected: boolean;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ token, showReading, onSelect, isSelected }) => {
  const posColor = POS_COLORS[token.pos] || 'bg-gray-500';
  
  // Punctuation shouldn't have the same styling block
  if (token.pos === PartOfSpeech.PUNCTUATION) {
      return (
          <span className="inline-block mx-0.5 text-white text-xl font-jp self-end mb-4">
              {token.surface}
          </span>
      )
  }

  return (
    <div 
      onClick={() => onSelect(token)}
      className={`
        inline-flex flex-col items-center mx-1 my-2 cursor-pointer group relative
        transition-transform duration-200 hover:scale-105
      `}
    >
      {/* Tooltip on Hover */}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
         <div className="bg-gray-900 text-xs text-white px-2 py-1 rounded shadow-lg whitespace-nowrap border border-gray-700">
             {token.pos}
         </div>
         <div className="w-2 h-2 bg-gray-900 rotate-45 -mt-1 border-r border-b border-gray-700"></div>
      </div>

      {/* Surface Form */}
      <span className={`text-xl font-jp tracking-wide ${isSelected ? 'text-primary font-bold' : 'text-white'}`}>
        {token.surface}
      </span>
      
      {/* POS Underline */}
      <div className={`w-full h-0.5 mt-0.5 rounded-full ${posColor} opacity-80 group-hover:opacity-100 group-hover:h-1 transition-all`}></div>
      
      {/* Reading (Hiragana/Katakana) */}
      {showReading && (
        <span className="text-xs text-gray-400 mt-1 font-jp tracking-tight">
          {token.reading}
        </span>
      )}
    </div>
  );
};

export default TokenDisplay;