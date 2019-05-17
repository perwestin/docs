---
title: Getting started with accounts
root: "/docs"
parents: ["Get Started"]
---
# Getting started with accounts

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

## Read account list

	curl -X GET
		[API_HOST]/psd2/accountinformation/v1/accounts
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'Content-Type: application/json'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'
		-H 'Consent-ID: [STRING]'

### Headers

`PSU-IP-Address` is the IP address of the end user.
`X-BicFi` the BicFi for the user's ASPSP. Find it in [the ASPSP API](/docs/tutorials/aspsp#get-aspsps-for-a-countries-andor-cities).
`X-Request-ID` used to verify that the response matches the request.
`Consent-ID` identification of the corresponding consent as granted by the PSU.

### Response

	{
	  "accounts": [
		{
		  "resourceId": "[ACCOUNTID]",
		  "iban": "FR7612345987650123456789014",
		  "bban": "BARC12345612345678",
		  "msisdn": "+49 170 1234567",
		  "currency": "EUR",
		  "name": "string",
		  "product": "string",
		  "cashAccountType": "string",
		  "status": "enabled",
		  "bic": "AAAADEBBXXX",
		  "linkedAccounts": "string",
		  "usage": "PRIV",
		  "details": "string",
		  "balances": [
			{
			  "balanceAmount": {
				"currency": "EUR",
				"amount": "123"
			  },
			  "balanceType": "closingBooked",
			  "lastChangeDateTime": "2019-05-16T16:31:50.827Z",
			  "referenceDate": "2019-05-16",
			  "lastCommittedTransaction": "string"
			}
		  ],
		  "_links": {
			"balances": {
			  "href": "/psd2/accountinformation/v1/accounts/[ACCOUNTID]/balances"
			},
			"transactions": {
			  "href": "/psd2/accountinformation/v1/accounts/[ACCOUNTID]/transactions"
			}
		  }
		}
	  ]
	}

### Response headers

`X-Request-ID`

## Read account details

Once you have a consent you can use the id for that consent to get information about the consent.

	curl -X GET
		[API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNTID]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'Content-Type: application/json'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'
		-H 'Consent-ID: [STRING]'

### Headers

See Read account list.

### Path parameter

`ACCOUNTID` : Refers to `resourceId` in the response from [Read account list]

### Query parameters

`withBalance` : Boolean, include balances in response. Optional.

### Response

	{
	  "resourceId": "[ACCOUNTID]",
	  "iban": "FR7612345987650123456789014",
	  "bban": "BARC12345612345678",
	  "msisdn": "+49 170 1234567",
	  "currency": "EUR",
	  "name": "string",
	  "product": "string",
	  "cashAccountType": "string",
	  "status": "enabled",
	  "bic": "AAAADEBBXXX",
	  "linkedAccounts": "string",
	  "usage": "PRIV",
	  "details": "string",
	  "balances": [
		{
		  "balanceAmount": {
			"currency": "EUR",
			"amount": "123"
		  },
		  "balanceType": "closingBooked",
		  "lastChangeDateTime": "2019-05-16T16:45:42.349Z",
		  "referenceDate": "2019-05-16",
		  "lastCommittedTransaction": "string"
		}
	  ],
	  "_links": {
		"balances": {
		  "href": "/psd2/accountinformation/v1/accounts/[ACCOUNTID]/balances"
		},
		"transactions": {
		  "href": "psd2/accountinformation/v1/accounts/[ACCOUNTID]/transactions"
		}
	  }
	}

### Response headers

`X-Request-ID`