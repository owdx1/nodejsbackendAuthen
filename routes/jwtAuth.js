const router = require('express').Router();

const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');
const validInfo  = require('../middleware/validInfo.js');
const authorization = require('../middleware/authorization.js');


router.post('/register', validInfo, async (req,res) => {
    try {
        const {name,email,password}  = req.body;
        console.log("Request received:", name, email, password); 
        const user = await pool.query(`SELECT * FROM USERS WHERE user_email = $1`, [email]);
        console.log("Query result:", user.rows); 

        if(user.rows.length > 0){
            return res.status(401).json({message: "User already exists"});
        }
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password,salt);

        const newUser = await pool.query(`INSERT INTO users(user_name, user_email, user_password) values ('${name}' , '${email}' , '${bcryptPassword}') RETURNING *`);

        const token = jwtGenerator(newUser.rows[0].user_id);




        return res.json({token});






    } catch (error) {
        console.error("Error:", error.message);  
        res.status(500).json({message: "Server error"});
    }
})


router.post('/login', validInfo, async(req,res) =>{

    try {
        const {email , password} = req.body;
        console.log("Request received:", email, password);
        const user = await pool.query(`SELECT * FROM USERS WHERE user_email = $1`, [email]);

        if(user.rows === 0){
            return res.sendStatus(401).json('Password or email is incorrect');
        }

        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);

        console.log(validPassword);

        if(!validPassword){

            return res.status(401).json("Password or email is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id);

        return res.json({token , user_name: user.rows[0].user_name});

    } catch (error) {
        console.error("Error:", error.message);  
        res.status(500).json({message: "Server error"});
    }
})


router.get('/is-verify', authorization, (req,res,next) =>{

    try {

        res.json(true);
        

    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server error');
    }

})


module.exports = router; 