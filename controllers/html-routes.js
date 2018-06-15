const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting req ', req)
    res.send("Success!")
})

module.exports = router