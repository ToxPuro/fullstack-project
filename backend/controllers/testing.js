const router = require('express').Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Group = require("../models/Group")

router.post('/reset', async (request, response) => {
  await Event.deleteMany({})
  await User.deleteMany({})
  await Group.deleteMany({})

  response.status(204).end()
})

module.exports = router