
const connectDb = require('./config/db')
const app = require('./app')

connectDb();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});



// run server using clusting

/*
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart workers if they die
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // Workers run the actual server
  const connectDb = require('./config/db');
  const app = require('./app');

  connectDb();

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} listening on port 3000`);
  });
}
*/