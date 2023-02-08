FROM node:13-alpine

WORKDIR /home/app

COPY ./app/package*.json ./

RUN yarn

COPY ./app .

EXPOSE 27017

CMD ["yarn", "dev"]