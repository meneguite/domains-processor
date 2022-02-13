const fs = require('fs');
const readline = require('readline');

async function getDictionary(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const dictionary = {};
  for await (const word of rl) {
    const firstLetter = word[0];
    if (!firstLetter) continue;
    if (!Array.isArray(dictionary[firstLetter])) dictionary[firstLetter] = [];

    dictionary[firstLetter].push(word.toLowerCase())
  }

  return dictionary;
}

module.exports = getDictionary;