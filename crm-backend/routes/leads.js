const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ date: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server Error fetching leads' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: 'Error updating dataset record' });
  }
});

module.exports = router;