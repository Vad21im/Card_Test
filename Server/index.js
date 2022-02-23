const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const Card = require('./models/card.model')


const app = express()
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST
mongoose.connect(`mongodb://${DB_HOST}/card`);

const corsOptions = {
  // origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(
  express.urlencoded({extended: true, limit: "50mb", parameterLimit: 50000})
);

app.use(cors(corsOptions));
app.use(express.json())

app.post('/card', async (req, res) => {
  const body = req.body;
  const card = new Card({
    ...body,
    cardNumber: +body.cardNumber,
    cvv: +body.cvv,
    amount: +body.amount,
  })
  await card
    .save()
    .then((doc) => res.status(201)
    .json({RequestId: doc._id, Amount: doc.amount}))
    .catch((err) =>
      res.status(400).json({error: "Data not formatted properly"})
    );
})


app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`)
})

