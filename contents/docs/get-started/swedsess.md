---
title: SWEDBANK
root: "/docs"
parents: ["Introduction"]
prio: 0
---

# SWEDBANK

## ASPSP INFORMATION

Name: SWEDBANK AB

BIC: SWEDSESS

Office

Landsvägen 40

SE-172 63 Sundbyberg

Sweden

Phone: +46 8 585 90 000


Services available: Swedish Private transaction accounts.

SCA is based on BankID which are an identification solution that allows companies, banks and governments agencies to authenticate and conclude agreements with individuals over the Internet. For more information on BankID: www.bankid.com. 

Swedbank has a redirect authentication flow. It is not possible to get an access token unless redirecting the user. Since Open Payments wrap this functionality after completing the consent flow (where we return a redirect url pointing to our identity server), 
and Swedbank requires an SCA for approving consents and payments, Open Payments redirect the user twice. 

First time for signing in and getting an access token, and the second time to approve the consent / payment. 

Swedbank Consent flow allows for the creation of a consent which does not require a list of accounts. This consent is valid immediately without requiring a consent authorization but is only valid for GetAccounts. It is meant to be used to create a second consent with a list of accounts.

In Open Payments gateway we wrap this functionality, meaning if a user creates a consent without providing a list of accounts, we first create a consent at the ASPSP which is valid for a one-time use and then call their GET accounts endpoint to get a list of accounts.

We then call the ASPSPs create consent endpoint again, but with the accounts fetched from the previous step.
</em>

## PAYMENT INITIATION SERVICE (PIS)

### Note
As of 03/12-2019 the GetPaymentAuthorization returns 404. We cannot finalize a payment due to a bug in SWEDSESS production environment. After confirming a payment no state nor code is returned when the ASPSP redirects the user back to the supplied redirectUri. This means we cannot set status on payment. The payment still goes through on the ASPSPs side. A fix is expected to be deployed the second week of Januari 2020.

Cut off times and processing rules for Swedbank. 
Please note that other rules can apply when the payment is initiated on the day before a Bank holiday, or when a particular SCA approach is used.

|Payment  | Typ| General rule| Cut-off time| Processing rules|
|---------|----|-------------|-------------|-----------------|
|Bankgiro payment|| Require Bankgiro number connected to the account|CET 10:00|Executed next day|
|Transfer|Own accounts within Swedbank |SEK||Processed immediately|
||        |To other banks| Only SEK| CET 10:00|Processed immediately|

Swedbank have the following endpoints implemented: 
-Initiate payment (domestic or international)
-Delete payment
-Get payment
-Get payment status
-Initiate payment authorization
-Get payment authorization status

|Available payments service|Support|
|--------------------------|-------|
|Payment initiation request POST/v1/{payment-service}/{payment-product}|Supported|
|Get Payment Information GET/v1/{payment-service}/{paymentId}|Supported|
|Payment Cancellation Request DELETE/v1/{payment-service}/{paymentId}|Not supported|
|Payment initiation status request GET/v1/{payment-service}/{paymentId}/status|Supported|
|Start the authorization process for a payment initiation POST/v1/{payment-service}/{paymentId}/authorizations|Supported|
|Get Payment Initiation authorization Sub-Resources Request GET/v1/{payment-service}/{paymentId}/authorizations|Supported|
|Get the SCA Status of the payment authorization GET/v1/{payment-service}/{paymentId}/authorizations/{authorizationId}|Supported, but right now broken at ASPSP|
|Update PSU data for payment initiation PUT/v1/{payment-service}/{paymentId}/authorizations/{authorizationId} |Supported|
|Start the authorization process for the cancellation of the addressed payment POST/v1/{payment-service}/{paymentId}/cancellation-authorizations|Not supported by the bank|
|Get Cancellation authorizations GET/v1/{payment-service}/{paymentId}/cancellation-authorizations|Not supported by the bank|
|Get status of the payment cancellation's authorization GET/v1/{payment-service}/{paymentId}/cancellation-authorizations/{cancellationId}|Not supported by the bank|
|Update PSU Data for payment initiation cancellation PUT/v1/{payment-service}/{paymentId}/cancellation-authorizations/{cancellationId}|Not supported by the bank|

