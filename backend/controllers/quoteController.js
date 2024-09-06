const SavedQuoteModel = require('../models/savedQuote'); 
const UserModel = require('../models/user'); 
const saveQuote = async (req, res) => {
    try {
        const { userId, quote, author } = req.body;

        // Find the user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create and save the new quote
        const savedQuote = new SavedQuoteModel({
            userId,
            quote,
            author
        });

        await savedQuote.save();

        res.status(200).json({ message: 'Quote saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving quote', error });
    }
};

const getSavedQuotes = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const savedQuotes = await Quote.find({ userId });
        res.json(savedQuotes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved quotes.' });
    }
};


module.exports = { saveQuote, getSavedQuotes };
