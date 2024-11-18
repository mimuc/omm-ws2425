import express from "express";
const app = express();

app.use( (request, response, next) => {
  console.log('Request received with query    '+JSON.stringify(request.query));
  next();
});

app.get('/', (request, response, next) => {
  response.write('Hello World');
  next();
});
  
app.get('/', (request, response) => {
  response.write(' - from routing demo example!');
  response.end();
});

app.listen(3000);

console.log('Routing demo application created');