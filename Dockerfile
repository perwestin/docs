# Lets use a container with node on it to build
FROM node:latest AS build-container
COPY . /src

# node_modules will not be there in a production build but 
# removing it makes the build repeatable locally also
# 
# npm install gets allt he dependencies needed for doing a 
# site build with gatsby. Some of the dependencies are of a binary
# nature which makes it impossible to use checked in deps.
RUN cd /src && rm -rf node_modules && npm install && gatsby build

# For the actual deploy we use the gatsby container which baecially is
# just nginx configured to serve static content.
FROM gatsbyjs/gatsby:latest
COPY --from=build-container /src/public/ /pub
