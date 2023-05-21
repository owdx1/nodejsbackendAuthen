const router = require('express').Router();
const pool = require('../db.js');
const authorization = require('../middleware/authorization.js');


router.get('/' , authorization, async(req,res,next) =>{

    try {
        
        const user = await pool.query(`SELECT user_name,user_email FROM USERS WHERE user_id = $1` , [req.user]);

        res.json(user.rows[0]);


        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
    
    next();
})

module.exports = router;