handleResults = (result) => {
  console.log(result);
}
const url = "https://httpbin.org/post";
const data = {"text":"Hello!"};

const xhr = new XMLHttpRequest();
xhr.open('POST', url);
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const results =
        JSON.parse(xhr.responseText);
      handleResults(results);
    }
  }
}
xhr.send(JSON.stringify(data));