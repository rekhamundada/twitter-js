const express = require('express');
const chalk = require('chalk');
const volleyball = require('volleyball');
const app = express();
const nunjucks = require('nunjucks');

// var locals = {
//   title: 'An Example',
//   people: [
//       { name: 'Gandalf'},
//       { name: 'Frodo' },
//       { name: 'Hermione'}
//   ]
// };

// nunjucks.render('index.html', locals, function(err, output){
//   if (err) throw err;
//   console.log(output);
// });
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });




app.use((req, res, next) => {
  console.log('METHOD: ', req.method);
  console.log('URI', req.path);
  next();
});

app.get('/', (req, res) => {
  const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: people})
});

app.get('/special/*', (req, res) => res.render('you reached the special area'));

app.listen(3000, function(){
  console.log(chalk.blue('your server is running'));
});
