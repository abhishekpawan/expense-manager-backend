const mongoose = require('mongoose')

const incomeSchema = mongoose.Schema({
    income:{
        type:Number,
        require:true,
        trim:true,
    },
    month:{
        type:Number,
        require:true,
    },
    year:{
        type:Number,
        require:true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Income', incomeSchema)