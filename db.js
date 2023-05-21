const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    user : "postgres",
    password: "o547988633",
    host:"localhost",
    post:5432,
    database: "jwttutorial"
    

});


pool.on('connect' , () =>{
    console.log("connected to database");
})

pool.on('error' , (err) =>{
    console.log(err);
})
 
module.exports = pool;