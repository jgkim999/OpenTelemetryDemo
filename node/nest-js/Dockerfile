# 베이스 이미지로 Node.js LTS 버전 사용
FROM node:22

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# Nest.js 애플리케이션 빌드
RUN npm run build

# 애플리케이션이 실행될 포트 설정
EXPOSE 3001 3002

# 애플리케이션 실행
CMD ["node", "dist/main"]