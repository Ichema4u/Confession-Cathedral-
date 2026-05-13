import { useState } from 'react';
import ConfessionForm from './components/ConfessionForm';
import ConfessionFeed from './components/ConfessionFeed';

function App() {
  const [confessions, setConfessions] = useState([]);

  const handleAddConfession = ({ nickname, text }) => {
    const newConfession = {
      id: crypto.randomUUID(),
      nickname,
      text,
      timestamp: Date.now(),
      isEdited: false,
    };
    
    // Add to the top of the feed (newest first)
    setConfessions((prev) => [newConfession, ...prev]);
  };

  const handleEditConfession = (id, newText) => {
    setConfessions((prev) => 
      prev.map(confession => 
        confession.id === id 
          ? { ...confession, text: newText, isEdited: true } 
          : confession
      )
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-warm-200 selection:text-warm-900">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
            <svg viewBox="0 0 100 100" className="w-64 h-64 text-warm-900" fill="currentColor">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-warm-900 tracking-tight mb-4 drop-shadow-sm">
            Confession Cathedral
          </h1>
          <p className="text-lg text-warm-600 font-medium max-w-lg mx-auto">
            A safe space to unburden your mind anonymously. What's your confession today?
          </p>
        </header>

        <main>
          <ConfessionForm onSubmit={handleAddConfession} />
          
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-warm-800">
                Recent Confessions
              </h2>
              <div className="h-px bg-warm-200 flex-1"></div>
            </div>
            <ConfessionFeed confessions={confessions} onEdit={handleEditConfession} />
          </div>
        </main>
        
        <footer className="mt-20 text-center text-warm-400 text-sm pb-8 font-medium">
          <p>Confession Cathedral &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
