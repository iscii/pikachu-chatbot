FROM node:18-alpine AS builder
WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 300
CMD ["nginx", "-g", "daemon off;"]