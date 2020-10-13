const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/teams')
const Teams = mongoose.model('Teams')