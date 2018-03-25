const checkAvailabilityOnRegistroBr = require('./checkAvailabilityOnRegistroBr');

module.exports = function (domains) {
  domains.forEach(domain => {
    checkAvailabilityOnRegistroBr(domain)
      .then(response => {
        if (response) {
          console.log('\x1b[36m%s\x1b[0m', 'Dominio: ' + domain + ' [ Disponível ]'); 
        } else {
          console.log('\x1b[31m%s\x1b[0m', 'Dominio: ' + domain + ' [ Não Disponível ]'); 
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
}