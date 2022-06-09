import express from 'express';
import bookRouter from './routes/book.router.mjs';
import homeRouter from './routes/home.router.mjs';
import tripDescriptionRouter from './routes/tripDesc.router.mjs';
import bodyParser from 'body-parser';
import registrationRouter from './routes/registration.route.mjs';
import loginSuccessRouter from './routes/login_success.router.mjs';
import loginRouter from './routes/login.router.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/home', homeRouter);
app.use('/trip', tripDescriptionRouter);
app.use('/book', bookRouter);
app.use('/registration', registrationRouter);
app.use('/login_success', loginSuccessRouter);
app.use('/login', loginRouter);

app.use((req, res, next) => {
  next(404);
});

app.use((err, req, res, next) => {
  res.status(err).render('error', { error: err });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});