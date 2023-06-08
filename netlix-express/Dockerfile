FROM node:16 as build
WORKDIR /app/node
COPY package*.json ./ tsconfig.json ./
RUN npm i -g pnpm 
RUN pnpm install
RUN pnpm run build 
RUN pnpm prune --prod

FROM node:16-alpine
WORKDIR /app/node
COPY --from=build /app/node .
COPY . .
RUN npm run start
