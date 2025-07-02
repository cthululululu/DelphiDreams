const mongoose = require("mongoose");

const MoodEntrySchema = new mongoose.Schema({
    mood: {type: String, required: true},
    tags: [String],
    note: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("MoodEntry", MoodEntrySchema);