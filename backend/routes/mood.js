const express = require("express");
const router = express.Router();
const MoodEntry = require("../models/MoodEntry");

router.post("/", async (req, res) => {
    try {
        const {mood, tags, note} = req.body;
        const newEntry = new MoodEntry({mood, tags, note});
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({message: "Failed to save mood entry", error: err});
    }
});

router.get("/", async (req, res) => {
    try {
        const entries = await MoodEntry.find().sort({date:-1});
        res.json(entries);
    } catch(err) {
        res.status(500).json({message: "Failed to fetch mood entries"});
    }
});

module.exports = router;