---
title: Getting started with the API and ASPSP
root: "/docs"
parents: ["Get Started"]
---
# Getting started with the API and ASPSP

Open Payments Platform uses OAuth2 (specifically OIDC) for authentication. In the following sections, we have provided step
by step instructions on how you will interact with the platform.

## Register a client

Navigate to [https://auth.sandbox.openbankingplatform.com/client/register](the client registration page) to acquire client credentials.
Decide what parts of the API you want access to for your new client. At this point you can choose one or several of ASPSP Information, Account Information
and Payment Initiation. Read more about these below.
You will get a `client_id` and a `client_secret` that you can use to authenticate with the platform.

## Acquire an access token for ASPSP Information

    curl -X POST
    https://auth.sandbox.openpaymentsplatform.com/connect/token
    -H 'Content-Type: application/x-www-form-urlencoded'
    -d 'client_id=[YOUR_CLIENT_ID]&client_secret=[YOUR_CLIENT_SECRET]&scope=aspspinformation&grant_type=client_credentials'

This post will return a JSON object that looks like this:

    {
        "access_token": "[ACCESS_TOKEN]",
        "expires_in": 3600,
        "token_type": "Bearer"
    }

## Get countries

    curl -X GET
    https://api.sandbox.openpaymentsplatform.com/psd2/aspspinformation/v1/countries
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'

### Query parameters

`isoCountryCodes` : a comma separated list of countries to retrieve. Optional.

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

## Get cities

    curl -X GET
    https://api.sandbox.openpaymentsplatform.com/psd2/aspspinformation/v1/cities
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'

### Query parameters

`isoCountryCodes` : a comma separated list of countries to retrieve cities for. Optional.
`cityIds` : a comma separated list of city ids to retrieve. Optional.

The service will return all matches for the queries.

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

## Get ASPSPs

    curl -X GET
    https://api.sandbox.openpaymentsplatform.com/psd2/aspspinformation/v1/aspsps
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'

### Query parameters

`isoCountryCodes` : a comma separated list of countries to retrieve ASPSPs for. Optional.
`cityIds` : a comma separated list of city ids to retrieve ASPSPs for. Optional.

The service will return all matches for the queries.

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
    https://api.sandbox.openpaymentsplatform.com/psd2/aspspinformation/v1/aspsps/[BICFI]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'

### Path parameter

`BICFI` : ASPSP identifier. It can be known upfront or it can be picked from the previous response.

### Response

    {
        "city": "Stockholm",
        "country": "Sweden",
        "postalCode": "106 70",
        "streetAddress": "Kungsträdgårdsgatan 2",
        "companyNumber": "502007-7862",
        "phone": "+46-8-701 10 00",
        "websiteUrl": "https://www.handelsbanken.se",
        "paymentProducts": [
            "sepa-credit-transfers",
            "domestic"
        ],
        "supportedAuthorizationMethods": [
            {
                "name": "Decoupled",
                "uri": ""
            }
        ],
        "bicFi": "HANDSESS",
        "name": "Handelsbanken",
        "logoUrl": "https://openbankingplatform.blob.core.windows.net/image/HANDSESS.png"
    }
