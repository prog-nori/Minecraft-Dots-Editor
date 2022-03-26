const express = require('express')
const router = express.Router()
const func = require('./route_func')

// GET /api/file/create
router.get('/create', func.create)

// GET /api/file/read/all-projects
router.get('/read/all-projects', func.read.allProjects)

// GET /api/file/read/project
router.get('/read/project', func.read.aProject)

// GET /api/file/read/project
router.get('/update', func.update)

module.exports = router
