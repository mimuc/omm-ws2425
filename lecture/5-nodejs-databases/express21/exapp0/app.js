import express from "express";
const app = express();

app.get('/', (request, response) => {
  response.send('Hello World from first Express example!')
});
  app.listen(3000);

console.log('Hello World application created');