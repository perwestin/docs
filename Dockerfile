FROM node:latest AS build-container
COPY . /src
RUN npm i -g gatsby-cli
RUN cd /src; npm install; gatsby build

FROM gatsbyjs/gatsby:latest
COPY --from=build-container /src/public/ /pub
