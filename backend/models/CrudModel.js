const mongoose = require('mongoose');

const CrudSchema = new mongoose.Schema({
    title : {
        type: String,
        requird: true
    },
    description : {
        type: String,
        required: true
    }
}, {timestamps: true})



module.exports = mongoose.model('Notes', CrudSchema);