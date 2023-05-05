const mongoose = require('mongoose')
const User = require('./User')

const TodoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide todo'],
        minlength:5,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:User,
        required: [true, 'Please provide User']
    }
}, {timestamps: true}
)

module.exports = mongoose.model("Todos", TodoSchema)