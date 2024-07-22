FROM node:20-alpine

WORKDIR /app
EXPOSE 3000

COPY package*.json /app/
COPY public/ /app/public
COPY src/ /app/src

CMD ["npm", "run", "dev"]