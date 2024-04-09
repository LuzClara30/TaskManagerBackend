const express = require('express');
const app = express();
//middlewares
app.use(express.json());//permite que el servidor entienda json
app.use(express.urlencoded({extended: false}));//convierte los datos de un forulario en un objeto json
//definición de rutas
app.use(require('./routes/index'));
app.listen(4000);
console.log('Server is running on port 4000');