## Node.js API Wrapper for Fund America


### Documentation
Located [here](https://apps.fundamerica.com/support/documentation)


### Sample Code
```
var FundAmerica = require('fundamerica');
FundAmerica.init('YOUR API KEY');

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
