const mongoose = require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema ({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
    },
  title: {
        type: String,
        required: true
    },
    date_time: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    

})

module.exports = mongoose.model('Post',postSchema)

