const express = require('express');
const router = express.Router();
const formController = require('../controller/formController');

module.exports = function() {
	
	// Enviar datos del formulario.
	router.post('/send-email', 
		formController.sanitizeFields,
		formController.sendDataForm,
	);

	return router;
}