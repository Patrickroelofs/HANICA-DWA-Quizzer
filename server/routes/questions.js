const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/questions')
const Question = mongoose.model('Questions')

router.get('/categories', async function (req, res, next) {
    try {
        // Get categories from database
        await Question.find({language: req.session.language}).distinct('category').then(data => {
            console.log(`[GET] questions.get('/categories')`)

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
            console.log(`[GET] questions.get('/categories/${req.params.category}')`)

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
            console.log(`[GET] questions.get('/${req.params.id}')`)
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
            console.log(`[GET] questions.get('/')`)
            return res.send(data)
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
