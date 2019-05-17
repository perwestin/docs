---
title: Getting started with payment initiation
root: "/docs"
parents: ["Get Started"]
---
# Getting started with the payment initiation

## Introduction

This documentation describes the payment flow.

## Acquire an access token for Payment Initiation

    curl -X POST
		[AUTH_HOST]/connect/token
		-H 'Content-Type: application/x-www-form-urlencoded'
		-d 'client_id=[YOUR_CLIENT_ID]&client_secret=[YOUR_CLIENT_SECRET]&scope=paymentinitiation&grant_type=client_credentials'

This post will return a JSON object that looks like this:

    {
        "access_token": "[ACCESS_TOKEN]",
        "expires_in": 3600,
        "token_type": "Bearer"
    }

## Payment initiation request

    curl -X POST
        https://api.sandbox.openbankingplatform.com/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'Content-Type: application/json'
        -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'
        -d '{
        "instructedAmount":
        {
            "currency": "SEK",
            "amount": "142.66"
        },
        "debtorAccount":
        {
            "iban": "[DEBTOR_IBAN]",
            "currency": "SEK"
        },
        "creditorName": "Enterprise Inc",
        "creditorAccount":
        {
            "iban": "[CREDITOR_IBAN]",
            "currency": "SEK"
        },
        "remittanceInformationUnstructured": "[MESSAGE]"
        }'

### Headers

- `PSU-IP-Address` is the IP address of the end user.
- `X-BicFi` the BICFI for the user's ASPSP. Find it in [the ASPSP API](/docs/tutorials/aspsp#get-aspsps-for-a-countries-andor-cities).
- `X-Request-ID` used to verify that the response matches the request.

### Path parameters

`PAYMENT_PRODUCT` can be one of:

- `domestic` - this is a non-euro payment within one country.
- `sepa-credit-transfers` - this is a EURO payment from one EURO ASPSP to another
- `international` - this is an international payment

The [ASPSP details endpoint](/docs/tutorials/aspsp#get-aspsp) will tell you what payment products that are availalbe for that ASPSP.


## Get payment information

## Payment cancellation request

## Payment initiation status request

## Start the authorization process for a payment initiation

## Read the SCA status of the payment initiation

## Update PSU data for payment initiation

## Start the authorization process for the cancellation of the addressed payment

## Will deliver an array of resource identifications to all generated cancellation authorization sub-resources

## Read the SCA status of gthe payment cancellation's authorization

## Update PSU data for payment initiation cancellation
