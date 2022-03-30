const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required:[true, 'Please add a name']
    },
    password:{
        type: String,
        required:[true, 'Please add a password']
    }
  
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)