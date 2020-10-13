const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/questions')
const Question = mongoose.model('Questions')

/**
 * TODO: Add language
 */

router.get('/categories', async function (req, res, next) {
    try {
        // Get categories from database
        await Question.find().distinct('category').then(data => {
            return res.send(data)
        })
    } catch (err) {
        next(err)
    }
})

router.get('/categories/:category', async function (req, res, next) {
    try {
        // Get questions where :category (name)
        await Question.find({category: req.params.category}).then((data) => {
            return res.send(data)
        })

    } catch (err) {
        next(err)
    }
})

router.get('/:id', async function (req, res, next) {
    try {
        // Get Question where :question (ID)
        await Question.findById(req.params.id).then((data) => {
            return res.send(data)
        })
    } catch (err) {
        next(err)
    }
})

router.get('/', async function (req, res, next) {
    try {
        // Get all Questions
        await Question.find().then((data) => {
            return res.send(data)
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
