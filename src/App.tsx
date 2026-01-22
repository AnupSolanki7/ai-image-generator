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

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    try {
      const historyString = JSON.stringify(history);
      localStorage.setItem('image-history', historyString);
    } catch (error) {
      console.error("LocalStorage Error:", error);

      if (history.length > 1) {
        setHistory(prev => prev.slice(0, prev.length - 1));
      } else {
        localStorage.removeItem('image-history');
      }
    }
  }, [history]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleGenerate = async (prompt: string, style: string, aspectRatio: string) => {
    const result = await generateImage({ prompt, style, aspectRatio });
    if (result) {
      setHistory(prev => [result, ...prev].slice(0, 5));
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('image-history');
  };

  return (
    <div className="min-h-screen bg-bg-main p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Header isDark={isDark} toggleTheme={toggleTheme} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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