### Payment Products
Domestic	swedish-domestic-credit-transfer (Transfer)

### Initiate Payment

Data returned from ASPSP:

```

{
    "_links": {
        "self": {
            "href": "/v2/payments/8e065d56-053b-4b4b-973f-776c34db3db6"
        },
        "status": {
            "href": "/v2/payments/8e065d56-053b-4b4b-973f-776c34db3db6/status"
        },
        "scaRedirect": {
            "href": "https://psd2.swedbank.se/app/consent/login-open-banking?token=3c14a2fc6aea083695005d9b93b902fe109998d08df9533158f9310a4298ee30&ns=1"
        },
        "scaStatus": {
            "href": "/v2/payments/8e065d56-053b-4b4b-973f-776c34db3db6/authorisations/5a3d0354-e0b5-44b9-8733-53f04c8f8a77"
        }
    },
    "paymentId": "8e065d56-053b-4b4b-973f-776c34db3db6",
    "transactionStatus": "ACTC"
}

```

Data returned from OBP:

```

{
    "transactionStatus": "RCVD",
    "paymentId": "99caff6a-2614-4c85-b084-e42b4f918134",
    "_links": {
        "startAuthorisationWithTransactionAuthorisation": {
            "href": "/payments/domestic/99caff6a-2614-4c85-b084-e42b4f918134/authorisations"
        },
        "self": {
            "href": "/payments/domestic/99caff6a-2614-4c85-b084-e42b4f918134"
        },
        "status": {
            "href": "/payments/domestic/99caff6a-2614-4c85-b084-e42b4f918134/status"
        }
    },
    "psuMessage": "Please confirm payment 99caff6a-2614-4c85-b084-e42b4f918134"
}

```

### Get Payment

Data returned from ASPSP:

```

{
    "instructedAmount": {
        "currency": "SEK",
        "amount": 1
    },
    "debtorAccount": {
        "iban": "SE9380000810596948579930"
    },
    "creditorFriendlyName": "Open Payments Europe",
    "remittanceInformationUnstructured": {
        "referenceType": "OCR"
    },
    "creditorAccount": {
        "iban": "SE8080000810596948756801"
    }
}

```

Data returned from OBP:

```

{
    "creditorAgent": "SWEDSESS",
    "transactionStatus": "RCVD",
    "creditorAccount": {
        "iban": "SE8080000810596948756801",
        "currency": "SEK"
    },
    "creditorName": "Open Payments Europe",
    "debtorAccount": {
        "iban": "SE9380000810596948579930",
        "currency": "SEK"
    },
    "instructedAmount": {
        "currency": "SEK",
        "amount": "1"
    }
}

```

### Get Payment Status

Data returned from ASPSP:

```

{
    "transactionStatus": "ACSC"
}

```

Data returned from OPB:

```

{
    "transactionStatus": "ACSC"
}

```

### Creat Payment Authorization

Data returned from ASPSP:

```

{
    "_links": {
        "self": {
            "href": "/v2/payments/8e065d56-053b-4b4b-973f-776c34db3db6"
        },
        "scaRedirect": {
            "href": "https://psd2.swedbank.se/app/consent/login-open-banking?token=e5a66d686a4fc9be37e72b142650c9dac1d756068e6047f0d635edcb160713d9&ns=1"
        },
        "scaStatus": {
            "href": "/v2/payments/8e065d56-053b-4b4b-973f-776c34db3db6/authorisations/ad08a98a-3c6f-4208-b3fb-42230df30b51"
        }
    },
    "authorisationId": "ad08a98a-3c6f-4208-b3fb-42230df30b51",
    "transactionStatus": "received"
}

```

Data returned from OBP:

