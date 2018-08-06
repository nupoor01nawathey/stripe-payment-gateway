const express    = require('express'),
      bodyParser = require('body-parser'),
      exphbs     = require('express-handlebars'),
      keys       = require('./config/keys')
      stripe     = require('stripe')(keys.stripeSecretKey),
      app        = express();


// setup view engine
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


// setup body parsor
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// static folder setting
app.use(express.static(`${__dirname}/public`));

// setup index page route
app.get('/', (req, res) => {
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});

// setup charge route
app.post('/charge', (req, res) => {
    const amount = 2500;
     
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then( customer => stripe.charges.create ({
        amount,
        description: 'stripe payment gateway example',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});

// setup port connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});


/*
{ stripeToken: 'tok_1CwACtA0TEbnOnSJPXddS0cC',
  stripeTokenType: 'card',
  stripeEmail: 'test1@gmail.com' }
*/