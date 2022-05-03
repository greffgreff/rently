FROM node:lts-alpine
ENV NODE_ENV production
COPY package.json yarn.lock ./
EXPOSE 3000
CMD ["npm", "start"]