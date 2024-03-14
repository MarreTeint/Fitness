FROM node:21

COPY . .

RUN npm install
RUN npx prisma generate

CMD ["node", "index.ts"]

EXPOSE 3000