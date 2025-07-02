import React, {useState} from 'react';
//functional component named MoodEntry, returns JSX
const MoodEntry = () => {
    //variables storing what the user inputs, initialized as an empty string
    const [mood, setMood] = useState(''); //emoji
    const [tags, setTags] = useState(''); //string
    const [note, setNote] = useState(''); //free text

    //called when form is submitted
    const handleSubmit = (e) => {
        e.preventDefault(); //prevents page from refreshing
        //formatting entries
        const entry = {
            mood,
            tags: tags.split(',').map(tag => tag.trim()),
            note,
            date: new Date().toISOString()
        };
        //log and reset state
        console.log('Mood entry submitted:', entry);

        setMood('');
        setTags('');
        setNote('');
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
        </form>
    );
};

export default MoodEntry;