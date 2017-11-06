const express = require('express');
const chalk = require('chalk');
const volleyball = require('volleyball');
const app = express();



app.use((req, res, next) => {
  console.log('METHOD: ', req.method);
  console.log('URI', req.path);
  next();
})

app.get('/', (req, res) => res.send('Hello world!'));

app.get('/special/*', (req, res) => res.send('you reached the special area'))

app.listen(3000, function(){
  console.log(chalk.blue('your server is running'));
})
