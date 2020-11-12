const { Drinks } = require('../../server/db/models/dbindex.js');
const { Router } = require('express');
const { Op } = require("sequelize");
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
    const { count, id, barId } = req.body
    Drinks.increment({ drink_Count: 1 },
        {
            where: {
                id_customer: id,
                id_bar: barId
            }
        })
        .then((drinktotal) => {
            res.send(JSON.stringify(drinktotal[0][0][0].drink_Count));
        })
        .catch((err) => {
            console.warn(err)
        })
})

drinksRouter.get('/count', (req, res) => {
    const { customerId, barId } = req.query;
    Drinks.findOne({ where: { id_customer: customerId, id_bar: barId } })
        .then((customerDrinks) => {
            res.send(JSON.stringify(customerDrinks.drink_Count));
        })
        .catch((err) => {
            console.warn(err)
        })
})

/*
 Looks for customers that have a drink total above 8, then returns those customers to front end
*/
drinksRouter.get('/alerts', (req, res) => {
    const { customer, barId, count } = req.query;
    Drinks.findAll({
        where: { id_customer: customer, id_bar: barId }
    })
        .then((customer) => {
            res.send(JSON.stringify(customer[0].drink_Count));
        })
})

module.exports = {
    drinksRouter,
}
