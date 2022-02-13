module.exports = function (domains, contains) {
  return new Promise((resolve, reject) => {
    resolve(domains.filter((domain) => {
      return domain.indexOf(contains) !== -1
    }));
  });
}