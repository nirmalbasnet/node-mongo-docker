FROM node:13-alpine

ENV MONGO_DB_USERNAME=mongousername \
    MONGO_DB_PWD=mongopassword

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/index.js"]