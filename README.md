## Node.js API Wrapper for Fund America


### Documentation
Located [here](https://apps.fundamerica.com/support/documentation)


### Sample Code
```
var FundAmerica = require('fundamerica');

// sandbox
FundAmerica.init('YOUR API KEY', 'sandbox');

// production
// FundAmerica.init('YOUR API KEY', 'apps');

function errorLog(error){
    console.log(error);
}

FundAmerica.info(function(err, data) {
    console.log(data);
    if(err){
        console.log(err);
    }
});
```
