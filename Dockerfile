FROM node:lts-alpine

ARG name
ARG value
ARG token
ARG owner
ARG push_to_org
ARG repository

ENV REPO_ACCESS_TOKEN=$token
ENV REPO=$repository
ENV OWNER=$owner
ENV PUSH_TO_ORG=$push_to_org
ENV SECRET_NAME=$name
ENV SECRET_VALUE=$value

COPY src ./

COPY package*.json ./

RUN npm install --only=production

CMD ["node", "secret.js"]
