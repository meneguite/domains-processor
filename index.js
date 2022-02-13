const path = require('path');
const debug = require('debug')('processor')
const { Command } = require('commander');
const getDomainsByFile = require('./functions/getDomainsByFile');
const getDictionary = require('./functions/getDictionary');
const extractOnlyDomainNotStartWithNumbers = require('./functions/extractOnlyDomainNotStartWithNumbers');
const checkForExistOnDictionary = require('./functions/checkForExistOnDictionary');
const extractOnlyDomainsWithSizeBetween = require('./functions/extractOnlyDomainsWithSizeBetween');
const extractOnlyDomainsWithPrefix = require('./functions/extractOnlyDomainsWithPrefix');
const extractOnlyDomainsWithSuffix = require('./functions/extractOnlyDomainsWithSuffix');
const extractOnlyDomainsWithContains = require('./functions/extractOnlyDomainsWithContains');
const checkAvailabilityOnRegistroBr = require('./functions/checkAvailabilityOnRegistroBr');

const limitDomainsResult = require('./functions/limitDomainsResult');
const processPrintResult = require('./functions/processPrintResult');
const saveToFile = require('./functions/saveToFile');
const extractOnlyDomainNotContainNumbers = require('./functions/extractOnlyDomainNotContainNumbers');

const start = async () => {
  const program = new Command();
  program.version('0.0.1')
    .option('--not-start-number', 'clear domains with start numbers')
    .option('--not-contain-number', 'clear domains with numbers')
    .option('-d, --dictionary [language]', 'filter by valid word on dictionary [en, pt]')
    .option('-f, --file <source>', 'set custom source path', 'source.txt')
    .option('-p, --prefix <prefix>', 'set filter prefix')
    .option('-c, --contain <contain>', 'set filter contain')
    .option('-s, --suffix <suffix>', 'set filter suffix')
    .option('-l, --limit <limit>', 'set custom source path')
    .option('--min <size>', 'set min size of domains')
    .option('--max <size>', 'set max size of domains')
    .option('--check-availability', 'check availability on registro.br')
    .option('--print', 'set print all result on console')
    .option('--save [output]', 'set save on output file', 'output.txt')
    .parse();

  const options = program.opts();

  let domains = await getDomainsByFile(options.file || 'source.txt')
  if (options.notStartNumber) {
    debug(`Apply not start number`);
    domains = await extractOnlyDomainNotStartWithNumbers(domains);
  }

  if (options.notContainNumber) {
    debug(`Apply not contain number`);
    domains = await extractOnlyDomainNotContainNumbers(domains);
  }

  if (options.min && options.max) {
    const min = Number(options.min);
    const max = Number(options.max);
    debug(`Apply filter for extract only domains with size betwen ${min} and ${max}`);
    domains = await extractOnlyDomainsWithSizeBetween(domains, min, max);
  } else {
    if (options.min) {
      const min = Number(options.min);
      debug(`Apply filter for extract only domains with size greater than ${min}`);
      domains = await extractOnlyDomainsWithSizeBetween(domains, min, 9999999);
    }
  
    if (options.max) {
      const max = Number(options.max);
      debug(`Apply filter for extract only domains with size less than ${max}`);
      domains = await extractOnlyDomainsWithSizeBetween(domains, 0, max);
    }
  }

  

  if (options.prefix) {
    debug(`Apply prefix filter "${options.prefix}"`);
    domains = await extractOnlyDomainsWithPrefix(domains, options.prefix);
  }

  if (options.contain) {
    debug(`Apply contain filter "${options.contain}"`);
    domains = await extractOnlyDomainsWithContains(domains, options.contain);
  }

  if (options.suffix) {
    debug(`Apply suffix filter "${options.suffix}"`);
    domains = await extractOnlyDomainsWithSuffix(domains, options.suffix);
  }

  if (options.dictionary) {
    debug(`Apply filter for extract only domains on dictionary ${options.dictionary}`);
    const dictionaryFilePath = path.join('dic', `${options.dictionary}.txt`);
    const dictionary = await getDictionary(dictionaryFilePath);
    domains = await checkForExistOnDictionary(dictionary, domains);
  }

  if (options.limit) {
    debug(`Apply limit result ${options.limit}`);
    domains = await limitDomainsResult(domains, Number(options.limit));
  }

  if (options.checkAvailability) {
    debug(`Start domains check avaliable`);
    if (!options.limit && domains.length > 10) {
      throw new Error('It is not possible to reach availability of more than 10 items without setting a manual limit');
    }
    domains = await checkAvailabilityOnRegistroBr(domains, !!options.print);
  }

  if (options.print && !options.checkAvailability) {
    debug(`Start print result`);
    await processPrintResult(domains);
  }

  if (options.save) {
    debug(`Start save result on file ${options.save}`);
    await saveToFile(domains, options.save);
    debug(`Finish save result on file ${options.save}`);
  }

}

(async () => {
  try {
    start();
  } catch (e) {
    console.error(e);
  }
})()