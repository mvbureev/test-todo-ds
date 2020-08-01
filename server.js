const express = require('express');
const path = require('path');

const port = process.env.PORT || 9000;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();

// здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

// простой тест сервера
app.get('/ping', function (req, res) {
  return res.send('pong');
});

// обслуживание html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port);
