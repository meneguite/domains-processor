const request = require('request');

module.exports = function (domain) {
  const urlRegistroBr = 'https://registro.br/ajax/avail/';

  return new Promise((resolve, resject) => {
    request(urlRegistroBr + domain, (error, response, html) => {
      if (error) {
        return reject(error);
      }

      if (!error && response.statusCode == 200) {
        let res = JSON.parse(html);
        return resolve(res.available || false);
        
      }
      resolve(false);
    });
  });
}
