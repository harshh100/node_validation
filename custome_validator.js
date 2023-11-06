const express = require('express');
const app = express();
app.use(express.json());

const validateFacultyForm = (req, res, next) => {
    const { facultyId, facultyName, mobileNo, age, birthYear, address, email } = req.body;

    // All fields are required
    if (!facultyId || !facultyName || !mobileNo || !age || !birthYear || !address || !email) {
        return res.status(400).send('All fields are required');
    }

    // Validate facultyId
    if (facultyId < 10 || facultyId > 9999) {
        return res.status(400).send('Faculty ID must be a positive integer between 10 and 9999');
    }

    // Validate mobileNo
    if (!/^[0-9]{10}$/.test(mobileNo)) {
        return res.status(400).send('Mobile number must be a 10-digit number');
    }

    // Validate age
    if (age < 18 || age > 100) {
        return res.status(400).send('Age must be an integer between 18 and 100');
    }

    // Validate birthYear
    if (birthYear < 1920 || birthYear > 2022) {
        return res.status(400).send('Birthyear must be an integer between 1920 and 2022');
    }

    // Validate email
    const emailParts = email.split('@');
    if (emailParts.length !== 2 || !['.com', '.in', '.org', '.ai'].includes(emailParts[1].split('.')[1])) {
        return res.status(400).send('Email is invalid');
    }

    next();
};

app.post('/submit-form', validateFacultyForm, (req, res) => {
    res.send('Form submitted successfully!');
});

app.listen(3000, () => console.log('Listening on port 3000...'));
