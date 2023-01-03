import mongoose from 'mongoose';

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
    }
})

const Module = mongoose.model('quiz_modules', moduleSchema);

export default Module;