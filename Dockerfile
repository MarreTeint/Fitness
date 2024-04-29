FROM node:21 AS BUILD

COPY . .
WORKDIR /fitness

# Clear npm cache and upgrade npm
RUN npm cache clean --force
#install pnpm
RUN npm install -g pnpm
RUN pnpm install --force

RUN pnpm run build


FROM node:21 AS RUN 
COPY --from=BUILD . .
WORKDIR /fitness
RUN pnpm run db-init
EXPOSE 3000
CMD ["npm", "start"]
