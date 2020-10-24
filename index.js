const express = require('express')
const gtts = require('gtts')
const bodyparser = require('body-parser')
const say = require('say')
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('index')
})
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
app.post('/', (req, res) => {
    var text = req.body.text
    const speech = new gtts(text)
    speech.save(makeid(5)+".mp3")
    say.speak(text)
    res.send("download compleat")
})

app.listen(5000, function () {
    console.log("Server is listening on Port 5000")
})