```

{
    "authorisationId": "e85179df-7ee4-4bb9-a2fe-12bdff349973",
    "scaStatus": "received",
    "scaMethods": [
        {
            "authenticationType": "PUSH_OTP",
            "authenticationMethodId": "mbid",
            "name": "Mobilt BankID"
        }
    ],
    "_links": {
        "authoriseTransaction": {
            "href": "/payments/domestic/99caff6a-2614-4c85-b084-e42b4f918134/authorisations/e85179df-7ee4-4bb9-a2fe-12bdff349973"
        },
        "scaStatus": {
            "href": "/payments/domestic/99caff6a-2614-4c85-b084-e42b4f918134/authorisations/e85179df-7ee4-4bb9-a2fe-12bdff349973"
        }
    }
}

```

### Get Payment Authorization

Data returned from ASPSP:

```

{
    "scaStatus":"finalised"
}

```

Data returned from OBP:

```

{
    "scaStatus":"finalised"
}

```

## ACCOUNT INFORMATION SERVICE (AIS)
Requests to the account information API does not require direct PSU involvement once the consent is given, but on such requests, limit will be applied. Account information services can be called 4 times per 24h without PSU involvement. 
Maximum validity of the consent is 90 days. When the consent has expired the TPP need to resubmit a consent and request SCA with PSU involvement. 
When retrieving transaction list, it cannot be older than 90 days. 


Available services| Support|
|-----------------|--------------|
|Available Account Information service|Support|
|Read Account List GET/v1/accounts|Supported|
|Read Account Details GET/v1/accounts/{account-id}|Supported|
|Read Balance GET/v1/accounts/{account-id}/balances|Supported|
|Read Transaction List GET/v1/accounts/{account-id}/transactions/|Supported|
|Read Transaction Details GET/v1/accounts/{account-id}/transactions/{resourceId}|Not supported by the bank|

### Get Accounts

Data returned from ASPSP:

```

{
    "accounts": [
        {
            "resourceId": "4bb82d9e8d5420024cde2ca74f54013",
            "iban": "SE9380000810596948579930",
            "bban": "8105-9,694 857 993-0",
            "currency": "SEK",
            "product": "Privatkonto",
            "cashAccountType": "CACC",
            "bankId": "08999",
            "balances": [
                {
                    "balanceType": "interimAvailable",
                    "balanceAmount": {
                        "currency": "SEK",
                        "amount": "999.00"
                    }
                },
                {
                    "balanceType": "authorised",
                    "balanceAmount": {
                        "currency": "SEK",
                        "amount": "999.00"
                    }
                }
            ]
        }
    ]
}

```

Data returned from OBP:

```

{
    "accounts": [
        {
            "resourceId": "4bb82d9e8d5420024cde2ca74f54013",
            "iban": "SE9380000810596948579930",
            "bban": "8105-9,694 857 993-0",
            "product": "Privatkonto",
            "cashAccountType": "CACC",
            "bic": "SWEDSESS",
            "balances": [
                {
                    "balanceAmount": {
                        "currency": "SEK",
                        "amount": "999.00"
                    },
                    "balanceType": "interimAvailable",
                    "creditLimitIncluded": false
                },
                {
                    "balanceAmount": {
                        "currency": "SEK",
                        "amount": "999.00"
                    },
                    "balanceType": "expected",
                    "creditLimitIncluded": false
                }
            ]
        }
    ]
}

```

### Get Account details

Data returned from ASPSP:

```
{
    "account": {
        "resourceId": "4bb82d9e8d5420024cde2ca74f54013",
        "iban": "SE9380000810596948579930",
        "bban": "8105-9,694 857 993-0",
        "currency": "SEK",
        "product": "Privatkonto",
        "cashAccountType": "CACC",
        "bankId": "08999",
        "balances": [
            {
                "balanceType": "interimAvailable",
                "balanceAmount": {
                    "currency": "SEK",
                    "amount": "999.00"
                }
            },
            {
                "balanceType": "authorised",
                "balanceAmount": {
                    "currency": "SEK",
                    "amount": "999.00"
                }
            }
        ],
        "_links": {
            "balances": {
                "href": "/v2/accounts/4bb82d9e8d5420024cde2ca74f54013/balances"
            },
            "transactions": {
                "href": "/v2/accounts/4bb82d9e8d5420024cde2ca74f54013/transactions"
            }
        }
    }
}

```

