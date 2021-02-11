const transporter = require('../config/mailer');
const HireMeSchema = require('../models/FormData');

exports.sanitizeFields = (req, res, next) => {
	
	req.body = Object.keys(req.body).length > 0 ?
	JSON.parse( Object.keys(req.body)[0] ) : {};

	req.sanitizeBody('name').escape();
	req.sanitizeBody('email').escape();
	req.sanitizeBody('reason').escape();
	req.sanitizeBody('message').escape();

	req.checkBody('name', "your name is required").notEmpty();
	req.checkBody('email', "The email must be valid").isEmail();
	req.checkBody('message', "your message is required").notEmpty();

	const mistake = req.validationErrors();

	if (mistake) {
		
		const messageError = mistake.map(error => error.msg);

		res.status(404).json({
			ok: false,
			message: messageError,
		});

		return;
	}	
	
	next();
}

exports.sendDataForm = async (req, res) => {
	
	const hireMeSchema = new HireMeSchema(req.body);

	const { name, email, subject, message } = hireMeSchema;
	
	await transporter.sendMail({
		from: `${name} --> 👻 ${email} <foo@example.com>`,
		to: '<ov1356272@gmail.com>',
		subject,
		html: `<b>${message}</b>`,
		
	}, function(err, data) {

		if (err) return res.status(404).json({
			ok: false,
			message: ['A problem has occurred and the email could not be send'],
		});
		else return res.status(200).json({
			ok: true,
			message: ['E-mail send'],
		});
	});
}