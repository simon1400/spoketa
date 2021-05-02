
FROM node:10-alpine

RUN mkdir -p /var/www/spoketa/node_modules && chown -R node:node /var/www/spoketa

WORKDIR /var/www/spoketa

COPY package*.json ./
RUN yarn install
COPY --chown=node:node . .

RUN yarn build

EXPOSE 3003

CMD [ "npm", "start" ]
