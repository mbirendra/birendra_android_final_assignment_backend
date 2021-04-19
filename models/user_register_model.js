const mongoose = require('mongoose');

const User = mongoose.model('User',{
    fname: { 
        type:String,
        required : true,
    },
    lname: { 
        type:String,
        required : true
    },
    address: {
        type: String,
        required : true
    },
    phone_number: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true
    },
    profileImg:{
        type:String,
        default:"no-img.jpg",
        required : true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    userType: {
        type: String,
        enum : ['Admin', 'Seller', 'Buyer']
    }

})

module.exports = User;
