var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const nodemailer = require('nodemailer');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', function(req, res) {
    res.render('index', {title: 'LYDIA - photography company'});
});

app.get('/about', function(req, res) {
    res.render('about', {title: 'LYDIA - about us'});
});

app.get('/portfolio', function(req, res) {
    res.render('portfolio', {title: 'LYDIA - portfolio'});
});

app.get('/contact', function(req, res) {
    res.render('contact', {title: 'LYDIA - contact us'});
});

app.post('/contact', function(req, res) {
	var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: 'tovt.test@gmail.com',
                pass: 'TestPass00'
        }
    });
    
    var mailOptions = {
        from: 'tovt.test@gmail.com',
        to: req.body.email,
        subject: 'We got your email[LYDIA]',
        text: 'Thank you very much for your message! We will reply within 24 hours.'
    }
    
    transporter.sendMail(mailOptions, function(error, info) {
        if(error){
            console.log(error);
            res.render('contact', {
                status: 'error'
            });
        } else {
            console.log('Email Sent' + info.response);
            res.render('contact', {
                status: 'ok'
            });
        }
    });
       
});

app.listen(3000, function() {
    console.log('Server started at http://localhost:3000');
})