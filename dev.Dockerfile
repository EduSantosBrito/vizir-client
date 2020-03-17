FROM node:13.10.1-slim

WORKDIR /usr/src/app

COPY . .

RUN yarn --network-timeout 1000000

EXPOSE 3000

CMD ["yarn", "start"]