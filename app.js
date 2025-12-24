const express = require("express");
const connectDb = require('./config/db')

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
app.use(loggerMiddleware)
app.use(loggerMiddleware)
app.use(loggerMiddleware)



connectDb();

app.use('/users', userRouter)
app.use('/order', orderRouter)
app.use('/profile', profileRouter)

// application level custum middleware
// error handling middleware - TBD

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
// localhost:3000/ => localhost:3000
