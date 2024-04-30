FROM node:21 AS BUILD

COPY . .
WORKDIR /fitness

# Clear npm cache and upgrade npm
RUN npm cache clean --force
#install pnpm
RUN npm install -g pnpm
RUN pnpm install --force
RUN cd src/ && pnpm dlx prisma generate
RUN pnpm run build


FROM node:21 AS RUN 
COPY --from=BUILD . .
WORKDIR /fitness
RUN pnpm run db-init
EXPOSE 3000
ENV DATABASE_URL="file:./dev.db"
RUN pnpm run db-init
CMD ["npm", "start"]
