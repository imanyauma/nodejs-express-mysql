FROM node:10

WORKDIR /usr/src/app
COPY package.json .
RUN npm install express mysql body-parser --save
EXPOSE 3000
CMD ["npm", "start"]

COPY . .
