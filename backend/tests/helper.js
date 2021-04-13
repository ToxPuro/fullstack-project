const { LOGIN } = require("./queries")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")

// passwordHash is encrypted from 'salainen'
const passwordHash = "$2b$10$BWXtVXCXvNrRRNelbC8McurdUJdPBV2qrug6pISDZV5HPPA9V0Ok2"
const userObject =  { username: "TestiUsername", name: "TestName", events: [], passwordHash, groups: [] }
const secondUserObject = { username: "SecondTestiUsername", name: "SecondTestName", events: [], passwordHash }
const groupObject = { name: "TestGroup" }
const eventObject = { name: "TestiName", group: "TestGroup", dates: [ { date: "TestiDate", votes: [] } ] }

const login = async (setOptions, mutate, username, password) => {
  const token = await mutate(LOGIN, { variables: { username, password } })
  setOptions({
    request: {
      headers: {
        authorization: `bearer ${token.data.login.value}`,
      }
    }
  })
  return token
}

const erase = async() => {
  await User.deleteMany({})
  await Event.deleteMany({})
  await Group.deleteMany({})
}

const createUser = async() => {
  const user = new User(userObject)
  await user.save()
  return user
}

const createSecondUser = async() => {
  const secondUser = new User(secondUserObject)
  await secondUser.save()
  return secondUser
}

const createGroup = async (users) => {
  const group = new Group({ name: groupObject.name, users: users, events: [] })
  await group.save()
  return group
}
const createEvent = async (group) => {
  const event = new Event({ name: eventObject.name, group: group, dates: eventObject.dates })
  await event.save()
  return event
}




module.exports = { userObject, groupObject, login, erase, eventObject, secondUserObject, createUser, createSecondUser, createGroup, createEvent }