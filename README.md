# Domains Processor
Search in the RegistroBR the list of released domains filter and query availability

## Use

```javascript
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
```

### When running

```
node index.js
```

> Result 

![Result](/documentation/images/expected-result.png)