Data returned from OBP:

```

{
    "resourceId": "4bb82d9e8d5420024cde2ca74f54013",
    "iban": "SE9380000810596948579930",
    "bban": "8105-9,694 857 993-0",
    "currency": "SEK",
    "product": "Privatkonto",
    "cashAccountType": "CACC",
    "status": "enabled",
    "bic": "SWEDSESS",
    "usage": "PRIV",
    "balances": [
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "999.00"
            },
            "balanceType": "interimAvailable",
            "creditLimitIncluded": false
        },
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "999.00"
            },
            "balanceType": "expected",
            "creditLimitIncluded": false
        }
    ]
}

```


### Get Account balance

Data returned from ASPSP:

```

{
    "account": {
        "iban": "SE9380000810596948579930"
    },
    "balances": [
        {
            "balanceType": "interimAvailable",
            "balanceAmount": {
                "currency": "SEK",
                "amount": "999.00"
            },
            "referenceDate": "2019-11-08"
        },
        {
            "balanceType": "authorised",
            "balanceAmount": {
                "currency": "SEK",
                "amount": "999.00"
            },
            "referenceDate": "2019-11-08"
        }
    ]
}

```

Data returned from OBP:

```

{
    "balances": [
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "999.00"
            },
            "balanceType": "interimAvailable",
            "referenceDate": "2019-11-08",
            "creditLimitIncluded": false
        },
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "999.00"
            },
            "balanceType": "expected",
            "referenceDate": "2019-11-08",
            "creditLimitIncluded": false
        }
    ]
}

```

### Get Account transactions


Data returned from ASPSP: 

```

{
    "account": {
        "iban": "SE9380000810596948579930"
    },
    "transactions": {
        "booked": [
            {
                "bookingDate": "2019-11-06",
                "valueDate": "2019-11-06",
                "transactionDate": "2019-11-06",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                },
                "remittanceInformationUnstructured": "810596948756918",
                "remittanceInformationStructured": "Överföring via internet"
            },
            {
                "bookingDate": "2019-10-18",
                "valueDate": "2019-10-21",
                "transactionDate": "2019-10-18",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "1000.00"
                },
                "remittanceInformationUnstructured": "LOUISE BRAND",
                "remittanceInformationStructured": "Insättning"
            }
        ],
        "pending": []
    }
}

```

Data returned from OBP:

```

{
    "transactions": {
        "booked": [
            {
                "bookingDate": "2019-11-28",
                "valueDate": "2019-11-28",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-20",
                "valueDate": "2019-11-20",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-19",
                "valueDate": "2019-11-19",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-19",
                "valueDate": "2019-11-19",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-12",
                "valueDate": "2019-11-12",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-12",
                "valueDate": "2019-11-12",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-12",
                "valueDate": "2019-11-12",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-12",
                "valueDate": "2019-11-12",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-12",
                "valueDate": "2019-11-12",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-11",
                "valueDate": "2019-11-11",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            },
            {
                "bookingDate": "2019-11-08",
                "valueDate": "2019-11-08",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-178.00"
                }
            },
            {
                "bookingDate": "2019-11-06",
                "valueDate": "2019-11-06",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "-1.00"
                }
            }
        ],
        "pending": [],
        "_links": {
            "account": "/psd2/accountinformation/v1/accounts/4bb82d9e8d5420024cde2ca74f54013"
        }
    },
    "balances": []
}

```
Data returned from ASPSP:

## CONSENT SERVICES
All endpoints require that you send the PSU-IP-Address.


