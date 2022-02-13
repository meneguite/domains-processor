const { map } = require('cheerio/lib/api/traversing');
const fs = require('fs');
const readline = require('readline');
const getDictionary = require('./getDictionary');

async function checkForExistOnDictionary(dictionary, domains) {
  if (!domains  || domains.length === 0) return [];

  if (!dictionary) {
    throw new Error('Not locale Dictionary');
  }

  return domains.filter((domain) => {
    const word = String(domain.split('.')[0]);
    const firstLetter = word[0] || '';
    if (!firstLetter || !dictionary[firstLetter]) return false;

    return dictionary[firstLetter].includes(word);
  });
}

module.exports = checkForExistOnDictionary;