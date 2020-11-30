
const fs = require('fs');
const path = require('path')

// fs.readdir('texts', (err, entries) => console.log(entries));

// fs.readFile(path.join('texts', 'text1.txt'),(err, content) => console.log(content.toString()));

// fs.readFile(path.join('texts', 'text2.txt'),(err, content) => console.log(content.toString()));


  new Promise((resolve, reject) =>
    fs.readdir(path.join('texts'), (err, entries) => { entries  
      if (err) reject(err)
      else resolve(entries)
    })
  ).then(content =>
    Promise.all(
      content.map(fajl =>
        new Promise((resolve, reject) =>
          fs.readFile(path.join('texts', fajl), (err, content) => { content 
            if (err) reject(err)
            else resolve(content)
          })
        ).then(content => console.log(content.toString()))
      )
    )
  );
