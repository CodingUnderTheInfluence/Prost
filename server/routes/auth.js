const { Router } = require('express');
const auth = Router();

auth.get('/', (res, req) => {
    res.send('THIS IS THE WORKING AUT')
})