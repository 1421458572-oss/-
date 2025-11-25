import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import AnalysisResult from './components/AnalysisResult';
import TranslationSection from './components/TranslationSection';
import { AnalysisResult as AnalysisResultType } from './types';
import { analyzeJapaneseText } from './services/geminiService';
import { SAMPLE_TEXT } from './constants';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<AnalysisResultType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeJapaneseText(text);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again or check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Header />
        
        <InputSection 
          onAnalyze={handleAnalyze} 
          isAnalyzing={isAnalyzing} 
          initialText={SAMPLE_TEXT}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {analysis && (
          <div className="animate-fade-in">
            <AnalysisResult result={analysis} />
            <TranslationSection translation={analysis.translation} />
          </div>
        )}
        
        <footer className="mt-20 text-center text-gray-600 text-xs pb-4">
            © 2025 AI Japanese Sentence Analyzer. Powered by Gemini 2.5.
        </footer>
      </div>
    </div>
  );
};

export default App;
