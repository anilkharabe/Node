const express = require("express");
const { fork } = require("child_process"); // heavy task, terminal command, cross language like python, java function calling

const userRouter = require('./routes/userRoutes')
const orderRouter = require('./routes/orderRoutes')
const profileRouter = require('./routes/profileRoutes')

const app = express();
app.use(express.json()); // application-level middleware // body parsing // build-in middleware

// application level custum middleware
// logging - TBD
// rate limiting -- TBD

// error-handling middleware

// application level custum middleware

const loggerMiddleware = (req, res, next)=>{
  console.log('req.method', req.method, req.url);
  next();
}
//  middleware1 => middleware2 => middleware3 => so on
app.use(loggerMiddleware)


app.use('/users', userRouter)
app.use('/order', orderRouter)
app.use('/profile', profileRouter)


app.get("/calculate", (req, res) => {

 const child = fork("./utils/heavy_task.js");

  child.send({ number: 40 });

  child.on("message", (result) => {
    res.json({
      status: "done",
      result: result
    });
  });
});

app.get('/health', (req, res)=>{
  res.json({message: 'working properly'})
})

// application level custum middleware
// error handling middleware - TBD


module.exports = app;
// localhost:3000/ => localhost:3000
