FROM node:8.12-alpine

USER root

# update alpine image
RUN apk update
RUN apk upgrade
RUN apk add python

#create working directory change path
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# check versions

RUN npm -v
RUN node -v

#copy and install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install

#client dev environment variables
ENV HOST 0.0.0.0 

#Set node env
EXPOSE 3000 

CMD ["npm", "run", "dev"]