const router = require('express').Router();
const pool = require('../db');

console.log("fuckyou");



router.get('/' , async (req , res) =>{

    try {

        const allUsers = await pool.query(`SELECT * FROM users`);
        return res.json(allUsers.rows)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})
module.exports = router; 