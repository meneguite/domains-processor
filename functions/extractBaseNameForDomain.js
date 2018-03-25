module.exports = function (domain) {
  let parts = domain.split('.');
  return parts[0];
}