const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
    text:{
        type: String,
        required : [true, 'Please add users']
    }
}, {
    timestamps: true,
    }
)

module.exports = mongoose.model('Goal', userSchema)