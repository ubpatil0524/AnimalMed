const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userController');


dotenv.config();

const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use('/', userRoutes);



const port=process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/AnimalMed",{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(()=>
    console.log("connection successfully"))
.catch((err)=>
    console.log("error")
)
app.listen(port,()=>{
  console.log(`connection successfully ${port}`);
})