Available Consent Services| Support
|-------------------------|-----------|
|Create consent POST/v1/consents|Supported|
|Get Consent Request GET/v1/consents/{consentId}|Supported|
|Delete Consent DELETE/v1/consents/{consentId}|Supported|
|Consent status request GET/v1/consents/{consentId}/status|Supported|
|Start the authorization process for a consent POST/v1/consents/{consentId}/authorizations|Supported|
|Get the consent authorizations GET /v1/consents/{consentId}/authorizations|Supported|
|Read the SCA status of the consent authorization GET/v1/consents/{consentId}/authorizations/{authorizationId}|Supported, but right now borken at ASPSP|
|Update PSU Data for consents PUT/v1/consents/{consentId}/authorizations/{authorizationId}|Supported|

### Create Consent

Data returned from ASPSP:

```

{
    "consentId": "036f9e4f-6488-413c-bcb8-c4b0bafa0d4a",
    "consentStatus": "received",
    "_links": {
        "status": {
            "href": "/v2/consents/036f9e4f-6488-413c-bcb8-c4b0bafa0d4a/status"
        },
        "scaRedirect": {
            "href": "https://psd2.swedbank.se/app/consent/login-open-banking?token=3b2a1e0763d3e34792b9934fed5d7bdde637f24f044ab4d5affeb7d820b73bfe&ns=1"
        }
    }
}

```

Data returned from OBD:

```

{
    "consentStatus": "received",
    "consentId": "eb9f9f9b-1a8b-463e-8602-4565ee5b62b2",
    "scaMethods": [
        {
            "authenticationType": "PUSH_OTP",
            "authenticationMethodId": "mbid",
            "name": "Mobilt BankID"
        }
    ],
    "_links": {
        "self": {
            "href": "/consents/eb9f9f9b-1a8b-463e-8602-4565ee5b62b2"
        },
        "status": {
            "href": "/consents/eb9f9f9b-1a8b-463e-8602-4565ee5b62b2/status"
        },
        "startAuthorisation": {
            "href": "/consents/eb9f9f9b-1a8b-463e-8602-4565ee5b62b2/authorisations"
        }
    }
}

```

### Create Consent Authorization

Data returned from ASPSP:

```

{
    "_links": {
        "scaRedirect": {
            "href": "https://psd2.swedbank.se/app/consent/login-open-banking?token=f4408df19d008b57e1a103a8bca26c1062da28f8d87eb808d94f956bdaf660d4&ns=1"
        },
        "scaStatus": {
            "href": "/v2/consents/036f9e4f-6488-413c-bcb8-c4b0bafa0d4a/authorisations/323d1945-25b1-4bbe-9080-81c736b89d6a/status"
        }
    },
    "authorisationId": "323d1945-25b1-4bbe-9080-81c736b89d6a",
    "status": "received"
}

```

Data returned from OBP:

```
{
    "authorisationId": "064ec410-9e89-4d22-ad5b-33cf2685bb60",
    "scaMethods": [
        {
            "authenticationType": "PUSH_OTP",
            "authenticationMethodId": "Mobilt BankID",
            "name": "Mobilt BankID"
        }
    ],
    "_links": {
        "scaStatus": {
            "href": "/consents/eb9f9f9b-1a8b-463e-8602-4565ee5b62b2/authorisations/064ec410-9e89-4d22-ad5b-33cf2685bb60"
        },
        "selectPsuAuthenticationMethod": {
            "href": "/consents/eb9f9f9b-1a8b-463e-8602-4565ee5b62b2/authorisations/064ec410-9e89-4d22-ad5b-33cf2685bb60"
        }
    },
    "scaStatus": "received"
}

```

## SCA METHODS
Swedbank uses Mobilt BankID (mbid) with decoupled flow.

Only SelectPsuAuthenticationMethod is supported for:

|Endpoint|
|---|
|PUT/v1/consents/{consentId}/authorizations/{authorizationId}|
|PUT/v1/{payment-service}/{paymentId}/authorizations/{authorizationId}|







