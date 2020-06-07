FROM node:stretch-slim
WORKDIR /usr/src/app

ENV YARN_CACHE_FOLDER=/tmp/cache

COPY package.json yarn.lock tsconfig.json next-env.d.ts src ./

RUN yarn
RUN yarn test
RUN NODE_ENV=production yarn build

RUN rm -rf src node_modules .next

COPY package.server.json ./package.json
RUN yarn

EXPOSE 8080
CMD ["yarn", "serve"]