const dotenv = require('dotenv').config()
const express = require('express')
const MailService = require('./services/mail')
const mailService = new MailService()
const bodyParser = require('body-parser')
const db = require('./database/mongo')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './dist')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './dist/index.html')));

app.get('/api/calls', (req, res) => db.connection()
    .collection('calls').find({}).toArray((err, calls) => {
        if(err) res.status(500).send()
        res.status(200).send(calls)
    })
)

app.get('/api/plans', (req, res) => db.connection()
    .collection('plans').find({}).toArray((err, plans) => {
        if(err) res.status(500).send()
        res.status(200).send(plans)
    })
)

app.post('/api/contact', (req, res) => db.connection()
    .collection('contacts').find({email: req.body.email}).toArray((err, contact) => {
        console.log(req.body.contactName)
        console.log(req.body.email)
        console.log(req.body.message)
        if(err) res.status(500).send()
        if(contact.length == 0) {
            db.connection().collection('contacts').insert(req.body, (err, result) => {
                if(err) res.status(500).send()
                if(result.result.ok) res.status(200).send()
                mailService.send({email: req.body.email, name: req.body.contactName})
            })
        } else {
            db.connection().collection('contacts').updateOne({email:req.body.email}, { $push : { messages: req.body.messages[0]}} , (err, result) => {
                if(err) res.status(500).send()
                if(result.result.ok) res.status(200).send()
                mailService.send({email: req.body.email, name: req.body.contactName})
            })
        }
    })
);

db.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds147044.mlab.com:47044/telzir`, err => {
    if(err) {
        console.log('Unable to connect to mlab.')
        process.exit(1)
    }
    console.log('connected to mlab')
    app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`));
});
