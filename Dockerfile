FROM node:13.10.1-slim as build

WORKDIR /usr/src/app

COPY package.json .

COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN yarn
RUN yarn build --production

FROM nginx:1.17.9-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build /usr/src/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]