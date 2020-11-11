const { Drinks } = require('../../server/db/models/dbindex.js');
const { Router } = require('express');
const drinksRouter = Router();

drinksRouter.get('/drinksList', (req, res) => {
    const { id } = req.query
    Drinks.findOne({ where: { id_customer: id } })
        .then((customer) => {
            if (customer === null) {
                res.send(JSON.stringify(0))
            }
        })
        .catch(err => console.warn(err))
})

drinksRouter.post('/drinksList', (req, res) => {
    const { id } = req.body;
    Drinks.create({
        id_customer: id,
        drink_Count: 0
    })
})

module.exports = {
    drinksRouter,
}
