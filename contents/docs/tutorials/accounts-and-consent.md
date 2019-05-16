---
title: Getting started with consents
root: "/docs"
parents: ["Get Started"]
---
# Getting started with consents

## Acquire an access token for Account Information

    curl -X POST
		[AUTH_HOST]/connect/token
		-H 'Content-Type: application/x-www-form-urlencoded'
		-d 'client_id=[YOUR_CLIENT_ID]&client_secret=[YOUR_CLIENT_SECRET]&scope=accountinformation&grant_type=client_credentials'

This post will return a JSON object that looks like this:

    {
        "access_token": "[ACCESS_TOKEN]",
        "expires_in": 3600,
        "token_type": "Bearer"
    }

## Create consent

    curl -X POST
		[API_HOST]/psd2/consent/v1/consents
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'Content-Type: application/json'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'
		-d '{
			"access": {
				"accounts": [
					{
						"iban": "[consentIban]",
						"currency": "[consentCurrency]"
					},
					{
						"iban": "[otherConsentIban]",
						"currency": "[consentCurrency]"
					}
				],
				"balances": [
					{
						"iban": "[consentIban]",
						"currency": "[consentCurrency]"
					}
				],
				"transactions": [
					{
						"iban": "[consentIban]",
						"currency": "[consentCurrency]"
					}
				]
			},
			"recurringIndicator": [consentRecurringIndicator],
			"validUntil": "[yyyy-MM-dd]",
			"frequencyPerDay": [consentFrequencyPerDay],
			"combinedServiceIndicator": [consentCombinedServiceIndicator]
		}'

### Headers

`PSU-IP-Address` is the IP address of the end user.
`X-BicFi` the BicFi for the user's ASPSP. Find it in [the ASPSP API](/docs/tutorials/aspsp#get-aspsps-for-a-countries-andor-cities).
`X-Request-ID` used to verify that the response matches the request.

### Body description

`access` is a list of data items that consent need to be acquired for. There are three possible things to get consent from:

- `accounts`: this is a consent to get access to an account list with some account details needed.
- `balances`: this is a consent to get access to balances for accounts.
- `transactions` : this is a consent to see all the transactions for accounts.

Each consent request contains `iban` and `currency` (optional). Each consent request can be a list of account ids (ibans).
The `balances` and `transactions` consent request must contain a subset of the accounts listed in `accounts`.

`recurringIndicator` is a boolean that indicates if the consent can be used multiple times or not.
`validUntil` is a date on the format `yyyy-MM-dd`
`frequencyPerDay` is a number indicating the number of usages per day for this consent.
`combinedServiceIndicator` if true this indicates that the session will be used to initate a payment also. It has no practical meaning at this time.

### Response

    {
        "consentStatus": "received",
        "consentId": "[CONSENTID]",
        "scaMethods": [
            {
                "authenticationType": "PUSH_OTP",
                "authenticationMethodId": "Mobilt BankID",
                "name": "Mobilt BankID"
            }
        ],
        "_links": {
            "status": {
                "href": "/psd2/consent/v1/consents/[CONSENTID]/status"
            },
            "startAuthorizationWithTransactionAuthorization": {
                "href": "/psd2/consent/v1/consents/[CONSENTID]/authorisations"
            },
            "self": {
                "href": "/psd2/consent/v1/consents/[CONSENTID]"
            }
        }
    }

### Response headers

`ASPSP-SCA-Approach` - see below for different values.
`X-Request-ID`

## Get consent

Once you have a consent you can use the id for that consent to get information about the consent.

    curl -X GET
		[API_HOST]/psd2/consent/v1/consents/[CONSENTID]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'

### Headers

See Create consent.

### Path parameter

`CONSENTID`

### Response

    {
        "consentId": "[CONSENTID]",
        "access": {
            "accounts": [
                {
                    "iban": "[consentIban]",
                    "currency": "[consentCurrency]"
                }
            ],
            "balances": [
                {
                    "iban": "[consentIban]",
                    "currency": "[consentCurrency]"
                }
            ],
            "transactions": [
                {
                    "iban": "[consentIban]",
                    "currency": "[consentCurrency]"
                }
            ]
        },
        "recurringIndicator": false,
        "validUntil": "2019-10-01",
        "frequencyPerDay": 100,
        "lastActionDate": "2019-05-16",
        "consentStatus": "received"
    }

### Response headers

`X-Request-ID`

## Delete consent

    curl -X DELETE
		[API_HOST]/psd2/consent/v1/consents/[CONSENTID]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'

### Response headers

`X-Request-ID`

## Get consent status

    curl -X GET
		[API_HOST]/psd2/consent/v1/consents/[CONSENTID]/status
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'

### Headers

See Create consent.

### Path parameter

`CONSENTID`

### Response

    {
        "consentStatus": "received"
    }

See possible values for status further down.

### Response headers

`X-Request-ID`

## Create consent authorisation

    curl -X POST
        [API_HOST]/psd2/consent/v1/consents/[CONSENTID]/authorisations
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU-IP-Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Response

    {
        "authorisationId": "[CONSENTAUTHID]",
        "scaMethods": [
            {
                "authenticationType": "PUSH_OTP",
                "authenticationMethodId": "Mobilt BankID",
                "name": "Mobilt BankID"
            }
        ],
        "_links": {
            "scaStatus": {
                "href": "/psd2/consent/v1/consents/[CONSENTID]/authorisations/[CONSENTAUTHID]"
            },
            "selectAuthenticationMethod": {
                "href": "/psd2/consent/v1/consents/[CONSENTID]/authorisations/[CONSENTAUTHID]"
            }
        },
        "scaStatus": "started"
    }

### Response headers

`ASPSP-SCA-Approach` - see below for different values.
`X-Request-ID`

## Get consent authorisations

    curl -X GET
        [API_HOST]/psd2/consent/v1/consents/[CONSENTID]/authorisations
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU-IP-Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Response

    {
        "authorisationIds": [
            "[CONSENTAUTHID]"
        ]
    }

### Response headers

`X-Request-ID`

## Get consent authorisation status

    curl -X GET
        [API_HOST]/psd2/consent/v1/consents/[CONSENTID]/authorisations/[CONSENTAUTHID]
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU-IP-Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Response

    {
        "scaStatus": "started"
    }

### Response headers

`X-Request-ID`

## Update consent authorisation

    curl -X PUT
        [API_HOST]/psd2/consent/v1/consents/[CONSENTID]/authorisations/[CONSENTAUTHID]
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU-IP-Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'
        -d '{
            "authenticationMethodId": "[authenticationMethodId]"
        }'


## Schemas

### Consent status

Can be one of the following values:

- received
- rejected
- valid
- revokedByPsu
- expired
- terminatedByTpp

### Consent authorisation status

Can be one of the following values:

- received
- psuIdentified
- psuAuthenticated
- scaMethodSelected
- started
- finalised
- failed
- exempted

### ASPSP-SCA-Approach

This is a response header that describes how to proceed with authentication. 
Can be one of the following values. See the NextGen specs for more details.

- EMBEDDED
- DECOUPLED
- REDIRECT
