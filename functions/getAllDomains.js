const request = require('request');
const fs = require('fs');

module.exports = function (url, fileName = './data/response.html', overwriteCache = false) {
  return new Promise((resolve, reject) => {
    if (!overwriteCache && fs.existsSync(fileName)) {
      return resolve(fs.readFileSync(fileName, 'utf8'));      
    }
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        fs.writeFile(fileName, html, function(err) {
          if(err) {
            console.log(err);
          }
        });
        return resolve(html);
      }
      reject(error);
    });
  });
}