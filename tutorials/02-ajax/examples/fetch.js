handleResults = (result) => {
  console.log(result);
}
const url = "https://httpbin.org/post";
const data = {"text":"Hello!"};

fetch(url, { 
  method: 'POST',
  body: data, 
})
  .then((res) => res.json())
  .then(handleResults);
