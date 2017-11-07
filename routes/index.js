const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const path = require('path'); //interprets the ..
const bodyParser = require('body-parser');

//console.log(tweetBank.list());
let tweets = tweetBank.list();

router.get('/', function (req, res) {

  res.render( 'index', { tweets: tweets, showForm: true } );
});


// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

// router.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })


router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

router.use('/static', express.static('public'));

router.get('/stylesheets/style.css', function (req, res) {
  res.sendFile( path.join(__dirname , '../public/stylesheets/style.css' ));
});
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list, showForm: true, name: name } );
});

router.get('/tweets/:id', function(req, res) {
  var id = req.params.id;
  var list = tweetBank.find( {id: id} );
  console.log('heres list', list);
  res.render( 'index', { tweets: list } );
});

module.exports = router;
