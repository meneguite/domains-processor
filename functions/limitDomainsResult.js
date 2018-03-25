module.exports = function (domains, limit) {
  return new Promise((resolve, reject) => {
    if (domains.length > limit) {
      return reject('Exceeded domains limit - Total domains: '+ domains.length);
    }
    return resolve(domains);
  });
}