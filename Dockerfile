FROM node:lts-alpine

ARG repository
ARG name
ARG value
ARG token
ARG org

COPY src ./

COPY package*.json ./

RUN npm install --only=production

CMD ["node", "secret.js", "$repository", "$name", "$value", "$token", "$org"]
