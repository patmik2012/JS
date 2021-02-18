const http = require('http');
const url = require('url');
const port = '3456';
var fs = require('fs');


function processRequest(request, response) {
    const requestUrl = url.parse(request.url);
    /*response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.write(requestUrl.path);
    response.end();*/

   if(requestUrl.pathname == "/"){
      fs.readFile('index.html', 'utf-8', (err,data) => {
          if (!err) {
            response.setHeader('Content-Type', 'text/html');
            response.writeHead(200);
            response.end(data);      
          } else {
              throw err;
              response.end();
          }
      });     
   }


   if(requestUrl.pathname == "/image"){
      fs.readFile('Polar-Bear-Cub.jpg', (err,data) => {
        if(!err){
            response.setHeader('Content-Type', 'image/jpg');
            response.writeHead(200);
            response.end(data);
          } else {
              throw err;
              response.end();
          }
      });
   }

   if(requestUrl.pathname == "/image-stream"){
      fs.createReadStream("Polar-Bear-Cub.jpg", (err) =>{
        if(!err){
          response.setHeader('Content-Type', 'image/jpg');
          response.writeHead(200);
        }
        else {
          throw err;
          response.end();
        }
      }).pipe(response);
   }


   if(requestUrl.pathname == "/random-num"){
     //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
     const paramsString = new URLSearchParams(requestUrl.search);
     var minValue = Number(paramsString.get("minValue"));
     var maxValue = Number (paramsString.get("maxValue"));
     var random = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     response.end(JSON.stringify({ "minValue": minValue, "maxValue": maxValue, "random": random }));
   }



}

const server = http.createServer(processRequest);
server.listen(port);
console.log('Server is listening...');