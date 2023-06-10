FROM node:16 as build
RUN mkdir /app 
WORKDIR /app/
COPY . . 
RUN npm i -g pnpm 
RUN pnpm install
RUN pnpm run build 

FROM node:16-alpine
RUN mkdir /app 
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/ .
CMD ["node", "/app/build/index.js"]
