# 构建前端
FROM node:20-alpine AS build
WORKDIR /app

# 拷贝 package.json 和 package-lock.json 文件
COPY Frontend/package*.json ./

# 安装依赖
RUN npm install

# 拷贝源代码和 .env 文件
COPY Frontend/ ./

# 构建并删除 .env（防止泄露）
RUN npm run build && rm -f .env

# 用 serve 启动前端页面
FROM node:20-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 9002
CMD ["serve", "-s", "dist", "-l", "9002"]
