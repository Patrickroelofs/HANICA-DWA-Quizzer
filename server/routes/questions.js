const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/questions')
const Question = mongoose.model('Questions')

router.get('/categories', async function (req, res, next) {
    try {
        // Get categories from database
        await Question.find({language: req.session.language}).distinct('category').then(data => {

            return res.send(data)
        })
    } catch (err) {
        next(err)
    }
})

router.get('/categories/:category', async function (req, res, next) {
    try {
        // Get questions where :category (name)
        await Question.find({category: req.params.category, language: req.session.language}).then((data) => {

            return res.send(data)
        })

    } catch (err) {
        next(err)
    }
})

// Get all questions from the 3 categories selected
router.post('/categories', async function (req, res, next) {
    try {
        await Question.find(
            {
                category: {
                    $in: [req.body[0], req.body[1], req.body[2]]
                },
                language: req.session.language
            }
        ).then((data) => {
            res.send(data)
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
        await Question.find({language: req.session.language}).then((data) => {
            return res.send(data)
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
