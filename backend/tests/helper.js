const { LOGIN } = require("./queries")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")

// passwordHash is encrypted from 'salainen'
const passwordHash = "$2b$10$BWXtVXCXvNrRRNelbC8McurdUJdPBV2qrug6pISDZV5HPPA9V0Ok2"
const userObject =  { username: "TestiUsername", name: "TestName", events: [], passwordHash, groups: [] }
const secondUserObject = { username: "SecondTestiUsername", name: "SecondTestName", events: [], passwordHash }
const groupObject = { name: "TestGroup" }
const eventObject = { name: "TestiName", group: "TestGroup", dates: [ "TestiDate" ] }

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




module.exports = { userObject, groupObject, login, erase, eventObject, secondUserObject, createUser }