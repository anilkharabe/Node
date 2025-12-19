const express = require("express");
const connectDb = require('./config/db')

const userRouter = require('./routes/userRoutes')

const app = express();
app.use(express.json());

connectDb();

app.use('/users', userRouter)

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
// localhost:3000/ => localhost:3000
