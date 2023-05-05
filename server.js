require('express-async-errors')
const cors = require('cors')
const express = require("express");
const app = express();
const notFound = require("./middlewares/not-found");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require('./routes/todoRoutes')
const connectDB = require("./db/connect");
require("dotenv").config();
const errorHandler = require('./middlewares/error-handler')
const authMiddleware = require('./middlewares/authenticate')


app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello there asar");
});

app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/todos', authMiddleware, todoRoutes)


app.use(notFound);
app.use(errorHandler)

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on Port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
