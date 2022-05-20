import express from 'express';
import bookRouter from './routes/book.route.mjs';
import homeRouter from './routes/home.route.mjs';
import tripDescriptionRouter from './routes/tripDesc.router.mjs';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/home', homeRouter);
app.use('/trip', tripDescriptionRouter);
app.use('/book', bookRouter)

app.use((req, res, next) => {
  next(404);
});

app.use((err, req, res, next) => {
  res.status(err).render('error', { error: err });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});