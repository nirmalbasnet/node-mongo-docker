FROM node:13-alpine

RUN mkdir -p /home/app

COPY ./app /home/app

CMD ["node", "/home/app/index.js"]