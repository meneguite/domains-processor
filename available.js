const checkAvailabilityOnRegistroBr = require('./functions/checkAvailabilityOnRegistroBr');
const domains = process.argv.slice(2) || [];

domains.forEach(async (domain) => {
  await checkAvailabilityOnRegistroBr(domain, true);
});