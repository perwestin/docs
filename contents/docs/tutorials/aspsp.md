---
title: Getting started with the API and ASPSP
root: "/docs"
parents: ["Get Started"]
---
# Getting started with the API and ASPSP

## Introduction

<h1>Getting started with Open Payments Platform</h1>
<p>Open Payments Platform uses OAuth2 (specifically OIDC) for authentication. In the following sections, we have provided step
    by step instructions on how you will interact with the platform.</p>
<h2>1. Create an Application</h2>
<p>Navigate to
    <a [routerLink]="['../../../applications']" class="underline">Applications</a> and click on “Add Application”. Fill in the required fields. During development you can use
    <code>http://localhost:&#123;PORTNUMBER&#125;/</code> or
    <code>https://localhost:&#123;PORTNUMBER&#125;/</code> as a Redirect URI. Click “Save”. Once the Application is saved you’ll be presented with the
    <code>client_id</code> and
    <code>client_secret</code> associated with your Application. Please take note of these credentials as you’ll need them to get a
    <code>access_token</code> which allows you to communicate with the Open Payments Platform.</p>

<h2>2. Create a Test User</h2>
<p>Create a Test User that you can use to authenticate yourself with on the ASPSP’s provided by Open Payments. Click on the
    <a [routerLink]="['../../../testusers']" class="underline">Test Users</a> tab and then “Add Test User” to create your first Test User. Fill in the required fields, the email doesn’t
    need to be real, but must be unique within the Developer Portal and the password should contain at least three letters
    and four digits. Please take note of the credentials you’ve supplied as you’ll need them in the next step.</p>

<h2>3. Install the Open Payments Authenticator App</h2>
<p>Get the application from your app store and log in with the Test User created in step 2. The application is only needed in
    the sandbox environment to authenticate your test user.
    <br>
    <a href="https://itunes.apple.com/us/app/open-payments-authenticator/id1342297541?ls=1&mt=8" target="_new">
        <img src="/assets/images/app_store.png">
    </a>
    <a href="https://play.google.com/store/apps/details?id=com.openpayments.authenticator" target="_new">
        <img src="/assets/images/google_play_store.png">
    </a>
</p>

<h2>4. PSD2 Requirements</h2>
<p>The PSD2 Regulatory Technical Standards (RTS) on Strong Customer Authentication (SCA) and Common and Secure Communication
    (CSC) states that to identify a PSU, Multi-Factor Authentication (MFA) must be used.</p>
<p>You will be using the Open Payments Authenticator mobile app to perform Multi-Factor Authentication (MFA) and Authorization.</p>

<h2>5. Integrate with Open Payments</h2>

<h5>5.1 Get a authorization token</h5>
<code class="multiline">curl -X POST \
    https://auth.sandbox.openpaymentsplatform.com/connect/token \
    -H <span class="string--curl">'Cache-Control: no-cache'</span> \
    -H <span class="string--curl">'Content-Type: application/x-www-form-urlencoded'</span> \
    -d <span class="string--curl">'client_id=&#123;YOUR_CLIENT_ID&#125;&client_secret=&#123;YOUR_CLIENT_SECRET&#125;&scope=aspspinformation&grant_type=client_credentials'</span>
</code>

<h5>5.2 Get a list of countries that we support</h5>
<code class="multiline">curl -X GET \
        https://api.sandbox.openpaymentsplatform.com/aspspinformation/v1/aspsps/countries \
        -H <span class="string--curl">'Authorization: Bearer &#123;YOUR_TOKEN&#125;'</span> \
        -H <span class="string--curl">'Cache-Control: no-cache'</span> \
        -H <span class="string--curl">'Content-Type: application/json'</span> \
</code>

<h5>5.3 Retrieve the cities where we've got ASPSPs</h5>
<code class="multiline">curl -X GET \
        https://api.sandbox.openpaymentsplatform.com/aspspinformation/v1/aspsps/&#123;isoCountryCode&#125;/cities \
        -H <span class="string--curl">'Authorization: Bearer &#123;YOUR_TOKEN&#125;'</span> \
        -H <span class="string--curl">'Cache-Control: no-cache'</span> \
        -H <span class="string--curl">'Content-Type: application/json'</span> \
</code>

<h5>5.4 Get ASPSP’s for the selected city</h5>
<code class="multiline">curl -X GET \
        https://api.sandbox.openpaymentsplatform.com/aspspinformation/v1/aspsps/&#123;isoCountryCode&#125;/cities/&#123;id&#125; \
        -H <span class="string--curl">'Authorization: Bearer &#123;YOUR_TOKEN&#125;'</span> \
        -H <span class="string--curl">'Cache-Control: no-cache'</span> \
        -H <span class="string--curl">'Content-Type: application/json'</span> \
</code>

<h5>5.5 Start using the platform</h5>
<p>Head over to the
    <a [routerLink]="['../../api']" class="underline">REST API Documentation</a> to start using our platform, or check out the
    <a [routerLink]="['../../client/csharpclient/samples']" class="underline">samples</a>.</p>
