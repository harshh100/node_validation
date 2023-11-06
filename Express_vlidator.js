const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

app.post('/submit-form', [
    body('facultyId').isInt({ min: 10, max: 9999 }).withMessage('Faculty ID must be a positive integer between 10 and 9999'),
    body('facultyName').notEmpty().withMessage('Faculty Name is required'),
    body('mobileNo').isMobilePhone().withMessage('Mobile number is invalid'),
    body('age').isInt({ min: 18, max: 100 }).withMessage('Age must be an integer between 18 and 100'),
    body('birthYear').isInt({ min: 1920, max: 2022 }).withMessage('Birthyear must be an integer between 1920 and 2022'),
    body('address').notEmpty().withMessage('Address is required'),
    body('email').isEmail().withMessage('Email is invalid')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('Form submitted successfully!');
});

app.listen(3000, () => console.log('Listening on port 3000...'));
