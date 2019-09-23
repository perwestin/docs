---
title: Getting started with Consents
root: "/docs"
parents: ["Get Started"]
prio: 1
---
# Getting started with Account Consents

Available `AUTH_HOST` values
- https://auth.sandbox.openbankingplatform.com
- https://auth.openbankingplatform.com

Available `API_HOST` values
- https://api.sandbox.openbankingplatform.com
- https://api.openbankingplatform.com

## Acquire an access token for Account Information

    curl -X POST
		[AUTH_HOST]/connect/token
		-H 'Content-Type: application/x-www-form-urlencoded'
		-d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&scope=accountinformation&grant_type=client_credentials'

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
		-H 'PSU-IP-Address: [PSU_IP_Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'
		-d '{
			"access": {
				"accounts": [
					{
						"iban": "[CONSENT_IBAN]",
						"currency": "[CONSENT_CURRENCY]"
					},
					{
						"iban": "[OTHER_CONSENT_IBAN]",
						"currency": "[CONSENT_CURRENCY]"
					}
				],
				"balances": [
					{
						"iban": "[CONSENT_IBAN]",
						"currency": "[CONSENT_CURRENCY]"
					}
				],
				"transactions": [
					{
						"iban": "[CONSENT_IBAN]",
						"currency": "[CONSENT_CURRENCY]"
					}
				]
			},
			"recurringIndicator": [CONSENT_RECURRING_INDICATOR],
			"validUntil": "[yyyy-MM-dd]",
			"frequencyPerDay": [CONSENT_FREQUENCY_PER_DAY],
			"combinedServiceIndicator": [CONSENT_COMBINED_SERVICE_INDICATOR]
		}'

### Headers

- `PSU-IP-Address` is the IP address of the end user.
- `X-BicFi` the BICFI for the user's ASPSP. Find it in [the ASPSP API](/docs/tutorials/aspsp#get-aspsps-for-a-countries-andor-cities).
- `X-Request-ID` used to verify that the response matches the request.

### Body description

`access` is a list of data items that consent need to be acquired for. There are three possible things to get consent from:

- `accounts` this is a consent to get access to an account list with some account details needed.
- `balances` this is a consent to get access to balances for accounts.
- `transactions` this is a consent to see all the transactions for accounts.

Each consent request contains `iban` and `currency` (optional). Each consent request can be a list of account ids (ibans).
The `balances` and `transactions` consent request must contain a subset of the accounts listed in `accounts`.

`recurringIndicator` is a boolean that indicates if the consent can be used multiple times or not.
`validUntil` is a date in `yyyy-MM-dd` format.
`frequencyPerDay` is a number indicating the number of usages per day for this consent.
`combinedServiceIndicator` if true this indicates that the session will be used to initate a payment also. It has no practical meaning at this time.

### Response

    {
        "consentStatus": "received",
        "consentId": "[CONSENT_ID]",
        "scaMethods": [
            {
                "authenticationType": "PUSH_OTP",
                "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
            }
        ],
        "_links": {
            "status": {
                "href": "/psd2/consent/v1/consents/[CONSENT_ID]/status"
            },
            "startAuthorisationWithTransactionAuthorisation": {
                "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations"
            },
            "self": {
                "href": "/psd2/consent/v1/consents/[CONSENT_ID]"
            }
        }
    }

### Response headers

- `ASPSP-SCA-Approach` see below for different values.
- `X-Request-ID`

## Get consent request

