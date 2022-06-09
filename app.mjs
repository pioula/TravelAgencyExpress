import express from 'express';
import bookRouter from './routes/book.router.mjs';
import homeRouter from './routes/home.router.mjs';
import tripDescriptionRouter from './routes/tripDesc.router.mjs';
import bodyParser from 'body-parser';
import registrationRouter from './routes/registration.route.mjs';
import userMainRouter from './routes/userMain.router.mjs';
import loginRouter from './routes/login.router.mjs';
import session from 'express-session';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(session({ 
  secret: 'super secret', 
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

app.use('/home', homeRouter);
app.use('/trip', tripDescriptionRouter);
app.use('/book', bookRouter);
app.use('/registration', registrationRouter);
app.use('/user_main', userMainRouter);
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