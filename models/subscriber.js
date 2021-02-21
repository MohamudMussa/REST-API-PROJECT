const mongoose = require('mongoose');


const subscribeSchema = new mongoose.Schema({


    name: {
        type: String,
        require: true

    },

    age: {
        type: Number,
        require: true

    },


    subStatus: {

        type: Boolean,
        require: true
    },


    subDate: {
        type: Date,
        require: true,
        default: Date.now

    }


});

module.exports = mongoose.model('Subscriber', subscribeSchema);