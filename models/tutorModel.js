const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const paswordComplexity = require('joi-password-complexity');

const tutorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isTutor: {
        type: Boolean,
        default: true
    }
});

tutorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY,
        {expiresIn: '1h'})
        return token;
}

const Tutor = mongoose.model('Tutor', tutorSchema);

const validateTutor = (tutor) => {
    const schema = Joi.object({
        firstname: Joi.string().required().label('First Name'),
        lastname: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.number().required().label('Phone'),
        password: paswordComplexity().required().label('Password')
    });
    return schema.validate(tutor);
}

module.exports = {Tutor, validateTutor};