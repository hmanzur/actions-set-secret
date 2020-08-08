FROM node:${version}

ARG name
ARG value
ARG token
ARG repo
ARG version="lts"

ENV REPO_ACCESS_TOKEN=$token
ENV REPO=$repo
ENV SECRET_NAME=$name
ENV SECRET_VALUE=$value

COPY src ./

COPY package*.json ./

RUN npm install --only=production

CMD ["node", "secret.js"]