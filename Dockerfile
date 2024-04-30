FROM node:21 AS BUILD

COPY . .
ENV DATABASE_URL="file:./dev.db"
WORKDIR /fitness

# Clear npm cache and upgrade npm
RUN npm cache clean --force
#install pnpm
RUN npm install -g pnpm
RUN pnpm install --force
RUN cd src/ && pnpm dlx prisma generate
RUN pnpm run build


FROM node:21 AS RUN 
ENV DATABASE_URL="file:./dev.db"
COPY --from=BUILD . .
WORKDIR /fitness
RUN cd src/ && pnpm dlx prisma migrate reset --force 
RUN pnpm run db-seed
EXPOSE 3000
CMD ["npm", "start"]
