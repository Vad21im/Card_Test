const mongoose = require('mongoose')

const cardScheme = mongoose.Schema({
  cardNumber: {type: Number},
  expires: String,
  cvv: Number,
  amount: Number
}

)

module.exports =  mongoose.model('Card', cardScheme)