const checkAvailabilityOnRegistroBr = require('./checkAvailabilityOnRegistroBr');

module.exports = function (domains) {
  domains.forEach(domain => {
    console.log('\x1b[36m%s\x1b[0m', domain); 
  });
  return domains;
}