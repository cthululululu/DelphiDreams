import { Routes, Route, Link } from 'react-router-dom';
import MoodTracker from './pages/MoodTracker';
import DreamJournal from './pages/DreamJournal';

function App() {
  return (

    
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-100">
      
      {/* Top Navigation */}
      <nav className="flex justify-center gap-8 py-4 bg-white shadow-md">
        <Link to="/" className="text-indigo-600 font-medium hover:underline">Mood Tracker</Link>
        <Link to="/dreams" className="text-purple-600 font-medium hover:underline">Dream Journal</Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex justify-center items-start px-4 py-8">
        <div className="w-full max-w-3xl">
          <Routes>
            <Route path="/" element={<MoodTracker />} />
            <Route path="/dreams" element={<DreamJournal />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
