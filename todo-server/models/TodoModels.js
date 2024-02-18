const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['Incomplete', 'Complete'], 
        default: 'Incomplete' 
    },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },

    category: String

});

module.exports = mongoose.model('TodoModels', TodoSchema);
