const fs = require('fs');
const readline = require('readline');

async function getDomainByFile(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const domains = [];
  for await (const domain of rl) {
    if (domain.startsWith('#')) continue;
    domains.push(domain);
  }

  return domains;
}

module.exports = getDomainByFile;