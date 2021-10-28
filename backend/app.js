require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');

const app = express();

const { login, createUser } = require('./controllers/users')
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const auth = require('./middlewares/auth');
const myErrors = require('./middlewares/errors')
const NotFoundError = require('./errors/NotFoundError');
const cors = require('./middlewares/cors')
const {
  validateLogin,
  validateReqister,
} = require('./middlewares/validations')
const { requestLogger, errorLogger } = require('./middlewares/logger')

const { PORT = 3000 } = process.env;
const urlDataBase = 'mongodb://localhost:27017/mestodb';

const mongoose = require('mongoose', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
})

app.post('/signin', validateLogin, login);
app.post('/signup', validateReqister, createUser);
app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);

app.use(errorLogger)

app.all('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errors())
app.use(myErrors)

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: http://localhost:${PORT}`)
})

mongoose.connect(urlDataBase);