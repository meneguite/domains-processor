module.exports = function (domains) {
    return new Promise((resolve, reject) => {
      resolve(domains.filter((domain) => {
        return /^([^0-9]*)$/.test(domain);
      }));
    });
  }