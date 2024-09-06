const mongoose = require('mongoose');
const { Schema } = mongoose;

const savedQuotesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

const SavedQuotes = mongoose.model('SavedQuotes', savedQuotesSchema);

module.exports = SavedQuotes;
