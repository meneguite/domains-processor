const request = require('request');
const urlRegistroBr = 'https://registro.br/v2/ajax/avail/raw/';

const requestAvailabilityOnRegistroBr = (domain) => {
  return new Promise((resolve, reject) => {
    request(urlRegistroBr + domain, (error, response, html) => {
      if (error) {
        return reject(error);
      }
      if (!error && response.statusCode == 200) {
        let res = JSON.parse(html);
        return resolve(res.status === 0);
        
      }
      resolve(false);
    });
  });
}

const checkAvailabilityOnRegistroBr = async (domains, print = false) => {
  const printMessage = (message) => {
    if (print) console.info(message);
  }

  if (!Array.isArray()) domains = [domains];

  const avaliableDomains = [];
  try {
    for (const domain of domains) {
      const response = await requestAvailabilityOnRegistroBr(domain);
      if (response) {
        printMessage(`\x1b[36m%s\x1b ✔ Domain: ${domain} [ Avaliable ]`);
        avaliableDomains.push(domain)
      } else {
        printMessage(`\x1b[31m✘ Domain: ${domain} [ Unavaliable ]`);
      }
    }
  } catch (e) {
    console.error(e);
  }
  return avaliableDomains;
}

module.exports = checkAvailabilityOnRegistroBr;
