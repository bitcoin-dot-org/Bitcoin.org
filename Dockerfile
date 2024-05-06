FROM node:20

WORKDIR /app

COPY . /app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
