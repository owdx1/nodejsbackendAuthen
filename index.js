const bodyParser = require('body-parser');
const express = require('express');
const authController = require('./routes/jwtAuth');
const dashboardController = require('./routes/dashboard');
const allUsersController = require('./routes/allUsers');
const cors = require('cors');




const app = express();



app.use(cors());
app.set('views','views');
app.set('view engine' , 'ejs');
app.use(express.json())



app.use('/auth' , authController);
app.use('/dashboard' , dashboardController);
app.use('/allUsers' , allUsersController);


app.listen(5000 , () =>{
    console.log("listenin on port 5000");
})