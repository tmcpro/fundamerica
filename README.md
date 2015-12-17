## Node.js API Wrapper for Fund America


### Documentation
Offical Documentation is located [here](https://apps.fundamerica.com/support/documentation).

Initialize Fundamerica by:

`FundAmerica.init('api_key', 'fa_api_subdomain');`

Checkout `fundamerica.js` for more information about endpoints in this package. 

### Sample Code
```
var FundAmerica = require('fundamerica');

// sandbox
FundAmerica.init('YOUR API KEY', 'sandbox');

// production
// FundAmerica.init('YOUR API KEY', 'apps');

function errorLog(err){
    console.log(err);
}

FundAmerica.info(function(err, data) {
    if(err){
        console.log(err);
    }
    console.log(data);
});
```
