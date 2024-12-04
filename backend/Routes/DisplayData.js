const express = require('express');
const router = express.Router();

// Route to fetch food items and categories
router.post('/foodData', (req, res) => {
    try {
        // Check if global variables are set
        if (!global.food_items || !global.foodCategory) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Respond with food items and categories
        res.json([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error("Error fetching food data:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
