const express = require('express');
const router = express.Router();
const SavedQuotes = require('../models/savedQuotes'); 

router.post('/save-quote', async (req, res) => {
  const { userId, quote, author } = req.body; 
  
  // Save a quote for the user
  try {
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


// Fetch saved quotes for a specific user for (for Favourite tab in frontend)
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

// Deleting a saved quote for that specific user
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
