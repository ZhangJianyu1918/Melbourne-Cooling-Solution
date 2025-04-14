# 构建前端
FROM node:20-alpine AS build
WORKDIR /app
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .
RUN npm run build

# 用 serve 启动前端页面
FROM node:20-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 9002
CMD ["serve", "-s", "dist", "-l", "9002"]
