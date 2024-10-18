const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const registerRouter = require('./src/routes/register.route');
const profileRouter = require('./src/routes/profile.route');
const authenticateToken = require('./src/middlewares/authMiddleware')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(authenticateToken)



app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/register', registerRouter);
app.use('/profile', profileRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`listening at http://localhost:${port}`)
});