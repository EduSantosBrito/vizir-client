FROM node:13.10.1-slim

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]