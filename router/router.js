const router = require("express").Router()

const SerchString = require('../controller/controller')



// router.post('/create', SerchString.createUser)
router.get('/find', SerchString.findAllData)
router.post('/find', SerchString.findUserSearch)


module.exports = router;
