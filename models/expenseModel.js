const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        require:true,
        trim:true,
    },
    date:{
        type:Date,
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

module.exports = mongoose.model('Expense', expenseSchema)