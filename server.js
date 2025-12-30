
const connectDb = require('./config/db')
const app = require('./app')

connectDb();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});