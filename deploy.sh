#!/bin/bash

# Скрипт для первоначальной настройки PM2 на сервере
# Запустите этот скрипт один раз на сервере для первоначальной настройки

set -e

echo "🚀 Starting deployment setup..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Переменные (измените на свои)
APP_DIR="/var/www/spoketa/client"
APP_NAME="spoketa-client"

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js не установлен. Устанавливаю...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Проверка наличия PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 не установлен. Устанавливаю...${NC}"
    sudo npm install -g pm2
fi

# Переход в директорию приложения
cd $APP_DIR

echo -e "${YELLOW}📦 Установка зависимостей...${NC}"
npm ci

echo -e "${YELLOW}🔨 Сборка приложения...${NC}"
npm run build

# Создание директории для логов
mkdir -p logs

echo -e "${YELLOW}🔄 Запуск приложения с PM2...${NC}"
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start ecosystem.config.js

echo -e "${YELLOW}💾 Сохранение конфигурации PM2...${NC}"
pm2 save

echo -e "${YELLOW}⚙️  Настройка автозапуска PM2...${NC}"
pm2 startup systemd -u $USER --hp $HOME

echo -e "${GREEN}✅ Деплой завершен успешно!${NC}"
echo -e "${GREEN}Приложение запущено и доступно на порту 3003${NC}"

# Показать статус
pm2 status