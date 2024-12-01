ARG NODE_VER=latest
FROM jitesoft/node-yarn:${NODE_VER} AS builder

COPY public /app/public
COPY src /app/src
COPY index.html /app/index.html

COPY jsconfig.json /app/jsconfig.json
COPY vite.config.mjs /app/vite.config.mjs

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn install
RUN yarn run build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]