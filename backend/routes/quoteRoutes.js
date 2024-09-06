const express = require('express');
const router = express.Router();
const SavedQuotes = require('../models/savedQuotes'); 

// Route to save a quote
router.post('/save-quote', async (req, res) => {
  const { userId, quote, author } = req.body; 
  
  try {
    // Save the new quote for the user
    const newSavedQuote = new SavedQuotes({
      userId, 
      quote,
      author
    });

    await newSavedQuote.save();

    res.status(200).json({ message: 'Quote saved successfully!' });
  } catch (error) {
    console.error('Error saving quote:', error);
    res.status(500).json({ message: 'Failed to save the quote' });
  }
});

// Fetch saved quotes for a specific user
router.get('/saved-quotes/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const savedQuotes = await SavedQuotes.find({ userId });

    res.status(200).json(savedQuotes);
  } catch (error) {
    console.error('Error fetching saved quotes:', error);
    res.status(500).json({ message: 'Failed to fetch saved quotes' });
  }
});

router.delete('/delete-quote/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await SavedQuotes.findByIdAndDelete(id);
      res.status(200).json({ message: 'Quote deleted successfully!' });
    } catch (error) {
      console.error('Error deleting quote:', error);
      res.status(500).json({ message: 'Failed to delete the quote' });
    }
  });

module.exports = router;
