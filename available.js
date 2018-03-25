const processResult = require('./functions/processResult');
const domains = process.argv.slice(2) || [];

processResult(domains);