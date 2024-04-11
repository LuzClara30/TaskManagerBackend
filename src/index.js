const express = require('express');
require("dotenv").config();
//REQUIRE CORS
const cors = require('cors');
const app = new express();
app.use(cors());
//middlewares
app.use(express.json());//permite que el servidor entienda json
app.use(express.urlencoded({extended: false}));//convierte los datos de un forulario en un objeto json
//definición de rutas
app.use(require('./routes/index'));
app.listen(8000);
console.log('Server is running on port 8000');