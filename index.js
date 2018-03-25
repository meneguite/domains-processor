const getAllDomains = require('./functions/getAllDomains');
const extractJsonDomains = require('./functions/extractJsonDomains');
const extractOnlyDomainsWithPrefix = require('./functions/extractOnlyDomainsWithPrefix');
const extractOnlyDomainsWithSuffix = require('./functions/extractOnlyDomainsWithSuffix');
const extractOnlyDomainsWithContains = require('./functions/extractOnlyDomainsWithContains');
const extractOnlyDomainNotStartWithNumbers = require('./functions/extractOnlyDomainNotStartWithNumbers');
const checkAvailabilityOnRegistroBr = require('./functions/checkAvailabilityOnRegistroBr');
const extractOnlyDomainsWithSizeBetween = require('./functions/extractOnlyDomainsWithSizeBetween');
const limitDomainsResult = require('./functions/limitDomainsResult');
const processResult = require('./functions/processResult');

const url = 'https://registro.br/dominio/proclib-l.html';
const htmlFile = './data/response.html';


getAllDomains(url, htmlFile, false)
  .then(extractJsonDomains)
  .then(extractOnlyDomainNotStartWithNumbers)
  .then(domains => extractOnlyDomainsWithPrefix(domains, 'b'))
  .then(domains => extractOnlyDomainsWithContains(domains, 'bitcoin'))
  .then(domains => extractOnlyDomainsWithSuffix(domains, '.com.br'))
  .then(domains => extractOnlyDomainsWithSizeBetween(domains, 2, 10))
  .then(domains => limitDomainsResult(domains, 10))
  .then(processResult)
  .catch((error) => {
    console.log(error);
  });