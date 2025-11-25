import React, { useState, useCallback } from 'react';
import { speakJapaneseText } from '../services/geminiService';

interface InputSectionProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
  initialText?: string;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing, initialText = '' }) => {
  const [text, setText] = useState(initialText);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleAnalyze = () => {
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  const handleSpeak = async () => {
    if (!text.trim() || isSpeaking) return;
    setIsSpeaking(true);
    try {
      await speakJapaneseText(text);
    } catch (e) {
      console.error(e);
      alert("Failed to play audio");
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     // Placeholder for file/image upload logic if implemented in future
     // For now just alert or log
     console.log("File selected", e.target.files);
     alert("Image recognition not yet implemented in this demo.");
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-lg border border-gray-700/50 relative group transition-all duration-300 hover:border-primary/50">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl opacity-75"></div>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Japanese text here..."
        className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none outline-none font-jp text-lg min-h-[120px] leading-relaxed"
        spellCheck={false}
      />

      <div className="flex justify-between items-center mt-4 border-t border-gray-700/50 pt-4">
        <div className="flex space-x-4">
          <label className="cursor-pointer text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
             {/* Camera Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </label>
          
          <button 
            onClick={handleSpeak}
            disabled={isSpeaking}
            className={`text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg ${isSpeaking ? 'animate-pulse text-primary' : ''}`}
          >
             {/* Speaker Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </button>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !text.trim()}
          className="bg-primary hover:bg-violet-600 text-white px-6 py-2 rounded-full font-medium flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isAnalyzing ? (
             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          )}
          <span>解析</span>
        </button>
      </div>
    </div>
  );
};

export default InputSection;
