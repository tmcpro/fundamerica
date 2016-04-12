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

// get a list of investments
// pagination defaults are page=1 and per=25
FundAmerica.investments.list(function(err, data) {
    console.log(data);
    if(err){
        console.log(err);
    }
});

// get page 2 of offerings
FundAmerica.offerings.list({page: 2}, function(err, data) {
    console.log(data);
    if(err){
        console.log(err);
    }
});
```

The query strings `page` and `per` can be sent to a list action to change which page is being viewed and how many resources are included in a page.
