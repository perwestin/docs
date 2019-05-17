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
        [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]
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

### Response

    {
        "transactionStatus": "[TRANSACTION_STATUS]",
        "paymentId": "[PAYMENT_ID]",
        "_links": {
            "startAuthorisationWithTransactionAuthorisation": {
                "href": "/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]]/[PAYMENT_ID]/authorisations"
            },
            "self": {
                "href": "/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]]/[PAYMENT_ID]"
            },
            "status": {
                "href": "/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]]/[PAYMENT_ID]/status"
            }
        },
        "psuMessage": "Please confirm payment [PAYMENT_ID]"
    }

### Response headers

`X-Request-ID`


## Get payment information

    curl -X GET
        [API_HOST]/psd2/paymentinitiation/v1/payments/domestic/[PAYMENT_ID]
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Headers

See [Payment initiation request](/docs/tutorials/payments#payment-initiation-request)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response

    {
        "creditorAgent": "[BICFI]",
        "remittanceInformationUnstructured": "[MESSAGE]",
        "transactionStatus": "[TRANSACTION_STATUS]",
        "creditorAccount": {
            "iban": "[CREDITOR_IBAN]",
            "currency": "SEK"
        },
        "creditorName": "Enterprise Inc",
        "debtorAccount": {
            "iban": "[DEBTOR_IBAN]",
            "currency": "SEK"
        },
        "instructedAmount": {
            "currency": "SEK",
            "amount": "142.66"
        }
    }

### Response headers

`X-Request-ID`


## Payment cancellation request

Not implemented yet.


## Payment initiation status request

    curl -X GET
        [API_HOST]/psd2/paymentinitiation/v1/payments/domestic/[PAYMENT_ID]/status
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Headers

See [Payment initiation request](/docs/tutorials/payments#payment-initiation-request)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response

    {
        "transactionStatus": "ACTC"
    }

### Response headers

`X-Request-ID`


## Start the authorisation process for a payment initiation

    curl -X POST
        [API_HOST]/psd2/paymentinitiation/v1/payments/domestic/[PAYMENT_ID]/authorisations
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'
        -H 'Content-Type: application/json'

Note that this call does not need a body.

### Headers

See [Payment initiation request](/docs/tutorials/payments#payment-initiation-request)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response

    {
        "authorisationId": "[PAYMENT_AUTH_ID]",
        "scaStatus": "received",
        "scaMethods": [
            {
                "authenticationType": "PUSH_OTP",
                "authenticationMethodId": "Mobilt BankID",
                "name": "Mobilt BankID"
            }
        ],
        "_links": {
            "authoriseTransaction": {
                "href": "/psd2/paymentinitiation/v1/payments/domestic/[PAYMENT_ID]/authorisations/[PAYMENT_AUTH_ID]"
            }
        }
    }

### Response headers

- `ASPSP-SCA-Approach` - see below for different values.
- `X-Request-ID`


## Get payment initiation authorisation sub-resources request


## Read the SCA status of the payment initiation


## Update PSU data for payment initiation


## Schemas

### Transaction status

Read more about the potential values in the NextGen specification.