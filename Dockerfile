# 构建前端
FROM node:20-alpine AS build
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 拷贝源代码和 .env（确保 env 被 Vite 读取）
COPY . .

# 构建（Vite 会自动读取 .env 文件）
RUN npm run build

# 用 serve 启动前端页面
FROM node:20-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 9002
CMD ["serve", "-s", "dist", "-l", "9002"]
