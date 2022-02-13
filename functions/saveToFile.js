const fs = require('fs');

module.exports = function (domains, filePath = 'output.txt') {
  const output = fs.createWriteStream(filePath, { flags: 'w' });
  domains.forEach(domain => {
    output.write(`${domain}\n`);
  });
  return domains;
}