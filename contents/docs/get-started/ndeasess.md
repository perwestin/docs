---
title: NORDEA BANK
root: "/docs"
parents: ["Introduction"]
prio: 0
---

# NORDEA BANK

## ASPSP INFORMATION

Name: Nordea Bank Abp, Swedish branch

BIC: NDEASESS

Office

Smålandsgatan 17

SE-105 71 Stockholm

Sweden


Services available: Swedish Private transaction accounts.

SCA is based on BankID which are an identification solution that allows companies, banks and governments agencies to authenticate and conclude agreements with individuals over the Internet. For more information on BankID: www.bankid.com
</em>

## PAYMENT INITIATION SERVICE (PIS)
Cut off times and processing rules for Nordea applies.
Please note that other rules can apply when the payment is initiated on the day before a Bank holiday, or when a particular SCA approach is used.

|Payment  | Typ| General rule| Cut-off time| Processing rules|
|---------|----|-------------|-------------|-----------------|
|Bankgiro payment||Corporates require Bankgiro number connected to the account|CET 09:45|Executed same day|
|Transfer|Accounts within Nordea |SEK, EUR| CET 24:00|Processed immediately|
|        |To other banks| Only SEK| CET 13:00|Processed through SE clearing same day|

For domestic payments, Nordea requires BBAN for debtor and IBAN for creditor. All currencies must be set to SEK.

Nordea does not support payment authorizations, this is wrapped by Open Payments Gateway.
Once the authentication process for a payment is completed, the payment is created and confirmed with Nordea. It might take up to several minutes before the payment gets the status ACSC, this is normal and caused by delays by Nordea.

|Available payments service|Support|
|--------------------------|-------|
|Payment initiation request POST/v1/{payment-service}/{payment-product}|Supported|
|Get Payment Information GET/v1/{payment-service}/{paymentId}|Supported|
|Payment Cancellation Request DELETE/v1/{payment-service}/{paymentId}|Not supported by the bank|
|Payment initiation status request GET/v1/{payment-service}/{paymentId}/status| Supported|
|Start the authorization process for a payment initiation POST/v1/{payment-service}/{paymentId}/authorizations|Supported|
|Get Payment Initiation authorization Sub-Resources Request GET/v1/{payment-service}/{paymentId}/authorizations|Supported|
|Get the SCA Status of the payment authorization GET/v1/{payment-service}/{paymentId}/authorizations/{authorizationId}|Handled by gateway in combination with BankID|
|Update PSU data for payment initiation PUT/v1/{payment-service}/{paymentId}/authorizations/{authorizationId}| Handled by gateway in combination with BankID|
|Start the authorization process for the cancellation of the addressed payment POST/v1/{payment-service}/{paymentId}/cancellation-authorizations|Not supported by the bank|
|Get Cancellation authorizations GET/v1/{payment-service}/{paymentId}/cancellation-authorizations|Not supported by the bank|
|Get status of the payment cancellation's authorization GET/v1/{payment-service}/{paymentId}/cancellation-authorizations/{cancellationId}|Not supported by the bank|
|Update PSU Data for payment initiation cancellation PUT/v1/{payment-service}/{paymentId}/cancellation-authorizations/{cancellationId}|Not supported by the bank|

### Payment Products
Domestic	swedish-domestic-credit-transfer (Transfer)

## ACCOUNT INFORMATION SERVICE (AIS)
 The date parameters, from_date, and to_date have to be formatted correctly, namely yyyy-MM-dd, so for instance, 1989-02-22 would be in correct format.
  

Avalible services| Support|
|-----------------|--------------|
|Read Account List GET/v1/accounts|Supported|
|Read Account Details GET/v1/accounts/{account-id}|Supported|
|Read Balance GET/v1/accounts/{account-id}/balances|Fetched from account details|
|Read Transaction List GET/v1/accounts/{account-id}/transactions/|Needs pagination|
|Read Transaction Details GET/v1/accounts/{account-id}/transactions/{resourceId}|Not supported by the bank|

## CONCENT SERVICES
Once the authentication process is completed, the consent is marked as valid and the consent authorization is marked as finalized

Available Consent Services| Support
|-------------------------|-----------|
|Create consent POST/v1/consents|Status is a combination of values in the gateway and the status BankID returns|
|Get Consent Request GET/v1/consents/{consentId}|Supported|
|Delete Consent DELETE/v1/consents/{consentId}|Supported|
|Consent status request GET/v1/consents/{consentId}/status|Supported|
|Start the authorization process for a consent POST/v1/consents/{consentId}/authorizations|Supported|
|Get the consent authorizations GET /v1/consents/{consentId}/authorizations|Supported|
|Read the SCA status of the consent authorization GET/v1/consents/{consentId}/authorizations/{authorizationId}|Supported|
|Update PSU Data for consents PUT/v1/consents/{consentId}/authorizations/{authorizationId}|Handled by gateway, status is a combination of values in the gateway and the status BankID returns|

## SCA METHODS
Nordea uses Mobilt BankID (mbid) with decoupled flow.

Mobilt BankID with decoupled flow is implemented in both sandbox and production. 

An autostarttoken is returned but is not required to be used. 

It is enough to simply start the BankID application
