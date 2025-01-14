---
title: Glossary
root: "/docs"
parents: ["Introduction"]
prio: 1
---

<h1>Glossary</h1>
<p>In this section, we go through some terminology used in this documentation to avoid confusion. It is not meant to be a complete
  list of terminology used in this documentation.</p>

<h4>access_token</h4>
<p>A token used to authorize a request as well as grant/limit access to different parts of the platform.</p>

<h4>AISP</h4>
<p>
  An Account Information Service provides account information services as an online service to provide consolidated information
  on one or more payment accounts held by a payment service user with one or more payment service provider(s).
</p>

<h4>API</h4>
<p>
  An Application Programming Interface is a set of routines, protocols, and tools for building software applications. An API
  specifies how software components should interact.
</p>

<h4>API Call</h4>
<p>API call is a request towards the API which receives a response. The API is by design stateless, and therefore it does not
  "remember" anything about previous requests, i.e., there is no session. Therefore, every request made towards the API must
  contain certain headers so that the API can authenticate and authorize the user.
</p>

<h4>API Console</h4>
<p>API Console is a tool on the API portal which lets users try out API calls in their web browser quickly.</p>

<h4>API Scopes</h4>
<p>Defines which parts of the platform the application can access.</p>

<h4>Application</h4>
<p>The entity that identifies who it is that’s accessing the platform.</p>

<h4>ASPSP</h4>
<p>
  Account Servicing Payment Service Providers provide and maintain a payment account for a payer as defined by the PSRs and,
  in the context of the Open Banking Ecosystem are entities that publish Read/Write APIs to permit, with customer consent,
  payments initiated by third party providers and/or make their customers’ account transaction data available to third party
  providers via their API end points.
</p>

<h4>Authentication</h4>
<p>Authentication is a process which provides the correct identity of the user. Authentication is the key component in enforcing
  that users are only able to access the resources that they have permissions for.
</p>

<h4>Authorization</h4>
<p>Authorization is a process which allows or disallows user to access resources and authorization is done based on the user
  identity. This means that to be able to be authorized, the user must first be authenticated, i.e., authorization uses the
  user’s identity provided by the authentication process.
</p>

<h4>BICFI</h4>
<p>Valid BICs for financial institutions are registered by the ISO 9362 Registration Authority in the BIC directory, and consist
  of eight (8) or eleven (11) contiguous characters.
</p>

<h4>client_id</h4>
<p>Unique identifier for the application.</p>

<h4>client_secret</h4>
<p>The applications password.</p>

<h4>EBA</h4>
<p>
  The European Banking Authority develops Regulatory Technical Standards which are submitted to the European Commission for
  endorsement. Regulatory Technical Standards are a set of detailed compliance criteria set for all parties that cover areas
  such as data security, legal accountability and other processes.
</p>

<h4>OAuth2</h4>
<p>OAuth 2.0 is the industry-standard protocol for authorization. See more info
  <a href="https://oauth.net/2/" class="underline">here</a>.
</p>

<h4>OBIE</h4>
<p>
  The Open Banking Implementation Entity is the delivery organisation working with the CMA9 and other stakeholders to define
  and develop the required APIs, security and messaging standards that underpin Open Banking. Otherwise known as Open Banking
  Limited.
</p>

<h4>OpenID Connect</h4>
<p>OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity
  of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information
  about the End-User in an interoperable and REST-like manner.
</p>

<h4>Open Payments Authenticator</h4>
<p>Application used to approve authorization and SCA requests in the sandbox environment from ASPSP’s provided by Open Payments.</p>

<h4>OPP</h4>
<p>
  Open Payments Platform is a PSD2 compliant API aggregation platform that offers a single, open and secure point of access
  to the diverse bank API networks throughout Europe.
</p>

<h4>PISP</h4>
<p>
  A Payment Initiation Services Provider provides an online service to initiate a payment order at the request of the payment
  service user with respect to a payment account held at another payment service provider.
</p>

<h4>PSD2</h4>
<p>
  The Payment Services Directive 2015/2366, as amended or updated from time to time and including the associated Regulatory
  Technical Standards developed by the EBA and agreed by the European Commission and as implemented by the PSR and including
  any formal guidance issued by a Competent Authority.
</p>

<h4>PSR</h4>
<p>
  The Payment Services Regulations 2017, the UK's implementation of PSD2, as amended or updated from time to time and including
  the associated Regulatory Technical Standards as developed by the EBA.
</p>

<h4>PSU</h4>
<p>A Payment Services User is a natural or legal person making use of a payment service as a payee, payer or both.</p>

<h4>Redirect URI</h4>
<p>The applications pre-configured endpoint to which the result of a user login will be posted.</p>

<h4>Sandbox Environment</h4>
<p>
  A sandbox is a type of software testing environment that enables the isolated execution of software or programs for independent
  evaluation, monitoring or testing.
</p>

<h4>SCA</h4>
<p>
  Strong Customer Authentication as defined by EBA Regulatory Technical Standards is an authentication based on the use of
  two or more elements categorised as knowledge (something only the user knows [for example, a password]), possession (something
  only the user possesses [for example, a particular cell phone and number]) and inherence (something the user is [or has,
  for example, a finger print or iris pattern]) that are independent, [so] the breach of one does not compromise the others,
  and is designed in such a way as to protect the confidentiality of the authentication data.
</p>

<h4>TPP</h4>
<p>
  Third Party Providers are organisations or natural persons that use APIs developed to Standards to access customer’s accounts,
  in order to provide account information services and/or to initiate payments.
</p>