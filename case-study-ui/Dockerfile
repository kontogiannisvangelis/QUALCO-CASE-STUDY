FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --omit=dev

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html
COPY --from=builder /app/dist/case-study-ui/browser /usr/share/nginx/html
EXPOSE 80
