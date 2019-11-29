# Open Payments documentation

This is the source code for [docs.openpayments.io](https://docs.openpayments.io).

It is built with [gatsby.js](https://www.gatsbyjs.org/) based on the [Gatsbsy starter markdown](https://github.com/cvluca/gatsby-starter-markdown) repo.

## Contribute

If you want to help out with documentation you can fork this repo, do your changes and then come in with a [pull request](https://github.com/openpaymentseurope/docs/compare). 
We are pretty good at documentation at Open Payments but we are sure that our users can help us with the outside perspective
on things so that our docs can be even better. If you have something else you want us to address please [create an issue](https://github.com/openpaymentseurope/docs/issues/new).

## Build and test it out locally

You need `npm` to work with this repository. Fork and clone it to your local machine - then:

    npm install

To get all the dependencies in - this is mostly everything gatsby needs. (It is based on react so it may come as no surprise that se are looking at some 1400 sub folders in
`node_modules` with almost 2 million lines of javascript code among other things....)

If all goes well you will also have the Gatsby CLI at this point. To start the site in development mode - changes will update the browser automatically do:

    gatsby develop

And browse to [localhost:8000](http://localhost:8000) to see the result.
This is not always producting the exact same result as the generated site. To try the generation process out do:

    gatsby build
    gatsby serve

`build` will build the site and put the result in the `public` folder. `serve` starts a server at (localhost:9000)[http://localhost:9000] 
that just serves whatever is in the public folder.

## Build and run a docker container from the sources

There is a docker file that is able to build the site and then put in a container with nginx running to server the site. To build it

    docker build -t openpayments:docs

This will produce a container called `openpayments:docs`. This is then runnable with:

    docker run -rm -p 80:80 openpayments:docs

If all is good an well you will have site at [localhost](http://localhost) serving the site.

## Build for production

THere will be a pipeline set up that triggers on changes to master, builds the site and puts it out in the cloud.
