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

// get a list of investments
// pagination defaults are page=1 and per=25
FundAmerica.investments.list(function(err, data) {
    console.log(data);
    if(err){
        console.log(err);
    }
});

// get page 2 of offerings
FundAmerica.offerings.list(function(err, data) {
    console.log(data);
    if(err){
        console.log(err);
    }
}, {page: 2});
```

The query strings `page` and `per` can be sent to a list action to change which page is being viewed and how many resources are included in a page.
