const express = require('express')
const router = express.Router()

// 驗證middleware
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')


router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router