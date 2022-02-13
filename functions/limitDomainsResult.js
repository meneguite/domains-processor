module.exports = function (domains, limit) {
  if (domains.length > limit) {
    return domains.slice(0, limit);
  }

  return domains;
}