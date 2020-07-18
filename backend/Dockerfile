FROM node:10.17.0-alpine3.9

LABEL maintainer="kevinfdez.at@gmail.com" \
      version=1.0 \
      description="Imagen de node versión 10.17.0 con Linux Alpine 9.2.0"

# Install dependencies
RUN apk --no-cache --progress -q add curl

# Clean up image
RUN rm -rf /var/cache/apk/*

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "." ]
