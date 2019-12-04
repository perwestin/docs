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
|Get the SCA Status of the payment authorization GET/v1/{payment-service}/{paymentId}/authorizations/{authorizationId}|Handled by gateway in combination with BankID|
|Update PSU data for payment initiation PUT/v1/{payment-service}/{paymentId}/authorizations/{authorizationId} |Supported|
|Start the authorization process for the cancellation of the addressed payment POST/v1/{payment-service}/{paymentId}/cancellation-authorizations|Not supported by the bank|
|Get Cancellation authorizations GET/v1/{payment-service}/{paymentId}/cancellation-authorizations|Not supported by the bank|
|Get status of the payment cancellation's authorization GET/v1/{payment-service}/{paymentId}/cancellation-authorizations/{cancellationId}|Not supported by the bank|
|Update PSU Data for payment initiation cancellation PUT/v1/{payment-service}/{paymentId}/cancellation-authorizations/{cancellationId}|Not supported by the bank|

### Payment Products
Domestic	swedish-domestic-credit-transfer (Transfer)

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

## CONCENT SERVICES
All endpoints require that you send the PSU-IP-Address.


Available Consent Services| Support
|-------------------------|-----------|
|Create consent POST/v1/consents|Supported|
|Get Consent Request GET/v1/consents/{consentId}|Supported|
|Delete Consent DELETE/v1/consents/{consentId}|Supported|
|Consent status request GET/v1/consents/{consentId}/status|Supported|
|Start the authorization process for a consent POST/v1/consents/{consentId}/authorizations|Supported|
|Get the consent authorizations GET /v1/consents/{consentId}/authorizations|Supported|
|Read the SCA status of the consent authorization GET/v1/consents/{consentId}/authorizations/{authorizationId}|Supported|
|Update PSU Data for consents PUT/v1/consents/{consentId}/authorizations/{authorizationId}|Supported|

## SCA METHODS
Swedbank uses Mobilt BankID (mbid) with decoupled flow.

Only SelectPsuAuthenticationMethod is supported for:

|Endpoint|
|---|
|PUT/v1/consents/{consentId}/authorizations/{authorizationId}|
|PUT/v1/{payment-service}/{paymentId}/authorizations/{authorizationId}|





