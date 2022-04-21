#!/usr/bin/env bash

ROOT_PATH=`dirname $(cd $(dirname $0); pwd)../`

cd ${ROOT_PATH}

if [ ! -e .env ]; then
    cp .env-sample .env
fi

docker-compose build
docker-compose up -d

if [ ! -e .git ]; then
    git init
fi

if [ ! -e node_modules ]; then
    npm ci
fi

if [ ! -e .husky ]; then
    npm run prepare
fi

if [ ! -e blocks/node_modules ]; then
    npm run block-install
fi

npm run block-build

bash scripts/wait-for-it.sh localhost:3306
echo "MySQL is ready"

bash scripts/wait-for-it.sh localhost:80
echo "Apache is ready"

if [ ! -e .composer/vendor ]; then
    docker-compose exec web bash -c "cd /var/www/composer && php -r \"copy('https://getcomposer.org/installer', 'composer-setup.php');\" && php composer-setup.php"
    docker-compose exec web bash -c "cd /var/www/composer && php composer.phar install"
fi

npm run dev