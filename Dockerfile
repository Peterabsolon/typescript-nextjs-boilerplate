FROM node:stretch-slim
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV YARN_CACHE_FOLDER=/tmp/cache

COPY package.json yarn.lock src ./

RUN yarn
RUN yarn test
RUN yarn build

RUN rm -rf src node_modules .next

COPY package.server.json ./package.json
RUN yarn

EXPOSE 8080
CMD ["yarn", "serve"]