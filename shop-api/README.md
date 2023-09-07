# Установка

1. Зависимость node 10.13 - nvm install 10.13 && nvm use 10
2. Установите пакеты выполнив - npm install
3. npm audit fix
4. Запустите сервер выполнив - npm run start:dev
5. Приложение будет доступно по адресу <http://localhost:3000>

```bash
npm install
npm audit fix
npm run start:dev
```

## Примеры запросов

- **GET** <https://localhost:3000/api/products> - вернет список товаров

- **GET** <https://localhost:3000/api/products/?page=2&limit=20&orderBy=title> - вернет список товаров со следующими фильтрами: страница - 2, на странице шт: 20, отсортированы по заголовку

- **GET** <https://localhost:3000/api/products/32> - вернет товар с id 32
- **POST** <https://localhost:3000/api/products> - создаст новый товар на основе переданного в запросе объекта
- **PUT** <https://localhost:3000/api/products/32> - обновит товар с id 32

Протестировать GET-запросы можно прямо в строке браузера, а для тестирования POST и PUT можно воспользоваться приложением [https://www.postman.com/](https://www.postman.com/)
