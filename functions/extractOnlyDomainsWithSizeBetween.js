const extractBaseNameForDomain = require('./extractBaseNameForDomain');
module.exports = function (domains, min, max) {
  return new Promise((resolve, reject) => {
    resolve(domains.filter((domain) => {
      let baseName = extractBaseNameForDomain(domain);
      return baseName.length >= min && baseName.length <= max;
    }));
  });
}