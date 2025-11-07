# /Lacustre/nextjs-app/Dockerfile

FROM node:20-alpine
WORKDIR /app
ARG CACHE_BUSTER=1
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]