FROM node:23.6

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --omit=dev
CMD ["npm", "run", "start:prod"]
EXPOSE 3000