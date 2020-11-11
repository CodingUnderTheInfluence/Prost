const { Drinks } = require('../../server/db/models/dbindex.js');
const { Router } = require('express');
const drinksRouter = Router();

drinksRouter.get('/drinksList', (req, res) => {
    const { id } = req.query
    Drinks.findOne({ where: { id_customer: id } })
        .then((customer) => {
            if (customer === null) {
                res.send(JSON.stringify(0))
            } else {
                res.send('Drinks')
            }
        })
        .catch(err => console.warn(err))
})

drinksRouter.post('/drinksList', (req, res) => {
    const { id, barId } = req.body;
    Drinks.create({
        id_customer: id,
        drink_Count: 1,
        id_bar: barId
    })
})

drinksRouter.put('/updateCount', (req, res) => {
    // const { count, id, barId } = req.body;
    const { count, id, barId } = req.body
    console.log(count, id, barId)
    Drinks.increment({
        drink_Count: 1
    },
        {
            where: {
                id_customer: id,
                id_bar: barId
            }
        })
})

drinksRouter.get('/count', (req, res) => {
    const { customer, bar } = req.query;
    console.log(customer, bar)
})

module.exports = {
    drinksRouter,
}
