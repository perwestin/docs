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

## Acquire a consent

You'll need a valid consent for the ASPSP you want to interact with.
Follow instructions in [the Consent API](/docs/tutorials/accounts-and-consent#create-consent).

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

- `PSU-IP-Address` is the IP address of the end user.
- `X-BicFi` the BICFI for the user's ASPSP. Find it in [the ASPSP API](/docs/tutorials/aspsp#get-aspsps-for-a-countries-andor-cities).
- `X-Request-ID` used to verify that the response matches the request.
- `Consent-ID` identification of the corresponding consent as granted by the PSU.

### Response

	{
		"accounts": [
			{
				"resourceId": "[ACCOUNTID]",
				"iban": "SE5460000000000403333911",
				"bban": "403333911",
				"currency": "SEK",
				"bic": "HANDSESS"
			},
			{
				"resourceId": "5a72e1531b6586f34a0d7ce4",
				"iban": "SE8160000000000401975231",
				"bban": "401975231",
				"currency": "SEK",
				"name": "Almas konto",
				"bic": "HANDSESS"
			}
		]
	}

### Response headers

`X-Request-ID`

## Read account details

Use one of the [ACCOUNTID]s to get more information about a specific account.

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

`ACCOUNTID` Refers to `resourceId` in the response from [Read account list](#read-account-list).

### Query parameters

`withBalance` Boolean, include balances in response. Optional.

### Response

	{
		"resourceId": "5a72e1531b6586f34a0d7ce3",
		"iban": "SE5460000000000403333911",
		"bban": "403333911",
		"currency": "SEK",
		"cashAccountType": "Allkortskonto",
		"status": "enabled",
		"bic": "HANDSESS",
		"usage": "PRIV",
		"balances": [
			{
				"balanceAmount": {
					"currency": "SEK",
					"amount": "33633.25"
				},
				"balanceType": "closingBooked",
				"creditLimitIncluded": false
			},
			{
				"balanceAmount": {
					"currency": "SEK",
					"amount": "33528.25"
				},
				"balanceType": "interimAvailable",
				"creditLimitIncluded": false
			}
		]
	}

### Response headers

`X-Request-ID`

## Read balance

Retreive balances for a given [ACCOUNTID].

	curl -X GET
		[API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNTID]/balances
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'Content-Type: application/json'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'
		-H 'Consent-ID: [STRING]'

### Headers

See Read account list.

### Path parameter

`ACCOUNTID` refers to `resourceId` in the response from [Read account list](#read-account-list).

### Response

	{
		"balances": [
			{
				"balanceAmount": {
					"currency": "SEK",
					"amount": "33633.25"
				},
				"balanceType": "closingBooked",
				"creditLimitIncluded": false
			},
			{
				"balanceAmount": {
					"currency": "SEK",
					"amount": "33528.25"
				},
				"balanceType": "interimAvailable",
				"creditLimitIncluded": false
			}
		]
	}

### Response headers

`X-Request-ID`

## Read transaction list

Retreive transactions for a given [ACCOUNTID].

	curl -X GET
		[API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNTID]/transactions?bookingStatus=[BOOKINGSTATUS]&dateFrom=[DATEFROM]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'Content-Type: application/json'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'
		-H 'Consent-ID: [STRING]'

### Headers

See Read account list.

### Path parameter

`ACCOUNTID` refers to `resourceId` in the response from [Read account list](#read-account-list).

### Query parameters

- `bookingStatus` booked, pending, both.
- `dateFrom` is a date in `yyyy-MM-dd` format.
- `dateTo` is a date in `yyyy-MM-dd` format. Optional.

### Response

	{
		"transactions": {
			"booked": [
				{
					"transactionId": "wiY29udGVudCI6MzM2MzMuMjV9fX0=",
					"transactionAmount": {
						"currency": "SEK",
						"amount": "4101.24"
					}
				},
				{
					"transactionId": "Jjb250ZW50IjozNzczNC40OX19fQ==",
					"transactionAmount": {
						"currency": "SEK",
						"amount": "1145"
					}
				},
				{
					"transactionId": "IsImNvbnRlbnQiOjM2NTg5LjQ5fX19",
					"transactionAmount": {
						"currency": "SEK",
						"amount": "1450"
					}
				},
				{
					"transactionId": "IsImNvbnRlbnQiOjM4MDM5LjQ5fX19",
					"transactionAmount": {
						"currency": "SEK",
						"amount": "200"
					}
				},
				{
					"transactionId": "wiY29udGVudCI6MzgyMzkuNDl9fX0=",
					"transactionAmount": {
						"currency": "SEK",
						"amount": "32256"
					}
				}
			],
			"pending": [
				{
					"transactionId": "9uIjoiUHJlbCBGb29kdHJ1Y2sifQ==",
					"transactionAmount": {
						"currency": "SEK",
						"amount": "105"
					}
				}
			],
			"_links": {
				"account": "/psd2/accountinformation/v1/accounts/5a72e1531b6586f34a0d7ce3"
			}
		},
		"balances": []
	}

### Response headers

`X-Request-ID`

## Read transaction details

Retreive transaction details for a given [ACCOUNTID] and [TRANSACTIONID].

	curl -X GET
		[API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNTID]/transactions/[TRANSACTIONID]
		-H 'Authorization: Bearer [ACCESS_TOKEN]'
		-H 'Content-Type: application/json'
		-H 'PSU-IP-Address: [PSU-IP-Address]'
		-H 'X-BicFi: [BICFI]'
		-H 'X-Request-ID: [GUID]'
		-H 'Consent-ID: [STRING]'

### Headers

See Read account list.

### Path parameter

- `ACCOUNTID` refers to `resourceId` in the response from [Read account list](#read-account-list).
- `TRANSACTIONID` refers to `transactionId` in the response from [Read transaction list of an account](#read-transaction-list-of-an-account).

### Response

	{
		"transactionId": "wiY29udGVudCI6MzM2MzMuMjV9fX0=",
		"transactionAmount": {
			"currency": "SEK",
			"amount": "4101.24"
		},
		"creditorAccount": {
			"iban": "",
			"bban": ""
		},
		"debtorAccount": {
			"iban": "",
			"bban": ""
		},
		"remittanceInformationUnstructured": "HS 02123456",
		"purposeCode": "OTHR"
	}

### Response headers

`X-Request-ID`

## Schemas

### Account status

`status` for an account can be one of the following values:

- enabled
- deleted
- blocked

### Account usage

`usage` for an acounnt Can be one of the following values:

- PRIV
- ORGA

### Balance type

`balanceType` can be one of the following values:

- closingBooked
- expected
- authorised
- openingBooked
- interimAvailable
- interimBooked
- forwardAvailable
- nonInvoiced

### Purpose code

`purposeCode` values for transactions can be found in the ISO 20022 External Code List ExternalCodeSets_1Q2018 June 2018.