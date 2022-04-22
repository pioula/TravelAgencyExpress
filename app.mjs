import express from 'express';
import homeRouter from './routes/home.route.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use('/home', homeRouter);

app.use((req, res, next) => {
  next(404);
});

app.use((err, req, res, next) => {
  res.status(err).render('error', { error: err });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});