const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, default: 1 },
    issueDate: { type: Date, default: Date.now(), required: true},
});

module.exports = mongoose.model('Issued', issueSchema);