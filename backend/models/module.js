import mongoose from 'mongoose';
import flashcardSchema from './flashcard.js';

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        deafult: () => Date.now()
    },
    text: {
        type: String,
        required: true
    },
    flashcards: {
        type: [flashcardSchema],
        default: null
    }
})

const Module = mongoose.model('quiz_modules', moduleSchema);

export default Module;