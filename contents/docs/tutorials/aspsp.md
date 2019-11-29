---
title: Getting started with the API and ASPSP
root: "/docs"
parents: ["Get Started"]
prio: 0
---
# Getting started with the API and ASPSP

Open Payments Platform uses OAuth2 (specifically OIDC) for authentication. In the following sections, we have provided step
by step instructions on how you will interact with the platform. Throughout this documentation we use brackets to denote variables that need to be replaced with corresponding values. The actual domains to access are two - one for handling auth and one for doing the actual calls. See list below for values in sandbox and production.

Available `AUTH_HOST` values
- https://auth.sandbox.openbankingplatform.com
- https://auth.openbankingplatform.com

Available `API_HOST` values
- https://api.sandbox.openbankingplatform.com
- https://api.openbankingplatform.com


## Register a client

[Register a client](https://developer.openpayments.io) by creating a developer account at our [Developer Portal](https://developer.openpayments.io) to acquire client credentials.
Decide what parts of the API you want access to for your new client. At this point you can choose one or several of ASPSP Information, Account Information
and Payment Initiation. Read more about these below.
You will get a `client_id` and a `client_secret` that you can use to authenticate with the platform. The secret will not be stored on our end so it is iportant that you keep track of it. Otherwise you'll have to obtain new credentials in the portal.


## General notes about requests

### X-Request-ID

All calls accept a header called `X-Request-ID` - this should be set to a newly generated guid. Denoted in the code with [GUID]. If your client is also a platform it would make sense to accept such an id from the client that calls you. This id is used to trace requests through our systems. Logging it somewhere together with the request will make bug hunting much easeir.


## Acquire an access token for ASPSP Information

    curl -X POST
		[AUTH_HOST]/connect/token
		-H 'Content-Type: application/x-www-form-urlencoded'
		-d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&scope=aspspinformation&grant_type=client_credentials'

This post will return a JSON object that looks like this:

    {
        "access_token": "[ACCESS_TOKEN]",
        "expires_in": 7776000,
        "token_type": "Bearer",
        "scope": "aspspinformation"
    }

Bring the ACCESS_TOKEN forward to subsequent calls.


## Get countries

    curl -X GET
		[API_HOST]/psd2/aspspinformation/v1/countries
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'X-Request-ID: [GUID]'

### Query parameters

- `isoCountryCodes` a comma separated list of countries to retrieve. Optional.

### Response

    {
        "countries": [
            {
                "isoCountryCode": "SE",
                "name": "Sweden"
            },
            {
                "isoCountryCode": "FI",
                "name": "Finland"
            },
            {
                "isoCountryCode": "DE",
                "name": "Germany"
            },
            {
                "isoCountryCode": "DK",
                "name": "Denmark"
            }
        ]
    }

Where the country code and name will be according to the ISO 3166-1 alpha-2 standard.


## Get one country

    curl -X GET \
        [API_HOST]/psd2/aspspinformation/v1/countries/[COUNTRY_CODE]
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'X-Request-ID: 6ff9e7ee-2ac2-42d3-a188-c7314d434b9c'

### Path parameter

The `COUNTRY_CODE` parameter should be one of the codes in the ISO 3166-1 alpha-2 standard.

### Response

    {
        "isoCountryCode": "SE",
        "name": "Sweden"
    }

This is exactly the same as in the country list.


## Get cities

    curl -X GET
		[API_HOST]/psd2/aspspinformation/v1/cities
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'X-Request-ID: [GUID]'

### Query parameters

- `isoCountryCodes` a comma separated list of countries to retrieve cities for. Optional.
- `cityIds` a comma separated list of city ids to retrieve. Optional.

The service will return all matches for the queries. So querying for `SE` and `ba9dd929-1408-33a6-3ce2-bc45fcfaaa5c` will result in both Stockholm and Helsinki being returned.

### Response

    {
        "cities": [
            {
                "cityId": "37efa883-c8ad-4ff7-927b-b11b02beb923",
                "name": "Stockholm",
                "isoCountryCode": "SE"
            },
            {
                "cityId": "ba9dd929-1408-33a6-3ce2-bc45fcfaaa5c",
                "name": "Helsinki",
                "isoCountryCode": "FI"
            },
            {
                "cityId": "bb97dd78-835c-9922-e700-a8b5b3f5cbba",
                "name": "Frankfurt",
                "isoCountryCode": "DE"
            },
            {
                "cityId": "8f64d9db-7f38-e13e-cbf8-809e6bc6175c",
                "name": "Copenhagen",
                "isoCountryCode": "DK"
            }
        ]
    }


## Get one city

    curl -X GET
		[API_HOST]/psd2/aspspinformation/v1/cities/[CITY_ID]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'X-Request-ID: [GUID]'


### Path parameter

`CITY_ID` should be one of the ids returned from the "get cities" endpoint.

### Response

    {
        "cityId": "37efa883-c8ad-4ff7-927b-b11b02beb923",
        "name": "Stockholm",
        "isoCountryCode": "SE"
    }

This is exactly as one item in the list returned from the "get cities" endpoint.


## Get ASPSPs

    curl -X GET
		[API_HOST]/psd2/aspspinformation/v1/aspsps
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'X-Request-ID: [GUID]'

### Query parameters

- `isoCountryCodes` a comma separated list of countries to retrieve ASPSPs for. Optional.
- `cityIds` a comma separated list of city ids to retrieve ASPSPs for. Optional.

The service will return all matches for the queries. So it is possible to get all ASPSPs in Sweden and Helsinki by sending in the country code for Sweden and the city id for Helsinki.

### Response

    {
        "aspsps": [
            {
                "bicFi": "ESSESESS",
                "name": "Skandinaviska Enskilda Banken AB ",
                "logoUrl": "https://openbankingplatform.blob.core.windows.net/image/ESSESESS.png"
            },
            {
                "bicFi": "NDEASESS",
                "name": "Nordea Bank AB",
                "logoUrl": "https://openbankingplatform.blob.core.windows.net/image/NDEASESS.png"
            },
            {
                "bicFi": "HANDSESS",
                "name": "Handelsbanken",
                "logoUrl": "https://openbankingplatform.blob.core.windows.net/image/HANDSESS.png"
            }
        ]
    }


## Get ASPSP

    curl -X GET
		[API_HOST]/psd2/aspspinformation/v1/aspsps/[BICFI]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'X-Request-ID: [GUID]'

### Path parameter

- `BICFI` ASPSP identifier. It can be known upfront or it can be picked from the previous response.

### Response

    {
        "city": "Stockholm",
        "country": "Sweden",
        "postalCode": "106 40",
        "streetAddress": "Kungsträdgårdsgatan 8",
        "companyNumber": "502032-9081",
        "phone": "+46-771 365 365",
        "websiteUrl": "https://seb.se/",
        "globalPaymentProducts": [
            "sepa-credit-transfers",
            "domestic"
        ],
        "paymentProducts": [
            "swedish-domestic-private-credit-transfers",
            "swedish-domestic-private-own-accounts-transfers",
            "swedish-domestic-private-bankgiros",
            "swedish-domestic-private-plusgiros",
            "sepa-credit-transfers",
            "cross-border-credit-transfers",
            "high-value-credit-transfers",
            "dk-domestic-credit-transfers",
            "intra-company-credit-transfers",
            "no-domestic-credit-transfers",
            "pl-domestic-credit-transfers",
            "se-domestic-credit-transfers",
            "uk-domestic-credit-transfers"
        ],
        "supportedAuthorizationMethods": [
            {
                "name": "OAuth2",
                "uri": "https://auth.dev.openbankingplatform.com/.well-known/openid-configuration"
            }
        ],
        "bicFi": "ESSESESS",
        "name": "Skandinaviska Enskilda Banken AB ",
        "logoUrl": "https://opeopenbanking.blob.core.windows.net/images/ESSESESS.jpg"
    }

This result contains contact details for the bank and information about how to access its services through Open Payments API.

The list of **global payment products** is generic payments products that we support for all banks (where it makes sense). In this case the swedish bank SEB has support for domestic payments internally in Sweden and sepa payments on the European market. When using these we have a unified API for payments that work across banks. If you want a no hassle experience where the API towards us always is the same - this is the products to use.

The list of **payment products** is specifically for the bank at hand. When using one of these you have to send payment information in a format the bank will accept. 

Read more about the [payment initiation](/docs/tutorials/payments) API.


## Flows of usage

The APIs in this product does not interface directly with the banks but provide information to be able to access banks dynamically. We will add banks continuously and if you get the list of banks from this API you will get access to these new banks automatically without the need to do any coding. 

A typical flow in the system may be like this:
- the user is presented a list of supported countries
- the user select a country
- the system retrieves a list of banks for that country
- the user selects its bank
- the system moves on to one of the other APIs to get account information or to initiate a payment
