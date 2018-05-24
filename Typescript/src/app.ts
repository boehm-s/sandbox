import http		from 'http';
import express		from 'express';
import session		from 'express-session';
import bodyParser	from 'body-parser';
import logger		from 'morgan';
import cookieParser	from 'cookie-parser';
import path		from 'path';

const app: express.Application = express();
const port: number = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* CORS */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  next();
});

const server	= http.createServer(app);

server.listen(port);
console.log('server listening on port ' + port);

module.exports = app;
