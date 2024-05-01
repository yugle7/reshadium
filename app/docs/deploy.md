ssh root@2.58.70.16
sudo apt update
sudo apt install git-all
git clone https://github.com/yugle7/reshadium.git

- nvm установка на убунту
переходим в https://github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

- добавляем переменные окружения, чтобы он заработал NVM_DIR"
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install node или версия

- устанавливаем nginx
sudo apt install nginx

- устанавливаем vim
sudo apt install vim

- копируем .env в app

- убираем pb/pb_hooks
- npm i
- npm run build

- устанавливаем vim
sudo apt install vim

- установка docker
sudo snap install core snapd
sudo snap install docker

- certbot
sudo snap install --classic certbot
следуем инструкции https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal

- удаляем старый образ
docker images
docker rmi id

netstat -tulpen
systemctl stop nginx

docker-compose up --build
docker-compose down


