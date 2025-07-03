import React, {useEffect, useState} from 'react';
//functional component named MoodTracker, returns JSX
const MoodTracker = () => {
    //variables storing what the user inputs, initialized as an empty string
    const [mood, setMood] = useState(''); //emoji
    const [tags, setTags] = useState(''); //string
    const [note, setNote] = useState(''); //free text
    const [confirmation, setConfirmation] = useState('');
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/mood")
        .then(res => res.json())
        .then(data => setEntries(data))
        .catch(err => console.error("Error fetching entries:", err));
    }, []);

    //called when form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents page from refreshing
        //formatting entries
        const entry = {
            mood,
            tags: tags.split(',').map(tag => tag.trim()),
            note,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch ('http://localhost:5000/api/mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry),
            });
            if (!response.ok) {
                throw new Error('Failed to save mood entry');
            }

            const result = await response.json();
            console.log('Mood entry saved:', result);

            setMood('');
            setTags('');
            setNote('');

            setConfirmation('Mood entry saved!');
            setTimeout(() => setConfirmation(''), 3000);

        } catch (err) {
            console.error(err.message);
        }

    };

    //form UI
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-700">How are you feeling today?</h2>

        <div className="flex justify-around text-2xl"> 
            {['😄', '🙂', '😐', '😞', '😢'].map((emoji) => (
                <button
                key={emoji}
                type="button"
                onClick={() => setMood(emoji)}
                className={`transition transform hover:scale-110 ${mood === emoji ? 'border-2 border-blue-400 rounded' : ''}`}
                >
                    {emoji}
                </button>
            ))}
        </div>
        
        <input 
            type="text"
            placeholder="Tags (e.g. tired, productive)"
            className="w-full px-3 py-2 border rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
        />

        <textarea
            placeholder="Write a short note..."
            className="w-full px-3 py-2 border rounded resize-none"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
            Save Entry
        </button>

        {confirmation && (
            <div className="text-green-600 text-center font-medium">{confirmation}</div>
        )}    


        <div className="max-w-md mx-auto mt-6">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Mood Entries</h3>
  {entries.map((entry, index) => (
    <div key={index} className="mb-4 p-3 border rounded bg-white shadow">
      <div className="text-2xl">{entry.mood}</div>
      <div className="text-sm text-gray-500">{new Date(entry.date).toLocaleString()}</div>
      <div className="text-sm"><strong>Tags:</strong> {entry.tags.join(', ')}</div>
      {entry.note && <div className="text-sm mt-1"><strong>Note:</strong> {entry.note}</div>}
    </div>
  ))}
</div>




        </form>
        
        
    );
};

export default MoodTracker;