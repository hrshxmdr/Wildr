const pool = require('../config/db');

exports.getAllCampingSpots = async (req, res) => {
    try {
        const [spots] = await pool.query('SELECT * FROM camping_spots');
        res.status(200).json(spots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCampingSpot = async (req, res) => {
    const { name, location, description, elevation, features, difficulty_level } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO camping_spots (name, location, description, elevation, features, difficulty_level) VALUES (?, ?, ?, ?, ?, ?)',
            [name, location, description, elevation, features, difficulty_level]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

