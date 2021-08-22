require('./config/variables');

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/');
const expressValidator = require('express-validator');
const cors = require('cors');

const app = express();

app.use( bodyParser.urlencoded({ extend: false }) );
app.use( bodyParser.json() );

// validacion de campos
app.use( expressValidator() );

// Configuracion de los cors
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
	origin: (origin, callback) => {
		
		// Revisar si la peticion  viene de un servidor que esta en la whiteList
		const existe = whiteList.some(dominio => dominio === origin);
		
		if (existe) {

			callback(null, true);
		
		} else {
			
			callback(new Error('No permitido por CORS'), true);
		}
	}
}

app.use( cors(corsOptions) );

app.use('/', router() );

app.listen(process.env.PORT, () => console.log('corriendo en el puerto', process.env.PORT));