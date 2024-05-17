# ベースイメージを指定
FROM node:20.8.0
# 作業ディレクトリを設定
WORKDIR /app

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y curl dnsutils

# パッケージファイルをコピー
COPY package*.json ./
COPY package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションソースをコピー
COPY . .
EXPOSE 3001

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
