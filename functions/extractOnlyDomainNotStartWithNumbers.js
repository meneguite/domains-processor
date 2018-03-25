module.exports = function (domains) {
    return new Promise((resolve, reject) => {
      resolve(domains.filter((domain) => {
        return !(!isNaN( parseInt(domain.charAt(0) )));
      }));
    });
  }