const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const schema = Joi.object({
    facultyId: Joi.number().integer().min(10).max(9999).required(),
    facultyName: Joi.string().required(),
    mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    age: Joi.number().integer().min(18).max(100).required(),
    birthYear: Joi.number().integer().min(1920).max(2022).required(),
    address: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'in', 'org', 'ai'] }
    }).required()
});

app.post('/submit-form', (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    res.send('Form submitted successfully!');
});

app.listen(3000, () => console.log('Listening on port 3000...'))
