const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const tasksRoute = require('./routes/tasks');
app.use('/api/tasks', tasksRoute);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});