Once you have a consent you can use the id for that consent to get information about the consent.

    curl -X GET
		[API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'PSU-IP-Address: [PSU_IP_Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`

### Response

    {
        "consentId": "[CONSENT_ID]",
        "access": {
            "accounts": [
                {
                    "iban": "[CONSENT_IBAN]",
                    "currency": "[CONSENT_CURRENCY]"
                }
            ],
            "balances": [
                {
                    "iban": "[CONSENT_IBAN]",
                    "currency": "[CONSENT_CURRENCY]"
                }
            ],
            "transactions": [
                {
                    "iban": "[CONSENT_IBAN]",
                    "currency": "[CONSENT_CURRENCY]"
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

- `X-Request-ID`

## Delete consent

    curl -X DELETE
		[API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'PSU-IP-Address: [PSU_IP_Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'

### Response headers

- `X-Request-ID`

## Consent status request

    curl -X GET
		[API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/status
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'PSU-IP-Address: [PSU_IP_Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`

### Response

    {
        "consentStatus": "received"
    }

See possible values for status further down.

### Response headers

- `X-Request-ID`

## Start the authorisation process for a consent

    curl -X POST
        [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

Note that this call does not need a body.

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`

### Response

    {
        "authorisationId": "[CONSENT_AUTH_ID]",
        "scaMethods": [
            {
                "authenticationType": "PUSH_OTP",
                "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
            }
        ],
        "_links": {
            "scaStatus": {
                "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]"
            },
            "selectAuthenticationMethod": {
                "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]"
            }
        },
        "scaStatus": "started"
    }

### Response headers

- `ASPSP-SCA-Approach` - see below for different values.
- `X-Request-ID`

## Get consent authorisation sub-resource request

    curl -X GET
        [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`

### Response

    {
        "authorisationIds": [
            "[CONSENT_AUTH_ID]"
        ]
    }

### Response headers

- `X-Request-ID`

## Read the SCA status of the consent authorisation

    curl -X GET
        [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`
- `CONSENT_AUTH_ID`

### Response

    {
        "scaStatus": "started"
    }

### Response headers

`X-Request-ID`

## Update PSU data for consents

    curl -X PUT
        [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_Address]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'
        -d '{
            "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
        }'

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`
- `CONSENT_AUTH_ID`

### Response headers

- `ASPSP-SCA-Approach` see below for different values.
- `X-Request-ID`

### Response

    {
        "chosenScaMethod": {
            "authenticationType": "PUSH_OTP",
            "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
        },
        "_links": {
            "scaStatus": {
                "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]"
            },
            "scaOAuth": {
                "href": "[AUTH_HOST]/connect/authorize?client_id=[CLIENT_ID]&scope=accountinformation&response_type=code&redirect_uri=[TPP_REDIRECT_URI]&state=[TPP_STATE]&acr_values=idp:[BICFI]%20consentId:[CONSENT_ID]%20consentAuthorisationId:[CONSENT_AUTH_ID]"
            }
        },
        "psuMessage": "Please confirm with your bank app",
        "scaStatus": "scaMethodSelected"
    }

### Test procedure

If the ASPSP uses OAuth:
- The above endpoint returns an OAuth authorize URL in the `scoOAuth` field. 
- Replace all the bracketed fields with real values. In your code you will have to replace only the two TPP values.
    - `TPP_REDIRECT_URI` should be the URL to redirect to after auth is completed.
    - `TPP_STATE` can be anything the TPP wants.
    - `BICIFI`
- Run it in a browser. In this case you will get to a page at the ESSESESS sandbox. It may differ for different banks.
- In the page you get to you can use one of the following fake personal numbers:
    - 9311219639
    - 9311219589
    - 8811215477
    - 8811212862
    - 8311211356
- When you submit the data you will be redirected to the `[TPP_REDIRECT_URI]`
- On this URI a `code` param will be added. 
- Use this `code` in the subsequent call when getting the account information token.

Call the OAuth token endpoint to finalize consent flow.

    curl -X POST
        [AUTH_HOST]/connect/token
        -H 'Content-Type: application/x-www-form-urlencoded'
        -H 'X-ConsentAuthorisationId: [CONSENT_AUTH_ID]'
        -H 'X-ConsentId: [CONSENT_ID]'
        -d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&code=[CODE]&redirect_uri=[TPP_REDIRECT_URI]&grant_type=authorization_code'

At this point you are ready to call the account service. Read more in the [account service tutorial](/docs/tutorials/accounts).


## Schemas

### Consent status

`consentStatus` for a consent can be one of the following values:

- received
- rejected
- valid
- revokedByPsu
- expired
- terminatedByTpp

### Consent authorisation status

`scaStatus` for a consent authorisation can be one of the following values:

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

### Authentication type

`authenticationType` for a consent authorisation can be one of the following values:

- SMS_OTP
- CHIP_OTP
- PHOTO_OTP
- PUSH_OTP