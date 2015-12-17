var https = require('https');
var querystring = require('querystring');

(function(){
    var FundAmerica = {};
    //expose to global
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
          exports = module.exports = FundAmerica;
        }
        exports.FundAmericaAPI = FundAmerica;
    }
    else {
        root['FundAmericaAPI'] = FundAmerica;
    }
    //private members and functions
    var _authKey;

    function _getRequestOptions(path){
        return {
            host: 'apps.fundamerica.com',
            path: '/api/' + path,
            auth: _authKey
        };
    }

    function _requestCallback(cb, noParse){
        return function(response){
            var str = '';
            var err = null;
            err = response.statusCode >= 400 ? response.statusCode : null;
            response.on('data', function(chunk){
                str += chunk;
            });

            response.on('end', function(){
                if(cb){
                    if(!noParse){
                        try{
                            cb(err, JSON.parse(str));
                        }
                        catch(err){
                            cb(err);
                        }
                    }
                    else{
                        cb(err, str);
                    }

                }
            });

            response.on('error', function(error){
                return cb(error);
            })
        }
    }

    function _get(path, cb, noParse){
        var opts = _getRequestOptions(path);
        var request = https.request(opts, _requestCallback(cb, noParse));
        request.end();
    }

    function _put(path, data, cb){
        var dstr = querystring.stringify(data);
        var opts = _getRequestOptions(path + "?" + dstr);
        opts.method = "PUT";

        var request = https.request(opts, _requestCallback(cb));

        request.end();
    }

    function _delete(path, cb){
        var opts = _getRequestOptions(path);
        opts.method = "DELETE";
        var request = https.request(opts, _requestCallback(cb));
        request.end();
    }

    function _post(path, data, cb){
        var dstr = JSON.stringify(data);
        var opts = _getRequestOptions(path);

        opts.method = "POST";
        opts.headers = {
            'Content-Type': 'application/json',
            'Content-Length': dstr.length
        }

        var request = https.request(opts, _requestCallback(cb));

        request.write(dstr);
        request.end();
    }

    //public methods for setting API key
    FundAmerica.init = function(key){
        _authKey = key;
    }

    //Account Info
    FundAmerica.info = function(cb){
        _get('info', cb);
    }

    //ACH
    FundAmerica.ach = {
        list: function(cb){
            _get('ach_authorizations', cb);
        },

        getOne: function(key, cb){
            _get('ach_authorizations/' + key, cb);
        },

        delete: function(key, cb){
            _delete('ach_authorizations/' + key, cb);
        },

        create: function(data, cb){
            _post('ach_tokens', data, cb);
        }
    }

    //Background Check
    FundAmerica.backgroundCheck = {
        list: function(cb){
            _get('background_checks', cb);
        },

        getOne: function(key, cb){
            _get('background_checks/' + key, cb);
        },

        create: function(data, cb){
            _post('background_checks', data, cb);
        }
    }

    //Billing Logs
    FundAmerica.billingLogs = {
        list: function(cb){
            _get('billing_logs', cb);
        },

        getOne: function(key, cb){
            _get('billing_logs/' + key, cb);
        }
    }

    //Close Offering Request
    FundAmerica.closeOfferingRequests = {
        list: function(cb){
            _get('close_offering_requests', cb);
        },

        getOne: function(key, cb){
            _get('close_offering_requests/' + key, cb);
        },

        create: function(data, cb){
            _post('close_offering_requests', data, cb);
        }
    }

    //Cancel Offering Requests
    FundAmerica.cancelOfferingRequests = {
        list: function(cb){
            _get('cancel_offering_requests', cb);
        },

        getOne: function(key, cb){
            _get('cancel_offering_requests/' + key, cb);
        },

        create: function(data, cb){
            _post('cancel_offering_requests', data, cb);
        }
    }

    //KYC token
    FundAmerica.kycToken = {
        create: function(data, cb){
            _post('kyc_tokens', data, cb);
        }
    }

    //Webhooks
    FundAmerica.webhookLogs = {
        list: function(cb){
            _get('webhook_logs', cb);
        },

        getOne: function(key, cb){
            _get('webhook_logs/' + key, cb);
        }
    }

    //Trade Reviews 
    FundAmerica.tradeReviews = {
        list: function(cb){
            _get('trade_reviews', cb);
        },

        getOne: function(key, cb){
            _get('trade_reviews/' + key, cb);
        }
    }

    //Cancel Offering Requests
    FundAmerica.cancelOfferingRequests = {
        list: function(cb){
            _get('cancel_offering_requests', cb);
        },

        getOne: function(key, cb){
            _get('cancel_offering_requests/' + key, cb);
        },

        create: function(data, cb){
            _post('cancel_offering_requests', data, cb);
        }
    }

    //Escrow Agreements
    FundAmerica.escrowAgreements = {
        list: function(cb){
            _get('escrow_agreements', cb);
        },

        getOne: function(key, cb){
            _get('escrow_agreements/' + key, cb);
        },

        create: function(data, cb){
            _post('escrow_agreements', data, cb);
        }
    }

    //Escrow Service Applications
    FundAmerica.escrowServiceApplications = {
        list: function(cb){
            _get('escrow_service_applications', cb);
        },

        getOne: function(key, cb){
            _get('escrow_service_applications/' + key, cb);
        },

        create: function(data, cb){
            _post('escrow_service_applications', data, cb);
        }
    }

    //Offerings
    FundAmerica.offerings = {
        list: function(cb){
            _get('offerings', cb);
        },

        getOne: function(key, cb){
            _get('offerings/' + key, cb);
        },

        create: function(data, cb){
            _post('offerings', data, cb);
        },

        delete: function(key, cb){
            _delete('offerings/' + key, cb);
        },

        edit: function(key, data, cb){
            _patch('offerings/' + key, data, cb);
        },

        billingLogs: function(key, cb){
            _get('offerings/' + key + "/billing_logs", cb);
        }
    }

    //Entities
    FundAmerica.entities = {
        list: function(cb){
            _get('entities', cb);
        },

        getOne: function(key, cb){
            _get('entities/' + key, cb);
        },

        create: function(data, cb){
            _post('entities', data, cb);
        },

        delete: function(key, cb){
            _delete('entities/' + key, cb);
        },

        edit: function(key, data, cb){
            _patch('entities/' + key, data, cb);
        },

        achAuths: function(key, cb){
            _get('entities/' + key + "/achauthorizations", cb);
        }
    }

    //Investments
    FundAmerica.investments = {
        list: function(cb){
            _get('investments', cb);
        },

        getOne: function(key, cb){
            _get('investments/' + key, cb);
        },

        create: function(data, cb){
            _post('investments', data, cb);
        },

        delete: function(key, cb){
            _delete('investments/' + key, cb);
        },

        edit: function(key, data, cb){
            _patch('investments/' + key, data, cb);
        },

        billingLogs: function(key, cb){
            _get('investments/' + key + "/billing_logs", cb);
        }
    }

    // get bank info from routing number
    FundAmerica.bankinfo = function(routingno, cb) {
        _get('bank_info/' + routingno, cb);
    }

}).call(this);
