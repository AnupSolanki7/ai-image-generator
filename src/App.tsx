import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageGenerator } from './components/ImageGenerator';
import { ImageDisplay } from './components/ImageDisplay';
import { History } from './components/History';
import { useImageGeneration, type ImageResult } from './hooks/useImageGeneration';

function App() {
  const {
    generateImage,
    currentImage,
    loading,
    error,
    clearImage,
    setCurrentImage
  } = useImageGeneration();

  const [history, setHistory] = useState<ImageResult[]>(() => {
    const saved = localStorage.getItem('image-history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('image-history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (prompt: string, style: string) => {
    const result = await generateImage({ prompt, style });
    if (result) {
      // Logic: add new result to front and keep only the last 5
      setHistory(prev => [result, ...prev].slice(0, 5));
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('image-history');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Passing handleClearHistory to Header to match the purple button in image */}
        <Header />

        {/* MAIN GRID CONTAINER: 
            Everything below the header must be inside this div 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SECTION: Generator and Display (8 out of 12 columns) */}
          <div className="lg:col-span-8 space-y-8">
            <ImageGenerator
              onGenerate={handleGenerate}
              loading={loading}
            />

            <ImageDisplay
              imageUrl={currentImage?.url || null}
              prompt={currentImage?.prompt || ''}
              loading={loading}
              error={error}
              onClear={clearImage}
            />
          </div>

          {/* RIGHT SECTION: History Sidebar (4 out of 12 columns) */}
          <aside className="lg:col-span-4 h-full">
            <History
              history={history}
              onSelect={(item) => setCurrentImage(item)}
              onClearHistory={handleClearHistory}
            />
          </aside>

        </div>
      </div>
    </div>
  );
}

export default App;