from node:20-alpine

# USER node

WORKDIR /home/node/app

COPY package*.json ./

COPY . .

RUN rm -f .env
RUN npm install

CMD ["npm", "run", "start"]