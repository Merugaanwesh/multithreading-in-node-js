const express = require("express");
const app = express();
const { Worker } = require("worker_threads");

//non-blocking..
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking ..........");
});

//using worker threads non-blocking main thread..
app.get("/worker-threads", async (req, res) => {
  const worker = new Worker("./worker.js");
  worker.on("message", (data) => {
    res.status(200).send(`worker-threads Router ......result is ${data}`);
  });
  worker.on("error", (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

//blocking the main thread
//When the main thread is blocked, Node.js cannot serve any requests until blocking Router task has finished

app.get("/blocking", async (req, res) => {
  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  res.status(200).send(`blocking Router..... result is ${counter}`);
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("server is ruing.....");
});
