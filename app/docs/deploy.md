ssh gleb@178.154.206.249
sudo apt update
sudo apt install git-all

"nvm установка на убунту и добавляем переменные окружения, чтобы он заработал NVM_DIR"
nvm install версия_ноды

- убираем pb/pb_hooks
- npm i
если ругается на pocketbase, то установить отдельно
- копируем .env
- собираем
npm run build

- удаляем старый образ
docker images
docker rmi id

docker-compose up --build

sudo apt install nginx

sudo ./pocketbase serve --http="10.128.0.16:80" --https="10.128.0.16:443"
npm run build
ORIGIN=http://178.154.206.249:3000 HOST=10.128.0.16 node -r dotenv/config build
