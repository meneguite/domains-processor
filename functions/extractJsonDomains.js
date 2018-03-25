const cheerio = require('cheerio');

module.exports = function (domains) {
  return new Promise((resolve, reject) => {
    const dom = cheerio.load(domains);

    let response = dom('.proclib-list pre')
      .text()
      .replace(/\s+/g, ';')
      .split(';');
    
    resolve( response );
  });
}