module.exports = function (domains, sufix) {
  return new Promise((resolve, reject) => {
    resolve(domains.filter((domain) => {
      return domain.endsWith(sufix);
    }));
  });
}