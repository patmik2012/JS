const http = require('http');
const url = require('url');
const fs = require('fs');
const port = '3456';
const path = require('path');

const mimeTypes = {
  'jpg': 'image/jpeg',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'txt': 'text/plain'
};



function processRequest(request, response) {
  const { query, pathname } = url.parse(request.url);
  
  
  if (pathname=='/'){ 
      fs.readFile(('public/index.html'), 'utf-8', (err,data) => {
          if (!err) {
            response.setHeader('Content-Type', 'text/html');
            response.writeHead(200);
            response.end(data);      
          } else {
              throw err;
              response.end();
          }
      });  
  };

  if (pathname=='/file-browser') {
      fs.readFile(('public/file-browser.html'), 'utf-8', (err,data) => {
          if (!err) {
            response.setHeader('Content-Type', 'text/html');
            response.writeHead(200);
            response.end(data);      
          } else {
              throw err;
              response.end();
          }
      });
  };


function MappaFajlok(Mappa, response) {
    if (!Mappa) {
        Mappa = '/';
    }
    fs.readdir(path.join('public/files', Mappa), { withFileTypes: true }, (err, files) => {
        if (!err) {
            let name, isDir, isFile;
            let tomb = [];
            files.forEach(file => {
                name = file.name;
                isDirectory = file.isDirectory();
                isFile = file.isFile();
                tomb.push({ name, isFile, isDirectory });
            });
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.write(JSON.stringify({
                files: tomb,
                path: Mappa
            }));
            response.end();
        }
        else {
            console.error(err);
            response.writeHead(500);
            response.end();
        }
    });

}



//ie: /api/directory?dir=/images/photo
  if (pathname==='/api/directory'){
    const parsedUrl = url.parse(request.url, true);
    MappaFajlok(parsedUrl.query.dir, response);
  }



  function getParentPath(path) {
    let folders;
    try {
        folders = path.split('/');
        folders.pop();
        return folders.join('/');
    } catch (err) {
        return '/';
    }
  }

  if (pathname==='/api/directory/parent'){
    const parsedUrl = url.parse(request.url, true);
    let dir = getParentPath(parsedUrl.query.dir);
    MappaFajlok(dir, response);
  }


  function getMimeType(fileName) {
    const fileExtension = path.extname(fileName);
    return mimeTypes[path.extname(fileName).substr(1)];
  }

  if (pathname.includes('.')) {
    const mimeType = getMimeType(request.url);
    const readStream = fs.createReadStream(path.join('public/files', request.url));
    response.writeHead(200, { 'Content-Type': mimeType });
    readStream.pipe(response);


  }  


}


const server = http.createServer(processRequest);
server.listen(port);
console.log('Server is listening...');