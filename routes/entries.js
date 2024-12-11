var express = require('express');
var router = express.Router();
const { ObjectId, Timestamp } = require('mongodb')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res) {
    try {
        const db = req.app.locals.db;
        const newEntry = {
            game_name: req.body.game_name,
            image_url: req.body.image_url,
            author: new ObjectId(req.body.author),
            platform: new ObjectId(req.body.platform),
            entry_text: req.body.entry_text,
            date_created: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 })
        }
        await db.collection('entries')
            .insertOne(newEntry)
        console.log('entry successfully added!')
        res.send('entry successfully added!')
    } catch (error) {
        console.log('error when adding new entry!')
    }
})

module.exports = router;