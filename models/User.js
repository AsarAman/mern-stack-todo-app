const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'Please provide a name'],
            trim:true,
            minlength:4,
            maxlength:20
        },
        email:{
            type:String,
            required:[true, 'Please provide email'],
            unique:true,
            validate:{
                validator:validator.isEmail,
                message:'Please provide a valid email'
            }
        },
        password:{
            type:String,
            required:[true, 'Please provide password'],
            trim:true,
            minlength:8,
            
        }
    },
    {timestamps:true}
)

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = function(userPassword){
    const isPasswordValid = bcrypt.compare(this.password, userPassword)
    return isPasswordValid
}

UserSchema.methods.assignJWT= function(){
    return jwt.sign(
        {userId:this._id, name:this.name},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_LIFETIME}
    )
}

module.exports = mongoose.model('Users', UserSchema)