const os = require('os'); 
module.exports = {
   getOSData:() => 
   ({ 
     platform: os.platform(), 
     os: os.type()+" "+ os.version(),
     arch: os.arch(), 
     cpus: os.cpus().length, 
     mem: { 
         free: os.freemem(), 
         total: os.totalmem() 
          }
    }
   )
}