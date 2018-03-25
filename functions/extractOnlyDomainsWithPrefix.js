module.exports = function (domains, prefix) {
  return new Promise((resolve, reject) => {
    resolve(domains.filter((domain) => {
      return domain.startsWith(prefix);
    }));
  });
}